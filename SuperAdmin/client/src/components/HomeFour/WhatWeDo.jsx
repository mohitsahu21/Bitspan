import React from "react";
import styled from "styled-components";

function WhatWeDo({ className, homePage }) {
  console.log(homePage);
  return (
    <>
      <Wrapper>
        <section
          className={`appie-services-2-area pb-100 ${className}`}
          id="service"
        >
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-12 col-md-8">
                <div className="appie-section-title mt-5">
                  <h3 className="appie-title text-white">WHAT WE DO ?</h3>
                  <p className="text-white">
                    {homePage?.Company_Name} IS LEADING B2B PTAL WE HAVE 10K+
                    SATISFIED CUSTOMERS TODAY AT <b>www.2kadam.co.in</b> CREATED
                    BY THE INDUSTRY LEADERS, {homePage?.Company_Name} PROVIDES A
                    DEDICATED TEAM FOR EACH CUSTOMER WHO MAKES SURE THAT THE
                    WORK IS DONE WITHIN THE TIME FRAME
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
                  <h4 className="title text-white">B2B PAN CARD PORTAL</h4>
                  <div style={{ textAlign: "start" }}>
                    <ul className="text-white">
                      <li> • Become Authorized PAN Agent.</li>
                      <li> • Smart Portal for Smart People</li>
                      <li> • 99% Uptime</li>
                      <li> • Best Commissions</li>
                      <li> • Fastest Fund Approval System.</li>

                      <li> • Payment Gatway LIVE System</li>
                    </ul>
                    <br />
                    <br />
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
                  <h4 className="title text-white">
                    RETAILER, DISTRIBUTOR & SUPER DISTRIBUTOR
                  </h4>
                  <p className="text-white">
                    A Retailer can start a PAN center with minimum investment
                    only.Retailer can makes unlimited PAN cards through proper
                    channel. A Distributor can makes unlimited PAN cards.He/She
                    can create unlimited Retailers with low cost investment
                    only.
                    <br />
                    <br />
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
                  <h4 className="title text-white">PAN CARD WHITE LABEL</h4>
                  <p className="text-white">
                    We are providing pan card white label portal for your
                    business. Here you can create unlimited pan card agent, pan
                    card Super distributor & distributor with full admin control
                    panel. You can upload your company logo. If you want to
                    business with pan card white label then TEST is best for
                    your company.
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

export default WhatWeDo;

const Wrapper = styled.section`
  background-color: black;
`;
