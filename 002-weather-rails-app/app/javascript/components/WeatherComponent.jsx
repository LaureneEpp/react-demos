import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorComponent from "../components/ErrorComponent";
import WeatherDataComponent from "../components/WeatherDataComponent";

function WeatherComponent() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (city.trim() === '') return;

      setLoading(true);

      try {
        const response = await axios.get(`/weather?city=${city}`);
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch weather data.');
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="d-flex flex-column">
      <div className="input-group mb-3">
        <span className="input-group-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a city"
          aria-label="city"
          value={city}
          onChange={handleInputChange}
        />
      </div>

      {loading && <p>Loading weather data...</p>} 

      {error && <ErrorComponent error={error} />}
      {weatherData ? (
        <WeatherDataComponent weatherData={weatherData} />
      ) : (
        <p>
          {city
            ? "Loading weather data..."
            : "Enter a city to get weather data."}
        </p>
      )}
    </div>
  );
}

export default WeatherComponent;
