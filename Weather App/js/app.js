import { getMyLocation, getAnotherLocation, getWeatherForLocation } from "./apiService.js"
document.addEventListener(`DOMContentLoaded`, function () {
    console.log('DOM fully parsed and loaded');

    const addCity = document.getElementById(`add-city`);
    const closeSearchingForm = document.getElementById(`search-close`);
    const firstWeatherModule = document.querySelector(`.module__weather`);
   




    function baseFunctionalities() {
        // adding Searching module form
        addCity.addEventListener('click', function () {
            document.querySelector(`.module__form`).toggleAttribute(`hidden`);
        });
        // hiding Searching module form
        closeSearchingForm.addEventListener('click', function () {
            document.querySelector(`.module__form`).toggleAttribute(`hidden`);
        })
    }

    function updateWeather(module, weatherData) {
        module.querySelector(`.city__name`).innerText = weatherData.city;

    }


    baseFunctionalities();
    getMyLocation()
        .then(location => getWeatherForLocation(location))
})