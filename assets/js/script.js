let searchButtonEl = document.querySelector('#search');
let cityInputEl = document.querySelector('#city');
let weatherCardsEl = document.getElementById('weather-cards');

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
        for (let i = 0; i < 5; i++) {
            let createWeatherCard = document.createElement('div');
            let createDate = document.createElement('h4');
            let createIcon = document.createElement('img')
            let createFTemp = document.createElement('p')
            let createCTemp = document.createElement('p')
            let createWind = document.createElement('p')
            let createHumid = document.createElement('p')

            createDate.textContent = `Date: ${apiUrl.list[i*8].dt_txt}`
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


        /*link.textContent = data[i].html_url;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);*/