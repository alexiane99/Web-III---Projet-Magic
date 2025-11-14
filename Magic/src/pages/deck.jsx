import MainLayout from "../layouts/main-layout";
import Button from "../components/button"

export default function Deck({}) {

    let key = localStorage.getItem("key")
    console.log(key)

    const startGame = (e) => {
        e.preventDefault

        let formData = new FormData()

        //harcode, à vérifier
        formData.append("type", "TRAINING")
        formData.append("mode", "STANDARD")

        fetch("/api/gamemode.php", {
            method:"POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            console.log(data);

            if(data == "JOINED_PVP" || data == "JOINED_TRAINING") {

                window.location.href = "/game"

            }

        })
    
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