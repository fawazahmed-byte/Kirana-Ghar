import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { UserProvider } from './contexts/UserContext'
import { ToastProvider } from './contexts/ToastContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Brands from './pages/Brands'
import Deals from './pages/Deals'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import TopPicks from './pages/TopPicks'
import Trending from './pages/Trending'
import SeasonalDeals from './pages/SeasonalDeals'
import AiAssistant from './pages/AiAssistant'

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/top-picks" element={<TopPicks />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/seasonal-deals" element={<SeasonalDeals />} />
                <Route path="/ai-assistant" element={<AiAssistant />} />
              </Routes>
            </Layout>
          </Router>
        </ToastProvider>
      </CartProvider>
    </UserProvider>
  )
}

export default App
