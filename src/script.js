// Format Date and Time
function formatDate(timestamp) {
  let dateTime = new Date(timestamp);
  let year = dateTime.getFullYear();
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
  let ordinalAbb = dateOrdinal(timestamp);
  let currentDate = `${currentDay}, ${ordinalAbb} ${currentMonth}, ${year}`;

  return `${currentDate} ${formatTime(timestamp)}`;
}

function formatTime(timestamp) {
  let dateTime = new Date(timestamp);
  let hours = dateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Date ordinal abbreviations
function dateOrdinal(timestamp) {
  let dateTime = new Date(timestamp);
  let date = dateTime.getDate();
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

//Show current Position and weather
let apiKey = "4bf6877c9fd424fd93f8acf13ea89864";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?`;
let savedTemperature = null;
let savedFeelsLike = null;
let tempMax = null;
let tempMin = null;
let iconId = null;
let hourTempMax = [];
let hourTempMin = [];
let houTempMaxMin = [];

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
  axios
    .get(
      `${apiUrlForecast}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(displayForecast);
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
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  let DateElement = document.querySelector("#date-time");
  DateElement.innerHTML = `${formatDate(response.data.dt * 1000)}`;
  iconId = response.data.weather[0].icon;
  let iconMain = document.querySelector("#main-icon");
  iconMain.innerHTML = `<img src="img/${iconId}.png" id="weather-icon">`;
}
//Forecast section
function displayForecast(response) {
  console.log(response.data);
  let forecastHoursElement = document.querySelector("#forecast-hours");
  forecastHoursElement.innerHTML = null;
  let forecastHours = null;
  let iconsHoursId = null;
  for (let i = 0; i <= 4; i++) {
    forecastHours = response.data.list[i];
    iconsHoursId = forecastHours.weather[0].icon;
    hourTempMax[i] = `${Math.round(forecastHours.main.temp_max)}`;
    hourTempMin[i] = `${Math.round(forecastHours.main.temp_min)}`;
    forecastHoursElement.innerHTML += `
  <div class="col">
    <div class="row">
        <div class="col">${formatTime(forecastHours.dt * 1000)}</div>
    </div> 
    <div class="row">
        <div class="col weather-icons-mini">
          <img src="img/${iconsHoursId}.png" class = "weather-icons-mini">
        </div> 
    </div>   
    <div class="row">
        <div class="col deg-hour">${hourTempMax[i]}°/${hourTempMin[i]}°</div>
    </div>  
  </div>  
 `;
  }
}
//Search city
function showCity(event) {
  event.preventDefault();
  let searchHolder = document.querySelector("#search-holder").value;
  let city = document.querySelector(".location");
  city.innerHTML = searchHolder.toUpperCase().trim();
  axios
    .get(`${apiUrl}q=${searchHolder}&appid=${apiKey}&units=metric`)
    .then(showWeather);
  axios
    .get(`${apiUrlForecast}q=${searchHolder}&appid=${apiKey}&units=metric`)
    .then(displayForecast);
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
  hourTempMaxMin = document.querySelectorAll(".deg-hour");
  hourTempMaxMin.forEach((hourTempMaxMin, i) => {
    let hourTempMaxFar = Math.round(hourTempMax[i] * 1.8 + 32);
    let hourTempMinFar = Math.round(hourTempMin[i] * 1.8 + 32);
    hourTempMaxMin.innerHTML = `${hourTempMaxFar}°/${hourTempMinFar}°`;
  });

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
  hourTempMaxMin = document.querySelectorAll(".deg-hour");
  hourTempMaxMin.forEach((hourTempMaxMin, i) => {
    hourTempMaxMin.innerHTML = `${hourTempMax[i]}°/${hourTempMin[i]}`;
  });
  if (celsius) {
    this.style.color = "black";
    farenheit.style.color = "#1284FF";
  }
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);
