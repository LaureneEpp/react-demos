document.addEventListener("DOMContentLoaded", () => {
  // Get all links
  const weatherForm = document.getElementById("weather-form");
  const resetButton = document.getElementById("reset-button");
  const weatherDisplay = document.getElementById("weather-display");
  const weatherMoreInfoDisplay = document.getElementById(
    "weather-more-info-display"
  );

  resetButton.addEventListener("click", () => {
    // Delete weather data
    weatherDisplay.innerHTML = "";
    weatherMoreInfoDisplay.innerHTML = "";

    // Reset form
    weatherForm.reset();

    // Hide the reset button after resetting the form
    resetButton.setAttribute("hidden", "true");
  });
});
