
async function getMyLocation () {
    try {
        let location = await fetch(`http://ip-api.com/json/`);
        location = await location.json();
        return {latitude: location.lat, longitude: location.lon, city: location.city}
    } catch (error) {
        console.log(error);
    }
}

async function getAnotherLocation (city) {
    const apiLocationKey = 'f72e36dc-538a-45c5-86c4-d7aa24223789';
    try {
        let response = await fetch(`https://graphhopper.com/api/1/geocode?key=${apiLocationKey}&q=${city}`);
        response = await response.json();
        response = response.hits[0];
        // console.log(response)
        return {lat: response.point.lat, lng: response.point.lng, cityName: response.name }
    } catch (error) {
        console.log(error);
    }
}

