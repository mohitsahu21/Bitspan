import React from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";

const StepVerification = () => {
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
                        <h4>Step PIN And 2 Step Verification</h4>
                        <h6>
                          {" "}
                          <BiHomeAlt /> &nbsp; / &nbsp; Step PIN And 2 Step
                          Verification
                        </h6>
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
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput">Set 4 Digit PIN</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label for="floatingPassword">
                          2 Step Verification
                        </label>
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

export default StepVerification;
const Wrapper = styled.div`
  .raisecomp {
    width: 100%;
    margin-bottom: 1rem;
    @media (min-width: 450px) and (max-width: 575px) {
      width: 80%;
      margin-left: 5rem;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      width: 80%;
      margin-left: 5rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 90%;
      margin-left: 4rem;
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
      margin-left: 4.9rem;
    }
  }
`;