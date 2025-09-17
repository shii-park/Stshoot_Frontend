'use client'
import {auth} from "@/lib//firebase"
import {createUserWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react"
import {useRouter} from "next/navigation"

export default function Register(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter()

    const handleRegister=async(e:React.FormEvent)=>{
        e.preventDefault()
        try{
            const userCredential=await createUserWithEmailAndPassword(auth,email,password);
            const user=userCredential.user;
            alert(`${user.email}さん、よろしくお願いします！`)
            router.push("../login");
        }catch(err){
            alert(err);
        }
    };
    return (
        <div className="flex flex-col items-center">
            <div className="text-2xl">
                <p>新規登録</p>
            </div>
            <form className="flex flex-col" onSubmit={handleRegister}>
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
                <button type="submit">新規登録</button>
            </form>
        </div>
    )
}