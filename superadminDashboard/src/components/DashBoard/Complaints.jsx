import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";

const Complaints = () => {
    return (
        <>
            <Wrapper>
                {/* <HeadBar /> */}
                <div className="main">
                    <div className="container-fluid bg-body-tertiary">
                        <div className="row flex-nowrap justify-content-center ">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 p-0">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9 mt-5 bg-body-tertiary">
                                <div className="main shadow-none bg-body-tertiary">
                                    <div className="row shadow-none bg-body-tertiary">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-start">
                                                <h3>Raise Complaint</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                                        <div className="text-center">
                                            <h4>Enter All Correct Details For Raising Ticket</h4>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="form-floating">
                                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
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
                                                <span class="input-group-text"><MdOutlineFormatListNumbered /></span>
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" />
                                                    <label for="floatingInputGroup1">Transaction Number</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="input-group">
                                                <span class="input-group-text"><FaMobileAlt /></span>
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" />
                                                    <label for="floatingInputGroup1">Mobile Number</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div class="input-group">
                                                <span class="input-group-text"><RiMarkPenLine /></span>
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" />
                                                    <label for="floatingInputGroup1">Remarks</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div>
                                                <label for="formFileLg" class="form-label">Attechment</label>
                                                <input class="form-control form-control-lg" id="formFileLg" type="file" />
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
}

export default Complaints;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
`;