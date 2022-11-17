let searchButtonEl = document.querySelector('#search');
let cityInputEl = document.querySelector('#city');
let weatherCardsEl = document.getElementById('weather-cards');
let cityHistoryEl = $('#city-history');
let cityNameEl = document.getElementById('city-name');

let createCityButton = document.createElement('button');
let weatherClear = false

let citySave = localStorage.getItem(`citySaveNumber`)

if (!citySave) {
  localStorage.setItem(`citySaveNumber`, 0)
} else {
  for (let i = 1; i < 11; i++) {
    if (localStorage.getItem(`city${i}`) === null) break; {
      cityHistoryEl.append(`<button class="btn data-${localStorage.getItem(`city${i}`)}">${localStorage.getItem(`city${i}`)}</button>`);
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
      cityHistoryEl.append(`<button class="btn data-${localStorage.getItem(`city${citySave}`)}">${localStorage.getItem(`city${citySave}`)}</button>`);
      cityInputEl.value = '';
    } else {
      alert('Please enter a valid city name');
    }
  };

let getCityCoord = function (city) {
    let latLon = `http://api.openweathermap.org/geo/1.0/direct?q=$'${city}&limit=1&appid=1f2462a97ced70684760194121560ac7`;

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
            
        if (weatherClear === true) {
            cityNameEl.textContent = '';
            weatherCardsEl.children[4].remove();
            weatherCardsEl.children[3].remove();
            weatherCardsEl.children[2].remove();
            weatherCardsEl.children[1].remove();
            weatherCardsEl.children[0].remove();
            }

            cityNameEl.textContent = apiUrl.city.name
        
        for (let i = 0; i < 5; i++) {
            let createWeatherCard = document.createElement('div');
            let createDate = document.createElement('h4');
            let createIcon = document.createElement('img');
            let createFTemp = document.createElement('p');
            let createCTemp = document.createElement('p');
            let createWind = document.createElement('p');
            let createHumid = document.createElement('p');

            createDate.textContent = `Date: ${today.add(i, 'day').format('M/D/YYYY')}`
            createIcon.textContent = `Weather: ${apiUrl.list[i*8].weather[0].icon}`
            createFTemp.textContent = `F Temp: ${Math.round(fConvert(apiUrl.list[i*8].main.temp))} ℉`
            createCTemp.textContent = `C Temp: ${Math.round(cConvert(apiUrl.list[i*8].main.temp))} ℃`
            createWind.textContent = `Wind Speed: ${apiUrl.list[i*8].wind.speed} MPH`
            createHumid.textContent = `Humidity: ${apiUrl.list[i*8].main.humidity} %`

            weatherCardsEl.appendChild(createWeatherCard);
            createWeatherCard.appendChild(createDate);
            createWeatherCard.appendChild(createIcon);
            createWeatherCard.appendChild(createFTemp);
            createWeatherCard.appendChild(createCTemp);
            createWeatherCard.appendChild(createWind);
            createWeatherCard.appendChild(createHumid);

          }

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