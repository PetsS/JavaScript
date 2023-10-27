import { images } from "./images.js";

window.onload = init;

let user = document.getElementById("username");
let email = document.getElementById("email");
let selectMemory = document.getElementById("select-memory");
let selectSize = document.getElementById("select-size");
let imageMemory = document.getElementById("image-memory");
let submitButton = document.getElementById("submitButton");
let maxMemorySize = 0;
let memoryChoice = "";
let memorySize = 0;

let arrayTemp = [];

const userConnected = JSON.parse(localStorage.getItem("userconnected"));

function init() {

    displayUser();
    displayMemorySelection();
    selectMemory.addEventListener("change", choseMemory);
    selectSize.addEventListener("change", choseSize);
    submitButton.addEventListener("click", submitData);
}

function displayUser() {
    const pUser = document.createElement("p");
    const pEmail = document.createElement("p");
    const textNodeUser = document.createTextNode(userConnected[0].username);
    const textNodeEmail = document.createTextNode(userConnected[0].email);
    pUser.appendChild(textNodeUser);
    pEmail.appendChild(textNodeEmail);
    user.appendChild(pUser);
    email.appendChild(pEmail);
}

function displayMemorySelection() {

    // renvoie la longueur de l'objet 'images' par le nombre de keys.
    for (let i = 0; i < Object.keys(images).length; i++) {
        const option = document.createElement("option");
        option.text = Object.keys(images)[i];

        option.setAttribute("value", i);

        selectMemory.add(option);
    }
}

function displaySizeSelection() {
    // const option = document.createElement("option");
    // option.text = maxMemorySize;

    // selectSize.add(option);
    for (let i = 4; i <= maxMemorySize; i++) {
        const option = document.createElement("option");
        if ((i % 2) == 0) {
            option.text = i;
            option.setAttribute("value", option.text);
            selectSize.add(option);
        }

    }
}

function choseMemory() {

    if (this.value == 0) {
        emptySelection();
        imageMemory.setAttribute("src", "ressources/memory-legume/memory_detail.png");
        maxMemorySize = images.legumes.length;
        displaySizeSelection();
        memoryChoice = "legumes";
    } else if (this.value == 1) {
        emptySelection();
        imageMemory.setAttribute("src", "ressources/chiens/memory_details_chiens.png");
        maxMemorySize = images.chiens.length;
        displaySizeSelection();
        memoryChoice = "chiens";
    } else if (this.value == 2) {
        emptySelection();
        imageMemory.setAttribute("src", "ressources/dinosaures/memory_detail_dinosaures.png");
        maxMemorySize = images.dinosaures.length;
        displaySizeSelection();
        memoryChoice = "dinosaures";
    } else if (this.value == 3) {
        console.log("animaux");
        emptySelection();
        imageMemory.setAttribute("src", "ressources/animaux/memory_detail_animaux.png");
        maxMemorySize = images.animaux.length;
        displaySizeSelection();
        memoryChoice = "animaux";
    }
}

function choseSize() {
    memorySize = this.value;
}

function emptySelection() {
    while (selectSize.firstChild) {
        selectSize.removeChild(selectSize.firstChild);
    }
    const option = document.createElement("option");
    option.text = "Taille du Memory";
    selectSize.add(option);
}


function submitData() {

    let memory = memoryChoice;
    let size = memorySize;

    arrayTemp.push({
        "memory": memory,
        "size": size
    });

    localStorage.setItem("memory", JSON.stringify(arrayTemp));

    //appel login page
    window.location.href = "play.html";
}

