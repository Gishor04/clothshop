const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/coupons
// @desc    Admin: list all coupons
router.get('/', protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/coupons
// @desc    Admin: create coupon
router.post('/', protect, admin, async (req, res) => {
  try {
    const { code, type, value, minOrderAmount, maxUses, expiryDate, description } = req.body;
    const exists = await Coupon.findOne({ code: code.toUpperCase() });
    if (exists) return res.status(400).json({ message: 'Coupon code already exists' });

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      type, value, minOrderAmount,
      maxUses: maxUses || null,
      expiryDate: expiryDate || null,
      description,
    });
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/coupons/:id
// @desc    Admin: update coupon
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/coupons/:id
// @desc    Admin: delete coupon
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/coupons/validate
// @desc    Public: validate coupon & return discount
router.post('/validate', protect, async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) return res.status(404).json({ message: 'Invalid or inactive coupon code' });
    if (coupon.expiryDate && new Date() > coupon.expiryDate)
      return res.status(400).json({ message: 'This coupon has expired' });
    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses)
      return res.status(400).json({ message: 'Coupon usage limit reached' });
    if (orderAmount < coupon.minOrderAmount)
      return res.status(400).json({
        message: `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`,
      });

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = parseFloat(((orderAmount * coupon.value) / 100).toFixed(2));
    } else {
      discount = Math.min(coupon.value, orderAmount);
    }

    res.json({ valid: true, coupon, discount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
