import Link from "next/link"
import {signOut} from "firebase/auth"
import React from "react";
import {auth} from "@/lib/firebase"

type Props = {
  open: boolean;
};

export default function Navigation({ open}: Props) {
const handleSignOut=async(e:React.FormEvent)=>{
  try{
    await signOut(auth);
    alert("ログアウトしました");
  }catch(err){
    alert(err);
  }
}

  return (
    <nav
    className={`navigation${open ? "" : " hidden"}`}
    >
      <ul>
        <Link href="./login"><li>ログイン</li></Link>
        <li>works</li>
        <li>contact</li>
        <button onClick={handleSignOut}><li>ログアウト</li></button>
      </ul>
    </nav>
  );
}