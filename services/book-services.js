import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const bookCollectionRef = collection(db, "wedd");

class BookDataService {
  // Tambahkan createdAt saat menambahkan data baru
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, {
      ...newBook,
      createdAt: Timestamp.now(), // Simpan waktu saat data dibuat
    });
  };
  // Update book
  updateBook(id, updatedBook) {
    const bookDoc = doc(db, "wedd", id);
    return updateDoc(bookDoc, updatedBook);
  }

  // Ambil semua book realtime
  getAllBooksRealtime(callback) {
    const q = query(bookCollectionRef, orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => callback(snapshot));
  }

  // Tambah reply ke subcollection "replies"
  addReply(bookId, reply) {
    if (!bookId) throw new Error("bookId tidak boleh kosong");
    const repliesRef = collection(db, "wedd", bookId, "replies");
    return addDoc(repliesRef, {
      ...reply,
      createdAt: Timestamp.now(),
    });
  }

  // Ambil semua reply realtime berdasarkan bookId
  getRepliesRealtime(bookId, callback) {
    if (!bookId) throw new Error("bookId tidak boleh kosong");
    const repliesRef = collection(db, "wedd", bookId, "replies");
    const q = query(repliesRef, orderBy("createdAt", "asc"));
    return onSnapshot(q, (snapshot) => callback(snapshot));
  }

  deleteReply(bookId, replyId) {
    const replyDoc = doc(db, "wedd", bookId, "replies", replyId);
    return deleteDoc(replyDoc);
  }

  updateReply(bookId, replyId, updatedReply) {
    const replyDoc = doc(db, "wedd", bookId, "replies", replyId);
    return updateDoc(replyDoc, updatedReply);
  }
}

export default new BookDataService();
