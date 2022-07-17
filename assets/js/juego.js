/* Card Names
 * 2C = Two of Clubs = Dos de trebol
 * 2D = Two of Diamonds = Dos de Diamante
 * 2H = Two of Hearts = Dos de Corazones
 * 2S = Two of Spades = Dos de Espadas
 */

const myModule = (() => {
  "use strict";

  // Variables
  let deck = [];
  const types = ["C", "D", "H", "S"],
    specials = ["J", "Q", "K", "A"];

  let playersScore = [],
    card;

  // HTML References
  const btnNew = document.querySelector("#btnNew"),
    btnTake = document.querySelector("#btnTake"),
    btnStop = document.querySelector("#btnStop"),
    showScore = document.querySelectorAll("small"), // [<small></small>, <small></small>]
    divPlayersCard = document.querySelectorAll(".divCards");

  // Function to Initializate a Game.
  const initializateGame = (numPlayers = 2) => {
    console.clear;
    deck = createDeck();
    playersScore = [];

    for (let i = 0; i < numPlayers; i++) {
      playersScore.push(0);
    }
    btnNew.disabled = true;
    btnTake.disabled = false;

    showScore.forEach((elem) => {
      elem.innerText = 0;
    });

    divPlayersCard.forEach((elem) => {
      elem.innerHTML = "";
    });
  };

  // Function to creates a new Deck.
  const createDeck = () => {
    // Create the card names
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }

    for (let type of types) {
      for (let special of specials) {
        deck.push(special + type);
      }
    }

    // shuffle the deck
    return _.shuffle(deck);
  };

  // Function to take the last card from the deck.
  const takeCard = () => {
    btnStop.disabled = false;

    if (deck.length === 0) {
      alert("No quedan mas cartas en el deck");
      throw "No quedan mas cartas en el deck";
    }

    return deck.pop();
  };

  // Function obtain a card value.
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    // Other way than I find to resolve this case:
    // (card.length === 3) ? value = card[0] + card[1] : value = card[0];
    // console.log(value);

    return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
  };

  // Function to accumulate players scores. turn: 0 = player 1 and the lastone will be the pc
  const accumulateScore = (card, turn) => {
    playersScore[turn] = playersScore[turn] + cardValue(card);
    showScore[turn].innerText = playersScore[turn];

    return playersScore[turn];
  };

  // Function to render cards
  const renderCards = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.src = `./assets/cartas/${card}.png`;
    imgCard.classList.add("card");
    imgCard.alt = "imagen de carta";
    divPlayersCard[turn].append(imgCard);
  };

  // Function to determine a winner.
  const getWinner = () => {
    const [minPoints, computerScore] = playersScore;

    setTimeout(() => {
      if (computerScore === minPoints) {
        alert("Nadie Gana :( , Empate!!");
      } else if (minPoints > 21) {
        alert("Lo siento, Perdiste...Computadora Gana!");
      } else if (minPoints === 21) {
        alert("21 Muy Bien, Ganaste!!");
      } else if (minPoints < 21 && computerScore > 21) {
        alert("Bien Pensado, Ganaste!!");
      } else if (computerScore <= 21 && minPoints < 21) {
        alert("Lo siento, Perdiste...Computadora Gana!");
      }

      btnNew.disabled = false;
      btnStop.disabled = true;
    }, 500);
  };

  // Computer-IA turn
  const turnComputer = (minPoints) => {
    let computerScore;
    do {
      const card = takeCard();
      computerScore = accumulateScore(card, playersScore.length - 1);

      // Rendering the card on DOM. <img class="card" src="./assets/cartas/3C.png" alt="cartas" />
      renderCards(card, playersScore.length - 1);

      if (minPoints > 21) {
        break;
      }
    } while (computerScore < minPoints && minPoints <= 21);

    getWinner();
  };

  // Events
  btnTake.addEventListener("click", function () {
    const card = takeCard();
    const playerScore = accumulateScore(card, 0);

    // Rendering the card on DOM. <img class="card" src="./assets/cartas/3C.png" alt="cartas" />
    renderCards(card, 0);

    if (playerScore > 21) {
      console.warn("Ouch!, Perdiste...");
      btnTake.disabled = true;
      btnStop.disabled = true;
      turnComputer(playerScore);
    } else if (playerScore === 21) {
      console.warn(" 21 !!, Genial has Ganado!!");
      btnTake.disabled = true;
      btnStop.disabled = true;
      turnComputer(playerScore);
    }
  });

  btnStop.addEventListener("click", () => {
    const [playerScore, computerScore] = playersScore;

    btnTake.disabled = true;
    btnNew.disabled = false;
    turnComputer(playerScore);

    if (computerScore > 21) {
      console.warn(" 21 !!, Genial has Ganado!!");
      btnTake.disabled = true;
      btnStop.disabled = true;
    } else if (playerScore === 21) {
      console.warn("Ouch!, Perdiste...");
      btnTake.disabled = true;
      btnStop.disabled = true;
    }
  });

  btnNew.addEventListener("click", () => {
    initializateGame();
  });

  return {
    nuevoJuego: initializateGame,
  };
})();
