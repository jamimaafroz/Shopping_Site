"use client";
import React, { useState } from "react";
import {
  MdOutgoingMail,
  MdAddCall,
  MdLiveHelp,
  MdOutlineLogin,
} from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function UpperNavbar({ className = "" }) {
  const [socialOpen, setSocialOpen] = useState(false);

  return (
    <div className={`bg-[#9B563F] text-white ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 md:px-8 py-2 gap-2 lg:gap-0">
        {/* Row 1: Contact Info */}
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-1 text-sm">
            <MdOutgoingMail />
            <span className="font-light">jamimaafroz123@gmail.com</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <MdAddCall />
            <span className="font-light">+880123456789</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <MdLiveHelp />
            <span className="font-light">Need Help?</span>
          </div>
        </div>

        {/* Row 2: Login + Socials */}
        <div className="flex flex-col sm:flex-row items-start lg:items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          <div className="flex items-center gap-1 text-sm">
            <MdOutlineLogin />
            <Link href="/login" className="hover:underline">
              <span className="font-light">Login</span>
            </Link>
          </div>

          {/* Socials */}
          <div className="relative flex flex-col w-full sm:w-auto">
            {/* Mobile button */}
            <button
              className="flex items-center gap-2 text-sm font-light lg:hidden"
              onClick={() => setSocialOpen(!socialOpen)}
            >
              Follow Us {socialOpen ? "▲" : "▼"}
            </button>

            {/* Desktop always visible */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="font-light">Follow Us:</span>
              <a href="#" className="hover:text-gray-200">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-200">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gray-200">
                <FaTwitter />
              </a>
            </div>

            {/* Mobile dropdown */}
            {socialOpen && (
              <div className="flex flex-col gap-2 mt-2 lg:hidden bg-green-600 p-2 rounded shadow-md">
                <a
                  href="#"
                  className="hover:text-gray-200 flex items-center gap-2"
                >
                  <FaFacebookF /> Facebook
                </a>
                <a
                  href="#"
                  className="hover:text-gray-200 flex items-center gap-2"
                >
                  <FaInstagram /> Instagram
                </a>
                <a
                  href="#"
                  className="hover:text-gray-200 flex items-center gap-2"
                >
                  <FaTwitter /> Twitter
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
