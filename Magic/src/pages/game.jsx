import Carte from "../components/carte";
import {useEffect, useState} from "react"; 

export default function Game({}) {

    const [cards, setCards] = useState([])

    useEffect(() => {

        fetch("/api/Cards.php", {
            method:"POST"
        })
        .then(response => response.json())
        .then(data => {

            console.log(data)
            setCards(data)
        })
    }, [])

    return (
        <>

        <div style={{

            display: "flex",
            flexDirection: "column",
            justifyContent: "center"

        }}> 
            <div style={{

                display:"flex", 
                flexDirection: "row", 
                justifyContent: "center"

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
    )
}