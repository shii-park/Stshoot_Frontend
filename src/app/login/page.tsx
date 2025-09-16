import Link from "next/link"
export default function Login(){
    return(
        <div className="flex flex-col items-center">
            <div className="text-2xl">
                <p>ログイン</p>
            </div>
            <form className="flex flex-col">
                <input type="email" placeholder="メールアドレス"/>
                <input type="password" placeholder="パスワード"/> 
                <button type="submit">ログイン</button>
            </form>
            <div>
                <Link href="../register"><p>新規登録</p></Link>
            </div>
        </div>
    )
}