const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create new order
router.post('/', protect, async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod, couponCode, discount } = req.body;
    if (!products || products.length === 0)
      return res.status(400).json({ message: 'No order items provided' });

    const totalAmount = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const finalAmount = Math.max(0, totalAmount - (discount || 0));

    const order = await Order.create({
      userId: req.user._id,
      products,
      totalAmount: finalAmount,
      shippingAddress,
      paymentMethod,
      couponCode: couponCode || null,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'pending',
    });

    // Decrement stock for each product/size safely
    for (const item of products) {
      if (item.productId && item.size) {
        try {
          await Product.updateOne(
            { _id: item.productId, 'sizes.size': item.size },
            { $inc: { 'sizes.$.stock': -item.quantity } }
          );
          const prod = await Product.findById(item.productId);
          if (prod && prod.sizes) {
            prod.stockQuantity = prod.sizes.reduce((s, sz) => s + (sz.stock || 0), 0);
            if (prod.stockQuantity <= 0) prod.isOutOfStock = true;
            await prod.save();
          }
        } catch (stockErr) {
          console.error(`Stock update failed for product ${item.productId}:`, stockErr.message);
        }
      }
    }

    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: err.message || 'Failed to place order' });
  }
});

// @route   GET /api/orders/all
// @desc    Admin: get all orders with pagination + filter
router.get('/all', protect, admin, async (req, res) => {
  try {
    const { status, paymentStatus, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ orders, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/orders/my
// @desc    User: get own orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email phone');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Admin: update order status
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    // If cancelled, restore stock
    if (orderStatus === 'cancelled') {
      for (const item of order.products) {
        await Product.updateOne(
          { _id: item.productId, 'sizes.size': item.size },
          { $inc: { 'sizes.$.stock': item.quantity } }
        );
        const prod = await Product.findById(item.productId);
        if (prod) {
          prod.stockQuantity = prod.sizes.reduce((s, sz) => s + sz.stock, 0);
          prod.isOutOfStock = prod.stockQuantity === 0;
          await prod.save();
        }
      }
    }

    const updated = await order.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/orders/:id/invoice
// @desc    Get invoice data for an order
router.get('/:id/invoice', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email phone');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    res.json({
      invoiceNumber: `INV-${order._id.toString().slice(-8).toUpperCase()}`,
      date: order.createdAt,
      customer: order.userId,
      shippingAddress: order.shippingAddress,
      products: order.products,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
