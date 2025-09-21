"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/",
    });

    console.log("Login result:", result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200  px-4">
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <a href="#" className="hover:text-green-500 transition">
            Forgot Password?
          </a>
          <Link href="/Register">
            <p className="hover:text-green-500 transition">Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
