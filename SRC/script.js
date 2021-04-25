function formatDate(date){
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  let months = ['Januray','February','March','April','May','June','July','August','September','October','November','December']

  let day = date.getDate();
  let hour = date.getHours();
    if (hour < 10){
    hour = `0${hours}`;
  }
  let minute = date.getMinutes();
  if (minute < 10){
    minute = `0${minute}`;
  }
  let weekday = days[date.getDay()];
  let month = months[date.getMonth()]

  return `${weekday}, ${month} ${day}, ${hour}:${minute}`;
}

function showSearchConditions(response) {
  console.log(response)
  document.querySelector(".chosen-city-value").innerHTML = response.data.name;
  document.querySelector("#current-temperature-value").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#current-conditions-value").innerHTML = response.data.weather[0].main;

  document.querySelector("#current-min-temp-value").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#current-max-temp-value").innerHTML = Math.round(response.data.main.temp_max);

  document.querySelector("#current-humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#current-clouds").innerHTML = Math.round(response.data.clouds.all);
  document.querySelector("#current-windspeed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-pressure").innerHTML = Math.round(response.data.main.pressure);

}
 
function searchCity(city){
  let apiKey = "ea67ab160a3ae4295e1811dfc7396fd1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
  
  axios.get(apiUrl).then(showSearchConditions);
}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  
  searchCity(city);
} 

function searchCurrentLocation(position){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showSearchConditions);
}

function getCurrentLocation(event){
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function changeScale(event){
  event.preventDefault();
  let scale = document.querySelector("#scale");
  let currentTemperature = document.querySelector(".current-temperature");
 
  if (scale.innerHTML === "ºF"){
    scale.innerHTML = "ºC";
    currentTemperature.innerHTML = "75º" ;
  }else{
    scale.innerHTML = "ºF";
    currentTemperature.innerHTML = "13º" ;
  }
}

let dateElement = document.querySelector(".chosen-city-current-day");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#app-search-engine");
searchForm.addEventListener("submit",handleSubmit);

let currentScale = document.querySelector("#scale");
currentScale.addEventListener("click",changeScale);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click",getCurrentLocation);

searchCity("Lisbon");

