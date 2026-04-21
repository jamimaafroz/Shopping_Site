"use client";
import { RegisterUser } from "@/actions/auth/RegisterUser";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  // Added 'role' to the form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, role } = form;

    try {
      const res = await RegisterUser({ name, email, password, role });

      if (res?.success) {
        toast.success("Registration successful!");
        const signInRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInRes?.ok) {
          router.push("/");
        } else {
          toast.error("Login failed after registration.");
        }
      } else {
        toast.error(res?.error || "Registration failed.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <Toaster position="top-center" />
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-[2rem] w-full max-w-md p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Join ShopEase as a Buyer or Seller
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection - Modern Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "user" })}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                form.role === "user"
                  ? "bg-white dark:bg-gray-700 text-[#9B563F] shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "seller" })}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                form.role === "seller"
                  ? "bg-white dark:bg-gray-700 text-[#9B563F] shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Seller
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1 text-sm ml-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#9B563F] bg-transparent outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1 text-sm ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#9B563F] bg-transparent outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1 text-sm ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#9B563F] bg-transparent outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9B563F] hover:bg-[#7a4332] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#9B563F] font-bold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
