import "../styles/style.css";

const DOMSelectors = {
  wordDefinition: document.getElementById("word"),
  guessInput: document.getElementById("input"),
  submit: document.getElementById("form"),
  feedback: document.getElementById("result"),
  scoreDisplay: document.getElementById("score"),
  newWord: document.getElementById("new-word"),
  reset: document.getElementById("reset"),
  continue: document.getElementById("continue"),
  seeSolutionBtn: document.querySelector("#see-solution"),
  solution: document.querySelector("#solution"),
  correctList: document.querySelector("#correct-list"),
  toggleCorrectBtn: document.querySelector("#see-words"),
  choiceA: document.querySelector("#choice-1"),
  choiceB: document.querySelector("#choice-2"),
  multiple: document.querySelector("#multiple"),
};
  const words = [
    "lady", "error", "apple", "desk", "piano", "gene", "pie", "loss", "news", "shirt", "way", "woman", "basis", "actor", "world", "sir", "depth", "mood", 
    "army", "tea", "law", "dirt", "hat", "art", "user", "ear", "event", "month", "power", "movie", "phone", "song", "uncle", "meal", "map", "chest", 
    "data", "video", "cheek", "tale", "gate", "music", "two", "menu", "debt", "honey", "youth", "drama", "soup", "week", "ratio", "buyer", "lab", "child", 
    "story", "poem", "poet", "role", "bird", "paper", "bread", "mud", "hotel", "dad", "area", "disk", "owner", "food", "fact", "salad", "mall", "bath", "media", 
    "scene", "pizza", "blood", "girl", "thing", "lake", "death", "act", "ask", "buy", "call", "cook", "cry", "do", "draw", "eat", "feel", "find", "get", "give", 
    "go", "hear", "help", "hide", "hold", "hope", "hug", "jump", "keep", "kiss", "know", "laugh", "lead", "lean", "learn", "leave", "like", "look", "love", "make", 
    "meet", "need", "open", "paint", "play", "read", "rest", "ride", "run", "say", "see", "sell", "send", "show", "sing", "sit", "sleep", "smile", "speak", "spin", 
    "stand", "stay", "stop", "take", "talk", "tell", "think", "touch", "travel", "try", "turn", "use", "wait", "walk", "watch", "win", "work", "write"
  ];
  // words are generated from https://randomwordgenerator.com/verb.php/ and https://randomwordgenerator.com/noun.php using the length filter of less than 6

const apiKey = "01e4cbe8-84ab-44da-abb4-53bf2d0faa8e"; //key is from the dictionaryapi at https://www.dictionaryapi.com/
//for non-commercial use, usage does not exceed 1000 queries per day per API key, and use is limited to two reference APIs
let score = 0; //set initial score to 0
let word = getRandomWord(); //set variable word to a random word
let seeSolution = false; //sets see solution to false initially. this is changed when see solution button is clicked.
let correct = []; //set correct to an empty array. it is supposed to represent a list of correct words.

function getRandomWord() {
  //function that returns a random word from the words array.
  const random = Math.floor(Math.random() * words.length); //from https://www.w3schools.com/js/js_random.asp
  //uses math.floor and math.random and words.length which is also the amount of words in the words array.
  return words[random];
}

