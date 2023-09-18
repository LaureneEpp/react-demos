import React from 'react';

function WeatherDataComponent({ weatherData }) {
  const { name, sys, main, weather } = weatherData;

  return (
    <div className="jumbotron jumbotron-fluid bg_blue-dark-color">
      <h2>
        Weather in {name}, {sys.country}
      </h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Conditions: {weather[0].description}</p>
    </div>
  );
}

export default WeatherDataComponent;
