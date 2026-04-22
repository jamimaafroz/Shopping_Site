"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaEdit, FaTrash, FaPlus, FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyProducts() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProducts = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`/api/products?email=${session.user.email}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, [session]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted!");
      fetchMyProducts(); // Refresh list
    } else {
      toast.error("Failed to delete.");
    }
  };

  if (loading)
    return <div className="p-10 text-[#9B563F]">Loading your inventory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Inventory
        </h2>
        <Link
          href="/addProducts"
          className="flex items-center gap-2 bg-[#9B563F] text-white px-4 py-2 rounded-xl hover:bg-[#7a4332] transition shadow-md"
        >
          <FaPlus /> Add New
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
          <FaBoxOpen size={50} className="text-gray-300 mb-4" />
          <p className="text-gray-500">You haven't listed any products yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/5 text-gray-400 text-sm uppercase tracking-widest">
                <th className="p-5 font-bold">Product</th>
                <th className="p-5 font-bold">Category</th>
                <th className="p-5 font-bold">Price</th>
                <th className="p-5 font-bold">Stock</th>
                <th className="p-5 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-gray-800 dark:text-gray-200">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 text-gray-500 text-sm">
                    {product.category}
                  </td>
                  <td className="p-5 font-bold text-[#9B563F]">
                    ${product.price}
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.stock > 5
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
