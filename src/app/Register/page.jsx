"use client";
import { RegisterUser } from "@/actions/auth/RegisterUser";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    const res = await RegisterUser({ name, email, password });
    console.log("Registration response:", res);
    if (res?.success) {
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Sign-in response:", signInRes);
      if (signInRes?.ok) router.push("/");
      else alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl w-full max-w-md p-8 sm:p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B563F] dark:focus:ring-green-500 focus:border-[#9B563F] dark:focus:border-green-500 transition shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B563F] dark:focus:ring-green-500 focus:border-[#9B563F] dark:focus:border-green-500 transition shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B563F] dark:focus:ring-green-500 focus:border-[#9B563F] dark:focus:border-green-500 transition shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Forgot link */}
          <div className="text-right">
            <a
              href="#"
              className="text-green-500 dark:text-[#9B563F] hover:text-green-600 dark:hover:text-green-500 text-sm transition"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white font-light py-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-gray-500 dark:text-gray-400 mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-500 dark:text-[#9B563F] hover:text-green-600 dark:hover:text-green-500 font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
