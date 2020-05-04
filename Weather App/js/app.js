document.addEventListener(`DOMContentLoaded`, (event) => {
    console.log('DOM fully loaded and pased');

    const $addCity = document.getElementById("add-city");
    const $moduleForm = document.querySelector(".module__form");
    const $moduleWeather = document.querySelector(".module__weather");
    const $cityName = document.querySelector(".city__name");
    const $searchButton = document.getElementById("search").nextElementSibling;
    const $closeButtonWheaterModule = $moduleWeather.children[0];
    const $closeButtonFormModule = $moduleForm.children[0];
    const $temperatureValue = document.querySelector(`.temperature__value`);
    const $pressureValue = document.querySelector(`.pressure__value`);
    const $humidityValue = document.querySelector(`.humidity__value`);
    const $windSpeedValue = document.querySelector(`.wind-speed__value`);
    const $weatherIcon = document.querySelector('.weather__icon');
    // console.log($weatherIcon);

    const openWeatherMapApiKey = `65df6e65685954bcc25e210809d56fc4`;
    const keyLocationAPI = `f72e36dc-538a-45c5-86c4-d7aa24223789`;





    Number.prototype.padLeft = function (base, chr) {
        var len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    }

    let d = new Date,
        dformat = [d.getFullYear(),
        (d.getMonth() + 1).padLeft(),
        d.getDate() + 1].join('-') + ' ' +
            [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()].join(':');
    console.log(dformat);

    let currentHour = d.getHours();
    console.log(currentHour);


    let days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

    let $forecastedDays = document.querySelectorAll('.day');
    let dayCounter = 0;
    $forecastedDays.forEach(element => {
        let day = new Date();
        let dayName = days[day.getDay() + dayCounter];
        dayCounter++;
        element.innerText = dayName;
    });




    $closeButtonWheaterModule.addEventListener("click", function () {
        $moduleWeather.hidden = true;
    })
    $closeButtonFormModule.addEventListener("click", function () {
        $moduleForm.hidden = true;
    })

    $addCity.addEventListener("click", function () {
        $moduleForm.removeAttribute(`hidden`);
    })

    const getWheater = async () => {
        try {
            let currentCity = await fetch(`http://ip-api.com/json`, {
                method: 'GET'
            });
            currentCity = await currentCity.json()
                .then(currentCity => currentCity.city);
            // console.log(currentCity);
            if (currentCity !== null) {
                $moduleWeather.removeAttribute(`hidden`);
                $cityName.innerHTML = currentCity;

            }
            let location = await fetch(`https://graphhopper.com/api/1/geocode?key=${keyLocationAPI}&q=${currentCity}`);
            location = await location.json();
            let lng = (location.hits[0].point.lng).toFixed(1);
            let lat = (location.hits[0].point.lat).toFixed(1);
            // console.log(location);

            // console.log(lng, lat);

            let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${openWeatherMapApiKey}&units=metric`);
            result = await result.json();
            console.log(result);
            let currentWeather = result.weather[0].main;
            console.log(currentWeather);

            if (currentWeather === "Clouds") {
                $weatherIcon.innerHTML = `<img src='images/icons/cloudy.svg'/>`
            } else if (currentWeather === "Rain") {
                $weatherIcon.innerHTML = `<img src='images/icons/rain.svg'/>`
            }

            let temperature = Math.floor(result.main.temp - 273.15);
            let pressure = result.main.pressure;
            let humidity = result.main.humidity;
            let wind = result.wind.speed;
            // console.log(temperature);
            $temperatureValue.innerText = temperature;
            $pressureValue.innerText = pressure + ' hPa';
            $humidityValue.innerText = humidity + '%';
            $windSpeedValue.innerText = wind + ' m/s';

            let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${openWeatherMapApiKey}`)
            forecast = await forecast.json();
            let forecastArray = forecast.list;
            console.log(forecastArray);


            forecastArray.forEach(element => {

            });


        } catch (err) {
            console.log(err)
        }
    }
    getWheater();

})