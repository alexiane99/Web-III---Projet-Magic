import frame from "../assets/img/profile_frame.png"
import avatar from "../assets/img/Cocona.jpg"

export default function Profile({children}) {

    return <div style={{

        // image: `URL(${frame})`,
        // minWidth:"30vw",
        position:"relative",

    }}>
    <img src={avatar}
    style={{
        position:"absolute",
        borderRadius:"50%",
        width:"100%",
        height:"100%",

    }}>
    </img>
     <img src={frame}
     style={{
        position:"absolute",
        width:"100%",
        height:"100%",
     }}>
    </img>

    {children}
    Player 
    </div>
}