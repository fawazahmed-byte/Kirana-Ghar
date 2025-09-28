import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { ArrowRight, TrendingUp, Box, ShoppingCart } from 'lucide-react'

const Home = () => {
  const { products, loading, fetchProducts } = useProducts()
  const [featuredProducts, setFeaturedProducts] = React.useState([])

  React.useEffect(() => {
    // Fetch featured products (first 4 products)
    const loadFeaturedProducts = async () => {
      try {
        await fetchProducts({ limit: 4, featured: true })
      } catch (error) {
        console.error('Error loading featured products:', error)
        // Use static fallback data if API fails
        setFeaturedProducts([
          {
            id: 1,
            name: "Fresh Strawberries",
            description: "1kg Pack",
            price: 749,
            image: "/strawberries.jpg",
            badge: "New"
          },
          {
            id: 2,
            name: "Hass Avocado",
            description: "Single",
            price: 125,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDwOzAURvwC-u2PxBJpdE3U2U3WkjI-lIkn94eUGxWudMlrMKyBfEKOGYvW77P46HLQaeExgd443EhxEeW7fU_TQq5NWiJsq6YU-vZSO4tWmdpPKz-AGi8_t416Ncdrb0MDyfjn-MNHoggVgO-dt5__cyKG83fJOiDx1iIYmmc6OhSJHRNgB7tZobKQ-9UoObCPOgt03vKVW57uVjEdnpT6O3guGOs-FZoCdX7VdD9k9wS8S3IvJ1PI5G_ApagKfoN7uOTSUhhtLk"
          },
          {
            id: 3,
            name: "Organic Milk",
            description: "1L Carton",
            price: 265,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBly4wahBn3jhtrqrEE4s1BIpApA8vEuoDx6A2FjzHSQeQxQVy55C-zDM9QW0IG3aw5mHIx8ujpzaHWbEwqa_Q5Fn4VFxDu20OZmJAcLOvs_fZJEyBynxdJDOFxr9H7uu1DanuqmKNfXjLZDOwW-bedcUdYUud83xsLvY6Ys8TBVViyFpMdGasyqnlV8w-FQFGJagOu7DnLAUvkQ01ftCCtA4r4JFzaqkJrMO6G7jRlteropI3DgkpOBWDd-64o9fJ4Vp3csrzgvQRM4npiXCQeSfaBNf5cu_izQ-ItA",
            badge: "Best Seller"
          },
          {
            id: 4,
            name: "Sourdough Bread",
            description: "Loaf",
            price: 450,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkgFpTe8WKBVIUzSQeQxQVy55C-zDM9QW0IG3aw5mHIx8ujpzaHWbEwqa_Q5Fn4VFxDu20OZmJAcLOvs_fZJEyBynxdJDOFxr9H7uu1DanuqmKNfXjLZDOwW-bedcUdYUud83xsLvY6Ys8TBVViyFpMdGasyqnlV8w-FQFGJagOu7DnLAUvkQ01ftCCtA4r4JFzaqkJrMO6G7jRlteropI3DgkpOBWDd-64o9fJ4Vp3csrzgvQRM4npiXCQeSfaBNf5cu_izQ-ItA"
          }
        ])
      }
    }
    
    loadFeaturedProducts()
  }, [])

  // Use products from API if available, otherwise use featuredProducts state
  const displayProducts = products.length > 0 ? products.slice(0, 4) : featuredProducts

  const NewProductCard = ({ product }) => (
    <div className="group relative flex flex-col bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          src={product.image}
        />
        {product.badge && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
            product.badge === 'New' ? 'bg-orange-500/10 text-orange-600' : 'bg-yellow-400/20 text-yellow-600'
          }`}>
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{product.name}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{product.description}</p>
        <div className="mt-4 flex-grow flex items-end justify-between">
          <p className="text-xl font-extrabold text-orange-500">₹{product.price}</p>
          <button className="bg-orange-500 text-white h-10 w-10 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500/90 hover:scale-110">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <div className="@container">
        <div className="relative min-h-[620px] rounded-xl overflow-hidden flex flex-col justify-between p-12 bg-gradient-to-t from-blue-900/70 via-blue-900/50 to-transparent">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3')"
            }}
          />
          <div className="relative z-10 flex flex-col gap-6 max-w-3xl">
            <h1 className="text-white text-5xl sm:text-7xl font-extrabold tracking-tight animate-slide-in" style={{animationDelay: '0.2s'}}>
              Your Business, Powered by Kirana Ghar
            </h1>
            <p className="text-zinc-200 text-lg sm:text-2xl animate-slide-in" style={{animationDelay: '0.4s'}}>
              Discover a smarter way to manage your inventory and orders. Kirana Ghar's AI-driven platform offers personalized reorder suggestions and local trend insights to keep your business ahead.
            </p>
            <Link 
              to="/products"
              className="bg-orange-500 text-white font-bold h-16 px-10 rounded-xl w-fit text-xl tracking-wide hover:bg-orange-500/90 transition-all transform hover:scale-105 animate-slide-in" 
              style={{animationDelay: '0.6s'}}
            >
              Explore Products
            </Link>
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-white animate-slide-in" style={{animationDelay: '0.8s'}}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 transition-transform transform hover:scale-105 hover:bg-white/20">
              <div className="p-4 rounded-full bg-orange-500/20">
                <span className="material-symbols-outlined text-orange-500 text-2xl">local_fire_department</span>
              </div>
              <div>
                <p className="font-semibold text-lg">Trending Near You</p>
                <p className="text-base text-zinc-300">Fresh Produce Mix</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 transition-transform transform hover:scale-105 hover:bg-white/20">
              <div className="p-4 rounded-full bg-orange-500/20">
                <span className="material-symbols-outlined text-orange-500 text-2xl">notification_important</span>
              </div>
              <div>
                <p className="font-semibold text-lg">Items Running Low</p>
                <p className="text-base text-zinc-300">3 items need reorder</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 transition-transform transform hover:scale-105 hover:bg-white/20">
              <div className="p-4 rounded-full bg-orange-500/20">
                <span className="material-symbols-outlined text-orange-500 text-2xl">redeem</span>
              </div>
              <div>
                <p className="font-semibold text-lg">New Deals Available</p>
                <p className="text-base text-zinc-300">Check out 5 new offers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Now Selling Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Now Selling</h2>
          <Link to="/products" className="text-sm font-semibold text-orange-500 hover:underline hover:text-orange-500/90">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-zinc-200 dark:bg-zinc-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4"></div>
                </div>
              </div>
            ))
          ) : (
            displayProducts.map((product) => (
              <NewProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

      {/* Personalized Feed */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white px-4">Personalized Feed</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
          {/* Top Picks for Your Store Card */}
          <Link 
            to="/top-picks"
            className="flex flex-col justify-between gap-4 p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:shadow-lg hover:border-orange-500/50 transition-all duration-300"
          >
            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-orange-500">Recommended for You</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">Top Picks for Your Store</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Based on your past orders and local trends, these products are likely to be a hit with your customers.</p>
              </div>
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg bg-cover bg-center flex-shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCTbAgIqqYGH6cwHEQ-f_7qckXz3HozKvgdu5mptmDN1j9Ls9v2fnDHcVehGTtCrUttYxx_N7utdmbvBGPTmNxsofl7i3IZPaP_iq5GCAyEs5GcNOvDjP-LKD5jBwvT6-S1OJr28w2phCVLH-1jTwJ4NXlFoMHxWg1l0m4Rx-ZaJ7hZniO54pIvpEBNOrEkfQLEn3rrhucuGWWixZ_oiWUzVKBV6YczP26PZQ-jpiwBEzlFdU9fjwACFsA_9BPH7nCa5kHJduTHklw")'}}></div>
            </div>
            <button className="bg-orange-500/10 dark:bg-orange-500/20 text-orange-500 text-sm font-bold h-10 px-5 rounded-lg w-fit hover:bg-orange-500/20 dark:hover:bg-orange-500/30 transition-all duration-300 hover:scale-105">Shop Now</button>
          </Link>

          {/* Trending in Your Area Card */}
          <Link
            to="/trending"
            className="flex flex-col justify-between gap-4 p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:shadow-lg hover:border-orange-500/50 transition-all duration-300"
          >
            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-orange-500">Local Trend Badge</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">Trending in Your Area</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Discover the most popular products in your region, helping you stay ahead of the competition.</p>
              </div>
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg bg-cover bg-center flex-shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1m_IXrYC2yphNXt4iVS1NX7g3HrEx8EJzv_LoU70q6hISMbC9xKYem1lnQcUzmK0LQMD2E7gHDA0DIS0dqfOXKjmJWnc0aQGZPO4U5gq_WGzWnTR0InnmywfDQuAn41IN4yB3bdV3-tZPYtRpcvpsDaUYST0TSy9TgNhoXVedGANPg8lw1HXaOdqHHF2R5dEVNOR10aMwFlwG4rC8vSP4t-AAeedYCTnvum342TqbIwkpejc44bXTCrgryNb7I976ToNPMfXo9q8")'}}></div>
            </div>
            <button className="bg-orange-500/10 dark:bg-orange-500/20 text-orange-500 text-sm font-bold h-10 px-5 rounded-lg w-fit hover:bg-orange-500/20 dark:hover:bg-orange-500/30 transition-all duration-300 hover:scale-105">View Trends</button>
          </Link>

          {/* Summer Savings Card */}
          <Link 
            to="/seasonal-deals"
            className="flex flex-col justify-between gap-4 p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:shadow-lg hover:border-orange-500/50 transition-all duration-300">
            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-orange-500">Seasonal Deals</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">Summer Savings</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Get ready for the summer season with our curated selection of seasonal products and special offers.</p>
              </div>
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg bg-cover bg-center flex-shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1m_IXrYC2yphNXt4iVS1NX7g3HrEx8EJzv_LoU70q6hISMbC9xKYem1lnQcUzmK0LQMD2E7gHDA0DIS0dqfOXKjmJWnc0aQGZPO4U5gq_WGzWnTR0InnmywfDQuAn41IN4yB3bdV3-tZPYtRpcvpsDaUYST0TSy9TgNhoXVedGANPg8lw1HXaOdqHHF2R5dEVNOR10aMwFlwG4rC8vSP4t-AAeedYCTnvum342TqbIwkpejc44bXTCrgryNb7I976ToNPMfXo9q8")'}}></div>
            </div>
            <button className="bg-orange-500/10 dark:bg-orange-500/20 text-orange-500 text-sm font-bold h-10 px-5 rounded-lg w-fit hover:bg-orange-500/20 dark:hover:bg-orange-500/30 transition-all duration-300 hover:scale-105">View Deals</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
