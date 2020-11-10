console.log("TESTING TOM")
let newApp = false;
let userFavorites = false;
let appetizersEndpoint = "http://localhost:3000/appetizers"
let favoritesEndpoint = "http://localhost:3000/favorites"

function ce(tag){
    return document.createElement(tag)
}

const appAddBtn = document.querySelector("#new-app-id")
const appFormContainer = document.querySelector(".new-app-form")

const card = document.querySelector(".card")

function main(){
    getApp()
}

function getApp(){
    fetch("http://localhost:3000/appetizers")
      .then(resp => resp.json())
      .then(apps =>{
        console.log(apps,"Call")
        apps.forEach(app => renderApp(app))
    })
  }

  function renderApp(app){
    // console.log(app.image_src)
    const imgTag = document.querySelector(".card-img-top")
    imgTag.src = app.image_src

    const hFive = document.querySelector(".card-title")
    hFive.innerHTML = app.title
}


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
    .then(resp => resp.json)
    .then(faves => console.log(faves))
}

main()