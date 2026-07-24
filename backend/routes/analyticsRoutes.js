const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/analytics/summary
// @desc    Admin: KPI totals
router.get('/summary', protect, admin, async (req, res) => {
  try {
    const [totalOrders, totalCustomers, totalProducts, revenueAgg] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Product.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
    ]);

    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const lowStockProducts = await Product.countDocuments({ stockQuantity: { $gt: 0, $lte: 5 } });

    res.json({
      totalOrders,
      totalCustomers,
      totalProducts,
      totalRevenue: revenueAgg[0]?.total || 0,
      pendingOrders,
      lowStockProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/analytics/sales
// @desc    Admin: daily sales for last 30 days
router.get('/sales', protect, admin, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const sales = await Order.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo }, paymentStatus: 'paid' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', revenue: 1, orders: 1, _id: 0 } },
    ]);

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/analytics/top-products
// @desc    Admin: top 8 selling products
router.get('/top-products', protect, admin, async (req, res) => {
  try {
    const top = await Order.aggregate([
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.productId',
          name: { $first: '$products.name' },
          image: { $first: '$products.image' },
          totalSold: { $sum: '$products.quantity' },
          totalRevenue: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 8 },
    ]);
    res.json(top);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/analytics/category-sales
// @desc    Admin: revenue by category
router.get('/category-sales', protect, admin, async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $unwind: '$products' },
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'productData',
        },
      },
      { $unwind: '$productData' },
      {
        $group: {
          _id: '$productData.category',
          revenue: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
          orders: { $sum: '$products.quantity' },
        },
      },
      { $project: { category: '$_id', revenue: 1, orders: 1, _id: 0 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
