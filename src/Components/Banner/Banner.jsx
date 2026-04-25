"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image:
      "https://i.ibb.co.com/Y7dGfN6f/charlesdeluvio-FK81rxil-UXg-unsplash.jpg",
    title: "Discover the Best Deals",
    desc: "Shop your favorite items at unbeatable prices only at ShopEase.",
    button: "Shop Now",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/JjR5JKZ2/freestocks-3-Q3ts-J01nc-unsplash.jpg",
    title: "Trendy Collections",
    desc: "Stay stylish with the latest fashion trends curated just for you.",
    button: "Explore",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/N2t45sDx/raychan-Ldi-TW9nz-Mcg-unsplash.jpg",
    title: "Tech That Excites",
    desc: "Upgrade your lifestyle with cutting-edge gadgets and electronics.",
    button: "Buy Now",
  },
  {
    id: 4,
    image:
      "https://i.ibb.co.com/FqD0xMNj/ashley-piszek-UIEQFKM3y50-unsplash.jpg",
    title: "Daily Essentials",
    desc: "From groceries to household items, we’ve got everything covered.",
    button: "Start Shopping",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // Changed to 5 seconds so users have time to read!
    return () => clearInterval(timer);
  }, []);

  // Container to stagger letters
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 }, // Slide up instead of sliding right
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={slides[current].image}
          src={slides[current].image}
          alt={slides[current].title}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Sleek Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center">
        {/* Responsive Container (replaces ml-44) */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl space-y-6">
            {/* Animated Title */}
            <motion.h1
              key={`title-${current}`}
              variants={container}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl flex flex-wrap tracking-tight leading-tight"
            >
              {slides[current].title.split("").map((char, i) => (
                <motion.span key={i} variants={letter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Animated Description */}
            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-200 drop-shadow-md font-medium max-w-lg"
            >
              {slides[current].desc}
            </motion.p>

            {/* Button */}
            <motion.button
              key={`btn-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "#824632" }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-4 bg-[#9B563F] text-white rounded-full font-bold uppercase tracking-wider shadow-xl shadow-[#9B563F]/30 transition-colors"
            >
              {slides[current].button}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Slider Indicator Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-500 rounded-full ${
              current === index
                ? "w-8 h-2.5 bg-[#9B563F]"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
