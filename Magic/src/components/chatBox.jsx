
export default function ChatBox({chatRef}) {

    let key = localStorage.getItem("key")
    console.log(key)

    const applyStyles = (chatRef) => {

        setTimeout(() => {

            chatRef.current.contentWindow.postMessage(JSON.stringify(styles), "*");
        }, 100);
    }

    const styles = {

            fontColor : "white",
            backgroundColor : "black",
            fontGoogleName:"Rock Salt", 
            fontSize : "15px",
            hideIcons : false, // (or true),
            inputBackgroundColor : "#f1f1f1",
            inputFontColor : "black",
            width:"750px",
            height : "500px",
            padding: "5px",
            memberListFontColor : "#ff00dd",
            borderColor : "blue",
            memberListBackgroundColor : "white",
            hideScrollBar: true, // pour cacher le scroll bar

    }

    return (
        <>
            <iframe ref={chatRef} border-radius="50px" width={750} height={500} onLoad={applyStyles} src={`https://magix.apps-de-cours.com/server/chat/${key}`}></iframe> 
        
        </>
    )

}