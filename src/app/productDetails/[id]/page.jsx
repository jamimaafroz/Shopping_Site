"use client";
import { useParams } from "next/navigation";
import useProducts from "@/hooks/useProducts";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 py-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-60 bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  const product = products.find((p) => p._id === id);
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md rounded-md my-4"
      />
      <p>{product.description}</p>
      <p className="text-green-600 font-bold mt-2">${product.price}</p>
    </div>
  );
}
