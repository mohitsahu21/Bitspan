import React from 'react';
import IconOne from '../../assets/images/icon/1.png';
import IconTwo from '../../assets/images/icon/2.png';
import IconThree from '../../assets/images/icon/3.png';
import IconFour from '../../assets/images/icon/4.png';

function ServicesHomeOne({ className }) {
    return (
        <section className={`appie-service-area pt-90 pb-100 ${className}`} id="service">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="appie-section-title text-center">
                            <h3 className="appie-title">
                            Our Services
                            </h3>
                            <p>What Solutions We Provide</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div
                            className="appie-single-service text-center mt-30 wow animated fadeInUp"
                            data-wow-duration="2000ms"
                            data-wow-delay="200ms"
                        >
                            <div className="icon">
                                <img src={IconOne} alt="" />
                                <span>1</span>
                            </div>
                            <h4 className="appie-title">NSDL instant Pan White Label</h4>
                            <p>instant Create Unlimited Retailers, Distributors, Super Distributors.instant NSDL Service Onboarding within a second, apply Pancard OTP & Biometric Through.<br/><br/></p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div
                            className="appie-single-service text-center mt-30 item-2 wow animated fadeInUp"
                            data-wow-duration="2000ms"
                            data-wow-delay="400ms"
                        >
                            <div className="icon">
                                <img src={IconTwo} alt="" />
                                <span>2</span>
                            </div>
                            <h4 className="appie-title">NSDL instant Pan Admin Panel</h4>
                            <p>instant Create Unlimited Retailers, Distributors, Super Distributors.instant NSDL Service Onboarding within a second No any onbording charges, apply Pancard OTP & Biometric Through.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div
                            className="appie-single-service text-center mt-30 item-3 wow animated fadeInUp"
                            data-wow-duration="2000ms"
                            data-wow-delay="600ms"
                        >
                            <div className="icon">
                                <img src={IconThree} alt="" />
                                <span>3</span>
                            </div>
                            <h4 className="appie-title">NSDL instant Pan API</h4>
                            <p>instant NSDL Service Onboarding within a second, No any Onboarding Charges, Developer Frindly API, Integration Support. <br/> <br/><br/></p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div
                            className="appie-single-service text-center mt-30 item-4 wow animated fadeInUp"
                            data-wow-duration="2000ms"
                            data-wow-delay="800ms"
                        >
                            <div className="icon">
                                <img src={IconOne} alt="" />
                                <span>4</span>
                            </div>
                            <h4 className="appie-title">Recharge API</h4>
                            <p>Mobile Recharge, DTH Recharge, Google Play Voucher Recharge, 24*7 Online Auto Billing</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div
                            className="appie-single-service text-center mt-30 item-2 wow animated fadeInUp"
                            data-wow-duration="2000ms"
                            data-wow-delay="400ms"
                        >
                            <div className="icon">
                                <img src={IconTwo} alt="" />
                                <span>5</span>
                            </div>
                            <h4 className="appie-title">Mobile Application NSDL Instant Pan</h4>
                            <p>Now Apply NSDL instant Pan in your Mobile with Aadhaar OTP Through,</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div
                            className="appie-single-service text-center mt-30 item-2 wow animated fadeInUp"
                            data-wow-duration="2000ms"
                            data-wow-delay="400ms"
                        >
                            <div className="icon">
                                <img src={IconThree} alt="" />
                                <span>6</span>
                            </div>
                            <h4 className="appie-title">Recharge White Label</h4>
                            <p>We Are Providing Recharge White Label & Mobile Application, Mobile Recharge, DTH Recharge, Etc</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesHomeOne;
