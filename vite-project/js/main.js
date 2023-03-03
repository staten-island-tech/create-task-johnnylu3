import "../styles/style.css";
import "./dom";
import { DOMSelectors } from "./dom";
import { words } from "./objects";

/* const API_KEY = "8819f20c9205070f8b81cb0884ce1ee5"; 


function convertCelsius(farenheit) {
  return Math.round((farenheit - 32) * 5 / 9);
}

function setBackground(weather) {
  if (weather.includes("clear")) {
    document.body.className = "clear";
  } else if (weather.includes("rain") || weather.includes("thunderstorm")) {
    document.body.className = "rain";
  } else if (weather.includes("cloud") || weather.includes("mist")) {
    document.body.className = "cloud";
  } else if (weather.includes("snow")) {
    document.body.className = "snow";
  } else {
    document.body.className = "";
  }
}


const cities = [
  { title: "New York" },
  { title: "London" },
  { title: "Moscow" },
  { title: "Tokyo" },
  { title: "Mexico City" },
];

document.getElementById("test1").innerHTML = cities
  .map(
    (city) =>
      ` <button class='topbuttons'>
       ${city.title}
     </button>`
  )
  .join("");

function getIcon(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

async function updateWeather(cityName, useCelcius) {// check if button is clicked, if clicked useCelcius is true
  try {
    const units = 'imperial';//default to fahrenheit
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${units}`);
    const data = await response.json();

    const weatherDescription = data.weather[0].description;

  let temp, feelsLike; //change later but use these variables as template literals 

    if (useCelcius === true) { 
    temp = convertCelsius(data.main.temp);
    feelsLike = convertCelsius(data.main.feels_like);
    } else {
      temp = Math.round(data.main.temp);
      feelsLike = Math.round(data.main.feels_like);
    }

    DOMSelectors.results.innerHTML = ""
    DOMSelectors.results.insertAdjacentHTML(
      "afterbegin", 
 `    <div class="location">
          <h2 class="text">${data.name}, ${data.sys.country}</h2>
      </div>
      <div class="details">
          <h3 class="text">${data.weather[0].main}</h3>
        <div class="weather">
        <h3 class="temp" >${temp}°</h3>
          <img class="icon" src="${getIcon(data.weather[0].icon)}" alt="icon of ${weatherDescription}" />
        <div class="flex">
          <h3 class="fontd">
            Feels Like:
            <span class="font" id="mom1">${feelsLike}°</span>
          </h3>
          <h3 class="fontd">
            Humidity:
            <span class="font" id="mom2">${Math.round(data.main.humidity)}%</span>
            </h3>
          <h3 class="fontd">
            Wind:
            <span class="font" id="mom3">${Math.round(data.wind.speed)} mph</span>
            </h3>
        </div>`
      );
    setBackground(weatherDescription);
  } catch (error) {
    console.log(error);
    DOMSelectors.results.innerHTML = "<p class='err' style='color: red;'>City not found. Please enter a valid city name.</p>";
  }
}

function toggleUnit(useCelcius) {
  let cityCode = document.querySelector(".text").innerText
  let cityName = cityCode.slice(0,-4); //slice nothing at start slice -4 at end because code with space and comma is 4 
  if (useCelcius) {
    document.body.classList.add('celsius');
    document.body.classList.remove('fahrenheit');
    updateWeather(cityName, true);
  } else {
    document.body.classList.add('fahrenheit');
    document.body.classList.remove('celsius');
    updateWeather(cityName);
  }
}

DOMSelectors.celcius.addEventListener("click", () => {
  toggleUnit(true);
});

DOMSelectors.farenheit.addEventListener("click", () => {
  toggleUnit(false);
});

DOMSelectors.submit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cityName = DOMSelectors.input1.value;
    await updateWeather(cityName)
  });

document.querySelectorAll(".topbuttons").forEach((button) => {
  button.addEventListener("click", async () => {
    const cityName = button.innerText;
    await updateWeather(cityName);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  await updateWeather("New York");
}); */
// Define a list of words to be used in the game


// Define the API endpoint to fetch word definitions
const apiKey = "01e4cbe8-84ab-44da-abb4-53bf2d0faa8e";
const apiUrl = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";

// Initialize the game state
let score = 0;
let word = "";
let definition = "";

// Function to get a random word from the list
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Function to fetch the definition of a word from the API
async function getWordDefinition(word) {
  try {
    const response = await fetch(`${apiUrl}${word}?key=${apiKey}`)
    const data = await response.json();
    const def = data[0].shortdef[0];
    return def;                                         
  } catch (error) {
    console.log(error);
    return "Error fetching definition";
  }
}

// Function to start a new game
function newGame() {
  score = 0;
  newWord();
  DOMSelectors.continueEl.style.display = "none";
  DOMSelectors.resetEl.disabled = true; // disable reset button on page load
  DOMSelectors.resetEl.style.display = "none"; // hide reset button on page load
}

// Function to generate a new word and its definition
async function newWord() {
  word = getRandomWord();
  definition = await getWordDefinition(word);
  DOMSelectors.wordEl.textContent = definition;
  DOMSelectors.inputEl.value = "";
  DOMSelectors.resultEl.textContent = "";
}

// Function to handle a game round
function playRound() {
  const guess = DOMSelectors.inputEl.value.toLowerCase().trim();
  if (guess === word) {
    score++;
    DOMSelectors.scoreEl.textContent = score;
    DOMSelectors.resultEl.textContent = "Correct! Well done.";
    if (score === 10) {
      DOMSelectors.resultEl.textContent = "Congratulations! You won the game! Do you want to continue playing or reset?";
      DOMSelectors.newWordEl.style.display = "none";
      DOMSelectors.resetEl.disabled = false; // enable reset button
      DOMSelectors.continueEl.style.display = "block";
      DOMSelectors.newWordEl.style.display = "none";
      DOMSelectors.resetEl.style.display = "block";
      return;
    }
    newWord();
  } else {
    DOMSelectors.resultEl.textContent = "Sorry, incorrect. Please try again.";
  }
}

// Function to continue playing the game after reaching score of 10
function continueGame() {
  DOMSelectors.continueEl.style.display = "none";
  DOMSelectors.resetEl.disabled = true; // disable reset button
  DOMSelectors.newWordEl.style.display = "block";
  DOMSelectors.resetEl.style.display = "none"; // hide reset button
  newWord();
}

DOMSelectors.submitEl.addEventListener("click", function (event) {
  event.preventDefault();
  playRound();
});

DOMSelectors.newWordEl.addEventListener("click", function () {
  newWord();
});

DOMSelectors.resetEl.addEventListener("click", function () {
  if (score === 10) {
    score = 0; // reset score to zero
    DOMSelectors.scoreEl.textContent = score;
  }
  newGame();
  DOMSelectors.newWordEl.style.display = "block";
  DOMSelectors.resetEl.disabled = true; // disable reset button
  DOMSelectors.continueEl.style.display = "none";
});

DOMSelectors.continueEl.addEventListener("click", function () {
  continueGame();
});

window.addEventListener("load", function () {
  newGame();
});