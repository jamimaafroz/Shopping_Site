import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="bg-[#F9F9F9] dark:bg-[#0F0F0F] py-16 px-4 transition-colors">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 overflow-hidden rounded-[2.5rem] shadow-xl shadow-gray-200 dark:shadow-none border border-transparent dark:border-white/5">
        {/* LEFT IMAGE */}
        <div className="relative h-[400px] md:h-auto min-h-[400px]">
          <Image
            // Replace this Unsplash link with your ImgBB direct link!
            src="https://i.ibb.co.com/Y7dGfN6f/charlesdeluvio-FK81rxil-UXg-unsplash.jpg"
            alt="ShopEase Marketplace"
            fill
            unoptimized={true} // Bypasses the ImgBB 500 error!
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="bg-[#9B563F] dark:bg-[#1A1A1A] text-white p-10 md:p-14 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight drop-shadow-sm">
            Redefining the Modern Marketplace.
          </h2>

          <p className="text-sm md:text-base text-white/90 dark:text-gray-300 leading-relaxed mb-6 font-medium">
            {/* The Drop Cap */}
            <span className="float-left text-5xl font-black mr-4 leading-none bg-white text-[#9B563F] dark:bg-white/10 dark:text-white rounded-xl px-4 py-3 shadow-sm">
              W
            </span>
            elcome to ShopEase. We started with a simple mission: to bridge the
            gap between passionate creators and mindful shoppers. We believe
            that buying online shouldn't just be a transaction; it should be an
            experience built on trust, quality, and community.
          </p>

          <p className="text-sm md:text-base text-white/80 dark:text-gray-400 leading-relaxed mb-10">
            Whether you are an independent seller looking to grow your brand, or
            a buyer searching for that perfect premium item, ShopEase provides
            the secure, seamless platform to make it happen. Curated quality,
            guaranteed.
          </p>

          {/* Signature/Sign-off */}
          <div className="mt-auto flex flex-col">
            <span className="text-2xl font-serif italic font-bold tracking-widest opacity-90">
              The ShopEase Team
            </span>
            <div className="w-12 h-1 bg-white/30 dark:bg-[#9B563F] mt-3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
