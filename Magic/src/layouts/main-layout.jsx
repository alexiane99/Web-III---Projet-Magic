import {NavLink} from "react-router"
import { handleLogoutProgram } from "../components/functions/loggout"
import '../css/global.css'

export default function MainLayout({children}) {
    
    return (
        <>
        <header></header>
        <nav style={{fontFamily:"BBH Sans Bartle", display:"flex", justifyContent:"space-between"}}>
            {/* temporaire, juste pour avoir accès plsu facilement aux tables */}
            <NavLink to="/lobby">Lobby</NavLink>
            <NavLink to="/deck">Deck</NavLink>
            <NavLink to="/game">Game</NavLink>
            <NavLink to="/cards">Cards</NavLink>
            <NavLink to="/infos">Infos</NavLink>
            <NavLink to="/" onClick={handleLogoutProgram}>Loggout</NavLink>
        </nav>
        <main>{children}</main>
        <footer></footer>

        </>
    )
}