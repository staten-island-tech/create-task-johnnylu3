import "../styles/style.css";
import "./dom";
import { DOMSelectors } from "./dom";
import { words } from "./objects";

const apiKey = "01e4cbe8-84ab-44da-abb4-53bf2d0faa8e";

let score = 0;
let word = await reuseWord();
let isSolutionShown = false;

function getRandomWord() {
  const random = Math.floor(Math.random() * words.length);
  return words[random];
} 

async function reuseWord() {
  let word = getRandomWord();
  return word;
}

async function getDefinition(word) {
  try {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    const def = data[0].shortdef[0];
    return def;                                         
  } catch (error) {
    console.log(error);
    return "Error fetching definition";
  }
}

function clearResult() 
{setTimeout(function() {
  DOMSelectors.feedback.textContent = "";
}, 750)}

async function newWord() {
    word = await reuseWord();
    console.log(word) 
    DOMSelectors.wordDef.textContent = await getDefinition(word); 
    clearResult();
    DOMSelectors.input.value = "";
    DOMSelectors.solution.classList = "hidden";
    DOMSelectors.solution.textContent = `${word}`; 
    isSolutionShown = false;
}

function newGame() {
  newWord();
  DOMSelectors.continueEl.classList = "hidden";
  DOMSelectors.resetEl.classList = "hidden";
}


async function checkFor10() {
  if (score % 10 === 0 && score !== 0) {
    DOMSelectors.wordDef.classList = "hidden";
    DOMSelectors.submit.classList = "hidden";
    DOMSelectors.feedback.textContent = "Congratulations! You won the game! Do you want to continue playing or reset?";
    DOMSelectors.newWordEl.classList = "hidden";
    DOMSelectors.continueEl.classList = "block";
    DOMSelectors.resetEl.classList = "block";
    DOMSelectors.seeSolution.classList = "hidden";
  } else {
    await newWord();
  }
}

async function playRound() {
  const guess = DOMSelectors.input.value.toLowerCase();
  if (guess === word && isSolutionShown === false) {
    isSolutionShown = true;
    DOMSelectors.feedback.textContent = "Correct! Well done.";
    if (DOMSelectors.solution.classList.contains("hidden")) {
      score++;
      DOMSelectors.scoreDisplay.textContent = score;
    }
   checkFor10();

  
  } else if (guess === word && isSolutionShown === true) {
    DOMSelectors.feedback.textContent = "Correct! Well done.";

    checkFor10();
  }
  else {
    DOMSelectors.feedback.textContent = "Sorry, incorrect. Please try again.";
  }
}

async function continueGame() {
  DOMSelectors.newWordEl.classList = "block";
  DOMSelectors.continueEl.classList = "hidden";
  DOMSelectors.submit.classList = "block";
  DOMSelectors.wordDef.classList = "block";
  DOMSelectors.seeSolution.classList = "block";
  DOMSelectors.resetEl.classList = "hidden";
  clearResult();
 score = DOMSelectors.scoreDisplay.textContent;
  await newWord();
  for (let i = score; i < score + 10; i++) {
    DOMSelectors.input.value = "";
    DOMSelectors.feedback.textContent = "";
    isSolutionShown = false;
    await playRound();
  }}


DOMSelectors.seeSolution.addEventListener("click", function() {
  if (DOMSelectors.solution.classList.contains("hidden")) {
    DOMSelectors.solution.classList.replace("hidden", "block");
  } 
});

DOMSelectors.submit.addEventListener("submit", function (e) {
  e.preventDefault();
  playRound();
});

DOMSelectors.newWordEl.addEventListener("click", newWord);

DOMSelectors.resetEl.addEventListener("click", function () {
  if (score % 10 === 0 && score !== 0) {
    score = 0;
    DOMSelectors.scoreDisplay.textContent = score;
  }
  newGame();
  DOMSelectors.newWordEl.classList = "block";
  DOMSelectors.continueEl.classList = "hidden";
  DOMSelectors.submit.classList = "block";
  DOMSelectors.wordDef.classList = "block";
  DOMSelectors.seeSolution.classList = "block"

});

DOMSelectors.continueEl.addEventListener("click", continueGame)

document.addEventListener("DOMContentLoaded", newGame);


