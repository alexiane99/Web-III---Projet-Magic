import {NavLink} from "react-router"

export default function MainLayout({children}) {
    
    return (
        <>
        <header></header>
        <nav>
            {/* temporaire, juste pour avoir accès plsu facilement aux tables */}
            <NavLink to="/">Login</NavLink>
            <NavLink to="/">Lobby</NavLink>
            <NavLink to="/">Jeu</NavLink>
            <NavLink to="/">Infos</NavLink>
        </nav>
        <main>{children}</main>
        <footer></footer>

        </>
    )
}