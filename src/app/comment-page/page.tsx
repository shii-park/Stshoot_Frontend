"use client";
//import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";

export default function commentPage() {
  return <div className="px-4 py-3">
    <div className="flex items-center gap-3">
      <Link href="/" aria-label="戻る" className="-ml-2 rounded-full p-2 hover:bg-gray-100">
          {/*<ArrowBackIos />*/}
          <img src="vercel.svg" />
      </Link>
      <div className="h-10 w-10 rounded-full bg-gray-300" />
      <div className="flex flex-col leading-tight">
        <span className="text-base font-medium">配信者名</span>
        <span className="text-sm text-gray-500">@haisinnname</span>
      </div>
    </div>
    <div className="text-lg mt-4 flex h-60 w-full items-center justify-center rounded bg-gray-200">thumbnail</div>
    
  </div>;
}