import React from "react";
import styled from "styled-components";

function ServicesHomeTwo({ className }) {
  return (
    <>
      <Wrapper>
        <section
          className={`appie-services-2-area pb-25 mb-3 ${className}`}
          id="service"
        >
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-12 col-md-8">
                <div className="appie-section-title p-0">
                  <h3 className="text-center mt-3 appie-title">Our Services</h3>
                  <p className="text-center">What Solutions We Provide</p>
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
                  <h4 className="title">NSDL instant Pan White Label</h4>
                  <p>
                    instant Create Unlimited Retailers, Distributors, Super
                    Distributors.instant NSDL Service Onboarding within a
                    second, apply Pancard OTP & Biometric Through.
                  </p>
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
                  <h4 className="title">NSDL instant Pan Admin Panel</h4>
                  <p>
                    instant Create Unlimited Retailers, Distributors, Super
                    Distributors.instant NSDL Service Onboarding within a second
                    No any onbording charges, apply Pancard OTP & Biometric
                    Through.
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
                  <h4 className="title">NSDL instant Pan API</h4>
                  <p>
                    instant NSDL Service Onboarding within a second, No any
                    Onboarding Charges, Developer Frindly API, Integration
                    Support.
                  </p>
                  {/* <a href="#">
                                    Read Mor <i className="fal fa-arrow-right" />
                                </a> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div
                  className="appie-single-service-2 item-4 mt-30 wow animated fadeInUp"
                  data-wow-duration="2000ms"
                  data-wow-delay="200ms"
                >
                  <div className="icon">
                    <i className="fas fa-bell" />
                  </div>
                  <h4 className="title">Recharge API</h4>
                  <p>
                    Mobile Recharge, DTH Recharge, Google Play Voucher Recharge,
                    24*7 Online Auto Billing
                  </p>
                  {/* <a href="#">
                                    Read Mor <i className="fal fa-arrow-right" />
                                </a> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div
                  className="appie-single-service-2 item-5 mt-30 wow animated fadeInUp"
                  data-wow-duration="2000ms"
                  data-wow-delay="400ms"
                >
                  <div className="icon">
                    <i className="fas fa-cog" />
                  </div>
                  <h4 className="title">Mobile Application NSDL Instant Pan</h4>
                  <p>
                    Now Apply NSDL instant Pan in your Mobile with Aadhaar OTP
                    Through,
                  </p>
                  {/* <a href="#">
                                    Read Mor <i className="fal fa-arrow-right" />
                                </a> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div
                  className="appie-single-service-2 item-6 mt-30 wow animated fadeInUp"
                  data-wow-duration="2000ms"
                  data-wow-delay="600ms"
                >
                  <div className="icon">
                    <i className="fas fa-lock" />
                  </div>
                  <h4 className="title">Recharge White Label</h4>
                  <p>
                    We Are Providing Recharge White Label & Mobile Application,
                    Mobile Recharge, DTH Recharge, Etc
                  </p>
                  {/* <a href="#">
                                    Read Mor <i className="fal fa-arrow-right" />
                                </a> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}

export default ServicesHomeTwo;
const Wrapper = styled.div`
  background: #eef1f6;
`;
