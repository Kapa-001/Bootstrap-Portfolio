// Fetch API to make API call

// Defining my const

const apiKey = 'ddf015e727d58ce627779130fd5733fa';
const apiUrl = 'https://api.openweathermap.org/data/2.5';
const cityInput = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const currentWeatherDiv = document.getElementById('weather-search');
const forecastDiv = document.getElementById('forecast');
const historyDiv = document.getElementById('history');
let searchHistory = [];

// Adding an event listener to search button 

searchButton.addEventListener('click', (event) => {
    event.preventDefault();

    const city = cityInput.value;
    const currentWeatherUrl = `${apiUrl}/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `${apiUrl}/forecast?q=${city}&units=metric&appid=${apiKey}`;

    Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl)
    ])
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then((results) => {
        const currentWeatherData = results[0];
        const forecastData = results[1];
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
        addCitytoSearchHistory(city);
    })
    .catch((error) => console.log(error));
});

const displayCurrentWeather = (data) => {
    const city = data.name
    const date = new Data(data.dt * 1000).toDataString();
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    currentWeatherDiv.innerHTML = `
    <h2>${city}</h2>
    <p>${date}</p>
    <img src="${iconUrl}" alt="${data.weather[0].description}">
    <p>Temperature: ${temperature} &deg;C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
};

const displayForecast = (data) => {
    let forecastHtml = '';
    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
      const date = new Date(forecast.dt * 1000).toDateString();
      const iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
      const temperature = forecast.main.temp;
      const humidity = forecast.main.humidity;
      forecastHtml += `
        <div class="forecast-item">
          <p>${date}</p>
          <img src="${iconUrl}" alt="${forecast.weather[0].description}">
          <p>Temperature: ${temperature} &deg;C</p>
          <p>Humidity: ${humidity}%</p>
        </div>
      `;
    }
    forecastDiv.innerHTML = forecastHtml;
  };
  
  const addCityToSearchHistory = (city) => {
    searchHistory.unshift(city);
    searchHistory = [...new Set(searchHistory)];
    if (searchHistory.length > 5) {
      searchHistory.pop();
    }
    displaySearchHistory();
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  };
  
  const displaySearchHistory = () => {
    let searchHistoryHtml = '';
    for (let i = 0; i < searchHistory.length; i++) {
      const city = searchHistory[i];
      searchHistoryHtml += `<div class="search-history-item">${city}</div>`;
    }
  }    