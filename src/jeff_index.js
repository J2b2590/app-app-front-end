console.log("TESTING JEFF")
let newApp = false;

const appAddBtn = document.querySelector("#new-app-id")
const appFormContainer = document.querySelector(".new-app-form")

const card = document.querySelector(".card")


appAddBtn.addEventListener("click", () =>{

    newApp = !newApp;

    if(newApp){
        appFormContainer.style.display = "block";
    } else {
        appFormContainer.style.display = "none"
    };
});

card.addEventListener("click", () =>{

    console.log("click")

    newApp = !newApp;

    if(newApp){
        card.classList.toggle("flipped")
    } else {
        console.log("help")
    };
});