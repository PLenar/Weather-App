import { getMyLocation, getAnotherLocation, getWeatherForLocation } from "./apiService.js"
document.addEventListener(`DOMContentLoaded`, function () {
    console.log('DOM fully parsed and loaded');

    const $addCity = document.getElementById(`add-city`);
    const $closeSearchingForm = document.getElementById(`search-close`);
    const $firstWeatherModule = document.querySelector(`.module__weather`);
    const $weatherForecast = document.querySelector(`.weather__forecast`).children;
    const $searchingModule = document.querySelector(`.module__form`);
    const $searchingButton = document.querySelector(`form`);
    const $appContainer = document.getElementById(`app`);
    console.log(document.getElementById(`search`).value);
    const $nextWatherModule = $firstWeatherModule.cloneNode(true);
    console.log($nextWatherModule);
    const $body = document.querySelector(`body`);



    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek"];

    let date = new Date();

    function baseFunctionalities() {

        $firstWeatherModule.toggleAttribute(`hidden`);
        // adding Searching module form
        $addCity.addEventListener('click', function () {
            $searchingModule.toggleAttribute(`hidden`);
        });
        // hiding Searching module form
        $closeSearchingForm.addEventListener('click', function () {
            $searchingModule.toggleAttribute(`hidden`);
        })
        addNewWeatherModule();

    }

    function updateWeather(module, weatherData) {
        module.querySelector(`.city__name`).innerText = weatherData.city;
        module.querySelector(`.temperature__value`).innerText = weatherData.today.temperature;
        module.querySelector(`.pressure__value`).innerText = weatherData.today.pressure + " hPa";
        module.querySelector(`.humidity__value`).innerText = weatherData.today.humidity + "%";
        module.querySelector(`.wind-speed__value`).innerText = weatherData.today.wind + " m/s";
        document.querySelector(`.weather__icon`).children[0].src = getProperIcon(weatherData.today.description);

        for (let i = 0; i < 5; i++) {
            $weatherForecast[i].querySelector(`.day`).innerText = days[date.getDay() + 1 + i];
            $weatherForecast[i].querySelector(`.temperature__value`).innerText = weatherData.forecast[i].temp.day;
            const forecastIcon = weatherData.forecast[i].weather[0].main;
            $weatherForecast[i].children[1].src = getProperIcon(forecastIcon);
        }
    }

    function getProperIcon(mainWeather) {
        switch (mainWeather) {
            case 'Thunderstorm':
                return "images/icons/thunderstorm.svg";
            case 'Drizzle':
                return "images/icons/rain.svg";
            case 'Rain':
                return "images/icons/rain.svg";
            case 'Snow':
                return "images/icons/snow.svg";
            case 'Tornado':
                return "images/icons/tornado.svg";
            case 'Clear':
                return "images/icons/clear-day.svg";
            case 'Clouds':
                return "images/icons/partly-cloudy-day.svg";
            default:
                return "images/icons/fog.svg";
        }
    }

    function addNewWeatherModule() {
        $searchingButton.addEventListener('submit', function (event) {
            event.preventDefault()
            if (event.target.search.value != '') {
                $nextWatherModule.toggleAttribute('hidden');
                $appContainer.appendChild($nextWatherModule);
                console.log('DUPA DUPA DUPA DUPA DUPA DUPA', event.target.search.value);
            }
        })
    }

    baseFunctionalities();
    getMyLocation()
        .then(location => getWeatherForLocation(location))
        .then(weather => updateWeather($firstWeatherModule, weather));

})