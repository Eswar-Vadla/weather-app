// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apikey = "0c828344ede12fe7c1309b22e003990a";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter the city");
    }
});

async function getWeatherData(city) {
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey;
    const response = await fetch(apiurl);
    console.log(response)

    if(!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data)
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description: desc, id}]} = data;

    card.textContent = "";
    card.style.display = "flex"
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    cityDisplay.textContent = city;
    card.appendChild(cityDisplay);
    
    const t = (data.main.temp - 273.15).toFixed(2);

    tempDisplay.textContent = t+" deg C";
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = "Humidity: "+humidity;
    card.appendChild(humidityDisplay);

    descDisplay.textContent = desc;
    card.appendChild(descDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherID) {
    if(weatherID>=200 && weatherID<300) {
        return "⛈️";
    } 
    else if(weatherID>=300 && weatherID<400) {
        return "🌦️";
    }
    else if(weatherID>=500 && weatherID<600) {
        return "🌧️";
    }
    else if(weatherID>=600 && weatherID<700) {
        return "❄️";
    }
    else if(weatherID>=700 && weatherID<800) {
        return "🌥️";
    }
    else if(weatherID>=801 && weatherID<805) {
        return "☁️";
    }
    else {
        return "☀️";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}