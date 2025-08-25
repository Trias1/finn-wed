"use client";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import BookDataService from "../../../../services/book-services";
import { Pagination } from "react-bootstrap";
import ReplyList from "../../../components/replyList"; // ⬅️ Import komponen reply

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const unsubscribe = BookDataService.getAllBooksRealtime((snapshot) => {
      const fetchedBooks = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(fetchedBooks);
    });

    return () => unsubscribe();
  }, []);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Ambil data sesuai halaman
  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="containers mt-4" id="submitss">
      <div className="card-bodys">
        <div className="mt-3">
          {paginatedBooks.map((doc) => (
            <div
              key={doc.id}
              className="list-ucapan mb-4 p-3 border rounded bg-white shadow-sm"
            >
              {/* 📝 Ucapan Tamu */}
              <div className="d-flex align-items-center">
                <FaRegUserCircle className="fs-2 me-2 text-primary" />
                <div className="ms-2">
                  <h5 className="mb-1 d-flex align-items-center">
                    {doc.title}
                    {doc.status === "Hadir" ? (
                      <FaCheckCircle
                        className="text-success ms-2"
                        title="Hadir"
                      />
                    ) : (
                      <FaTimesCircle
                        className="text-danger ms-2"
                        title="Tidak Hadir"
                      />
                    )}
                    <small className="text-muted ms-2">{doc.status}</small>
                  </h5>
                </div>
              </div>
              <p className="mt-2">{doc.author}</p>

              {/* ✅ Balasan Admin tampil (tanpa form input di user) */}
              <div className="mt-3 ps-4 border-start border-gray-300">
                <ReplyList bookId={doc.id} isAdmin={false} />
              </div>
            </div>
          ))}
        </div>

        {/* 🔄 Pagination */}
        <Pagination className="mt-3 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pags"
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
              className="pags"
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pags"
          />
        </Pagination>
      </div>
    </div>
  );
};

export default BooksList;
