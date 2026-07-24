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
    },
    subCategory: { type: String, required: true, lowercase: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 }, // percentage
    images: [{ type: String, required: true }],
    sizes: [
      {
        size: { type: String, required: true },
        stock: { type: Number, required: true, default: 0, min: 0 },
      },
    ],
    color: { type: String, required: true },
    brand: { type: String, required: true, default: 'StyleVerse' },
    stockQuantity: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isOutOfStock: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto calculate total stockQuantity from sizes before saving
productSchema.pre('save', function (next) {
  if (this.sizes && this.sizes.length > 0) {
    this.stockQuantity = this.sizes.reduce((sum, item) => sum + (item.stock || 0), 0);
  }
  // Auto mark as out of stock
  if (this.stockQuantity === 0) this.isOutOfStock = true;
  next();
});

// Virtual: discounted price
productSchema.virtual('salePrice').get(function () {
  if (!this.discount || this.discount === 0) return this.price;
  return parseFloat((this.price * (1 - this.discount / 100)).toFixed(2));
});

module.exports = mongoose.model('Product', productSchema);
