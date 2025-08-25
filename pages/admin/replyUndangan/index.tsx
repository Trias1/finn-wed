"use client";
import React, { useEffect, useState } from "react";
import BookDataService from "../../../services/book-services";
import ReplyList from "../../components/replyList";
import AdminLayout from "../../components/admin/sidebar/AdminLayout"; // ⬅️ Admin layout

type Book = {
  id: string;
  title: string;
  author: string;
  status: string;
  createdAt?: any;
};

export default function ReplyUndangan() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const unsub = BookDataService.getAllBooksRealtime((snapshot: any) => {
      const list: Book[] = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...(doc.data() as Omit<Book, "id">),
      }));
      setBooks(list);
    });
    return () => unsub();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 ">
        <h1 className="text-2xl font-bold mb-6">💬 Balas Ucapan Tamu</h1>

        {books.map((b) => (
          <div key={b.id} className="border rounded p-4 mb-4 bg-white">
            <h2 className="font-semibold text-gray-700">{b.title}</h2>
            <p className="text-gray-700">{b.author}</p>
            <p className="text-sm text-gray-500">Status: {b.status}</p>

            {/* ✅ Admin bisa nambah balasan */}
            <ReplyList bookId={b.id} isAdmin />
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
