// className = "bouton", 
export default function Button({type = "button", onClick, text, children, style}) { 

    return  <button className="bouton" style={{
            fontFamily: "BBH Sans Bartle",
            padding : "0.5vw",
            margin : "2vw", }} 
            onClick={onClick} type={type} 
            >
                {text ?? children}
            </button>
}