import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SeasonalDeals = () => {
  const [activeFilter, setActiveFilter] = useState('All Seasons')

  const filters = ['All Seasons', 'Diwali', 'Holi', 'Harvest Season']

  const deals = [
    {
      id: 1,
      title: "Festive Lights & Decor",
      description: "Up to 40% off on Diwali lights, lanterns, and decorative items. Stock up for the festival of lights!",
      discount: "40% off",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAJ0SWUEQbLiACaX1TrEBARSAnYxMRE6Lx8tGHJO_In7Rg-slabKOdIRjsRqndSmV03BWaTlAitq92Ap4MCEOgFQi6Nlby03qY6z3CaVrYhP04U-rZwD0461VD4IpAVxyw6Dd-iRD0CNubvQor_cg4WMnjPpjiWSIJ_jP9hDq1H_ocBxkMZiehLTRnYdFpn-yzvEuzofdiRKsfBAIiFhRH7I2U1Rr1ZoQqP4ghANW2AH2PxQ3DZPChT8UGA-ojundsPkAbfBRcdF4",
      category: "Diwali"
    },
    {
      id: 2,
      title: "Colors of Holi",
      description: "Get ready for Holi with our vibrant range of colors, water guns, and party supplies. Discounts up to 30%.",
      discount: "30%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBykUYMN2KtYTvLeDgB-nOU9argIL0Bv16J7HHfU-2PcJKfQEhg7rMkXagbXuc9V8bqz2mbIeJmDXxlyU6bUjShXQngzhJrh1y16ND_nuIti9fedQNHYoGKUMFRKb6LtDn5fjQUrRJxEDB_kgQ9WGz8gvQhhojiYR9ThLEieWRdL6-2xhFMMLQjYWnzNWnMRjMT0Vn8zn6DxpsMsBkMhyhD7f4nQmICi_17IetuTV7ymgAPBQrf4Pa_tTUXABI4dfG33H6WALDrNRk",
      category: "Holi"
    },
    {
      id: 3,
      title: "Harvest Season Essentials",
      description: "Prepare for the harvest season with our selection of tools, storage solutions, and festive decorations. Save up to 25%.",
      discount: "25%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKnRbQWIR0pr7k3DsJYPvqJjwp8035IrK5FYhP9YrmTkV2Q1T4npSeUlm6R-WsQtQEEbHlMB-PfFRCYZ2XkjBMFzHWWlZ3qQslKJ8SzyjNDkM12U-tb6U3o_YWifQL2gDivaqIi1TyJle1MSoZNBThm81YryiXcOTbUAG7Vjve4FKEKFIJuml2WCd-8GZxN7vTo1OTbIKOCrbNYbG1UfKD-563TswJB5tkTVQWqAeFKuf_ShBDuj7HoG0R82HV7Fsd8XUm77I7Gic",
      category: "Harvest Season"
    },
    {
      id: 4,
      title: "Winter Warmers",
      description: "Stock up on winter essentials like blankets, heaters, and warm clothing. Discounts up to 35%.",
      discount: "35%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPhWkDv6FfDAfmlJJbzZbprAxXNSCJuABV1_6-4ESJMetqUD6q8yQMgDn-zxiTEMxpHgn-kXbNtZt1L17GwX8oftjO2OjaFrg6kqKuBamL88q3eZ8IMFtqneaCfhBMBYXHlqGovoAFMi1exRp6a-U6CCB5VU6GJwHrWM9woc4n9TR6Coq8RlPu3GsX6e7dOyt6prSzXxX1WnphRFevv2qfwbM1bGWM0gewxJhQxX7hMCdIdcus2vMu9ngWqDL6rl7QK3TUXYfJaJw",
      category: "Winter"
    }
  ]

  const filteredDeals = activeFilter === 'All Seasons' 
    ? deals 
    : deals.filter(deal => deal.category === activeFilter)

  return (
    <div className="flex flex-1 justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Seasonal Deals
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'bg-orange-500 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-orange-500/20 dark:hover:bg-orange-500/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredDeals.map((deal) => (
            <div 
              key={deal.id}
              className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl h-80"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />
              
              {/* Background Image */}
              <img 
                alt={deal.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={deal.image}
              />
              
              {/* Content */}
              <div className="absolute bottom-0 z-20 p-6">
                <h3 className="text-2xl font-bold text-white">
                  {deal.title}
                </h3>
                <p className="mt-2 text-zinc-200">
                  {deal.description.split(deal.discount).map((part, index, array) => 
                    index === array.length - 1 ? (
                      part
                    ) : (
                      <span key={index}>
                        {part}
                        <span className="font-bold text-orange-500">{deal.discount}</span>
                      </span>
                    )
                  )}
                </p>
                <button className="mt-4 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              No deals available for the selected season.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SeasonalDeals