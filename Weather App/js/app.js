import { getMyLocation } from "./apiService.js"
document.addEventListener(`DOMContentLoaded`, function () {
    console.log('DOM fully parsed and loaded');

    const addCity = document.getElementById(`add-city`);
    const closeSearchingForm = document.getElementById(`search-close`);
    
function baseFunctionalities() {
    // adding Searching module form
    addCity.addEventListener('click', function(){
        document.querySelector(`.module__form`).toggleAttribute(`hidden`);
    });
    // hiding Searching module form
    closeSearchingForm.addEventListener('click', function(){
        document.querySelector(`.module__form`).toggleAttribute(`hidden`);
    })
}


baseFunctionalities();
})