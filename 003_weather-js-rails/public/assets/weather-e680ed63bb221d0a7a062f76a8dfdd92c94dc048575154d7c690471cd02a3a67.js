(() => {
  // app/javascript/weather.js
  document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const weatherDisplay = document.getElementById("weather-display");
    const errorDisplay = document.getElementById("error-display");
    const errorPopup = document.getElementById("error-popup");
    const errorMessage = document.getElementById("error-message");
    let weatherData;
    let map;
    document.getElementById("weather-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const city = cityInput.value.trim();
      if (!city) {
        handleApiError("Enter a correct city");
        weatherDisplay.textContent = "";
        return;
      }
      fetchWeatherData(city).then((data) => {
        weatherData = data;
        displayWeatherAndMap(weatherData);
        errorDisplay.textContent = "";
        appendInfoButton();
      }).catch((error) => {
        handleApiError(error.message);
      });
    });
    function fetchWeatherData(city) {
      return fetch(`/weather?city=${city}`).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Fail to fetch weather data!");
        }
      });
    }
    function displayWeatherAndMap(weatherData2) {
      if (!weatherData2) {
        handleApiError("Weather data is missing.");
        return;
      }
      const { name, sys, main, weather } = weatherData2;
      const weatherHtml = `
      <div class="card bg_blue-dark-color p-3 primary-color" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title d-flex flex-row">
            <span class="ms-2">Weather in ${name} in ${sys.country}</span>
          </h5>
          <p class="card-text"><span class="fw-semibold">Temperature:</span> ${main.temp}\xB0C</p>
          <p class="card-text"><span class="fw-semibold">Conditions:</span> ${weather[0].description}</p>
        </div>
      </div>
      <div class="card bg_blue-dark-color p-3 primary-color" style="width: 18rem;">
        <div class="card-body" id="map-container">
          <div id="map"></div>
        </div>
      </div>
    `;
      weatherDisplay.innerHTML = weatherHtml;
      errorDisplay.textContent = "";
      mapboxgl.accessToken = "Ypk.eyJ1IjoibGF1cmVuZWpvIiwiYSI6ImNsbXEyY3VibTFrcmkybHM3aHg5bXVmb3cifQ.ZyO5_NAbEOZrdnGqZ3zjOw";
      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [0, 0],
        // You can set the initial center coordinates
        zoom: 1
        // You can set the initial zoom level
      });
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
    function appendInfoButton() {
      const infoButton = document.createElement("button");
      infoButton.textContent = "+";
      infoButton.id = "info-button";
      infoButton.classList.add("btn", "btn-light", "mt-3");
      infoButton.addEventListener("click", () => {
        displayMoreInfo(weatherData);
      });
      weatherDisplay.appendChild(infoButton);
    }
    function displayMoreInfo(data) {
      if (!data) {
        errorDisplay.textContent = "Weather data is undefined.";
        return;
      }
      const { main, wind, sys } = data;
      const moreInfoHtml = `
      <div class="card bg_blue-dark-color p-3 primary-color mt-3" style="width: 18rem;">
        <div class="card-body">
          <p class="card-text"><span class="fw-semibold">Humidity:</span> ${main.humidity}%</p>
          <p class="card-text"><span class="fw-semibold">Wind Speed:</span> ${wind.speed} m/s</p>
          <p class="card-text"><span class="fw-semibold">Sunrise:</span> ${new Date(sys.sunrise * 1e3).toLocaleTimeString()}</p>
          <p class="card-text"><span class="fw-semibold">Sunset:</span> ${new Date(sys.sunset * 1e3).toLocaleTimeString()}</p>
        </div>
      </div>
    `;
      const moreInfoContainer = document.createElement("div");
      moreInfoContainer.innerHTML = moreInfoHtml;
      weatherDisplay.appendChild(moreInfoContainer);
      document.getElementById("info-button").style.display = "none";
    }
  });
})();

