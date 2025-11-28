// import playcard from "../assets/img/Cocona.jpg"
// import boardcard from "../assets/img/Taeyang.jpg"; 
// import handcard from "../assets/img/G-Dragon.jpg";

import {liste_cards} from "../data/liste_card" 

export default function Carte({minHeight, width, children, cardUid, cardHp, cardAtk, cardCost, cardMechanics, onClick, color, textSize, infoDim}) {

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

    return <div className="carte" onClick={onClick} style={{ // className="carte" 
        backgroundImage : `url(${background})`, //`url(${background})`, 
        margin: "1vw",
        display:"flex", 
        flexDirection:"column-reverse",
        border: `4px solid ${color}`,
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
        fontSize: textSize,
        borderEndStartRadius:"10px",
        borderEndEndRadius:"10px",
        padding:"5px",
        alignItems:"end",
        backgroundColor:"black", 
        height:infoDim,
        position:"relative"
     }}>
        <div style={{
            border:"solid 1px cyan",
            display:"flex",
            justifyContent:"space-around", 
            textAlign:"center",
            padding:"2px",
        }}>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
                <div>Uid:</div>
                <div>{cardUid}</div>
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div>Hp:</div>
                <div>{cardHp}</div>
             </div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div>Atk:</div>
                <div>{cardAtk}</div>
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div>Cost:</div>
                <div>{cardCost}</div>
            </div>
        </div>
        <div style={{
            border:"solid 1px #ff1493",
            textAlign:"center",
            margin:"5px",
        }}> 
        <p>Mechanics:</p>
        <p style={{color:"yellow"}}>{cardMechanics}</p>
        </div>
    </div>
     {children}
    </div>
}