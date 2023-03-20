import "../styles/style.css";
import "./dom";
import { DOMSelectors } from "./dom";
import { words } from "./objects";

const apiKey = "01e4cbe8-84ab-44da-abb4-53bf2d0faa8e";
let score = 0;
let word = getRandomWord();
let checkSeeSolution = false;
let correct = [];

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

let differentWord = getRandomWord(); 
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
    DOMSelectors.randomWordBtn.classList= "block";
    DOMSelectors.randomWordBtn.innerText= getRandomWord();
    DOMSelectors.input.classList= "block";
DOMSelectors.submit.classList= "block";

if (Math.random() < 0.5) {
  DOMSelectors.randomWordBtn.innerText = getRandomWord();
} else {
  DOMSelectors.randomWordBtn.innerText = word;
}
    
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
}
   else {
    newWord(); //if score is 0-9 
  }
}

  function playRound(guess, correctArr){
    DOMSelectors.correctList.innerHTML = "" ; 
  
  if (guess === word) {
    DOMSelectors.randomWordBtn.classList= "hidden";

    if (DOMSelectors.solution.classList.contains("hidden"))
    {checkSeeSolution = false; 
    DOMSelectors.feedback.textContent = "Correct! Well done."; 
      score++;
      DOMSelectors.scoreDisplay.textContent = score;}
      else if (checkSeeSolution === true){
        DOMSelectors.feedback.textContent = "Correct, but you saw the answer!";
      }
      if (!correctArr.includes(word)) {
        correctArr.push(word);
      }
      if (score > 0) {DOMSelectors.correctWords.classList = "block";
    }  
      checkFor10();                        
      for (let i = 0; i < correctArr.length; i++) {
          DOMSelectors.correctList.innerHTML += "<li>" + correctArr[i] + "</li>";
        };
      }
else if (guess === ''){
} else if (guess !== word) { 
  newWord()
}};

function continueGame() {
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
  checkSeeSolution = true; 
}

function reset() {
correct = [];
score = 0; 
DOMSelectors.scoreDisplay.textContent = score;
newWord();
DOMSelectors.continue.classList = "hidden";
DOMSelectors.reset.classList = "hidden";
DOMSelectors.newWord.classList = "block";
DOMSelectors.submit.classList = "block";
DOMSelectors.wordDef.classList = "block";
DOMSelectors.seeSolution.classList = "block";
DOMSelectors.correctWords.classList = "hidden";
}


DOMSelectors.randomWordBtn.addEventListener("click", function() {
  playRound(DOMSelectors.randomWordBtn.innerText, correct)
});

DOMSelectors.correctWords.addEventListener("click", function(){
  if(DOMSelectors.correctList.classList.contains("hidden"))  {DOMSelectors.correctList.classList.replace("hidden","block")}
  else if (DOMSelectors.correctList.classList.contains("block"))  {DOMSelectors.correctList.classList.replace("block","hidden")}
})

DOMSelectors.seeSolution.addEventListener("click", showSolution);                                     

DOMSelectors.submit.addEventListener("submit", function (e) {
  e.preventDefault();
  playRound(DOMSelectors.input.value.toLowerCase(), correct)
});

DOMSelectors.newWord.addEventListener("click", newWord);

DOMSelectors.reset.addEventListener("click", reset);

DOMSelectors.continue.addEventListener("click", continueGame)

document.addEventListener("DOMContentLoaded", newWord);


