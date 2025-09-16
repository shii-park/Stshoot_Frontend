import Image from "next/image";
import Link from "next/link"
import ToButton from "./toButton"


export default function Home() {
  let userName:string="ゲスト"
  return (
      <div className="min-h-screen flex flex-col items-center">
        <div className="mt-10">
          <Link href="./test"><p>こんにちは、<span className="text-cyan-500">{userName}</span>さん</p></Link>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center">
          <ToButton />
        </div>
      </div>
  );
}
