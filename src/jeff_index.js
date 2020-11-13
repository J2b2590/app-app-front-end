console.log("TESTING TOM")
let newApp = false;

let appetizersEndpoint = "http://localhost:3000/appetizers"
let favoritesEndpoint = "http://localhost:3000/favorites"

const appForm = document.getElementById("form-form")
const appAddBtn = document.querySelector("#new-app-id")
const appFormContainer = document.querySelector(".new-app-form")
const contFluid = document.getElementsByClassName("container-fluid")[0]
const carouselInner = document.querySelector(".carousel-inner")
const cardsDiv = document.createElement("div")

function main(){
    getApp()
    fetchFavorites()
}

function getApp(){
    fetch("http://localhost:3000/appetizers")
      .then(resp => resp.json())
      .then(apps =>{
        // console.log(apps,"Call")
        cardsDiv.innerHTML = ""
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
    firstDiv.className = "card shadow mb-5 bg-white rounded flex-fill front"
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
    const firstSvg = document.createElement("SVG")
    firstSvg.style.width = "2em"
    firstSvg.style.height = "2em"
    firstSvg.className = "bi bi-caret-up"
    firstSvg.viewBox = "0 0 16 16"
    firstSvg.setAttribute("fill", "currentColor")
    firstSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")

    const firstPath = document.createElement("path")
    firstPath.setAttribute("d", "M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z")
    firstPath.setAttribute("fill-rule", "evenodd")

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

    /////////UP ARROW
    const addUpArrow = document.createElement("button")
    addUpArrow.setAttribute("class", "btn btn-primary")
    addUpArrow.setAttribute("data-id", `${app.id}`)
    addUpArrow.innerText = "↑"

     addUpArrow.addEventListener("click", (e) => {
        const updatedLikes = app.rating + 1
        const formData = {
            rating: updatedLikes
        }
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch(appetizersEndpoint+"/"+app.id, reqObj)
        .then(resp => resp.json())
        .then(updatedApp => {
             getApp()
        })

     })


    /////////DOWN ARROW
    const addDownArrow = document.createElement("button")
    addDownArrow.setAttribute("class", "btn btn-info")
    addDownArrow.setAttribute("data-id", `${app.id}`)
    addDownArrow.innerText = "↓"

    addDownArrow.addEventListener("click", (e) => {
        const updatedLikes = app.rating - 1
        const formData = {
            rating: updatedLikes
        }
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch(appetizersEndpoint+"/"+app.id, reqObj)
        .then(resp => resp.json())
        .then(updatedApp => {
             getApp()
        })

    })

    //////////// FAVE BUTTON & LISTENER
    const addFaveBtn = document.createElement("button")
    addFaveBtn.setAttribute("class", "btn btn-danger")
    addFaveBtn.setAttribute("data-id", `${app.id}`)
    addFaveBtn.innerText = "❤"

    addFaveBtn.addEventListener("click", (e) => {
        const appID = parseInt(e.target.dataset.id)
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: 1,
                appetizer_id: appID
            })
        }
        fetch(favoritesEndpoint, reqObj)
        .then(resp => {
            console.log(resp)
            resp.json()
        })
        .then(newFave => {
            console.log(newFave)
            fetchFavorites()
        })
    })


    firstDiv.appendChild(imgTag)
    firstDiv.appendChild(secondDiv)
    secondDiv.appendChild(thirdDiv)
    thirdDiv.appendChild(fourthDiv)
    fourthDiv.appendChild(h5)
    fourthDiv.appendChild(fifthDiv)
    fifthDiv.appendChild(firstSvg)
    firstSvg.appendChild(firstPath)
    fifthDiv.appendChild(secondSvg)
    secondSvg.appendChild(secondPath)
    fourthDiv.appendChild(p)
    fourthDiv.appendChild(addDownArrow)
    fourthDiv.appendChild(addFaveBtn)
    fourthDiv.appendChild(addUpArrow)
    notLastDiv.appendChild(firstDiv)
    lastDiv.appendChild(notLastDiv)
    cardsDiv.appendChild(lastDiv)
    contFluid.appendChild(cardsDiv)
}

appForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const appTitle = e.target.children[0].children[0].children[0].value
    const appImage = e.target.children[0].children[1].children[0].value
    e.target.reset()

    const formData = {
        title: appTitle,
        image_src: appImage,
        rating: Math.floor(Math.random() * 200) + 1
    }
    const reqObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }
    fetch(appetizersEndpoint, reqObj)
    .then(resp => resp.json())
    .then(appetizer => {
        appetizer.errors ? window.alert("This appetizer is already in the database.") : getApp()
    })
    appFormContainer.style.display = "none"
})

appAddBtn.addEventListener("click", () =>{

    newApp = !newApp;

    if(newApp){
        appFormContainer.style.display = "block";
    } else {
        appFormContainer.style.display = "none"
    };
});


function fetchFavorites () {
    fetch("http://localhost:3000/appetizers")
      .then(resp => resp.json())
      .then(faves =>{
        carouselInner.innerHTML = ""
        faves.forEach(fave => renderFavorite(fave))
    })
}

function renderFavorite (fave) {
    if(fave.favorites.length > 0){
        const activeCard = document.createElement("div")
        const faveCard = document.createElement("div")
        const faveImg = document.createElement("img")
        const cardCaption = document.createElement("div")
        const faveTitle = document.createElement("p")
        const removeFaveBtn = document.createElement("button")

        activeCard.setAttribute("class", "carousel-item active")
        faveCard.setAttribute("class", "carousel-item")
        faveImg.setAttribute("class", "d-block w-10")
        faveImg.src = fave.image_src
        cardCaption.setAttribute("class", "carousel-caption d-none d-md-block")
        faveTitle.innerText = fave.title
        removeFaveBtn.setAttribute("data-id",`${fave.favorites[0].id}`)
        removeFaveBtn.setAttribute("id","delete-btn")
        removeFaveBtn.setAttribute("class","btn btn-danger")
        removeFaveBtn.innerText = "X"

        removeFaveBtn.addEventListener("click", () => {
            fetch(favoritesEndpoint+"/"+fave.favorites[0].id, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(deletedFave =>{
                // const cardToDelete = document.getElementsByClassName("carousel-item active")
                // cardToDelete.remove()
                fetchFavorites()
            })
        })

        cardCaption.append(faveTitle, removeFaveBtn)

        if (carouselInner.children.length === 0) {
            activeCard.append(faveImg, cardCaption)
            carouselInner.append(activeCard)
        } else {
            faveCard.append(faveImg, cardCaption)
            carouselInner.append(faveCard)
        }

    }
}

main()