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
  let temperature = Math.round(response.data.temperature.current);
  temperatureDisplay.innerHTML = temperature;

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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div>
        <img src = "${day.condition.icon_url}" class="weather-forecast-icon"/>
        </div>
          <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature-max">${Math.round(
            day.temperature.maximum
          )}°</div>
          <div class="weather-forecast-temperature-min">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

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
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

search("Paris");
