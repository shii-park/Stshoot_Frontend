'use client'
import Link from "next/link"
import {auth} from "@/lib//firebase"
import {signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import React, {useState} from "react"
import { useRouter } from "next/navigation";

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter()

    const handleLogin=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const userCredential=await signInWithEmailAndPassword(auth,email,password);
            const user=userCredential.user;
            await updateProfile(user,{
                displayName:user.email
            });
            alert(`${user.displayName}さん、おかえりなさい！`);
            router.push("/");
        }catch(err){
            alert(err);
        }
    }
    return(
        <div className="flex flex-col items-center">
            <div className="text-xl mt-20">
                <p>ログインして配信に参加しよう！</p>
            </div>
            <form className="flex flex-col items-center" onSubmit={handleLogin}>
                <input 
                type="email" 
                value={email} 
                placeholder="ユーザ名" 
                className=" border-2 text-xl text-center rounded-full mt-40 w-4/5 h-15"
                onChange={(e)=>setEmail(e.target.value)}/>
                <input 
                type="password" 
                value={password} 
                placeholder="パスワード" 
                className="border-2 text-xl text-center rounded-full mt-5 w-4/5 h-15"
                onChange={(e)=>setPassword(e.target.value)}/> 
                <button type="submit" className="bg-zinc-700 hover:bg-stone-400 text-white text-2xl rounded-full w-80 h-25 mt-10">ログイン</button>
            </form>
            <div>
                <Link href="../register">
                <button className="flex flex-col border-2 text-center items-center justify-center text-2xl rounded-full w-80 h-25 mt-5">新規登録</button>
                </Link>
                <Link href="../guest-login">
                <button className="bg-zinc-300 flex flex-col text-center items-center justify-center text-xl rounded-full w-80 h-15 mt-5 mb-10 dark:bg-zinc-900 ">ゲストログイン</button>
                </Link>
            </div>
        </div>
    )
} 