'use client'
import {useState,useEffect} from "react"
import { useRouter } from "next/navigation";
export default function Transition(){
    const [roomId,setRoomId]=useState<string|null>(null);
    const [socketStatus,setSocketStatus]=useState("お待ちください...")
    const router=useRouter();

    useEffect(()=>{
        const input=window.prompt("部屋番号を入力してください");
        setRoomId(input);
        
        if(input){
            const socket=new WebSocket(`wss://stshoot-backend.onrender.com/ws/sender/${input}`);
            socket.addEventListener("open", () => {
                setSocketStatus("接続しました");
            });
            socket.addEventListener("error", (e: Event) => {
                setSocketStatus(e.type);
            }); 
        }else{
            alert("キャンセルしました");
            router.push("/");
        }
    },[]);



    return (
        <div className="flex flex-col items-center">
            <h2>{socketStatus}</h2>
            <p>部屋番号:{roomId}</p>
        </div>
    )
}