import React from "react";
import ShopEaseLogo from "./logo";
import {
  FaTags,
  FaAppleAlt,
  FaLaptop,
  FaTshirt,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";

export default function Navbar() {
  const categories = (
    <>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-green-400 transition">
          <FaLaptop className="text-black" /> Electronics
        </a>
      </li>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-green-400 transition">
          <FaTshirt className="text-black" /> Fashion
        </a>
      </li>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-green-400 transition">
          <FaAppleAlt className="text-black" /> Groceries
        </a>
      </li>
    </>
  );

  const mobileLinks = (
    <>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-green-400 transition">
          <FaTags className="text-black" /> Deals
        </a>
      </li>
      <li tabIndex={0}>
        <a className="flex items-center gap-2 justify-between text-black hover:text-green-400 transition">
          <FaAppleAlt className="text-black" /> Categories
          <span className="ml-2">&#x25BE;</span>
        </a>
        <ul className="p-2 bg-white rounded-box shadow">{categories}</ul>
      </li>
      <li>
        <a className="flex items-center gap-2 text-black hover:text-green-400 transition">
          <FaRegHeart className="text-black" /> Wishlist
        </a>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md px-4 md:px-8 justify-between">
      {/* Navbar Start */}
      <div className="flex items-center navbar-start space-x-2 lg:space-x-4">
        {/* Logo */}
        <div className="w-28 sm:w-32 md:w-36 lg:w-40">
          <ShopEaseLogo />
        </div>
      </div>

      {/* Navbar Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <p className="text-black hover:text-green-400 cursor-pointer transition">
              Home
            </p>
          </li>
          <li>
            <p className="text-black hover:text-green-400 cursor-pointer transition">
              Deals
            </p>
          </li>
          <li>
            <details className="relative group">
              <summary className="flex items-center gap-1 text-black hover:text-green-400 cursor-pointer transition">
                <FaAppleAlt className="text-black hover:text-green-400" />
                Categories
              </summary>
              <ul className="absolute top-full left-0 mt-2 p-2 bg-white rounded-box shadow-md min-w-[150px]">
                {categories}
              </ul>
            </details>
          </li>
          <li>
            <p className="text-black hover:text-green-400 cursor-pointer transition">
              About Us
            </p>
          </li>
          <li>
            <p className="text-black hover:text-green-400 cursor-pointer transition">
              Account
            </p>
          </li>
          <li>
            <p className="text-black hover:text-green-400 cursor-pointer transition">
              Contact Us
            </p>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-4 text-xl md:text-2xl">
        <IoSearch className="text-green-400 cursor-pointer transition" />
        <FaRegHeart className="text-green-400 cursor-pointer transition" />
        <BsCart className="text-green-400 cursor-pointer transition" />

        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost p-2">
            <HiOutlineMenu className="text-green-600 text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-56 p-2 shadow-md right-0"
          >
            {mobileLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}
