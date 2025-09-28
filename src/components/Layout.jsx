import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useUser } from '../contexts/UserContext'
import { Search, Heart, ShoppingCart, User, Mic, Camera } from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  const { getCartCount } = useCart()
  const { user, logout } = useUser()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const cartCount = getCartCount()

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.length >= 2) {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const results = await response.json()
        setSearchResults(results)
        setShowSearchResults(true)
      } catch (error) {
        console.error('Search error:', error)
      }
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-zinc-900 dark:text-zinc-200">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-zinc-200/50 dark:border-zinc-800/50 px-10 py-5">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <img 
              alt="Kirana Ghar Logo" 
              className="h-12 w-auto" 
              src="data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M200 60c-44.18 0-80 35.82-80 80v20h-20c-11.05 0-20 8.95-20 20v200c0 33.14 26.86 60 60 60h200c33.14 0 60-26.86 60-60V180c0-11.05-8.95-20-20-20h-20v-20c0-44.18-35.82-80-80-80H200zm0 20h80c33.14 0 60 26.86 60 60v20H140v-20c0-33.14 26.86-60 60-60zm-80 100h240s0 180 0 180c0 22.09-17.91 40-40 40H160c-22.09 0-40-17.91-40-40V180z' fill='%23f97316'/%3E%3Cg transform='translate(50,20)'%3E%3Cpath d='M180 200h140v30c0 16.57-13.43 30-30 30h-20v-20h-20v20h-20v-20h-20v20h-20c-16.57 0-30-13.43-30-30v-30z' fill='%23f97316'/%3E%3Crect x='190' y='260' width='10' height='40' fill='%23f97316'/%3E%3Crect x='300' y='260' width='10' height='40' fill='%23f97316'/%3E%3Crect x='180' y='300' width='140' height='20' fill='%23f97316'/%3E%3Crect x='235' y='260' width='30' height='40' fill='white' stroke='%23f97316' stroke-width='3'/%3E%3Ccircle cx='258' cy='280' r='2' fill='%23f97316'/%3E%3C/g%3E%3Ctext x='250' y='420' text-anchor='middle' font-size='48' font-weight='bold' font-family='Arial, sans-serif' fill='%23f97316'%3EKIRANA%3C/text%3E%3Ctext x='250' y='470' text-anchor='middle' font-size='48' font-weight='bold' font-family='Arial, sans-serif' fill='%23f97316'%3EGHAR%3C/text%3E%3C/svg%3E"
            />
            <span className="text-xl font-bold text-zinc-900 dark:text-white">Kirana Ghar</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-10">
            <Link 
              to="/" 
              className={`text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-base font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Products
            </Link>
            
            {/* AI Assistant Button */}
            <Link 
              to="/ai-assistant" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-all ${
                isActive('/ai-assistant') 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 border border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-lg">smart_toy</span>
              AI Assistant
            </Link>
            
            {/* AI Features Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors py-2">
                <span className="material-symbols-outlined text-lg text-primary">auto_awesome</span>
                AI Features
              </button>
              {/* Hover bridge */}
              <div className="absolute top-full left-0 right-0 h-2 hidden group-hover:block"></div>
              <div className="absolute z-10 top-full left-0 mt-2 w-72 rounded-xl bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform translate-y-1 group-hover:translate-y-0">
                <div className="py-2">
                  <Link to="/ai-assistant" className="flex items-center gap-4 px-5 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                    <span className="material-symbols-outlined text-primary">smart_toy</span>
                    <div>
                      <p className="font-semibold">AI Assistant</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Chat with AI for business insights</p>
                    </div>
                  </Link>
                  <a className="flex items-center gap-4 px-5 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors" href="#">
                    <span className="material-symbols-outlined text-primary">trending_up</span>
                    <div>
                      <p className="font-semibold">Local Trends</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Products popular in your area</p>
                    </div>
                  </a>
                  <a className="flex items-center gap-4 px-5 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors" href="#">
                    <span className="material-symbols-outlined text-primary">inventory_2</span>
                    <div>
                      <p className="font-semibold">Smart Reorders</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">AI-powered suggestions</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <Link 
              to="/brands" 
              className={`text-base font-medium transition-colors ${
                isActive('/brands') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Brands
            </Link>
            <Link 
              to="/deals" 
              className={`text-base font-medium transition-colors ${
                isActive('/deals') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Deals
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 justify-end gap-5">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="text-zinc-400 dark:text-zinc-500 h-5 w-5" />
            </div>
            <input 
              type="search"
              className="w-full rounded-xl border-0 bg-zinc-100 dark:bg-zinc-800/50 h-12 pl-12 pr-24 text-base text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-3">
              <button className="text-zinc-400 dark:text-zinc-500 hover:text-primary dark:hover:text-primary transition-colors">
                <Mic className="h-6 w-6" />
              </button>
              <button className="text-zinc-400 dark:text-zinc-500 hover:text-primary dark:hover:text-primary transition-colors">
                <Camera className="h-6 w-6" />
              </button>
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-50">
                <div className="p-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <div key={result.id} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg cursor-pointer">
                        <p className="font-medium text-zinc-900 dark:text-white">{result.name}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">₹{result.price}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 p-2">No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors relative group">
            <Heart className="h-6 w-6 group-hover:text-red-500 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">
              0
            </span>
          </button>
          
          {/* Cart Button */}
          <Link 
            to="/cart" 
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* User Actions */}
          <div className="flex items-center gap-3">
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              <User className="h-6 w-6" />
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-300">Welcome, {user.username}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold h-12 px-6 rounded-xl text-base hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary text-white font-semibold h-12 px-6 rounded-xl text-base flex items-center gap-2 hover:bg-primary/90 transition-transform transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  )
}

export default Layout
