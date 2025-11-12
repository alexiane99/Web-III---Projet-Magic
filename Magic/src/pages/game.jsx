import background from "../assets/img/stage_wallpaper.jpg"
import Carte from "../components/carte";
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

    <div style={{
    
                    backgroundImage : `URL(${background})`, 
                    backgroundRepeat: "no-repeat" , 
                    backgroundSize : "cover", 
                    height: "100vh",
                    backgroundPosition: "bottom-center", 
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  
                    
        }}>
        <div style={{

            backgroundColor: "black",
            color: "white",


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

        <div style={{

            display: "grid",
            gridTemplateColumns:"repeat(4,2fr)",

        }}>
         { 
            cards?.map(card => {

                return (

                    <Carte key={card.id}>
                        <p>{card.id}</p>
                        <p>{card.cost}</p>
                        <p>{card.mechanics}</p>
                    </Carte>

                )
            })
            }

        </div>
        <div style={{

            display: "grid",
            gridTemplateColumns:"repeat(4,2fr)",

        }}>
         { 
            cards?.map(card => {

                return (

                    <Carte key={card.id}>
                        <p>{card.id}</p>
                        <p>{card.cost}</p>
                        <p>{card.mechanics}</p>
                    </Carte>

                )
            })
            }

        </div>

    </div>
    
    </>

}