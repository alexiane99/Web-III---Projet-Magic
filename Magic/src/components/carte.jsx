// import playcard from "../assets/img/Cocona.jpg"
// import boardcard from "../assets/img/Taeyang.jpg"; 
// import handcard from "../assets/img/G-Dragon.jpg";

import {liste_cards} from "../assets/liste_images.js"; 

export default function Carte({minHeight="300px", width="200px", children, cardUid, cardHp, cardAtk, cardCost, cardMechanics, onClick, color}) {

    let background1 = liste_cards[0].path;
    let background2 = liste_cards[1].path;
    let background3 = liste_cards[2].path;

    let background = background1; 

    if (color == null) {

        color = "white"
    }
    
    if(cardUid % 2 == 0) {

        background = background2
    }
    if(cardUid % 3 == 0) {
        background = background3
    }

    return <div className="carte" onClick={onClick} style={{
        backgroundImage : `url(${background})`, //`url(${background})`, 
        margin: "1vw",
        display:"flex", 
        flexDirection:"column-reverse",
        border: `3px solid ${color}`,
        backgroundSize:"cover", 
        borderRadius:"10px",
        fontFamily:"BBH Sans Bartle",
        textAlign: "left",
        minHeight: minHeight,
        width: width,
        color:"white",
        // display:"flex",
        // justifyContent:"space-between",
        // alignItems:"end",
        // flexWrap:"wrap",
        // position:"relative",

    }}>
    <div className="infoCard" style={{
        fontSize:"0.5rem",
        borderEndStartRadius:"10px",
        borderEndEndRadius:"10px",
        paddingTop:"10px",
        paddingLeft:"10px",
        paddingRight:"10px",
        alignItems:"end",
        backgroundColor:"black", 
        maxHeight:"20%",
     }}>
        <div style={{
            border:"solid 1px cyan",
            display:"flex",
            justifyContent:"space-around", 
            textAlign:"center",
        }}>
            <p>Uid: {cardUid}</p>
            <p>Hp: {cardHp}</p>
            <p>Atk: {cardAtk}</p>
            <p>Cost: {cardCost}</p>
        </div>
        <p style={{
            border:"solid 1px #ff1493",
            padding:"1px",
            textAlign:"center",
        }}> 
        Mechanics: 
        <p style={{color:"yellow"}}>{cardMechanics}</p>
        </p>
    </div>
     {children}
    </div>
}