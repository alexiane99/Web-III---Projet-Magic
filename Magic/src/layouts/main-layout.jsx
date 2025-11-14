import {NavLink} from "react-router"

export default function MainLayout({children}) {
    
    return (
        <>
        <header></header>
        <nav style={{fontFamily:"BBH Sans Bartle", display:"flex", justifyContent:"space-between"}}>
            {/* temporaire, juste pour avoir accès plsu facilement aux tables */}
            <NavLink to="/">Loggout</NavLink>
            <NavLink to="/lobby">Lobby</NavLink>
            <NavLink to="/cards">Game</NavLink>
            <NavLink to="/deck">Deck</NavLink>
            <NavLink to="/game">Game</NavLink>
        </nav>
        <main>{children}</main>
        <footer></footer>

        </>
    )
}