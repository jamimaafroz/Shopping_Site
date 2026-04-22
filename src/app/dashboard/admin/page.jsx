"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaDollarSign,
  FaUserShield,
  FaTrashAlt,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function AdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("API Error:", data);
        toast.error(data.error || "Failed to load users");
        setUsers([]);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("Network error while loading users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetchUsers();
    }
  }, [session]);

  const handleRoleChange = async (userId, newRole) => {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    if (res.ok) {
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } else {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to permanently delete this user?"))
      return;

    // We will wire up the actual backend API for this next!
    toast.error("Delete API not connected yet!");
  };

  if (!session || session.user.role !== "admin") {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Unauthorized Access
      </div>
    );
  }

  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className="space-y-10">
      <Toaster position="top-right" />

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaUsers />}
          title="Total Users"
          value={safeUsers.length}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaBoxOpen />}
          title="Total Products"
          value="48"
          color="bg-[#9B563F]"
        />
        <StatCard
          icon={<FaDollarSign />}
          title="Platform Revenue"
          value="$12,450"
          color="bg-green-500"
        />
        <StatCard
          icon={<FaUserShield />}
          title="Active Sellers"
          value={safeUsers.filter((u) => u.role === "seller").length}
          color="bg-purple-500"
        />
      </div>

      {/* --- USER MANAGEMENT TABLE --- */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-white/5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            User Management
          </h2>
          <p className="text-sm text-gray-500">
            Promote sellers or manage platform access.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-black/20 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="p-5">User</th>
                <th className="p-5">Role</th>
                <th className="p-5">Join Date</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {safeUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 uppercase">
                        {user?.name?.[0] || "?"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="bg-gray-100 dark:bg-black/40 text-xs font-bold p-2 rounded-lg outline-none border-none focus:ring-2 focus:ring-[#9B563F]"
                    >
                      <option value="user">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-5 text-sm text-gray-500">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-5 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-400 hover:text-red-600 p-2 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {safeUsers.length === 0 && !loading && (
            <div className="p-10 text-center text-gray-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center gap-5 shadow-sm">
      <div
        className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white text-2xl`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
          {title}
        </p>
        <p className="text-2xl font-black text-gray-800 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
