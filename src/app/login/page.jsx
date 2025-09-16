import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

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
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
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
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
          Login
        </button>

        {/* Additional Links */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <a href="#" className="hover:text-green-500 transition">
            Forgot Password?
          </a>
          <a href="#" className="hover:text-green-500 transition">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
