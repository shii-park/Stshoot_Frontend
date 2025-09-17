'use client'
import Link from "next/link"
import {useAuth} from "@/hooks/useAuth"
import {signOut} from "firebase/auth"
import {auth} from "@/lib/firebase"
export default function MenuButton(){
    const {user,loading}=useAuth();
    const handleSignOut=async()=>{
        try{
            await signOut(auth);
            alert("ログアウトしました。また会いましょう。");
        }catch(error){
            alert("ログアウトに失敗しました");
        }
    };

    console.log("User:", user, "Loading:", loading);

    if(loading){
        return(
            <div className="bg-zinc-700 text-white rounded-2xl px-5 py-3 mt-3 mr-2">
                <span>...</span>
            </div>
        );
    }
    if(user?.email){
        return(
            <div className=" border-2 rounded-2xl px-5 py-3 mt-3 mr-2">
                <button onClick={handleSignOut}>ログアウト</button>
            </div>
        );
    }

    return (

        <div className="bg-zinc-700 text-white rounded-2xl px-5 py-3 mt-3 mr-2">
            <Link href="./login"><button>ログイン</button></Link>
        </div>
    )
}