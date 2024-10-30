import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import axios from "axios";

const DtProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    PanCardNumber: "",
    AadharNumber: "",
    BusinessName: "",
    City: "",
    State: "",
    PinCode: "",
    AadharFront: null,
    AadharBack: null,
    PanCard: null,
  });

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const getUserProfileDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7171/api/auth/superDistributor/getUserDetails/${user.userId}`
      );
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfileDetails();
  }, []);

  useEffect(() => {
    setFormData({
      PanCardNumber: userData[0]?.PanCardNumber,
      AadharNumber: userData[0]?.AadharNumber,
      BusinessName: userData[0]?.BusinessName,
      City: userData[0]?.City,
      State: userData[0]?.State,
      PinCode: userData[0]?.PinCode,
      AadharFront: null,
      AadharBack: null,
      PanCard: null,
    });
  }, [userData]);

  console.log(formData);

  const updateProfileKyc = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("PanCardNumber", formData?.PanCardNumber || "");
    data.append("AadharNumber", formData?.AadharNumber || "");
    data.append("BusinessName", formData?.BusinessName || "");
    data.append("City", formData?.City || "");
    data.append("State", formData?.State || "");
    data.append("PinCode", formData?.PinCode || "");
    data.append("AadharFront", formData?.AadharFront || "");
    data.append("AadharBack", formData?.AadharBack || "");
    data.append("PanCard", formData?.PanCard || "");

    try {
      const res = await axios.put(
        `http://localhost:7171/api/auth/superDistributor/kycupload/${user.userId}`,
        data
      );

      getUserProfileDetails();
      alert("KYC updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

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
                  <form onSubmit={updateProfileKyc}>
                    <div className="row g-4 shadow bg-body-tertiary rounded px-3 proForm">
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
                            value={user.userId}
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
                            value={user.role}
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
                            value={user.username}
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
                            value={user.ContactNo}
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
                            value={user.email}
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
                            name="PanCardNumber"
                            value={formData.PanCardNumber}
                            onChange={handleChange}
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
                            name="AadharNumber"
                            value={formData.AadharNumber}
                            onChange={handleChange}
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
                            name="BusinessName"
                            value={formData.BusinessName}
                            onChange={handleChange}
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
                            name="City"
                            value={formData.City}
                            onChange={handleChange}
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
                            name="State"
                            value={formData.State}
                            onChange={handleChange}
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
                            name="PinCode"
                            value={formData.PinCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="d-flex justify-content-between">
                          <div>
                            <label>Aadhar Front</label>
                            <div className="input-group">
                              <input
                                className="form-control"
                                type="file"
                                name="AadharFront"
                                onChange={handleChange}
                              />
                            </div>
                            <button
                              className="btn btn-warning mt-2"
                              onClick={updateProfileKyc}
                            >
                              Upload
                            </button>
                          </div>
                          <div className="img-div">
                            <img
                              src={userData[0]?.AadharFront}
                              alt=""
                              className="img-fluid img-div"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="d-flex justify-content-between">
                          <div>
                            <label>Aadhar Back</label>
                            <div className="input-group">
                              <input
                                className="form-control"
                                type="file"
                                name="AadharBack"
                                onChange={handleChange}
                              />
                            </div>{" "}
                            <button
                              className="btn btn-warning mt-2"
                              onClick={updateProfileKyc}
                            >
                              Upload
                            </button>
                          </div>
                          <div>
                            <div className="img-div">
                              <img
                                src={userData[0]?.AadharBack}
                                alt=""
                                className="img-fluid img-div"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="d-flex justify-content-between">
                          <div>
                            <label>Pan Card</label>
                            <div className="input-group">
                              <input
                                className="form-control"
                                type="file"
                                name="PanCard"
                                onChange={handleChange}
                              />
                            </div>
                            <button
                              className="btn btn-warning mt-2"
                              onClick={updateProfileKyc}
                            >
                              Upload
                            </button>
                          </div>
                          <div className="img-div">
                            <img
                              src={userData[0]?.PanCardFront}
                              alt=""
                              className="img-fluid img-div"
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="text-start mt-6 mb-4">
                          <button className="btn btn-warning p-2">
                            KYC Verification
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* login test */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default DtProfile;
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

  .img-div {
    height: 5rem;
    width: auto;
  }
`;
