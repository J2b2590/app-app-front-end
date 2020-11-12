console.log("TESTING TOM")
let newApp = false;
let userFavorites = false;
let appetizersEndpoint = "http://localhost:3000/appetizers"
let favoritesEndpoint = "http://localhost:3000/favorites"


const appAddBtn = document.querySelector("#new-app-id")
const appFormContainer = document.querySelector(".new-app-form")
const contFluid = document.getElementsByClassName("container-fluid")[0]


function main(){
    getApp()
}



function getApp(){
    fetch("http://localhost:3000/appetizers")
      .then(resp => resp.json())
      .then(apps =>{
        // console.log(apps,"Call")
        apps.forEach(app => renderApp(app))
    })
  }

  function renderApp(app){
    // console.log(app.image_src)
    const lastDiv = document.createElement('div')
    lastDiv.className = "row"
    const notLastDiv = document.createElement('div')
    notLastDiv.className = "col"
    const firstDiv = document.createElement('div')
    firstDiv.className = "card shadow p-3 mb-5 bg-white rounded flex-fill front"
    firstDiv.style.width = "18rem"
    const imgTag = document.createElement("img")
    imgTag.className = "img-thumbnail"
    imgTag.src = app.image_src
    const secondDiv = document.createElement('div')
    secondDiv.className = "card-body"
    const thirdDiv = document.createElement('div')
    thirdDiv.className = "card-face front"
    const fourthDiv = document.createElement('div')
    fourthDiv.className = "inside-info"
    const fifthDiv = document.createElement('div')
    fifthDiv.className = "arrows"
    const h5 = document.createElement('h5')
    h5.className = "card-title"
    h5.innerText = `${app.title}`
    ///upArrow img
    let upArrow = document.createElement("img");
    upArrow.src = "./assets/up.png";
    upArrow.className = "arrowImg"
    ///downArrow img
    let downArrow = document.createElement("img");
    downArrow.src = "./assets/down.png";
    downArrow.className = "arrowImg"
    ////heart img
    let heartImg = document.createElement("img");
    heartImg.src = "./assets/heart.png"
    heartImg.className = "heartImg"

    // const firstSvg = document.createElement("SVG")
    // firstSvg.style.width = "2em"
    // firstSvg.style.height = "2em"
    // firstSvg.className = "bi bi-caret-up"
    // firstSvg.viewBox = "0 0 16 16"
    // firstSvg.setAttribute("fill", "currentColor")
    // firstSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")

    // const firstPath = document.createElement("path")
    // firstPath.setAttribute("d", "M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z")
    // firstPath.setAttribute("fill-rule", "evenodd")

    const secondSvg = document.createElement("SVG")
    secondSvg.style.width = "2em"
    secondSvg.style.height = "2em"
    secondSvg.className = "bi bi-caret-down"
    secondSvg.viewBox = "0 0 16 16"
    secondSvg.setAttribute("fill", "currentColor")
    secondSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")

    const secondPath = document.createElement("path")
    secondPath.setAttribute("d", "M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z")
    secondPath.setAttribute("fill-rule", "evenodd")

    const p = document.createElement("p")
    p.innerText = `Likes: ${app.rating}`


    firstDiv.appendChild(imgTag)
    firstDiv.appendChild(secondDiv)
    secondDiv.appendChild(thirdDiv)
    thirdDiv.appendChild(fourthDiv)
    fourthDiv.appendChild(h5)
    fourthDiv.appendChild(fifthDiv)
    fifthDiv.appendChild(upArrow)
    fifthDiv.appendChild(downArrow)
    fifthDiv.appendChild(heartImg)
    // firstSvg.appendChild(firstPath)
    fifthDiv.appendChild(secondSvg)
    secondSvg.appendChild(secondPath)
    fourthDiv.appendChild(p)
    notLastDiv.appendChild(firstDiv)
    lastDiv.appendChild(notLastDiv)
    contFluid.appendChild(lastDiv)
}


appAddBtn.addEventListener("click", () =>{

    newApp = !newApp;

    if(newApp){
        appFormContainer.style.display = "block";
    } else {
        appFormContainer.style.display = "none"
    };
});

const userFaveBtn = document.querySelector("#user-favs-id")
const userFaves = document.querySelector(".user-favs")
userFaveBtn.addEventListener("click", () =>{
    userFavorites = !userFavorites;
    fetchFavorites()
    if(userFavorites){
        userFaves.style.display = "block";
    } else {
        userFaves.style.display = "none"
    };
});

function fetchFavorites () {
    fetch("http://localhost:3000/appetizers")
      .then(resp => resp.json())
      .then(faves =>{
        userFaves.innerHTML = ""
        faves.forEach(fave => renderFavorite(fave))
    })
}

function renderFavorite (fave) {
    if(fave.favorites.length > 0){
        const faveCard = document.createElement("div")
        const faveImg = document.createElement("img")
        const faveTitle = document.createElement("h6")
        const removeFaveBtn = document.createElement("button")

        faveCard.setAttribute("class", "fave-card")
        faveImg.setAttribute("class", "fave-image")
        faveImg.src = fave.image_src
        faveTitle.innerText = fave.title
        removeFaveBtn.setAttribute("data-id",`${fave.favorites[0].id}`)
        removeFaveBtn.setAttribute("class","delete-btn")
        removeFaveBtn.innerText = "Remove"

        removeFaveBtn.addEventListener("click", () => {
            fetch(appetizersEndpoint+"/"+fave.favorites[0].id, {
                method: "DELETE"
            })
        })

        faveCard.append(faveImg, faveTitle, removeFaveBtn)
        userFaves.append(faveCard)
    }
}

main()