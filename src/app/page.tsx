import Image from "next/image";
import MenuButton from "./menuButton"

export default function Home() {
  return (
    <div id="header">
      <div className="flex box-border h-20 bg-white border-b-2">
        <div className="mt-5 ml-5 text-lg md:ml-10 md:text-lg lg:ml-10 lg:text-5xl">
          <h1>StShoot</h1>
        </div>
        <div className="ml-auto">
          <MenuButton />
        </div>
      </div>
    </div>
  );
}
