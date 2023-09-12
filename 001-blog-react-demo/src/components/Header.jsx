import "../styles/Header.scss";

import images from "../utils/images";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header
      className="header flex flex-col"
      style={{
        background: `url(${images.hd_base}) center/cover no-repeat`,
      }}>
      <NavBar />
      <div className="container flex-1 w-full flex items-center justify-center">
        <div className="hd-content flex flex-col justify-center items-center text-center">
          <h1 className="hd-title text-orange-sand">NewsRoom</h1>
          <div className="hd-search">
            <form>
              <div className="form-group flex items-stretch bg-white">
                <span className="form-gp-icon items-center justify-center">
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
                <input type="text" className="form-gp-input" />
                <button
                  className="form-gp-btn text-creme bg-blue-light btn"
                  type="button">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="hd-tags text-creme flex items-center">
            <h3 className="hd-tags-title nowrap text-base">Popular tags</h3>
            <ul className="tags-list flex flex-wrap items-center">
              <li className="tags-item text-sm">Design</li>
              <li className="tags-item text-sm">User Experience</li>
              <li className="tags-item text-sm">User Interface</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
