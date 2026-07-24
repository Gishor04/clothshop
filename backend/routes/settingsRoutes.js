const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect, admin } = require('../middleware/auth');

// Helper: get or create settings doc (singleton)
const getSettings = async () => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return settings;
};

// @route   GET /api/settings
// @desc    Public: get store settings (non-sensitive fields)
router.get('/', async (req, res) => {
  try {
    const settings = await getSettings();
    // Strip sensitive keys from public response
    const {
      storeName, storeEmail, storePhone, logoUrl, currency, currencySymbol,
      shippingCharge, freeShippingAbove, taxRate, socialLinks,
    } = settings;
    res.json({ storeName, storeEmail, storePhone, logoUrl, currency, currencySymbol, shippingCharge, freeShippingAbove, taxRate, socialLinks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/settings/admin
// @desc    Admin: get full settings including payment keys
router.get('/admin', protect, admin, async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/settings
// @desc    Admin: update settings
router.put('/', protect, admin, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
