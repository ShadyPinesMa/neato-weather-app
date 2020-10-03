function showTemperature(response) {
  console.log(response.data);
  let temperatureNumber = document.querySelector("#temperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#current-status");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  temperatureNumber.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "5a533b6a6d16b85bbee4c6b85f37d1be";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showTemperature);