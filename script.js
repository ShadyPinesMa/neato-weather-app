//Day, time, and AM/PM information
function currentDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayNight = `AM`;
  if (hours > 12) {
    dayNight = `PM`;
    hours = hours - 12;
  }
  else {dayNight = `AM`;}

  return `${hours}:${minutes} ${dayNight}`;
}
//End day, time, and AM/PM info

function showTemperature(response) {
  let temperatureNumber = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#current-status");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let date = document.querySelector("#current-day-time")
  let icon = document.querySelector("#icon"); 

  fahrenheitTemperature = response.data.main.temp;

  temperatureNumber.innerHTML = Math.round(fahrenheitTemperature);
  cityName.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = currentDate(response.data.dt * 1000);
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response) {
  let dailyForecast = document.querySelector("#forecast");
  dailyForecast.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    dailyForecast.innerHTML += `
      <div class="col-2">
        <h3>
          ${formatHours(forecast.dt * 1000)}
        </h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
        <div class="forecast-temp">
          ${Math.round(forecast.main.temp_max)}° | ${Math.round(forecast.main.temp_min)}°
        </div>
      </div>
    `;
  } 
}

function search(city) {
  let apiKey = "5a533b6a6d16b85bbee4c6b85f37d1be";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function userSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  search(citySearch.value);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureNumber = document.querySelector("#temperature");
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  let celciusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
  temperatureNumber.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureNumber = document.querySelector("#temperature");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  temperatureNumber.innerHTML = Math.round(fahrenheitTemperature);
}

//Stuff to get the location button to work
function userPosition(position) {
  let apiKey = "5a533b6a6d16b85bbee4c6b85f37d1be";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial"
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature);
}

function userGeolocation() {
  navigator.geolocation.getCurrentPosition(userPosition);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", userGeolocation);
//End of geolocation

let fahrenheitTemperature = null;

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", userSubmit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayCelciusTemp);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

search("New York");