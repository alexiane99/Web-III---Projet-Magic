import MainLayout from "../layouts/main-layout";
import background from "../assets/img/stage_wallpaper.jpg";

import Carte from "../components/carte";
import Profile from "../components/profile";
import {useEffect, useState, useRef} from "react"; 
import Button from "../components/button";

export default function Game({}) {

    let key = localStorage.getItem("key")
    console.log(key)
    let stateTimeout = useRef()
    let messageResponse = useRef()
    let response = ""

    // réception du deck
    const [cards, setCards] = useState([])

    // récupération de l'état de la partie 
    const [game_state, setGamestate] = useState({
        game_state : null,
    })

    const [selection, setSelected] = useState({

        type: null,
        uid: null,

    })

    const [message, setMessage] = useState(["Game On"])

    useEffect(() => {

        fetch("/api/Deck.php", {
            method:"POST"
        })
        .then(response => response.json())
        .then(data => {
             
            console.log(data)
            setCards(data)

            localStorage.setItem("cards", data)

        })
    }, [])

    const fetchState = () => {
        fetch("/api/game-state.php")
        .then(response => response.json())
        .then(response => {
            
            console.log(response) // <-- État du jeu, ou message comme : LAST_GAME_WON
            setGamestate(response)

            stateTimeout.current = setTimeout(fetchState, 2000);
        });
    }
	
    useEffect(() => {

        stateTimeout.current = setTimeout(fetchState, 1000);

        return () => {
            if (stateTimeout.current) clearTimeout(stateTimeout.current);
        }
    
    }, []);

    const handlePlay_card = (card_uid) => {

        console.log(`card à jouer ${card_uid}`)

        //if(game_state.yourTurn === true) {

           setTimeout(sendResponse("PLAY", card_uid, null), 2000)
        //}
        

    }

    const handleAttack_card = (card_uid) => {

        //if (game_state.yourturn == true) {

            console.log(`card d'attaque ${card_uid}`)
            setSelected({...selection, type:"ATTACK"})
            setSelected({...selection, uid : card_uid})
        //}
    }

    const handleOpponent_card = (card_uid) => {


        console.log(`card adverse ${card_uid}`)

            //if(game_state.yourTurn === true) {

                //if (selection.type != null & selection.uid != null) {

                    setTimeout(sendResponse("ATTACK", selection.uid, card_uid),2000)

                    // pour reset
                    setSelected({...selection, type: null})
                    setSelected({...selection, uid: null})
                    setSelected({...selection, targetUid: 0})

                //}
            
            //}
        
    }

    const sendResponse = (type, uid=null, targetUid=null) => {

        //actions = ["END_TURN", "SURRENDER","HERO_POWER", "PLAY", "ATTACK"] pour se rappeler 

        let formData = new FormData()
        formData.append("type", type)

        if (selection.uid != null) {
            formData.append("uid", uid)
        }

        if (selection.targetUid != null) {
            formData.append("targetUid", targetUid)
        }

        console.log(`dm serveur ici: ${type}`)

        fetch("/api/GamePlay.php", {
            method:"POST",
            body: formData
        })
        .then(response =>
            response.json()
        )
        .then(data => {
            console.log("Tour joué")
            console.log(data)

            response = data 
            messageResponse.current = setMessage(response)

            // stateTimeout.current = setTimeout()
        })

    }

    // useEffect(()=> {

    //     messageResponse.current = setMessage(response)
        
    //     return () => {

    //         if (messageResponse.current) {

    //             messageResponse.current = null

    //         }
    //     }

    // }, [message])

    return <>

    <MainLayout>
    <div style={{
    
        backgroundImage : `URL(${background})`, 
        backgroundRepeat: "no-repeat" , 
        backgroundSize : "cover", 
        height: "100vh",
        backgroundPosition: "bottom-center", 
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position:"absolute",
        width:"100%",
        height:"100vh",     
        }}>
        <div style={{

            backgroundColor: "black",
            color: "white",
            fontFamily:"BBH Sans Bartle",
            fontsize:"1rem",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            minHeight:"10vh",
            positon:"relative",

        }}>
        <div style={{
            display:"flex", 
            flexDirection:"column",
            padding:"2vw"
        }}>
            <div>{game_state?.opponent?.username?? "username" }</div>
            <div>{game_state?.opponent?.heroClass?? "heroClass" }</div>
            <div>{game_state?.opponent?.welcomeText?? "Citation"}</div>
            <div>HandSize: {game_state?.opponent?.handSize?? "0" }</div>
        </div>     
        <div style={{
            display:"flex", 
            justifyContent:"center", 
            flexDirection:"column",
            textAlign:"right",
            padding:"2vw"
        }}>
            <div>Cards: {game_state?.remainingCardsCount?? "0" }</div>
            <div>Time: {game_state?.remainingTurnTime?? "0"}</div>
            <Button>Chat</Button>
        </div>
        </div>

        <div style={{
            display:"flex",
            flexDirection:"column",
            flexGrow:"grow",
            justifyContent:"center",
            minHeight:"30vh",
            padding:"3vw",
        }}>
        <div style={{

                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap",
                justifyContent:"center",

                // display: "grid",
                // grid:"1fr/1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                // placeItems:"center",
                // width:"90%"

        }}>
        {
            game_state?.opponent?.board?.map(card => {

                return (
                    <Carte key={card.uid} cardUId={card.uid} color="blue" onClick={() => handleOpponent_card(card.uid)} minHeight="220px" width="150px">
                        <p>Id: {card.uid}</p>
                        <p>Cost: {card.cost}</p>
                        <p>Mechanics: {card.mechanics}</p>
                    </Carte>
                )
            })
                
        }
        </div>
         <div style={{

                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap",
                justifyContent:"center",

                // display: "grid",
                // grid:"1fr/1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                // placeItems:"center",
                // width:"90%"

        }}>
        {
            game_state.board?.map(card => {

                return (
                    <Carte key={card.uid} cardUId={card.uid} color="yellow" onClick={() => handleAttack_card(card.uid)} minHeight="220px" width="150px">
                        <p>Id: {card.uid}</p>
                        <p>Cost: {card.cost}</p>
                        <p>Mechanics: {card.mechanics}</p>
                    </Carte>
                )
            })
            
        }    
        </div>
        </div>
        <div style={{
            display:"flex",
            justifyContent:"center",
            minHeight:"30vh",
            padding:"3vw",
        }}>
        </div>
        <div style={{

            backgroundColor: "black",
            color: "white",
            fontFamily:"BBH Sans Bartle",
            fontSize:"0.8rem",
            display:"flex",
            flexDirection:"row",
            justifyContent:"between",
            alignItems:"center",
            maxHeight:"200px",
            width:"100%",
            position:"fixed",
            bottom:"0",
            overflowX:"hidden",
            padding:"1vw",
            
        }}>
            <div style={{
                display:"flex",
                flexDirection:"column",
            }}>
                <div>HP:{game_state?.hp?? "0"}</div>
                <div>MP:{game_state?.mp?? "0"}</div>
                <div>Message:</div>
                <div style={{ 
                    fontsize: "0.8rem", 
                    height:"100px",
                    backgroundColor:"white",
                    fontFamily:"BBH Sans Bartle",
                    color:"black", 
                    }}>
                    { message?? "Game On"}
                </div>
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns:"repeat(8,1fr)",
                placeItems:"center",
                width:"90%",
            }}>
            {
                game_state.hand?.map(card => {

                      return (
                    <Carte key={card.uid} cardUId={card.uid} onClick={() => handlePlay_card(card.uid)} minHeight="150px" width="100px">
                        <p>Id: {card.uid}</p>
                        <p>Cost: {card.cost}</p>
                        <p>Mechanics: {card.mechanics}</p>
                    </Carte>
                )

                })
            }
            
            </div>
            <div style={{
                display:"flex",
                flexDirection:"column",
                position:"relative",
                fontSize:"0.8rem",
                padding:"2vw"
            }}>
                <Button onClick={()=> sendResponse("SURRENDER")}>Surrender</Button>
                <Button onClick={()=> sendResponse("HERO_POWER")}>Hero Power</Button> 
                <Button style={{fonColor:"red"}} onClick={()=> sendResponse("END_TURN")}>{game_state?.yourTurn === true? "End Turn" : "Wait Turn"}</Button>
            </div>
        </div>

    </div>
    
    </MainLayout>
    </>

}