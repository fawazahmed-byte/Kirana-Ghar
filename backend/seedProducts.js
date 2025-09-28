const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  // Rice & Grains
  {
    name: "Premium Basmati Rice",
    description: "High-quality, aromatic basmati rice with long grains and rich flavor",
    price: 120,
    unit: "kg",
    category: "Rice & Grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
    featured: true,
    tags: ["basmati", "premium", "aromatic", "long-grain"],
    rating: 4.5,
    reviewCount: 234
  },
  {
    name: "Brown Rice",
    description: "Nutritious whole grain brown rice, rich in fiber and minerals",
    price: 140,
    unit: "kg",
    category: "Rice & Grains",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&h=500&fit=crop",
    featured: true,
    tags: ["brown", "whole-grain", "healthy", "fiber"],
    rating: 4.2,
    reviewCount: 156
  },
  {
    name: "White Rice",
    description: "Classic white rice, perfect for daily meals and easy to cook",
    price: 80,
    unit: "kg",
    category: "Rice & Grains",
    image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=500&h=500&fit=crop",
    tags: ["white", "classic", "daily", "affordable"],
    rating: 4.0,
    reviewCount: 89
  },
  {
    name: "Quinoa",
    description: "Superfood quinoa, high in protein and perfect for health-conscious consumers",
    price: 450,
    unit: "kg",
    category: "Rice & Grains",
    image: "https://images.unsplash.com/photo-1573225342350-16731dd9bf3d?w=500&h=500&fit=crop",
    tags: ["quinoa", "superfood", "protein", "healthy"],
    rating: 4.7,
    reviewCount: 78
  },

  // Pulses & Lentils
  {
    name: "Organic Toor Dal",
    description: "Protein-rich toor dal, perfect for making traditional Indian dal",
    price: 150,
    unit: "kg",
    category: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1599305445240-53ad89e269d8?w=500&h=500&fit=crop",
    featured: true,
    tags: ["toor", "organic", "protein", "dal"],
    rating: 4.4,
    reviewCount: 167
  },
  {
    name: "Masoor Dal",
    description: "Red lentils that cook quickly and are rich in nutrients",
    price: 130,
    unit: "kg",
    category: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1584542862473-6db94fe65604?w=500&h=500&fit=crop",
    featured: true,
    tags: ["masoor", "red-lentils", "quick-cook", "nutritious"],
    rating: 4.3,
    reviewCount: 134
  },
  {
    name: "Moong Dal",
    description: "Green gram dal, easy to digest and perfect for light meals",
    price: 160,
    unit: "kg",
    category: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=500&fit=crop",
    tags: ["moong", "green-gram", "digestible", "light"],
    rating: 4.2,
    reviewCount: 98
  },
  {
    name: "Chana Dal",
    description: "Split chickpeas, high in protein and fiber",
    price: 140,
    unit: "kg",
    category: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1583221052175-e5c0e9b8e7b7?w=500&h=500&fit=crop",
    tags: ["chana", "chickpeas", "protein", "fiber"],
    rating: 4.1,
    reviewCount: 76
  },

  // Oils & Fats
  {
    name: "Refined Sunflower Oil",
    description: "Light and healthy cooking oil, perfect for all types of cooking",
    price: 110,
    unit: "L",
    category: "Oils & Fats",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop",
    featured: true,
    tags: ["sunflower", "refined", "healthy", "cooking"],
    rating: 4.3,
    reviewCount: 203
  },
  {
    name: "Mustard Oil",
    description: "Strong-flavored traditional mustard oil for authentic taste",
    price: 180,
    unit: "L",
    category: "Oils & Fats",
    image: "https://images.unsplash.com/photo-1524492412173-bb6e8aa4d588?w=500&h=500&fit=crop",
    featured: true,
    tags: ["mustard", "traditional", "authentic", "strong-flavor"],
    rating: 4.5,
    reviewCount: 145
  },
  {
    name: "Coconut Oil",
    description: "Pure coconut oil for cooking and health benefits",
    price: 220,
    unit: "L",
    category: "Oils & Fats",
    image: "https://images.unsplash.com/photo-1602923002932-4ddb8a4e82be?w=500&h=500&fit=crop",
    tags: ["coconut", "pure", "health", "natural"],
    rating: 4.6,
    reviewCount: 112
  },

  // Sugar & Sweeteners
  {
    name: "Granulated Sugar",
    description: "Fine, free-flowing white sugar for all your sweetening needs",
    price: 45,
    unit: "kg",
    category: "Sugar & Sweeteners",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&h=500&fit=crop",
    featured: true,
    tags: ["sugar", "granulated", "white", "fine"],
    rating: 4.0,
    reviewCount: 267
  },
  {
    name: "Jaggery",
    description: "Natural unrefined sweetener, rich in minerals and nutrients",
    price: 60,
    unit: "kg",
    category: "Sugar & Sweeteners",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&h=500&fit=crop",
    featured: true,
    tags: ["jaggery", "natural", "unrefined", "minerals"],
    rating: 4.4,
    reviewCount: 189
  },
  {
    name: "Rock Sugar",
    description: "Natural rock sugar crystals for tea and desserts",
    price: 85,
    unit: "kg",
    category: "Sugar & Sweeteners",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&h=500&fit=crop",
    tags: ["rock-sugar", "crystals", "tea", "desserts"],
    rating: 4.2,
    reviewCount: 67
  },

  // Spices & Seasonings
  {
    name: "Turmeric Powder",
    description: "Pure turmeric powder with anti-inflammatory properties",
    price: 120,
    unit: "pack",
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&h=500&fit=crop",
    tags: ["turmeric", "powder", "anti-inflammatory", "pure"],
    rating: 4.5,
    reviewCount: 234
  },
  {
    name: "Red Chili Powder",
    description: "Spicy red chili powder for authentic Indian flavors",
    price: 100,
    unit: "pack",
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1599305445240-53ad89e269d8?w=500&h=500&fit=crop",
    tags: ["chili", "powder", "spicy", "indian"],
    rating: 4.3,
    reviewCount: 178
  },
  {
    name: "Garam Masala",
    description: "Aromatic blend of traditional Indian spices",
    price: 150,
    unit: "pack",
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop",
    tags: ["garam-masala", "aromatic", "blend", "traditional"],
    rating: 4.6,
    reviewCount: 156
  },

  // Vegetables
  {
    name: "Fresh Onions",
    description: "Fresh red onions, essential for everyday cooking",
    price: 30,
    unit: "kg",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop",
    tags: ["onions", "fresh", "red", "essential"],
    rating: 4.0,
    reviewCount: 134
  },
  {
    name: "Fresh Potatoes",
    description: "High-quality potatoes, perfect for all types of dishes",
    price: 25,
    unit: "kg",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop",
    tags: ["potatoes", "fresh", "versatile", "quality"],
    rating: 4.1,
    reviewCount: 98
  },

  // Fruits
  {
    name: "Fresh Bananas",
    description: "Ripe, sweet bananas rich in potassium and vitamins",
    price: 50,
    unit: "dozen",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=500&fit=crop",
    tags: ["bananas", "fresh", "sweet", "potassium"],
    rating: 4.2,
    reviewCount: 156
  },
  {
    name: "Fresh Apples",
    description: "Crisp and juicy apples, packed with nutrients",
    price: 120,
    unit: "kg",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop",
    tags: ["apples", "fresh", "crisp", "juicy"],
    rating: 4.4,
    reviewCount: 189
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kirana-ghar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();