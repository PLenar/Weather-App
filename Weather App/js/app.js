import { getMyLocation, getAnotherLocation, getWeatherForLocation } from "./apiService.js"
document.addEventListener(`DOMContentLoaded`, function () {
    console.log('DOM fully parsed and loaded');



    const $addCity = document.getElementById(`add-city`);
    const $closeSearchingForm = document.getElementById(`search-close`);
    const $firstWeatherModule = document.querySelector(`.module__weather`);
    const $weatherForecast = document.querySelector(`.weather__forecast`).children;

    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek"];

    let date = new Date();

    function baseFunctionalities() {

        $firstWeatherModule.toggleAttribute(`hidden`);
        // adding Searching module form
        $addCity.addEventListener('click', function () {
            document.querySelector(`.module__form`).toggleAttribute(`hidden`);
        });
        // hiding Searching module form
        $closeSearchingForm.addEventListener('click', function () {
            document.querySelector(`.module__form`).toggleAttribute(`hidden`);
        })

    }

    function updateWeather(module, weatherData) {
        module.querySelector(`.city__name`).innerText = weatherData.city;
        module.querySelector(`.temperature__value`).innerText = weatherData.today.temperature;
        module.querySelector(`.pressure__value`).innerText = weatherData.today.pressure + " hPa";
        module.querySelector(`.humidity__value`).innerText = weatherData.today.humidity + "%";
        module.querySelector(`.wind-speed__value`).innerText = weatherData.today.wind + " m/s";

        for (let i = 0; i < 5; i++) {
            $weatherForecast[i].querySelector(`.day`).innerText = days[date.getDay() + 1 + i];
            $weatherForecast[i].querySelector(`.temperature`).innerText = weatherData.forecast[i].temp.day;
        }


    }


    baseFunctionalities();
    getMyLocation()
        .then(location => getWeatherForLocation(location))
        .then(weather => updateWeather($firstWeatherModule, weather));
})