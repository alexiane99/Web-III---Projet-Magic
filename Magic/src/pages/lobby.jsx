import background from "../assets/img/rooftop_bar.jpg";
import {useRef, useEffect} from "react" 
import Button from "../components/button"

export default function Lobby({}) {

const chatRef = useRef(null); 

    let key = localStorage.getItem("key")
    console.log(key)

    const applyStyles = () => {

        let styles = {

            fontColor : "#333",
            backgroundColor : "rgba(87, 41, 5, 0.2)",
            fontGoogleName : "Sofia",
            fontSize : "20px",
            hideIcons : false, // (or true),
            inputBackgroundColor : "red",
            inputFontColor : "blue",
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

    useEffect(() => { })

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
                
    }}> 

    <div style={{

        margin: "2vw",
        padding: "2.5vw",
        display: "flex", 
        justifyContent: "space-around",
        flexDirection: "row",
        backgroundColor: "black", 
        color: "white",
        fontFamily : "BBH Sans Bartle",
        fontSize: "2vw",
        height: "15vh"
    }}>
        <h2 style={{padding: "1.5vw", textAlign: "center"}}>Ready?</h2>
        <div style={{ justifyContent: "space-between"}}>
            <Button>Play Game</Button>
            <Button onClick={e => handleLogoutProgram(e)}>Quit Game</Button>
            
        </div>
        
    </div>

    <div style={{

        display: "flex", 
        justifyContent: "end", 
        alignContent: "flex-end",
    

    }}>

    {/* on utilise { } pour les valeurs dynamiques (variables, fonction, expression), qui ne sont pas du html*/}
    {/* pour utilise ${ } dans une string, on utilise ` `         */}
    <iframe ref={chatRef} width={700} height={240} onLoad={applyStyles()} src={`https://magix.apps-de-cours.com/server/chat/${key}`}></iframe> 
    </div>
   
    </div>
    </>
}