import { db } from "./firebase-config";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore"; // Import Timestamp

const bookCollectionRef = collection(db, "wedd");

class BookDataService {
  // Tambahkan createdAt saat menambahkan data baru
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, {
      ...newBook,
      createdAt: Timestamp.now(), // Simpan waktu saat data dibuat
    });
  };

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "wedd", id);
    return updateDoc(bookDoc, updatedBook);
  };

  // Ambil data secara real-time dengan sorting berdasarkan createdAt
  getAllBooksRealtime = (callback) => {
    const q = query(bookCollectionRef, orderBy("createdAt", "desc"));
    return onSnapshot(q, callback);
  };
}

export default new BookDataService();
