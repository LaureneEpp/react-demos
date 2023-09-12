import { useState, useEffect } from "react";
import "../styles/NavBar.scss";

const NavBar = () => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    console.log('Scroll event occurred');
    // Your scroll handling logic here
    const offSet = window.scrollY;
    console.log(offSet)
    if (offSet > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  const showSideMenu = () => {
    setSideMenuOpen(true);
  };

  const hideSideMenu = () => {
    setSideMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`navbar flex items-center ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container w-full flex justify-between">
        <div className="brand-and-toggler flex items-center justify-between">
          <a href="#" className="nav-brand text-orange-sand">
            WHAT ABOUT
            <span className="nav-brand-dot bg-orange-sand"></span>
          </a>
          <button type="button" className="nav-show-btn text-creme" onClick={showSideMenu} > 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="text-orange-sand"
              className="bi bi-list"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
        <div className={`nb-menu-wrapper flex items-center ${isSideMenuOpen ? "show" : ""}`}>
          <button type="button" className="nav-hide-btn" onClick={hideSideMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
          <ul className="nav-menu flex items-center">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <span className="nav-link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-bar-down"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M3.646 4.146a.5.5 0 0 1 .708 0L8 7.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zM1 11.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Archives
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
          <div className="nav-btns">
            <a href="#" className="nav-btn btn">
              Get it now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
