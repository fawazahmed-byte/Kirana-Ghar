import React, { useState, useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'

const Products = () => {
  const { addToCart } = useCart()
  const { showSuccess, showError } = useToast()
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    limit: 20
  })
  const [addingToCart, setAddingToCart] = useState(null)
  
  const { products, categories, loading, error, pagination, fetchProducts, fetchCategories } = useProducts()

  useEffect(() => {
    fetchProducts(filters)
    fetchCategories()
  }, [filters])

  const handleAddToCart = async (productId, quantity = 1) => {
    setAddingToCart(productId)
    try {
      const result = await addToCart(productId, quantity)
      if (result.success) {
        showSuccess(`Product added to cart successfully! \ud83d\udecd\ufe0f`)
      } else {
        showError(`Failed to add product to cart: ${result.message}`)
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      showError('An error occurred while adding the product to cart')
    } finally {
      setAddingToCart(null)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }))
  }

  const handleSortChange = (sortBy, sortOrder = 'asc') => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder,
      page: 1
    }))
  }

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="group relative bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div 
        className="aspect-square w-full bg-center bg-no-repeat bg-cover" 
        style={{ backgroundImage: `url('${product.image}')` }}
      />
      <div className="p-4">
        <h3 className="font-bold text-base text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-primary">₹{product.price}/{product.unit}</span>
          <button 
            onClick={() => handleAddToCart(product.id)}
            disabled={addingToCart === product.id}
            className="bg-primary/10 dark:bg-primary/20 text-primary rounded-full p-2 hover:bg-primary hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingToCart === product.id ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="material-symbols-outlined text-base">add_shopping_cart</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-12">
        {/* Cashback Banner */}
        <div className="bg-gradient-to-r from-primary to-blue-500 rounded-xl p-8 mb-8 text-white shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-5xl text-yellow-300">auto_awesome</span>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Instant Cashback Offer!</h2>
              <p className="text-lg mt-1 opacity-90">
                Buy above <span className="font-bold">₹5000/-</span> get instant{' '}
                <span className="font-bold text-yellow-300">₹1000/-</span> cashback.
              </p>
            </div>
          </div>
          <a className="bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors hidden sm:block" href="#">
            Shop Now
          </a>
        </div>

        {/* Header and Controls */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
          <div className="flex items-center gap-4">
            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-w-48"
            />
            
            {/* Filter Button */}
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2">
              <span className="material-symbols-outlined text-base">filter_list</span>
              Filter
            </button>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-')
                  handleSortChange(sortBy, sortOrder)
                }}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating-desc">Rating (High to Low)</option>
                <option value="featured-desc">Featured First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading products: {error}</p>
            <button 
              onClick={() => fetchProducts(filters)}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Combo Offers */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Combo Offers</h2>
          <a className="text-sm font-medium text-primary hover:underline" href="#">View All</a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Combo Offer 1 */}
          <div className="group relative bg-white dark:bg-background-dark/50 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-2/5 p-4 flex flex-col justify-center">
              <div className="flex -space-x-4 justify-center mb-4">
                <img 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-background-dark/50" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdD65LJzchr_W-A0RNJ_SccB1x3gBJLHhzQeeYD3orCfZjAwVZcEN_hoeTegJu0zunqNiDe4LgUOKChUYXrSb4nbBejk5f-X1ghKS59iK0qb32zdOsZ5PWr0ASFZbPSOBxCco3SOxfB8UyX3361qklU0aJNvDYRHkEQZD-9ByspunjDxAnn3O8y2L0ANso1U9ub3wI91tanQP4AXFrEEj4pU4zbstmWXvmLEbXJ3t5gstFnOUIHKMnJWu0IP0mT24VjyhvzVDbQlQ"
                  alt="Rice"
                />
                <img 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-background-dark/50" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzPHDsks9fGCJjgF24st9iU7tLioX462pW6aV8ESx0J9_5HJL5sgoBjl-Zvv5itHNlU9NAh4rJV6_uVX2qR7gMCm_Gk4f_BRghaJt7ra63X1KDlZ9t6P_NB_EqMI6M2bxB38ZBTIOPerMw-HlL2uglvYJTDiH3RNabUjsOeG_vViA9Ljsf1egQn_XxtOeE_yjnDLYaXhglG1k3DdoW24FuOAE9gig7TMrx2bHojHzWN13js-xNrnENySEb4LO8Opq5vjT1ogLASyc"
                  alt="Dal"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-white text-center">Staples Combo Pack</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Rice (5kg) + Toor Dal (2kg)</p>
            </div>
            <div className="sm:w-3/5 p-6 bg-primary/5 dark:bg-primary/10 flex flex-col justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  Get the essentials together and save big! Perfect for a family's monthly needs.
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">₹850</span>
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400 line-through">₹900</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Add Combo to Cart
              </button>
            </div>
          </div>

          {/* Combo Offer 2 */}
          <div className="group relative bg-white dark:bg-background-dark/50 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-2/5 p-4 flex flex-col justify-center">
              <div className="flex -space-x-4 justify-center mb-4">
                <img 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-background-dark/50" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB74ZTUs4xZinGk9WqBuBGo7Av3pKg0TGKmcGaG_ec5y-jodALTU_LwHT1d2qoAFV2ISFK0Jrw3cT1avSqNe4O2Bii70jIaN9Rt1vvPNqkAXicsR-yaITytUlLAUymH9c--IO4g3KQOwjIOrbokMaVVl_seOzLqq2ZPiZCKE-0chAQTu0Ww11gChYEWpMpBX5Aik4LFPh-eVhVIEVi7rQGs3szzynErZNsvie23hANQ6dBnTZcGtcU7Xd5UAJuWBEf3h8zCWX3Lbfo"
                  alt="Sunflower Oil"
                />
                <img 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-background-dark/50" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe1s9SkGNGfSUIuZHmQzPygh0vnel8XNmTPvUoP7PRlJkon6RlCo0myGWJHaGjKGzZNs71UJeSOg2vpCWSoa84kmx_lsJw5J4mDqrZSnuhrRU7x7WvsGt5vUfJ_waXaPw4IKlTU42x99t7q97AUXJXaoTKIXdTrOrJQz7Rgu03tiVCWNLs1lSj7Gi5rbJtI7kkl41_mPMshLXuGlFaMs-RGDbKwLkBJdIzKjIZUtoqTitoBoxGZr1oHSFwwnmatc07jjf-wBrA1Uw"
                  alt="Sugar"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-white text-center">Cooking Essentials Kit</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Sunflower Oil (5L) + Sugar (5kg)</p>
            </div>
            <div className="sm:w-3/5 p-6 bg-primary/5 dark:bg-primary/10 flex flex-col justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  Stock up your kitchen with this convenient bundle of cooking must-haves.
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">₹750</span>
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400 line-through">₹775</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Add Combo to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Suggestions */}
      <section className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Related Products Suggestions</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={`suggestion-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-12">
          <button 
            onClick={() => handleFilterChange('page', Math.max(1, pagination.current - 1))}
            disabled={pagination.current === 1}
            className="flex items-center justify-center h-10 w-10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
            const pageNum = i + 1
            const isActive = pageNum === pagination.current
            return (
              <button
                key={pageNum}
                onClick={() => handleFilterChange('page', pageNum)}
                className={`flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-white bg-primary' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          
          <button 
            onClick={() => handleFilterChange('page', Math.min(pagination.pages, pagination.current + 1))}
            disabled={pagination.current === pagination.pages}
            className="flex items-center justify-center h-10 w-10 rounded-full text-gray-600 dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </nav>
      )}
    </div>
  )
}

export default Products
