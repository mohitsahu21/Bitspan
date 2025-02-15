import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo-2.png";
import StickyMenu from "../../lib/StickyMenu.js";
import Navigation from "../Navigation.jsx";
import heroThumb1 from "../../assets/images/about-1.png";
import { Link } from "react-router-dom";

function HeaderHomeTwo({ action, homePage }) {
  console.log(homePage);
  // Section par scroll karne ka function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    StickyMenu();
  }, []);

  if (!homePage) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="appie-header-area appie-header-2-area appie-sticky">
        <div className="container">
          <div className="header-nav-box">
            <div className="row align-items-center">
              <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                <div className="appie-logo-box">
                  {/* <a href="/">
                    <img src={heroData.Logo} alt="" />
                  </a> */}
                  <Link to="/">
                    <img src={homePage?.Logo} alt="" />
                  </Link>
                  {/* <h4>Bitspan.in</h4> */}
                </div>
              </div>
              <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                <div className="appie-header-main-menu">
                  <Navigation />
                </div>
              </div>
              <div className="col-lg-4  col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                <div className="appie-btn-box text-right">
                  {/* <a className="login-btn" href="#">
                    <i className="fal fa-user" /> Login
                  </a> */}
                  <a
                    className="main-btn ml-150 d-lg-block d-none"
                    href="https://dashboard.2kadam.co.in/"
                    // onClick={() => scrollToSection("join")}
                  >
                    <i className="fal fa-user px-1" /> Login
                  </a>
                  <div
                    onClick={(e) => action(e)}
                    className="toggle-btn ml-30 canvas_open d-lg-none d-block"
                  >
                    <i className="fa fa-bars" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderHomeTwo;
