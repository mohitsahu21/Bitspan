import React from "react";
import styled from "styled-components";
import { FaRupeeSign } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";

const DChangePassword = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-11 col-md-11  col-11
                             mt-5  formdata"
              >
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                      {/* <div className="text-center">
                        <h3>Change Password</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Change Password
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Change Password{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11  shadow  rounded m-4 px-3 py-5 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group">
                            <span class="input-group-text">
                              <RiLockPasswordFill />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Mobile Number"
                              />
                              <label for="floatingInputGroup2">
                                Enter Old Password
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group">
                            <span class="input-group-text">
                              <RiLockPasswordFill />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Mobile Number"
                              />
                              <label for="floatingInputGroup2">
                                Enter New Password
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="text-center mb-3">
                            <button className="btn py-2 px-4">Change</button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default DChangePassword;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
  @media (min-width: 1025px) and (max-width: 1500px) {
    .formdata {
      padding-left: 15rem;
    }
  }
  @media (min-width: 1500px) {
    .formdata {
      padding-left: 13rem;
    }
  }
`;
