
import background from "../assets/img/resto_background.png"; 
// https://upmostly.com/tutorials/react-background-image

export default function Index() {
  return  <>
            <div style={ {
              backgroundImage : `URL(${background})`, 
              backgroundRepeat: "no-repeat" , 
              backgroundSize : "cover", 
              height: "100vh",
              backgroundPosition: "bottom-center", 
              overflow: "hidden"
            }}> 
                <h1>Oka</h1>
                <div className="blue">
                    <form>
                        <div className>
                           <div className>
                              Nom d'utilisateur : 
                            <input type=""></input>
                          </div>
                          <div className>
                              Mot de passe : 
                            <input type=""></input>
                          </div>
                        </div>
                    </form>
                </div>
            </div>
          </>
}
