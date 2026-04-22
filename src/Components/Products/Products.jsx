"use client";
import useProducts from "@/hooks/useProducts";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Electronics", "Fashion", "Groceries"];
  const { products, loading, error } = useProducts();

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // THE FIX: Slice the array so it never shows more than 6 products!
  const displayedProducts = filteredProducts?.slice(0, 6) || [];

  if (loading) {
    return (
      <div className="px-4 md:px-8 py-10 max-w-7xl mx-auto">
        <div className="flex gap-3 mb-8 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 dark:bg-white/5 rounded-full animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-[350px] bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl animate-pulse p-4"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-white/5 rounded-2xl mb-4" />
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/5 rounded mb-2" />
                <div className="h-4 w-full bg-gray-200 dark:bg-white/5 rounded mb-4" />
                <div className="h-8 w-1/3 bg-gray-200 dark:bg-white/5 rounded mt-auto" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500 font-bold bg-red-100 dark:bg-red-500/10 px-6 py-4 rounded-2xl">
          Error loading products: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Discover Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Browse our latest arrivals and top picks.
          </p>
        </div>
        <Link href="/productCards">
          <button className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:opacity-80 transition-opacity">
            View All Products <FaArrowRight />
          </button>
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[#9B563F] text-white shadow-lg shadow-[#9B563F]/30"
                : "bg-white dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-[#9B563F]/50 hover:text-[#9B563F]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className="group"
            >
              <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] mb-5 rounded-2xl overflow-hidden bg-gray-50 dark:bg-black/20">
                  <Image
                    src={
                      product.image?.startsWith("http")
                        ? product.image
                        : "/placeholder.png"
                    }
                    alt={product.name || "Product image"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {/* Price & Action */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                    <p className="text-xl font-black text-[#9B563F]">
                      ${product.price}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#9B563F] group-hover:text-white transition-colors">
                      <FaArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-100 dark:border-white/5">
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            No products found in "{selectedCategory}".
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-4 text-[#9B563F] font-bold hover:underline"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
}
