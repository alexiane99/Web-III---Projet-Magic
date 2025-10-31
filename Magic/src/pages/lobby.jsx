import background from "../assets/img/rooftop_bar.jpg";
import {useRef, useEffect, useState} from "react" 
import Button from "../components/button"

export default function Lobby({}) {

const chatRef = useRef(null); 

    let key = localStorage.getItem("key")
    console.log(key)

    const [gameMode, setGameMode] = useState ({
        mode : ""
    })

    const applyStyles = () => {

        let styles = {

            fontColor : "#333",
            backgroundColor : "white",
            fontGoogleName : "Sofia",
            fontSize : "20px",
            hideIcons : false, // (or true),
            inputBackgroundColor : "rgba(137,146,147,1) 0%",
            inputFontColor : "black",
            height : "690px",
            padding: "5px",
            memberListFontColor : "#ff00dd",
            borderColor : "blue",
            memberListBackgroundColor : "white",
            hideScrollBar: true, // pour cacher le scroll bar

        }

        setTimeout(() => {

            chatRef.current.contentWindow.postMessage(JSON.stringify(styles), "*");
        }, 100);
    }

    useEffect(() => { }) // useEffect pour vérifier si connecté, sinon redirigé vers index

    const handleLogoutProgram = (e) => {
        e.preventDefault(); 

        fetch("/api/logout.php", {
            method: "POST"
        })
        .then(response => response.json) // response.text
        .then(data => { // txt

            console.log(data)

            window.location.href = "/"

        })

    }; 

    const setDeck = (e) => {
        e.preventDefault

        window.location.href = "/deck"
    }

    const setGameplayMode = (mode) => {

        setGameMode(mode)

        console.log(gameMode.mode)

        let formData = new FormData() 
        formData.append("mode", mode)
        
        fetch("/api/GameMode.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => { 

            console.log(data) 

            //window.location.href = "/game"
        })
    } 




    // function getKey() {

    //     let key = JSON.stringify(localStorage.getItem("key")); // renvoie un objet Storage { key : "XYZ"} , il faut convertir en String
    //     console.log(key);
    //     return key; 

    // }




return  <>

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

        margin: "2vw",
        padding: "2.5vw",
        display: "flex", 
        justifyContent: "space-around",
        flexDirection: "column",
        backgroundColor: "black", 
        color: "white",
        fontFamily : "BBH Sans Bartle",
        fontSize: "2vw",
        height: "25vh"
    }}>
        <div style={{ justifyContent: "space-between"}}>
        <h2 style={{padding: "1.5vw", textAlign: "center"}}>Ready?</h2>
        <Button onClick={() => setGameplayMode("PVP")}>Play Game</Button>
        <Button onClick={e=> setDeck(e)}>Deck</Button>
        <Button onClick={() => setGameplayMode("TRAINING")}>Practice</Button>
        <Button onClick={e => handleLogoutProgram(e)}>Quit Game</Button>
        </div>

        <div style={{

            display: "flex", 
            justifyContent: "center", 
            alignContent: "end",
         
        

        }}>

        {/* on utilise { } pour les valeurs dynamiques (variables, fonction, expression), qui ne sont pas du html*/}
        {/* pour utilise ${ } dans une string, on utilise ` `         */}
        <iframe ref={chatRef} width={700} height={240} onLoad={applyStyles} src={`https://magix.apps-de-cours.com/server/chat/${key}`}></iframe> 
        
        </div>
   
    
    </div>
        
    </div>

  
    </>
}