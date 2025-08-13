function refreshweather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let timestamp = (response.data.dt + response.data.timezone) * 1000;
  let date = new Date(timestamp);
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${iconUrl}" alt="${response.data.weather[0].description}">`;

  console.log(response.data);
  console.log(response.data.wind.speed);
  console.log(response.data.weather[0].description);
  console.log(response.data.main.humidity);

  cityElement.innerHTML = response.data.name;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "4612225ecd1b2c0b68cbfbb8d5268590";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshweather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");
