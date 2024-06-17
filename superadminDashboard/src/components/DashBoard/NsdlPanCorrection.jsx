import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import nsdlpan from "../../assets/images/nsdl-vector.png";

const NsdlPanCorrection = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid bg-body-tertiary">
            <div className="row flex-wrap justify-content-lg-end justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-10 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-9
                             mt-5 bg-body-tertiary"
              >
                <div className="main shadow-none bg-body-tertiary">
                  <div className="row shadow-none bg-body-tertiary">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-center">
                        <h3>NSDL Correction Apply</h3>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-center pe-4">
                    <div className="col-xxl-5 col-xl-5 col-lg-9 col-md-10 col-sm-10  rounded  px-3 mt-3">
                      <div className="text-center">
                        <img src={nsdlpan} className="img-fluid" />
                      </div>

                      <div className="guidline p-5 mt-5 shadow bg-body-tertiary rounded">
                        <h3 className="mt-2">NSDL Guidelines</h3>
                        <ul className="list mb-5">
                          <li>
                            <p>{`01) Id activated charges no refunding`}</p>
                          </li>
                          <li>
                            <p>{`02) At the time PAN apply process failed or pending casess auto refunding in 3 working days`}</p>
                          </li>
                          <li>
                            <p>{`03)NSDL instant PAN apply in only retailer login`}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xxl-7 col-xl-6 col-lg-9 col-md-10 col-sm-10 shadow bg-body-tertiary rounded  px-4 py-3 mb-3 mt-5">
                      <div className="row d-flex flex-column g-4">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="form-floating">
                            <select
                              class="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                            >
                              <option selected>Select Application Mode</option>
                              <option value="1">Instant PAN Card</option>
                              <option value="2">Scan Based PAN Card</option>
                            </select>
                            <label for="floatingSelect">
                              Select Application Mode
                            </label>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="form-floating">
                            <select
                              class="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                            >
                              <option selected>Select Category Type</option>
                              <option value="1">Individual</option>
                            </select>
                            <label for="floatingSelect">
                              Select Category Type
                            </label>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group">
                            <span class="input-group-text">
                              <FaRupeeSign />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Mobile Number"
                              />
                              <label for="floatingInputGroup2">
                                Enter Name
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group">
                            <span class="input-group-text">
                              <FaRupeeSign />
                            </span>
                            <div class="form-floating">
                              <input
                                type="date"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Mobile Number"
                              />
                              <label for="floatingInputGroup2">
                                Date of Birth
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="form-floating">
                            <select
                              class="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                            >
                              <option selected>Select Gender</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                            </select>
                            <label for="floatingSelect">Gender</label>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group">
                            <span class="input-group-text">
                              <FaRupeeSign />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Mobile Number"
                              />
                              <label for="floatingInputGroup2">
                                Mobile Number
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group">
                            <span class="input-group-text">
                              <FaRupeeSign />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Mobile Number"
                              />
                              <label for="floatingInputGroup2">Email Id</label>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="form-floating">
                            <select
                              class="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                            >
                              <option selected>Select</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                            <label for="floatingSelect">
                              Is Physical PAN Required?
                            </label>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <p className="fw-bold">
                            Wallet Available Amount : Rs. 200.00
                          </p>
                          <p className="fw-bold">Payable Amount : Rs. 100.00</p>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="text-start mb-3">
                            <button className="btn p-2">Pay Now</button>
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

export default NsdlPanCorrection;

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
  .guidline {
  }
  .list {
    list-style: none;
    padding-left: 0;
    font-size: 14px;
  }
`;
