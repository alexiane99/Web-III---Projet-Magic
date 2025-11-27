import MainLayout from "../layouts/main-layout";
import background from "../assets/img/rooftop_bar.jpg";
import {useRef, useEffect, useState} from "react" 
import Button from "../components/button"
import { styles } from "../components/functions/openchat";
import ChatBox from "../components/chatBox";
import AutoplayVideo from "../components/autoplayVideo";
import video from "../assets/NCTU_Teaser_TAEYONG.mp4"; 


export default function Lobby({}) {

// const chatRef = useRef(null); 

    let key = localStorage.getItem("key")
    console.log(key)

    const [gameMode, setGameMode] = useState ({
        mode : ""
    })

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
                
    }}>
    <div style={{
        margin: "2vw",
        padding: "2vw",
        display: "flex", 
        flexDirection: "column",
        justifyContent:"center",
        backgroundColor: "black", 
        border:"solid 2px #ff1493",
        color: "white",
        fontFamily : "BBH Sans Bartle",
        fontSize: "2vw",
        position:"relative",
        height:"80%",
    }}>
        <h2 style={{position:"relative", padding: "1vw", textAlign:"center"}}>Ready?</h2>
        <Button style={{position:"relative"}} onClick={() => setGameplayMode("PVP")}>Player Vs Mode</Button>
        <Button style={{position:"relative"}} onClick={() => setGameplayMode("TRAINING")}>Training Mode</Button>
    </div>
    <div style={{
        display:"flex",
        flexDirection:"column",
        margin:"2vw",
        padding:"2vw",
        }}>

        {/* on utilise { } pour les valeurs dynamiques (variables, fonction, expression), qui ne sont pas du html*/}
        {/* pour utilise ${ } dans une string, on utilise ` `         */}
        {/* <iframe ref={chatRef} border-radius="50px" width={750} height={500} onLoad={applyStyles} src={`https://magix.apps-de-cours.com/server/chat/${key}`}></iframe>  */}
       
        {/* <video autoPlay loop muted style={{
                   width:"80%", 
                   height:"80%",
                   objectFit:"cover",
                   objectPosition:"center",
               }}>
                <source src={video} type="video/mp4"></source>
        </video> */}
        <AutoplayVideo></AutoplayVideo>
        <ChatBox></ChatBox>

    </div>
        
    </div>
    </MainLayout>
    </>
}