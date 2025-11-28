import MainLayout from "../layouts/main-layout";
import background from "../assets/img/background_scene.png";

import Carte from "../components/carte";
import Profile from "../components/profile";
import {useEffect, useState, useRef} from "react"; 
import Button from "../components/button";
import { startGame } from "../components/functions/startGame";

export default function Game({}) {

    let key = localStorage.getItem("key")
    let gametype = localStorage.getItem("gametype")
    console.log(key)
    let stateTimeout = useRef(null)
    let messageTimeout = useRef()
    let isWaiting = useRef(false)
    let isGlowing = useRef(false)
    let isTaunt = useRef(false)
    let canCharge = useRef(false)
    let isHeroPower = useRef(true)
    const heroColor = isHeroPower === true? "blue" : "grey"
    let surrender = useRef(false)
    let colorCard = null
    const colorTaunt = isTaunt.current === true? "yellow" : "white"
    const colorCharge = canCharge.current === true? "cyan" : "white"
    let gameEnd = useRef(false)
    const [endTitle, setEndTitle] = useState({
        lost:"Game Over", 
        won: "Congratulations! You won",
        surrender:"You surrender! Victory for your opponent!"
    })


    // réception du deck
    // const [cards, setCards] = useState([])

    // récupération de l'état de la partie 
    const [game_state, setGamestate] = useState({
        game_state : null,
    })

    const [selection, setSelected] = useState({

        type: null,
        uid: null,

    })

    const [message, setMessage] = useState("")

    const showEndGame = () => {

        if (gameEnd.current === true) {

            return (

                <div className="GameEnd" style={{
                        display:"flex",
                        backgroundColor:"black", 
                        height:"500px",
                        width:"700px",
                        color:"white", 
                        zIndex:"10",
                        justifyContent:"center", 
                        fontFamily:"BBH Sans Bartle",
                        textAlign:"center", 
                        position:"fixed",
                        top:"50%", 
                        left:"50%",
                        transform:"translateX(-50%) translateY(-50%)",

                    }}>
                    <div style={{
                            backgroundColor : "black",
                            border:"solid 1px #ff1493",
                            color: "white",
                            margin:"2vw",
                            padding:"2vw",
                            width:"100%",
                    }}>
                        <h1>{endTitle.lost}</h1>
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            justifyContent:"center",
                            padding:"5vw",
                            marginTop:"4vw"}}>
                            <Button onClick={()=> startGame(gametype)}>Start Again</Button>
                            <Button onClick={()=> window.location.href = "/lobby"}>Quit</Button>
                        </div>
                    
                    </div>
                    </div>
            )
        }
        else {
            return (
                null
            )
        }

    }

    // useEffect(() => {

    //     fetch("/api/Deck.php", {
    //         method:"POST"
    //     })
    //     .then(response => response.json())
    //     .then(data => {
             
    //         console.log(data)
    //         setCards(data)

    //         localStorage.setItem("cards", data)

    //     })
    // }, [])

    const startGame = (gametype) => {

        console.log(gametype)
        
        let formData = new FormData()

        if(gametype === "PVP") {
            gametype = "PVP"
        }
        
        if(gametype === "TRAINING") {
            gametype = "TRAINING"
        }

        //harcode, à vérifier
        formData.append("type", gametype)
        // formData.append("mode", "STANDARD")

        fetch("/api/GameMode.php", {
            method:"POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            console.log(data);

        if(typeof data === "string") {

            if(data === "JOINED_PVP" || data === "JOINED_TRAINING") {

                if(data === "JOINED_PVP") {

                    gametype = "PVP"
                       
                }
                
                if(data === "JOINED_TRAINING") {

                    gametype = "TRAINING"
                    localStorage.setItem("gametype", gametype) 
                }

                window.location.href = "/game"
            }
        }

        })
    }

    const fetchState = () => {
        fetch("/api/game-state.php")
        .then(response => response.json())
        .then(data => {
            
        console.log(data) // <-- État du jeu, ou message comme : LAST_GAME_WON

        setGamestate(data)

        if (data?.yourTurn === true) {
                
            isWaiting.current = false // puisqu'on vient de recevoir la réponse du serveur, on peut remettre la réponse à vrai
        }

        if(typeof data !== "object") {
    
            if (data === "LAST_GAME_WON") {

                gameEnd.current = true 
                
            }
            else if (data === "LAST_GAME_LOST") {

                gameEnd.current = true
            
            }
        }
       
            stateTimeout.current = setTimeout(fetchState, 2000);

        });
    }
	
    useEffect(() => {

        stateTimeout.current = setTimeout(fetchState, 1000);

        return () => {
            if (stateTimeout.current) clearTimeout(stateTimeout.current);
        }
    
    }, []);

    const handleClick_card = (card_uid) => {

        isGlowing.current = true

        return (
            <div className="carte" style={{position:"relative", minHeight:"280px", width:"180px"}}>
            <div style={{
                height:"300px", 
                width:"200px",
                position:"absolute",
                inset:"0",
                zIndex:"0", 
                backgroundColor:"#ff1493",
                filter:"blur(12px)",
                borderRadius:"12px",
            }}></div>
            <div style={{position:"relative", zIndex:"2"}}>
                <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={card_uid} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            </div>
            </div>
        
        )
    }

    const handlePlay_card = (card_uid) => {

        console.log(`card à jouer ${card_uid}`)

        //if(isPlaying.current == true) {

           verifyResponse("PLAY", card_uid, null)
       // }
        
    }

    const handleAttack_card = (card_uid) => {

        //if (isPlaying.current == true) {

            console.log(`card d'attaque ${card_uid}`)
            setSelected({
                ...selection, 
                type:"ATTACK",
                uid:card_uid,
            })
           
        //}
    }

    const handleOpponent_card = (card_uid) => {

        console.log(`card adverse ${card_uid}`)

            //if (isPlaying.current == true) {

                //if (selection.type != null & selection.uid != null) {
                verifyResponse("ATTACK", selection.uid, card_uid)
                
                    // pour reset
                    setSelected({...selection, 
                        type: null, 
                        uid:null,
                        targetUid:0,})

            //}
        
    }

    const verifyResponse = (type, uid=null, targetUid=null) => {

        if(game_state?.yourTurn == true && isWaiting.current === false) {

            sendResponse(type, uid, targetUid)

            setMessage(type)
        }
        else if(type === "SURRENDER") {

            surrender.current = true
            console.log("surrender")

            gameEnd.current = true
              

        }
        else {

            setMessage("Wait response from server")
        }
    }

    const sendResponse = (type, uid, targetUid) => {

        if (isWaiting.current === false) {

            isWaiting.current = true // pour empêcher de rappeler le serveur si la réponse n'est pas reçue

            //actions = ["END_TURN", "SURRENDER","HERO_POWER", "PLAY", "ATTACK"] pour se rappeler 

            let formData = new FormData()
            formData.append("type", type)

            if (uid != null) {
                formData.append("uid", uid)
            }

            if (targetUid != null) {
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

                if(typeof data === "string") {

                    setMessage(data)
                }

            })
        }
        else {

            setMessage("Attendez la réponse du serveur")
            console.log("Attendez la réponse du serveur")
        }
        
    }

    useEffect(() => {

        if (message != null) {
            messageTimeout.current = setTimeout(() => {setMessage(null)}, 3000);
        }
        return () => {
            if (messageTimeout.current) clearTimeout(messageTimeout.current);
        }

    }, [message])

    return <>

    <MainLayout>
    <div style={{

        backgroundColor: "black",
        color: "white",
        fontFamily:"BBH Sans Bartle",
        fontsize:"0.9rem",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"top",
        minHeight:"7vh",
        positon:"fixed",
        padding:"1vw",

    }}>
    <div style={{display:"flex", flexDirection:"row", paddingLeft:"1vw"}}>
        <Profile></Profile>
        <div style={{
        display:"flex", 
        flexDirection:"column",
        padding:"0.5vw",
    }}>
        <div style={{padding:"0.5vw"}}>{game_state?.opponent?.username?? "username" }</div>
        <div style={{padding:"0.5vw"}}>{game_state?.opponent?.heroClass?? "heroClass" }</div>
        <div style={{padding:"0.5vw"}}>{game_state?.opponent?.welcomeText?? "Citation"}</div>
    </div>  
    <div style={{display:"flex", flexDirection:"row"}}>
        {/* <div style={{height:"3vw", width:"2vw", backgroundColor:"purple", border:"2px solid white", borderRadius:"10px", margin:"0.5vw" }}></div> 
        <div style={{height:"3vw", width:"2vw", backgroundColor:"purple", border:"2px solid white", borderRadius:"10px", margin:"0.5vw" }}></div> 
        <div style={{height:"3vw", width:"2vw", backgroundColor:"purple", border:"2px solid white", borderRadius:"10px", margin:"0.5vw" }}></div> 
        <div style={{height:"3vw", width:"2vw", backgroundColor:"purple", border:"2px solid white", borderRadius:"10px", margin:"0.5vw" }}></div> 
        <div style={{height:"3vw", width:"2vw", backgroundColor:"purple", border:"2px solid white", borderRadius:"10px", margin:"0.5vw" }}></div> 
        <div style={{height:"3vw", width:"2vw", backgroundColor:"purple", border:"2px solid white", borderRadius:"10px", margin:"0.5vw" }}></div> 
        <div style={{height:"3vw", width:"2vw", backgroundColor:"purple", border:"2px solid white", borderRadius:"10px", margin:"0.5vw" }}></div>  */}
        {
            Array.from({lenght: game_state?.opponent?.handSize?? 0}).map((card, index) => 
                <div key={index} style={{height:"5vw", width:"3.5vw", backgroundColor:"#cc8899", border:"2px solid red", borderRadius:"10px", margin:"0.5vw" }}></div> 
            ) 
        }
    </div>   
    </div>
    <div style={{
        display:"flex", 
        justifyContent:"center", 
        flexDirection:"column",
        textAlign:"center",
    }}>
    <div style={{padding:"1vw"}}>Message: </div>
        <div style={{ 
            fontsize: "0.8rem", 
            height:"120px",
            width:"500px",
            backgroundColor:"white",
            fontFamily:"BBH Sans Bartle",
            color:"black", 
        }}>
            { [message]?? "GameOn"}
        </div>
    </div>
    <div style={{
        display:"flex", 
        justifyContent:"center", 
        flexDirection:"column",
        textAlign:"right",
        padding:"1vw"
    }}>
        <div style={{padding:"0.5vw"}}>Cards: {game_state?.remainingCardsCount?? "0" }</div>
        <div style={{padding:"0.5vw"}}>Time: {game_state?.remainingTurnTime?? "0"}</div>
        <Button>Chat</Button>
    </div>
    </div>
    <div style={{
    
        backgroundImage : `URL(${background})`, 
        backgroundRepeat: "no-repeat" , 
        backgroundSize : "cover", 
        backgroundPositionY:"50%",
        width:"100%",
        height: "100vh",
        backgroundPosition: "bottom-center", 
        overflow: "hidden",
        display: "flex",
        // flexDirection: "column",
        width:"100%",   
        }}>

        <div style={{
            display:"flex",
            flexDirection:"column",
            flexGrow:"grow",
            width:"100%",
            padding:"3vw",
            position:"fixed",
        }}>
        <div style={{

                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap",
                justifyContent:"center",
                padding:"1vw",

        }}>
        {/* <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={2} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={5} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={12} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={24} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={56} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={67} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={40} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte> */}
        {
            game_state?.opponent?.board?.map((card, index) => {

                return (
                    <Carte key={index} minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={card.uid} cardCost={card.cost} cardMechanics={null} color="blue" onClick={() => handleOpponent_card(card.uid)}>
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

        }}>
            {/* <div className="carte" style={{position:"relative", minHeight:"280px", width:"180px"}}>
            <div style={{
                height:"300px", 
                width:"200px",
                position:"absolute",
                inset:"0",
                zIndex:"0", 
                backgroundColor:"#ff1493",
                filter:"blur(12px)",
                borderRadius:"12px",
            }}></div>
            <div style={{position:"relative", zIndex:"2"}}> */}
                {/* <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={2} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte> */}
            {/* </div> */}
            {/* </div> */}
            
            {/* <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={5} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={12} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={24} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={56} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={67} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
            <Carte minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={40} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte> */}
        {
            game_state.board?.map((card, index) => {

                card.mechanics.map((ele, index) => {
                    if (ele === "Taunt") {
                        isTaunt.current = true
                        console.log("isTaunt")
                        colorCard = colorTaunt
                    
                    }
                    if (ele === "Charge") {
                        canCharge.current = true
                        console.log("canCharge")
                        colorCard = colorCharge
                    }
                })


                return (

                    
                    <Carte key={index} minHeight="280px" width="180px" textSize="0.4rem" infoDim="23%" cardUid={card.uid} cardCost={card.cost} cardMechanics={card.mechanics} color={colorCard} onClick={() => handleAttack_card(card.uid)}>
                    </Carte>
                )
            }) 
        }
            
        </div>
        </div>


        <div style={{

            backgroundColor: "black",
            color: "white",
            fontFamily:"BBH Sans Bartle",
            fontSize:"0.8rem",
            display:"flex",
            width:"100%",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            position:"fixed",
            bottom:"0",
            overflow:"hidden",
           
            
        }}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                padding:"1vw",
            }}>
                <div style={{padding:"1vw"}}>HP: {game_state?.hp?? "0"}</div>
                <div style={{padding:"1vw"}}>MP: {game_state?.mp?? "0"}</div>
            </div>
            <div style={{
                display: "flex",
                flexDirection:"row",
                // gridTemplateColumns:"repeat(8,1fr)",
                // placeItems:"center",
                width:"90%",
            }}>
                {/* <Carte minHeight="180px" width="100px" textSize="0.1rem" infoDim="20%" cardUid={2} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
                <Carte minHeight="180px" width="100px" textSize="0.1rem" infoDim="20%" cardUid={5} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
                <Carte minHeight="180px" width="100px" textSize="0.1rem" infoDim="20%" cardUid={12} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
                <Carte minHeight="180px" width="100px" textSize="0.1rem" infoDim="20%" cardUid={24} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
                <Carte minHeight="180px" width="100px" textSize="0.1rem" infoDim="20%" cardUid={56} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
                <Carte minHeight="180px" width="100px" textSize="0.1rem" infoDim="20%" cardUid={67} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte>
                <Carte minHeight="180px" width="100px" textSize="0.1rem" infoDim="20%" cardUid={40} cardCost={3} cardMechanics={"assault"} cardHp={1} cardAtk={1}></Carte> */}
            {
                game_state.hand?.map((card, index) => {

                    card.mechanics.map((ele, index) => {
                    if (ele === "taunt") {
                        isTaunt.current = true
                        console.log("isTaunt")
                    
                    }
                    if (ele === "charge") {
                        canCharge.current = true
                        console.log("canCharge")
                    }
                })

                    return (
                    <Carte key={index} minHeight="180px" width="100px" textSize="0.3rem" infoDim="20%" cardUid={card.uid} cardCost={card.cost} cardMechanics={card.mechanics} cardHp={card.hp} cardAtk={card.atk} color={colorCard} onClick={() => handlePlay_card(card.uid)}>
                    </Carte>
        
                )

                })
            }
            </div>
            { 
              
                showEndGame
                    
            }
            <div style={{
                display:"flex",
                flexDirection:"column",
                position:"relative",
                fontSize:"0.8rem",
                padding:"2vw",
                justifyContent:"space-between",
            }}>
                <Button onClick={()=> verifyResponse("SURRENDER")}>Surrender</Button>
                <Button onClick={()=> verifyResponse("HERO_POWER")} color={heroColor}>Hero Power</Button> 
                <Button style={{fonColor:"red"}} onClick={()=> verifyResponse("END_TURN")}>
                {
                    game_state?.yourTurn === true? "End Turn":"Wait Turn"
                }
                </Button>
            </div>
        </div>

    </div>
    
    </MainLayout>
    </>

}