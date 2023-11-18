function displayTemperature(response) {
  let cityDisplay = document.querySelector("#current-city");
  cityDisplay.innerHTML = response.data.city;

  let conditionDisplay = document.querySelector("#condition-description");
  conditionDisplay.innerHTML = response.data.condition.description;

  let humidityDisplay = document.querySelector("#temperature-humidity");
  humidityDisplay.innerHTML = response.data.temperature.humidity;

  let windSpeedDisplay = document.querySelector("#wind-speed");
  windSpeedDisplay.innerHTML = response.data.wind.speed;

  let temperatureDisplay = document.querySelector(".current-temperature-value");
  let temperatureCelsius = Math.round(response.data.temperature.current);

  if (temperatureCelsius < 10) {
    temperatureDisplay.innerHTML = `0${temperatureCelsius}`;
  } else {
    temperatureDisplay.innerHTML = temperatureCelsius;
  }

  let temperatureUnitCelsius = document.querySelector("#celcius");
  let temperatureUnitFahrenheit = document.querySelector("#fahrenheit");

  function displayCelsius() {
    let temperatureCelsius = Math.round(response.data.temperature.current);
    temperatureDisplay.innerHTML = temperatureCelsius;
  }

  function displayFahrenheit() {
    let temperatureFahrenheit = Math.round((temperatureCelsius * 9) / 5 + 32);
    temperatureDisplay.innerHTML = temperatureFahrenheit;
  }

  temperatureUnitCelsius.addEventListener("click", displayCelsius);
  temperatureUnitFahrenheit.addEventListener("click", displayFahrenheit);

  let iconDisplay = document.querySelector(".current-temperature-icon");
  iconDisplay.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "cf804oa134f4b8cta94fba1330643173";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  search(searchInputElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "cf804oa134f4b8cta94fba1330643173";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      let maxTemperature = Math.round(day.temperature.maximum);
      let minTemperature = Math.round(day.temperature.minimum);

      // Adding leading zero for temperatures less than 10
      if (maxTemperature < 10) {
        maxTemperature = `0${maxTemperature}`;
      }
      if (minTemperature < 10) {
        minTemperature = `0${minTemperature}`;
      }

      forecastHtml += `<div class="weather-forecast-day">
          <span class="weather-forecast-date">${formatDay(day.time)}</span>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${maxTemperature}°</span>
            <span class="weather-forecast-temperature-min">${minTemperature}°</span>
          </div>
          <span>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
          </span>
        </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

function formatDate(date) {
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay}`;
}

function formatTime(time) {
  let minutes = time.getMinutes();
  let hours = time.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date .day");
let currentTimeELement = document.querySelector("#current-date .time");

let currentDate = new Date();
let currentTime = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
currentTimeELement.innerHTML = formatTime(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

search("Tokyo");
