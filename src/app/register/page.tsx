'use client'
import {auth} from "@/lib//firebase"
import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import React, {useState} from "react"
import {useRouter} from "next/navigation"

export default function Register(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("")
    const router=useRouter()

    const handleRegister=async(e:React.FormEvent)=>{
        e.preventDefault()
        try{
            const userCredential=await createUserWithEmailAndPassword(auth,email,password);
            const user=userCredential.user;
            await updateProfile(user,{
                displayName:name
            });
            alert(`${user.displayName}さん、よろしくお願いします！`)
            router.push("../login");
        }catch(err){
            alert(err);
        }
    };
    return (
        <div className="flex flex-col items-center mt-30">
            <div className="text-2xl">
                <p>新規登録</p>
            </div>
            <form className="flex flex-col items-center " onSubmit={handleRegister}>
                <input 
                type="string" 
                value={name} 
                placeholder="名前" 
                required
                className="border-2 text-lg text-center rounded-full mt-40 w-4/5 h-15"
                onChange={(e)=>setName(e.target.value)}/>
                <input 
                type="email" 
                value={email} 
                placeholder="メールアドレス" 
                className="border-2 text-lg text-center rounded-full mt-5 w-4/5 h-15"
                onChange={(e)=>setEmail(e.target.value)}/>
                <input 
                type="password" 
                value={password}
                placeholder="パスワード"
                className="border-2 text-lg text-center rounded-full mt-5 w-4/5 h-15"
                onChange={(e)=>setPassword(e.target.value)}/> 
                <button type="submit" className="bg-zinc-700 hover:bg-zinc-400 text-white text-2xl rounded-full w-70 h-20 mt-5">新規登録</button>
            </form>
        </div>
    )
}