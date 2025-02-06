import React, { useEffect, useState } from "react";
// import logo from "../../assets/images/logo-7.png";
import StickyMenu from "../../lib/StickyMenu.js";
import Navigation from "../Navigation.jsx";
import { Link } from "react-router-dom";

function HeaderNews({ action, homePage }) {
  console.log(homePage);
  useEffect(() => {
    StickyMenu();
  });

  //   const [logo, setLogo] = useState(""); // Logo state

  //   useEffect(() => {
  //     if (homePage?.Logo) {
  //       setLogo(homePage.Logo);
  //       console.log("🔍 Updated homePage:", homePage);
  //     }
  //   }, [homePage]);

  //   const [heroData, setHeroData] = useState("");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
  //         );
  //         const result = await response.json();

  //         // API response structure validate karna
  //         if (result.success && result.data) {
  //           console.log("✅ API fetched successfully:", result.data);
  //           setHeroData(result.data);
  //         } else {
  //           console.error("❌ Invalid API response", result);
  //         }
  //       } catch (error) {
  //         console.error("❌ Error fetching hero data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  return (
    <>
      <header className="appie-header-area appie-header-page-area appie-sticky">
        <div className="container">
          <div className="header-nav-box header-nav-box-3 header-nav-box-inner-page">
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
                  {/* <a className="login-btn" href="#">
                    <i className="fal fa-user" /> Login
                  </a> */}
                  <a
                    className="main-btn ml-150 d-lg-block d-none"
                    href="#"
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

export default HeaderNews;
