'use strict';
// Initializing elements
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentScore, totalScore, currentPlayer, isGameRunning, winningScore;

// Game start conditions
function init() {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  currentScore = 0;
  totalScore = [0, 0];
  currentPlayer = 0;
  isGameRunning = true;
  winningScore = 100;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  // Changing view of active player by adding  annd removing class
  // document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
  // currentPlayer = currentPlayer === 0 ? 1 : 0;
  // document.querySelector(`.player--${currentPlayer}`).classList.add('player--active');

  // Chaging view of active player by toggle meethod
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

init();

// Rolling a die
btnRoll.addEventListener('click', function () {
  if (isGameRunning) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `./dice-${randomNumber}.png`;
    diceEl.classList.remove('hidden');
    if (randomNumber === 1) {
      switchPlayer();
    } else {
      currentScore += randomNumber;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isGameRunning) {
    totalScore[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      totalScore[currentPlayer];
    if (totalScore[currentPlayer] >= winningScore) {
      isGameRunning = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
