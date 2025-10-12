"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";
import toast from "daisyui/components/toast";

export default function ProductCards() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const { products, loading, error } = useProducts();

  // Filter by search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWishlist = async (productId) => {
    if (!userEmail || !session.user.id) {
      alert("Please login to add to wishlist!");
      return;
    }

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          userEmail: userEmail,
          productId: productId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Added to wishlist!");
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      alert("Failed to add to wishlist.");
    }
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9B563F]"
        />
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Skeleton cards while loading
          Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-60 bg-gray-300 rounded-lg animate-pulse"
              ></div>
            ))
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-lg font-light">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-green-600 font-bold mb-3">${product.price}</p>

              <div className="flex justify-between items-center">
                <Link
                  href={`/productDetails/${product._id}`}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                >
                  <FaInfoCircle /> Details
                </Link>

                <button
                  onClick={() => handleWishlist(product._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700"
                >
                  <FaRegHeart /> Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
