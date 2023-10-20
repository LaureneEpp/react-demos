import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container">
        <h1 className="display-4">Yoga Room</h1>
        <p className="lead">
          A list of yoga classes for the best yoga in town.
        </p>
        <hr className="my-4" />
        <Link
          to="/yoga_lessons"
          className="btn btn-lg custom-button mx-2"
          role="button">
            What?
            </Link>
            <Link
          to="/yoga_classes"
          className="btn btn-lg custom-button mx-2"
          role="button">
            When?
        </Link>
      </div>
    </div>
  </div>
    </>
  )

}

export default Home; 
