"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import useProducts from "@/hooks/useProducts";
import useCart from "@/hooks/useCart";
import { FaTag } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetailsPage() {
  const { data: session } = useSession();
  const userId = session?.user?.email;
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { items, addItem } = useCart(userId); // ✅ correct variable name here

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const product = products.find((p) => p._id === id);
  if (!product) return <p>Product not found</p>;

  const handleAddToCart = async () => {
    if (!userId) return toast.error("⚠️ Please log in!");

    const res = await addItem(product);
    if (!res) return;

    const data = await res.json();

    if (res.status === 409) {
      toast.error(`${product.name} is already in your cart!`);
    } else if (res.ok) {
      toast.success(`✅ ${product.name} added to cart!`);
    } else {
      toast.error(data.message || "Failed to add item!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 relative">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm rounded-lg border border-gray-200 object-cover"
          />
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaTag className="text-blue-500" />
            <span>Category: {product.category || "General"}</span>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="mt-4">
            <span className="text-4xl font-semibold text-green-600">
              ${product.price}
            </span>
          </div>

          <button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
