'use client'
import Link from "next/link"
import {auth} from "@/lib//firebase"
import {signInWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react"
import {useRouter} from "next/navigation"

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const userCredential=await signInWithEmailAndPassword(auth,email,password);
            alert("ログインが完了しました！");
        }catch(err){
            alert(err);
        }
    }
    return(
        <div className="flex flex-col items-center">
            <div className="text-2xl">
                <p>ログイン</p>
            </div>
            <form className="flex flex-col" onSubmit={handleLogin}>
                <input 
                type="email" 
                value={email} 
                placeholder="メールアドレス" 
                onChange={(e)=>setEmail(e.target.value)}/>
                <input 
                type="password" 
                value={password} 
                placeholder="パスワード" 
                onChange={(e)=>setPassword(e.target.value)}/> 
                <button type="submit">ログイン</button>
            </form>
            <div>
                <Link href="../register"><p>新規登録</p></Link>
            </div>
        </div>
    )
} 