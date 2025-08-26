"use client";
import Link from "next/link";
import { logout } from "../../../../services/firebase-auth";
import {
  FiHome,
  FiUsers,
  FiPlusCircle,
  FiMessageSquare,
  FiLogOut,
  FiBookOpen, // 📖 untuk Kelola Ucapan
} from "react-icons/fi";

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
          className="flex items-center gap-2 py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          <FiHome /> Dashboard
        </Link>
        <Link
          href="/admin/listUndangan"
          className="flex items-center gap-2 py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          <FiUsers /> List Undangan
        </Link>
        <Link
          href="/admin/addUndangan"
          className="flex items-center gap-2 py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          <FiPlusCircle /> Tambah Undangan
        </Link>
        <Link
          href="/admin/ucapan"
          className="flex items-center gap-2 py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          <FiBookOpen /> Kelola Ucapan
        </Link>
        <Link
          href="/admin/replyUndangan"
          className="flex items-center gap-2 py-2 px-3 rounded hover:bg-purple-700 transition"
        >
          <FiMessageSquare /> Reply Undangan
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="px-4 py-4 border-t border-purple-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
