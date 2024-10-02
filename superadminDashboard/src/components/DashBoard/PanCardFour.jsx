import React, { useState } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { IoMail, IoPerson } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";

const PanCardFour = () => {
  const [formData, setFormData] = useState({
    application_type: "",
    select_title: "",
    name: "",
    father_name: "",
    mother_name: "",
    dob: "",
    gender: "",
    office_address: "",
    aadhar_details: "",
    Address_Communication_OfficeResident: "",
    alternative_communication_Address: "",
    mobile_no: "",
    email_id: "",
    pin_code: "",
    state: "",
    Change_Request: "",
    Charge_Amount: "",
    user_id: "",
    status: "Pending",
  });

  const [files, setFiles] = useState({
    documentUpload: null,
    attachment_form: null,
    attachment_photo: null,
    attachment_signature: null,
  });

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: files.length > 1 ? Array.from(files) : files[0], // Keep it as an array if multiple, else take single file
      }));
    } else {
      // If no file is selected, set it to null
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: null,
      }));
    }
  };

  // Handle form data input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send files and form data together
    const form = new FormData();

    // Add form data to FormData
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    // Add multiple files for documentUpload
    if (files.documentUpload) {
      files.documentUpload.forEach((file) => {
        form.append("documentUpload", file);
      });
    }

    // Add single files, check for existence first
    if (files.attachment_form) {
      form.append("attachment_form", files.attachment_form);
    }

    if (files.attachment_photo) {
      form.append("attachment_photo", files.attachment_photo);
    }

    if (files.attachment_signature) {
      form.append("attachment_signature", files.attachment_signature);
    }

    try {
      const response = await axios.post(
        "http://localhost:7777/api/auth/retailer/pan-4.0",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // alert("Form submitted successfully");
      Swal.fire("Form Submitted Successfully!");
      // Reset form data and file inputs after successful submission
      setFormData({
        application_type: "",
        select_title: "",
        name: "",
        father_name: "",
        mother_name: "",
        dob: "",
        gender: "",
        office_address: "",
        aadhar_details: "",
        Address_Communication_OfficeResident: "",
        alternative_communication_Address: "",
        mobile_no: "",
        email_id: "",
        pin_code: "",
        state: "",
        Change_Request: "",
        Charge_Amount: "",
        user_id: "",
        status: "Pending",
      });
      setFiles({
        documentUpload: null,
        attachment_form: null,
        attachment_photo: null,
        attachment_signature: null,
      });

      // Reset file input fields manually
      document.getElementById("documentUpload").value = "";
      document.getElementById("attachment_form").value = "";
      document.getElementById("attachment_photo").value = "";
      document.getElementById("attachment_signature").value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Wrapper>
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-wrap justify-content-center">
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
              <div className="main shadow-none">
                <div className="row shadow-none">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="px-lg-3">Apply Pan Card Offline</h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; Apply Pan Card Offline
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="container p-3">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="col-6 mb-4 border border-danger rounded shadow-sm">
                      <h5 className="text-center m-0 p-3">PAN 4.0</h5>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="applicationType">
                          Application Type
                        </label>
                        <select
                          className="form-control"
                          id="applicationType"
                          name="application_type"
                          value={formData.application_type}
                          onChange={handleChange}
                        >
                          <option value="">Select an option</option>
                          <option value="Minor">Minor</option>
                          <option value="Major">Major</option>
                          <option value="Correction">Correction</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="nameTitle">Select Name Title</label>
                        <select
                          className="form-control"
                          id="nameTitle"
                          name="select_title"
                          value={formData.select_title}
                          onChange={handleChange}
                        >
                          <option value="KUMARI">KUMARI</option>
                          <option value="SHRI">SHRI</option>
                          <option value="SMT">SMT</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="fatherName">Father Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fatherName"
                          placeholder="Enter Father's Name"
                          name="father_name"
                          value={formData.father_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="motherName">Mother Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="motherName"
                          placeholder="Enter Mother's Name"
                          name="mother_name"
                          value={formData.mother_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="gender">Gender</label>
                        <select
                          className="form-control"
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="Male">M</option>
                          <option value="Female">F</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="officeAddress">Office Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="officeAddress"
                          placeholder="Enter Office Address"
                          name="office_address"
                          value={formData.office_address}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="aadhaarDetails">
                          Aadhar Details Resident Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="aadhaarDetails"
                          placeholder="Enter Aadhar Details"
                          name="aadhar_details"
                          value={formData.aadhar_details}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="communicationAddress">
                          Address for Communication - Office/Resident
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="communicationAddress"
                          placeholder="Enter Communication Address"
                          name="Address_Communication_OfficeResident"
                          value={formData.Address_Communication_OfficeResident}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="altCommunicationAddress">
                          Alternative Communication Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="altCommunicationAddress"
                          placeholder="Enter Alternative Communication Address"
                          name="alternative_communication_Address"
                          value={formData.alternative_communication_Address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="mobileNumber">Mobile No.</label>
                        <input
                          type="text"
                          className="form-control"
                          id="mobileNumber"
                          placeholder="Enter Mobile Number"
                          name="mobile_no"
                          value={formData.mobile_no}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter Email"
                          name="email_id"
                          value={formData.email_id}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="pinCode">Pin Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pinCode"
                          placeholder="Enter Pin Code"
                          name="pin_code"
                          value={formData.pin_code}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          placeholder="Enter State"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="changeRequest">
                          Change Request - Name, Father, DOB, etc.
                        </label>
                        <select
                          className="form-control"
                          id="changeRequest"
                          name="Change_Request"
                          value={formData.Change_Request}
                          onChange={handleChange}
                        >
                          <option value="">SELECT</option>
                          <option value="Enable">Enable</option>
                          <option value="Disable">Disable</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="documentUpload">
                          Document Upload - Aadhar, VoterID, Driving card.
                        </label>
                        <input
                          type="file"
                          name="documentUpload"
                          onChange={handleFileChange}
                          multiple
                          className="form-control"
                          id="documentUpload"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="documentUpload">Upload Pan Form</label>
                        <input
                          type="file"
                          name="attachment_form"
                          onChange={handleFileChange}
                          className="form-control"
                          id="documentUpload"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="documentUpload">Upload Photo</label>
                        <input
                          type="file"
                          name="attachment_photo"
                          onChange={handleFileChange}
                          className="form-control"
                          id="documentUpload"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="documentUpload">
                          Upload Sign Image
                        </label>
                        <input
                          type="file"
                          name="attachment_signature"
                          onChange={handleFileChange}
                          className="form-control"
                          id="documentUpload"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="chargeAmount">
                          Charge Amount - Minor/Major/Correction
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="chargeAmount"
                          placeholder="Enter Charge Amount"
                          name="Charge_Amount"
                          value={formData.Charge_Amount}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary w-100">
                          Submit
                        </button>
                      </div>
                    </div>

                    {/* <div className="row mt-2">
                      <div className="col-md-12 text-center">
                        <button type="button" className="btn btn-link">
                          Popup - Terms & Conditions
                        </button>
                      </div>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PanCardFour;

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
