"use client";

import { useSession } from "next-auth/react";

export default function UserPage() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">User Page</h1>
      <p>Accessible by all logged-in users.</p>
    </div>
  );
}
