import "../styles/style.css";
import "./dom";
import { DOMSelectors } from "./dom";
import { words } from "./objects";

const apiKey = "01e4cbe8-84ab-44da-abb4-53bf2d0faa8e";

let score = 0;
let word = getRandomWord();
let checkSeeSolution = false;

function getRandomWord() {
  const random = Math.floor(Math.random() * words.length);
  return words[random];
} 

async function getDefinition(word) {
  try {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    return data[0].shortdef[0];;                                         
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

function clearResult() 
{setTimeout(function() {
  DOMSelectors.feedback.textContent = "";}, 750)
}

async function newWord() {
    // word = getRandomWord(); //updates word 

    let differentWord = word; //creates different word variable and sets it to current word 
    while (differentWord === word) { //while differentWord is the same word, generate new word 
      differentWord = getRandomWord();
    }
    word = differentWord; //update word 

    console.log(word) 
    DOMSelectors.wordDef.textContent = await getDefinition(word); 
    clearResult();
    DOMSelectors.input.value = "";
    DOMSelectors.solution.classList = "hidden";
    DOMSelectors.solution.textContent = `${word}`; 
    checkSeeSolution = false; // set see solution default to false when new word is generated
}

async function checkFor10() {
  if (score % 10 === 0 && score !== 0) { //if score is divisible by 10 and is not 0  
    DOMSelectors.wordDef.classList = "hidden";
    DOMSelectors.submit.classList = "hidden";
    DOMSelectors.feedback.textContent = "Congratulations! You won the game! Do you want to continue playing or reset?";
    DOMSelectors.newWord.classList = "hidden";
    DOMSelectors.continue.classList = "block";
    DOMSelectors.reset.classList = "block";
    DOMSelectors.seeSolution.classList = "hidden";
  } else {
    newWord(); //if score is 0-9 
  }
}

  async function playRound() {
    const guess = DOMSelectors.input.value.toLowerCase();
    if (guess === word && DOMSelectors.solution.classList.contains("hidden")) {// if guess is correct and solution was not shown 
      checkSeeSolution = false; //set see solution to false
      DOMSelectors.feedback.textContent = "Correct! Well done."; 
        score++;
        DOMSelectors.scoreDisplay.textContent = score;
        checkFor10(); // function that checks for 10 or gives new word when correct
      }
   else if (guess === word && checkSeeSolution === true) { //see solution changes when see solution button is clicked
      DOMSelectors.feedback.textContent = "Correct, but you saw the answer!";
      checkFor10();
    }
    else if (guess === ''){
  } else if (guess !== word) { 
    DOMSelectors.feedback.textContent = "Sorry, incorrect. Please try again.";
  }}

async function continueGame() {
  DOMSelectors.newWord.classList = "block";
  DOMSelectors.continue.classList = "hidden";
  DOMSelectors.submit.classList = "block";
  DOMSelectors.wordDef.classList = "block";
  DOMSelectors.seeSolution.classList = "block";
  DOMSelectors.reset.classList = "hidden";
  clearResult();
 score = DOMSelectors.scoreDisplay.textContent;
  newWord(); //get new word
  }

function showSolution(){
  DOMSelectors.solution.classList.replace("hidden","block")
  checkSeeSolution = true
}

function reset() {
score = 0; 
DOMSelectors.scoreDisplay.textContent = score;
newWord();
DOMSelectors.continue.classList = "hidden";
DOMSelectors.reset.classList = "hidden";
DOMSelectors.newWord.classList = "block";
DOMSelectors.submit.classList = "block";
DOMSelectors.wordDef.classList = "block";
DOMSelectors.seeSolution.classList = "block"
}

DOMSelectors.seeSolution.addEventListener("click", showSolution);

DOMSelectors.submit.addEventListener("submit", function (e) {
  e.preventDefault();
  playRound();
});

DOMSelectors.newWord.addEventListener("click", newWord);

DOMSelectors.reset.addEventListener("click", reset);

DOMSelectors.continue.addEventListener("click", continueGame)

document.addEventListener("DOMContentLoaded", newWord);


