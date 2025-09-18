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
        
        handleCommentSend({
            id: 'superchat-' + Date.now(),
            userId: user.uid,
            text: message,
            createdAt: new Date().toISOString(),
            price,
            username: user.displayName,
        });
        setIsSuperChatModalOpen(false);
    };

    const displayId = user.displayName || "ゲスト";

    const mainContainerClasses = `flex flex-col h-screen ${isSuperChatModalOpen ? 'blur-sm' : ''}`;

    return (
        <div className="relative h-screen flex flex-col">
            <div className={mainContainerClasses}>
                {/* 修正箇所: ヘッダーと動画をまとめたコンテナ。fixedを削除し、z-10は維持 */}
                <div className="w-full z-10 bg-white/80 backdrop-blur dark:bg-zinc-900">
                    <div className="flex items-center gap-3 pt-2.5 px-3">
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
                    <div className="w-full max-w-2xl mx-auto mt-8">
                      <div className="relative" style={{ paddingTop: "56.25%" }}>
                        <iframe
                          src="https://player-api.p.uliza.jp/v1/players/autoplay/tsg/admin?type=normal&name=content-2025-09-18-12-32-06-280-f6dd73cc&repeatable=true&format=iframe&plusScript=false&customOption=%7B%22fullscreenType%22%3A%22native%22%2C%22videoAnalytics%22%3A%7B%22userId%22%3A%22%5BGAUSERID%5D%22%7D%7D"
                          className="absolute top-0 left-0 w-full h-full"
                          style={{ border: "none" }}
                          allowFullScreen
                        />
                      </div>
                    </div>
                </div>
                {/* 修正箇所: flex-1で残りの高さを埋め、オーバーフローでスクロール可能にする */}
                <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3">
                    <CommentList comments={comments} />
                </div>
                {/* コメントフォームはfixedを維持 */}
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
