"use client";
import { useCallback, useEffect, useState } from "react";

type CommentFormProps = {
  userId: string;
  className?: string;
  onSend?: (payload: { id: string; userId: string; text: string; createdAt: string }) => void;
};

type StoredComment = {
  id: string;
  userId: string;
  text: string;
  createdAt: string; // ISO string
};

const STORAGE_KEY = "comments";

function readStoredComments(): StoredComment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredComment[]) : [];
  } catch {
    return [];
  }
}

function writeStoredComments(comments: StoredComment[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch {
    // no-op
  }
}

export default function CommentForm({ userId, className, onSend }: CommentFormProps) {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    setIsSending(true);

    const record: StoredComment = {
      id: crypto.randomUUID(),
      userId,
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    const current = readStoredComments();
    const next = [...current, record];
    writeStoredComments(next);

    onSend?.(record);
    setText("");
    setIsSending(false);
  }, [text, userId, isSending, onSend]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // localStorage の初期化（存在しない場合）
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) writeStoredComments([]);
  }, []);

  return (
    <div className={`px-3 py-3 border-t bg-white/80 backdrop-blur ${className ?? ""}`}>
      <div className="mx-auto flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="チャット"
          className="flex-1 rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="チャット入力"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isSending}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
          aria-label="送信"
          title="送信"
        >
          ↩
        </button>
        <button
          type="button"
          onClick={() => { /* 仮置き: スーパーチャット送信 */ }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-yellow-900 hover:bg-yellow-400"
          aria-label="スーパーチャット"
          title="スーパーチャット（仮）"
        >
          ¥
        </button>
      </div>
    </div>
  );
}


