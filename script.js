function showTemperature(response) {
  console.log(response.data);
  let temperatureNumber = document.querySelector("#temperature");
  temperatureNumber.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "5a533b6a6d16b85bbee4c6b85f37d1be";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showTemperature);