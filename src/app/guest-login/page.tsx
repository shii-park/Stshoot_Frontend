'use client'
import { signInAnonymously,updateProfile } from "firebase/auth";
import {auth} from "@/lib/firebase"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function GuestLogin(){
    const[userName,setUserName]=useState("")
    const router=useRouter()
    const handleGuestLogin=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const userCredential=await signInAnonymously(auth);
            const user=userCredential.user
            await updateProfile(user,{
                displayName:userName
            })
            alert(`${user.displayName}さん、ゲストログインが完了しました！`);
            router.push("/");
        }catch(error){
            alert(error);
        }
    }
    return (
        <div className="flex flex-col items-center space-y-4 mb-10">
                <form onSubmit={(e)=>handleGuestLogin(e)} className="flex flex-col items-center mt-100">
                    <input 
                    type="text" 
                    placeholder="名前を入力" 
                    value={userName} 
                    onChange={(e)=>setUserName(e.target.value)} 
                    className="mb-5 text-3xl text-center border-2 rounded-2xl w-80 h-25" />
                    <button type="submit" className="bg-zinc-700 hover:bg-stone-400 text-white text-2xl rounded-2xl w-80 h-25">ゲストログイン</button>
                </form>
        </div>
    )
}