import React from "react";
import NewSingleService from "./NewSingleService";

const HomeCardTemplate = () => {
  return (
    <>
      <section className="services__area pt-115 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
              <div
                className="section__title section__title-3 text-center mb-90 wow fadeInUp"
                data-wow-delay=".2s"
              >
                <span>Our Services</span>
                <h2>What Solutions We Provide</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <NewSingleService
              icon="1"
              title="NSDL instant Pan White Label"
              description="Instant Create Unlimited Retailers, Distributors, Super Distributors.instant NSDL Service Onboarding within a second No any onbording charges, apply Pancard OTP & Biometric Through."
            />
            <NewSingleService
              icon="2"
              title="NSDL instant Pan Admin Panel"
              description="Instant Create Unlimited Retailers, Distributors, Super Distributors.instant NSDL Service Onboarding within a second No any onbording charges, apply Pancard OTP & Biometric Through."
            />
            <NewSingleService
              icon="3"
              title="NSDL instant Pan API"
              description="Instant NSDL Service Onboarding within a second, No any Onboarding Charges, Developer Frindly API, Integration Support."
            />
            <NewSingleService
              icon="4"
              title="Recharge API"
              description="Mobile Recharge, DTH Recharge, Google Play Voucher Recharge, 24*7 Online Auto Billing"
            />
            <NewSingleService
              icon="5"
              title="Mobile Application NSDL Instant"
              description="Now Apply NSDL instant Pan in your Mobile with Aadhaar OTP Through,"
            />
            <NewSingleService
              icon="6"
              title="Recharge White Label"
              description="We Are Providing Recharge White Label & Mobile Application, Mobile Recharge, DTH Recharge, Etc"
            />
            {/* <NewSingleService icon="7" title="Development" />
                  <NewSingleService icon="8" title="Financial audit" /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCardTemplate;
