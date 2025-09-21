"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your register API here
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
              required
            />
          </div>

          {/* Forgot link */}
          <div className="text-right">
            <a
              href="#"
              className="text-green-500 hover:text-green-600 text-sm transition"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-500 hover:text-green-600 font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
