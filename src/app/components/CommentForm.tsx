"use client";

import React, { useCallback, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { type CommentItem } from "@/app/components/CommentList";

interface CommentFormProps {
    userId: string;
    onSend: (comment: CommentItem) => void;
}


const CommentForm = ({ userId, onSend }: CommentFormProps) => {
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSend = useCallback(async () => {
        const trimmed = text.trim();
        if (!trimmed || isSending || !userId) return;

        setIsSending(true);

        try {
            console.log("Firestoreへの書き込みを開始します...");
            await addDoc(collection(db, "comments"), {
                userId: userId,
                text: trimmed,
                createAt: serverTimestamp(),
            });
            console.log("Firestoreへの書き込みが成功しました。");

            const newComment: CommentItem = {
                id: 'temp-id-' + Date.now(),
                userId: userId,
                text: trimmed,
                createdAt: new Date().toISOString(),
            }
            setText("");
            onSend(newComment);;
        } catch (error) {
            console.error("コメントの送信エラー", error);
        } finally {
            setIsSending(false);
        }
    }, [text, isSending, userId, onSend]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="px-3 py-3 border-t bg-white/80 backdrop-blur">
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
                    disabled={isSending || !userId}
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
};

export default CommentForm;