'use client'
import {useState} from "react"
import MenuButton from "./menuButton"
import Navigation from "./navigation"
export default function Header(){
    const [open,setOpen]=useState(false);
    function handleClick(){
        setOpen(function(prev){
            return !prev;
        });
    };

    return (
        <div className="flex box-border h-20 bg-white border-b-2">
              <div className="mt-5 ml-5 text-2xl md:ml-10 md:text-lg lg:ml-10 lg:text-5xl"> {/*クラスは修正予定*/}
                <h1>StShoot</h1>
              </div>
              <div className="ml-auto">
                <MenuButton 
                open={open}
                onClick={handleClick}
                />
                <Navigation open={open} />
              </div>
            </div>
    )
}