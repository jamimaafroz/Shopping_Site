import { Truck, Recycle, Leaf } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Truck size={32} strokeWidth={1.5} />,
      title: "FREE FAST SHIPPING",
      desc: "Enjoy complimentary delivery on all orders over $50. We ensure your items arrive safely and swiftly right to your doorstep.",
    },
    {
      icon: <Recycle size={32} strokeWidth={1.5} />,
      title: "100% SUSTAINABLE",
      desc: "Committed to the planet. We partner with eco-conscious brands and use biodegradable packaging to minimize our carbon footprint.",
    },
    {
      icon: <Leaf size={32} strokeWidth={1.5} />,
      title: "CERTIFIED ORGANIC",
      desc: "Sourced directly from nature. Discover products made with natural ingredients, completely free from harsh chemicals.",
    },
  ];

  return (
    <div className="bg-[#F9F9F9] dark:bg-[#0F0F0F] py-2 px-6 transition-colors">
      <div className="max-w-8xl mx-auto bg-[#9B563F] dark:bg-[#1A1A1A] rounded-b-[60px] p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        {features.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="text-white">{item.icon}</div>
            <div>
              <h3 className="font-bold text-lg mb-2 tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
