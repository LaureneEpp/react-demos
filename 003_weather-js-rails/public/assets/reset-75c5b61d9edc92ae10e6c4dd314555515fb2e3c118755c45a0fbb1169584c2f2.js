(() => {
  // app/javascript/reset.js
  document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.getElementById("weather-form");
    const resetButton = document.getElementById("reset-button");
    const weatherDisplay = document.getElementById("weather-display");
    const weatherMoreInfoDisplay = document.getElementById(
      "weather-more-info-display"
    );
    resetButton.addEventListener("click", () => {
      weatherDisplay.innerHTML = "";
      weatherMoreInfoDisplay.innerHTML = "";
      weatherForm.reset();
      resetButton.setAttribute("hidden", "true");
    });
  });
})();

