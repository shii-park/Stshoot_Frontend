import { getAuth, signInAnonymously } from "firebase/auth";
import {auth} from "@/lib/firebase"
export default function GuestLogin(){
    async function signIn(){
        try{
            const userCredential=await signInAnonymously(auth);
        }catch(error){
            alert(error);
        }
    }
    return (
        <div>
            <form>
                <input></input>
            </form>
        </div>
    )
}