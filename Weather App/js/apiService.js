
async function getMyLocation() {
    try {
        let location = await fetch(`http://ip-api.com/json/`);
        location = await location.json();
        return { lat: location.lat, lon: location.lon, city: location.city }
    } catch (error) {
        console.log(error);
    }
}

async function getAnotherLocation(city) {
    const apiLocationKey = 'f72e36dc-538a-45c5-86c4-d7aa24223789';
    try {
        let response = await fetch(`https://graphhopper.com/api/1/geocode?key=${apiLocationKey}&q=${city}`);
        response = await response.json();
        response = response.hits[0];
        return { lat: response.point.lat, lng: response.point.lng, cityName: response.name }
    } catch (error) {
        console.log(error);
    }
}

async function getWeatherForLocation(location) {
    const openWeatherMapApiKey = `65df6e65685954bcc25e210809d56fc4`;
    try {
        let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=${openWeatherMapApiKey}&units=metric`);
        result = await result.json();
        let currentWeather = result.current;
        let today = {
            temperature: currentWeather.temp,
            pressure: currentWeather.pressure,
            humidity: currentWeather.humidity,
            wind: currentWeather.wind_speed,
            description: currentWeather.weather[0].main
        }
        let forecastNextDay = result.daily[1];
        let forecastThirdDay = result.daily[2];
        let forecastFourthDay = result.daily[3];
        let forecastFifthDay = result.daily[4];
        let forecastSixthDay = result.daily[5];
        let forecast = { forecastNextDay, forecastThirdDay, forecastFourthDay, forecastFifthDay, forecastSixthDay }
        return { today, forecast }
    } catch (error) {
        console.log(error);
    }
}



