import Carte from "../components/carte";
import {useEffect, useState} from "react"; 

export default function Game({}) {
    return <>

    <div style={{

        display: "flex",
        flexDirection: "column",
        justifyContent: "center"

    }}> 
        <div style={{

            display:"flex", 
            flexDirection: "row", 
            justifyContent: "center"

        }}>
            <Carte><h1>Cocona</h1></Carte>
            <Carte><h1>Cocona</h1></Carte>
            <Carte><h1>Cocona</h1></Carte>
            <Carte><h1>Cocona</h1></Carte>
            
        </div>
            <div style={{

            display:"flex", 
            flexDirection: "row", 
            justifyContent: "center"

        }}>
            <Carte><h1>Cocona</h1></Carte>
            <Carte><h1>Cocona</h1></Carte>
            <Carte><h1>Cocona</h1></Carte>
            <Carte><h1>Cocona</h1></Carte>
            
        </div>
    </div>
    
    </>

}