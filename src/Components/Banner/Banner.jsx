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
  // Container to stagger letters
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }, // flowing wave
    },
  };

  const letter = {
    hidden: { opacity: 0, x: 80 }, // start off to the right
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.8, // smoother motion
      },
    },
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden  shadow-lg">
      <AnimatePresence>
        <motion.img
          key={slides[current].image}
          src={slides[current].image}
          alt={slides[current].title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div className="ml-44 text-left rounded-2xl p-8 max-w-2xl px-8 space-y-4 backdrop-blur-sm">
          {/* Animated Title */}
          <motion.h1
            key={slides[current].title}
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r text-black bg-clip-text drop-shadow-lg flex flex-wrap"
          >
            {slides[current].title.split("").map((char, i) => (
              <motion.span key={i} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          {/* Animated Description */}
          <motion.p
            key={slides[current].desc}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: -1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm md:text-lg drop-shadow-md text-white"
          >
            {slides[current].desc}
          </motion.p>
          {/* Button */}
          <motion.button
            key={slides[current].button}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#9B563F] text-white rounded-lg shadow-md cursor-pointer transition"
          >
            {slides[current].button}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
