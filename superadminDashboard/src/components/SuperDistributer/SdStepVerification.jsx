import React, { useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { FaLock } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const SdStepVerification = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [pin, setPin] = useState("");
  console.log(user);

  const updatePin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:7171/api/auth/superDistributor/updateTwoStepPin/${user.userId}`,
        { pin: pin }
      );
      alert("pin updated successfully");
      setPin("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(pin);

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
                        <h4 className="mx-lg-5 ">
                          Step PIN And 2 Step Verification
                        </h4>
                        <h6 className="mx-lg-5">
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
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup1"
                            placeholder="Set 4 Digit PIN"
                            name="pin"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                          />
                          <label htmlFor="floatingInputGroup1">
                            Set 4 Digit PIN
                          </label>
                        </div>
                      </div>

                      {/* <div className="input-group mb-3">
                        <span className="input-group-text">
                          <FaQuestion />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup1"
                            placeholder="2 Step Verification"
                          />
                          <label htmlFor="floatingInputGroup1">
                            2 Step Verification
                          </label>
                        </div>
                      </div> */}

                      <br />
                      <hr />
                      <br />
                      <div className="text-center mt-2 mb-3">
                        <button
                          className="btn btn-none text-light"
                          style={{ backgroundColor: "#6d70ff" }}
                          onClick={updatePin}
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

export default SdStepVerification;
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
