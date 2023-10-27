// window.onload = init();

const memorySize = 8;

var donnees = {
    "legumes" : [
        {"src" : "ressources/memory-legume/1.svg"},
        {"src" : "ressources/memory-legume/2.svg"},
        {"src" : "ressources/memory-legume/3.svg"},
        {"src" : "ressources/memory-legume/4.svg"},
        {"src" : "ressources/memory-legume/5.svg"},
        {"src" : "ressources/memory-legume/6.svg"}
    ],

    "chiens" : [

    ]
}; 

getCards();

// function init() {
    
//     getCards();
// }

function getCards() {
    var noCards = memorySize / 2;
    var i = 0;
    var arrayMemory = [];
    do {
        var noRandom = Math.floor(Math.random() * (donnees.legumes.length));
        if (!arrayMemory.includes(noRandom)) {
            arrayMemory.push(noRandom, noRandom);
            i++;
        }
    } while( i < noCards );

    arrayMemory.sort( () => Math.random() - 0.5 );


    var table = document.getElementById("table");
    
    arrayMemory.forEach(element => {
        var card = donnees.legumes[element].src;
        var img = document.createElement("img");
        
        img.setAttribute("src", card);
        table.appendChild(img);
    });
}

