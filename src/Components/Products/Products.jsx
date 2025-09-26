"use client";
import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("Error Fetching Products", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products Page</h1>
      <div>
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-400 mb-2">{product.description}</p>
            <p className="text-green-400 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
