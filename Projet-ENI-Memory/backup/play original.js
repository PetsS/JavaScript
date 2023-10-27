// window.onload = init;

const memorySize = 8;
let arrayMemory = [];
let drawCard = 0;

// function init() {
//     document.querySelector("img").addEventListener("click", turnCards);

// }

fetch('images.json')
    .then(reponse => reponse.json())
    .then(images => getCards(images));



function getCards(images) {
    var noCards = memorySize / 2;
    var i = 0;

    do {
        var noRandom = Math.floor(Math.random() * (images.legumes.length));
        if (!arrayMemory.includes(noRandom)) {
            arrayMemory.push(noRandom, noRandom);
            i++;
        }
    } while (i < noCards);

    arrayMemory.sort(() => Math.random() - 0.5);

    

    displayCardsHidden(images);
    // displayCards(images);
}

function displayCards(images) {
    var memoryTable = document.getElementById("memoryTable");
    
    arrayMemory.forEach(element => {
        var card = images.legumes[element].src;
        var img = document.createElement("img");

        img.setAttribute("src", card);
        memoryTable.appendChild(img);
    });
}

function displayCardsHidden(images) {
    var memoryTable = document.getElementById("memoryTable");

    arrayMemory.forEach(element => {
        var cardHidden = images.question;
        
        var img = document.createElement("img");

        img.setAttribute("src", cardHidden);
        img.setAttribute("id", element);
        img.setAttribute("data-id", element);
        img.setAttribute("onclick", "turnCards()");
        memoryTable.appendChild(img);

        document.getElementById(element).onclick = function() {turnCards(element, images)};
        
    });

    console.log("arrayMemory : " + arrayMemory)
}


function turnCards(element, images) {
    console.log(element);

    var card = document.getElementById(element);
    var picture = images.legumes[element].src;
    drawCard = drawCard + 1;

    if (drawCard < 3) {
        card.setAttribute("src", picture);
    } else {
        arrayMemory.forEach(element => {
            document.getElementById(element).setAttribute("src", "ressources/question.svg");
        });

        card.setAttribute("src", "ressources/question.svg");
        drawCard = 0;
    }
      
}

