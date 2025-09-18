'use client'
import {useState} from "react"
import Link from "next/link"
import MenuButton from "./menuButton"
export default function Header(){
    const [open,setOpen]=useState(false);
    function handleClick(){
        setOpen(function(prev){
            return !prev;
        });
    };

    return (
        <div className="fixed top-0 left-0 w-full flex box-border h-20 border-b-2 bg-white dark:bg-black">
              <div className="mt-5 ml-5 text-2xl md:ml-10 md:text-lg lg:ml-10 lg:text-5xl"> {/*クラスは修正予定*/}
                <Link href="/">
                  <h1>StShoot</h1>
                </Link>
              </div>
              <div className="ml-auto">
                <MenuButton />
              </div>
            </div>
    )
}