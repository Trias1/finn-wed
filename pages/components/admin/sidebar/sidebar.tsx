"use client";
import Link from "next/link";
import { logout } from "../../../../services/firebase-auth";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login"; // hard redirect
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-purple-800 text-white transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
        transition-transform duration-300 ease-in-out
      `}
    >
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="px-6 py-4 text-2xl font-bold border-b border-purple-700 flex justify-between items-center">
          Wedding Admin
          {/* Tombol close di mobile */}
          <button
            className="md:hidden text-lg font-bold"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link
            href="/admin/dashboard"
            className="block py-2 px-3 rounded hover:bg-purple-700 transition"
            onClick={onClose}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/listUndangan"
            className="block py-2 px-3 rounded hover:bg-purple-700 transition"
            onClick={onClose}
          >
            List Undangan
          </Link>
          <Link
            href="/admin/addUndangan"
            className="block py-2 px-3 rounded hover:bg-purple-700 transition"
            onClick={onClose}
          >
            Tambah Undangan
          </Link>
          <Link
            href="/admin/replyUndangan"
            className="block py-2 px-3 rounded hover:bg-purple-700 transition"
            onClick={onClose}
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
      </div>
    </aside>
  );
}
