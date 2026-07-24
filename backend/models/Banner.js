const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, default: '/products' },
    category: {
      type: String,
      enum: ['men', 'women', 'boys', 'girls', 'sale', 'all'],
      default: 'all',
    },
    position: { type: Number, default: 0 }, // display order
    isActive: { type: Boolean, default: true },
    bgColor: { type: String, default: '#f1f5f9' },
    textColor: { type: String, default: '#0f172a' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
