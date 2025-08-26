"use client";
import React, { useEffect, useState } from "react";
import BookDataService from "../../../services/book-services";
import ReplyList from "../../components/replyList";
import AdminLayout from "../../components/admin/sidebar/AdminLayout";
import { Pagination } from "react-bootstrap";

type Book = {
  id: string;
  title: string;
  author: string;
  status: string;
  createdAt?: any;
};

export default function ReplyUndangan() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">💬 Balas Ucapan Tamu</h1>

        {paginatedBooks.map((b) => (
          <div key={b.id} className="border rounded p-4 mb-4 bg-white shadow">
            <h2 className="font-semibold text-gray-700">{b.title}</h2>
            <p className="text-gray-700">{b.author}</p>
            <p className="text-sm text-gray-500">Status: {b.status}</p>

            {/* ✅ Admin bisa nambah balasan */}
            <ReplyList bookId={b.id} isAdmin />
          </div>
        ))}

        {/* 🔄 Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    </AdminLayout>
  );
}
