import React, { useEffect } from "react";
import logo from "../../assets/images/bitspan.png";
import StickyMenu from "../../lib/StickyMenu.js";
import Navigation from "../Navigation.jsx";
import styled from "styled-components";

function HeaderHomeThree({ action }) {
  useEffect(() => {
    StickyMenu();
  });
  return (
    <>
      <Wrapper>
        <header className="appie-header-area appie-header-3-area appie-sticky">
          <div className="container">
            <div className="header-nav-box header-nav-box-3">
              <div className="row align-items-center">
                <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                  <div className="appie-logo-box">
                    <a href="/">
                      <img src={logo} alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                  <div className="appie-header-main-menu">
                    <Navigation />
                  </div>
                </div>
                <div className="col-lg-4  col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                  <div className="appie-btn-box text-right">
                    <a className="login-btn" href="#">
                      <i className="fal fa-user" /> Login
                    </a>
                    <a className="main-btn ml-30" href="#">
                      Get Started
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
      </Wrapper>
    </>
  );
}

export default HeaderHomeThree;
const Wrapper = styled.div`
  .appie-logo-box {
    display: inline-block;
    padding: 10px;
    border-radius: 10px;
    transition: box-shadow 0.3s ease;
  }

  .appie-logo-box img {
    display: block;
    /* width: 100px; Adjust the width as needed */
    height: auto;
    border-radius: 10px;
  }

  .appie-logo-box:hover {
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); /* Highlight effect */
  }
`;
