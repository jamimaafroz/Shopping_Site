"use client";
import React from "react";
import { useSession } from "next-auth/react";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaShoppingBasket, FaArrowLeft } from "react-icons/fa";

export default function CartPage() {
  const { data: session } = useSession();
  const userId = session?.user?.email; // Matching your hook's userId expectation
  const { items, loading, removeItem, total, count } = useCart(userId);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#9B563F]"></span>
        <p className="text-gray-500 animate-pulse">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
          <FaShoppingBasket className="text-[#9B563F]" />
          Shopping Cart{" "}
          <span className="text-lg font-normal text-gray-500">
            ({count} items)
          </span>
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/productCards"
              className="inline-flex items-center gap-2 bg-[#9B563F] text-white px-8 py-3 rounded-full hover:bg-[#7a4332] transition-all shadow-md"
            >
              <FaArrowLeft /> Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* List of Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="group bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[#9B563F] font-bold text-lg mb-2">
                      ${item.price}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-4">
                    <p className="font-bold text-xl text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove Item"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-[#9B563F]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-[0.98]">
                  Proceed to Checkout
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
                  Secure Checkout 🔒
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
