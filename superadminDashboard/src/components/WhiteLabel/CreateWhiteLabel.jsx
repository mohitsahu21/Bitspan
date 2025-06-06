import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { IoIosGlobe } from "react-icons/io";

const CreateWhiteLabel = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.currentUser?.userId);

  // const host = window.location.host;
  const host = window.location.origin;

  const [remainingIds, setRemainingIds] = useState({
    remaining_whitelable_id: 0,
    remaining_superDistributor_id: 0,
    remaining_distributor_id: 0,
    remaining_retailer_id: 0,
  });

  const fetchNoOfIds = async () => {
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/whiteLabel/getRemainingIds/${userId}`,
        // `https://2kadam.co.in/api/auth/superDistributor/getRemainingIds/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRemainingIds(response.data.data);
    } catch (error) {
      console.error("Error fetching No of Available IDs:", error);
      if (error?.response?.status === 401) {
        // Handle token expiration
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to the login page
      } else {
        // Handle other errors
        Swal.fire({
          icon: "error",
          title: "Error Fetching Data",
          text: "An error occurred while fetching the available IDs. Please try again later.",
        });
      }
    }
  };

  const updatedFormData = {
    userId: currentUser.userId,
    userId_type: "WhiteLabel",
  };

  const updateNoOfIds = async () => {
    try {
      const response = await axios.put(
        "https://2kadam.co.in/api/auth/whiteLabel/updateUserProfile",
        // "https://2kadam.co.in/api/auth/superDistributor/updateUserProfile",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setRemainingIds(response.data.data);
      if (response.data.success) {
        Swal.fire("Success!", "User created Successfully!", "success");
        fetchNoOfIds();
      }
    } catch (error) {
      console.error("Error fetching No of Available IDs:", error);
      if (error?.response?.status === 401) {
        // Handle token expiration
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to the login page
      } else {
        // Handle other errors
        Swal.fire({
          icon: "error",
          title: "Error Updating Profile",
          text: "An error occurred while updating the profile. Please try again later.",
        });
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNoOfIds();
    }
  }, [userId]);

  const [formData, setFormData] = useState({
    UserName: "",
    role: "WhiteLabel",
    ContactNo: "",
    Email: "",
    PanCardNumber: "",
    AadharNumber: "",
    BusinessName: "",
    City: "",
    State: "",
    PinCode: "",
    Status: "Pending",
    payment_status: "Complete",
    created_By_User_Id: currentUser.userId,
    created_By_User_Role: currentUser.role,
    created_By_Website: host,
    White_Label_Website_URL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ContactNo" || name === "AadharNumber" || name === "PinCode") {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: name === "PanCardNumber" ? value.toUpperCase() : value,
      });
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(
        // "https://2kadam.co.in/api/auth/superAdmin/approveUser",
        "https://2kadam.co.in/api/auth/log-reg/user-register",
        // "https://2kadam.co.in/api/auth/log-reg/user-register",
        formData,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      setLoading(false);
      if (response.data.status == "Success") {
        // Swal.fire({
        //   icon: "success",
        //   title: response.data.message,
        // });
        setFormData({
          UserName: "",
          role: "WhiteLabel",
          ContactNo: "",
          Email: "",
          PanCardNumber: "",
          AadharNumber: "",
          BusinessName: "",
          City: "",
          State: "",
          PinCode: "",
          Status: "Pending",
          payment_status: "Complete",
          created_By_User_Id: currentUser.userId,
          created_By_User_Role: currentUser.role,
          created_By_Website: "www.bitspan.in",
          White_Label_Website_URL: "",
        });
        updateNoOfIds();
      } else {
        Swal.fire({
          icon: "error",
          title:
            response.data.message ||
            "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      }
      setLoading(false);
      Swal.fire({
        icon: "error",
        title:
          error.response.data.message ||
          "An error occurred during the process. Please try again.",
      });
    }
  };
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
                        <h4 className="px-lg-3">Create WhiteLabel Account</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            Create WhiteLabel Account
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  {remainingIds.remaining_whitelable_id > 0 ? (
                    <form onSubmit={handlesubmit}>
                      <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3 pb-3">
                        <div>
                          <h5 style={{ color: "#191970" }}>
                            Available White Label IDs:
                            {remainingIds?.remaining_whitelable_id}
                          </h5>
                          {/* <div>
                          <p>
                            Available IDs:{" "}
                            {remainingIds.remaining_distributor_id}
                          </p>
                        </div> */}
                        </div>
                        <div className="text-center">
                          <h5>
                            Enter All Correct Details For Creating a Distributor
                            Account
                          </h5>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter Name
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
                              name="UserName"
                              value={formData.UserName}
                              onChange={handleChange}
                              pattern="[A-Za-z\s]*"
                              title="Text should contain only letters"
                              placeholder="Enter full name"
                              required
                              autocomplete="off"
                              maxLength={100}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter Contact No
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              {" "}
                              <FaMobileAlt />
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              name="ContactNo"
                              value={formData.ContactNo}
                              onChange={handleChange}
                              placeholder="Enter 10-digit mobile number"
                              pattern="[0-9]{10}"
                              title="Mobile number should be 10 digits"
                              maxLength={10}
                              minLength={10}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter E-mail
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              {" "}
                              <MdEmail />
                            </span>
                            <input
                              type="email"
                              id="name"
                              class="form-control"
                              placeholder="Enter E-mail"
                              name="Email"
                              value={formData.Email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter Pan Card Number
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              <FaAddressCard />
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter Pan Card Number"
                              name="PanCardNumber"
                              value={formData.PanCardNumber}
                              onChange={handleChange}
                              style={{ textTransform: "uppercase" }}
                              required
                              pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
                              title="PAN card number should be in the format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
                              maxLength={10}
                              minLength={10}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter Aadhaar No.
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              {" "}
                              <FaAddressCard />
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              name="AadharNumber"
                              value={formData.AadharNumber}
                              onChange={handleChange}
                              placeholder="Enter 12-digit aadhaar number"
                              pattern="[0-9]{12}"
                              title="Aadhaar number should be 12 digits"
                              maxLength={12}
                              minLength={12}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter Shop/ Company Name
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              {" "}
                              <PiAddressBook />
                            </span>
                            <input
                              type="text"
                              id="name"
                              class="form-control"
                              placeholder="Enter Shop/ Company Name"
                              name="BusinessName"
                              value={formData.BusinessName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter City
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              <PiAddressBook />
                            </span>
                            <input
                              type="text"
                              id="name"
                              class="form-control"
                              placeholder="Enter City"
                              name="City"
                              value={formData.City}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter State
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              {" "}
                              <LuTextSelect />
                            </span>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              name="State"
                              value={formData.State}
                              onChange={handleChange}
                              required
                            >
                              <option selected value="">
                                Select...
                              </option>
                              <option value="Andhra Pradesh">
                                Andhra Pradesh
                              </option>
                              <option value="Arunachal Pradesh">
                                Arunachal Pradesh
                              </option>
                              <option value="Assam">Assam</option>
                              <option value="Bihar">Bihar</option>
                              <option value="Chhattisgarh">Chhattisgarh</option>
                              <option value="Goa">Goa</option>
                              <option value="Gujarat">Gujarat</option>
                              <option value="Haryana">Haryana</option>
                              <option value="Himachal Pradesh">
                                Himachal Pradesh
                              </option>
                              <option value="Jharkhand">Jharkhand</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Kerala">Kerala</option>
                              <option value="Madhya Pradesh">
                                Madhya Pradesh
                              </option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Manipur">Manipur</option>
                              <option value="Meghalaya">Meghalaya</option>
                              <option value="Mizoram">Mizoram</option>
                              <option value="Nagaland">Nagaland</option>
                              <option value="Odisha">Odisha</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Rajasthan">Rajasthan</option>
                              <option value="Sikkim">Sikkim</option>
                              <option value="Tamil Nadu">Tamil Nadu</option>
                              <option value="Telangana">Telangana</option>
                              <option value="Tripura">Tripura</option>
                              <option value="Uttar Pradesh">
                                Uttar Pradesh
                              </option>
                              <option value="Uttarakhand">Uttarakhand</option>
                              <option value="West Bengal">West Bengal</option>
                              <option value="Andaman and Nicobar Islands">
                                Andaman and Nicobar Islands
                              </option>
                              <option value="Chandigarh">Chandigarh</option>
                              <option value="Dadra and Nagar Haveli and Daman and Diu">
                                Dadra and Nagar Haveli and Daman and Diu
                              </option>
                              <option value="Lakshadweep">Lakshadweep</option>
                              <option value="Delhi">Delhi</option>
                              <option value="Puducherry">Puducherry</option>
                              <option value="Ladakh">Ladakh</option>
                              <option value="Jammu and Kashmir">
                                Jammu and Kashmir
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            Enter Pin Code
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              {" "}
                              <SlLocationPin />
                            </span>
                            <input
                              type="text"
                              id="name"
                              class="form-control"
                              placeholder="Enter Pin Code"
                              name="PinCode"
                              value={formData.PinCode}
                              onChange={handleChange}
                              pattern="[0-9]{6}"
                              title="Mobile number should be 6 digits"
                              maxLength={6}
                              minLength={6}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            User Type
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              {" "}
                              <LuUserCheck />
                            </span>
                            <input
                              type="text"
                              id="name"
                              class="form-control"
                              placeholder="User Type"
                              value={"whiteLabel"}
                              // value={"Distributor"}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label for="name" class="form-label">
                            White Label Website
                          </label>
                          <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping">
                              {" "}
                              <IoIosGlobe />
                            </span>
                            <input
                              type="text"
                              id="White_Label_Website_URL"
                              class="form-control"
                              placeholder="Enter website URL"
                              name="White_Label_Website_URL"
                              value={formData.White_Label_Website_URL}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="text-start mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary p-2"
                              disabled={loading}
                            >
                              {loading ? "Loading..." : "Create"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="col-sm-12 mt-0">
                      <div className="text-center text-white my-3 py-3 bg-danger">
                        <p className="mb-0">
                          You don't have available whiteLabel IDs to add
                          whiteLabel. Please buy whiteLabel Ids or contact
                          Admin.
                        </p>
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

export default CreateWhiteLabel;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
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
