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

let currentDate = `${currentDay}, ${date} ${currentMonth}, ${year}`;
let currentTime = ` ${hours}:${minutes}`;
let currentDateTime = document.querySelector("#date-time");
currentDateTime.innerHTML = `${currentDate} ${currentTime}`;
