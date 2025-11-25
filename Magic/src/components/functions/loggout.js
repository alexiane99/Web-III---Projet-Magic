    
export const handleLogoutProgram = (e) => {
    e.preventDefault(); 

    fetch("/api/logout.php", {
        method: "POST"
    })
    .then(response => response.json()) // response.text
    .then(data => { // txt

        console.log(data)

        window.location.href = "/"

    })
}