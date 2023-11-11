function cityNameInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityNameInput);

function displayedDateData(currentDate) {
  let minutes = currentDate.getMinutes();
  let hours = currentDate.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[currentDate.getDay()];

  return `${formattedDay}, ${hours}:${minutes}`;
}

let currentDate = new Date();

let currentDateDisplay = document.querySelector("#current-date");
currentDateDisplay.innerHTML = displayedDateData(currentDate);
