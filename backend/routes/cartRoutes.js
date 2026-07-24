const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// @route   GET /api/cart
// @desc    Get current user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.productId');
    res.json(user.cart || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart/add
// @desc    Add product item to user's cart
// @access  Private
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: 'Product ID and size are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check size availability
    const sizeObj = product.sizes.find((s) => s.size === size);
    if (!sizeObj || sizeObj.stock < 1) {
      return res.status(400).json({ message: `Size ${size} is out of stock` });
    }

    const user = await User.findById(req.user._id);

    // Check if item with same productId and size is already in cart
    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    const qtyToAdd = Number(quantity) || 1;

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += qtyToAdd;
    } else {
      user.cart.push({
        productId,
        size,
        quantity: qtyToAdd,
      });
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.productId');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/cart/update
// @desc    Update quantity of cart item
// @access  Private
router.put('/update', protect, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const user = await User.findById(req.user._id);
    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex].quantity = quantity;
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.productId');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart/remove/:productId/:size
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:productId/:size', protect, async (req, res) => {
  try {
    const { productId, size } = req.params;

    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    );

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.productId');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// @access  Private
router.delete('/clear', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
