const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/reviews
// @desc    Admin: get all reviews with filters
router.get('/', protect, admin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const reviews = await Review.find(filter)
      .populate('productId', 'name images')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/reviews/product/:productId
// @desc    Public: get approved reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
      status: 'approved',
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/reviews/:productId
// @desc    Protected: submit a review
router.post('/:productId', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const existing = await Review.findOne({
      productId: req.params.productId,
      userId: req.user._id,
    });
    if (existing) return res.status(400).json({ message: 'You have already reviewed this product' });

    const review = await Review.create({
      productId: req.params.productId,
      userId: req.user._id,
      userName: req.user.name,
      rating,
      comment,
      status: 'pending',
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/reviews/:id/status
// @desc    Admin: approve / flag review
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body; // 'approved' | 'flagged'
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('productId', 'name');

    if (!review) return res.status(404).json({ message: 'Review not found' });

    // Recalculate product rating if approved
    if (status === 'approved') {
      const approved = await Review.find({ productId: review.productId, status: 'approved' });
      const avg = approved.reduce((s, r) => s + r.rating, 0) / approved.length;
      await Product.findByIdAndUpdate(review.productId, {
        rating: parseFloat(avg.toFixed(1)),
        numReviews: approved.length,
      });
    }

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Admin: delete review
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
