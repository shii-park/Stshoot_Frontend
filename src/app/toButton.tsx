import Link from "next/link"
import {useState} from "react"
import { useRouter } from "next/navigation";
export default function toButton(){
    const [roomId,setRoomId]=useState<string|null>(null);
    const router=useRouter();
    function popUp(){
        const input=window.prompt("部屋番号を入力してください");
        setRoomId(input);
        if(input){
            router.push(`./comment-page?roomId=${input}`);
        }
    }
    return(
        <div className="flex flex-col items-center space-y-4 mb-10">
                <button className="border-2 rounded" onClick={popUp}>コメント投稿ページ</button>
                <Link href="./ranking"><button className="border-2 rounded">ユーザランキングページ</button></Link>
        </div>
    )
}
