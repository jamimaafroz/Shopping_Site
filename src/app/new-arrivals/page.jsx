import Image from "next/image";

const products = [
  {
    title: "Classic Handbag",
    price: "$40.00",
    img: "https://i.ibb.co.com/6RRykkRF/bags.jpg",
    sale: true,
  },
  {
    title: "Premium Tote",
    price: "$35.00",
    img: "https://i.ibb.co.com/6RRykkRF/bags.jpg",
    sale: true,
  },
  {
    title: "Leather Crossbody",
    price: "$50.00",
    img: "https://i.ibb.co.com/6RRykkRF/bags.jpg",
    sale: false,
  },
  {
    title: "Travel Duffel",
    price: "$25.00",
    img: "https://i.ibb.co.com/6RRykkRF/bags.jpg",
    sale: false,
  },
];

export default function NewArrivalsPage() {
  return (
    <div className="bg-[#F9F9F9] dark:bg-[#0F0F0F] py-16 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            New Arrivals
          </h2>
          <button className="text-sm font-bold tracking-wide text-[#9B563F] hover:text-gray-900 dark:hover:text-white transition-colors">
            SEE ALL →
          </button>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT: PRODUCTS GRID */}
          <div className="grid grid-cols-2 gap-6">
            {products.map((item, index) => (
              <div
                key={index}
                className="text-center group flex flex-col h-full"
              >
                {/* Card */}
                <div
                  className="relative bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl 
    hover:-translate-y-1 hover:shadow-xl hover:border-[#9B563F]/30 
    transition-all duration-300 overflow-hidden p-4"
                >
                  {/* SALE TAG (force show on all) */}
                  <span className="absolute top-3 left-3 bg-[#9B563F] text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full shadow-sm z-20">
                    SALE
                  </span>

                  {/* Image */}
                  <div className="relative h-[160px] w-full">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      unoptimized={true}
                      className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mt-4 gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-[#9B563F]/30 group-hover:bg-[#9B563F] rounded-full transition"
                      />
                    ))}
                  </div>
                </div>

                {/* TEXT (this is the fix 👇) */}
                <div className="mt-3 flex-grow flex flex-col justify-end">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-black text-[#9B563F]">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: FEATURE IMAGE WITH OVERLAY */}
          <div className="relative h-full min-h-[400px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-sm border border-transparent dark:border-white/5 group cursor-pointer">
            <Image
              src="https://i.ibb.co.com/6RRykkRF/bags.jpg"
              alt="Featured collection"
              fill
              unoptimized={true}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* The Overlay Gradient - Shifts from clear to dark on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* The Overlay Content - Slides up slightly on hover */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                Curated Bags Collection
              </h3>
              <p className="text-sm text-gray-200 mb-6 max-w-sm leading-relaxed font-medium">
                Hand-selected premium pieces for the discerning shopper. Explore
                our newest arrivals and find your perfect everyday carry.
              </p>
              <button className="bg-white text-black font-bold text-sm px-6 py-3 rounded-xl w-fit hover:bg-[#9B563F] hover:text-white transition-colors shadow-lg">
                Shop the Look →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
