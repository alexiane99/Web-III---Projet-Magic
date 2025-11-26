import MainLayout from "../layouts/main-layout";
import background from "../assets/img/rooftop_bar.jpg";
import {useRef, useEffect, useState} from "react" 
import Button from "../components/button"
import { styles } from "../components/functions/openchat";
import chatBox from "../components/chatBox";
import AutoplayVideo from "../components/autoplayVideo";


export default function Lobby({}) {

const chatRef = useRef(null); 

    let key = localStorage.getItem("key")
    console.log(key)

    const [gameMode, setGameMode] = useState ({
        mode : ""
    })

    const applyStyles = () => {

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
        .then(response => response.json()) // response.text
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

    <MainLayout>

    <div style={{

        backgroundImage : `URL(${background})`, 
        backgroundRepeat: "no-repeat" , 
        backgroundSize : "cover", 
        height: "100vh",
        backgroundPosition: "bottom-center", 
        overflow: "hidden",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
                
    }}>
    <div style={{

        margin: "2vw",
        padding: "2vw",
        display: "flex", 
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "black", 
        border:"solid 3px white",
        color: "white",
        fontFamily : "BBH Sans Bartle",
        fontSize: "1.7vw",
        height: "20vh",
        position:"relative",
    }}>
        <div style={{ display:"flex", position:"relative", justifyContent: "center"}}>
        <h2 style={{ padding: "1.5vw"}}>Ready?</h2>
        <Button style={{position:"relative"}} onClick={() => setGameplayMode("PVP")}>Play Game</Button>
        <Button style={{position:"relative"}} onClick={e=> setDeck(e)}>Deck</Button>
        <Button style={{position:"relative"}} onClick={() => setGameplayMode("TRAINING")}>Practice</Button>
        <Button style={{position:"relative"}} onClick={e => handleLogoutProgram(e)}>Quit Game</Button>
        </div>
    </div>
    <div style={{

           position:"absolute",
           bottom:"0",
           right:"0",
           overflow:"hidden",
           zIndex:"1",
         

        }}>

        {/* on utilise { } pour les valeurs dynamiques (variables, fonction, expression), qui ne sont pas du html*/}
        {/* pour utilise ${ } dans une string, on utilise ` `         */}
        <iframe ref={chatRef} border-radius="50px" width={750} height={500} onLoad={applyStyles} src={`https://magix.apps-de-cours.com/server/chat/${key}`}></iframe> 
        
        </div>
        
    </div>
    </MainLayout>
    </>
}