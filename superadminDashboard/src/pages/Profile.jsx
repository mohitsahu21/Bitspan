import React from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaMobileButton } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";

const Profile = () => {
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid bg-body-tertiary">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 p-0">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9 mt-5 bg-body-tertiary">
                <div className="container-fluid m-0 rechargeNav">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center raisecomp flex-wrap">
                        <h4>Prepaid Recharge</h4>
                        <h6>
                          {" "}
                          <BiHomeAlt /> &nbsp; / &nbsp; Prepaid Recharge
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="text-center">
                      <h4>Profile Information</h4>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>User Id</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User ID"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>User Type</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUsers />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User Type"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>User Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter Contact No</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileButton />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Contact No"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter E-mail</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <MdEmail />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter E-mail"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter Pan Card Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Pan Card Number"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Aadhar Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Aadhar Number"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Company / Shop Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company / Shop Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter City</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <BiSolidContact />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter City"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>State</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaRegBuilding />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="State"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter Pin Code</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMapMarkerAlt />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Pin Code"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Aadhar Front</label>
                      <div className="input-group">
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Aadhar Back</label>
                      <div className="input-group">
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Pan Card</label>
                      <div className="input-group">
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start m-3">
                        <button className="btn p-2">KYC Verification</button>
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

export default Profile;
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
