import "../styles/style.css";
import "./dom";
import { DOMSelectors } from "./dom";

DOMSelectors.farenheit.addEventListener("click", function () {
  document.body.classList.remove("metric");
  document.body.classList.add("imperial");
}); 

DOMSelectors.celcius.addEventListener("click", function () {
  document.body.classList.remove("imperial");
  document.body.classList.add("metric");
});


const units = {
  x:"imperial",
 y:"metric",
 }

 function ifelse() {
  if (document.body.classList.contains("imperial")) {
    let F = units.x
    return F
  } else if (document.body.classList.contains("metric")) {
    let C = units.y
    return C
  }
else {}
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

function getIcon(code){
  return `https://openweathermap.org/img/wn/${code}@2x.png`; 
}
     
  async function getWeather(response){
  if (response.status < 200 || response.status > 299) {
    DOMSelectors.results.innerHTML = "<p class='err'>Not found</p>"
    console.log(response.status);
    throw error(response);
  } else {
    let data = await response.json();
    DOMSelectors.results.innerHTML = ""
    DOMSelectors.results.insertAdjacentHTML(
      "afterbegin", 
 `    <div class="location">
          <h2 class="text">${data.name}, ${data.sys.country}</h2>
      </div>
      <div class="details">
          <h3 class="text">${data.weather[0].main}</h3>
        <div class="weather">
        <h3 class="temp" >${Math.round(data.main.temp)}°</h3>
          <img class="icon" src="${getIcon(data.weather[0].icon)}" alt="icon of ${data.weather[0].description}" />
        <div class="flex">
          <h3 class="fontd">
            Real feel:
            <span class="font" id="mom1">${Math.round(data.main.feels_like)}°</span>
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

  return data;}}

 async function searchWeather(units) {
   try {
    https://random-word-api.herokuapp.com/word
     let city = DOMSelectors.input1.value  
     let response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8819f20c9205070f8b81cb0884ce1ee5&units=${units}`
     );
     getWeather(response)
   } catch (error) {
  }
 }
 
 async function init(units) {
   let weather = await searchWeather(units);
   DOMSelectors.input1.value = ""
   return weather;
 }


 DOMSelectors.submit.addEventListener("submit", function (e) {
   e.preventDefault();
   init(ifelse());
 });
 
 document.querySelectorAll(".topbuttons").forEach((button) => {
   cities.forEach((city) => {
     async function buttonData(units) {
       try {
         if (button.textContent.includes(city.title)) {
          let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.title}&appid=8819f20c9205070f8b81cb0884ce1ee5&units=${units}`
          );
          getWeather(response)
         } else {
         }
       } catch (error) {
         console.log(error);
         console.log("sad");
         DOMSelectors.results.innerHTML = "<p style='color: red;'>Not found</p>";
       }
     }
     async function init1(units) {
       let weather = await buttonData(units);
       return weather
     }
     button.addEventListener("click", function () {
      init1(ifelse());
     });
   });
 });

 function defaultWeather() {
  return document.querySelector(".topbuttons").click()
};
 defaultWeather();