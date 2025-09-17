import Link from "next/link"
import {useState} from "react"
import {useRouter} from "next/navigation";
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
                <button className="bg-red-500 hover:bg-red-400 text-white rounded-2xl px-20 py-10" onClick={popUp}>コメントを投稿する！</button>
                <Link href="./ranking"><button className="bg-yellow-300 hover:bg-yellow-200 text-white rounded-xl px-4 py-2">ランキングを見る</button></Link>
        </div>
    )
}
