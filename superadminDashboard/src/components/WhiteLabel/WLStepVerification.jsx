import React from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { FaLock } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";

const WLStepVerification = () => {
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 p-0">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9 mt-5">
                <div className="container-fluid m-0 rechargeNav">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center raisecomp flex-wrap">
                        <h4 className="mx-lg-5 ">Step PIN And 2 Step Verification</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Step PIN And 2 Step Verification
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded px-3 proForm">
                    <div className="text-center">
                      <h4>Step PIN And 2 Step Verification</h4>
                      <br />
                      <br />
                    </div>
                    <form>
                      <hr />
                      <br />
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <FaLock />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Set 4 Digit PIN"
                          />
                          <label for="floatingInputGroup1">
                            Set 4 Digit PIN
                          </label>
                        </div>
                      </div>

                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <FaQuestion />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="2 Step Verification"
                          />
                          <label for="floatingInputGroup1">
                            2 Step Verification
                          </label>
                        </div>
                      </div>

                      <br />
                      <hr />
                      <br />
                      <div className="text-center mt-2 mb-3">
                        <button
                          className="btn btn-none text-light"
                          style={{ backgroundColor: "#6d70ff" }}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default WLStepVerification;
const Wrapper = styled.div`
  .raisecomp {
    width: 100%;
    margin-bottom: 1rem;
    @media (min-width: 450px) and (max-width: 575px) {
      width: 80%;
      margin-left: 5rem;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    @media (min-width: 1025px) and (max-width: 1280px) {
      width: 85%;
      margin-left: 4.9rem;
    }
  }

  .proForm {
    margin: 24px;
    @media (min-width: 1024px) and (max-width: 1280px) {
      margin-left: 4.9rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-left: -5rem;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-left: -5rem;
    }
  }
`;