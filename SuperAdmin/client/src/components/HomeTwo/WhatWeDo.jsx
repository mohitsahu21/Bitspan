import React, { useEffect, useState } from "react";
import heroThumb1 from "../../assets/images/about-1.png";

// ✅ Default dummy data
const defaultHeroData = {
  Home_Page_1st_Paragraph: "Welcome to Bitspan",
  Home_Page_2nd_Paragraph: "Your Trusted Partner in Finance",
  Calling_No: "0000000000",
  Email_Id: "info@bitspan.com",
  Home_Page_Background: heroThumb1, // ✅ Default Background Image
  Logo: "/default-logo.png",
};

function WhatWeDo({ className, homePage }) {
  console.log(homePage);
  // const [heroData, setHeroData] = useState(defaultHeroData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
  //       );
  //       const result = await response.json();

  //       // API response structure validate karna
  //       if (result.success && result.data) {
  //         console.log("✅ API fetched successfully:", result.data);
  //         setHeroData(result.data);
  //       } else {
  //         console.error("❌ Invalid API response", result);
  //       }
  //     } catch (error) {
  //       console.error("❌ Error fetching hero data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (!homePage) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section
        className={`appie-services-2-area pb-100 ${className}`}
        id="service"
      >
        <div className="container mt-5">
          <div className="row align-items-end">
            <div className="col-lg-12 col-md-8">
              <div className="appie-section-title">
                <h3 className="appie-title">WHAT WE DO ?</h3>
                <p>
                  BITS PAN IS LEADING B2B PTAL WE HAVE 10K+ SATISFIED CUSTOMERS
                  TODAY AT WWW.BITSPAN.IN CREATED BY THE INDUSTRY LEADERS, BITS
                  PAN PAN PROVIDES A DEDICATED TEAM FOR EACH CUSTOMER WHO MAKES
                  SURE THAT THE WORK IS DONE WITHIN THE TIME FRAME
                </p>
              </div>
            </div>
            {/* <div className="col-lg-6 col-md-4">
                            <div className="appie-section-title text-right">
                                <a className="main-btn" href="#">
                                    View all Features <i className="fal fa-arrow-right" />
                                </a>
                            </div>
                        </div> */}
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div
                className="appie-single-service-2 mt-30 wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="200ms"
              >
                <div className="icon">
                  <i className="fas fa-bolt" />
                </div>
                <h4 className="title">B2B PAN CARD PORTAL</h4>
                <div style={{ textAlign: "start" }}>
                  <ul>
                    <li> • Become Authorized PAN Agent.</li>
                    <li> • Smart Portal for Smart People</li>
                    <li> • 99% Uptime</li>
                    <li> • Best Commissions</li>
                    <li> • Fastest Fund Approval System.</li>

                    <li> • Payment Gatway LIVE System</li>
                  </ul>
                </div>
                {/* <a href="#">
                                    Read Mor <i className="fal fa-arrow-right" />
                                </a> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="appie-single-service-2 item-2 mt-30 wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="400ms"
              >
                <div className="icon">
                  <i className="fas fa-home" />
                </div>
                <h4 className="title">
                  RETAILER, DISTRIBUTOR & SUPER DISTRIBUTOR
                </h4>
                <p>
                  A Retailer can start a PAN center with minimum investment
                  only.Retailer can makes unlimited PAN cards through proper
                  channel. A Distributor can makes unlimited PAN cards.He/She
                  can create unlimited Retailers with low cost investment only.
                </p>
                {/* <a href="#">
                                    Read Mor <i className="fal fa-arrow-right" />
                                </a> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="appie-single-service-2 item-3 mt-30 wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="600ms"
              >
                <div className="icon">
                  <i className="fas fa-link" />
                </div>
                <h4 className="title">PAN CARD WHITE LABEL</h4>
                <p>
                  We are providing pan card white label portal for your
                  business. Here you can create unlimited pan card agent, pan
                  card Super distributor & distributor with full admin control
                  panel. You can upload your company logo. If you want to
                  business with pan card white label then TEST is best for your
                  company.
                </p>
                {/* <a href="#">
                                    Read Mor <i className="fal fa-arrow-right" />
                                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhatWeDo;
