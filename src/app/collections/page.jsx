import Image from "next/image";

export default function CollectionsPage() {
  const items = [
    {
      title: "Bouquets",
      desc: "Lorem ipsum dolor sit amet ultrices inceptos est si in. Tellus mollis mi eget felis morbi vitae mauris lacinia penatibus est.",
      img: "https://i.ibb.co.com/PZV2BPjY/camille-brodard-PN-GKRRWGY-unsplash.jpg", // put your image in public/images
    },
    {
      title: "Arranging",
      desc: "Lorem ipsum dolor sit amet ultrices inceptos est si in. Tellus mollis mi eget felis morbi vitae mauris lacinia penatibus est.",
      img: "https://i.ibb.co.com/kgVVBYBy/maksim-larin-NOps-C3n-WTz-Y-unsplash.jpg",
    },
  ];

  return (
    <div className="bg-[#F9F9F9] dark:bg-[#0F0F0F] py-12 px-4 transition-colors">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative rounded-[2.5rem] overflow-hidden group shadow-lg shadow-gray-200 dark:shadow-none border border-transparent dark:border-white/5"
          >
            {/* Image with Cinematic Hover Zoom */}
            <Image
              src={item.img}
              alt={item.title}
              width={800}
              height={500}
              unoptimized={true}
              className="w-full h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* ShopEase Copper Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-[#9B563F]/40 group-hover:to-[#9B563F]/60 transition-all duration-500" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-white drop-shadow-md">
                {item.title}
              </h2>
              <p className="text-sm mb-8 max-w-sm leading-relaxed text-gray-200 font-medium drop-shadow-sm">
                {item.desc}
              </p>

              <button className="bg-white text-black font-bold text-sm px-8 py-3 rounded-full w-fit hover:bg-[#9B563F] hover:text-white transition-colors duration-300 shadow-md">
                Shop Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
