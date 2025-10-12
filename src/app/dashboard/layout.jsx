"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { HiMenu, HiX } from "react-icons/hi";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    ...(session?.user?.role === "admin"
      ? [{ label: "Admin Panel", href: "/dashboard/admin" }]
      : []),
    { label: "User Page", href: "/dashboard/user" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Mobile Hamburger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#9B563F] text-white rounded-md shadow-md hover:bg-[#7a412f] focus:outline-none"
        >
          {isOpen ? (
            <HiX className="text-2xl" />
          ) : (
            <HiMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 shadow-lg z-40 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 lg:translate-x-0 lg:flex lg:flex-col`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-[#9B563F]">Dashboard</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col mt-6 gap-2 px-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="block text-gray-300 hover:text-white hover:bg-[#9B563F] transition-all px-4 py-3 rounded-lg font-medium shadow-sm">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full bg-[#9B563F] hover:bg-[#7a412f] transition-colors px-4 py-3 rounded-lg font-semibold shadow-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 lg:ml-64 bg-gray-800 text-gray-100 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
