import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { IoMail, IoPerson } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleRefresh } from "../../redux/user/userSlice";
import Swal from "sweetalert2";

const NewBankID = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [optionPrices, setOptionPrices] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(null);
  // console.log(selectedPrice);
  const [isVerifying, setIsVerifying] = useState(false);

  const optionsDrop = [
    { id: 1, name: "Airtel" },
    { id: 2, name: "Anypay" },
    { id: 3, name: "Ezeepay" },
    { id: 4, name: "Fino" },
    { id: 5, name: "IRCTC" },
    { id: 6, name: "NSDL" },
    { id: 7, name: "PayNearBy" },
    { id: 8, name: "Payworld" },
    { id: 9, name: "Religare Digipay" },
    { id: 10, name: "Roinet" },
    { id: 11, name: "Spice Money" },
    { id: 12, name: "Ayushman ID" },
  ];

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getPackageData/${currentUser?.package_Id}`
        );

        const priceData = response.data.data[0];
        console.log("Price Data:", priceData);

        const priceMap = {
          Airtel: priceData?.Airtel_BankId_Price || "N/A",
          Anypay: priceData?.Anypay_BankId_Price || "N/A",
          Ezeepay: priceData?.Ezeepay_BankId_Price || "N/A",
          Fino: priceData?.Fino_BankId_Price || "N/A",
          IRCTC: priceData?.IRCTC_Agent_ID_Price || "N/A",
          NSDL: priceData?.Nsdl_BankId_Price || "N/A",
          PayNearBy: priceData?.PayNearBy_BankId_Price || "N/A",
          Payworld: priceData?.payworld_BankId_Price || "N/A",
          "Religare Digipay": priceData?.ReligareDigipay_BankId_Price || "N/A",
          Roinet: priceData?.Roinet_BankId_Price || "N/A",
          "Spice Money": priceData?.SpiceMoney_BankId_Price || "N/A",
          "Ayushman ID": priceData?.Ayushman_Id_Price || "N/A",
        };

        console.log("Mapped Price Data:", priceMap);
        setOptionPrices(priceMap);
      } catch (error) {
        console.error("Fetching package data failed:", error);
      }
    };

    fetchPackage();
  }, []);

  const [formData, setFormData] = useState({
    applicant_name: currentUser.username,
    applicant_father: "",
    applicant_mother: "",
    applicant_number: currentUser.ContactNo,
    email: currentUser.email,
    applicant_select_service: "New Bank ID",
    select_bank_service: "",
    aadhar_card: currentUser.AadharNumber,
    pan_card: currentUser.PanCardNumber,
    business_name: currentUser.BusinessName,
    status: "Pending",
    amount: "",
    userId: currentUser.userId,
  });

  const [files, setFiles] = useState({
    attached_photo: null,
    attached_kyc: [],
    bank_passbook: null,
    shop_photo: null,
    electric_bill: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  // const [pin, setPin] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const pinRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    console.log("Selected Option:", selectedOption);
    console.log("Option Prices:", optionPrices);
    console.log("Price for Selected Option:", optionPrices[selectedOption]);
    // setSelectedPrice(optionPrices[selectedOption] || null);
    setSelectedPrice(optionPrices[selectedOption] || "Price not available");

    handleInputChange(e);
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === "attached_kyc") {
      setFiles({ ...files, [name]: [...selectedFiles] });
    } else {
      setFiles({ ...files, [name]: selectedFiles[0] });
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const submitForm = new FormData();

    // Append form text data
    Object.entries(formData).forEach(([key, value]) => {
      submitForm.append(key, value);
    });

    // Append files
    submitForm.append("attached_photo", files.attached_photo);
    submitForm.append("bank_passbook", files.bank_passbook);
    submitForm.append("shop_photo", files.shop_photo);
    submitForm.append("electric_bill", files.electric_bill);
    files.attached_kyc.forEach((file) => {
      submitForm.append("attached_kyc", file);
    });

    try {
      const response = await axios.post(
        // "http://localhost:7777/api/auth/retailer/bankidForm",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/bankidForm",
        submitForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // alert(response.data.message);
      Swal.fire({
        title: "Form Submitted Successfully",
        text: response.data.message,
        icon: "success",
      });
      dispatch(toggleRefresh());
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Error submitting form");
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setIsLoading(false);

      setFormData({
        // applicant_name: "",
        applicant_father: "",
        applicant_mother: "",
        // applicant_number: "",
        // email: "",
        applicant_select_service: "",
        select_bank_service: "",
        // aadhar_card: "",
        // pan_card: "",
        // business_name: "",
      });
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
    setIsVerifying(true);
    const isPinValid = await verifyPin();
    setIsVerifying(false);
    if (isPinValid) {
      setShowPinModal(false);
      handleSubmit(e);
    } else {
      setPin(["", "", "", ""]); // Clear the PIN fields on incorrect entry
    }
  };

  const openPinModal = (e) => {
    e.preventDefault();
    setShowPinModal(true);
  };

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getSelectedServices/${currentUser.userId}`
        );
        console.log(response.data);
        setSelectedOptions(response.data.selectedServices);
      } catch (error) {
        console.log(error);
      }
    };
    getServices();
  }, [currentUser.userId]);

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
                      <h4 className="px-lg-3">New Bank ID</h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; New Bank ID
                      </h6>
                    </div>
                  </div>
                </div>

                {/* <form onSubmit={handleSubmit} encType="multipart/form-data"> */}
                <form onSubmit={openPinModal} encType="multipart/form-data">
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <IoPerson />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup1"
                            name="applicant_name"
                            value={formData.applicant_name}
                            onChange={handleInputChange}
                            readOnly
                          />
                          <label htmlFor="floatingInputGroup1">
                            Applicant Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <IoMail />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup2"
                            name="applicant_father"
                            value={formData.applicant_father}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInputGroup2">
                            Applicant Father Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <IoMail />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup2"
                            name="applicant_mother"
                            value={formData.applicant_mother}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInputGroup2">
                            Applicant Mother Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup3"
                            name="applicant_number"
                            value={formData.applicant_number}
                            onChange={handleInputChange}
                            readOnly
                          />
                          <label htmlFor="floatingInputGroup3">
                            Applicant Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="floatingInputGroup3"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            readOnly
                          />
                          <label htmlFor="floatingInputGroup3">Email ID</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <RiMarkPenLine />
                        </span>
                        <div className="form-floating">
                          <select
                            className="form-select custom-dropdown"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                            name="select_bank_service"
                            value={formData.select_bank_service}
                            // onChange={handleInputChange}
                            onChange={handleDropdownChange}
                          >
                            <option value="">Select an option ....</option>
                            {optionsDrop.map((item) => {
                              const selectedServices = selectedOptions.find(
                                (option) => option.service === item.name
                              );
                              const isDisabled =
                                selectedServices &&
                                selectedServices.status !== "Reject";
                              return (
                                <option
                                  key={item.id}
                                  value={item.name}
                                  disabled={isDisabled}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                            {/* {optionsDrop.map((item) => (
                              <option
                                key={item.id}
                                value={item.name}
                                disabled={selectedOptions?.includes(item?.name)}
                              >
                                {item.name}
                              </option>
                            ))} */}
                          </select>
                          <label htmlFor="floatingSelect">Select Bank</label>
                        </div>
                      </div>
                      {/* {selectedPrice !== null && (
                        <div className="mt-2">
                          <strong>Price:</strong> ₹{selectedPrice}
                        </div>
                      )} */}
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup3"
                            name="amount"
                            value={selectedPrice}
                            onChange={handleInputChange}
                            readOnly
                          />
                          <label htmlFor="floatingInputGroup3">Amount</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            name="aadhar_card"
                            className="form-control"
                            id="floatingInputGroup3"
                            value={formData.aadhar_card}
                            onChange={handleInputChange}
                            readOnly
                          />
                          <label htmlFor="floatingInputGroup3">
                            Aadhar Card Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup3"
                            name="pan_card"
                            value={formData.pan_card}
                            onChange={handleInputChange}
                            readOnly
                          />
                          <label htmlFor="floatingInputGroup3">
                            Pan Card Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup3"
                            name="business_name"
                            value={formData.business_name}
                            onChange={handleInputChange}
                            readOnly
                          />
                          <label htmlFor="floatingInputGroup3">
                            Business Name
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg1" className="form-label">
                          Attached Photo
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="formFileLg1"
                          name="attached_photo"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg1" className="form-label">
                          Attached KYC (Multiple Files)
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="formFileLg1"
                          name="attached_kyc"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg1" className="form-label">
                          Bank Passbook
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="formFileLg1"
                          name="bank_passbook"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg1" className="form-label">
                          Shop Photo
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="formFileLg1"
                          name="shop_photo"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg1" className="form-label">
                          Electric Bill
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="formFileLg1"
                          name="electric_bill"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start mb-3">
                        <button
                          className="btn p-2"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Submit...." : "Submit"}
                        </button>
                      </div>
                    </div>
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
    </Wrapper>
  );
};

export default NewBankID;

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

{
  /* {selectOption && (
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaMobileAlt />
                          </span>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInputGroup4"
                              placeholder="Username"
                              name="other"
                              value={formData.other}
                              onChange={handleChange}
                            />
                            <label htmlFor="floatingInputGroup4">
                              E-Stamp Type
                            </label>
                          </div>
                        </div>
                      </div>
                    )} */
}

{
  /* <Modal
                  show={showPinModal}
                  onHide={() => setShowPinModal(false)}
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
                          value={digit}
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
                </Modal> */
}

// const [fileError, setFileError] = useState("");
// const [selectOption, setSelectOption] = useState(false);
// const [formData, setFormData] = useState({
//   applicant_name: "",
//   applicant_father: "",
//   applicant_mother: "",
//   applicant_number: "",
//   email: "",
//   applicant_select_service: "",
//   aadhar_card: "",
//   pan_card: "",
//   business_name: "",
//   attached_photo: null,
//   attached_kyc: [],
//   bank_passbook: null,
//   shop_photo: null,
//   electric_bill: null,
// });

// const optionsDrop = [
//   { id: 1, name: "New Bank ID" },
// { id: 1, name: "Pan Card Form" },
// { id: 2, name: "Income" },
// { id: 3, name: "Domicile" },
// { id: 4, name: "Birth Certificate" },
// { id: 5, name: "Death Certificate" },
// { id: 6, name: "Pan Find" },
// { id: 7, name: "E-Stamp" },
// { id: 8, name: "ITR Registration" },
// { id: 9, name: "GST Registration" },
// { id: 10, name: "Udyog Aadhar" },
// { id: 11, name: "Pan Card Services" },
// ];

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };

// const handleFileChange = (e) => {
//   const { name, files } = e.target;
//   if (name === "attached_kyc") {
//     setFormData({ ...formData, [name]: Array.from(files) });
//     console.log([...formDataObj.entries()]);

//   } else {
//     setFormData({ ...formData, [name]: files[0] });
//   }
// };

// // const handleSelect = (e) => {
// //   const selectItem = e.target.value;
// //   setSelectOption(selectItem === "E-Stamp");
// // };

// const validateForm = () => {
//   const errors = {};
//   if (!formData.applicant_name) errors.applicant_name = "Name is required";
//   if (!formData.applicant_father)
//     errors.applicant_father = "Father's name is required";
//   if (!formData.applicant_mother)
//     errors.applicant_mother = "Mother's name is required";
//   if (!formData.applicant_number)
//     errors.applicant_number = "Number is required";
//   if (!formData.email) errors.email = "Email ID is required";
//   if (!formData.applicant_select_service)
//     errors.applicant_select_service = "Service selection is required";
//   if (!formData.aadhar_card) errors.aadhar_card = "Aadhar Card is required";
//   if (!formData.pan_card) errors.pan_card = "Pan Card is required";
//   if (!formData.business_name)
//     errors.business_name = "Business / Shop name is required";
//   return errors;
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const formErrors = validateForm();
//   if (Object.keys(formErrors).length > 0) {
//     setFileError("Please fill all required fields.");
//     return;
//   }

//   const formDataObj = new FormData();
//   formDataObj.append("applicant_name", formData.applicant_name);
//   formDataObj.append("applicant_father", formData.applicant_father);
//   formDataObj.append("applicant_mother", formData.applicant_mother);
//   formDataObj.append("applicant_number", formData.applicant_number);
//   formDataObj.append("email", formData.email);
//   formDataObj.append(
//     "applicant_select_service",
//     formData.applicant_select_service
//   );
//   formDataObj.append("aadhar_card", formData.aadhar_card);
//   formDataObj.append("pan_card", formData.pan_card);
//   formDataObj.append("business_name", formData.business_name);
//   if (formData.attached_photo)
//     formDataObj.append("attached_photo", formData.attached_photo);
//   formData.attached_kyc.forEach((file) => {
//     formDataObj.append("attached_kyc", file);
//   });
//   if (formData.bank_passbook)
//     formDataObj.append("bank_passbook", formData.bank_passbook);
//   if (formData.bank_passbook)
//     formDataObj.append("shop_photo", formData.shop_photo);
//   if (formData.electric_bill)
//     formDataObj.append("electric_bill", formData.electric_bill);
//   try {
//     const response = await axios.post(
//       // `http://localhost:7777/api/auth/retailer/bankidForm`,
//       `http://bitspan.jyvflirl.a2hosted.com/api/auth/bankidForm`,
//       formDataObj,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     alert(response.data.message);
//   } catch (error) {
//     alert("An error occurred. Please try again.");
//   }
// };

// const handleModalSubmit = async (e) => {
//   const isPinValid = await verifyPin();
//   if (isPinValid) {
//     setShowPinModal(false);
//     handleSubmit(e);
//   } else {
//     setPin("");
//   }
// };

// setFiles({
//   attached_photo: null,
//   attached_kyc: [],
//   bank_passbook: null,
//   shop_photo: null,
//   electric_bill: null,
// });
// setPin(["", "", "", ""]);

// attachedPhotoRef.current.value = "";
// bankPassbookRef.current.value = "";
// shopPhotoRef.current.value = "";
// electricBillRef.current.value = "";
