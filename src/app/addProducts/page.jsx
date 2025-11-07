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
      <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2c1810] to-[#0f0a06] text-white flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-10 text-center text-[#d7b899] tracking-wide">
            Add New Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-[#1c1a17]/70 backdrop-blur-md p-10 rounded-2xl border border-[#3d3025] shadow-[0_0_30px_rgba(0,0,0,0.4)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className="p-3 rounded bg-[#2a231d] border border-[#4a3c2e] focus:border-[#b89267] focus:ring-1 focus:ring-[#b89267] outline-none"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="p-3 rounded bg-[#2a231d] border border-[#4a3c2e] focus:border-[#b89267] focus:ring-1 focus:ring-[#b89267] outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="p-3 rounded bg-[#2a231d] border border-[#4a3c2e] focus:border-[#b89267] focus:ring-1 focus:ring-[#b89267] outline-none"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="p-3 rounded bg-[#2a231d] border border-[#4a3c2e] focus:border-[#b89267] focus:ring-1 focus:ring-[#b89267] outline-none"
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#2a231d] border border-[#4a3c2e] focus:border-[#b89267] focus:ring-1 focus:ring-[#b89267] outline-none"
              rows="4"
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#2a231d] border border-[#4a3c2e] focus:border-[#b89267] focus:ring-1 focus:ring-[#b89267] outline-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className={`w-full cursor-pointer p-3 rounded-lg font-semibold ${
                submitting
                  ? "bg-[#3a2c1f] cursor-not-allowed text-[#cbb497]"
                  : "bg-[#b89267]  hover:from-[#c8a37e] hover:to-[#a6794f]]"
              }`}
            >
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
