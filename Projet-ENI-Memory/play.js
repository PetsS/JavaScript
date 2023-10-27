import { images } from "./images.js";

window.onload = init;

// const memorySize = 4;
const memorySize = JSON.parse(localStorage.getItem("memory"))[0].size;
const memoryChoice = JSON.parse(localStorage.getItem("memory"))[0].memory;
let scoreTag = document.getElementById("score-counter");
let arrayMemory = [];
let counter = 0;
let card1 = 0;
let card2 = 0;
let revealedCardsCounter = 0;
let scoreCounter = 0;
let isClicked = true;

function init() {
    getCards();
    displayCardsHidden();
    document.body.onkeyup = replayKeySpace;
}

function getPictures() {
    let pictures;
    switch (memoryChoice) {
        case "legumes":
            pictures = images.legumes;
            break;
        case "chiens":
            pictures = images.chiens;
            break;
        case "dinosaures":
            pictures = images.dinosaures;
            break;
        case "animaux":
            pictures = images.animaux;
            break;
        default:
            break;
    }
    return pictures;
}

function getCards() {
    var noCards = memorySize / 2;
    var i = 0;

    do {
        var noRandom = Math.floor(Math.random() * (getPictures().length));
        if (!arrayMemory.includes(noRandom)) {
            arrayMemory.push(noRandom, noRandom);
            i++;
        }
    } while (i < noCards);

    arrayMemory.sort(() => Math.random() - 0.5);
}

function displayCardsHidden() {
    var memoryTable = document.getElementById("memoryTable");

    arrayMemory.forEach(element => {
        var cardHidden = "ressources/question.svg";
        var img = document.createElement("img");

        img.setAttribute("src", cardHidden);
        img.setAttribute("data-id", element);
        memoryTable.appendChild(img);
    });

    document.querySelectorAll("img").forEach(image => image.addEventListener("click", turnCards));

}

function turnCards(event) {

    if (isClicked) {
        let image = event.target;
        let dataId = image.dataset.id;
        let picture = getPictures()[dataId];

        image.setAttribute("src", picture);

        counter++;

        if (counter == 1) {
            card1 = image;
        }
        else {
            card2 = image;
            counter = 0;
            scoreCounter++;
            if (card1.getAttribute("src") != card2.getAttribute("src")) {
                isClicked = false;
                setTimeout(resetCards, 1000);
            } else {
                revealedCardsCounter = revealedCardsCounter + 2;
                isGameWin();
            }
            
console.log(scoreCounter);
            // displayScoreCount();
        }
    }

}

function resetCards() {
    card1.setAttribute("src", "ressources/question.svg");
    card2.setAttribute("src", "ressources/question.svg");
    isClicked = true;
}

function isGameWin() {
    if (revealedCardsCounter == memorySize) {
        if (confirm("Gagné! Votre score: " + scoreCounter +
            "\nVoulez vous rejouer?")) {
            replayButtonOK();
        } else {
            alert("Merci d'avoir joué!");
            window.location.href = "profil.html";
        }
    }
}

function replayKeySpace(e) {
    if (e.key == " ") {
        arrayMemory = [];
        counter = 0;
        card1 = 0;
        card2 = 0;
        revealedCardsCounter = 0;
        isClicked = true;
        scoreCounter = 0;
        emptyTable();
        getCards();
        displayCardsHidden();
    }
}

function replayButtonOK() {
    arrayMemory = [];
    counter = 0;
    card1 = 0;
    card2 = 0;
    revealedCardsCounter = 0;
    isClicked = true;
    scoreCounter = 0;
    emptyTable();
    getCards();
    displayCardsHidden();
}

function emptyTable() {
    let memoryTable = document.getElementById("memoryTable");
    while (memoryTable.firstChild) {
        memoryTable.removeChild(memoryTable.firstChild);
    }
}

function displayScoreCount() {
    let captionScore = document.createElement("caption");
    let textNodeScore = document.createTextNode(scoreCounter);
    
    captionScore.appendChild(textNodeScore);
    scoreTag.appendChild(captionScore);

    
}