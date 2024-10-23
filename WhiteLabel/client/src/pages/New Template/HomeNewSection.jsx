import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineLogin } from "react-icons/ai";
import { TbPasswordFingerprint } from "react-icons/tb";

const HomeNewSection = () => {
  return (
    <Wrapper>
      <section className="hero__area p-relative">
        <div className="hero__shape">
          <img
            className="one"
            src="assets/img/icon/slider/03/icon-1.png"
            alt=""
          />
          {/* <img
            className="two"
            src="assets/img/icon/slider/03/icon-2.png"
            alt=""
          /> */}
          <img
            className="three"
            src="assets/img/icon/slider/03/icon-3.png"
            alt=""
          />
          <img
            className="four"
            src="assets/img/icon/slider/03/icon-4.png"
            alt=""
          />
          <img
            className="five"
            src="assets/img/icon/slider/03/icon-6.png"
            alt=""
          />
          <img
            className="six"
            src="assets/img/icon/slider/03/icon-7.png"
            alt=""
          />
        </div>
        <div className="hero__item hero__height d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-5 order-last">
                {/* <div className="hero__thumb-wrapper ml-100 scene p-relative">
                  <div className="hero__thumb one">
                    <img
                      className="layer"
                      data-depth="0.2"
                      src="assets/img/slider/03/slider-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hero__thumb two d-none d-md-block d-lg-none d-xl-block">
                    <img
                      className="layer"
                      data-depth="0.3"
                      src="assets/img/slider/03/slider-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hero__thumb three d-none d-sm-block">
                    <img
                      className="layer"
                      data-depth="0.4"
                      src="assets/img/slider/03/slider-3.jpg"
                      alt=""
                    />
                  </div>
                  <div className="hero__thumb four d-none d-md-block d-lg-none d-xl-block">
                    <img
                      className="layer"
                      data-depth="0.5"
                      src="assets/img/slider/03/slider-4.jpg"
                      alt=""
                    />
                  </div>
                </div> */}
                <div className="m-3">
                  <div className="shadow-sm p-4 mb-5 bg-body form">
                    <div className="text-start">
                      <h3>Login</h3>
                      <h4>Enter You Auth Credentials & Enjoy Services.</h4>
                    </div>
                    <form>
                      {/* <!-- Email input --> */}
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <AiOutlineLogin />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">USER ID</label>
                        </div>
                      </div>

                      {/* <!-- Password input --> */}
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <TbPasswordFingerprint />
                        </span>
                        <div class="form-floating">
                          <input
                            type="passowrd"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">Password</label>
                        </div>
                      </div>

                      <div class="col">
                        {/* <!-- Simple link --> */}
                        <a href="#!">Forgot password?</a>
                      </div>

                      {/* <!-- Submit button --> */}
                      <button
                        data-mdb-ripple-init
                        type="button"
                        class="btn btn-primary btn-block mb-4"
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-7 d-flex align-items-center">
                <div className="hero__content">
                  <span>Welcome To Bitspan.in</span>
                  <h1>Fully Automatic</h1>
                  <p className="mb-3">India's Leading PAN Card Portal</p>
                  <hr />
                  <ul>
                    <li>Smart Portal for Smart People </li>
                    <li>99% Uptime</li>
                    <li>Best Commissions </li>
                    <li>Fastest Fund Approval System</li>
                  </ul>
                  <Link to="/about" className="z-btn z-btn-border">
                    JOIN NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default HomeNewSection;
const Wrapper = styled.div`
  .form {
    background: linear-gradient(to top, white, #dbdae1);
    border-radius: 0.8rem;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    padding: 10px;
    margin-bottom: 10px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  li:hover {
    background-color: #f0f0f0;
  }
`;
