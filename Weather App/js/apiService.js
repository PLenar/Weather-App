export { getMyLocation, getAnotherLocation, getWeatherForLocation }
async function getMyLocation() {
    try {
        // https://cors-anywhere.herokuapp.com/ use if needed
        let location = await fetch(`https://cors-anywhere.herokuapp.com/http://ip-api.com/json/`);
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
        console.log(response);
        return { lat: response.point.lat, lng: response.point.lng, city: response.name }
    } catch (error) {
        console.log(error);
    }
}

async function getWeatherForLocation(location) {
    const openWeatherMapApiKey = `65df6e65685954bcc25e210809d56fc4`;
    try {
        let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=${openWeatherMapApiKey}&units=metric`);
        result = await result.json();
        console.log(result);
        let currentWeather = result.current;
        let city = location.city;
        console.log(city);
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
        let forecast = [forecastNextDay, forecastThirdDay, forecastFourthDay, forecastFifthDay, forecastSixthDay]
        console.log(forecast);
        return { today, forecast, city }
    } catch (error) {
        console.log(error);
    }
}



