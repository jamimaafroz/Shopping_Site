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

  // Mobile links
  const mobileLinks = (
    <>
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
        <Link
          href="/deals"
          className="flex items-center gap-2 text-black hover:text-[#9B563F] transition"
        >
          <FaTags /> Deals
        </Link>
      </li>
      <li tabIndex={0}>
        <a className="flex items-center gap-2 justify-between text-black hover:text-[#9B563F] transition">
          <FaAppleAlt /> Categories
          <span className="ml-2">&#x25BE;</span>
        </a>
        <ul className="p-2 bg-white rounded-box shadow">{categories}</ul>
      </li>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-[#9B563F] transition">
          <FaRegHeart /> Wishlist
        </a>
      </li>
      {mounted && session && (
        <li>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white shadow-md px-4 md:px-8 justify-between">
      {/* Navbar Start */}
      <div className="flex items-center navbar-start space-x-2 lg:space-x-4">
        <div className="w-28 sm:w-32 md:w-36 lg:w-40">
          <ShopEaseLogo />
        </div>
      </div>

      {/* Navbar Center - Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link href="/">
              <p className="text-black hover:text-[#9B563F] cursor-pointer transition">
                Home
              </p>
            </Link>
          </li>
          <li>
            <Link href="/deals">
              <p className="text-black hover:text-[#9B563F] cursor-pointer transition">
                Deals
              </p>
            </Link>
          </li>
          <li>
            <Link href="/addProducts">
              <p className="text-black hover:text-[#9B563F] cursor-pointer transition">
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
          <li>
            <p className="text-black hover:text-[#9B563F] cursor-pointer transition">
              About Us
            </p>
          </li>

          {/* Account Dropdown */}
          {mounted && session && (
            <li>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  role="button"
                  className=" flex items-center gap-2"
                >
                  <FaUser /> {session.user.name}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[50] w-52 p-2 shadow-md"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:text-[#9B563F]"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:text-[#9B563F]"
                    >
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:text-red-600"
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
      <div className="navbar-end flex items-center gap-4 text-xl md:text-2xl">
        <IoSearch className="text-[#9B563F] cursor-pointer transition" />
        <div className="relative cursor-pointer">
          <FaRegHeart className="text-[#9B563F]" />
          {!loading && wishlists.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {wishlists.length}
            </span>
          )}
        </div>

        <div className="relative cursor-pointer">
          <BsCart className="text-[#9B563F] cursor-pointer transition" />
          {!cartLoading && count > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost p-2">
            <HiOutlineMenu className="text-green-600 text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[50] mt-3 w-56 p-2 shadow-md right-0"
          >
            {mobileLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}
