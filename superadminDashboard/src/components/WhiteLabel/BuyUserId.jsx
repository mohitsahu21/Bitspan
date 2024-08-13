import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { FaHashtag, FaRupeeSign, FaUser } from "react-icons/fa";
import { LuTextSelect } from "react-icons/lu";

const BuyUserId = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-end justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-10 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-12
                             mt-5 "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>Aadhaar Linking Status</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5 mx-xl-5 mx-xxl-2  px-lg-3 px-xxl-0">
                          Buy Admin ID
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Buy Admin ID
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-center pe-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-12 col-sm-12  rounded  px-3">
                      <div className="guidline px-3 py-4  mt-4 shadow bg-body-tertiary rounded">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto">
                          <label for="name" className="form-label">
                            Your User ID
                          </label>
                          <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">
                              {" "}
                              <FaUser />
                            </span>
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              value={"MOHIT1234"}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto mt-3">
                          <label for="name" className="form-label">
                            Select User ID Type
                          </label>
                          <div class="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">
                              {" "}
                              <LuTextSelect />
                            </span>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Select...</option>
                              <option value="">
                                White Label
                              </option>




                            </select>
                          </div>
                        </div>

                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto mt-3">
                          <label for="name" className="form-label">
                            Available White Label ID
                          </label>
                          <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">
                              {" "}
                              <FaHashtag />
                            </span>
                            <input
                              type="number"
                              id="name"
                              className="form-control"
                              placeholder="Enter Name"
                              value={0}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto mt-3">
                          <label for="name" className="form-label">
                            White Label ID Price
                          </label>
                          <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">
                              {" "}
                              <FaRupeeSign />
                            </span>
                            <input
                              type="number"
                              id="name"
                              className="form-control"
                              placeholder="Enter Name"
                              value={800}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto mt-3">
                          <label for="name" className="form-label">
                            No. Of ID For Purchase
                          </label>
                          <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">
                              {" "}
                              <FaHashtag />
                            </span>
                            <input
                              type="number"
                              id="name"
                              className="form-control"
                              placeholder="Enter No. Of ID For Purchase"
                            />
                          </div>
                        </div>

                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto mt-3">
                          <label for="name" className="form-label">
                            Payment Method
                          </label>
                          <div class="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">
                              {" "}
                              <LuTextSelect />
                            </span>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Select Payment Method</option>
                              <option value="">
                                Payment from Wallet
                              </option>




                            </select>
                          </div>
                          <p className="mt-3"><strong> Wallet Available Amount : </strong> Rs. 500.00</p>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                          <div className="text-center">
                            <button className="btn p-2">Buy ID</button>
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

export default BuyUserId;

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
