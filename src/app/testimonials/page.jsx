import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    text: "The shipping was incredibly fast, and the quality of the leather bag exceeded my expectations. ShopEase is now my absolute go-to for premium accessories!",
  },
  {
    name: "Marcus Chen",
    role: "Independent Seller",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    text: "I started selling my handmade ceramics here last month. The platform is so intuitive to use, and I've reached customers I never would have found otherwise.",
  },
  {
    name: "Emily Rodriguez",
    role: "Fashion Enthusiast",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    text: "Customer service was fantastic when I needed to exchange a shoe size. The whole process was completely seamless. Highly recommend this marketplace.",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-[#F9F9F9] dark:bg-[#0F0F0F] py-24 px-4 transition-colors">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <p className="text-xs font-black text-[#9B563F] uppercase tracking-widest mb-2">
          Real Stories
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-20">
          What Our Community Says
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-[#1A1A1A] rounded-[2rem] p-8 pt-14 text-center shadow-sm border border-gray-100 dark:border-white/5 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Background Quote Mark for visual flair */}
              <div className="absolute top-4 left-6 text-6xl text-gray-100 dark:text-white/5 font-serif font-black select-none pointer-events-none">
                "
              </div>

              {/* Avatar Container */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full overflow-hidden border-[6px] border-white dark:border-[#1A1A1A] bg-gray-200 shadow-md">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={80}
                    height={80}
                    unoptimized={true} // Safe for ImgBB links later!
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-[#9B563F]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed mb-6 relative z-10 font-medium">
                "{item.text}"
              </p>

              {/* Name & Role */}
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {item.name}
              </h3>
              <p className="text-[10px] font-black text-[#9B563F] uppercase tracking-widest">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
