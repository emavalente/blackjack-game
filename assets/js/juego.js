/*
* 2C = Two of Clubs = Dos de trebol
* 2D = Two of Diamonds = Dos de Diamante
* 2H = Two of Hearts = Dos de Corazones
* 2S = Two of Spades = Dos de Espadas

*/

// This Function create a new deck
let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['J', 'Q', 'K', 'A'];

let playerScore = 0,
    computerScore = 0;


// HTML References
const btnNew = document.querySelector('#btnNew');
const btnTake = document.querySelector('#btnTake');
const btnStop = document.querySelector('#btnStop');
const showScore = document.querySelectorAll('small'); // [<small></small>, <small></small>]
const playerCards = document.querySelector('#player-cards');
const computerCards = document.querySelector('#computer-cards');


// Function to creates a new Deck.
const createDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(i + type);
        };
    };

    for (let type of types) {
        for (let special of specials) {
            deck.push(special + type);
        };
    };

    deck = _.shuffle(deck);

};

createDeck();

// Function to take a card from deck
let card;

const takeCard = () => {

    if (deck.length === 0) {
        alert('No quedan mas cartas en el deck');
    } else {
        card = deck.shift();
    };

    return card
};

takeCard()

// Function card value.
const cardValue = (card) => {

    const value = card.substring(0, card.length - 1);

    // Other way than I find to resolve this case:
    // (card.length === 3) ? value = card[0] + card[1] : value = card[0];
    // console.log(value);

    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : parseInt(value);
};


// Computer-IA turn
const turnComputer = (minPoints) => {
    do {
        const card = takeCard();

        computerScore = computerScore + cardValue(card);

        showScore[1].innerText = computerScore;

        //  <img class="card" src="./assets/cartas/3C.png" alt="cartas" />

        const imgCard = document.createElement('img');
        imgCard.src = `./assets/cartas/${card}.png`;
        imgCard.classList.add('card');
        imgCard.alt = 'imagen de carta';
        computerCards.append(imgCard);

        if (minPoints > 21) {
            break;
        };

    } while (computerScore < minPoints && (minPoints <= 21));
};


const newGame = () => {
    playerScore = 0;
    computerScore = 0;
    btnTake.disabled = false;
    btnStop.disabled = false;
    showScore[0].innerText = 0;
    showScore[1].innerText = 0;

};


// Events
btnTake.addEventListener('click', function () {
    btnNew.disabled = true;

    const card = takeCard();

    playerScore = playerScore + cardValue(card);

    showScore[0].innerText = playerScore;

    //  <img class="card" src="./assets/cartas/3C.png" alt="cartas" />

    const imgCard = document.createElement('img');
    imgCard.src = `./assets/cartas/${card}.png`;
    imgCard.classList.add('card');
    imgCard.alt = 'imagen de carta';
    playerCards.append(imgCard);

    if (playerScore > 21) {
        console.warn('Ouch!, Perdiste...');
        btnTake.disabled = true;
        btnStop.disabled = true;
        turnComputer(playerScore);
    } else if (playerScore === 21) {
        console.warn(' 21 !!, Genial has Ganado!!');
        btnTake.disabled = true;
        btnStop.disabled = true;
        turnComputer(playerScore);
    };
});


btnStop.addEventListener('click', () => {
    btnTake.disabled = true;
    btnNew.disabled = false;
    turnComputer(playerScore);

    if (computerScore > 21) {
        console.warn(' 21 !!, Genial has Ganado!!');
        btnTake.disabled = true;
        btnStop.disabled = true;
    } else if (playerScore === 21) {
        console.warn('Ouch!, Perdiste...');
        btnTake.disabled = true;
        btnStop.disabled = true;
    };
});


btnNew.addEventListener('click', () => {
    newGame();
});

