(() => {
  // app/javascript/weather.js
  document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const weatherDisplay = document.getElementById("weather-display");
    const weatherMoreInfoDisplay = document.getElementById(
      "weather-more-info-display"
    );
    const errorDisplay = document.getElementById("error-display");
    const errorPopup = document.getElementById("error-popup");
    const errorMessage = document.getElementById("error-message");
    const resetButton = document.getElementById("reset-button");
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
            <span>
              <span id="map-icon-container">
              </span>
            </span>
            <span class="ms-2">Weather in ${name} in ${sys.country}</spaan>
            </h5>
            <p class="card-text"><span class="fw-semibold">Temperature:</span> ${main.temp}\xB0C</p>
            <p class="card-text"><span class="fw-semibold">Conditions:</span> ${weather[0].description}</p>
          </div>
        </div>
      `;
      weatherDisplay.innerHTML = weatherHtml;
      errorDisplay.textContent = "";
      resetButton.removeAttribute("hidden");
      addMapIconLink(name);
    }
    function generateMapLink(city) {
      const formattedCity = city.replace(/\s+/g, "+");
      const mapServiceUrl = `https://www.google.com/maps/search/?api=1&query=${formattedCity}`;
      return mapServiceUrl;
    }
    function addMapIconLink(city) {
      const mapIconContainer = document.getElementById("map-icon-container");
      const mapLink = document.createElement("a");
      mapLink.href = generateMapLink(city);
      mapLink.target = "_blank";
      const mapIcon = document.createElement("svg");
      mapIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      mapIcon.setAttribute("width", "25");
      mapIcon.setAttribute("height", "25");
      mapIcon.setAttribute("fill", "currentColor");
      mapIcon.setAttribute("class", "bi bi-geo-alt yellow-sun-color");
      mapIcon.setAttribute("viewBox", "0 0 16 16");
      const path = document.createElement("path");
      path.setAttribute(
        "d",
        "M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
      );
      mapIcon.appendChild(path);
      mapLink.appendChild(mapIcon);
      mapIconContainer.appendChild(mapLink);
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
        "Clouds"
      ];
      infoTypes.forEach((infoType) => {
        const infoButton = document.createElement("button");
        infoButton.classList.add(
          "btn",
          "btn-outline-dark",
          "m-2",
          "p-2",
          "g-col-6",
          "g-col-md-4"
        );
        infoButton.textContent = infoType;
        infoButton.addEventListener("click", () => {
          addInfoType(infoType, infoButton);
        });
        infoTypesContainer.append(infoButton);
      });
      weatherMoreInfoDisplay.innerHTML = "";
      weatherMoreInfoDisplay.append(infoTypesContainer);
    }
    function addInfoType(infoType, infoButton) {
      if (!selectedInfoTypes.includes(infoType)) {
        selectedInfoTypes.push(infoType);
        infoButton.style.display = "none";
        displaySelectedInfo();
      }
    }
    const selectedInfoContainer = document.createElement("div");
    selectedInfoContainer.setAttribute("id", "selected-info-container");
    selectedInfoContainer.classList.add(
      "card",
      "bg_blue-dark-color",
      "p-3",
      "primary-color",
      "mt-3",
      "mx-auto",
      "d-flex",
      "align-items-center"
    );
    selectedInfoContainer.style.width = "18rem";
    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    selectedInfoContainer.append(card_body);
    const selectedInfoList = document.createElement("ul");
    selectedInfoList.classList.add("list-unstyled");
    card_body.appendChild(selectedInfoList);
    function displaySelectedInfo() {
      selectedInfoList.innerHTML = "";
      selectedInfoTypes.forEach((infoType) => {
        const infoText = getInfoText(infoType);
        if (infoText) {
          const listItem = document.createElement("li");
          listItem.classList.add("card-text", "my-2");
          listItem.textContent = infoText;
          selectedInfoList.appendChild(listItem);
        }
      });
      weatherMoreInfoDisplay.appendChild(selectedInfoContainer);
    }
    function getInfoText(infoType) {
      switch (infoType) {
        case "Temperature min":
          return `Temperature min: ${weatherData.main.temp_min}\xB0C`;
        case "Temperature max":
          return `Temperature max: ${weatherData.main.temp_max}\xB0C`;
        case "Humidity":
          return `Humidity: ${weatherData.main.humidity}%`;
        case "Wind Speed":
          return `Wind Speed: ${weatherData.wind.speed} m/s`;
        case "Sunrise":
          return `Sunrise: ${new Date(
            weatherData.sys.sunrise * 1e3
          ).toLocaleTimeString()}`;
        case "Sunset":
          return `Sunset: ${new Date(
            weatherData.sys.sunset * 1e3
          ).toLocaleTimeString()}`;
        case "Pressure":
          return `Pressure: ${weatherData.main.pressure}`;
        case "Longitude":
          return `Longitude: ${weatherData.coord.lon}`;
        case "Latitude":
          return `Latitude: ${weatherData.coord.lat}`;
        case "Rain":
          return `Clouds: ${weatherData.clouds.all} %`;
        default:
          return "";
      }
    }
  });
})();

