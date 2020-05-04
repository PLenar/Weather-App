

async function getCurrentCoordinates() {
    try {
        let currentCity = await fetch(`http://ip-api.com/json`, {
            method: 'GET'
        });
        currentCity = await currentCity.json()
            .then(currentCity => currentCity.city);

        let location = await fetch(`https://graphhopper.com/api/1/geocode?key=${keyLocationAPI}&q=${currentCity}`);
        let coordinates = await location.json();
        return {
            lng: (coordinates.hits[0].point.lng).toFixed(1),
            lat: (coordinates.hits[0].point.lat).toFixed(1)
        };
    }catch(err){
        console.log(err);
    }
}

async function getWeatherForLocation(coordinates) {
    try {
        let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${openWeatherMapApiKey}&units=metric`);
        result = await result.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
