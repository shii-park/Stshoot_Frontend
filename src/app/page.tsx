'use client'
import Image from "next/image";
import Link from "next/link"
import ToButton from "./toButton"
import { useEffect,useState } from "react";
//import {Uid} from "@/lib/firebase"
import {onAuthStateChanged, User} from "firebase/auth"
import { auth } from "@/lib/firebase";

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
    })
    return()=>unsubscribe()
  })
  return (
      <div className="min-h-screen flex flex-col items-center">
        <div className="mt-10">
          <p>こんにちは、<span className="text-cyan-500">{user?.email || "ゲスト"}</span>さん</p>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center">
          <ToButton />
        </div>
      </div>
  );
}
