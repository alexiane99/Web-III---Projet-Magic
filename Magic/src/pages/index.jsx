
import background from "../assets/img/resto_background.png"; 

// https://upmostly.com/tutorials/react-background-image

export default function Index() {

  //titleColor = "white"

  return  <>
            <div style={{
                backgroundImage : `URL(${background})`, 
                backgroundRepeat: "no-repeat" , 
                backgroundSize : "cover", 
                height: "100vh",
                backgroundPosition: "bottom-center", 
                overflow: "hidden",
               
              }}> 
              <div style={{

                display: "flex",
                justifyContent: "center",
               
              }}>
                <div style={{
                          
                  backgroundColor : "black",
                  color: "white",

                }}>
                <form>
                    <div style={{
                      margin : "2vw",
                      fontSize : "1.2vw",
                      fontFamily : "BBH Sans Bartle",
                      

                    }}>
                    <h1 style={{ color : "white", textAlign : "center"}}>Connexion</h1>
                    <div style={{margin : "2vw"}}>
                        Nom d'utilisateur : 
                    <input style={{marginInlineStart : "1vw", marginInlineEnd: "0vw"}} type=""></input>
                    </div>
                    <div style={{margin : "2vw"}}>
                        Mot de passe : 
                    <input style={{marginInlineStart : "1vw", marginInlineEnd: "0vw"}} type=""></input>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </>
}
