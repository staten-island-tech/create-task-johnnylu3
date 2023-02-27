import "../styles/style.css";
import "./dom";
import { DOMSelectors } from "./dom";

const API_KEY = "8819f20c9205070f8b81cb0884ce1ee5"; 


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
    const units = 'imperial';
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
  let cityName = cityCode.slice(0, -4);
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
  const city = DOMSelectors.input1.value;
    await updateWeather(city)
  });

document.querySelectorAll(".topbuttons").forEach((button) => {
  button.addEventListener("click", async () => {
    const cityName = button.innerText;
    await updateWeather(cityName);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  await updateWeather("New York");
});
