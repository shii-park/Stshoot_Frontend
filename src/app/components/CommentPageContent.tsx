"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CommentForm from "@/app/components/CommentForm";
import CommentList, { type CommentItem } from "@/app/components/CommentList";
import { useAuth } from '@/hooks/useAuth';
import SuperChatModal from "@/app/components/SuperChatModal";

export default function CommentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading } = useAuth();
    const listRef = useRef<HTMLDivElement | null>(null);
    const roomId = searchParams.get("roomId");
    const [comments, setComments] = useState<CommentItem[]>([]);
    const wsRef = useRef<WebSocket | null>(null);
    const [isSuperChatModalOpen, setIsSuperChatModalOpen] = useState(false);

    useEffect(() => {
        if (roomId) {
            if (wsRef.current) {
                wsRef.current.close();
            }
            const ws = new WebSocket(`wss://stshoot-backend.onrender.com/ws/sender/${roomId}`);
            wsRef.current = ws;

            const handleOpen = () => {
                console.log("connected!");
            };
            const handleClose = () => {
                console.log("closed");
                alert("配信が終了しました。\nトップページへ戻ります");
                router.push("/")
            };
            const handleError = (event: Event) => {
                console.log(`error!*${event}`);
                ws.close();
                alert("エラーが発生しました。部屋番号を確認してください。\nトップページへ戻ります。");
                router.push("/");
            };
            const handleMessage = (event: MessageEvent) => {
                const receivedComment: CommentItem = JSON.parse(event.data);
                setComments((prevComments) => [...prevComments, receivedComment]);
            };

            ws.addEventListener("open", handleOpen);
            ws.addEventListener("close", handleClose);
            ws.addEventListener("error", handleError);
            ws.addEventListener("message", handleMessage);

            return () => {
                ws.removeEventListener("open", handleOpen);
                ws.removeEventListener("close", handleClose);
                ws.removeEventListener("error", handleError);
                ws.removeEventListener("message", handleMessage);
                if (ws.readyState === ws.OPEN) {
                    ws.close();
                }
            };
        } else {
            alert("キャンセルしました");
            //router.push("/");
        }
    }, [roomId]);

    if (loading || !user) {
        return <div className='p-4 text-center text-gray-500'>認証中...</div>;
    }

    if (!user) {
        return <div>ユーザー情報が取得できませんでした。</div>;
    }

    const handleCommentSend = (comment: CommentItem) => {
        setComments((prevComments) => [...prevComments, comment]);
    };

    const handleSuperChatSend = (price: number, message: string) => {
        if (!user.displayName || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            return;
        }
        const superChatComment = {
            username: user.displayName,
            text: message,
            price,
        };
        wsRef.current.send(JSON.stringify(superChatComment));
        
        // ローカルのコメントリストに即時反映
        handleCommentSend({
            id: 'superchat-' + Date.now(),
            userId: user.uid,
            text: message,
            createdAt: new Date().toISOString(),
            price,
            username: user.displayName,
        });
        setIsSuperChatModalOpen(false); // 送信後にモーダルを閉じる
    };

    const displayId = user.displayName || "ゲスト";

    const mainContainerClasses = `h-screen flex flex-col ${isSuperChatModalOpen ? 'blur-sm' : ''}`;

    return (
        <div className="relative h-screen flex flex-col">
            <div className={mainContainerClasses}>
                <div className="fixed top-20 left-0 w-full z-10 bg-white/80 backdrop-blur dark:bg-zinc-900">
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
                    <div className="text-lg mt-4 flex h-60 w-full items-center justify-center rounded bg-gray-200 dark:bg-black">thumbnail</div>
                </div>
                <div ref={listRef} className="flex-1 mt-30 overflow-y-auto px-3 pt-[260px] pb-[100px]">
                    <CommentList comments={comments} />
                </div>
                <div className="fixed bottom-0 left-0 w-full z-10">
                    <CommentForm
                        userId={displayId as string}
                        onSend={handleCommentSend}
                        socket={wsRef.current}
                        onSuperChatModalOpen={setIsSuperChatModalOpen}
                    />
                </div>
            </div>
            {isSuperChatModalOpen && (
                <SuperChatModal
                    onSuperChat={handleSuperChatSend}
                    onModalClose={() => setIsSuperChatModalOpen(false)}
                />
            )}
        </div>
    );
}