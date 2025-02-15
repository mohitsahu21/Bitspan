import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";

import Drawer from "../Mobile/Drawer.jsx";

import HeaderHomeTwo from "../HomeTwo/HeaderHomeTwo";
import FooterHomeTwo from "../HomeTwo/FooterHomeTwo";
import ScrollingInfo from "../Info/ScrollingInfo.jsx";
import HeaderNews from "../News/HeaderNews.jsx";
import HeroNews from "../News/HeroNews.jsx";

const TermsCondition = ({ homePage }) => {
  console.log(homePage);
  const [drawer, drawerAction] = useToggle(false);
  return (
    <>
      <Drawer
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />

      {/* <HeaderHomeTwo action={drawerAction.toggle} /> */}

      <HeaderNews
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      <HeroNews
        title="Terms & Condition"
        breadcrumb={[
          { link: "/", title: "Home" },
          { link: "/Terms-and-Condition", title: "Terms & Condition" },
        ]}
      />
      <div className="container mt-5 p-2">
        <div className="row justify-content-center">
          <div className="col-md-10 mt-5 mb-5 p-5">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center">
                <h3>Terms and Conditions</h3>
              </div>
              <div className="card-body">
                <p>
                  This website is designed, developed and maintained by BITS
                  PAN, formerly known as BITS PAN. These term and condition
                  shall be governed by and construed in accordance with the
                  Indian Laws. Any dispute arising under these terms and
                  conditions shall be subject to the jurisdiction of the courts
                  of India.
                </p>
                <br />
                <p>
                  The information posted on this website could include hypertext
                  links or pointers to information created and maintained by
                  non-Government/private organizations. The website is providing
                  these links and pointers solely for your information and
                  convenience. When you select a link to an outside website, you
                  are leaving this site and are subject to the privacy and
                  security policies of the owners/sponsors of the outside
                  website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterHomeTwo homePage={homePage} />
      {/* <BackToTop className="back-to-top-2 mb-2" /> */}
      {/* <ScrollingInfo homePage={homePage} /> */}
    </>
  );
};

export default TermsCondition;
