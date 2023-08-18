let cards = [];
let firstcard, secondcard;
let score = 0;
let lockboard = false;
const cardscontainer = document.getElementById("grid");

document.getElementById("score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generatteCards();
    console.log(cards);
  });

function generatteCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
<div class="front">
    <img class="front-image" src=${card.image}>
    </div>
    <div class="back">

</div>
    `;
    cardscontainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCards);
    cardElement.addEventListener("touchstart", flipCards);
  }
}

function shuffleCards() {
  let currentIndx = cards.length;
  let randomIndx;
  let temporaryValue;
  while (currentIndx !== 0) {
    randomIndx = Math.floor(Math.random() * currentIndx);
    currentIndx -= 1;
    temporaryValue = cards[currentIndx];
    cards[currentIndx] = cards[randomIndx];
    cards[randomIndx] = temporaryValue;
  }
}

function flipCards() {
  if (lockboard === true) return;
  if (this === firstcard) return;
  this.classList.add("flipped");
  if (!firstcard) {
    firstcard = this;
    return;
  }
  secondcard = this;
  lockboard = true;
  checkForMatch();
}

function checkForMatch() {
  if (firstcard.dataset.name === secondcard.dataset.name) {
    disabelCards();
    score++;
    document.getElementById("score").textContent = score;
    if (score === 9) {
      startConfetti();
    }
  } else {
    unflipCards();
  }
}
function disabelCards() {
  firstcard.removeEventListener("click", flipCards);
  firstcard.removeEventListener("touchstart", flipCards);
  secondcard.removeEventListener("click", flipCards);
  secondcard.removeEventListener("touchstart", flipCards);
  unlockBoard();
}

function unlockBoard() {
  firstcard = null;
  secondcard = null;
  lockboard = false;
}

function unflipCards() {
  setTimeout(() => {
    firstcard.classList.remove("flipped");
    secondcard.classList.remove("flipped");
    unlockBoard();
  }, 500);
}

function restart() {
  window.location.reload();
}
