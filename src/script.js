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
let minutes = dateTime.getMinutes();
let currentMinutes = minutesTwoDigits();

// Minutes in 2 digits
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
let currentTime = ` ${hours}:${currentMinutes}`;
let currentDateTime = document.querySelector("#date-time");
currentDateTime.innerHTML = `${currentDate} ${currentTime}`;

//Show current Position and weather
let apiKey = "4bf6877c9fd424fd93f8acf13ea89864";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

function showCurrentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  axios.get(
    `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  );
}
navigator.geolocation.getCurrentPosition(showCurrentPosition);
