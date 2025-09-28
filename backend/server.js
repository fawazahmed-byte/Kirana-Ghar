const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory product data with Google images
const products = [
  // Rice & Grains
  {
    id: 1,
    name: "Premium Basmati Rice",
    description: "High-quality, aromatic basmati rice with long grains and rich flavor",
    price: 120,
    unit: "kg",
    category: "Rice & Grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
    featured: true,
    tags: ["basmati", "premium", "aromatic", "long-grain"],
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 2,
    name: "Brown Rice",
    description: "Nutritious whole grain brown rice, rich in fiber and minerals",
    price: 140,
    unit: "kg",
    category: "Rice & Grains",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&h=500&fit=crop",
    featured: true,
    tags: ["brown", "whole-grain", "healthy", "fiber"],
    rating: 4.2,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 3,
    name: "White Rice",
    description: "Classic white rice, perfect for daily meals and easy to cook",
    price: 80,
    unit: "kg",
    category: "Rice & Grains",
    image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=500&h=500&fit=crop",
    tags: ["white", "classic", "daily", "affordable"],
    rating: 4.0,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 4,
    name: "Quinoa",
    description: "Superfood quinoa, high in protein and perfect for health-conscious consumers",
    price: 450,
    unit: "kg",
    category: "Rice & Grains",
    image: "https://images.unsplash.com/photo-1573225342350-16731dd9bf3d?w=500&h=500&fit=crop",
    tags: ["quinoa", "superfood", "protein", "healthy"],
    rating: 4.7,
    reviewCount: 78,
    inStock: true,
    stockQuantity: 100
  },
  // Pulses & Lentils
  {
    id: 5,
    name: "Organic Toor Dal",
    description: "Protein-rich toor dal, perfect for making traditional Indian dal",
    price: 150,
    unit: "kg",
    category: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1599305445240-53ad89e269d8?w=500&h=500&fit=crop",
    featured: true,
    tags: ["toor", "organic", "protein", "dal"],
    rating: 4.4,
    reviewCount: 167,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 6,
    name: "Masoor Dal",
    description: "Red lentils that cook quickly and are rich in nutrients",
    price: 130,
    unit: "kg",
    category: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1584542862473-6db94fe65604?w=500&h=500&fit=crop",
    featured: true,
    tags: ["masoor", "red-lentils", "quick-cook", "nutritious"],
    rating: 4.3,
    reviewCount: 134,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 7,
    name: "Moong Dal",
    description: "Green gram dal, easy to digest and perfect for light meals",
    price: 160,
    unit: "kg",
    category: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=500&fit=crop",
    tags: ["moong", "green-gram", "digestible", "light"],
    rating: 4.2,
    reviewCount: 98,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 8,
    name: "Chana Dal",
    description: "Split chickpeas, high in protein and fiber",
    price: 140,
    unit: "kg",
    category: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1583221052175-e5c0e9b8e7b7?w=500&h=500&fit=crop",
    tags: ["chana", "chickpeas", "protein", "fiber"],
    rating: 4.1,
    reviewCount: 76,
    inStock: true,
    stockQuantity: 100
  },
  // Oils & Fats
  {
    id: 9,
    name: "Refined Sunflower Oil",
    description: "Light and healthy cooking oil, perfect for all types of cooking",
    price: 110,
    unit: "L",
    category: "Oils & Fats",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop",
    featured: true,
    tags: ["sunflower", "refined", "healthy", "cooking"],
    rating: 4.3,
    reviewCount: 203,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 10,
    name: "Mustard Oil",
    description: "Strong-flavored traditional mustard oil for authentic taste",
    price: 180,
    unit: "L",
    category: "Oils & Fats",
    image: "https://images.unsplash.com/photo-1524492412173-bb6e8aa4d588?w=500&h=500&fit=crop",
    featured: true,
    tags: ["mustard", "traditional", "authentic", "strong-flavor"],
    rating: 4.5,
    reviewCount: 145,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 11,
    name: "Coconut Oil",
    description: "Pure coconut oil for cooking and health benefits",
    price: 220,
    unit: "L",
    category: "Oils & Fats",
    image: "https://images.unsplash.com/photo-1602923002932-4ddb8a4e82be?w=500&h=500&fit=crop",
    tags: ["coconut", "pure", "health", "natural"],
    rating: 4.6,
    reviewCount: 112,
    inStock: true,
    stockQuantity: 100
  },
  // Sugar & Sweeteners
  {
    id: 12,
    name: "Granulated Sugar",
    description: "Fine, free-flowing white sugar for all your sweetening needs",
    price: 45,
    unit: "kg",
    category: "Sugar & Sweeteners",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&h=500&fit=crop",
    featured: true,
    tags: ["sugar", "granulated", "white", "fine"],
    rating: 4.0,
    reviewCount: 267,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 13,
    name: "Jaggery",
    description: "Natural unrefined sweetener, rich in minerals and nutrients",
    price: 60,
    unit: "kg",
    category: "Sugar & Sweeteners",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&h=500&fit=crop",
    featured: true,
    tags: ["jaggery", "natural", "unrefined", "minerals"],
    rating: 4.4,
    reviewCount: 189,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 14,
    name: "Rock Sugar",
    description: "Natural rock sugar crystals for tea and desserts",
    price: 85,
    unit: "kg",
    category: "Sugar & Sweeteners",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&h=500&fit=crop",
    tags: ["rock-sugar", "crystals", "tea", "desserts"],
    rating: 4.2,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 100
  },
  // Spices & Seasonings
  {
    id: 15,
    name: "Turmeric Powder",
    description: "Pure turmeric powder with anti-inflammatory properties",
    price: 120,
    unit: "pack",
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&h=500&fit=crop",
    tags: ["turmeric", "powder", "anti-inflammatory", "pure"],
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 16,
    name: "Red Chili Powder",
    description: "Spicy red chili powder for authentic Indian flavors",
    price: 100,
    unit: "pack",
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1599305445240-53ad89e269d8?w=500&h=500&fit=crop",
    tags: ["chili", "powder", "spicy", "indian"],
    rating: 4.3,
    reviewCount: 178,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 17,
    name: "Garam Masala",
    description: "Aromatic blend of traditional Indian spices",
    price: 150,
    unit: "pack",
    category: "Spices & Seasonings",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop",
    tags: ["garam-masala", "aromatic", "blend", "traditional"],
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 100
  },
  // Vegetables
  {
    id: 18,
    name: "Fresh Onions",
    description: "Fresh red onions, essential for everyday cooking",
    price: 30,
    unit: "kg",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop",
    tags: ["onions", "fresh", "red", "essential"],
    rating: 4.0,
    reviewCount: 134,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 19,
    name: "Fresh Potatoes",
    description: "High-quality potatoes, perfect for all types of dishes",
    price: 25,
    unit: "kg",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop",
    tags: ["potatoes", "fresh", "versatile", "quality"],
    rating: 4.1,
    reviewCount: 98,
    inStock: true,
    stockQuantity: 100
  },
  // Fruits
  {
    id: 20,
    name: "Fresh Bananas",
    description: "Ripe, sweet bananas rich in potassium and vitamins",
    price: 50,
    unit: "dozen",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=500&fit=crop",
    tags: ["bananas", "fresh", "sweet", "potassium"],
    rating: 4.2,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 100
  },
  {
    id: 21,
    name: "Fresh Apples",
    description: "Crisp and juicy apples, packed with nutrients",
    price: 120,
    unit: "kg",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop",
    tags: ["apples", "fresh", "crisp", "juicy"],
    rating: 4.4,
    reviewCount: 189,
    inStock: true,
    stockQuantity: 100
  }
];

