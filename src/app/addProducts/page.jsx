"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBox,
  FaLayerGroup,
  FaDollarSign,
  FaImage,
  FaWarehouse,
} from "react-icons/fa";

export default function AddProducts() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "loading") return;

    if (!session) {
      toast.error("Please log in to add products.");
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading("Uploading product...");

    try {
      // 1. ATTACH SELLER DATA TO THE PAYLOAD
      const productPayload = {
        ...form,
        sellerEmail: session.user.email,
        sellerName: session.user.name,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload), // Send updated payload
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("✅ Product listed in your shop!");
        setForm({
          name: "",
          category: "",
          price: "",
          description: "",
          image: "",
          stock: "",
        });
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to connect to server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0D0D0D] py-12 px-4 flex justify-center">
      <Toaster position="top-right" />

      <div className="w-full max-w-4xl bg-white dark:bg-[#1A1A1A] rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100 dark:border-white/5">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            List New Product
          </h1>
          <p className="text-gray-500">
            Your items will be visible to all ShopEase customers instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#9B563F] ml-1">
                Product Title
              </label>
              <div className="relative">
                <FaBox className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Wireless Headphones"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-[#9B563F] outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#9B563F] ml-1">
                Category
              </label>
              <div className="relative">
                <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Electronics"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-[#9B563F] outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#9B563F] ml-1">
                Price (USD)
              </label>
              <div className="relative">
                <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-[#9B563F] outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#9B563F] ml-1">
                Initial Stock
              </label>
              <div className="relative">
                <FaWarehouse className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="stock"
                  placeholder="Quantity available"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-[#9B563F] outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#9B563F] ml-1">
              Product Description
            </label>
            <textarea
              name="description"
              placeholder="Tell customers about your product..."
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-[#9B563F] outline-none transition"
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#9B563F] ml-1">
              Cover Image Link
            </label>
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="image"
                placeholder="https://..."
                value={form.image}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-[#9B563F] outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-5 bg-[#9B563F] hover:bg-[#7a4332] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#9B563F]/20 transition-all transform active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? "Processing..." : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
