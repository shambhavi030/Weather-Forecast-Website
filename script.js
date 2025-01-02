document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const currentWeatherApi = `http://api.weatherapi.com/v1/current.json?key=38b27473161d46139ff84923240410&q=${city}`;
    const forecastApi = `http://api.weatherapi.com/v1/forecast.json?key=38b27473161d46139ff84923240410&q=${city}&days=7`;

    // Fetch current weather
    fetch(currentWeatherApi)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(error => {
            console.error('Error fetching current weather:', error);
            document.getElementById('weatherResult').innerHTML = '<p>Error fetching current weather.</p>';
        });

    // Fetch forecast
    fetch(forecastApi)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => {
            console.error('Error fetching forecast:', error);
            document.getElementById('forecastResult').innerHTML = '<p>Error fetching forecast.</p>';
        });
});

function displayCurrentWeather(data) {
    const weatherResult = document.getElementById('weatherResult');

    const { name } = data.location;
    const localtime = data.location.localtime;
    const temp = data.current.temp_c;
    const wind = data.current.wind_kph;
    const humid = data.current.humidity;
    const feels_like = data.current.feelslike_c;
    const precipitation = data.current.precip_mm;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    // Determine icon based on temperature
    let tempImage;
    let text;
    if (temp < 15) {
        tempImage = '<img src="coldtemp.jpg" alt="Cold" style="width:60px; height:40px; margin-left:-0.1px;">';
        text = '<span> Very Cold </span>';
    } else if (temp >= 15 && temp <= 30) {
        tempImage = '<img src="modtemp.jpg" alt="Pleasant" style="width:60px; height:40px; margin-left:-0.1px;">';
        text = '<span> Moderate Temperature </span>';
    } else {
        tempImage = '<img src="hottemp.jpg" alt="Hot" style="width:60px; height:40px; margin-left:-0.1px;">';
        text = '<span> Very Hot </span>';
    }

    weatherResult.innerHTML = `
        <h1>${name}</h1>
        <div class="temperature">
            <strong>Temperature:</strong> ${temp}°C (${text})
        </div>
        <div class="temperature-image">
            ${tempImage}
        </div>
        <div class="field">
            <strong>Date and Time:</strong> ${localtime} <i class="fas fa-clock" style="color: #ff7043; margin-left:6px;"></i>
        </div>
        <div class="field">
            <strong>Wind Speed:</strong> ${wind} km/h <i class="fas fa-wind" style="color: #42a5f5; margin-left:6px;"></i>
        </div>
        <div class="field">
            <strong>Humidity:</strong> ${humid}% <i class="fas fa-tint" style="color: #42a5f5; margin-left:6px;"></i>
        </div>
        <div class="field">
            <strong>Feels Like:</strong> ${feels_like}°C <i class="fas fa-temperature-low" style="color: #ff7043; margin-left:6px;"></i>
        </div>
        <div class="field">
            <strong>Precipitation:</strong> ${precipitation} mm <i class="fas fa-cloud-rain" style="color: #6ec6ff; margin-left:6px;"></i>
        </div>
        <div class="field">
            <strong>Condition:</strong> ${condition} <img src="${icon}" alt="${condition}" style="width:40px; height:40px; margin-left:-1px;" />
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastResult');
    forecastContainer.innerHTML = '';

    data.forecast.forecastday.forEach(day => {
        const { date } = day;
        const { maxtemp_c, mintemp_c, condition } = day.day;
        const icon = condition.icon;
        const { sunrise, sunset } = day.astro;

        const forecastCard = `
            <div class="forecast-card">
                <h3>${date}</h3>
                <img src="${icon}" alt="${condition.text}">
                <p><strong>Condition:</strong> ${condition.text}</p>
                <p><strong>Max Temp:</strong> ${maxtemp_c}°C</p>
                <p><strong>Min Temp:</strong> ${mintemp_c}°C</p>
                <p><strong>Sunrise:</strong> ${sunrise} <i class="fas fa-sun" style="color:#FFFF00;"></i></p>
                <p><strong>Sunset:</strong> ${sunset} <i class="fas fa-moon" style="color:#DAEEF2;"></i></p>
            </div>
        `;
        forecastContainer.innerHTML += forecastCard;
    });
}
