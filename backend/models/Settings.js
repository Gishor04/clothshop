const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: 'StyleVerse' },
    storeEmail: { type: String, default: 'support@styleverse.com' },
    storePhone: { type: String, default: '' },
    logoUrl: { type: String, default: '' },
    currency: { type: String, default: 'INR' },
    currencySymbol: { type: String, default: '₹' },
    shippingCharge: { type: Number, default: 9.99 },
    freeShippingAbove: { type: Number, default: 75 },
    taxRate: { type: Number, default: 8 }, // percentage
    razorpayKeyId: { type: String, default: '' },
    razorpayKeySecret: { type: String, default: '' },
    stripePublishableKey: { type: String, default: '' },
    stripeSecretKey: { type: String, default: '' },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
