import MainLayout from "../layouts/main-layout";
import Carte from "../components/carte";
import {useEffect, useState} from "react"; 

export default function Cards({}) {

    let key = localStorage.getItem("key")
    console.log(key)
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
        <MainLayout>
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

                    <Carte cardUid={card.id} cardHp={card.hp} cardAtk={card.atk} cardCost={card.cost} cardMechanics={card.mechanics}>
                    </Carte>

                )
            })
        }
        </div>
        </MainLayout>
    
    </>
    )
}