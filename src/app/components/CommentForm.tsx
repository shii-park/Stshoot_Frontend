"use client";

import React, { useCallback, useState, useRef } from 'react';
import { type CommentItem } from "@/app/components/CommentList";

interface CommentFormProps {
    userId: string;
    onSend: (comment: CommentItem) => void;
    socket: WebSocket | null;
}


const CommentForm = ({ userId, onSend, socket }: CommentFormProps) => {
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const lastSentTime = useRef<number>(0); 

    const handleSend = useCallback(async () => {
        const trimmed = text.trim();
        if (!trimmed || isSending || !userId || !socket || socket.readyState !== WebSocket.OPEN || lastSentTime.current < 1000) {
            return;
        }

        setIsSending(true);

        try {
            const newComment = {
                username: userId,
                text: trimmed,
            };
            socket.send(JSON.stringify(newComment));

            onSend({
                id: 'temp-' + Date.now(),
                userId: userId,
                text: trimmed,
                createdAt: new Date().toISOString(),
            });

            setText("");
            lastSentTime.current = Date.now();

        } catch (error) {
            console.error("コメントの送信エラー", error);
        } finally {
            setIsSending(false);
        }
    }, [text, isSending, userId, onSend, socket]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }
        
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    const isButtonDisabled = isSending || !userId || !socket || socket.readyState !== WebSocket.OPEN || (Date.now() - lastSentTime.current < 1000);

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
                    disabled={isButtonDisabled}
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