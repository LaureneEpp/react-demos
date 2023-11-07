import React, { useState } from "react";
import {Link} from "react-router-dom"

const Navbar = () => {

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg_primary-color">
      <div className="container-fluid">
        <a
          className="navbar-brand text-uppercase fw-bold fs-3 white-color "
          href="#">
          YogaRoom
        </a>
        <Link
          to="/"
          className="btn btn-lg secondary-color menu-toggle"
          role="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-house-door-fill"
            viewBox="0 0 16 16">
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
          </svg>
        </Link>
      </div>
    </nav>
    
  );
};

export default Navbar;
