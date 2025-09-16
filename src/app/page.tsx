import Image from "next/image";
import Link from "next/link"
import MenuButton from "./menuButton"


export default function Home() {
  return (
      <div className="flex justify-center">
        <Link href="./test"><p>こんにちは</p></Link>
      </div>
  );
}
