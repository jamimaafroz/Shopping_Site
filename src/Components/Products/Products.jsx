"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Electronics", "Fashion", "Groceries"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("Error Fetching Products", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Category Filter */}
      <div className="flex items-center justify-between mb-6">
        {/* Categories Left */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Check All + Right Arrow on Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedCategory("All")}
            className="px-4 py-2 rounded-full border bg-gray-200 hover:bg-gray-300 transition"
          >
            Check All
          </button>
          <Link href="/productCards">
            <button className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-light">{product.name}</h2>
            <p className="text-sm text-gray-400 mb-2">{product.description}</p>
            <p className="text-[#9B563F] font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
