console.log("TESTING TOM")
let newApp = false;
let userFavorites = false;
let appetizersEndpoint = "http://localhost:3000/appetizers"
let favoritesEndpoint = "http://localhost:3000/favorites"

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

const userLoginBtn = document.querySelector("#user-favs-id")
const userLoginForm = document.querySelector(".user-favs")
userFaveBtn.addEventListener("click", () =>{

    userFavorites = !userFavorites;

    if(userFavorites){
        userFaves.style.display = "block";
    } else {
        userFaves.style.display = "none"
    };
});

function fetchFavorites () {
    fetch(favoritesEndpoint)
}

const userFaveBtn = document.querySelector("#user-favs-id")
const userFaves = document.querySelector(".user-favs")
userFaveBtn.addEventListener("click", () =>{

    userFavorites = !userFavorites;

    if(userFavorites){
        userFaves.style.display = "block";
    } else {
        userFaves.style.display = "none"
    };
});

function fetchFavorites () {
    fetch(favoritesEndpoint)
}