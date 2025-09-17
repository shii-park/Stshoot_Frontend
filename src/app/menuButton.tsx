import Link from "next/link"
export default function MenuButton(){

    return (

        <div className="bg-zinc-700 text-white rounded-2xl px-5 py-3 mt-3 mr-2">
            <Link href="./login"><button>ログイン</button></Link>
        </div>
    )
}