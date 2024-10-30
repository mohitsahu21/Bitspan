import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import { FaAddressCard, FaMobileAlt, FaUser } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { PiAddressBook } from "react-icons/pi";
import { LuTextSelect, LuUserCheck } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

const CreateRetailer = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [formData, setFormData] = useState({
    UserName: "",
    role: "Retailer",
    ContactNo: "",
    Email: "",
    PanCardNumber: "",
    AadharNumber: "",
    BusinessName: "",
    City: "",
    State: "",
    PinCode: "",
    created_By_User_Id: user.userId,
    created_By_User_Role: user.role,
    created_By_Website: "http://localhost:3000",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validation for ContactNo (only allow numbers and limit to 10 digits)
    if (name === "ContactNo" && /^\d{0,10}$/.test(value)) {
      setFormData((prev) => ({ ...prev, ContactNo: value }));
    }

    // Validation for AadharNumber (only allow numbers and limit to 12 digits)
    else if (name === "AadharNumber" && /^\d{0,12}$/.test(value)) {
      setFormData((prev) => ({ ...prev, AadharNumber: value }));
    }

    // For other fields without restrictions
    else if (name !== "ContactNo" && name !== "AadharNumber") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log(formData);

  const registerNewPartner = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7171/api/auth/log-reg/user-register",
        formData
      );
      console.log(res);
      alert("Partner Created Successfully");
      setFormData({
        UserName: "",
        role: "Retailer",
        ContactNo: "",
        Email: "",
        PanCardNumber: "",
        AadharNumber: "",
        BusinessName: "",
        City: "",
        State: "",
        PinCode: "",
      });
    } catch (error) {
      console.log(error);
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
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Create Retailer Account</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Create Retailer Account
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={registerNewPartner}>
                    {" "}
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                      <div className="text-center">
                        <h5>
                          Enter All Correct Details For Creating a Retailer
                          Account
                        </h5>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Enter Name</label>
                        <div className="input-group flex-nowrap">
                          <span className="input-group-text">
                            {" "}
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            name="UserName"
                            value={formData.UserName}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Enter Contact No</label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <FaMobileAlt />
                          </span>
                          <input
                            type="text"
                            name="ContactNo"
                            value={formData.ContactNo}
                            required
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Contact No"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Enter E-mail</label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <MdEmail />
                          </span>
                          <input
                            type="text"
                            name="Email"
                            value={formData.Email}
                            required
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter E-mail"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">
                          Enter Pan Card Number
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            <FaAddressCard />
                          </span>
                          <input
                            type="text"
                            name="PanCardNumber"
                            value={formData.PanCardNumber}
                            required
                            maxLength={10}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Pan Card Number"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Enter Aadhar No.</label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <FaAddressCard />
                          </span>
                          <input
                            type="text"
                            name="AadharNumber"
                            value={formData.AadharNumber}
                            required
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Aadhar No."
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">
                          Enter Shop/ Company Name
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <PiAddressBook />
                          </span>
                          <input
                            type="text"
                            name="BusinessName"
                            value={formData.BusinessName}
                            required
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Shop/ Company Name"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Enter City</label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            <PiAddressBook />
                          </span>
                          <input
                            type="text"
                            name="City"
                            value={formData.City}
                            required
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter City"
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Enter State</label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="State"
                            value={formData.State}
                            required
                            onChange={handleChange}
                          >
                            <option selected>Select...</option>
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
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
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
                        <label className="form-label">Enter Pin Code</label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <SlLocationPin />
                          </span>
                          <input
                            type="text"
                            name="PinCode"
                            value={formData.PinCode}
                            required
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Pin Code"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">User Type</label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuUserCheck />
                          </span>
                          <input
                            type="text"
                            name="role"
                            value={formData.role}
                            className="form-control"
                            placeholder="User Type"
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="text-start mb-3">
                          <button className="btn btn-warning p-2">
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default CreateRetailer;

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
