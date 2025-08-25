import React, { useState } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import BookDataService from "../../../../services/book-services";

export default function AddBooks({ id, setBookId, onNewComment }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ error: false, msg: "" });

    if (title.trim() === "" || author.trim() === "") {
      setMessage({ error: true, msg: "Semua field wajib diisi!" });
      return;
    }

    const newBook = {
      title,
      author,
      status,
    };

    try {
      if (id) {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "Berhasil mengirimkan ucapan!" });
      }

      if (onNewComment) onNewComment();

      // Reset form
      setTitle("");
      setAuthor("");
      setStatus("Hadir");
    } catch (err) {
      console.error("Error tambah book:", err);
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <>
      <div className="containers">
        <div className="containers mt-4">
          <div className="card-bodys">
            <div className="ucapan text-center">
              {/* <h1 className="fw-bold">Ucapkan Sesuatu</h1> */}
              <h1 className="">Berikan Ucapan & Doa Restu</h1>
            </div>

            {message?.msg && (
              <Alert
                variant={message?.error ? "danger" : "success"}
                dismissible
                onClose={() => setMessage("")}
              >
                {message?.msg}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 mt-3">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Nama anda..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ucapkan Selamat..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    label="Hadir"
                    name="status"
                    id="hadir"
                    checked={status === "Hadir"}
                    onChange={() => setStatus("Hadir")}
                  />
                  <Form.Check
                    type="radio"
                    label="Tidak Hadir"
                    name="status"
                    id="tidak-hadir"
                    checked={status === "Tidak Hadir"}
                    onChange={() => setStatus("Tidak Hadir")}
                  />
                </div>
              </Form.Group>

              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-kirim-undangan"
                >
                  Kirim Ucapan
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
