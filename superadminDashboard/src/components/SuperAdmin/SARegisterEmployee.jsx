import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import {
  FaAddressCard,
  FaMobileAlt,
  FaRupeeSign,
  FaUser,
} from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { PiAddressBook } from "react-icons/pi";
import { LuTextSelect, LuUserCheck } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SARegisterEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    panNumber: "",
    aadhar: "",
    city: "",
    state: "",
    pincode: "",
    userType: "SuperAdmin_Employee",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact" || name === "aadhar") {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  console.log(formData);

  const superAdminEmpRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7171/api/auth/log-reg/superAdminEmployeeRegiser",
        formData
      );
      console.log(res);
      alert("user registered successfully");
      navigate("/");
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
                        <h4 className="px-lg-3">Create Super Admin Employee</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Create Super Admin Employee
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <form onSubmit={superAdminEmpRegister}>
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                      <div className="text-center">
                        <h5>
                          Enter All Correct Details For Creating a Super Admin
                          Employee
                        </h5>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="name" className="form-label">
                          Enter Name
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="contact" className="form-label">
                          Enter Contact No
                        </label>
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
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            maxLength={10}
                            required
                            className="form-control"
                            placeholder="Enter Contact No"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="email" className="form-label">
                          Enter E-mail
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <MdEmail />
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter E-mail"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="panNumber" className="form-label">
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
                            id="panNumber"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                            maxLength={10}
                            required
                            className="form-control"
                            placeholder="Enter Pan Card Number"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="aadhar" className="form-label">
                          Enter Aadhar No.
                        </label>
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
                            id="aadhar"
                            name="aadhar"
                            value={formData.aadhar}
                            onChange={handleChange}
                            maxLength={12}
                            required
                            className="form-control"
                            placeholder="Enter Aadhar No."
                          />
                        </div>
                      </div>
                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        Enter Shop/ Company Name
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <PiAddressBook />
                        </span>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter Shop/ Company Name"
                        />
                      </div>
                    </div> */}
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="city" className="form-label">
                          Enter City
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            <PiAddressBook />
                          </span>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter City"
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="state" className="form-label">
                          Enter State
                        </label>
                        <div className="input-group flex-nowrap">
                          <span className="input-group-text">
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
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
                        <label htmlFor="pincode" className="form-label">
                          Enter Pin Code
                        </label>
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
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter Pin Code"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="userType" className="form-label">
                          User Type
                        </label>
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
                            id="userType"
                            className="form-control"
                            placeholder="User Type"
                            value={"SuperAdmin-Employee"}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuUserCheck />
                          </span>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        Select Package
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Select...</option>
                          <option value="Andhra Pradesh">Package A</option>
                          <option value="Arunachal Pradesh">Package B</option>
                          <option value="Assam">Package C</option>
                        </select>
                      </div>
                    </div> */}
                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        NSDL Phycial PAN Price (Your Price - 105.00)
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter NSDL Phycial PAN Price"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        NSDL E - PAN Price (Your Price - 73.00)
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter NSDL E - PAN Price"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        UTI Physical P Price (Your Price - 99.00)
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter UTI Physical P Price"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        UTI Physical E Price (Your Price - 81.00)
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter UTI Physical E Price"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        UTI Digital P Price (Your Price - 104.00)
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter UTI Digital P Price"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        UTI Digital E Price (Your Price - 97.00)
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter UTI Digital E Price"
                        />
                      </div>
                    </div> */}
                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="name" className="form-label">
                        UTI Digital New Coupon Price (Your Price - 107.00)
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Enter UTI Digital New Coupon Price"
                        />
                      </div>
                    </div> */}

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="text-start mb-3">
                          <button className="btn btn-warning p-2" type="submit">
                            Create
                          </button>
                        </div>
                      </div>
                    </div>{" "}
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

export default SARegisterEmployee;

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
