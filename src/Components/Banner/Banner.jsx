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
    }, 4000); // change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full"
        >
          {/* Background Image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />

          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="text-left bg-[rgb(255,255,255,0.10)] rounded-2xl p-8 max-w-lg px-10 space-y-4 backdrop-blur-sm">
              {/* Animated Title */}
              <motion.h1
                key={slides[current].title}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  duration: 0.6,
                }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9B563F] via-blue-400 to-blue-800 bg-clip-text text-transparent drop-shadow-lg"
              >
                {slides[current].title}
              </motion.h1>

              {/* Animated Description */}
              <motion.p
                key={slides[current].desc}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl drop-shadow-md text-white"
              >
                {slides[current].desc}
              </motion.p>

              {/* Animated Button */}
              <motion.button
                key={slides[current].button}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
              >
                {slides[current].button}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
