import "../styles/style.css";
import "./dom";
import { DOMSelectors } from "./dom";

const units = {
  imperial: "imperial",
  metric: "metric",
};
const API_KEY = "8819f20c9205070f8b81cb0884ce1ee5"; 



 // set default unit to imperial

function setBackground(weather) {
  const body = document.body;
  if (weather.toLowerCase().includes("clear")) {
    body.style.backgroundColor = "rgb(119, 182, 225)";
  } else if (weather.toLowerCase().includes("rain")) {
    body.style.backgroundColor = "rgb(163, 163, 194)";
  } else if (weather.toLowerCase().includes("cloud")) {
    body.style.backgroundColor = "rgb(174, 182, 192)";
  } else {
    body.style.backgroundColor = "white";
  }
}
let currentUnit = units.imperial;
function toggleTemperatureUnit(unit) {
  if (unit === currentUnit) {
    // if the same unit is clicked twice, switch to the opposite unit
    unit = currentUnit === units.metric ? units.imperial : units.metric;
  }
  currentUnit = unit;
  const temps = document.querySelectorAll(".temp");
  const realFeels = document.querySelectorAll("#mom1");
  temps.forEach((temp) => {
    const value = parseFloat(temp.textContent);
    if (unit === units.metric) {
      temp.textContent = `${convertTemperature(value)}°C`;
    } else {
      temp.textContent = `${Math.round(value)}°F`;
    }
  });
  realFeels.forEach((realFeel) => {
    const value = parseFloat(realFeel.textContent);
    if (unit === units.metric) {
      realFeel.textContent = `${convertTemperature(value)}°C`;
    } else {
      realFeel.textContent = `${Math.round(value)}°F`;
    }
  });
}

DOMSelectors.farenheit.addEventListener("click", function () {
  toggleTemperatureUnit(units.imperial);
});

DOMSelectors.celcius.addEventListener("click", function () {
  toggleTemperatureUnit(units.metric);
});

function convertTemperature(temp) {
  if (currentUnit === units.metric) {
    return Math.round((temp - 32) * 5 / 9);
  }
  return Math.round(temp);
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

async function updateWeather1() {
  try {
    const cityName = document.querySelector(".topbuttons").innerText;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`
    );
    const data = await response.json();

    const weatherDescription = data.weather[0].description;

    DOMSelectors.results.innerHTML = ""
    DOMSelectors.results.insertAdjacentHTML(
      "afterbegin", 
 `    <div class="location">
          <h2 class="text">${data.name}, ${data.sys.country}</h2>
      </div>
      <div class="details">
          <h3 class="text">${data.weather[0].main}</h3>
        <div class="weather">
        <h3 class="temp" >${convertTemperature(data.main.temp)}°</h3>
          <img class="icon" src="${getIcon(data.weather[0].icon)}" alt="icon of ${weatherDescription}" />
        <div class="flex">
          <h3 class="fontd">
            Real feel:
            <span class="font" id="mom1">${convertTemperature(data.main.feels_like)}°</span>
          </h3>
          <h3 class="fontd">
            Humidity:
            <span class="font" id="mom2">${Math.round(data.main.humidity)}%</span>
            </h3>
          <h3 class="fontd">
            Wind:
            <span class="font" id="mom3">${Math.round(data.wind.speed)}km/h</span>
            </h3>
        </div>`
      );
    setBackground(weatherDescription);
  } catch (error) {
    console.log(error);
    alert("City not found. Please enter a valid city name.");
  }
}

async function updateWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`
    );
    if (!response.ok) {
      throw new Error("City not found. Please enter a valid city name.");
    }
    const data = await response.json();

    const weatherDescription = data.weather[0].description;

    DOMSelectors.results.innerHTML = "";
    DOMSelectors.results.insertAdjacentHTML(
      "afterbegin",
      `    <div class="location">
          <h2 class="text">${data.name}, ${data.sys.country}</h2>
      </div>
      <div class="details">
          <h3 class="text">${data.weather[0].main}</h3>
        <div class="weather">
        <h3 class="temp" >${convertTemperature(data.main.temp)}°</h3>
          <img class="icon" src="${getIcon(data.weather[0].icon)}" alt="icon of ${weatherDescription}" />
        <div class="flex">
          <h3 class="fontd">
            Real feel:
            <span class="font" id="mom1">${convertTemperature(data.main.feels_like)}°</span>
          </h3>
          <h3 class="fontd">
            Humidity:
            <span class="font" id="mom2">${Math.round(data.main.humidity)}%</span>
            </h3>
          <h3 class="fontd">
            Wind:
            <span class="font" id="mom3">${Math.round(data.wind.speed)}km/h</span>
            </h3>
        </div>`
    );
    setBackground(weatherDescription);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

DOMSelectors.submit.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = DOMSelectors.input1.value.trim();
  if (city) {
    await updateWeather(city);
  }
});

document.querySelectorAll(".topbuttons").forEach((button) => {
  button.addEventListener("click", async () => {
    const cityName = button.innerText;
    document.querySelector(".topbuttons").innerText = cityName;
    document.body.classList.remove("metric", "imperial");
    document.body.classList.add(currentUnit);
    await updateWeather1();
  });
});