import React from "react";
import styled from "styled-components";
import {
  MdCurrencyRupee,
  MdEmail,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import {
  FaAddressCard,
  FaMobileAlt,
  FaRupeeSign,
  FaUser,
} from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { PiAddressBook } from "react-icons/pi";
import { LuTextSelect, LuUserCheck } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";

const DBankAccountVerify = () => {
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-start">
                        <h3>Raise Complaint</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Bank Details</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Bank Details
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="text-center">
                      <h5>Add New Bank Account</h5>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          aria-label="Floating label select example"
                        >
                          <option selected>Select complaint type</option>
                          <option value="1">Coupon Issue</option>
                          <option value="2">UTI PAN Debit</option>
                          <option value="3">UTI PAN Refund</option>
                          <option value="3">Nsdl Refund</option>
                          <option value="3">Recharge Refund</option>
                          <option value="3">Account Support</option>
                          <option value="3">Report a Bug</option>
                          <option value="3">Feature Support</option>
                          <option value="3">API Support</option>
                          <option value="3">Others</option>
                        </select>
                        <label for="floatingSelect">Complaint Type</label>
                      </div>
                    </div> */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Bank Holder Name
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Bank Account Number/ UPI ID
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaAddressCard />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="Enter Bank Account Number/ UPI ID"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        IFSC Code
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdEmail />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="Enter IFSC Code"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Bank Name
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          <FaAddressCard />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="Enter Bank Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        OTP
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          <FaAddressCard />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="Enter OTP"
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start mb-3">
                        <button className="btn p-2">Submit</button>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="text-center">
                      <h5>All Your Listed Bank Account</h5>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div class="table-responsive">
                        <table class="table table-striped">
                          <thead className="table-dark">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">A/c Holder Name</th>
                              <th scope="col">Bank Account Number</th>

                              <th scope="col">IFSC Code</th>
                              <th scope="col">Bank Name</th>
                              <th scope="col">Status</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mohit Sahu</td>
                              <td>898989898989</td>
                              <td>sbin0001503</td>
                              <td>sbi</td>
                              <td>PENDING</td>
                              <td>
                                <button className="btn btn-primary btn-sm">
                                  Verify
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="float-end">
                        <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li className="page-item">
                              <a className="page-link" href="#">
                                Previous
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                1
                              </a>
                            </li>

                            <li className="page-item">
                              <a className="page-link" href="#">
                                Next
                              </a>
                            </li>
                          </ul>
                        </nav>
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

export default DBankAccountVerify;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  th {
    font-weight: 500;
    font-size: 14px;
  }
  td {
    font-size: 14px;
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
  @media (max-width: 576px) {
    .responsive-label {
      font-size: 0.5rem; /* Adjust as needed */
    }
  }
  @media (max-width: 768px) {
    .responsive-label {
      font-size: 1rem; /* Adjust as needed */
    }
  }
`;
