import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { IoMail, IoPerson } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Spinner } from "react-bootstrap";

const PanCardFour = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const documentUploadRef = useRef(null)
  const attachment_formRef = useRef(null)
  const attachment_photoRef = useRef(null)
  const attachment_signatureRef = useRef(null)
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState({
    electronicPrice: "",
    physicalPrice: "",
  });
  const [formData, setFormData] = useState({

    application_type: "",
    applicant_type: "",
    select_title: "",
    name: "",
    father_name: "",
    mother_name: "",
    dob: "",
    gender: "",
    pantype: "",
    office_address: "",
    aadhar_details: "",
    Address_Communication_OfficeResident: "",
    alternative_communication_Address: "",
    mobile_no: "",
    email_id: "",
    pin_code: "",
    state: "",
    // Change_Request: "",
    Change_Request: {
      name: false,
      father_Name: false,
      dob: false,
      mother_Name: false,
      email: false,
      mobile: false,
      gender: false,
    },
    amount: "",
    userId: currentUser.userId,
    status: "Pending",
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getPackageData/${currentUser?.package_Id}`
        );
        if (response.data?.data?.length > 0) {
          const packageData = response.data.data[0];
          console.log(packageData);
          console.log(packageData.offline_E_PAN_Card_Price);
          console.log(packageData.offline_P_PAN_Card_Price);
          setPrices({
            electronicPrice: packageData.offline_E_PAN_Card_Price,
            physicalPrice: packageData.offline_P_PAN_Card_Price,
          });
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchPrices();
  }, []);



  const [files, setFiles] = useState({
    documentUpload: null,
    attachment_form: null,
    attachment_photo: null,
    attachment_signature: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    const maxFiles = 6;

    if (files.length > maxFiles) {
      Swal.fire({
        icon: "error",
        title: "Limit Exceeded",
        text: `You can upload a maximum of ${maxFiles} files.`,
      });
      e.target.value = ""; // Reset the input field
      return;
    }

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: `Invalid file: ${file.name}. Only JPEG, JPG, PNG, and PDF are allowed.`,
        });
        e.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: `File ${file.name} exceeds the 5MB limit.`,
        });
        e.target.value = "";
        return;
      }
    }

    if (files.length > 0) {
      if (files.length > 6) {
        alert("You can upload a maximum of 6 files.");
        e.target.value = ""; // Reset the input field
        return;
      }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pantype") {
      const updatedAmount =
        value === "Electronic"
          ? prices.electronicPrice
          : value === "Physical"
            ? prices.physicalPrice
            : "";
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        amount: updatedAmount,
      }));
    }
    else if (name === "mobile_no" || name === "pin_code" || name === "aadhar_details") {

      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      Change_Request: {
        ...prevData.Change_Request,
        [name]: checked,
      },
    }));
  };



  const clearFileInput = () => {
    if (documentUploadRef.current) {
      documentUploadRef.current.value = null;
    }
    if (attachment_formRef.current) {
      attachment_formRef.current.value = null;
    }
    if (attachment_photoRef.current) {
      attachment_photoRef.current.value = null;
    }
    if (attachment_signatureRef.current) {
      attachment_signatureRef.current.value = null;
    }


  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const filteredChangeRequest = Object.entries(
      formData.Change_Request
    ).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value; // Include only if the value is true
      }
      return acc;
    }, {});

    if (formData.application_type == "Correction") {
      if (Object.keys(filteredChangeRequest).length === 0) {
        alert("Please select at least one change request");
        return;
      }
    }

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      // form.append(key, formData[key]);
      if (key === "Change_Request") {
        form.append(key, JSON.stringify(filteredChangeRequest));
      } else {
        form.append(key, formData[key]);
      }
    });

    if (Array.isArray(files.documentUpload)) {
      files.documentUpload.forEach((file) => {
        form.append("documentUpload", file);
      });
    }else{
      form.append("documentUpload", files.documentUpload);
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
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/pan-4.0",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/pan-4.0-form",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // alert("Form submitted successfully");
      setIsLoading(false);
       if(response.data.status == "Success"){
              Swal.fire({
                title: "Form Submitted Successfully",
                text: response?.data?.message,
                icon: "success",
              });
      
      clearFileInput();
      // Reset form data and file inputs after successful submission
      setFormData({
        application_type: "",
        applicant_type: "",
        select_title: "",
        name: "",
        father_name: "",
        mother_name: "",
        dob: "",
        gender: "",
        pantype: "",
        office_address: "",
        aadhar_details: "",
        Address_Communication_OfficeResident: "",
        alternative_communication_Address: "",
        mobile_no: "",
        email_id: "",
        pin_code: "",
        state: "",
        Change_Request: {
          name: false,
          father_Name: false,
          dob: false,
          mother_Name: false,
          email: false,
          mobile: false,
          gender: false,
        },
        amount: "",
        userId: currentUser.userId,
        status: "Pending",
      });
      // setFiles({
      //   documentUpload: null,
      //   attachment_form: null,
      //   attachment_photo: null,
      //   attachment_signature: null,
      // });

      // // Reset file input fields manually
      // document.getElementById("documentUpload").value = "";
      // document.getElementById("attachment_form").value = "";
      // document.getElementById("attachment_photo").value = "";
      // document.getElementById("attachment_signature").value = "";
    }
     else{
            Swal.fire({
              title: "Error",
              text: response?.data?.message || "Something went wrong!",
              icon: "error",
            });
          }
    } catch (error) {
      console.error("Error submitting form:", error);
       Swal.fire({
              title: "Error",
              text: error?.response?.data?.message || "Something went wrong!",
              icon: "error",
            });
    } finally {
      setIsLoading(false);
      setPin(["", "", "", ""]);
      pinRefs.current[0]?.focus();
    }
  };

  // Pin Verification Logic **

  const handlePinChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to next input if current is filled, move to previous if deleted
      if (value !== "" && index < pin.length - 1) {
        pinRefs.current[index + 1].focus();
      } else if (value === "" && index > 0) {
        pinRefs.current[index - 1].focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (pin[index] === "" && index > 0) {
      pinRefs.current[index - 1].focus();
    }
  };

  const verifyPin = async () => {
    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verify-pin`,
        { user_id: currentUser.userId || "", pin: pin.join("") }
      );

      if (response.data.success) {
        return true;
      } else {
        Swal.fire({
          title: "Error verifying PIN",
          text: response?.data?.message || "Something went wrong! Please Try again",
          icon: "error",
        });
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      Swal.fire({
        title: "Error verifying PIN",
        text: error?.response?.data?.message || "Something went wrong! Please Try again",
        icon: "error",
      });
      return false;
    }
  };

  const handleModalSubmit = async (e) => {
    setIsVerifying(true); // Start loading
    const isPinValid = await verifyPin();
    setIsVerifying(false); // Stop loading
    if (isPinValid) {
      setShowPinModal(false);
      setPin(["", "", "", ""]);
      handleSubmit(e);
    } else {
      setPin(["", "", "", ""]); // Clear the PIN fields on incorrect entry
    }
  };

  const openPinModal = (e) => {
    e.preventDefault();
    setShowPinModal(true);
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
                  <form onSubmit={openPinModal}>
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
                          required
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option value="New">New</option>

                          <option value="Correction">Correction</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="applicant_type">
                          Application Type
                        </label>
                        <select
                          className="form-control"
                          id="applicant_type"
                          name="applicant_type"
                          value={formData.applicant_type}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option value="Minor">Minor</option>
                          <option value="Major">Major</option>

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
                          required
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
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
                          required
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
                          required
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
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" className="form-control" id="dob"
                          name="dob"
                          onChange={handleChange}
                          required
                          value={formData.dob}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="gender">Gender</label>
                        <select
                          className="form-control"
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
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
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="aadhaarDetails">
                          Aadhar Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="aadhaarDetails"
                          placeholder="Enter Aadhar Number"
                          name="aadhar_details"
                          value={formData.aadhar_details}
                          onChange={handleChange}
                          minLength={12}
                          maxLength={12}
                          required
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
                          required
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
                          maxLength={10}
                          minLength={10}
                          required
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
                          required
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
                          maxLength={6}
                          minLength={6}
                          required
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
                          required
                        />
                      </div>
                    </div>

                    {/* <div className="row">
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
                    </div> */}

                    <div className="row">
                      <div className="col-md-8 mb-3">
                        <label>Change Request Fields</label>
                        <div className="d-flex flex-wrap">
                          {Object.keys(formData.Change_Request).map((field) => (
                            <div
                              key={field}
                              className="form-check form-check-inline"
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={field}
                                name={field}
                                checked={formData.Change_Request[field]}
                                onChange={handleCheckboxChange}
                                style={
                                  field === "name" ? { fontWeight: "bold" } : {}
                                }
                                // required={formData.application_type == "Correction"}
                                disabled={formData.application_type == "New"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={field}
                              >
                                {field.replace(/_/g, " ").toUpperCase()}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label htmlFor="changeRequest">PAN Card Type E/P</label>
                        <select
                          className="form-control"
                          id="changeRequest"
                          name="pantype"
                          value={formData.pantype}
                          onChange={handleChange}
                          required
                        >
                          <option selected value="">SELECT</option>
                          <option value="Electronic">Electronic</option>
                          <option value="Physical">Physical</option>
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
                          required
                          accept=".jpeg, .jpg, .png, .pdf" // Restricts file types
                          ref={documentUploadRef}
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
                          required
                          accept=".jpeg, .jpg, .png, .pdf" // Restricts file types
                          ref={attachment_formRef}
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
                          required
                          accept=".jpeg, .jpg, .png, .pdf" // Restricts file types
                          ref={attachment_photoRef}
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
                          required
                          accept=".jpeg, .jpg, .png, .pdf" // Restricts file types
                          ref={attachment_signatureRef}
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
                          placeholder="Charge Amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          required
                          disabled
                        />
                      </div>

                    </div>
                    <div className="text-center my-3">
                      <button type="submit" className="btn btn-primary  mb-4" disabled={isLoading}>
                        {isLoading ? "Submit..." : "Submit"}
                      </button>
                    </div>

                    {/* <div className="row mt-2">
                      <div className="col-md-12 text-center">
                        <button type="button" className="btn btn-link">
                          Popup - Terms & Conditions
                        </button>
                      </div>
                    </div> */}
                  </form>
                  <Modal
                    show={showPinModal}
                    onHide={() => setShowPinModal(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Enter 4-Digit PIN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="pin-inputs d-flex justify-content-center">
                        {pin.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => (pinRefs.current[index] = el)}
                            type="text"
                            value={digit ? "●" : ""} // Show a dot if digit is entered, otherwise empty
                            maxLength="1"
                            onChange={(e) =>
                              handlePinChange(index, e.target.value)
                            }
                            onKeyDown={(e) =>
                              e.key === "Backspace" && handleBackspace(index)
                            }
                            className="pin-digit form-control mx-1"
                            style={{
                              width: "50px",
                              textAlign: "center",
                              fontSize: "1.5rem",
                              borderRadius: "8px",
                              border: "1px solid #ced4da",
                              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        ))}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowPinModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleModalSubmit}
                        disabled={isVerifying}
                      >
                        {isVerifying ? "Verifying..." : "Verify PIN"}
                        {isVerifying && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
