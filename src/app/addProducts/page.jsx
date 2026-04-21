"use client";
import { useSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddProducts() {
  const { data: session, status } = useSession(); // session & status
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
    console.log("Form:", form);
    console.log("Session:", session);
    console.log("Status:", status);

    if (status === "loading") {
      toast.loading("⏳ Checking session...");
      return;
    }

    if (!session) {
      toast.error(<span> Please log in to add products.</span>);
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading("Adding product...");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("✅ Product added successfully!");
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
      toast.error("Failed to add product.");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-black text-white px-6 py-12 flex justify-center">
        <div className="w-full max-w-3xl">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-[#ffffff]">
              Add Product
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Fill in the details to add a new product
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-[#111] border-b border-[#333] focus:border-[#5a2c1d] outline-none p-2 transition"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-[#111] border-b border-[#333] focus:border-[#5a2c1d] outline-none p-2 transition"
                required
              />
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full bg-[#111] border-b border-[#333] focus:border-[#5a2c1d] outline-none p-2 transition"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full bg-[#111] border-b border-[#333] focus:border-[#5a2c1d] outline-none p-2 transition"
              />
            </div>
            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-[#111] border-b border-[#333] focus:border-[#5a2c1d] outline-none p-2 transition"
              required
            />
            {/* Image */}
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="w-full bg-[#111] border-b border-[#333] focus:border-[#5a2c1d] outline-none p-2 transition"
            />
            {/* Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 font-medium transition ${
                  submitting
                    ? "bg-[#1a1a1a] text-gray-500 cursor-not-allowed"
                    : "bg-[#5a2c1d] hover:bg-[#6b3423] text-white"
                }`}
              >
                {submitting ? "Adding..." : "Add Product"}
              </button>
            </div>
            s
          </form>
        </div>
      </div>
    </>
  );
}
