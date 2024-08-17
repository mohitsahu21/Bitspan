import React from "react";
import styled from "styled-components";

const Genral = () => {
    return (
        <Wrapper>
            <div className="main">
                <div className="container-fluid">
                    <div className="row flex-wrap justify-content-center mb-4">

                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="main shadow-none">

                                <div className="row g-4 shadow bg-body-tertiary rounded m-1 px-3 pb-4">
                                    <div className="text-center">
                                        <h4>Enter All Correct Details For Update</h4>
                                    </div>
                                    <div className=" col-sm-12">
                                        <div class="mb-2">
                                            <label for="homePara1" className="form-label">Home Page 1st Paragraph</label>
                                            <textarea placeholder="Enter Home Page 1st Paragraph" className="form-control" id="homePara1" rows="2"></textarea>
                                        </div>
                                    </div>
                                    <div className=" col-sm-12">
                                        <div class="mb-2">
                                            <label for="homePara2" className="form-label">Home Page 2nd Paragraph</label>
                                            <textarea placeholder="Enter Home Page 2nd Paragraph" className="form-control" id="homePara2" rows="2"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            Email Id
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Email Id"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            Calling No
                                        </label>
                                        <div class="input-group flex-nowrap">
                                          
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Calling No"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            Whatsapp No
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Whatsapp No"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            App Link
                                        </label>
                                        <div class="input-group flex-nowrap">
                                          
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter App Link"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="bankDetails" className="form-label">Bank Details</label>
                                            <textarea placeholder="Enter Bank Details" className="form-control" id="bankDetails" rows="2"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            UPI ID
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter UPI ID"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            QR Code
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="bankDetails" className="form-label">Enter Address</label>
                                            <textarea placeholder="Enter Address" className="form-control" id="bankDetails" rows="2"></textarea>
                                        </div>
                                    </div>





                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="text-center mb-2">
                                            <button className="btn p-2">UPDATE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Genral

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