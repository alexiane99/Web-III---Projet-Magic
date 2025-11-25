
export function startGame() {

    let formData = new FormData()

    //harcode, à vérifier
    formData.append("type", "TRAINING")
    formData.append("mode", "STANDARD")

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