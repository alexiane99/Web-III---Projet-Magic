import LoopGif from "./loopGif"
import { liste_gif } from "../data/liste_gif"


export default function Carousel({}) {
    return (
        <>
        <div style={{
            display:"flex",
            flexDirection:"column",
            backgroundColor:"black",
            transform:"rotateY(360deg)"
        }}>
        {
            liste_gif.map((gif, index) => {

                return(
                    <LoopGif key={index} id={index}></LoopGif>
                )
            })
        }
        </div>
        </>
    )

}