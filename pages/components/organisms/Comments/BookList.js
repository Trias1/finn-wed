import React, { useEffect, useState } from "react";
import { FaRegUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import BookDataService from "../../../../services/book-services";
import { Pagination } from "react-bootstrap";

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

      console.log("Books fetched:", fetchedBooks); // Pastikan urutannya benar
      setBooks(fetchedBooks); // Langsung set, karena sudah terurut dari Firestore
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
            <div key={doc.id} className="list-ucapan">
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
            </div>
          ))}
        </div>

        <Pagination className="mt-3 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1} className="pags"
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item 
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)} className="pags"
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages} className="pags"
          />
        </Pagination>
      </div>
    </div>
  );
};

export default BooksList;
