import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid bg-body-tertiary">
            <div className="row flex-nowrap justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 bg-body-tertiary formdata">
                <div className="main shadow-none bg-body-tertiary">
                  <div className="row shadow-none bg-body-tertiary">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-start">
                        <h3>Update Profile</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 ">Update Profile</h4>
                        <h6 className="">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Update Profile
                        </h6>
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className="row g-4 shadow bg-body-tertiary rounded px-3 proForm">
                      <div className="text-center">
                        <h4>Profile Information</h4>
                      </div>
                      <>
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
                              value={currentUser?.userId || ""}
                              readOnly
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
                              value={currentUser?.role || ""}
                              readOnly
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
                              value={currentUser?.username || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Contact No</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FaMobileButton />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Contact No"
                              value={currentUser?.ContactNo || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>E-mail</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <MdEmail />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter E-mail"
                              value={currentUser?.email || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Pan Card Number</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FaIdCard />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Pan Card Number"
                              value={currentUser?.PanCardNumber || ""}
                              readOnly
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
                              value={currentUser?.AadharNumber || ""}
                              readOnly
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
                              value={currentUser?.BusinessName || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>City</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <BiSolidContact />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter City"
                              value={currentUser?.City || ""}
                              readOnly
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
                              value={currentUser?.State || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Pin Code</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FaMapMarkerAlt />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Pin Code"
                              value={currentUser?.PinCode || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Aadhar Front</label>
                          <div className="input-group">
                            <input
                              class="form-control"
                              type="file"
                              id="formFile"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Aadhar Back</label>
                          <div className="input-group">
                            <input
                              class="form-control"
                              type="file"
                              id="formFile"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Pan Card</label>
                          <div className="input-group">
                            <input
                              class="form-control"
                              type="file"
                              id="formFile"
                            />
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="text-start m-3">
                            <button
                              className="btn p-2"
                              type="submit"
                              disabled={isLoading}
                            >
                              {isLoading
                                ? "KYC Verification..."
                                : "KYC Verification"}
                            </button>
                          </div>
                        </div>
                      </>
                    </div>
                  </form>
                  {currentUser?.status === "Pending" &&
                    currentUser?.Note?.trim() && (
                      <div className="col-12">
                        <label>Note</label>
                        <div className="alert alert-warning">
                          {currentUser.Note}
                        </div>
                      </div>
                    )}
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

  .proForm {
    margin: 24px;
    @media (min-width: 1024px) and (max-width: 1280px) {
      margin-left: 4.9rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      margin-left: 4.9rem;
    }
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
