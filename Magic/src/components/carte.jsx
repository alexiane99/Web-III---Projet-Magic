import background from "../assets/img/Cocona.jpg"

export default function Carte({children}) {

    return <div className="carte" style={{

        backgroundImage : `URL(${background})`, 
        margin: "2vw",
        border:"2px solid white",
        backgroundSize:"cover", 
        borderRadius:"10px",
        fontFamily:"BBH Sans Bartle",
        textAlign: "center",
        minHeight: "300px",
        width: "200px",

        
    }}>
     {children}
    </div>
}