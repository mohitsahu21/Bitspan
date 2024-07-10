import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";

const SdComplaints = () => {
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
                        <h4 className="px-lg-3">Raise Complaint</h4>
                        <h6 className="mx-lg-5"> <BiHomeAlt /> &nbsp;/ &nbsp; Raise Complaint </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="text-center">
                      <h4>Enter All Correct Details For Raising Ticket</h4>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="form-floating">
                        <select
                          class="form-select"
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
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <MdOutlineFormatListNumbered />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">
                            Transaction Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="input-group">
                        <span class="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">Mobile Number</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="input-group">
                        <span class="input-group-text">
                          <RiMarkPenLine />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">Remarks</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label for="formFileLg" class="form-label">
                          Attechment
                        </label>
                        <input
                          class="form-control form-control-lg"
                          id="formFileLg"
                          type="file"
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start mb-3">
                        <button className="btn p-2">Submit</button>
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

export default SdComplaints;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  @media (min-width: 1025px) and (max-width : 1500px){
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
