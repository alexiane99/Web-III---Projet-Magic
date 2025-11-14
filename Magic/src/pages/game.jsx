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
    const [game_state, setGamestate] = useState({
        game_state : null,
    })

    // copie de la page cards
    const [cards, setCards] = useState([])

    useEffect(() => {

        fetch("/api/Cards.php", {
            method:"POST"
        })
        .then(response => response.json())
        .then(data => {

            // for(let i = 0; i < 8; i++) {

            //     cartes_deck[i] = data[i]
                
            // }
             
            console.log(data)
            setCards(data)

            localStorage.setItem("cards", cards)

           
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
            padding:"2vw"
        }}>
            <div>Cards: {game_state?.remainingCardsCount?? "0" }</div>
            <div>Time: {game_state?.remainingTurnTime?? "0"}</div>
        </div>
        </div>

        <div style={{
            display:"flex",
            justifyContent:"center",
            minHeight:"30vh",
            padding:"3vw",
        }}>
            <div style={{

                // display:"flex",
                // flexDirection:"row",
                // flexWrap:"wrap",
                // justifyContent:"center",

                display: "grid",
                grid:"1fr 1fr/1fr 1fr 1fr 1fr",
                placeItems:"center",
                width:"90%"

        }}>
        {
                
            game_state.hand?.map(card => {

                return (
                    <Carte key={card.id} minHeight="220px" width="150px">
                        <p>Id: {card.id}</p>
                        <p>Cost: {card.cost}</p>
                        <p>Mechanics: {card.mechanics}</p>
                    </Carte>
                )
            })
            
        }    
            {/* <Carte minHeight="220px" width="150px"></Carte>
            <Carte minHeight="220px" width="150px"></Carte>
            <Carte minHeight="220px" width="150px"></Carte>
            <Carte minHeight="220px" width="150px"></Carte>
            <Carte minHeight="220px" width="150px"></Carte>
            <Carte minHeight="220px" width="150px"></Carte>
            <Carte minHeight="220px" width="150px"></Carte>
            <Carte minHeight="220px" width="150px"></Carte> */}
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
            fontSize:"1rem",
            display:"flex",
            flexDirection:"row",
            justifyContent:"between",
            alignItems:"center",
            minHeight:"8vh",
            width:"100%",
            position:"fixed",
            bottom:"0",
            overflowX:"hidden",
            padding:"3vw",
            
        }}>
            <div style={{
                display:"flex",
                flexDirection:"column",
            }}>
                <div>HP:{game_state?.hp?? "0"}</div>
                <div>MP:{game_state?.mp?? "0"}</div>
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns:"repeat(8,1fr)",
                placeItems:"center",
                width:"90%",
            }}>
            {
                game_state.board?.map(card => {

                      return (
                    <Carte key={card.id} minHeight="150px" width="100px">
                        <p>Id: {card.id}</p>
                        <p>Cost: {card.cost}</p>
                        <p>Mechanics: {card.mechanics}</p>
                    </Carte>
                )

                })
            }
                {/* <Carte minHeight="150px" width="100px"></Carte>
                <Carte minHeight="150px" width="100px"></Carte>
                <Carte minHeight="150px" width="100px"></Carte>
                <Carte minHeight="150px" width="100px"></Carte>
                <Carte minHeight="150px" width="100px"></Carte>
                <Carte minHeight="150px" width="100px"></Carte>
                <Carte minHeight="150px" width="100px"></Carte>
                <Carte minHeight="150px" width="100px"></Carte> */}
            </div>
            <div style={{
                display:"flex",
                flexDirection:"column",
                position:"relative",
                fontSize:"1rem",
                padding:"2vw"
            }}>
                <div>{game_state?.heroClass?? "Hero Power"}</div>
                <div>{game_state?.yourTurn?? "End Turn"}</div>
            </div>
        </div>

    </div>
    
    </MainLayout>
    </>

}