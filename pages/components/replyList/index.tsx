"use client";
import React, { useEffect, useState } from "react";
import BookDataService from "../../../services/book-services";
import toast from "react-hot-toast";

type Reply = {
  id: string;
  text: string;
  sender?: string;
  createdAt?: any;
};

export default function ReplyList({
  bookId,
  isAdmin = false,
}: {
  bookId: string;
  isAdmin?: boolean;
}) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [sender, setSender] = useState(""); // ⬅️ awal kosong

  useEffect(() => {
    if (!bookId) return;
    const unsubscribe = BookDataService.getRepliesRealtime(
      bookId,
      (snapshot: any) => {
        const list: Reply[] = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReplies(list);
      }
    );
    return () => unsubscribe();
  }, [bookId]);

  const handleAddReply = async () => {
    if (!text) {
      toast.error("Balasan tidak boleh kosong");
      return;
    }
    if (!sender) {
      toast.error("Pilih mempelai dulu (Trias atau Zulfa) ");
      return;
    }

    try {
      if (editId) {
        await BookDataService.updateReply(bookId, editId, { text, sender });
        toast.success("Balasan berhasil diupdate ✏️");
        setEditId(null);
      } else {
        await BookDataService.addReply(bookId, { text, sender });
        toast.success("Balasan berhasil ditambahkan ✅");
      }
      setText("");
      setSender(""); // reset dropdown
    } catch (err) {
      toast.error("Terjadi kesalahan ❌");
      console.error(err);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!confirm("Yakin mau hapus balasan ini?")) return;
    try {
      await BookDataService.deleteReply(bookId, replyId);
      toast.success("Balasan berhasil dihapus 🗑️");
    } catch (err) {
      toast.error("Gagal menghapus balasan ❌");
      console.error(err);
    }
  };

  const handleEditReply = (reply: Reply) => {
    setEditId(reply.id);
    setText(reply.text);
    setSender(reply.sender || ""); // ikutkan sender pas edit
  };

  return (
    <div className="mt-3 p-3 border rounded bg-gray-50">
      {/* List Balasan */}
      <div className="space-y-2 mb-3">
        {replies.length > 0 &&
          replies.map((r) => (
            <div
              key={r.id}
              className="p-2 bg-white border rounded text-sm text-gray-700 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-purple-600">
                  💬 Balasan dari {r.sender}
                </p>
                <p>{r.text}</p>
              </div>

              {isAdmin && (
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => handleEditReply(r)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReply(r.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Form input hanya admin */}
      {isAdmin && (
        <div className="flex gap-2">
          <select
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">-- Pilih Mempelai --</option>
            <option value="Trias ">Trias </option>
            <option value="Zulfa ">Zulfa </option>
          </select>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border px-2 py-1 rounded"
            placeholder="Tulis balasan..."
          />
          <button
            onClick={handleAddReply}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            {editId ? "Update" : "Kirim"}
          </button>
        </div>
      )}
    </div>
  );
}
