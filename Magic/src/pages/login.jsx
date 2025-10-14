
import background from "../assets/img/resto_background.png";
import { useEffect} from "react"; 

// https://upmostly.com/tutorials/react-background-image

export default function Login() {

  //titleColor = "white"

  const verif_user = () => { // permet d'attendre avant d'être exécuté

    // useEffect(() => { // useEffect???

    console.log("page loaded");

    fetch("/api/Login.php")
    .then(response => response.json())
    .then(data => {

      var_dump(data);
      var_dump(data["username"]);
      var_dump(data["password"]);

    })


  // }, []); 
  }

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
                <form action="" method="post" type="submit">
                    <div style={{
                      margin : "2vw",
                      fontSize : "1.2vw",
                      fontFamily : "BBH Sans Bartle",
                      
                     

                    }}>
                    <h1 style={{ color : "white", textAlign : "center"}}>Connexion</h1>
                    <div style={{margin : "2vw"}}>
                        Nom d'utilisateur : 
                    <input type="text" name="username" id="username" style={{marginInlineStart : "1vw", marginInlineEnd: "0vw"}}></input>
                    </div>
                    <div style={{margin : "2vw"}}>
                        Mot de passe : 
                    <input type="password" name="pwd" id="password" style={{marginInlineStart : "1vw", marginInlineEnd: "0vw"}}></input>
                    <div style={{ 
                      display : "flex", 
                      justifyContent : "center", 
                      margin : "2vw",
                    }}>
                      <button onClick={verif_user}>Envoyer</button>
                    </div>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </>
}
