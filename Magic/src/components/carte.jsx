import background from "../assets/img/Cocona.jpg"

export default function Carte({minHeight="300px", width="200px", children}) {

    return <div className="carte" style={{

        backgroundImage : `URL(${background})`, 
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