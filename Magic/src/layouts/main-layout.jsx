import {NavLink} from "react-router"

export default function MainLayout({children}) {
    
    return (
        <>
        <header></header>
        <nav style={{fontFamily:"BBH Sans Bartle"}}>
            {/* temporaire, juste pour avoir accès plsu facilement aux tables */}
            <NavLink to="/">Loggout</NavLink>
            <NavLink to="/lobby">Lobby</NavLink>
            <NavLink to="/Game">Game</NavLink>
        </nav>
        <main>{children}</main>
        <footer></footer>

        </>
    )
}