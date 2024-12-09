import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toggleRefresh } from "../../redux/user/userSlice";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const EdistrictForm = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
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
    // charge_amount: "",
    amount: "",
    userId: currentUser.userId,
    status: "Pending",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7777/api/auth/retailer/getPackageData/${currentUser?.package_Id}`
        );
        // console.log(response.data.data);
        if (Array.isArray(response.data.data)) {
          setPrices(response.data.data);
        } else {
          console.error("Expected an array, received:", response.data.data);
        }
      } catch (error) {
        console.error("Fetching package data failed:", error);
      }
    };
    fetchPackage();
  }, []);

  // console.log(prices[0]?.offline_kyc_eDistrict);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };

      if (name === "application_type" || name === "samagar") {
        let priceKey = "";
        if (newFormData.application_type === "income") {
          if (newFormData.samagar === "ekyc") {
            priceKey = "eKYC_Income_Certificate_Price";
          } else if (newFormData.samagar === "non-ekyc") {
            priceKey = "offlineKYC_Income_Certificate_Price";
          } else if (newFormData.samagar === "non") {
            priceKey = "non_samagra_income_Certificate_Price";
          }
        } else if (newFormData.application_type === "domicile") {
          if (newFormData.samagar === "ekyc") {
            priceKey = "eKYC_Domicile_Certificate_Price";
          } else if (newFormData.samagar === "non-ekyc") {
            priceKey = "offlineKYC_Domicile_Certificate_Price";
          } else if (newFormData.samagar === "non") {
            priceKey = "non_samagra_Domicile_Certificate_Price";
          }
        }
        // Set the price if priceKey has been determined and is available in prices array
        if (priceKey && prices.length > 0 && prices[0][priceKey]) {
          newFormData.amount = prices[0][priceKey];
        } else {
          newFormData.amount = "";
        }
      }

      return newFormData;
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

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
      const resData = response.data.message;
      Swal.fire({
        title: "Form Sumitted Success",
        text: `${resData}`,
        icon: "success",
      });
      setFormData({
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
        amount: "",
        userId: "",
        status: "",
      });
    } catch (error) {
      setMessage("Error submitting form");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin Verification Logic **

  const handlePinChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

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
        `http://localhost:7777/api/auth/log-reg/verify-pin`,
        { user_id: currentUser.userId || "", pin: pin.join("") }
      );

      if (response.data.success) {
        return true;
      } else {
        alert(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      alert("Error verifying PIN");
      return false;
    }
  };

  const handleModalSubmit = async (e) => {
    const isPinValid = await verifyPin();
    if (isPinValid) {
      setShowPinModal(false);
      handleSubmit(e);
    } else {
      setPin(["", "", "", ""]);
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
              <div className="container mt-4">
                <div className="col-12 d-flex justify-content-center">
                  <div className="border border-danger rounded shadow-sm mb-3">
                    <h2 className="text-center m-0 px-5 py-3">E District</h2>
                  </div>
                </div>
                <form onSubmit={openPinModal}>
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
                        {prices[0]?.offline_kyc_eDistrict === "Yes" ? (
                          <option value="non-ekyc">Non Ekyc</option>
                        ) : (
                          ""
                        )}
                        {prices[0]?.offline_kyc_eDistrict === "Yes" ? (
                          <option value="non">Non</option>
                        ) : (
                          ""
                        )}
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
                    <div className="col-md-4 mb-3">
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
                    <div className="col-md-4 mb-3">
                      <label>Annual Income</label>
                      <input
                        type="number"
                        className="form-control"
                        name="annual_income"
                        value={formData.annual_income}
                        onChange={handleChange}
                        required
                        disabled={formData.application_type === "domicile"}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="amount">Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={formData.amount || ""}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* <div className="row mb-3">
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
                  </div> */}

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
                    <Button variant="primary" onClick={handleModalSubmit}>
                      Verify PIN
                    </Button>
                  </Modal.Footer>
                </Modal>
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
