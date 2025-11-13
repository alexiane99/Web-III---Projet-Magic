import frame from "../assets/img/profile_frame.png"
import avatar from "../assets/img/Cocona.jpg"

export default function Profile({children}) {

    return <div style={{
        // image: `URL(${frame})`,
        position:"relative",
        aspectRatio:"1/1",
        width:"8vw",
        top:"10%",
        zIndex:"10",
        display:"flex",
        justifyContent:"center",

    }}>
    <img src={avatar}
    style={{
        position:"absolute",
        borderRadius:"50%",
        width:"100%",
        height:"100%",
        objectFit:"cover",

    }}>
    </img>
     {/* <img src={frame}
     style={{
        position:"absolute",
        width:"100%",
        height:"100%",
     }}>
    </img> */}

    {children}
    Player
    </div>
}