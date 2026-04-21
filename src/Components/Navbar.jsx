"use client";

import React, { useState, useEffect } from "react";
import ShopEaseLogo from "./logo";
import {
  FaTags,
  FaAppleAlt,
  FaLaptop,
  FaTshirt,
  FaRegHeart,
  FaUser,
  FaPlus,
  FaHome,
  FaColumns,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import useWishlists from "@/hooks/useWishlists";
import useCart from "@/hooks/useCart";

export default function Navbar() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const { wishlists, loading } = useWishlists(userEmail);
  const { items, loading: cartLoading, count } = useCart(userEmail);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Categories submenu
  const categories = (
    <>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-[#9B563F] transition">
          <FaLaptop /> Electronics
        </a>
      </li>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-[#9B563F] transition">
          <FaTshirt /> Fashion
        </a>
      </li>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-[#9B563F] transition">
          <FaAppleAlt /> Groceries
        </a>
      </li>
    </>
  );

  // Mobile links logic
  const mobileLinks = (
    <>
      {/* Logged In User Info (Mobile) */}
      {mounted && session && (
        <li className="border-b border-gray-100 mb-2 pb-2">
          <div className="flex items-center gap-2 font-bold text-[#9B563F]">
            <FaUser /> {session.user.name}
          </div>
        </li>
      )}

      <li>
        <Link
          href="/"
          className="flex items-center gap-2 text-black hover:text-[#9B563F] transition"
        >
          <FaHome /> Home
        </Link>
      </li>
      <li>
        <Link
          href="/addProducts"
          className="flex items-center gap-2 text-black hover:text-[#9B563F] transition"
        >
          <FaPlus /> Add Product
        </Link>
      </li>
      <li>
        {/* Changed from /deals to /productCards */}
        <Link
          href="/productCards"
          className="flex items-center gap-2 text-black hover:text-[#9B563F] transition"
        >
          <FaTags /> Deals
        </Link>
      </li>

      {mounted && session && (
        <>
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-black hover:text-[#9B563F] transition"
            >
              <FaColumns /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-black hover:text-[#9B563F] transition"
            >
              <FaUser /> Profile
            </Link>
          </li>
        </>
      )}

      <li tabIndex={0}>
        <a className="flex items-center gap-2 justify-between text-black hover:text-[#9B563F] transition">
          <div className="flex items-center gap-2">
            <FaAppleAlt /> Categories
          </div>
          <span>&#x25BE;</span>
        </a>
        <ul className="p-2 bg-white rounded-box shadow-inner">{categories}</ul>
      </li>

      <li>
        <Link
          href="/wishlist"
          className="flex items-center justify-between text-black hover:text-[#9B563F] transition"
        >
          <div className="flex items-center gap-2">
            <FaRegHeart /> Wishlist
          </div>
          {mounted && wishlists.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              {wishlists.length}
            </span>
          )}
        </Link>
      </li>

      {mounted && session && (
        <li>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition mt-2 border-t pt-2"
          >
            Logout
          </button>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white shadow-md px-4 md:px-8 justify-between sticky top-0 z-[100]">
      {/* Navbar Start */}
      <div className="flex items-center navbar-start">
        <div className="w-28 sm:w-32 md:w-36 lg:w-40">
          <ShopEaseLogo />
        </div>
      </div>

      {/* Navbar Center - Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link href="/">
              <p className="text-black hover:text-[#9B563F] transition">Home</p>
            </Link>
          </li>
          {/* Changed from /deals to /productCards */}
          <li>
            <Link href="/productCards">
              <p className="text-black hover:text-[#9B563F] transition">
                Deals
              </p>
            </Link>
          </li>
          <li>
            <Link href="/addProducts">
              <p className="text-black hover:text-[#9B563F] transition">
                Add Product
              </p>
            </Link>
          </li>

          <li>
            <div className="dropdown dropdown-hover">
              <label
                tabIndex={0}
                className="flex items-center gap-1 text-black hover:text-[#9B563F] cursor-pointer transition"
              >
                <FaAppleAlt /> Categories
              </label>
              <ul className="dropdown-content mt-2 p-2 bg-white rounded-box shadow-md min-w-[150px]">
                {categories}
              </ul>
            </div>
          </li>

          {/* Account Dropdown Desktop */}
          {mounted && session && (
            <li>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 text-[#9B563F] font-medium"
                >
                  <FaUser /> {session.user.name}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[50] w-52 p-2 shadow-md"
                >
                  <li>
                    <Link href="/dashboard" className="hover:text-[#9B563F]">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="hover:text-[#9B563F]">
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-red-500 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3 md:gap-4 text-xl md:text-2xl">
        <IoSearch className="text-[#9B563F] cursor-pointer" />

        {/* Wishlist Icon (Desktop Only - hidden on small mobile to save space since it's in menu) */}
        <Link
          href="/wishlist"
          className="relative cursor-pointer hidden sm:block"
        >
          <FaRegHeart className="text-[#9B563F]" />
          {mounted && wishlists.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {wishlists.length}
            </span>
          )}
        </Link>

        {/* Cart Icon */}
        <Link href="/cart" className="relative cursor-pointer">
          <BsCart className="text-[#9B563F]" />
          {mounted && count > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
        </Link>

        {/* Mobile Dropdown Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <HiOutlineMenu className="text-[#9B563F] text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[50] mt-3 w-64 p-3 shadow-xl right-0 border border-gray-100"
          >
            {mobileLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}
