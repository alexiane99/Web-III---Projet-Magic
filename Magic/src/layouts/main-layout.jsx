import {NavLink} from "react-router"
import {useRef} from "react"
import { handleLogoutProgram } from "../components/functions/loggout"
import { startGame } from "../components/functions/startGame"
import '../css/global.css'

export default function MainLayout({children}) {
    
    return (
        <>
        <header></header>
        <nav className="nav" style={{
            fontFamily:"BBH Sans Bartle", 
            display:"flex", 
            justifyContent:"space-between",
            backgroundColor:"black",
            
            }}>
            {/* temporaire, juste pour avoir accès plsu facilement aux tables */}
            <NavLink to="/lobby">Lobby</NavLink>
            <NavLink to="/deck">Deck</NavLink>
            {/* <NavLink to="/game" onClick={startGame}>Game</NavLink> */}
            <NavLink to="/cards">Cards</NavLink>
            <NavLink to="/infos">Infos</NavLink>
            <NavLink to="/" onClick={handleLogoutProgram}>Loggout</NavLink>
        </nav>
        <main>{children}</main>
        <footer></footer>

        </>
    )
}