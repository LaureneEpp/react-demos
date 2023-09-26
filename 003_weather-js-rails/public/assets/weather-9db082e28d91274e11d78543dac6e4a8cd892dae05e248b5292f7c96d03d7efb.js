(() => {
  // app/javascript/weather.js
  document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const weatherDisplay = document.getElementById("weather-display");
    const weatherMoreInfoDisplay = document.getElementById("weather-more-info-display");
    const errorDisplay = document.getElementById("error-display");
    const errorPopup = document.getElementById("error-popup");
    const errorMessage = document.getElementById("error-message");
    let weatherData;
    const selectedInfoTypes = [];
    document.getElementById("weather-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const city = cityInput.value.trim();
      if (!city) {
        handleApiError("Enter a correct city");
        weatherDisplay.textContent = "";
        return;
      }
      fetch(`/weather?city=${city}`).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Fail to fetch weather data!");
        }
      }).then((data) => {
        weatherData = data;
        displayWeather(weatherData);
        errorDisplay.textContent = "";
        createInfoButtons();
      }).catch((error) => {
        handleApiError(error.message);
      });
    });
    function displayWeather(data) {
      if (!data) {
        handleApiError("Weather data is undefined.");
        return;
      }
      const { name, sys, main, weather } = data;
      const weatherHtml = `
        <div class="card bg_blue-dark-color p-3 primary-color" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title d-flex flex-row">

            <span class="ms-2">Weather in ${name} in ${sys.country}</spaan>
            </h5>
            <p class="card-text"><span class="fw-semibold">Temperature:</span> ${main.temp}\xB0C</p>
            <p class="card-text"><span class="fw-semibold">Conditions:</span> ${weather[0].description}</p>
          </div>
        </div>
      `;
      weatherDisplay.innerHTML = weatherHtml;
      errorDisplay.textContent = "";
    }
    function handleApiError(errorMessage2) {
      showError(errorMessage2);
      weatherDisplay.textContent = "";
    }
    errorPopup.addEventListener("click", hideError);
    document.addEventListener("click", (event) => {
      if (event.target === errorPopup) {
        hideError();
      }
    });
    function showError(message) {
      errorMessage.textContent = message;
      errorPopup.style.display = "flex";
    }
    function hideError() {
      errorPopup.style.display = "none";
    }
    function createInfoButtons() {
      console.log("Test creation button");
      const infoTypesContainer = document.createElement("div");
      infoTypesContainer.setAttribute("id", "info-types-container");
      infoTypesContainer.classList.add("grid", "text-center");
      const infoTypes = [
        "Temperature min",
        "Temperature max",
        "Humidity",
        "Wind Speed",
        "Sunrise",
        "Sunset",
        "Pressure",
        "Longitude",
        "Latitude",
        "Rain",
        "Clouds"
      ];
      infoTypes.forEach((infoType) => {
        const infoButton = document.createElement("button");
        infoButton.classList.add("btn", "btn-outline-secondary", "m-2", "p-2", "g-col-6", "g-col-md-4");
        infoButton.textContent = infoType;
        infoButton.addEventListener("click", () => {
          addInfoType(infoType);
        });
        infoTypesContainer.append(infoButton);
      });
      weatherMoreInfoDisplay.append(infoTypesContainer);
    }
  });
})();

