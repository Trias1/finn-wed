"use client";
import Link from "next/link";
import { logout } from "../../../../services/firebase-auth";

export default function Sidebar() {
  const handleLogout = async () => {
    try {
      await logout();
      console.log("berhasil");
      window.location.href = "/login"; // hard redirect
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  return (
    <aside className="w-64 bg-purple-800 text-white flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-6 py-4 text-2xl font-bold border-b border-purple-700">
        Wedding Admin
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          href="/admin/dashboard"
          className="block py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/listUndangan"
          className="block py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          List Undangan
        </Link>
        <Link
          href="/admin/addUndangan"
          className="block py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          Tambah Undangan
        </Link>
        <Link
          href="/admin/replyUndangan"
          className="block py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          Reply Undangan
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="px-4 py-4 border-t border-purple-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
