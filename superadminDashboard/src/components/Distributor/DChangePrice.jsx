import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaUser } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { FiHash } from "react-icons/fi";

const DChangePrice = () => {
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
                className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 ps-md-5 col-9
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
                          Change Price
                        </h4>
                        <h6 className="">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp; Change Price
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-lg-end justify-content-center pe-lg-4">
                    <div className="col-xxl-10 col-xl-9 col-lg-9 col-md-10 col-sm-10  rounded">
                      <div className="row justify-content-center">
                        <div className="col-xxl-7 col-xl-9 col-lg-9 col-md-10 col-sm-10 shadow bg-body-tertiary rounded m-4 px-md-5 px-3 py-5">
                          <div className="row d-flex flex-column g-4">
                            <div className="text-center">
                              <h5>Change Price</h5>
                            </div>

                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <p className="">
                            Wallet Available Amount : Rs. 200.00
                          </p>
                        </div> */}

                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                User Id
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaUser />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  value={"Mohit24501"}
                                  disabled
                                  class="form-control"
                                  placeholder="Enter User Id"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                Customer Name
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaUser />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  value={"Mohit Sahu"}
                                  disabled
                                  class="form-control"
                                  placeholder="Enter Customer Name"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                NSDL Phycial PAN Price
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaRupeeSign />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  class="form-control"
                                  placeholder="Enter NSDL Phycial PAN Price"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                NSDL E-PAN Price
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaRupeeSign />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  class="form-control"
                                  placeholder="Enter NSDL E-PAN Price"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                UTI Physical P Price
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaRupeeSign />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  class="form-control"
                                  placeholder="Enter UTI Physical P Price"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                UTI Physical E Price
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaRupeeSign />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  class="form-control"
                                  placeholder="Enter UTI Physical E Price"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                UTI Digital P Price
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaRupeeSign />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  class="form-control"
                                  placeholder="Enter UTI Digital P Price"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                UTI Digital E Price
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaRupeeSign />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  class="form-control"
                                  placeholder="Enter UTI Digital E Price"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <label for="name" class="form-label">
                                UTI New Coupon Price
                              </label>
                              <div class="input-group flex-nowrap">
                                <span
                                  class="input-group-text"
                                  id="addon-wrapping"
                                >
                                  {" "}
                                  <FaRupeeSign />
                                </span>
                                <input
                                  type="text"
                                  id="name"
                                  class="form-control"
                                  placeholder="Enter UTI New Coupon Price"
                                />
                              </div>
                            </div>

                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="form-floating">
                            <select
                              class="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                            >
                              <option selected>Select Payment Method</option>
                              <option value="1">UPI Payment</option>
                              <option value="2">
                                Debit Card/ Credit Card / Netbanking
                              </option>
                            </select>
                            <label for="floatingSelect">Payment Method</label>
                          </div>
                        </div> */}

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="text-start mb-3">
                                <button className="btn p-2 px-3">
                                  Change Price
                                </button>
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
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default DChangePrice;

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
