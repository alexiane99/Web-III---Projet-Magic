import MainLayout from "../layouts/main-layout";
import background from "../assets/img/stage_wallpaper.jpg";
import Carte from "../components/carte";
import Profile from "../components/profile";
import {useEffect, useState} from "react"; 

export default function Game({}) {

    // copie de la page cards
    const [cards, setCards] = useState([])
    let cartes_main = []

    useEffect(() => {

        fetch("/api/Cards.php", {
            method:"POST"
        })
        .then(response => response.json())
        .then(data => {

            for(let i = 0; i < 8; i++) {

                cartes_main[i] = data[i]
                
            }
             
            console.log(cartes_main)
            setCards(cartes_main)

           
        })
    }, [])


    // const fetchState = () => {
    //     fetch("/api/game-state.php")
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log(response) // <-- État du jeu, ou message comme : LAST_GAME_WON
    //         stateTimeout.current = setTimeout(fetchState, 2000);
    //     });
    // }
	
    // useEffect(() => {
    //     stateTimeout.current = setTimeout(fetchState, 1000);

    //     return () => {
    //         if (stateTimeout.current) clearTimeout(stateTimeout.current);
    //     }
    
    // }, []);

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
                    position:"relative",
                    // width:"100%",
                    // height:"100vh",
                  
                    
        }}>
        <div style={{

            backgroundColor: "black",
            color: "white",
            fontFamily:"BBH Sans Bartle",
            fontsize:"1vw",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-evenly",
            alignItems:"center",
            minHeight:"8vh",
            positon:"relative",
         


        }}>
            <div>
                Pointage
            </div>
             <Profile></Profile>
            <div>
                Pointage
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
                gridTemplateColumns:"repeat(8,1fr)",
                placeItems:"center",
                width:"90%"

        }}>
        { 
            cards?.map(card => {

                return (

                    <Carte minHeight="250px" width="150px" key={card.id}>
                        <p>{card.id}</p>
                        <p>{card.cost}</p>
                        <p>{card.mechanics}</p>
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
        <div style={{

            // display:"flex",
            // flexDirection:"row",
            // flexWrap:"wrap",
            // justifyContent:"center",
            display: "grid",
            gridTemplateColumns:"repeat(8,1fr)",
            placeItems:"center",
            width:"90%",

        }}>
    
         <Carte minHeight="250px" width="150px"></Carte>
         <Carte minHeight="250px" width="150px"></Carte>
         <Carte minHeight="250px" width="150px"></Carte>
         <Carte minHeight="250px" width="150px"></Carte>
         <Carte minHeight="250px" width="150px"></Carte>
         <Carte minHeight="250px" width="150px"></Carte>
         <Carte minHeight="250px" width="150px"></Carte>
         <Carte minHeight="250px" width="150px"></Carte>
        </div>
        </div>
        <div style={{

            backgroundColor: "black",
            color: "white",
            fontFamily:"BBH Sans Bartle",
            fontSize:"1vw",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-evenly",
            alignItems:"center",
            minHeight:"6vw",
            width:"100%",
            position:"absolute",
            bottom:"0",
            overflowX:"hidden",
         

            
        }}>
             <div>
                Pointage
            </div>
            <div>
                Avatar
            </div>
            <div>
                Pointage
            </div>
        </div>

    </div>
    
    </MainLayout>
    </>

}