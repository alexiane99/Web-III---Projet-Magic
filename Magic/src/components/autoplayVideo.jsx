import video from "../assets/NCTU_Teaser_TAEYONG.mp4"; 

export default function AutoplayVideo() {

    return (

    <div style={{
        // display:"flex", 
        // justifyContent:"center",
        margin:"0",
        padding:"0",
        height:"100vh",
        width:"100%",
        overflow:"hidden",
        position:"relative",
        zIndex:"1",

    }}>
        <video autoPlay loop muted style={{
            width:"100%", 
            height:"100%",
            objectFit:"cover",
            objectPosition:"center",
        }}>
            <source src={video} type="video/mp4"></source>
        </video>
    </div>
    )
}