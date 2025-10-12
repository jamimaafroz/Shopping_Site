"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useCart(userId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  const fetchCart = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const addItem = async (product) => {
    if (!userId) return toast.error("Please login to add to cart!");

    const exists = items.some((i) => i.productId === product._id);
    if (exists) {
      toast.error(`🛒 ${product.name} is already in your cart!`);
      return null;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, product }),
      });

      if (res.ok) {
        toast.success(`✅ ${product.name} added to cart!`);
        fetchCart();
      } else {
        toast.error("Failed to add to cart!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Something went wrong!");
    }
  };

  const removeItem = async (productId) => {
    if (!userId) return toast.error("Please login to remove items!");
    try {
      await fetch(`/api/cart?userId=${userId}&productId=${productId}`, {
        method: "DELETE",
      });
      toast.success("Item removed!");
      fetchCart();
    } catch {
      toast.error("Failed to remove item!");
    }
  };

  const clearCart = async () => {
    if (!userId) return toast.error("Please login to clear cart!");
    try {
      await fetch(`/api/cart?userId=${userId}`, { method: "DELETE" });
      toast.success("Cart cleared!");
      fetchCart();
    } catch {
      toast.error("Failed to clear cart!");
    }
  };

  const count = items.reduce((a, i) => a + i.quantity, 0);
  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);

  return { items, loading, addItem, removeItem, clearCart, count, total };
}
