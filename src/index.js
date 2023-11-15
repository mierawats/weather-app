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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

search("Paris");

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
