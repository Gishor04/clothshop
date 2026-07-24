const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ── Routes ──────────────────────────────────────────
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/products',  require('./routes/productRoutes'));
app.use('/api/cart',      require('./routes/cartRoutes'));
app.use('/api/orders',    require('./routes/orderRoutes'));
app.use('/api/coupons',   require('./routes/couponRoutes'));
app.use('/api/banners',   require('./routes/bannerRoutes'));
app.use('/api/reviews',   require('./routes/reviewRoutes'));
app.use('/api/settings',  require('./routes/settingsRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// ── Health check ─────────────────────────────────────
app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', message: 'StyleVerse API running' })
);

app.get('/', (req, res) => res.send('StyleVerse E-commerce API'));

// ── Global error handler ─────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () =>
    console.log(`Server running in development mode on port ${PORT}`)
  );
}

module.exports = app;
