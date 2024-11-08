import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toggleRefresh } from "../../redux/user/userSlice";

const EdistrictForm = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    application_type: "",
    samagar: "",
    gender: "",
    name: "",
    father_husband_name: "",
    dob: "",
    address: "",
    mobile_no: "",
    cast: "",
    aadhar_no: "",
    samagar_member_id: "",
    state: "",
    annual_income: "",
    previous_application: "",
    charge_amount: "",
    user_id: currentUser.userId,
    status: "Pending",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change for multiple files
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();

    // Append form data fields
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    // Append files to form data
    Array.from(files).forEach((file) => data.append("documentUpload", file));

    try {
      const response = await axios.post(
        // "http://bitspan.jyvflirl.a2hosted.com/api/auth/e-district-Form",
        "http://localhost:7777/api/auth/retailer/e-district-Form",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setMessage("Error submitting form");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-wrap justify-content-center">
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
              <div className="container mt-4">
                <div className="col-12 d-flex justify-content-center">
                  <div className="border border-danger rounded shadow-sm mb-3">
                    <h2 className="text-center m-0 px-5 py-3">E District</h2>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Select Application</label>
                      <select
                        name="application_type"
                        className="form-select"
                        value={formData.application_type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">--Select Option--</option>
                        <option value="income">Income</option>
                        <option value="domicile">Domicile</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Samagar</label>
                      <select
                        name="samagar"
                        className="form-select"
                        value={formData.samagar}
                        onChange={handleChange}
                      >
                        <option value="">--Select Option--</option>
                        <option value="ekyc">Ekyc</option>
                        <option value="non-ekyc">Non Ekyc</option>
                        <option value="non">Non</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Gender</label>
                      <select
                        className="form-select"
                        value={formData.gender}
                        onChange={handleChange}
                        name="gender"
                        required
                      >
                        <option value="">--Select Option--</option>
                        <option value="male">M</option>
                        <option value="female">F</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Father / Husband Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="father_husband_name"
                        value={formData.father_husband_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>DOB</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="House No, Village, Gram Panchayat, Post, Block, District, Pincode"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Mobile No.</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="mobile_no"
                        value={formData.mobile_no}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Cast</label>
                      <select
                        name="cast"
                        className="form-select"
                        value={formData.cast}
                        onChange={handleChange}
                        required
                      >
                        <option value="">--Select Option--</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                        <option value="obc">OBC</option>
                        <option value="general">General</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>UID - Aadhar No.</label>
                      <input
                        type="text"
                        className="form-control"
                        name="aadhar_no"
                        value={formData.aadhar_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Samagar Member ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="samagar_member_id"
                        value={formData.samagar_member_id}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Annual Income</label>
                      <input
                        type="number"
                        className="form-control"
                        name="annual_income"
                        value={formData.annual_income}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Have you ever applied before?</label>
                      <select
                        className="form-select"
                        name="previous_application"
                        value={formData.previous_application}
                        onChange={handleChange}
                        required
                      >
                        <option value="">--Select Option--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Document Upload</label>
                      <input
                        type="file"
                        className="form-control"
                        multiple
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                      <label>Charge Amount</label>
                      <select
                        name="charge_amount"
                        className="form-select"
                        value={formData.charge_amount}
                        onChange={handleChange}
                        required
                      >
                        <option value="">--Select Option--</option>
                        <option value="ekyc">Ekyc</option>
                        <option value="non-ekyc">Non Ekyc</option>
                        <option value="non">Non</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary mb-4"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submit..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EdistrictForm;
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
  .custom-dropdown {
    font-size: 16px;
    border-radius: 5px;
  }

  .custom-dropdown option {
    background-color: #e8e4f0;
    color: #343a40;
  }
`;
