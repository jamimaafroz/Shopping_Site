"use client";
import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLaptop,
  FaTshirt,
  FaAppleAlt,
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();

  const categories = [
    { name: "Electronics", icon: <FaLaptop /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Groceries", icon: <FaAppleAlt /> },
  ];

  return (
    <footer className="bg-gray-900 text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About / Logo */}
        <div>
          <h2 className="text-xl font-bold mb-4">ShopEase</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for Electronics, Fashion, and Groceries. Quality
            products, best deals, and easy shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/addProducts"
                className="hover:text-green-400 transition"
              >
                Deals
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                {cat.icon} <span>{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Account / Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-2 mb-4">
            {session ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-green-400 transition"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-green-400 transition"
                  >
                    Update Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="hover:text-red-500 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="hover:text-green-400 transition">
                  Login
                </Link>
              </li>
            )}
          </ul>

          {/* Newsletter */}
          <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-md text-gray-900 focus:outline-none"
            />
            <button className="bg-green-500 px-4 rounded-r-md hover:bg-green-600 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-green-400 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-green-400 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-green-400 transition">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}
