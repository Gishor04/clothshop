const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ['percentage', 'flat'], required: true },
    value: { type: Number, required: true, min: 0 },
    minOrderAmount: { type: Number, default: 0 },
    maxUses: { type: Number, default: null }, // null = unlimited
    usedCount: { type: Number, default: 0 },
    expiryDate: { type: Date, default: null }, // null = never expires
    isActive: { type: Boolean, default: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

// Virtual: is expired
couponSchema.virtual('isExpired').get(function () {
  if (!this.expiryDate) return false;
  return new Date() > this.expiryDate;
});

// Virtual: is exhausted
couponSchema.virtual('isExhausted').get(function () {
  if (this.maxUses === null) return false;
  return this.usedCount >= this.maxUses;
});

module.exports = mongoose.model('Coupon', couponSchema);
