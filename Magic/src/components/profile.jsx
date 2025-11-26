import frame from "../assets/img/profile_frame.png"
import avatar from "../assets/img/Cocona.jpg"

export default function Profile({children}) {

    return <div style={{
        // image: `URL(${frame})`,
        position:"relative",
        aspectRatio:"1/1",
        top:"10%",
        width:"7vw",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    }}>
    <img src={avatar}
    style={{
        position:"absolute",
        inset:"0",
        borderRadius:"50%",
        width:"95%",
        height:"90%",
        objectFit:"cover",
        transform:"translatex(5%)", 

    }}>
    </img>
    <img src={frame}
     style={{
        position:"absolute",
        width:"110%",
        height:"110%",
        zIndex:"2",
     }}>
    </img>

    {children}
    Player
    </div>
}