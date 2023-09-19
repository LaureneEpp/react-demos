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
        "Clouds"
      ];
      infoTypes.forEach((infoType) => {
        const infoButton = document.createElement("button");
        infoButton.classList.add(
          "btn",
          "btn-outline-secondary",
          "m-2",
          "p-2",
          "g-col-6",
          "g-col-md-4"
        );
        infoButton.textContent = infoType;
        infoButton.addEventListener("click", () => {
          console.log("Test btn");
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
      "mx-auto"
    );
    selectedInfoContainer.style.width = "18rem";
    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    selectedInfoContainer.append(card_body);
    const selectedInfoList = document.createElement("ul");
    selectedInfoList.classList.add('list-unstyled"');
    card_body.appendChild(selectedInfoList);
    function displaySelectedInfo() {
      selectedInfoList.innerHTML = "";
      selectedInfoTypes.forEach((infoType) => {
        const infoText = getInfoText(infoType);
        if (infoText) {
          const listItem = document.createElement("li");
          listItem.classList.add("card-text");
          listItem.textContent = infoText;
          selectedInfoList.appendChild(listItem);
        }
      });
      weatherMoreInfoDisplay.appendChild(selectedInfoContainer);
    }
    function getInfoText(infoType) {
      switch (infoType) {
        case "Temperature min":
          return `<span class="fw-semibold">Temperature min:</span> ${weatherData.main.temp_min}\xB0C`;
        case "Temperature max":
          return `<span class="fw-semibold">Temperature max:</span> ${weatherData.main.temp_max}\xB0C`;
        case "Humidity":
          return `<span class="fw-semibold">Humidity:</span> ${weatherData.main.humidity}%`;
        case "Wind Speed":
          return `<span class="fw-semibold">Wind Speed:</span> ${weatherData.wind.speed} m/s`;
        case "Sunrise":
          return `<span class="fw-semibold">Sunrise:</span> ${new Date(
            weatherData.sys.sunrise * 1e3
          ).toLocaleTimeString()}`;
        case "Sunset":
          return `<span class="fw-semibold">Sunset:</span> ${new Date(
            weatherData.sys.sunset * 1e3
          ).toLocaleTimeString()}`;
        case "Pressure":
          return `<span class="fw-semibold">Pressure:</span> ${weatherData.main.pressure}`;
        case "Longitude":
          return `<span class="fw-semibold">Longitude:</span> ${weatherData.coord.lon}`;
        case "Latitude":
          return `<span class="fw-semibold">Latitude:</span> ${weatherData.coord.lat}`;
        case "Rain":
          return `<span class="fw-semibold">Clouds:</span> ${weatherData.clouds.all} %`;
        default:
          return "";
      }
    }
  });
})();

