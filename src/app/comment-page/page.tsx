"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import CommentForm from "@/app/components/CommentForm";
import CommentList, { type CommentItem } from "@/app/components/CommentList";
import { useAuth } from '@/hooks/useAuth';


export default function CommentPage() {
  const router=useRouter();
  const searchParams=useSearchParams();
  const {user, loading } = useAuth();
  const listRef = useRef<HTMLDivElement | null>(null);
  const roomId=searchParams.get("roomId");
  const [socket, setSocket]=useState<WebSocket | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  
  useEffect(()=>{
    if(roomId){ //roomIdがあればソケット通信開始
      if (wsRef.current) {
        wsRef.current.close();
      }
      const ws =new WebSocket(`wss://stshoot-backend.onrender.com/ws/sender/${roomId}`);
      wsRef.current = ws;
      
      ws.addEventListener("open", () => {
        console.log("WebSocket接続しました")
      });
      ws.addEventListener("close", () => {
        console.log("WebSocket接続が切れました")
      });
      ws.addEventListener("error", (event) => {
        console.log("WebSocketエラー: ", event)
      });
      ws.addEventListener("message", (event) => {
        const receivedComment: CommentItem = JSON.parse(event.data);
        setComments((prevComments) => [...prevComments, receivedComment]);
      });

      setSocket(ws);
      return () => {
        ws.close();
      };
    } else {
      alert("キャンセルしました");
      router.push("/");
    }
  }, [roomId, router]);

  if (loading || !user) {
    return <div className='p-4 text-center text-gray-500'>認証中...</div>
  }

  // 認証が完了し、userが存在しない場合に備える
  if (!user) {
    return <div>ユーザー情報が取得できませんでした。</div>;
  }

  const handleCommentSend = (comment: CommentItem) => {
    // 送信されたコメントとユーザーIDをアラートで表示
    alert(`ユーザーID: ${comment.userId}\nコメント: ${comment.text}`);
  };

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
      userId={user.uid}
      onSend={handleCommentSend}
      socket={socket}
    />
  </div>;
}