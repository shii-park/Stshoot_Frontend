"use client";
import React, { useEffect, useState } from "react";


export type CommentItem = {
  id: string;
  userId: string;
  displayId: string,
  text: string;
  createdAt: string; // FirestoreのTimestamp型を考慮
};

type CommentListProps = {
  className?: string;
  comments: CommentItem[];
};


export default function CommentList({ className, comments }: CommentListProps) {
  return (
    <div className={`divide-y ${className ?? ""}`}>
      {comments.map((c) => (
        <div key={c.id} className="flex items-start gap-3 py-3">
          <div className="h-6 w-6 rounded bg-gray-300" />
          <div className="min-w-0">
            <div className="text-xs text-gray-500">{c.userId}</div>
            <div className="text-sm break-words">{c.text}</div>
          </div>
        </div>
      ))}
      {comments.length === 0 && (
        <div className="py-8 text-center text-sm text-gray-500">まだコメントはありません</div>
      )}
    </div>
  );
}