const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// Fast JWT generator
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'cloth_shop_super_secret_jwt_key_2026', { expiresIn: '30d' });

// @route   POST /api/auth/register
// @desc    High-speed customer / admin registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Fast indexed check using .lean()
    const exists = await User.findOne({ email: normalizedEmail }).select('_id').lean();
    if (exists) return res.status(400).json({ message: 'User already exists with this email' });

    // Create user (password automatically hashed with fast 8 rounds in pre-save hook)
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: phone ? phone.trim() : '',
      role: role || 'customer',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Registration failed' });
  }
});

// @route   POST /api/auth/login
// @desc    High-speed login authentication
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Fast user lookup
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    if (user.isBlocked) return res.status(403).json({ message: 'Your account has been suspended. Contact support.' });

    // Fast password verification
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id);

    // Non-blocking background update of lastLogin timestamp
    User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } }).exec().catch(() => {});

    // Instant response return
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Login failed' });
  }
});

// @route   GET /api/auth/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { name, phone, address, password } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = { ...user.address, ...address };
    if (password) user.password = password;
    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      address: updated.address,
      role: updated.role,
      token: generateToken(updated._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/auth/customers
router.get('/customers', protect, admin, async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const filter = { role: 'customer' };
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];

    const total = await User.countDocuments(filter);
    const customers = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const Order = require('../models/Order');
    const customersWithOrders = await Promise.all(
      customers.map(async (c) => {
        const orderCount = await Order.countDocuments({ userId: c._id });
        const revenue = await Order.aggregate([
          { $match: { userId: c._id, paymentStatus: 'paid' } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ]);
        return {
          ...c,
          orderCount,
          totalSpent: revenue[0]?.total || 0,
        };
      })
    );

    res.json({ customers: customersWithOrders, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/auth/customers/:id/block
router.put('/customers/:id/block', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(403).json({ message: 'Cannot block admin accounts' });
    user.isBlocked = !user.isBlocked;
    await user.save({ validateBeforeSave: false });
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}`, isBlocked: user.isBlocked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/auth/customers/:id/orders
router.get('/customers/:id/orders', protect, admin, async (req, res) => {
  try {
    const Order = require('../models/Order');
    const orders = await Order.find({ userId: req.params.id }).sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
