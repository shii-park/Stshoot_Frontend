type Props={
    open:boolean;
    onClick:()=>void;
}
export default function menuButton({open,onClick}:Props){

    return (

        <div>
            <button
            onClick={onClick}>
                <img src="menuIcon.svg"/>
            </button>
        </div>
    )
}