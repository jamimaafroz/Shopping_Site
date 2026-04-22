"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  HiOutlineViewGrid,
  HiOutlineUserCircle,
  HiOutlineShieldCheck,
  HiOutlineLogout,
  HiMenuAlt2,
  HiX,
  HiOutlineClipboardList,
  HiOutlinePlusCircle,
  HiOutlineShoppingBag,
} from "react-icons/hi";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Overview", href: "/dashboard", icon: HiOutlineViewGrid },
    // Admin Section
    ...(session?.user?.role === "admin"
      ? [
          {
            label: "Admin Panel",
            href: "/dashboard/admin",
            icon: HiOutlineShieldCheck,
          },
        ]
      : []),
    // Seller Specific Sections
    ...(session?.user?.role === "seller"
      ? [
          {
            label: "My Products",
            href: "/dashboard/my-products",
            icon: HiOutlineShoppingBag,
          },
          {
            label: "Add Product",
            href: "/addProducts",
            icon: HiOutlinePlusCircle,
          },
          {
            label: "Sales Orders",
            href: "/dashboard/orders",
            icon: HiOutlineClipboardList,
          },
        ]
      : []),
    // Common Sections
    {
      label: "Settings",
      href: "/dashboard/profile",
      icon: HiOutlineUserCircle,
    },
  ];

  const SidebarLink = ({ item }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={() => setIsSidebarOpen(false)}
        className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-[#9B563F] text-white shadow-lg shadow-[#9B563F]/20"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
      >
        <item.icon
          className={`h-6 w-6 ${isActive ? "text-white" : "text-[#9B563F] group-hover:text-white"}`}
        />
        <span className="font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0F0F0F]">
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed z-50 inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out 
        bg-[#1A1A1A] border-r border-white/5 w-72 flex flex-col p-6 shadow-2xl`}
      >
        <div className="flex items-center justify-between mb-10 px-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#9B563F] rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-black text-white tracking-tighter">
              ShopEase
            </span>
          </Link>
          <button
            className="lg:hidden p-2 text-gray-400"
            onClick={() => setIsSidebarOpen(false)}
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 px-4">
            Menu
          </p>
          {menuItems.map((item) => (
            <SidebarLink key={item.label} item={item} />
          ))}
        </nav>

        {/* User Profile Footer */}
        <div className="mt-auto pt-6 border-t border-white/5">
          {session?.user && (
            <div className="flex items-center gap-3 px-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9B563F] to-[#7a4332] flex items-center justify-center text-white font-bold">
                {session.user.name?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {session.user.role}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center space-x-3 w-full py-3 px-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <HiOutlineLogout className="h-6 w-6" />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[#1A1A1A] sticky top-0 z-40 border-b border-white/5">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-400 bg-white/5 rounded-lg"
          >
            <HiMenuAlt2 className="h-6 w-6" />
          </button>
          <span className="text-white font-bold">ShopEase</span>
          <div className="w-10" /> {/* Spacer */}
        </header>

        <main className="flex-1 p-6 lg:p-10 bg-[#F9F9F9] dark:bg-[#0F0F0F]">
          {/* Header/Breadcrumb */}
          <div className="mb-10">
            <p className="text-[#9B563F] text-xs font-bold uppercase tracking-widest mb-1">
              Dashboard
            </p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Welcome Back
              {session?.user?.name
                ? `, ${session.user.name.split(" ")[0]}`
                : ""}
              !
            </h1>
          </div>

          {/* Wrapper for children */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-[2rem] p-6 lg:p-10 shadow-sm border border-gray-100 dark:border-white/5 min-h-[70vh]">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
