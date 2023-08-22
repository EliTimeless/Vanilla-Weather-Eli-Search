let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = dayNames[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;

  let key = `9944890285fb78d9dd8431cff1b9ec76`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=metric`;

  function searchTemperature(response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let tempAssign = document.querySelector("#temperature");
    tempAssign.innerHTML = temperature;

    let wind = Math.round(response.data.wind.speed);
    let windAssign = document.querySelector("#wind");
    windAssign.innerHTML = `${wind} m/s`;

    let high = Math.round(response.data.main.temp_max);
    let low = Math.round(response.data.main.temp_min);
    let highLow = document.querySelector("#high-low");
    highLow.innerHTML = `${high}ºC high | ${low}ºC low`;

    let clouds = response.data.weather[0].description;
    let sky = document.querySelector("#clouds");
    sky.innerHTML = clouds;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    let humidity = response.data.main.humidity;
    let humidAssign = document.querySelector("#humidity");
    humidAssign.innerHTML = `humidity ${humidity} %`;

    let dateElement = document.querySelector("#curr-date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    function convertToFar(event) {
      event.preventDefault();
      let farhTemp = Math.round(response.data.main.temp * 1.8 + 32);
      let assignFar = document.querySelector("#temperature");
      assignFar.innerHTML = farhTemp;
    }
    let convertCtoF = document.querySelector("#farhenheit");
    convertCtoF.addEventListener("click", convertToFar);

    function convertToCelsius(event) {
      event.preventDefault();
      let farhTemp = Math.round(response.data.main.temp);
      let assignFar = document.querySelector("#temperature");
      assignFar.innerHTML = farhTemp;
    }

    let convertFtoC = document.querySelector("#celsius");
    convertFtoC.addEventListener("click", convertToCelsius);
  }
  axios.get(url).then(searchTemperature);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

let key = `9944890285fb78d9dd8431cff1b9ec76`;

function searchGeo() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let reverseUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${key}`;
  axios.get(reverseUrl).then(showCity);
}
//current location
function showCity(response) {
  let city = response.data[0].name;
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(currentUrl).then(showCityTemperature);

  function showCityTemperature(response) {
    let locationTemperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temperature");
    temp.innerHTML = locationTemperature;

    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = city;

    let wind = Math.round(response.data.wind.speed);
    let windAssign = document.querySelector("#wind");
    windAssign.innerHTML = `${wind} m/s`;
    //
    let high = Math.round(response.data.main.temp_max);
    let low = Math.round(response.data.main.temp_min);
    let highLow = document.querySelector("#high-low");
    highLow.innerHTML = `${high}ºC high/ ${low}ºC low`;
    //
    let clouds = response.data.weather[0].description;
    console.log(clouds);
    let sky = document.querySelector("#clouds");
    sky.innerHTML = clouds;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    let humidity = response.data.main.humidity;
    let humidAssign = document.querySelector("#humidity");
    humidAssign.innerHTML = `humidity ${humidity} %`;

    let dateElement = document.querySelector("#curr-date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    function formatDate(timestamp) {
      let date = new Date(timestamp);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      let day = dayNames[date.getDay()];
      return `${day} ${hours}:${minutes}`;
    }
  }
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", searchGeo);
