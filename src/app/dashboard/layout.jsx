"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { HiMenu, HiX, HiHome, HiUser, HiShieldCheck } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Overview", href: "/", icon: HiHome },
    ...(session?.user?.role === "admin"
      ? [
          {
            label: "Admin Panel",
            href: "/dashboard/admin",
            icon: HiShieldCheck,
          },
        ]
      : []),
    { label: "User Profile", href: "/dashboard/user", icon: HiUser },
    { label: "Profile", href: "/dashboard/profile", icon: HiUser },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const Sidebar = () => (
    <div
      className={`fixed z-30 inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition duration-300 ease-in-out 
      bg-[#1f1b16] text-[#e6e0d0] w-64 space-y-6 py-7 px-3 shadow-lg`}
    >
      <div className="flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-semibold text-[#c8a37e]">
          Dashboard
        </Link>
        <button
          className="lg:hidden p-2 text-[#c8a37e]"
          onClick={() => setIsSidebarOpen(false)}
        >
          <HiX className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-8 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center space-x-3 py-2 px-4 rounded-md hover:bg-[#2b2520] transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            <item.icon className="h-5 w-5 text-[#b89267]" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-[#2e2924]">
        {session?.user && (
          <div className="text-sm mb-3">
            <p className="font-medium truncate">{session.user.email}</p>
            <p className="text-xs text-[#b89267] capitalize">
              {session.user.role}
            </p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 w-full py-2 px-4 bg-[#a6794f] hover:bg-[#8d6a43] text-white rounded-md transition"
        >
          <FiLogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  const Content = () => (
    <div className="flex-1 p-5 lg:p-10 bg-[#f9f9f7] text-[#4b3b2a]">
      <header className="mb-6 border-b border-[#d8cbb8] pb-4">
        <h1 className="text-3xl font-bold text-[#7a5c3a]">
          Welcome
          {session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-[#a67c52] text-sm">
          Manage your account and view data.
        </p>
      </header>

      <main className="bg-white border border-[#e0d6c8] rounded-lg p-6 min-h-[75vh] shadow-md">
        {children}
      </main>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#14110e]">
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[#a6794f] text-white rounded-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <HiMenu className="h-6 w-6" />
      </button>

      <Sidebar />

      <div className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <Content />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
