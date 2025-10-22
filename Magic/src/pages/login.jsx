
import background from "../assets/img/resto_background.png";
import { useEffect, useState} from "react"; 
import Button from "../components/button"

// https://upmostly.com/tutorials/react-background-image

// vérifier la connection??  https://magix.apps-de-cours.com/server/users 

export default function Login({}) {

  const [addUserForm, setUserForm] = useState({
    username : "",
    password : "",

  }); 
  // const [userName, setUserName] = useState(null)


  // useEffect(() => {

  //   fetch("/api/Login.php")
  //   .then(response => response.json())
  //   .then(data => {
  //     setUserName(data); 
  //   })
  // }, []); 

  const handleLoginProgram = (e) => {
    e.preventDefault();

    let formData = new FormData()
    formData.append("username", addUserForm.username); //$_POST["username"]
    formData.append("password", addUserForm.password); //$_POST["password"]

    fetch("/api/Login.php", { //"/api/Login.php"
      method: "POST",
      body : formData
    })
    .then(response => 
      //console.log(response), 

      response.json() 
    )

    .then(data => {

      console.log(data)

      window.location.href = "lobby.jsx" //"https://magix.apps-de-cours.com/server/users"

    })

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
                <form action="login.jsx" method="post" type="submit" onSubmit={e => handleLoginProgram(e)}>
                    <div style={{
                      margin : "2vw",
                      fontSize : "1.2vw",
                      fontFamily : "BBH Sans Bartle",
                      
                     

                    }}>
                    <h1 style={{ color : "white", textAlign : "center"}}>Connexion</h1>
                    <div style={{margin : "2vw"}}>
                        Nom d'utilisateur : 
                    <input type="text" name="username" id="username" value={addUserForm.username} onChange={(e) => setUserForm({...addUserForm, username : e.target.value})} style={{marginInlineStart : "1vw", marginInlineEnd: "0vw"}}></input>
                    </div>
                    <div style={{margin : "2vw"}}>
                        Mot de passe : 
                    <input type="password" name="password" id="password" value={addUserForm.password} onChange={(e) => setUserForm({...addUserForm, password : e.target.value})} style={{marginInlineStart : "1vw", marginInlineEnd: "0vw"}}></input>
                    <div style={{ 
                      display : "flex", 
                      justifyContent : "center", 
                      margin : "2vw",
                    }}>
                      <Button type="submit">Envoyer</Button>
                    </div>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </>

}