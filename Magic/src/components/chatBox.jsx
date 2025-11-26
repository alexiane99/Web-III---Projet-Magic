
export default function chatBox({chatRef, applyStyles}) {

    return (

          <iframe ref={chatRef} border-radius="50px" width={750} height={500} onLoad={applyStyles} src={`https://magix.apps-de-cours.com/server/chat/${key}`}></iframe> 
    )

}