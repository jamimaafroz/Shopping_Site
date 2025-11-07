"use client";
import { useSession } from "next-auth/react";

export default function profilePage() {
  const { data: session } = useSession();
  console.log(session);

  if (!session) return <p>Loading...</p>;
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f5f0ea] text-[#4b2e12]">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-10 border border-[#e0cfc6]">
        <h1
          className="text-3xl font-bold mb-6 text-center pb-3 border-b"
          style={{ borderColor: "#9B563F", color: "#9B563F" }}
        >
          Profile Overview
        </h1>

        {session ? (
          <div className="space-y-5 text-lg">
            <div
              className="flex justify-between border-b pb-2"
              style={{ borderColor: "#f0e6e1" }}
            >
              <span className="font-semibold text-[#9B563F]">Full Name:</span>
              <span>{session?.user?.name}</span>
            </div>
            <div
              className="flex justify-between border-b pb-2"
              style={{ borderColor: "#f0e6e1" }}
            >
              <span className="font-semibold text-[#9B563F]">Email:</span>
              <span>{session?.user?.email}</span>
            </div>
            <div
              className="flex justify-between border-b pb-2"
              style={{ borderColor: "#f0e6e1" }}
            >
              <span className="font-semibold text-[#9B563F]">Role:</span>
              <span className="capitalize">{session?.user?.role}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No user data found. Please sign in.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-[#9B563F] text-white rounded-lg shadow-md hover:bg-[#7f452f] transition duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
