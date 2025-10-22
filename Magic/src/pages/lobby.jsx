import background from "../assets/img/rooftop_bar.jpg";
import {useRef} from "react" 

export default function Lobby({}) {

const chatRef = useRef(null); 

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


return  <>

    <div style={{
                backgroundImage : `URL(${background})`, 
                backgroundRepeat: "no-repeat" , 
                backgroundSize : "cover", 
                height: "100vh",
                backgroundPosition: "bottom-center", 
                overflow: "hidden",
                
                }}> 

    <iframe ref={chatRef} width={700} height={240} onLoad={applyStyles()} src="https://magix.apps-de-cours.com/server/chat/2Lff0pJOvsitrzPG4q3cUE2lwur4M70nPK0yZDHgG5BFLR4UNt"> 
    </iframe>
    
    </div>

    </>
}