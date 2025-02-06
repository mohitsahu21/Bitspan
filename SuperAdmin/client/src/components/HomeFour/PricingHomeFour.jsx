import React, { useState } from "react";
import { Link } from "react-router-dom";

function PricingHomeFour({ className, homePage }) {
  console.log(homePage);
  const [toggleSwitch, setSwitchValue] = useState(true);
  return (
    <>
      <section className={`appie-pricing-area pt-90 pb-90 ${className || ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="appie-section-title text-center">
                <h3 className="appie-title">What We Serve To You</h3>
                <p>
                  A Retailer can start a PAN center with minimum investment
                  only. Retailer can makes unlimited PAN cards through proper
                  channel. A Distributor can makes unlimited PAN cards.He/She
                  can create unlimited Retailers with low cost investment only.
                  T&C apply. Super Distributor can makes unlimited PAN
                  cards.He/She can create unlimited Distributors & Retailers
                  with low cost investment.
                </p>
              </div>
              {/* <ul
                                className="list-inline text-center switch-toggler-list"
                                role="tablist"
                                id="switch-toggle-tab"
                            >
                                <li className={`month ${toggleSwitch ? 'active' : ''}`}>
                                    <a href="#">Monthly</a>
                                </li>
                                <li>
                                    <label
                                        onClick={() => setSwitchValue(!toggleSwitch)}
                                        className={`switch ${toggleSwitch ? 'on' : 'off'}`}
                                    >
                                        <span className="slider round" />
                                    </label>
                                </li>
                                <li className={`year ${toggleSwitch === false ? 'active' : ''}`}>
                                    <a href="#">Annualy</a>
                                </li>
                            </ul> */}
            </div>
          </div>
          <div className="tabed-content">
            {toggleSwitch ? (
              <div id="month">
                <div className="row justify-content-center">
                  <div className="col-lg-3 col-md-6 wow animated fadeInLeft">
                    <div className="pricing-one__single">
                      <div className="pricig-heading">
                        <h6>Own Brand Portal</h6>
                        <div className="price-range">
                          <sup>₹</sup>{" "}
                          <span>{homePage?.White_Label_Joining_Price}</span>
                          {/* <p>/month</p> */}
                        </div>
                        {/* <p>Get your 14 day free trial</p> */}
                      </div>
                      <div className="pricig-body">
                        {/* <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> 60-day chat
                                                        history
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 15 GB cloud
                                                        storage
                                                    </li>
                                                </ul> */}
                        <ul>
                          <li>
                            Start Own brand portal with own website.Here you can
                            access your control panel & manage Retailers,
                            Distributors, Super Distributors
                          </li>
                        </ul>

                        <div className="pricing-btn mt-35">
                          <Link to="/Register" className="main-btn">
                            Choose plan
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow animated fadeInUp">
                    <div className="pricing-one__single center">
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
                      <div className="pricig-body">
                        {/* <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> 60-day chat
                                                        history
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 50 GB cloud
                                                        storage
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 24/7 Support
                                                    </li>
                                                </ul> */}
                        <ul>
                          <li>
                            Super Distributor can makes unlimited PAN
                            cards.He/She can create unlimited Distributors &
                            Retailers with low cost investment.T&C apply.
                          </li>
                        </ul>
                        <div className="pricing-btn mt-35">
                          <Link to="/Register" className="main-btn">
                            Choose plan
                          </Link>
                        </div>
                      </div>
                      <div className="pricing-rebon">
                        <span>Most Popular</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow animated fadeInRight">
                    <div className="pricing-one__single">
                      <div className="pricig-heading">
                        <h6>Distributor</h6>
                        <div className="price-range">
                          <sup>₹</sup>{" "}
                          <span> {homePage?.Distributor_Joining_Price}</span>
                          {/* <p>/month</p> */}
                        </div>
                        {/* <p>Billed $276 per website annually.</p> */}
                      </div>
                      <div className="pricig-body">
                        <ul>
                          <li>
                            A Distributor can makes unlimited PAN cards.He/She
                            can create unlimited Retailers with low cost
                            investment only.
                            <br />
                            <br />
                          </li>
                        </ul>
                        <div className="pricing-btn mt-35">
                          <Link to="/Register" className="main-btn">
                            Choose plan
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow animated fadeInRight">
                    <div className="pricing-one__single">
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
                        <ul>
                          <li>
                            A Retailer can start a PAN center with minimum
                            investment only.Retailer can makes unlimited PAN
                            cards through proper channel.
                            <br />
                            <br />
                          </li>
                        </ul>
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
            ) : (
              <div id="year">
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6 wow animated fadeInLeft">
                    <div className="pricing-one__single">
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
                        </ul>
                        <div className="pricing-btn mt-35">
                          <Link to="/Register" className="main-btn">
                            Choose plan
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 wow animated fadeInUp">
                    <div className="pricing-one__single center">
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
                          <Link to="/Register" className="main-btn">
                            Choose plan
                          </Link>
                        </div>
                      </div>
                      <div className="pricing-rebon">
                        <span>Most Popular</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 wow animated fadeInRight">
                    <div className="pricing-one__single">
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
                            <i className="fal fa-check" /> 100 GB cloud storage
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
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PricingHomeFour;
