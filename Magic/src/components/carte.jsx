import playcard from "../assets/img/Cocona.jpg"
import boardcard from "../assets/img/Taeyang.jpg"; 
import handcard from "../assets/img/G-Dragon.jpg";

export default function Carte({minHeight="300px", width="200px", children, cardUId, onClick}) {

    let background = playcard
    
    if(cardUId % 2 == 0) {

        background = boardcard;
    }
    if(cardUId % 3 == 0) {
        background = handcard
    }

    return <div className="carte" onClick={onClick} style={{

        backgroundImage : `url(${background})`, //`url(${background})`, 
        margin: "1vw",
        border:"2px solid white",
        backgroundSize:"cover", 
        borderRadius:"10px",
        fontFamily:"BBH Sans Bartle",
        textAlign: "center",
        alignItems:"end",
        minHeight: minHeight,
        width: width,
        fontSize:"0.5rem",
        color:"white",
        // display:"flex",
        // justifyContent:"space-between",
        // alignItems:"end",
        // flexWrap:"wrap",
        // position:"relative",

    }}>
     {children}
    </div>
}