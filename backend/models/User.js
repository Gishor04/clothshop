const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Recommended salt rounds for fast serverless performance (8 rounds ~ 35ms vs 12 rounds ~ 1200ms)
const SALT_ROUNDS = 8;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, default: '' },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      zipCode: { type: String, default: '' },
      country: { type: String, default: 'Sri Lanka' },
    },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    staffRole: { type: String, enum: ['super_admin', 'staff', null], default: null },
    isBlocked: { type: Boolean, default: false },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        size: String,
        quantity: { type: Number, default: 1 },
      },
    ],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// Fast password hashing before save (8 rounds for high-speed performance)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
