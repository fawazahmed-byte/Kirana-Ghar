import React from 'react'
import { useCart } from '../contexts/CartContext'
import { ShoppingCart } from 'lucide-react'

const Trending = () => {
  const { addToCart } = useCart()

  const trendingProducts = [
    {
      id: 1,
      name: "Organic Spices",
      price: 250,
      unit: "kg",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqi2w3E4hpA_dFSreVVUjMnMVdgYhcRmhOm7LgGzexICdJ2plHVJ5teTiPoglTna_GXPfaDTXuLZDVR0-jBjAjkQILA0LqV8mfw17m20GG2HZMDVGPI57rv-36r5vMqWJXDSCdG-RfD1zNy0aJWY0bLp2vV-DAwadR6zwNeKuML77Vrd0ESuN0NrWv6PFsOtQOE54lPqrqjUxVQydWK5bOdJppq_js474nZ8un-DXQ9rVUEKWIMAFL8gy2XPGSGezOBPEF2NJbUQA"
    },
    {
      id: 2,
      name: "Eco-Friendly Cleaning",
      price: 150,
      unit: "unit",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjSk6i7lghyQmZ7e0d1DXQbnxIYbOGHkBpR-SwMOq-F3udLmccRHFdW6gVsDfoiW7YFpA69S44GSlFYEE5NOPEi1HyZmk8IKeHhaOk5w4brZWBwOivpcKbEkufezVEo02MoPrbubW9fpDGVCVAGvZGSXAhy51oasSTRsTM4-xlGfSoMbkhaAtnb2EPaDMYuEghIBmwo9JTqeqhjSOX_zf66IKfuMjTbPiIJJTE1nyk0rjPxm6NUoue0tNIf4hCa3151Me2TJc77kQ"
    },
    {
      id: 3,
      name: "Artisan Teas",
      price: 300,
      unit: "pack",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjEbzG_MuEj6K-COno0PLjDGNcUTHp1EmtQyDYJFNiV1JhShUHegWFdERS-p2tx9sI8tXbeER_kzbkAxsOxmCiZ7ae3ZEi-H4BpGoct0Nnp3mUP5flP1ceW-nVL0DokfAbRQuJqzrp70vohtxejnmWyjHno4tWS3LA0F3Cctwp6fsI9O05G4Y1xvTD9F6X1Ws7qdA5BKMWQfvCQ2QhIqS924XXNxdMIeoljev63G0frcY9ZfmDLuAVm2nnt0bLk_7LFvK9zVnBok8"
    },
    {
      id: 4,
      name: "Handmade Soaps",
      price: 100,
      unit: "bar",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4qVmhZTQzzCDLo4dt2-4m9wx_fnj-7QFC5d8h5GvgslfMKuO5iaZP7oNQURIEvsSxMB-WzB1PTIVYQcODavVOO0AASPlMSztC7p-93wBgSjp8mmVftcIT8fo2HXECzteL3QsI2zcGXn4V6xmaxJEtKALpXNidEYbcHgCvFCXQHbcU-Q27BvpViAaMQgoCrglpZn02dORbx6fxmQuJAElciUB_z7e9VUDZ-DtQZa_R33mInBR8p-PD9uV4Lyxt-uOXW4RNLKxbclA"
    },
    {
      id: 5,
      name: "Local Honey",
      price: 400,
      unit: "jar",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAtSzF9tW1mhKyThMd_I5nQaLPt5sPhZDwMHoa8D70ojiICJjEuzypMiK2SkF3PB8p5RVKL7ujcnrbUGW2ZuggvrOwsb3q7MBxd01xPmXOzu_lUYS8a3bHV9faYvH2kEZcTYeeOG2R-r-ZnVIHXJq9Byp-AmDjkufoRfwc4JvDxh7XsUAs11pCuuX-atF6UR8oW2WrqRNL6BR36zIQcfP5tfWnQ1iTVIgOE0sPfu4YeMNoPHxCZsJrvDTOOUhVQFIEFtEIJXZETR0"
    }
  ]

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  return (
    <div className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-zinc-900 dark:text-white">
            Trending in Your Area
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
            Discover what's popular among retailers in your neighborhood. Stay ahead of the curve with the latest trends.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingProducts.map((product) => (
            <div 
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="aspect-square w-full overflow-hidden">
                <div 
                  className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url("${product.image}")` }}
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-bold leading-tight text-zinc-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  ₹{product.price} / {product.unit}
                </p>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full rounded-lg bg-orange-500 text-white h-10 text-sm font-bold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-600"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-orange-500 text-white text-sm font-bold leading-normal tracking-wide hover:bg-orange-600 transition-colors">
            View All Trending Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default Trending