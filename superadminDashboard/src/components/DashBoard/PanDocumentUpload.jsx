import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";

const PanDocumentUpload = () => {
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid bg-body-tertiary">
                        <div className="row flex-wrap justify-content-center ">
                            <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div
                                className="col-xxl-10 col-xl-7 col-lg-7 col-md-7 ms-md-5 ps-md-5 col-9
                             mt-5 bg-body-tertiary"
                            >
                                <div className="main shadow-none bg-body-tertiary">
                                    <div className="row shadow-none bg-body-tertiary">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-9">
                                            <div className="text-center">
                                                <h3>Upload Pan Card Document</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-xxl-6 col-xl-9 col-lg-9 col-md-10 col-sm-9 shadow bg-body-tertiary rounded m-4 px-5 py-5">
                                            <div className="row d-flex flex-column g-4">
                                                <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
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
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
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
                                                                    value="2KADAMONLINE"
                                                                />
                                                                <label for="floatingInputGroup1">
                                                                    Agency
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="input-group">

                                                        <div >

                                                          
                                                            <div class="mb-3">
                                                                <label for="exampleFormControlTextarea1" class="form-label"> Application Details ( Input multiple application no and it should be (space) separated)</label>
                                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Appication Details"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
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
                                                                    
                                                                    
                                                                />
                                                                <label for="floatingInputGroup1">
                                                                    No. of Document
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text">
                                                                <MdOutlineFormatListNumbered />
                                                            </span>
                                                            <div class="form-floating">
                                                                <input
                                                                    type="date"
                                                                    class="form-control"
                                                                    id="floatingInputGroup1"
                                                                    placeholder="Transaction Number"
                                                                   
                                                                    
                                                                />
                                                                <label for="floatingInputGroup1">
                                                                    Date of Courier
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
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
                                                                    
                                                                    
                                                                />
                                                                <label for="floatingInputGroup1">
                                                                    POD/Tracking Number
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
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
                                                                   
                                                                    
                                                                />
                                                                <label for="floatingInputGroup1">
                                                                    Courier Company Name
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text">
                                                                <MdOutlineFormatListNumbered />
                                                            </span>
                                                            <div class="form-floating">
                                                                <input
                                                                    type="date"
                                                                    class="form-control"
                                                                    id="floatingInputGroup1"
                                                                    placeholder="Transaction Number"
                                                                    
                                                                    
                                                                />
                                                                <label for="floatingInputGroup1">
                                                                    Delivery Date
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
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
                                                                   
                                                                    
                                                                />
                                                                <label for="floatingInputGroup1">
                                                                     Delivery Location
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                <MdOutlineFormatListNumbered />
                                                            </span>
                                                            <div class="form-floating">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="floatingInputGroup1"
                                                                    placeholder="Transaction Number"
                                                                    
                                                                    
                                                                />
                                                                <label for="floatingInputGroup1">
                                                                    Confirm the Address
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="mb-3">
                                                               
                                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Remark"></textarea>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex  flex-column flex-xl-row gap-3">
                                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                                    <div>
                                                <label for="formFileLg" class="form-label">Tab to upload scan copy of POD</label>
                                                <input class="form-control form-control-lg" id="formFileLg" type="file" />
                                            </div>
                                                    </div>
                                                   
                                                </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div className="text-start mb-3">
                                                        <button className="btn p-2">Upload</button>
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

export default PanDocumentUpload;

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
`;
