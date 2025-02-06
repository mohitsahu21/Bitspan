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

const RefundPolicy = ({ homePage }) => {
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
        title="Refund Policy"
        breadcrumb={[
          { link: "/", title: "Home" },
          { link: "/RefundPolicy", title: "Refund Policy" },
        ]}
      />
      <div className="container mt-5 p-2">
        <div className="row justify-content-center">
          <div className="col-md-10 mt-5 mb-5 p-5">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center">
                <h3>Refund and Cancellation Policy</h3>
              </div>
              <div className="card-body">
                <p>
                  Since our Website offers non-tangible, irrevocable goods, we
                  do not provide refunds after the product is purchased, which
                  you acknowledge prior to purchasing any product on the
                  Website.
                </p>
                <p>
                  Please make sure that you’ve carefully read the service
                  description before making a purchase.
                </p>
              </div>
              <div className="card-footer text-center bg-light">
                <p>
                  <strong>Contacting Us:</strong> If you would like to contact
                  us concerning any matter relating to this Refund Policy, you
                  may do so via the contact form or send an email to{" "}
                  <a href="mailto:admin@bitspan.in">admin@bitspan.in</a>.
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

export default RefundPolicy;
