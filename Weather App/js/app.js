import { getMyLocation, getAnotherLocation, getWeatherForLocation } from "./apiService.js"
document.addEventListener(`DOMContentLoaded`, function () {
    console.log('DOM fully parsed and loaded');

    // DOM searching for important elements
    const $addCity = document.getElementById(`add-city`);
    const $closeSearchingForm = document.getElementById(`search-close`);
    const $firstWeatherModule = document.querySelector(`.module__weather`);
    const $weatherForecast = document.querySelector(`.weather__forecast`).children;
    const $searchingModule = document.querySelector(`.module__form`);
    const $searchingButton = document.getElementById(`searchingButton`);
    const $searchBar = document.getElementById(`search`);

    // For dealing with dates in forecast
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek"];
    let date = new Date();

    // To init base functionalities of weather app :)
    function baseFunctionalities() {

        $firstWeatherModule.toggleAttribute(`hidden`);
        $addCity.addEventListener('click', function () {
            $searchingModule.toggleAttribute(`hidden`);
        });
        $closeSearchingForm.addEventListener('click', function () {
            $searchingModule.toggleAttribute(`hidden`);
        })
        $searchingButton.addEventListener("click", (event) => {
            event.preventDefault();
            addNewWeatherModule($searchBar.value);
            $searchBar.value = "";
        })
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
        //Closing added next weather module
        let deleteButton = module.querySelector(".btn--close");
        deleteButton.addEventListener("click", function () {
            if (document.querySelectorAll("module__weather").length > 1) {
                this.parentNode.remove();
            }
            else {
                this.parentNode.toggleAttribute("hidden");
            }
        })
        //Editing existing module to see weather in another city
    }

    function addNewWeatherModule(city) {
        getAnotherLocation(city)
            .then((location) => getWeatherForLocation(location))
            .then((weather) => {
                let nextWeatherModule = $firstWeatherModule.cloneNode(true);
                document.getElementById("app").appendChild(nextWeatherModule);
                return updateWeather(nextWeatherModule, weather);
            })
            .catch((error) => console.log(error));
    }

    //For editing existing module
    function changeWeather(city, module) {
        getAnotherLocation(city)
            .then((location) => getWeatherForLocation(location))
            .then((weather) => {
                return updateWeather(module, weather);
            })
            .catch((error) => console.log(error));
    }

    //To handle with icons provided by CodersLab
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

    baseFunctionalities();
    getMyLocation()
        .then(location => getWeatherForLocation(location))
        .then(weather => updateWeather($firstWeatherModule, weather))
        .catch((error) => console.log(error));

})