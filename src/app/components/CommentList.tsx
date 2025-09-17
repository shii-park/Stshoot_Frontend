"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Firestoreデータベースインスタンスをインポート

export type CommentItem = {
  id: string;
  userId: string;
  text: string;
  createdAt: string; // FirestoreのTimestamp型を考慮
};

type CommentListProps = {
  className?: string;
};

export default function CommentList({ className }: CommentListProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    // commentsコレクションへの参照を作成し、クエリを定義
    const q = query(
      collection(db, "comments"),
      orderBy("createAt", "asc"), // タイムスタンプで昇順に並べ替え
      limit(50) // 最新50件のみを取得
    );

    // onSnapshotでリアルタイムリスナーを設定
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments: CommentItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedComments.push({
          id: doc.id,
          userId: data.userId,
          text: data.text,
          createdAt: data.createdAt?.toDate().toISOString() || "N/A", // TimestampをISO文字列に変換
        });
      });
      setComments(fetchedComments);
    });

    // コンポーネントがアンマウントされる際にリスナーを解除
    return () => unsubscribe();
  }, []); // 依存配列が空なので、コンポーネントの初回マウント時に一度だけ実行

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