"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
      <p>Your role: {session.user.role}</p>
      <p>Use the sidebar to navigate your dashboard.</p>
    </div>
  );
}
