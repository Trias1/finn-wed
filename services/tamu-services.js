import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc, // ⬅️ import deleteDoc
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import slugify from "slugify";

const tamuCollectionRef = collection(db, "tamu");

class TamuService {
  // Tambah tamu baru
  addTamu = (newTamu) => {
    return addDoc(tamuCollectionRef, {
      ...newTamu,
      name: newTamu.nama,
      description:
        newTamu.description ||
        "Kami dengan senang hati mengundang Anda untuk merayakan momen bahagia ini bersama kami.",
      slug: slugify(newTamu.nama, { lower: true }),
      createdAt: Timestamp.now(),
    });
  };

  // Update data tamu
  updateTamu = (id, updatedTamu) => {
    const tamuDoc = doc(db, "tamu", id);

    let dataToUpdate = {
      ...updatedTamu,
      updatedAt: Timestamp.now(),
    };

    // kalau ada perubahan nama, regenerasi slug
    if (updatedTamu.nama) {
      dataToUpdate.name = updatedTamu.nama;
      dataToUpdate.slug = slugify(updatedTamu.nama, { lower: true });
    }

    return updateDoc(tamuDoc, dataToUpdate);
  };

  // Delete data tamu
  deleteTamu = (id) => {
    const tamuDoc = doc(db, "tamu", id);
    return deleteDoc(tamuDoc);
  };

  // Ambil semua tamu secara realtime
  getAllTamuRealtime = (callback) => {
    const q = query(tamuCollectionRef, orderBy("createdAt", "desc"));
    return onSnapshot(q, callback);
  };
}

export default new TamuService();
