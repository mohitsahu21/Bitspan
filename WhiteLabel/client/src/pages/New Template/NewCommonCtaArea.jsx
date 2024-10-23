import React from "react";
import { Link } from "react-router-dom";
// import SingleService from "../SingleService/SingleService";
import SingleWork from "../../components/HowItWorks/SingleWork";
import NewSingleWork from "./NewSingleWork";
import styled from "styled-components";
// import SingleWork from "../HowItWorks/SingleWork";

const NewCommonCtaArea = () => {
  return (
    <Wrapper>
      {/* <section className="cta__area pt-180 pb-155" id="main-section"> */}
      <section className=" pt-180 pb-155" id="main-section">
        <div className="container p-relative">
          <div className="row">
            <div className="col-xl-12 ">
              <div className="cta__content text-center">
                <span>Lets Join ! Become Our Family Member</span>
                <h1>How it Works</h1>
                {/* <div className="cta__btn">
                           <Link to="/contact" className="z-btn z-btn-white mb-30">Contact Us</Link>
                           <Link to="/contact" className="z-btn z-btn-transparent mb-30">Work with us</Link>
                        </div> */}
                <div className="row">
                  <NewSingleWork
                    icon="newuser"
                    title="Create An Account"
                    description="Create Own Team With Your Super Distributer, Distributer And Retailer Accounts."
                    step="01"
                  />

                  <NewSingleWork
                    icon="coupon"
                    title="Buy & Distribute Coupon"
                    description="Buy Coupon And Distribute Coupons To Your Team With Realtime Coupon Updation."
                    step="02"
                  />

                  <NewSingleWork
                    icon="growth"
                    title="Check History"
                    description="Get The Realtime Coupon Buying Data, Distributed Data And Joining Data."
                    step="03"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default NewCommonCtaArea;
const Wrapper = styled.div`
  #main-section {
    background: linear-gradient(331deg, #0ed09a 0%, #0d75a2 100%),
      url(assets/img/cta/cta-bg.jpg);
    background-position: center;
    background-size: cover;
  }
`;
