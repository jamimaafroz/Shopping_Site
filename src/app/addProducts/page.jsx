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
      toast.error(<span>❌ Please log in to add products.</span>);
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
        toast.error(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("❌ Failed to add product.");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" /> {/* Required for toasts */}
      <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-xl">
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-400">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={submitting}
            className={`w-full p-3 rounded-lg font-medium ${
              submitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
}
