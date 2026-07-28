const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const sampleProducts = [
  // 1. ADULT MEN
  {
    name: 'Classic Oxford Button-Down Cotton Shirt',
    description: 'Tailored for the modern gentleman. Crafted from 100% breathable Egyptian Oxford cotton with reinforced collar, buttoned cuffs, and a flattering regular-slim profile.',
    category: 'men',
    subCategory: 'shirts',
    targetAudience: 'Adult Men',
    price: 6490,
    originalPrice: 7500,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Premium Egyptian Cotton',
    fit: 'Classic Tailored Fit',
    colors: [{ name: 'Sky Blue', hex: '#60A5FA' }],
    sizes: [
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 18 },
      { size: 'XXL', stock: 10 }
    ],
    color: 'Sky Blue',
    brand: 'UrbanCraft Men',
    stockQuantity: 63,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 54
  },
  {
    name: 'Slim-Fit Stretch Denim Jeans',
    description: 'Versatile dark indigo denim built with flex-stretch cotton for unrestricted movement and durable daily wear.',
    category: 'men',
    subCategory: 'pants',
    targetAudience: 'Adult Men',
    price: 7850,
    originalPrice: 8900,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop'
    ],
    fabric: '98% Cotton, 2% Elastane Flex Denim',
    fit: 'Slim Tapered Fit',
    colors: [{ name: 'Dark Indigo', hex: '#1E3A8A' }],
    sizes: [
      { size: 'M', stock: 12 },
      { size: 'L', stock: 16 },
      { size: 'XL', stock: 14 },
      { size: 'XXL', stock: 8 }
    ],
    color: 'Dark Indigo',
    brand: 'DenimCo Men',
    stockQuantity: 50,
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    numReviews: 42
  },

  // 2. ADULT WOMEN
  {
    name: 'Elegant Midi Wrap Silk Blend Dress',
    description: 'Graceful flowing silhouette featuring an adjustable waist wrap tie, deep V-neckline, and subtle flutter sleeves.',
    category: 'women',
    subCategory: 'dresses',
    targetAudience: 'Adult Women',
    price: 9850,
    originalPrice: 11500,
    discount: 14,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop'
    ],
    fabric: '70% Silk, 30% Breathable Rayon',
    fit: 'Adjustable Wrap Fit',
    colors: [{ name: 'Emerald Green', hex: '#047857' }],
    sizes: [
      { size: 'M', stock: 14 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 8 }
    ],
    color: 'Emerald Green',
    brand: 'Aura Women',
    stockQuantity: 52,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 61
  },
  {
    name: 'Tailored Double-Breasted Executive Blazer',
    description: 'Chic structured blazer with sharp peak lapels, tortoise-shell buttons, and full inner lining.',
    category: 'women',
    subCategory: 'jackets',
    targetAudience: 'Adult Women',
    price: 11500,
    originalPrice: 13000,
    discount: 11,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=1000&auto=format&fit=crop'
    ],
    fabric: 'Structured Poly-Viscose Suiting Fabric',
    fit: 'Tailored Professional Fit',
    colors: [{ name: 'Cream Beige', hex: '#F3E8DC' }],
    sizes: [
      { size: 'M', stock: 10 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 6 }
    ],
    color: 'Cream Beige',
    brand: 'VogueLines Women',
    stockQuantity: 43,
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    numReviews: 36
  },

  // 3. CHILD MEN (BOYS)
  {
    name: 'Dino Adventure Fleece Hoodie (Boys)',
    description: 'Cozy fleece-lined cotton hoodie featuring energetic dinosaur graphics and front kangaroo pocket for active young boys.',
    category: 'boys',
    subCategory: 'hoodies',
    targetAudience: 'Child Men (Boys)',
    price: 4250,
    originalPrice: 4800,
    discount: 11,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1000&auto=format&fit=crop'
    ],
    fabric: '80% Cotton, 20% Soft Fleece',
    fit: 'Regular Kids Fit',
    colors: [{ name: 'Navy Blue', hex: '#1E3A8A' }],
    sizes: [
      { size: '2-3Y', stock: 15 },
      { size: '4-5Y', stock: 20 },
      { size: '6-7Y', stock: 18 },
      { size: '8-9Y', stock: 12 }
    ],
    color: 'Navy Blue',
    brand: 'LittleStars Boys',
    stockQuantity: 65,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 38
  },

  // 4. CHILD WOMEN (GIRLS)
  {
    name: 'Sunshine Floral Twirl Summer Dress (Girls)',
    description: 'Adorable 100% cotton dress with vibrant floral blooms and a full circle twirl skirt that young girls adore.',
    category: 'girls',
    subCategory: 'dresses',
    targetAudience: 'Child Women (Girls)',
    price: 4750,
    originalPrice: 5500,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Organic Breathable Cotton',
    fit: 'Fit & Flare Twirl Fit',
    colors: [{ name: 'Yellow Blossom', hex: '#F59E0B' }],
    sizes: [
      { size: '2-3Y', stock: 16 },
      { size: '4-5Y', stock: 22 },
      { size: '6-7Y', stock: 20 },
      { size: '8-9Y', stock: 14 }
    ],
    color: 'Yellow Blossom',
    brand: 'BloomKids Girls',
    stockQuantity: 72,
    isFeatured: true,
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    numReviews: 51
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cloth_shop_db';
    
    await mongoose.connect(mongoUri, { dbName: 'cloth_shop_db' });
    console.log('Connected to MongoDB for seeding Clothing Store...');

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const customerPassword = await bcrypt.hash('password123', salt);
    const adminPassword = await bcrypt.hash('admin123', salt);

    await User.insertMany([
      {
        name: 'John Customer',
        email: 'customer@example.com',
        password: customerPassword,
        phone: '+94 77 123 4567',
        role: 'customer',
        address: { street: '123 Fashion Ave', city: 'Colombo 03', state: 'Western Province', zipCode: '00300', country: 'Sri Lanka' },
      },
      {
        name: 'Store Admin',
        email: 'admin@example.com',
        password: adminPassword,
        phone: '+94 77 987 6543',
        role: 'admin',
        address: { street: '500 HQ Plaza', city: 'Colombo 03', state: 'Western Province', zipCode: '00300', country: 'Sri Lanka' },
      },
    ]);

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${createdProducts.length} Clothing products (Adult Men M/L/XL/XXL, Adult Women M/L/XL/XXL, Child Men, Child Women) successfully!`);

    process.exit();
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
