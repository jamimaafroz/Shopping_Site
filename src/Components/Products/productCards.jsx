"use client";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

export default function ProductCards() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-green-600 font-bold mb-3">${product.price}</p>

              {/* Icons Row */}
              <div className="flex justify-between items-center">
                {/* Details Button */}
                <Link
                  href={`/products/${product._id}`}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                >
                  <FaInfoCircle /> Details
                </Link>

                {/* Wishlist Button */}
                <button className="flex items-center gap-1 text-red-500 hover:text-red-700">
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
