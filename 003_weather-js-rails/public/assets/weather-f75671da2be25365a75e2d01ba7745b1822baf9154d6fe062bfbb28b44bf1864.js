(() => {
  // app/javascript/weather.js
  document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const weatherDisplay = document.getElementById("weather-display");
    const errorDisplay = document.getElementById("error-display");
    const errorPopup = document.getElementById("error-popup");
    const errorMessage = document.getElementById("error-message");
    let weatherData;
    document.getElementById("weather-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const city = cityInput.value.trim();
      if (!city) {
        console.log("test no city");
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
        appendInfoButton();
      }).catch((error) => {
        handleApiError(error.message);
      });
      fetch(`/location?city=${city}`).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Fail to fetch location data!");
        }
      }).then((locationData) => {
        if (locationData && locationData.features && locationData.features.length > 0) {
          const coordinates = locationData.features[0].center;
          map.setCenter(coordinates);
          map.setZoom(10);
        }
      }).catch((error) => {
        handleApiError(error.message);
      });
    });
    function displayWeather(data) {
      if (!data) {
        console.log("Test no data");
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
      const mapHtml = `
      <div id="map-card" class="card bg_blue-dark-color p-3 primary-color mt-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Map</h5>
          <div id="map"></div>
        </div>
      </div>
    `;
      weatherDisplay.innerHTML = weatherHtml + mapHtml;
      errorDisplay.textContent = "";
      mapboxgl.accessToken = "<%= api_key %>";
      const map2 = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [0, 0],
        zoom: 1
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
          <p class="card-text"><span class="fw-semibold">Sunrise:</span> ${new Date(
        sys.sunrise * 1e3
      ).toLocaleTimeString()}</p>
          <p class="card-text"><span class="fw-semibold">Sunset:</span> ${new Date(
        sys.sunset * 1e3
      ).toLocaleTimeString()}</p>
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

