import React from 'react';
import WeatherComponent from "../components/WeatherComponent"; 

const Home = () => (
  <div className="vw-100 vh-100 primary-color d-flex flex-column align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Sunshine Weather</h1>
        <p className="lead">
          How is the sun where you are?
        </p>
        <hr className="my-4" />
      </div>
    </div>
      <WeatherComponent />
  </div>
);
export default Home;
