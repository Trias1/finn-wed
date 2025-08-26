"use client";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import AdminLayout from "../../components/admin/sidebar/AdminLayout";
import { db } from "../../../services/firebase-config";
import { Pagination } from "react-bootstrap";

type Book = {
  id: string;
  title: string;   // nama tamu
  author: string;  // ucapan
  status: string;  // Hadir / Tidak Hadir
  createdAt?: any;
};

export default function KelolaUcapan() {
  const [ucapan, setUcapan] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const q = collection(db, "wedd");
    const unsub = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const list: Book[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Book, "id">),
      }));
      // urutkan terbaru dulu
      list.sort(
        (a, b) =>
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );
      setUcapan(list);
    });

    return () => unsub();
  }, []);

  const formatDate = (timestamp?: any) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate();
    return date.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalPages = Math.ceil(ucapan.length / itemsPerPage);
  const paginatedUcapan = ucapan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header + total badge */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-800 flex items-center gap-2">
            💌 Kelola Ucapan Tamu
            <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full shadow">
              {ucapan.length} Ucapan
            </span>
          </h1>
        </div>

        {ucapan.length === 0 ? (
          <p className="text-gray-600">Belum ada ucapan dari tamu.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedUcapan.map((u) => (
                <div
                  key={u.id}
                  className="bg-white p-4 rounded-lg shadow border transform transition duration-300 hover:scale-[1.02]"
                >
                  <h2 className="font-semibold text-lg text-purple-700">
                    {u.title}
                  </h2>
                  <p className="text-gray-700 italic mb-2">{u.author}</p>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      u.status === "Hadir"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.status}
                  </span>

                  <p className="text-xs text-gray-500 mt-2">
                    🕒 {formatDate(u.createdAt)}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
