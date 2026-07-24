const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const sampleProducts = [
  // MEN'S CLOTHING
  {
    name: 'Classic Oxford Cotton Shirt',
    description: 'Premium 100% breathable Egyptian cotton oxford button-down shirt. Perfect for business casual and semi-formal wear.',
    category: 'men',
    subCategory: 'shirts',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 30 },
      { size: 'XL', stock: 20 },
      { size: 'XXL', stock: 10 },
      { size: 'XXXL', stock: 5 }
    ],
    color: 'Light Blue',
    brand: 'UrbanCraft',
  },
  {
    name: 'Slim-Fit Stretch Denim Jeans',
    description: 'Modern slim fit jeans crafted with durable stretch cotton denim for maximum comfort and flexible all-day movement.',
    category: 'men',
    subCategory: 'pants',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c36856842?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 15 },
      { size: 'XXL', stock: 8 },
      { size: 'XXXL', stock: 4 }
    ],
    color: 'Dark Indigo',
    brand: 'DenimCo',
  },
  {
    name: 'Urban Heritage Biker Leather Jacket',
    description: 'Rugged genuine leather biker jacket with asymmetrical zip closure, quilted shoulder padding, and metallic hardware details.',
    category: 'men',
    subCategory: 'jackets',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 8 },
      { size: 'XXL', stock: 4 },
      { size: 'XXXL', stock: 2 }
    ],
    color: 'Matte Black',
    brand: 'LeatherSmith',
  },
  {
    name: 'Minimalist Crewneck Heavyweight Tee',
    description: 'Ultra-soft heavy organic cotton t-shirt with reinforced crew neck collar for timeless casual style.',
    category: 'men',
    subCategory: 't-shirts',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: 'XS', stock: 20 },
      { size: 'S', stock: 40 },
      { size: 'M', stock: 50 },
      { size: 'L', stock: 45 },
      { size: 'XL', stock: 30 },
      { size: 'XXL', stock: 25 },
      { size: 'XXXL', stock: 10 }
    ],
    color: 'Heather Grey',
    brand: 'StyleVerse',
  },

  // WOMEN'S CLOTHING
  {
    name: 'Elegant Midi Wrap Silk Dress',
    description: 'Flowing silk blend midi dress featuring an adjustable waist wrap tie, V-neckline, and flutter sleeves.',
    category: 'women',
    subCategory: 'dresses',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 7 },
      { size: 'XXXL', stock: 3 }
    ],
    color: 'Emerald Green',
    brand: 'Aura Label',
  },
  {
    name: 'Chic Tailored Double-Breasted Blazer',
    description: 'Sophisticated structured blazer with sharp peak lapels and tortoiseshell buttons for office and evening chic styling.',
    category: 'women',
    subCategory: 'jackets',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 10 },
      { size: 'XXL', stock: 5 },
      { size: 'XXXL', stock: 2 }
    ],
    color: 'Cream Beige',
    brand: 'VogueLines',
  },
  {
    name: 'High-Waisted Flare Ankle Jeans',
    description: 'Retro-inspired high rise flared jeans featuring flattering vintage wash denim with slight stretch comfort.',
    category: 'women',
    subCategory: 'pants',
    price: 54.99,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 15 },
      { size: 'XXL', stock: 10 },
      { size: 'XXXL', stock: 5 }
    ],
    color: 'Vintage Wash',
    brand: 'DenimCo',
  },
  {
    name: 'Boho Floral Print Chiffon Top',
    description: 'Lightweight breathable chiffon blouse with intricate floral motifs, gathered wrist cuffs, and keyhole back closure.',
    category: 'women',
    subCategory: 'shirts',
    price: 34.99,
    images: [
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: 'XS', stock: 12 },
      { size: 'S', stock: 20 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 25 },
      { size: 'XL', stock: 18 },
      { size: 'XXL', stock: 12 },
      { size: 'XXXL', stock: 6 }
    ],
    color: 'Blush Pink',
    brand: 'Aura Label',
  },

  // BOYS' CLOTHING (KIDS - MALE)
  {
    name: 'Dino Adventure Graphic Hoodie',
    description: 'Cozy fleece-lined cotton hoodie featuring cool dinosaur illustrations and front kangaroo pocket for energetic young explorers.',
    category: 'boys',
    subCategory: 'hoodies',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: '2-3Y', stock: 15 },
      { size: '4-5Y', stock: 20 },
      { size: '6-7Y', stock: 25 },
      { size: '8-9Y', stock: 18 }
    ],
    color: 'Navy Blue',
    brand: 'LittleStars',
  },
  {
    name: 'Rugged Kids Denim Trucker Jacket',
    description: 'Classic durable denim jacket for boys with button chest pockets and soft collar line.',
    category: 'boys',
    subCategory: 'jackets',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: '2-3Y', stock: 10 },
      { size: '4-5Y', stock: 14 },
      { size: '6-7Y', stock: 16 },
      { size: '8-9Y', stock: 12 }
    ],
    color: 'Light Wash Blue',
    brand: 'JuniorDenim',
  },
  {
    name: 'Comfort Active Jogger Pants',
    description: 'Soft cotton fleece joggers with elastic drawcord waistband and ribbed ankles for daily play and school activities.',
    category: 'boys',
    subCategory: 'pants',
    price: 22.99,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: '2-3Y', stock: 25 },
      { size: '4-5Y', stock: 30 },
      { size: '6-7Y', stock: 28 },
      { size: '8-9Y', stock: 20 }
    ],
    color: 'Charcoal Grey',
    brand: 'LittleStars',
  },

  // GIRLS' CLOTHING (KIDS - FEMALE)
  {
    name: 'Sunshine Floral Twirl Summer Dress',
    description: 'Adorable 100% cotton dress with vibrant floral blooms and full circle twirl skirt that girls love.',
    category: 'girls',
    subCategory: 'dresses',
    price: 32.99,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: '2-3Y', stock: 18 },
      { size: '4-5Y', stock: 22 },
      { size: '6-7Y', stock: 20 },
      { size: '8-9Y', stock: 15 }
    ],
    color: 'Yellow Blossom',
    brand: 'BloomKids',
  },
  {
    name: 'Unicorn Sparkle Knit Sweater',
    description: 'Charming soft knit pullover sweater featuring embroidered unicorn design and sparkling sequin accents.',
    category: 'girls',
    subCategory: 'sweaters',
    price: 27.99,
    images: [
      'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: '2-3Y', stock: 12 },
      { size: '4-5Y', stock: 18 },
      { size: '6-7Y', stock: 16 },
      { size: '8-9Y', stock: 10 }
    ],
    color: 'Pastel Lavender',
    brand: 'BloomKids',
  },
  {
    name: 'Denim Bib Overalls with Pocket',
    description: 'Cute retro denim overalls featuring adjustable shoulder straps, chest bib pocket, and durable stitch construction.',
    category: 'girls',
    subCategory: 'pants',
    price: 36.99,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { size: '2-3Y', stock: 15 },
      { size: '4-5Y', stock: 20 },
      { size: '6-7Y', stock: 18 },
      { size: '8-9Y', stock: 14 }
    ],
    color: 'Classic Denim',
    brand: 'JuniorDenim',
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cloth_shop_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log('Cleared existing database records.');

    // Seed Demo Users
    const salt = await bcrypt.genSalt(10);
    const customerPassword = await bcrypt.hash('password123', salt);
    const adminPassword = await bcrypt.hash('admin123', salt);

    const users = await User.insertMany([
      {
        name: 'John Customer',
        email: 'customer@example.com',
        password: customerPassword,
        phone: '123-456-7890',
        role: 'customer',
        address: {
          street: '123 Fashion Ave',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
      },
      {
        name: 'Admin Manager',
        email: 'admin@example.com',
        password: adminPassword,
        phone: '987-654-3210',
        role: 'admin',
        address: {
          street: '500 HQ Plaza',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA',
        },
      },
    ]);

    console.log(`Seeded ${users.length} users (1 customer, 1 admin).`);

    // Calculate stockQuantity for each product before seeding
    const productsToSeed = sampleProducts.map((p) => {
      const stockQuantity = p.sizes.reduce((sum, s) => sum + s.stock, 0);
      return { ...p, stockQuantity };
    });

    const createdProducts = await Product.insertMany(productsToSeed);
    console.log(`Seeded ${createdProducts.length} products across Men's, Women's, Boys', and Girls' categories.`);

    console.log('\n--- SEEDING COMPLETED SUCCESSFULLY ---');
    console.log('Customer Credentials: customer@example.com / password123');
    console.log('Admin Credentials:    admin@example.com / admin123');

    process.exit();
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
