import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const TopPicks = () => {
  const { addToCart } = useCart()
  
  const recommendedProducts = [
    {
      id: 1,
      name: "Organic Spices",
      description: "Premium quality spices for culinary excellence",
      price: 120,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLXlEpDde7qjjjr9t5XWgg5UYZBvrhLnkhEfIB9726Oyqf4euK7sXWYgnXqOA94TrsZqV3_qw426fPFDt38nQXzlYCe_AgMPLUEP2HUvXuu6jG_5NiasylcDTyWby-dj8SrRI0zHvltnGfv1TiOt0YITA2_22OaR5sweKPg4zCzcqVzmh7H1YdDeA8HQsbSrzqxVRb3qbbdL4uI5aE_zMXTyej4olr7C2J5sdodvAHdFj_tgCELOMf7MA7IhCV7LkU-zwgnrdmap8"
    },
    {
      id: 2,
      name: "Handcrafted Textiles",
      description: "Unique textiles with traditional patterns",
      price: 850,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG9MNC1bwnaJNq8DQzPwnwhDbk_frifnMq_aVhRAolehxmBrHy-1zstQsb-conuidBxJlpu55oiTJQqWmOyjyB_5G6SKldYPJLyg44J-T6MUUxC_Joa_qvXRrxYSOO7JW_Jma5hxoGEbIzZ_B8SfVCEz262c84eepVAmMhg0IMZ9W6m66pmx35zCjcnV0LTDy_1oswpNSDzFmWADbTl-3kkHYRXeQAF075rwdrQ0oWmY3zhxvImhARUXw0n4e_W1EeiK5zQwbKwes"
    },
    {
      id: 3,
      name: "Eco-Friendly Cleaning Supplies",
      description: "Effective and environmentally conscious cleaning products",
      price: 250,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR_4rIOxel2NIsIYQOPeQ-g0ak3f65G5dtprn4Zjas8GrQ9ELd4O0ZcAdq-NK_1Z-Vn00rVfA7sw3Ijs5eonmv7vexZXydFvajMMliF1uf4kSQUIjun_2a4HJFSjdQg96922LhD6skU4ojhnznU5W9Ovm2tW2vzbx_YVG0Ai_05hAhpRvLSBS4gDSkfohzRZhaErXNn1oQKEkY1vox9uw-npgEFhcNTOOw4qjUEeoMyTgEXBvEhlEXrTx2DS-JXASSn9aqdoTARM0"
    },
    {
      id: 4,
      name: "Artisanal Teas",
      description: "Exquisite tea blends from local gardens",
      price: 350,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgocMygktPHVE1zkvsYj8dMlb_VV0AiNrwBZgIoyYykqsQj4Jvg1sxQuCNZ3iJnyrMFnKnKFD_j7NP0j_JFeq4AMKjFU3a7v0SLfEroXn0ACg3Ni_7SPW-jO_2b9tBiIU0Af_8ND-0n7kmCczH8xuV_-TaTBAFL0CzLRwYcnJr7T_fk6eZo9vqzkHytrWy-glXi9juxGag0TbBDPMbz4YF5zDNjG1FvGMWzrt5WUjmNMcc_aRO8M1bxY7141a-ImkOT-pct4CTmCI"
    },
    {
      id: 5,
      name: "Sustainable Packaging",
      description: "Biodegradable and compostable packaging",
      price: 500,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBREWYl2wUdhojFG92B6uBjWCrpx12Oc9AHtHcKSDDr8gKuoA39_KaM3VrxoutRO3fxTSMZnR1haqEwbgTJNF8T2mWX7bJ1967lbzj_FcssHVOB0SgwviAt_owBpTwgm_rQgIZ2b5uYJCLTMtXjCLbfHA4OCZb0wS5YhW5TWG92XBPL4j-VLjkYa4ricnEc3dOAvUL4yTE0i0RG9hxRjkTMgJYn-xWshUQiIfxYPcCXJ76DwbkH2xIGfIJGJapS2YX8EYIS5TCIoE4"
    },
    {
      id: 6,
      name: "Local Honey Varieties",
      description: "Pure and natural honey from regional apiaries",
      price: 450,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaLqcScFEPh_wzH984BHggIkA2xTPQtg-c9jjvnLPFVHMWXwRsjxbt44b9m1yQFcIemwTAlAbdLSBc1OAgze5JGtVgFhzWlikizhzVLvTckpCDuNMQ7w8WywFRcn6ZrHu4k6jm-dZPfGmoUvy8GowtgCPDpKM5g2XQ7VWS1kE8Z-QIG8dNi4IkIYkXPSx1cNYyMuczkEm9gelddT-7Gc2ycvv0l_e3--dYb_DMm9QY73fzpMshanMPP7cEGKNkRa4dlYvLjz7TVZ8"
    }
  ]

  const seasonalBestSellers = [
    {
      id: 7,
      name: "Summer Apparel",
      description: "Light and breathable clothing for summer",
      price: 999,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_JZ7C_n9fQ8iKbEKW51MjfwWsX_xBPgeP6dqC-W2fuEqb3uzoX4yOeN3FYuSbtU7NKJaxEt2bUjSM-9lkCY-VQr3YkF1SbNcYE6jSeUxi2DQvf5b1XCMjuzCbpdOqCAi2YF_5EYfF-dN9JUfDP6lJVClJWkucDl1hSDPvKK8sT2TKwYZeatptws9K_j6EVDTTaGfay6BJL6MBaxmACYdpDqy8LUmig4Th_PLw3rXsV2pqZET9ejj2mUQbqfeoQEUkJ8rJ2FoAuWk"
    },
    {
      id: 8,
      name: "Monsoon Essentials",
      description: "Rain gear and waterproof accessories",
      price: 750,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhh9ICdMOuviSFrTOJNHdGd-brGv1El95XRliFs42Hkt7pvndeEjs-lWcnE2gGXyVHuyR7KnH_I42ObVqtAl6Opi6jhrN8T1sJwQYgZ1EfxLka7JBtEu063XjxnSfH3lZCLo6PBG02cWec0z76Sl59JmmJdtm8A5uR02DotNgJjU2KT6rW4-3EOmWFEinw1njEHjq3tmnsp7k4RPLCXgbNFloxxEg6_-zsBAadTGjTlq1zt9SyLG5a5EUz8VIZbQ-EkCvJXwFqtaA"
    },
    {
      id: 9,
      name: "Festive Decor",
      description: "Decorations for upcoming festivals",
      price: 600,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCorn_tODwZ04WLmytrYd6AZ5AXSiS8HXjZvL5N5iFsU9hzleW41zvENM7OCCRsfUdtzcJNRymoL7jzl_ny7BCzncV01je5vSUdygHmJDLoUizhZMbO_IE2lAJXIpDX5h3cwOY2UnHAFdz7dXRiJKfsfi4m5OQgy6-WwvdqHPCrygXIDn7Cu3UQTp0DMby5SMO2mvSoxboqcRFRlRZnN1PjnHCbAIoZ53dDSis-iNrXs87QLtT8pEOEPuTIHLhf_I1Aau1x7XxYEx4"
    },
    {
      id: 10,
      name: "Winter Warmers",
      description: "Cozy clothing and heating solutions",
      price: 1500,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPT0Gf9jkcqeuNABR53kjUbI_pMKJ3MB85hxlWkBcE_cPgY4BJp_KBsm7CBNbF2BFsvNT1ByOqrY5ZL1x64YDyGRcxPVc0j7QeRKOG_CBDv92cUG6j700rOd0D4T9LblRXiLRjkR1w1JGyL9kea_h23sAo-o4StQ_LuoeNOdpJ9bIeZ3ttDePH4vnuUf0IWVjw8rlfC50TsD-IRbdp0E5oTABgQbZEo19OwiPC4bOLXzphv8zzjUgOpiPX_nkkdc8vMm6ltXcRuMo"
    },
    {
      id: 11,
      name: "Back-to-School Supplies",
      description: "School supplies and stationery",
      price: 300,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6QHik__ep3SKMLjkPgwxMMJ0_pD4SxBhgU_ijcAzvPcZ420hcJR14HnZrPerkGnHVXGOXV_YWwX2l3buywSFYc-UNqMlqLhJuLAoEKOJhHS9IH4ux19Wns0XTOEFlg0S2UBuhK51xthhuvjTC3XYwo6ksn2B-5j_jE8mvCJkg9AsYUK9DnF_d2G2rQXqj2m2PsJCZIubZZchBb50SFZAF4i7X61Y4aUyQe9zfEsVQuajVdUvCTY16EZph60jDJYhDrBJKiQIUTNM"
    },
    {
      id: 12,
      name: "Holiday Gift Sets",
      description: "Curated gift sets for the holiday season",
      price: 1200,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE1w0fbppwq9Vc-SSbtFSAEpxwjaNtoiC7rjAaN2JTDJeEccXs7fCO6rsqG4xcW82oTGbUf18ckMP5qoDl1ckU3A7ybV0Dw1e2X1A2y1XVXWJRjQuz_53YmIa0yHQDTCIvnrCtTvrX8GfdK2m5ok7vODZcy29brzBkHykHT2hmtRnoaKkiwa2ux0qH_5DracAwOb0Yc6VXThnR1jd4eVxtJqbre7BDYik-h8mV_ZEmCW5pV5y_rZgioSRSbGmsdUKJ-JmlwUAkfUY"
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

  const ProductCard = ({ product }) => (
    <div className="group relative flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-zinc-900">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden h-48">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
          src={product.image}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{product.name}</h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 flex-grow">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-zinc-900 dark:text-white">₹{product.price}</p>
          <button 
            onClick={() => handleAddToCart(product)}
            className="bg-orange-500/20 dark:bg-orange-500/30 text-orange-600 dark:text-orange-400 p-2 rounded-lg hover:bg-orange-500/30 dark:hover:bg-orange-500/40 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
          Top Picks for <span className="text-orange-500">Your Store</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-zinc-500 dark:text-zinc-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          AI-powered recommendations based on your sales, local trends, and seasonal demand to boost your business.
        </p>
      </div>

      {/* Recommended Products */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seasonal Best Sellers */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">Seasonal Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {seasonalBestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default TopPicks