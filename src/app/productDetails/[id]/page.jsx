"use client";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useProducts from "@/hooks/useProducts";
import useCart from "@/hooks/useCart";
import {
  FaTag,
  FaChevronLeft,
  FaShieldAlt,
  FaTruck,
  FaBox,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function ProductDetailsPage() {
  const { data: session } = useSession();
  const userId = session?.user?.email;
  const { id } = useParams();
  const router = useRouter();

  const { products, loading, error } = useProducts();
  const { addItem } = useCart(userId);

  // --- LOADING STATE (SKELETON) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-12 animate-pulse">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl">
          <div className="bg-gray-200 h-[400px] rounded-2xl w-full"></div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  const product = products.find((p) => p._id === id);
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  const handleAddToCart = async () => {
    if (!userId) return toast.error("⚠️ Please log in to shop!");
    // Your useCart hook already handles toast and logic
    await addItem(product);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-10 px-4 md:px-12 lg:px-24">
      <Toaster position="top-center" />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-[#9B563F] transition-colors"
      >
        <FaChevronLeft size={12} /> Back to Products
      </button>

      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image Section */}
          <div className="bg-[#F3F3F3] p-8 md:p-12 flex justify-center items-center relative min-h-[400px]">
            <div className="relative w-full h-[350px] transition-transform duration-500 hover:scale-105">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            {product.stock > 0 && (
              <span className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-[#9B563F] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                New Arrival
              </span>
            )}
          </div>

          {/* Right: Content Section */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="flex items-center gap-2 text-[#9B563F] font-semibold text-sm mb-2 uppercase tracking-tighter">
              <FaTag /> {product.category || "General"}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              <div className="h-6 w-[1px] bg-gray-200"></div>
              <span
                className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
              >
                {product.stock > 0 ? "● In Stock" : "Out of Stock"}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {product.description}
            </p>

            {/* Features Info */}
            <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <FaTruck className="text-[#9B563F]" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <FaShieldAlt className="text-[#9B563F]" />
                <span>1 Year Warranty</span>
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <button
                className="w-full bg-[#9B563F] hover:bg-[#7a4332] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-[#9B563F]/20 active:scale-[0.98] disabled:bg-gray-300"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Currently Unavailable"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Secure transaction guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications Section (Optional) */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <FaBox className="text-[#9B563F] mb-3" size={24} />
          <h4 className="text-black font-bold mb-2">Quality Materials</h4>
          <p className="text-sm text-gray-500">
            Premium build quality designed for durability and performance.
          </p>
        </div>
        {/* Add more info cards if needed */}
      </div>
    </div>
  );
}
