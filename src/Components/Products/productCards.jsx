"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaRegHeart,
  FaInfoCircle,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useWishlists from "@/hooks/useWishlists";

export default function ProductCards() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const { products, loading, error } = useProducts();
  const router = useRouter();
  const { refetch } = useWishlists(userEmail);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleWishlist = async (productId) => {
    if (!userEmail || !session?.user?.id) {
      toast.error("Please login to add to wishlist!");
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

      if (res.ok) {
        toast.success("✅ Added to wishlist!");
        refetch();
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong!");
      }
    } catch (err) {
      toast.error("Failed to add to wishlist.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] px-6 md:px-12 py-12">
      <Toaster position="top-center" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <span className="text-[#9B563F] font-bold text-sm uppercase tracking-widest">
            Premium Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Our Products
          </h1>
        </div>

        {/* Modern Search Bar */}
        <div className="relative w-full md:w-80 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#9B563F] transition-colors" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9B563F]/20 focus:border-[#9B563F] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 h-[400px] rounded-[2rem] animate-pulse"
              ></div>
            ))
        ) : error ? (
          <div className="col-span-full py-20 text-center text-red-500">
            Failed to load products.
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-[2rem] p-5 border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-[#9B563F]/10 transition-all duration-500 relative flex flex-col h-full"
            >
              {/* Wishlist Button - Floating */}
              <button
                onClick={() => handleWishlist(product._id)}
                className="absolute top-8 right-8 z-10 bg-white/80 backdrop-blur-md p-3 rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all active:scale-90"
              >
                <FaRegHeart />
              </button>

              {/* Image Container */}
              <div className="relative w-full h-56 mb-6 rounded-3xl overflow-hidden bg-[#F3F3F3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow px-2">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-xl font-black text-[#9B563F]">
                    ${product.price}
                  </p>
                </div>

                <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="mt-auto">
                  <Link
                    href={`/productDetails/${product._id}`}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold group-hover:bg-[#9B563F] transition-colors duration-300"
                  >
                    View Details{" "}
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400 italic">
            No products matched your search.
          </div>
        )}
      </div>
    </div>
  );
}
