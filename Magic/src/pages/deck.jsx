import Button from "../components/button"

export default function Deck({}) {

    let key = localStorage.getItem("key")
    console.log(key)

    const startGame = (e) => {
        e.preventDefault

        window.location.href = "/game"
    }


     return <>

    <div style={{

        display: "flex", 
        flexDirection: "row",
        backgroundColor: "black",
        justifyContent: "center", 
        alignContent: "center",

    }}>
           <iframe width={1200} height={1200} src={`https://magix.apps-de-cours.com/server/deck/${key}`}></iframe>

           <div style={{
                margin: "2vw",
                padding: "2,5vw",
                fontFamily : "BBH Sans Bartle", 
                fontSize: "2vw"
           }}>
                <Button onClick={e=>startGame(e)}>Start Game</Button>
           </div>

    </div>
     
    </>
} 