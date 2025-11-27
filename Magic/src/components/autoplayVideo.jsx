import video from "../assets/NCTU_Teaser_TAEYONG.mp4"; 
import gif from "../assets/gif/taeyong.gif";

export default function AutoplayVideo() {

    return (

    <div style={{
        display:"flex", 
        justifyContent:"center",
        height:"100vh",
        width:"100%",
        overflow:"hidden",
        // position:"relative",
        zIndex:"1",
    }}>
        <img src={gif} style={{height:"100%"}}></img>
        {/* <video autoPlay loop muted style={{
            width:"70%", 
            height:"70%",
            objectFit:"cover",
            objectPosition:"center",
            position:"relative"
        }}>
            <source src={video} type="video/mp4"></source>
        </video> */}
    </div>
    )
}