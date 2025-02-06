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

const PrivacyPolicy = ({ homePage }) => {
  console.log(homePage);
  const [drawer, drawerAction] = useToggle(false);
  return (
    <>
      <Drawer drawer={drawer} action={drawerAction.toggle} />

      {/* <HeaderHomeTwo action={drawerAction.toggle} /> */}
      <HeaderNews
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      <HeroNews
        title="Privacy Policies"
        breadcrumb={[
          { link: "/", title: "Home" },
          { link: "/PrivacyPolicies", title: "Privacy Policies" },
        ]}
      />
      <div className="container mt-5 p-2">
        <div className="row justify-content-center">
          <div className="col-md-10 mt-5 mb-5 p-5">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center">
                <h3>Privacy Policies</h3>
              </div>
              <div className="card-body">
                <p>
                  We do not collect personal information for any purpose other
                  than to respond to you (for example, to respond to your
                  queries ). If you choose to provide us with personal
                  information like filling out a Contact Us form with an e-mail
                  address or postal address, and submitting it to us through the
                  website, we use that information to respond to your message,
                  and to help you get the information you have requested. Our
                  website never collects information or creates individual
                  profiles for commercial marketing. While you must provide an
                  e-mail address for a localised response to any incoming
                  questions or comments to us, we recommend that you do NOT
                  include any other personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterHomeTwo homePage={homePage} />
      <BackToTop className="back-to-top-2 mb-2" />
      <ScrollingInfo homePage={homePage} />
    </>
  );
};

export default PrivacyPolicy;