// In-memory cart storage (in a real app, this would be in a database)
let carts = {}; // { userId: { items: [], totalAmount: 0 } }

// Routes

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Kirana Ghar Backend API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      cart: '/api/cart',
      auth: '/api/auth'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all products with filtering and sorting
app.get('/api/products', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      sortBy = 'name', 
      sortOrder = 'asc', 
      page = 1, 
      limit = 20,
      minPrice,
      maxPrice,
      featured
    } = req.query;

    let filteredProducts = [...products];
    
    // Filter by category
    if (category && category !== '') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }
    
    // Filter by search
    if (search && search !== '') {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter(product => {
        if (minPrice && product.price < parseFloat(minPrice)) return false;
        if (maxPrice && product.price > parseFloat(maxPrice)) return false;
        return true;
      });
    }
    
    // Filter by featured
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.featured);
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedProducts = filteredProducts.slice(skip, skip + parseInt(limit));
    const total = filteredProducts.length;

    res.json({
      products: paginatedProducts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = [...new Set(products.map(product => product.category))];
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cart API endpoints

// Get cart for a user (or session)
app.get('/api/cart', (req, res) => {
  try {
    // For simplicity, using a default cart ID
    // In a real app, this would be based on user authentication
    const cartId = req.query.userId || 'default';
    
    if (!carts[cartId]) {
      carts[cartId] = { items: [], totalAmount: 0 };
    }
    
    res.json(carts[cartId]);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add item to cart
app.post('/api/cart/add', (req, res) => {
  try {
    const { productId, quantity = 1, userId = 'default' } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (!carts[userId]) {
      carts[userId] = { items: [], totalAmount: 0 };
    }
    
    const existingItem = carts[userId].items.find(item => item.productId === parseInt(productId));
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      carts[userId].items.push({
        productId: parseInt(productId),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    // Recalculate total
    carts[userId].totalAmount = carts[userId].items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    res.json(carts[userId]);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update cart item quantity
app.put('/api/cart/update', (req, res) => {
  try {
    const { productId, quantity, userId = 'default' } = req.body;
    
    if (!productId || quantity === undefined) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }
    
    if (!carts[userId]) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const itemIndex = carts[userId].items.findIndex(item => item.productId === parseInt(productId));
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      carts[userId].items.splice(itemIndex, 1);
    } else {
      carts[userId].items[itemIndex].quantity = quantity;
    }
    
    // Recalculate total
    carts[userId].totalAmount = carts[userId].items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    res.json(carts[userId]);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove item from cart
app.delete('/api/cart/remove', (req, res) => {
  try {
    const { productId, userId = 'default' } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    if (!carts[userId]) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const itemIndex = carts[userId].items.findIndex(item => item.productId === parseInt(productId));
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    carts[userId].items.splice(itemIndex, 1);
    
    // Recalculate total
    carts[userId].totalAmount = carts[userId].items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    res.json(carts[userId]);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Clear cart
app.delete('/api/cart/clear', (req, res) => {
  try {
    const { userId = 'default' } = req.body;
    
    carts[userId] = { items: [], totalAmount: 0 };
    
    res.json(carts[userId]);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});