import Link from "next/link"
export default function toButton(){
    return(
        <div className="flex flex-col items-center space-y-4 mb-10">
                <Link href="./transition"><button className="border-2 rounded">コメント投稿ページ</button></Link>
                <Link href="./ranking"><button className="border-2 rounded">ユーザランキングページ</button></Link>
        </div>
    )
}
