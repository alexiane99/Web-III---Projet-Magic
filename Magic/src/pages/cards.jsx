import MainLayout from "../layouts/main-layout";
import Carte from "../components/carte";
import {useEffect, useState} from "react"; 

export default function Cards({}) {

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
            padding:"3vw",
            backgroundColor:"black",
            display:"grid", 
            gridTemplateColumns:"repeat(5,1fr)",
            placeItems:"center",

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
    
    </>
    )
}