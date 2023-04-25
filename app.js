"use strict",

console.log("Hello Fetch API");

//Program State

const GIPHY_URL = "https://api.giphy.com/v1/gifs/translate";
const GIPHY_KEY = "B41tHrpNPHrmd6KmwA8QV7UgOuDeiPBc";


let savedGifs = [];
// Select Elements

let feedbackElement = document.querySelector("#feedback")
let searchInput = document.querySelector("#searchWord")
let searchBtn = document.querySelector("#submitSearch")
let gifEle = document.querySelector("#imageContainer > img");
let imageContainer = document.querySelector("#imageContainer");
let saveBtn = document.querySelector("#saveBtn");
let savedGifsContainer = document.querySelector("#savedGifs");
// Event Handlers

searchBtn.addEventListener("click", (event) => {
    getGif(searchInput.value);         
});

saveBtn.addEventListener("click", (event) => {
// save the current gif
savedGifs.push({ 
    src: gifEle.src,
     alt: gifEle.alt,
      id:gifEle.getAttribute("data-id"),
});


//add new gif to saved container

let newGif = document.createElement("img");
newGif.src = gifEle.src;
newGif.alt = gifEle.alt;
newGif.id = gifEle.getAttribute("data-id");
savedGifsContainer.prepend(newGif);

});


// function getGif(searchTerm) {
//     fetch(`${GIPHY_URL}?api_key=${GIPHY_KEY}&s=${searchInput.value}`)
//     .then((res) => res.json())
//     .then((body) => {
//                 //Show the gif on the dom
//                 gifEle.src = body.data.images.original.url;
//     })
//     .catch((err) => {
//         console.error(err);
//                 //SHow the error on dom
//                 feedbackEle.textContent = err.message;
//     });             
// }

async function getGif(searchTerm) {
    try{
        let res =  await fetch(`${GIPHY_URL}?api_key=${GIPHY_KEY}&s=${searchTerm}`);
        let body = await res.json();
        //Show gif on dom
        gifEle.src = body.data.images.original.url;
        //update alt
        gifEle.alt = body.data.title;
        //update data-id
        gifEle.setAttribute("data-id", body.data.id);
        //display image
        imageContainer.classList.remove("hidden");
    } catch (err) {
        console.error(err);
        // show err message on dom
        feedbackEle.textContent = err.message;
        //Hide img container
        imageContainer.classList.add("hidden");
    }
}

