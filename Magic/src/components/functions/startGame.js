
export function startGame({type}) {

    let formData = new FormData()

    if(type === "PVP") {
        type = "PVP"
    }
    
    if(type === "TRAINING") {
        type = "TRAINING"
    }

    //harcode, à vérifier
    formData.append("type", type)
    // formData.append("mode", "STANDARD")

    fetch("/api/gamemode.php", {
        method:"POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        if(data == "JOINED_PVP" || data == "JOINED_TRAINING") {

            window.location.href = "/game"

        }

    })



}