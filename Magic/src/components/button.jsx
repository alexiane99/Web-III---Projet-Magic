// className = "bouton", 
export default function Button({type = "button", onClick, text, children, style, color}) { 

    
    if (color == null) {

        color = "black"
    }

    return  <button className="bouton" style={{
            fontFamily: "BBH Sans Bartle",
            padding : "0.5vw",
            margin:"0.5vw",
            color: {color}, 
            marginRight : "1vw", }} 
            onClick={onClick} type={type} 
            >
                {text ?? children}
            </button>
}