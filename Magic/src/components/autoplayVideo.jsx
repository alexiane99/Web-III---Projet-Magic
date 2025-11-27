import video from "../assets/NCTU_Teaser_TAEYONG.mp4"; 

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
        <video autoPlay loop muted style={{
            width:"70%", 
            height:"70%",
            objectFit:"cover",
            objectPosition:"center",
            position:"relative"
        }}>
            <source src={video} type="video/mp4"></source>
        </video>
    </div>
    )
}