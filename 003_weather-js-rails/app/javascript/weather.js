document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const weatherDisplay = document.getElementById("weather-display");
  const errorDisplay = document.getElementById("error-display");
  const errorPopup = document.getElementById("error-popup");
  const errorMessage = document.getElementById("error-message");

  let weatherData;

  document
    .getElementById("weather-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const city = cityInput.value.trim();

      if (!city) {
        handleApiError("Enter a correct city");
        weatherDisplay.textContent = "";
        return;
      }

      fetch(`/weather?city=${city}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Fail to fetch weather data!");
          }
        })
        .then((data) => {
          weatherData = data;
          displayWeather(weatherData);
          errorDisplay.textContent = "";
          appendInfoButton();
        })
        .catch((error) => {
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
            <p class="card-text"><span class="fw-semibold">Temperature:</span> ${main.temp}°C</p>
            <p class="card-text"><span class="fw-semibold">Conditions:</span> ${weather[0].description}</p>
          </div>
        </div>
      `;

    weatherDisplay.innerHTML = weatherHtml;
    errorDisplay.textContent = "";

    addMapIconLink(name);
  }

  function generateMapLink(city) {
    const formattedCity = city.replace(/\s+/g, '+');
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

    // Create the path for the map icon (you can customize this)
    const path = document.createElement("path");
    path.setAttribute(
      "d",
      "M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
    );

    // Append the path to the map icon
    mapIcon.appendChild(path);

    // Append the map icon to the map link
    mapLink.appendChild(mapIcon);

    // Append the map link to the map icon container
    mapIconContainer.appendChild(mapLink);
  }

  function handleApiError(errorMessage) {
    showError(errorMessage);
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
          <p class="card-text"><span class="fw-semibold">Humidity:</span> ${
            main.humidity
          }%</p>
          <p class="card-text"><span class="fw-semibold">Wind Speed:</span> ${
            wind.speed
          } m/s</p>
          <p class="card-text"><span class="fw-semibold">Sunrise:</span> ${new Date(
            sys.sunrise * 1000
          ).toLocaleTimeString()}</p>
          <p class="card-text"><span class="fw-semibold">Sunset:</span> ${new Date(
            sys.sunset * 1000
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
