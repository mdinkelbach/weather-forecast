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

    let lat = 'http://api.openweathermap.org/geo/1.0/direct?q=$' + city + '&limit=1&appid=1f2462a97ced70684760194121560ac7';
    console.log(city);

  fetch(lat)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .then(function (lat) {
        console.log(lat)
    })
}

searchButtonEl.addEventListener('click', formSubmitHandler);



        //let apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1f2462a97ced70684760194121560ac7`;