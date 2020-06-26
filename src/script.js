let dateTime = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let currentDay = days[dateTime.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[dateTime.getMonth()];
let date = dateTime.getDate();
let year = dateTime.getFullYear();
let hours = dateTime.getHours();
let currentHours = hoursTwoDigits();
let minutes = dateTime.getMinutes();
let currentMinutes = minutesTwoDigits();

// Hours and Minutes in 2 digits

function hoursTwoDigits() {
  if (hours < 10) {
    return `0` + hours;
  } else {
    return hours;
  }
}
function minutesTwoDigits() {
  if (minutes < 10) {
    return `0` + minutes;
  } else {
    return minutes;
  }
}
//Date ordinal abbreviations
function dateOrdinal() {
  if (date === 1 || date === 21 || date === 31) {
    return date + `st`;
  } else if (date === 2 || date === 22) {
    return date + `nd`;
  } else if (date === 3 || date === 23) {
    return date + `rd`;
  } else {
    return date + `th`;
  }
}

let ordinalAbb = dateOrdinal();
let currentDate = `${currentDay}, ${ordinalAbb} ${currentMonth}, ${year}`;
let currentTime = ` ${currentHours}:${currentMinutes}`;
let currentDateTime = document.querySelector("#date-time");
currentDateTime.innerHTML = `${currentDate} ${currentTime}`;

//Show current Position and weather
let apiKey = "4bf6877c9fd424fd93f8acf13ea89864";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
let savedTemperature = 0;
let savedFeelsLike = 0;
let tempMax = 0;
let tempMin = 0;

function showCurrentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(showWeather);
}
function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let searchBtn = document.querySelector("#magnifying-glass");
searchBtn.addEventListener("click", searchLocation);

function showWeather(response) {
  console.log(response);
  savedTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("h1 .temp-value");
  temp.innerHTML = savedTemperature;
  let place = document.querySelector(".location");
  place.innerHTML = response.data.name.toUpperCase().trim();
  tempMax = Math.round(response.data.main.temp_max);
  tempMin = Math.round(response.data.main.temp_min);
  let tempMaxMin = document.querySelector(".max-min");
  tempMaxMin.innerHTML = `${tempMax}° / ${tempMin}°`;
  savedFeelsLike = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = `${savedFeelsLike}°`;
  console.log(feelsLike);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
}

//Search City
function showCity(event) {
  event.preventDefault();
  let searchHolder = document.querySelector("#search-holder").value;
  let city = document.querySelector(".location");
  city.innerHTML = searchHolder.toUpperCase().trim();
  axios
    .get(`${apiUrl}q=${searchHolder}&appid=${apiKey}&units=metric`)
    .then(showWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", showCity);

//Convert C° to F°
function convertToFarenheit(event) {
  event.preventDefault();
  let tempF = Math.round(savedTemperature * 1.8 + 32);
  let temperature = document.querySelector("h1 .temp-value");
  temperature.innerHTML = tempF;
  let tempMaxFar = Math.round(tempMax * 1.8 + 32);
  let tempMinFar = Math.round(tempMin * 1.8 + 32);
  let tempMaxMinFar = document.querySelector(".max-min");
  tempMaxMinFar.innerHTML = `${tempMaxFar}° / ${tempMinFar}°`;
  let feelsLikeFar = Math.round(savedFeelsLike * 1.8 + 32);
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = `${feelsLikeFar}°`;
  if (farenheit) {
    this.style.color = "black";
    celsius.style.color = "#1284FF";
  }
}
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertToFarenheit);

//Convert F° to C°
function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("h1 .temp-value");
  temperature.innerHTML = savedTemperature;
  let tempMaxMin = document.querySelector(".max-min");
  tempMaxMin.innerHTML = `${tempMax}° / ${tempMin}°`;
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = `${savedFeelsLike}°`;
  if (celsius) {
    this.style.color = "black";
    farenheit.style.color = "#1284FF";
  }
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);
