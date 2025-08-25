"use client";
import React, { useEffect, useState } from "react";
import BookDataService from "../../../services/book-services";

type Reply = {
  id: string;
  text: string;
};

export default function ReplyList({
  bookId,
  isAdmin = false,   // ⬅️ defaultnya false
}: {
  bookId: string;
  isAdmin?: boolean;
}) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [text, setText] = useState("");

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
    if (!text) return;
    await BookDataService.addReply(bookId, { text });
    setText("");
  };

  return (
    <div className="mt-3 p-3 border rounded bg-gray-50">
      <h6 className="font-semibold mb-2">💬 Balasan Admin</h6>

      <div className="space-y-2 mb-3">
        {replies.length > 0 ? (
          replies.map((r) => (
            <div
              key={r.id}
              className="p-2 bg-white border rounded text-sm text-gray-700"
            >
              {r.text}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">Belum ada balasan...</p>
        )}
      </div>
    </div>
  );
}
