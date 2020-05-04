const openWeatherMapApiKey = `65df6e65685954bcc25e210809d56fc4`;
const keyLocationAPI = `f72e36dc-538a-45c5-86c4-d7aa24223789`;

async function getMyLocation() {
    try {
        let currentCity = await fetch(`http://ip-api.com/json`, {
                method: 'GET'
            });
        currentCity = await currentCity.json()
                


        let ip = await fetch("https://api.ipify.org/?format=json");
        ip = await ip.json();
        let response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${keyLocationAPI}&ip=${ip.ip}`);
        let coordinates = await response.json();
        console.log(coordinates);
        return { lon: coordinates.longitude, lat: coordinates.latitude, city: coordinates.city };
    }
    catch (err) {
        console.log(err);
    }
}

async function getWeatherForLocation(coordinates) {
    const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${openWeatherMapApiKey}&units=metric`;
    try {
        let weather = await fetch(endpoint);
        weather = await weather.json();
        console.log(weather);
        let result = weather.daily.map((day) => {
            return {
                temp: day.temp.day,
                overview: day.weather[0].main,
                pressure: day.pressure,
                humidity: day.humidity,
                wind: day.wind_speed,
                timestamp: day.dt
            }
        });
        return { days: result, city: coordinates.city };
    }
    catch (err) {
        console.log(err);
    }

}

getMyLocation()
    .then((myLocation) => getWeatherForLocation(myLocation));

    async function getCurrentCoordinates() {
        try {

            let location = await fetch(`https://graphhopper.com/api/1/geocode?key=${keyLocationAPI}&q=${currentCity}`);
            location = await location.json();
            const lng = (location.hits[0].point.lng).toFixed(1);
            const lat = (location.hits[0].point.lat).toFixed(1);
            return { lng, lat };
        } catch (err) {
            console.log(err);
        }
    }

    console.log(getCurrentCoordinates);