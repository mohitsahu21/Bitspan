import React, { useState, useEffect } from "react";
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

import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
// import { clearUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SAEProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [panCardFront, setPanCardFront] = useState(null);
  const [profileImage, setprofileImage] = useState(null);
  const [status, setStatus] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log(`File input changed - Name: ${name}, Files:`, files);

    if (name === "aadharFront") {
      setAadharFront(files[0]);
      console.log("Updated aadharFront:", files[0]);
      Swal.fire(
        "File Selected",
        "Aadhar Front file selected successfully!",
        "success"
      );
    }
    if (name === "aadharBack") {
      setAadharBack(files[0]);
      console.log("Updated aadharBack:", files[0]);
      Swal.fire(
        "File Selected",
        "Aadhar Back file selected successfully!",
        "success"
      );
    }
    if (name === "panCardFront") {
      setPanCardFront(files[0]);
      console.log("Updated panCardFront:", files[0]);
      Swal.fire(
        "File Selected",
        "Pan Card Front file selected successfully!",
        "success"
      );
    }
    if (name === "profileImage") {
      setprofileImage(files[0]);
      console.log("Updated profileImage:", files[0]);
      Swal.fire(
        "File Selected",
        "Profile Image file selected successfully!",
        "success"
      );
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/superDistributor/getUserDetails/${currentUser?.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Details:", response.data?.data);
      const userStatus = response.data?.data?.Status; // API response se status fetch kar rahe hain
      setStatus(userStatus); // Status ko state mein set karenge
      console.log(userStatus);
    } catch (error) {
      console.error("Error fetching user details:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");

    const formData = new FormData();
    if (aadharFront) {
      formData.append("aadharFront", aadharFront);
      console.log("Added aadharFront to formData:", aadharFront);
    }
    if (aadharBack) {
      formData.append("aadharBack", aadharBack);
      console.log("Added aadharBack to formData:", aadharBack);
    }
    if (panCardFront) {
      formData.append("panCardFront", panCardFront);
      console.log("Added panCardFront to formData:", panCardFront);
    }
    if (profileImage) {
      formData.append("profileImage", profileImage);
      console.log("Added profileImage to formData:", profileImage);
    }

    console.log("Final FormData object before submission:", formData);

    try {
      const response = await axios.put(
        `https://2kadam.co.in/api/auth/superDistributor/user-profile/${currentUser?.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response received:", response.data);
      Swal.fire(
        "Success",
        response.data.message || "Upload successful!",
        "success"
      );
    } catch (error) {
      console.log("Error occurred during API call");
      console.error("Full error object:", error);
      const errorMessage =
        error.response?.data?.error || "An error occurred. Please try again.";
      console.log(errorMessage);
      Swal.fire("Error", errorMessage, "error");
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
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Aadhar Front</label>
                          <div className="input-group">
                            <input
                              class="form-control"
                              type="file"
                              id="formFile"
                              name="aadharFront"
                              accept="image/*"
                              onChange={handleFileChange}
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
                              name="aadharBack"
                              accept="image/*"
                              onChange={handleFileChange}
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
                              name="panCardFront"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div> */}

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Profile Image</label>
                          <div className="input-group">
                            <input
                              class="form-control"
                              type="file"
                              id="formFile"
                              name="profileImage"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          {/* <div className="text-start m-3">
                            {status === "Active" ? (
                              <button
                                className="btn p-2  btn-primary"
                                type="button"
                                disabled
                              >
                                KYC Verified
                              </button>
                            ) : (
                              <button
                                className="btn p-2"
                                type="submit"
                                // disabled={isLoading || status === "Pending"}
                              >
                                {isLoading
                                  ? "KYC Verification..."
                                  : "KYC Verification"}
                              </button>
                            )}
                          </div> */}
                          <div className="text-start m-3">
                            <button className="btn p-2" type="submit">
                              {isLoading
                                ? "Update Profile..."
                                : "Update Profile"}
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

export default SAEProfile;
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
