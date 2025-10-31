import background from "../assets/img/Cocona.jpg"

export default function Carte({children}) {

    return <div style={{

        backgroundImage : `URL(${background})`, 
        margin: "3vw",
        backgroundSize:"cover", 
        borderRadius:"10px",
        fontFamily:"BBH Sans Bartle",
        textAlign: "center",
        minHeight: "400px",
        width: "300px",
        
    }}>
    {children}
    </div>
}