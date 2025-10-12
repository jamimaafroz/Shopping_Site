"use client";

import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;
  if (session.user.role !== "admin") return <p>You are not authorized.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Only accessible by admins!</p>
    </div>
  );
}
