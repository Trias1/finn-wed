"use client";
import Link from "next/link";
import { FiLock } from "react-icons/fi";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <FiLock className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          403 - Akses Ditolak
        </h1>
        <p className="text-gray-600 mb-6">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition"
        >
          ⬅️ Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
