"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CommentForm from "@/app/components/CommentForm";
import CommentList, { type CommentItem } from "@/app/components/CommentList";

export default function CommentPage() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [comments.length]);

  return <div className="min-h-dvh flex flex-col">
    <div className="flex items-center gap-3 pt-2.5">
      <Link href="/" aria-label="戻る" className="rounded-full p-2 hover:bg-gray-100">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-gray-600">
          <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </Link>
      <div className="h-10 w-10 rounded-full bg-gray-300" />
      <div className="flex flex-col leading-tight">
        <span className="text-base font-medium">配信者名</span>
        <span className="text-sm text-gray-500">@haisinnname</span>
      </div>
    </div>
    <div className="text-lg mt-4 flex h-60 w-full items-center justify-center rounded bg-gray-200">thumbnail</div>

    <div ref={listRef} className="flex-1 overflow-y-auto px-3 mt-3">
      <CommentList comments={comments} />
    </div>

    <CommentForm
      userId="@me"
      onSend={(c) => setComments((prev) => [...prev, c])}
    />
  </div>;
}