import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewHomeThreeSecondSingleService = ({ title, details, amount }) => {
  return (
    <>
      <>
        <div className="services__nav-content pt-90 pb-90">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="services__thumb text-lg-right m-img">
                <img src="assets/img/services/services-1.png" alt="" />
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="services__content-3 pl-70 pr-70">
                <h3>{title}</h3>
                <p>{details}</p>
                <div className="services__icon-wrapper d-md-flex mb-35">
                  <div className="services__icon-item d-flex mr-60 mb-30">
                    <div className="icon mr-20">
                      <img
                        src="assets/img/icon/services/services-9.png"
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <h1>&#8377; {amount}</h1>
                    </div>
                  </div>
                  <div className="services__icon-item d-flex mb-30">
                    <div className="icon mr-20">
                      <img
                        src="assets/img/icon/services/services-10.png"
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <h1>8770109518</h1>
                    </div>
                  </div>
                </div>
                <Link to="/contact" className="z-btn">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default NewHomeThreeSecondSingleService;
const Wrapper = styled.div``;
