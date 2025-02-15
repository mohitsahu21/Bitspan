import React from "react";
import iconOne from "../../assets/images/icon/1.png";
import iconTwo from "../../assets/images/icon/2.png";
import iconThree from "../../assets/images/icon/3.png";
import iconFour from "../../assets/images/icon/4.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ServicesHomeThree({ homePage }) {
  console.log(homePage);
  return (
    <>
      <Wrapper>
        <section
          className="appie-service-area appie-service-3-area pt-195 pb-100"
          id="service"
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="appie-section-title text-center mt-4">
                  <h3 className="appie-title">What We Serve To You</h3>
                  <p>
                    A Retailer can start a PAN center with minimum investment
                    only. Retailer can makes unlimited PAN cards through proper
                    channel. A Distributor can makes unlimited PAN cards.He/She
                    can create unlimited Retailers with low cost investment
                    only. T&C apply. Super Distributor can makes unlimited PAN
                    cards.He/She can create unlimited Distributors & Retailers
                    with low cost investment.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div
                  className="
                appie-single-service appie-single-services-3
                text-center
                mt-30
                wow
                animated
                fadeInUp
              "
                  data-wow-duration="2000ms"
                  data-wow-delay="200ms"
                >
                  <div className="icon">
                    <img src={iconOne} alt="" />
                  </div>
                  <h4 className="appie-title">Own Brand Portal</h4>
                  <p>
                    Start Own brand portal with own website.Here you can access
                    your control panel & manage Retailers, Distributors, Super
                    Distributors
                  </p>
                  <hr />
                  <p className="price-Font">
                    &#8377; {homePage?.White_Label_Joining_Price}
                  </p>
                  <Link to="/Register" className="custom-btn text-dark">
                    Join us <i className="fal fa-arrow-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="
                appie-single-service appie-single-services-3
                text-center
                mt-30
                item-2
                wow
                animated
                fadeInUp
              "
                  data-wow-duration="2000ms"
                  data-wow-delay="400ms"
                >
                  <div className="icon">
                    <img src={iconTwo} alt="" />
                  </div>
                  <h4 className="appie-title">Super Distributor</h4>
                  <p>
                    Super Distributor can makes unlimited PAN cards.He/She can
                    create unlimited Distributors & Retailers with low cost
                    investment.T&C apply.
                  </p>
                  <hr />
                  <p className="price-Font">
                    &#8377; {homePage?.Super_Distributor_Joining_Price}
                  </p>
                  <Link to="/Register" className="custom-btn text-dark">
                    Join us <i className="fal fa-arrow-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="
                appie-single-service appie-single-services-3
                text-center
                mt-30
                item-3
                wow
                animated
                fadeInUp
              "
                  data-wow-duration="2000ms"
                  data-wow-delay="600ms"
                >
                  <div className="icon">
                    <img src={iconThree} alt="" />
                  </div>
                  <h4 className="appie-title">Distributor</h4>
                  <p>
                    A Distributor can makes unlimited PAN cards.He/She can
                    create unlimited Retailers with low cost investment only.
                  </p>
                  <hr />
                  <p className="price-Font">
                    &#8377; {homePage?.Distributor_Joining_Price}
                  </p>
                  <Link to="/Register" className="custom-btn text-dark">
                    Join us <i className="fal fa-arrow-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="
                appie-single-service appie-single-services-3
                text-center
                mt-30
                item-4
                wow
                animated
                fadeInUp
              "
                  data-wow-duration="2000ms"
                  data-wow-delay="800ms"
                >
                  <div className="icon">
                    <img src={iconFour} alt="" />
                  </div>
                  <h4 className="appie-title">Retailer</h4>
                  <p>
                    A Retailer can start a PAN center with minimum investment
                    only.Retailer can makes unlimited PAN cards through proper
                    channel.
                  </p>
                  <hr />
                  <p className="price-Font">
                    &#8377; {homePage?.Retailer_Joining_Price}
                  </p>
                  <Link to="/Register" className="custom-btn text-dark">
                    Join us <i className="fal fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}

export default ServicesHomeThree;
const Wrapper = styled.div``;
