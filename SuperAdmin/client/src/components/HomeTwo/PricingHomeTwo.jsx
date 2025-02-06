import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import heroThumb1 from "../../assets/images/about-1.png";

// ✅ Default dummy data
// const defaultHeroData = {
//   Home_Page_1st_Paragraph: "Welcome to Bitspan",
//   Home_Page_2nd_Paragraph: "Your Trusted Partner in Finance",
//   Calling_No: "0000000000",
//   Email_Id: "info@bitspan.com",
//   Home_Page_Background: heroThumb1, // ✅ Default Background Image
//   Logo: "/default-logo.png",
// };

function PricingHomeTwo({ homePage }) {
  console.log(homePage);
  const [toggleSwitch, setSwitchValue] = useState(true);
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

  const handleSwitch = (e) => {
    e.preventDefault();
    setSwitchValue(!toggleSwitch);
  };
  return (
    <>
      <section className="appie-pricing-2-area pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="appie-section-title text-center">
                <h3 className="appie-title ">What We Serve To You</h3>
                <p className="">
                  A Retailer can start a PAN center with minimum investment
                  only. Retailer can makes unlimited PAN cards through proper
                  channel. A Distributor can makes unlimited PAN cards.He/She
                  can create unlimited Retailers with low cost investment only.
                  T&C apply. Super Distributor can makes unlimited PAN
                  cards.He/She can create unlimited Distributors & Retailers
                  with low cost investment.
                </p>
                {/* <div className="appie-pricing-tab-btn">
                                    <ul
                                        className="nav nav-pills mb-3"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <a
                                                onClick={(e) => handleSwitch(e)}
                                                className={`nav-link  ${
                                                    toggleSwitch ? 'active' : ''
                                                }`}
                                                href="#"
                                                type="button"
                                                role="tab"
                                            >
                                                Monthly
                                            </a>
                                        </li>
                                        <li
                                            className={`nav-item ${toggleSwitch ? 'on' : 'off'}`}
                                            role="presentation"
                                        >
                                            <a
                                                onClick={(e) => handleSwitch(e)}
                                                className={`nav-link  ${
                                                    toggleSwitch === false ? 'active' : ''
                                                }`}
                                                href="#"
                                                type="button"
                                                role="tab"
                                            >
                                                Yearly
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mt-5">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className={`tab-pane fade ${
                    toggleSwitch ? "active show" : ""
                  }`}
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-6">
                      <div
                        className="
                        pricing-one__single pricing-one__single_2
                        wow
                        animated
                        fadeInLeft
                      "
                      >
                        <div className="pricig-heading">
                          <h6>Own Brand Portal</h6>
                          <div className="price-range">
                            <sup>₹</sup>{" "}
                            <span>{homePage?.White_Label_Joining_Price}</span>
                            {/* <p>/month</p> */}
                          </div>
                          {/* <p>Get your 14 day free trial</p> */}
                        </div>
                        <div className="pricig-body text-center">
                          {/* <ul>
                                                        <li>
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 15 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
                                                        </li>
                                                    </ul> */}
                          Start Own brand portal with own website.Here you can
                          access your control panel & manage Retailers,
                          Distributors, Super Distributors
                          {/* <div className="pricing-btn mt-35">
                            <a className="main-btn" href="#">
                              Choose plan
                            </a>
                          </div> */}
                          <div className="pricing-btn mt-35">
                            <Link to="/Register" className="main-btn">
                              Choose plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div
                        className="
                        pricing-one__single pricing-one__single_2
                        active
                        wow
                        animated
                        fadeInUp
                      "
                      >
                        <div className="pricig-heading">
                          <h6>Super Distributor</h6>
                          <div className="price-range">
                            <sup>₹</sup>{" "}
                            <span>
                              {homePage?.Super_Distributor_Joining_Price}
                            </span>
                            {/* <p>/month</p> */}
                          </div>
                          {/* <p>Billed $276 per website annually.</p> */}
                        </div>
                        <div className="pricig-body text-center">
                          {/* <ul>
                                                        <li>
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 50 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
                                                        </li>
                                                    </ul> */}
                          Super Distributor can makes unlimited PAN cards.He/She
                          can create unlimited Distributors & Retailers with low
                          cost investment.T&C apply.
                          <div className="pricing-btn mt-35">
                            <Link to="/Register" className="main-btn">
                              Choose plan
                            </Link>
                          </div>
                          <div className="pricing-rebon">
                            <span>Most Popular</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div
                        className="
                        pricing-one__single pricing-one__single_2
                        item-2
                        wow
                        animated
                        fadeInRight
                      "
                      >
                        <div className="pricig-heading">
                          <h6>Distributor</h6>
                          <div className="price-range">
                            <sup>₹</sup>{" "}
                            <span>{homePage?.Distributor_Joining_Price}</span>
                            {/* <p>/month</p> */}
                          </div>
                          {/* <p>Billed $276 per website annually.</p> */}
                        </div>
                        <div className="pricig-body">
                          {/* <ul>
                                                        <li>
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> Data
                                                            security
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 100 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
                                                        </li>
                                                    </ul> */}
                          A Distributor can makes unlimited PAN cards.He/She can
                          create unlimited Retailers with low cost investment
                          only.
                          <div className="pricing-btn mt-35">
                            <Link to="/Register" className="main-btn">
                              Choose plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div
                        className="
                        pricing-one__single pricing-one__single_2
                        item-2
                        wow
                        animated
                        fadeInRight
                      "
                      >
                        <div className="pricig-heading">
                          <h6>Retailer</h6>
                          <div className="price-range">
                            <sup>₹</sup>{" "}
                            <span>{homePage?.Retailer_Joining_Price}</span>
                            {/* <p>/month</p> */}
                          </div>
                          {/* <p>Billed $276 per website annually.</p> */}
                        </div>
                        <div className="pricig-body">
                          {/* <ul>
                                                        <li>
                                                            <i className="fal fa-check" /> 60-day
                                                            chat history
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> Data
                                                            security
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 100 GB
                                                            cloud storage
                                                        </li>
                                                        <li>
                                                            <i className="fal fa-check" /> 24/7
                                                            Support
                                                        </li>
                                                    </ul> */}
                          A Retailer can start a PAN center with minimum
                          investment only.Retailer can makes unlimited PAN cards
                          through proper channel.
                          <div className="pricing-btn mt-35">
                            <Link to="/Register" className="main-btn">
                              Choose plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${
                    toggleSwitch === false ? "active show" : ""
                  }`}
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                      <div
                        className="
                        pricing-one__single pricing-one__single_2
                        animated
                        fadeInLeft
                      "
                      >
                        <div className="pricig-heading">
                          <h6>Fresh</h6>
                          <div className="price-range">
                            <sup>$</sup> <span>32</span>
                            <p>/Yearly</p>
                          </div>
                          <p>Get your 14 day free trial</p>
                        </div>
                        <div className="pricig-body">
                          <ul>
                            <li>
                              <i className="fal fa-check" /> 60-day chat history
                            </li>
                            <li>
                              <i className="fal fa-check" /> 15 GB cloud storage
                            </li>
                            <li>
                              <i className="fal fa-check" /> 24/7 Support
                            </li>
                          </ul>
                          <div className="pricing-btn mt-35">
                            <a className="main-btn" href="#">
                              Choose plan
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div
                        className="
                        pricing-one__single pricing-one__single_2
                        active
                        animated
                        fadeInUp
                      "
                      >
                        <div className="pricig-heading">
                          <h6>Sweet</h6>
                          <div className="price-range">
                            <sup>$</sup> <span>116</span>
                            <p>/Yearly</p>
                          </div>
                          <p>Billed $276 per website annually.</p>
                        </div>
                        <div className="pricig-body">
                          <ul>
                            <li>
                              <i className="fal fa-check" /> 60-day chat history
                            </li>
                            <li>
                              <i className="fal fa-check" /> 50 GB cloud storage
                            </li>
                            <li>
                              <i className="fal fa-check" /> 24/7 Support
                            </li>
                          </ul>
                          <div className="pricing-btn mt-35">
                            <a className="main-btn" href="#">
                              Choose plan
                            </a>
                          </div>
                          <div className="pricing-rebon">
                            <span>Most Popular</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div
                        className="
                        pricing-one__single pricing-one__single_2
                        item-2
                        animated
                        fadeInRight
                      "
                      >
                        <div className="pricig-heading">
                          <h6>Juicy</h6>
                          <div className="price-range">
                            <sup>$</sup> <span>227</span>
                            <p>/Yearly</p>
                          </div>
                          <p>Billed $276 per website annually.</p>
                        </div>
                        <div className="pricig-body">
                          <ul>
                            <li>
                              <i className="fal fa-check" /> 60-day chat history
                            </li>
                            <li>
                              <i className="fal fa-check" /> Data security
                            </li>
                            <li>
                              <i className="fal fa-check" /> 100 GB cloud
                              storage
                            </li>
                            <li>
                              <i className="fal fa-check" /> 24/7 Support
                            </li>
                          </ul>
                          <div className="pricing-btn mt-35">
                            <a className="main-btn" href="#">
                              Choose plan
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PricingHomeTwo;
