import React, { useEffect, useState } from "react";
import logo from "../../assets/images/bitspan.png";
import StickyMenu from "../../lib/StickyMenu.js";
import Navigation from "../Navigation.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";

function HeaderHomeThree({ action, homePage }) {
  console.log(homePage);
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                    <Link to="/">
                      <img src={homePage?.Logo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                  <div className="appie-header-main-menu">
                    <Navigation />
                  </div>
                </div>
                <div className="col-lg-4  col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                  <div className="appie-btn-box text-right">
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
      </Wrapper>
    </>
  );
}

export default HeaderHomeThree;
const Wrapper = styled.div`
  // .appie-logo-box {
  //   display: inline-block;
  //   // padding: 10px;
  //   border-radius: 10px;
  //   transition: box-shadow 0.3s ease;
  // }

  .appie-logo-box img {
    display: block;
    /* width: 100px; Adjust the width as needed */
    height: auto;
    border-radius: 10px;
  }

  // .appie-logo-box:hover {
  //   box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); /* Highlight effect */
  // }
`;
