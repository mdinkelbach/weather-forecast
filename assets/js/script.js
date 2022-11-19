let searchButtonEl = document.querySelector('#search');
let cityInputEl = document.querySelector('#city');
let weatherCardsEl = document.getElementById('weather-cards');
let todayCardEl = document.getElementById('today-card');
let cityHistoryEl = $('#city-history');
let cityNameEl = document.getElementById('city-name');
let historyEl = document.querySelector('.history');

let createCityButton = document.createElement('button');
let weatherClear = false

let citySave = localStorage.getItem(`citySaveNumber`)

if (!citySave) {
  localStorage.setItem(`citySaveNumber`, 0)
} else {
  for (let i = 1; i < citySave+1; i++) {
    if (localStorage.getItem(`city${i}`) === null) break; {
      cityHistoryEl.append(`<button class="btn" data-name="${localStorage.getItem(`city${i}`)}">${localStorage.getItem(`city${i}`)}</button>`);
    }
  }
}

let cityNameSave = localStorage.getItem(`city${citySave}`);
let today = dayjs();


let formSubmitHandler = function (event) {
    event.preventDefault();
  
    let cityname = cityInputEl.value.trim();
  
    if (cityname) {
      cityname = cityname[0].toUpperCase() + cityname.substring(1);
      getCityCoord(cityname);
      citySave++
      localStorage.setItem(`citySaveNumber`, citySave)
      localStorage.setItem(`city${citySave}`, cityname)
      cityHistoryEl.append(`<button class="btn" data-name="${localStorage.getItem(`city${citySave}`)}">${localStorage.getItem(`city${citySave}`)}</button>`);
      cityInputEl.value = '';
    } else {
      alert('Please enter a valid city name');
    }
  };

historyEl.addEventListener("click", function(event) {
  let element = event.target;

  if (element.matches("button")) {
     
    let name = element.getAttribute("data-name");
    getCityCoord(name);
  }
}
);

let getCityCoord = function (city) {
    let latLon = `https://api.openweathermap.org/geo/1.0/direct?q=$'${city}&limit=1&appid=1f2462a97ced70684760194121560ac7`;

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
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1f2462a97ced70684760194121560ac7`;
    
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    
    .then(function (apiUrl) {
            
        if (weatherClear === true) {
            cityNameEl.textContent = '';
            todayCardEl.children[0].remove();
            weatherCardsEl.children[4].remove();
            weatherCardsEl.children[3].remove();
            weatherCardsEl.children[2].remove();
            weatherCardsEl.children[1].remove();
            weatherCardsEl.children[0].remove();
            }

            cityNameEl.textContent = apiUrl.city.name

            let createTodayWeatherCard = document.createElement('div');
            let createTodayDate = document.createElement('h4');
            let createTodayIcon = document.createElement('img');
            let createTodayFTemp = document.createElement('p');
            let createTodayCTemp = document.createElement('p');
            let createTodayWind = document.createElement('p');
            let createTodayHumid = document.createElement('p');

            createTodayDate.textContent = `Date: ${today.format('M/D/YYYY')}`
            createTodayIcon.setAttribute('src', `http://openweathermap.org/img/wn/${apiUrl.list[0].weather[0].icon}@2x.png`)
            createTodayFTemp.textContent = `F Temp: ${Math.round(fConvert(apiUrl.list[0].main.temp))} ℉`
            createTodayCTemp.textContent = `C Temp: ${Math.round(cConvert(apiUrl.list[0].main.temp))} ℃`
            createTodayWind.textContent = `Wind Speed: ${apiUrl.list[0].wind.speed} MPH`
            createTodayHumid.textContent = `Humidity: ${apiUrl.list[0].main.humidity} %`


            todayCardEl.appendChild(createTodayWeatherCard);
            createTodayWeatherCard.appendChild(createTodayDate);
            createTodayWeatherCard.appendChild(createTodayIcon);
            createTodayWeatherCard.appendChild(createTodayFTemp);
            createTodayWeatherCard.appendChild(createTodayCTemp);
            createTodayWeatherCard.appendChild(createTodayWind);
            createTodayWeatherCard.appendChild(createTodayHumid);
        
        for (let i = 1; i < 6; i++) {
            let createForecastWeatherCard = document.createElement('div');
            let createForecastDate = document.createElement('h4');
            let createForecastIcon = document.createElement('img');
            let createForecastFTemp = document.createElement('p');
            let createForecastCTemp = document.createElement('p');
            let createForecastWind = document.createElement('p');
            let createForecastHumid = document.createElement('p');

            createForecastDate.textContent = `Date: ${today.add(i, 'day').format('M/D/YYYY')}`
            createForecastIcon.setAttribute('src', `http://openweathermap.org/img/wn/${apiUrl.list[i*7].weather[0].icon}@2x.png`)
            createForecastFTemp.textContent = `F Temp: ${Math.round(fConvert(apiUrl.list[i*7].main.temp))} ℉`
            createForecastCTemp.textContent = `C Temp: ${Math.round(cConvert(apiUrl.list[i*7].main.temp))} ℃`
            createForecastWind.textContent = `Wind Speed: ${apiUrl.list[i*7].wind.speed} MPH`
            createForecastHumid.textContent = `Humidity: ${apiUrl.list[i*7].main.humidity} %`

            weatherCardsEl.appendChild(createForecastWeatherCard);
            createForecastWeatherCard.appendChild(createForecastDate);
            createForecastWeatherCard.appendChild(createForecastIcon);
            createForecastWeatherCard.appendChild(createForecastFTemp);
            createForecastWeatherCard.appendChild(createForecastCTemp);
            createForecastWeatherCard.appendChild(createForecastWind);
            createForecastWeatherCard.appendChild(createForecastHumid);

          }
    todayCardEl.children[0].setAttribute("class", "today-weather-card");
    weatherCardsEl.children[4].setAttribute("class", "weather-card");
    weatherCardsEl.children[3].setAttribute("class", "weather-card");
    weatherCardsEl.children[2].setAttribute("class", "weather-card");
    weatherCardsEl.children[1].setAttribute("class", "weather-card");
    weatherCardsEl.children[0].setAttribute("class", "weather-card");
    
    weatherClear = true
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