function checkWord() {
  //function that returns a word different from the current word
  let differentWord = getRandomWord(); //sets variable differentWord to represent a random word
  while (differentWord === word) {
    //uses while loop to generate new words while the words are the same
    differentWord = getRandomWord();
  }
  return differentWord;
}
async function getDefinition(word) {
  try {
    const response = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`
    );
    //credits go to the dictionaryapi at https://www.dictionaryapi.com/ and https://www.dictionaryapi.com/products/api-collegiate-dictionary
    const data = await response.json();
    return data[0].shortdef[0]; //credits go to documentation at https://www.dictionaryapi.com/products/json
  } catch (error) {
    console.log(error);
    return "error";
  }
}

function clearFeedback() {
  setTimeout(function () {
    DOMSelectors.feedback.textContent = "";
  }, 750); //function that clears the feedback whenever it is called in 750 ms.
}

async function newWord() {
  //function that gets a new word while resetting display to a default stateA
  word = checkWord(); //calls checkWord which returns a word that is different from the current word. updates the current word to the returned word.
  console.log(word);
  DOMSelectors.wordDefinition.textContent = await getDefinition(word);
  //wordDefinition is being updated to the short definition of the new word or a string that says error if there is an error
  clearFeedback();
  DOMSelectors.continue.style.display = "none";
  DOMSelectors.reset.style.display = "none";
  DOMSelectors.correctList.style.display = "none";
  DOMSelectors.guessInput.value = "";
  DOMSelectors.solution.style.display = "none";
  DOMSelectors.solution.textContent = `${word}`; //sets solution to the new word but keeps it hidden
  seeSolution = false; // set see solution default to false when new word is generated
  DOMSelectors.guessInput.style.display = "inline";
  DOMSelectors.submit.style.display = "block";
  DOMSelectors.multiple.style.display = "inline";
  DOMSelectors.choiceA.style.display = "none"; //hides the multiple choice buttons 1 and 2 button shows button option to guess with multiple choice
  DOMSelectors.choiceB.style.display = "none";
  if (DOMSelectors.correctList.innerHTML === "" || correct.length === 0) {
    DOMSelectors.toggleCorrectBtn.style.display = "none";
  } else {
    DOMSelectors.toggleCorrectBtn.style.display = "block";
  }
  if (Math.random() < 0.5) {
    //if else that uses math.random to a 50 50 probability.
    //if math.random returns a number less than 0.5 multiple choice buttons a and b are set to the call of checkWord() and the current word respectively.
    DOMSelectors.choiceA.textContent = checkWord(); // returns a new word that is not the current word (wrong answer)
    DOMSelectors.choiceB.textContent = word; // current word which is the write answer
  } else {
    DOMSelectors.choiceA.textContent = word; // else: do the opposite
    // this is so that whenever the newWord function is called, the correct answer won't be choiceB all the time, and instead has a 50% possibility.
    DOMSelectors.choiceB.textContent = checkWord();
  }
}

function playRound(guess) {//algorithm accepts parameter of guess
  DOMSelectors.correctList.innerHTML = ""; //resets the correct list every guess
  if (guess === word) {
    if (DOMSelectors.solution.style.display === "none") {
      seeSolution = false;
      DOMSelectors.feedback.textContent = "Correct! Well done.";
      score++;
      DOMSelectors.scoreDisplay.textContent = score;
    } else if (seeSolution === true) {
      //seeSolution is set to true whenever solution button is clicked, and instead doesn't increment score
      DOMSelectors.feedback.textContent = "Correct, but you saw the answer!";
    }
    if (!correct.includes(word)) {
      //if the list of correct words doesn't include the current word
      correct.push(word); //pushes the correct word into the list of correct words
    }
    if (score % 10 === 0 && score !== 0) {
      //if score is divisible by 10 and is not 0
      DOMSelectors.wordDefinition.style.display = "none";
      DOMSelectors.submit.style.display = "none";
      DOMSelectors.feedback.textContent =
        "Congratulations! You won the game! Do you want to continue playing or reset?";
      DOMSelectors.newWord.style.display = "none";
      DOMSelectors.continue.style.display = "inline";
      DOMSelectors.reset.style.display = "inline";
      DOMSelectors.seeSolutionBtn.style.display = "none";
    } else {
      newWord(); //whenever score is not an interval of 10, generate a new word
    }
  } else if (guess === "") {
  } else if (guess !== word) {
    newWord();
    DOMSelectors.feedback.textContent = "Incorrect, Here's a new word.";
  }
  for (let i = 0; i < correct.length; i++) {
    DOMSelectors.correctList.innerHTML += "<li>" + correct[i] + "</li>"; //loop that adds a list item for each correct word based on the amount of correct words
    //hence why we would need to reset the HTML in the correct list after every guess as this loop just adds
  }
}

DOMSelectors.choiceA.addEventListener("click", function () {
  playRound(DOMSelectors.choiceA.textContent);
});
DOMSelectors.choiceB.addEventListener("click", function () {
  playRound(DOMSelectors.choiceB.textContent);
});

DOMSelectors.submit.addEventListener("submit", function (e) {
  e.preventDefault();
  playRound(DOMSelectors.guessInput.value.toLowerCase().trim());
});

DOMSelectors.multiple.addEventListener("click", function () {
  DOMSelectors.multiple.style.display = "none";
  DOMSelectors.choiceA.style.display = "block";
  DOMSelectors.choiceB.style.display = "block";
  DOMSelectors.submit.style.display = "none";
});

DOMSelectors.toggleCorrectBtn.addEventListener("click", function () {
  if (DOMSelectors.correctList.style.display === "none") {
    DOMSelectors.correctList.style.display = "inline";
  } else if (DOMSelectors.correctList.style.display === "inline") {
    DOMSelectors.correctList.style.display = "none";
  }
});

DOMSelectors.seeSolutionBtn.addEventListener("click", function showSolution() {
  DOMSelectors.solution.style.display = "block";
  seeSolution = true;
});

DOMSelectors.newWord.addEventListener("click", newWord);

DOMSelectors.reset.addEventListener("click", function reset() {
  correct = [];
  score = 0;
  DOMSelectors.scoreDisplay.textContent = score;
  newWord();
  DOMSelectors.continue.style.display = "none";
  DOMSelectors.reset.style.display = "none";
  DOMSelectors.newWord.style.display = "inline";
  DOMSelectors.submit.style.display = "block";
  DOMSelectors.wordDefinition.style.display = "inline";
  DOMSelectors.seeSolutionBtn.style.display = "inline";
  DOMSelectors.toggleCorrectBtn.style.display = "none";
});

DOMSelectors.continue.addEventListener("click", function continueGame() {
  DOMSelectors.newWord.style.display = "inline";
  DOMSelectors.continue.style.display = "none";
  DOMSelectors.submit.style.display = "block";
  DOMSelectors.wordDefinition.style.display = "inline";
  DOMSelectors.seeSolutionBtn.style.display = "inline";
  DOMSelectors.reset.style.display = "none";
  clearFeedback();
  score = DOMSelectors.scoreDisplay.textContent;
  newWord();
});

document.addEventListener("DOMContentLoaded", newWord);


