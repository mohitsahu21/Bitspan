import React from "react";
import { Link } from "react-router-dom";

function Navigation({ lang = false }) {
  // Section par scroll karne ka function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {lang ? (
        <ul></ul>
      ) : (
        <ul>
          <li>
            {/* <a href="#"> */}
            {/* <a href="/">
              Home
              <i className="fal fa-angle-down" />
            </a> */}
            <Link to="/">Home</Link>
            {/* <a href="#" onClick={() => scrollToSection("home")}>
              Home
            </a> */}
            {/* <ul className="sub-menu">
              <li>
                                <Link to="/">Home 1</Link>
                            </li>
              <li>
                <Link to="/home-two">Home 2</Link>
              </li>
              <li>
                <Link to="/home-three">Home 3</Link>
              </li>
              <li>
                <Link to="/home-four">Home 4</Link>
              </li>
              <li>
                                <Link to="/home-five">Home 5</Link>
                            </li>
                            <li>
                                <Link to="/home-six">Home 6</Link>
                            </li>
                            <li>
                                <Link to="/home-seven">Home 7</Link>
                            </li>
                            <li>
                                <Link to="/home-eight">Home 8</Link>
                            </li>
                            <li>
                                <Link to="/home-dark">Home Dark</Link>
                            </li>
              <li>
                                <Link to="/home-rtl">Home Rtl</Link>
                            </li>
            </ul> */}
          </li>
          <li>
            <Link to="/contact">Contact</Link>
            {/* <a href="#" onClick={() => scrollToSection("contacts")}>
              Contact
            </a> */}
          </li>
          <li>
            <Link to="/FindId">Find UserId</Link>
          </li>
          <li>
            {/* <Link to="/about-us">About</Link> */}
            {/* <a href="#" onClick={() => scrollToSection("about")}>
              About
            </a> */}
          </li>
          <li>
            {/* <Link to="/service">Service</Link> */}
            {/* <a href="#" onClick={() => scrollToSection("Services")}>
              Service
            </a> */}
          </li>

          {/* <li>
            <a href="#">
              Pages <i className="fal fa-angle-down" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/about-us-another">About 2</Link>
              </li>
              <li>
                <Link to="/error">Error</Link>
              </li>
              <li>
                <Link to="/shops">Shops</Link>
              </li>
              <li>
                <Link to="/shops/shop-details">Shop details</Link>
              </li>
            </ul>
          </li> */}
          {/* <li>
            <a href="#">
              News <i className="fal fa-angle-down" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/news">News Page</Link>
              </li>
              <li>
                <Link to="/news/single-news">Single News</Link>
              </li>
            </ul>
          </li> */}
        </ul>
      )}
    </>
  );
}

export default Navigation;
