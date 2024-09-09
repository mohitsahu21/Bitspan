import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";

const SAChangeUserNotification = () => {
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
                                                <h4 className="px-lg-3">Choice User Notification</h4>
                                                <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Choice User Notification
                          </span>{" "}
                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                                        <div className="text-center my-5">
                                            <h2>Choice User Notification</h2>
                                        </div>

                                        <div className="col-xl-12  col-sm-12">
                                            <label for="whiteLabeltext" className="form-label fs-4">
                                                Enter User Notification for White Label
                                            </label>
                                            <div class="input-group flex-nowrap">
                                               
                                            
  <textarea class="form-control" placeholder="Enter User Notification for White Label" id="whiteLabeltext" style={{height:"150px"}}></textarea>
  {/* <label for="whiteLabeltext">Enter User Notification for White Label</label> */}
</div>
                                            </div>
                                        <div className="col-xl-12  col-sm-12 mt-5">
                                            <label for="SuperDistributortext" className="form-label fs-4">
                                                Enter User Notification for Super Distributor
                                            </label>
                                            <div class="input-group flex-nowrap">
                                               
                                            
  <textarea class="form-control" placeholder="Enter User Notification for Super Distributor" id="SuperDistributortext" style={{height:"150px"}}></textarea>
</div>
                                            </div>
                                        <div className="col-xl-12  col-sm-12 mt-5">
                                            <label for="Distributortext" className="form-label fs-4">
                                                Enter User Notification for Distributor
                                            </label>
                                            <div class="input-group flex-nowrap">
                                               
                                            
  <textarea class="form-control" placeholder="Enter User Notification for Distributor" id="Distributortext" style={{height:"150px"}}></textarea>
</div>
                                            </div>
                                        <div className="col-xl-12  col-sm-12 mt-5">
                                            <label for="Retailertext" className="form-label fs-4">
                                                Enter User Notification for Retailer
                                            </label>
                                            <div class="input-group flex-nowrap">
                                               
                                            
  <textarea class="form-control" placeholder="Enter User Notification for Retailer" id="Retailertext" style={{height:"150px"}}></textarea>
</div>
                                            </div>
                                       
                                    
                                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                            Enter White Label Joining Price
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <FaRupeeSign />
                                                </span>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}
                                                    
                                                />
                                            </div>
                                        </div> */}

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center mb-5 mt-3">
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

export default SAChangeUserNotification;

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
