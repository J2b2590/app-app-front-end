console.log("TESTING JEFF")
let newApp = false;

const appAddBtn = document.querySelector("#new-app-id")
const appFormContainer = document.querySelector(".new-app-form")

// const card = document.querySelector(".card")

// const BASE_URL = "http://localhost:3000/appetizers"




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


appAddBtn.addEventListener("click", () =>{

    newApp = !newApp;

    if(newApp){
        appFormContainer.style.display = "block";
    } else {
        appFormContainer.style.display = "none"
    };
});


function renderApp(app){
    // console.log(app.image_src)
    const imgTag = document.querySelector(".img-thumbnail")
    imgTag.src = app.image_src

    const hFive = document.querySelector(".card-title")
    hFive.innerHTML = app.title
}





main()