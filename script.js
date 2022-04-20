let now = new Date();
let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hour}:${minutes}`;

function showTemperature(response) {
  let weatherDescription = document.querySelector("#description-weather");
  let weatherTemperature = document.querySelector("#temperature-value");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;

  weatherDescription.innerHTML = `${description}`;
  weatherTemperature.innerHTML = `${temperature}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function getCurrentPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getPosition);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

function getPosition(position) {
  let units = "metric";
  let apiKey = "919fb7ba7dc6a5f22ab47490fe852f46";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;

  let apiKey = "919fb7ba7dc6a5f22ab47490fe852f46";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#currentPositionBtn");
button.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
