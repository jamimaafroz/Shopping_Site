"use client";
import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        toast.success("Welcome back!");

        // --- ROLE-BASED REDIRECT LOGIC ---
        // Fetch the session manually to check the role immediately
        const session = await getSession();
        const role = session?.user?.role;

        if (role === "admin") {
          router.push("/dashboard"); // Admins go to the admin panel
        } else if (role === "seller") {
          router.push("/"); // Sellers go to home (or a seller dashboard)
        } else {
          router.push("/"); // Default users go to home
        }
      } else {
        toast.error("Invalid email or password!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4">
      <Toaster position="top-center" />

      {/* Login Card */}
      <div className="bg-[#1A1A1A] border border-gray-800 shadow-2xl rounded-3xl w-full max-w-md p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Welcome</h1>
          <p className="text-gray-500 text-sm">
            Login to your ShopEase account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label
              className="block text-gray-400 text-sm font-medium mb-2 ml-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-5 py-3 bg-[#111] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B563F] focus:border-[#9B563F] transition-all outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-gray-400 text-sm font-medium mb-2 ml-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3 bg-[#111] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9B563F] focus:border-[#9B563F] transition-all outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9B563F] hover:bg-[#7a4332] text-white font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-[#9B563F]/20 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-8 flex flex-col items-center gap-4 text-sm">
          <a href="#" className="text-gray-500 hover:text-[#9B563F] transition">
            Forgot Password?
          </a>
          <div className="text-gray-500">
            Don't have an account?{" "}
            <Link href="/Register">
              <span className="text-[#9B563F] font-bold hover:underline cursor-pointer">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
