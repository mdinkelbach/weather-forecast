let searchButtonEl = document.querySelector('#search');
let cityInputEl = document.querySelector('#city');

let formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityname = cityInputEl.value.trim();
  
    if (cityname) {
      getCityCoord(cityname);
      cityInputEl.value = '';
    } else {
      alert('Please enter a valid city name');
    }
  };

let getCityCoord = function (city) {
    let latLon = 'http://api.openweathermap.org/geo/1.0/direct?q=$' + city + '&limit=1&appid=1f2462a97ced70684760194121560ac7';

  fetch(latLon)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .then(function (latLon) {
        getCityWeather(latLon[0].lat, latLon[0].lon);
    })
}

let getCityWeather = function (lat,lon) {
    let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1f2462a97ced70684760194121560ac7`;
    
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .then(function (apiUrl) {
        console.log(apiUrl);
        console.log(`City Name: ${apiUrl.city.name}`);
        console.log(`Date: ${apiUrl.list[0].dt_txt}`);
        console.log(`Weather: ${apiUrl.list[0].weather[0].icon}`)
        console.log(`F Temp: ${Math.round(fConvert(apiUrl.list[0].main.temp))}`);
        console.log(`C Temp: ${Math.round(cConvert(apiUrl.list[0].main.temp))}`);
        console.log(`Wind Speed: ${apiUrl.list[0].wind.speed}`);
        console.log(`Humidity: ${apiUrl.list[0].main.humidity}`);
    })

}

let fConvert = function (kelvin) {
    let fahr = 1.8*(kelvin-273) + 32;
    return fahr;
}

let cConvert = function (kelvin) {
    let cel = kelvin - 273.15;
    return cel;
}

searchButtonEl.addEventListener('click', formSubmitHandler);