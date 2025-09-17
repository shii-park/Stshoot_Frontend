type Props={
    open:boolean;
    onClick:()=>void;
}
export default function menuButton({open,onClick}:Props){

    return (

        <div>
            <button
            onClick={onClick}>
                <img className="animate-rotate-in-2-ccw" src="menuIcon.svg"/>
            </button>
        </div>
    )
}