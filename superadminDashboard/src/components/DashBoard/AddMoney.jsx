import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";

const AddMoney = () => {
  return (
    <>
      <Wrapper>
        <div className="main ">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 ms-md-10 ps-md-5 col-9
                             mt-5 formdata"
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ms-lg-5">
                      {/* <div className="text-center">
                        <h3>Add Money To Wallet</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5  px-lg-5  px-xl-5">
                          Add Money To Wallet
                        </h4>
                        <h6 className="">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp; Add Money To Wallet
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-lg-end justify-content-center pe-lg-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-10 col-sm-10 shadow bg-body-tertiary rounded m-4 px-3 py-5">
                      <div className="row d-flex flex-column g-4">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group mb-3">
                            <span class="input-group-text">
                              <MdOutlineFormatListNumbered />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup1"
                                placeholder="Transaction Number"
                                readOnly
                                value="ASHI6462"
                              />
                              <label for="floatingInputGroup1">
                                Your User Id
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
                              <label for="floatingInputGroup2">
                                Amount in Rs. {"(Min 100/-)"}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <p className="fw-bold">
                            Wallet Available Amount : Rs. 200.00
                          </p>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="form-floating">
                            <select
                              class="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                            >
                              <option selected>Select Payment Method</option>
                              <option value="UPI">UPI</option>
                              {/* <option value="2">
                                Debit Card/ Credit Card / Netbanking
                              </option> */}
                            </select>
                            <label for="floatingSelect">Payment Method</label>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <p className="m-0">UPI Payment - Free</p>
                          <p className="m-0">
                            Debit Card/ Credit Card / Netbanking - 3% Additional
                            Charges
                          </p>
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

export default AddMoney;

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
