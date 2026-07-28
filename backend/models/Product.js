const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['men', 'women', 'boys', 'girls'],
      lowercase: true,
      trim: true,
    },
    subCategory: { type: String, required: true, lowercase: true, trim: true },
    targetAudience: {
      type: String,
      enum: ['Adult Men', 'Adult Women', 'Child Men (Boys)', 'Child Women (Girls)'],
    },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    images: [{ type: String, required: true }],
    fabric: { type: String, default: '100% Premium Cotton' },
    fit: { type: String, default: 'Regular Fit' },
    careInstructions: { type: String, default: 'Machine wash cold with like colors. Tumble dry low.' },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
        image: { type: String },
      },
    ],
    sizes: [
      {
        size: { type: String, required: true }, // Adult: M, L, XL, XXL | Kids: 2-3Y, 4-5Y, 6-7Y, 8-9Y
        stock: { type: Number, required: true, default: 10, min: 0 },
      },
    ],
    color: { type: String, required: true, default: 'Navy' },
    brand: { type: String, required: true, default: 'UrbanStyle' },
    stockQuantity: { type: Number, required: true, default: 40 },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isOutOfStock: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    numReviews: { type: Number, default: 32 },
    features: [{ type: String }],
  },
  { timestamps: true }
);

// Auto calculate total stockQuantity from sizes before saving
productSchema.pre('save', function (next) {
  if (this.sizes && this.sizes.length > 0) {
    this.stockQuantity = this.sizes.reduce((sum, item) => sum + (item.stock || 0), 0);
  }
  if (this.stockQuantity === 0) this.isOutOfStock = true;
  next();
});

// Virtual: discounted price
productSchema.virtual('salePrice').get(function () {
  if (!this.discount || this.discount === 0) return this.price;
  return parseFloat((this.price * (1 - this.discount / 100)).toFixed(2));
});

module.exports = mongoose.model('Product', productSchema);
