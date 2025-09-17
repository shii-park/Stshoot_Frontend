import Link from "next/link"
import React, {useState} from "react"
import {useRouter} from "next/navigation";
export default function toButton(){
    const [roomId,setRoomId]=useState<string>("");
    const router=useRouter();
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value.toUpperCase();
        setRoomId(value)
    }
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        if(roomId){
            router.push(`./comment-page?roomId=${roomId}`)
        }
    }
    return(
        <div className="flex flex-col items-center space-y-4 mb-10">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input 
                    type="text" 
                    placeholder="部屋番号を入力" 
                    value={roomId} 
                    onChange={(e)=>handleChange(e)} 
                    maxLength={6}
                    className="mb-5 text-3xl text-center border-2 rounded-2xl w-80 h-25" />
                    <button type="submit" className="bg-zinc-700 hover:bg-zinc-400 text-white text-2xl rounded-2xl w-80 h-25">コメントを投稿する！</button>
                </form>
        </div>
    )
}
