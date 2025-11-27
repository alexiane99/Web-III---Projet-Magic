import { liste_gif } from "../data/liste_gif"

export default function LoopGif({id}) {


    return (
        <div>
        <img src={liste_gif[id].path} style={{
            height:"200px",
            width:"300px",
            transform:"rotateY(360deg)"
        }}></img>
        {/* <div style={{
            height:"200px",
            width:"300px",
            backgroundColor:"black",
            transform:"rotateY(360deg)"
        }}>
        </div> */}
        </div>
    )
}