import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { IoMail, IoPerson } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdAlternateEmail } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { FaIndianRupeeSign } from "react-icons/fa6";

const PanForm = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [fileError, setFileError] = useState("");
  const [selectOption, setSelectOption] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const [prices, setPrices] = useState();
  const [selectedPrice, setSelectedPrice] = useState("");
  const [eStampAmount, setEStampAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [formData, setFormData] = useState({
    applicant_name: "",
    applicant_father: "",
    applicant_number: "",
    email: "",
    applicant_select_service: "",
    other: "",
    attached_form: null,
    attached_photo: null,
    attached_sign: null,
    attached_kyc: [],
    userId: currentUser?.userId,
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7777/api/auth/retailer/getPackageData/${currentUser?.package_Id}`
        );
        // console.log(data.data);
        setPrices(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPackage();
  }, []);

  // console.log(prices?.E_Stamp_Price);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // setFormData({ ...formData, [name]: value });
  //   let newFormData = { ...formData, [name]: value };

  //   if (name === "eStampAmount") {
  //     // setEStampAmount(value);
  //     const total = parseInt(value, 10) + (parseInt(selectedPrice, 10) || 0);
  //     // setTotalAmount(total.toString());
  //     newFormData = {
  //       ...newFormData,
  //       eStampAmount: value,
  //       amount: total.toString(),
  //     };
  //   }
  //   setFormData(newFormData);
  // };
  console.log("Break comments");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   let updatedValue = value;

  //   // If updating eStampAmount, calculate the total amount dynamically
  //   if (name === "eStampAmount") {
  //     const total = parseInt(value, 10) + (parseInt(selectedPrice, 10) || 0);
  //     updatedValue = {
  //       ...formData,
  //       eStampAmount: value,
  //       amount: total.toString(), // Ensure this is what the backend expects
  //     };
  //   } else {
  //     updatedValue = { ...formData, [name]: value };
  //   }

  //   setFormData(updatedValue);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Use a function within setFormData to ensure access to the most current state
    setFormData((prevFormData) => {
      // Handle eStampAmount updates with special logic
      if (name === "eStampAmount") {
        const parsedValue = parseInt(value, 10); // Parse the input value
        const parsedSelectedPrice = parseInt(selectedPrice, 10) || 0; // Safely parse the selected price or default to 0

        const total = isNaN(parsedValue)
          ? ""
          : (parsedValue + parsedSelectedPrice).toString();

        return {
          ...prevFormData,
          eStampAmount: value, // Update eStampAmount directly from the input
          amount: total, // Update amount based on calculation
        };
      } else {
        // For all other inputs, update normally
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  // useEffect(() => {
  //   if (selectOption && selectedPrice) {
  //     const total =
  //       parseInt(eStampAmount, 10) + (parseInt(selectedPrice, 10) || 0);
  //     setTotalAmount(total.toString());
  //   } else {
  //     setTotalAmount(selectedPrice || "");
  //   }
  // }, [selectedPrice, eStampAmount, selectOption]);

  useEffect(() => {
    if (selectOption && selectedPrice) {
      const total =
        parseInt(eStampAmount, 10) + (parseInt(selectedPrice, 10) || 0);
      const totalAsString = total.toString();
      setTotalAmount(totalAsString);
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: totalAsString, // Ensuring amount is always updated
      }));
    } else {
      const fallbackValue = selectedPrice || "0";
      setTotalAmount(fallbackValue);
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: fallbackValue,
      }));
    }
  }, [selectedPrice, eStampAmount, selectOption]);

  // useEffect(() => {
  //   if (selectOption && selectedPrice) {
  //     const total =
  //       parseInt(eStampAmount, 10) + (parseInt(selectedPrice, 10) || 0);
  //     const totalAsString = total.toString();
  //     setTotalAmount(totalAsString);

  //     // Update formData.amount directly
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       amount: totalAsString, // This keeps formData.amount in sync with totalAmount
  //     }));
  //   } else {
  //     const fallbackValue = selectedPrice || "";
  //     setTotalAmount(fallbackValue);

  //     // Update formData.amount if there's a fallback value
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       amount: fallbackValue,
  //     }));
  //   }
  // }, [selectedPrice, eStampAmount, selectOption]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "attached_kyc") {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSelect = (e) => {
    // const selectItem = e.target.value;
    // setSelectOption(selectItem === "E-Stamp");
    const serviceName = e.target.value;
    const priceKeyMapping = {
      "Birth Certificate": "Birth_Certificate_Price",
      "Death Certificate": "Death_Certificate_Price",
      "Pan Find": "Pan_Find_Price", // Assuming a key if it exists
      "E-Stamp": "E_Stamp_Price",
      "ITR Registration": "ITR_Registration_Price",
      "GST Registration": "GST_Registration_Price",
      "Udyog Aadhar": "Udyog_Aadhar_Price",
      Sambal: "Sambal_Price",
    };

    const priceKey = priceKeyMapping[serviceName];
    const price = prices && prices.length > 0 ? prices[0][priceKey] : undefined;
    // const price = prices[serviceName];
    setSelectedPrice(price || "Price not available");
    setSelectOption(serviceName === "E-Stamp");
    setFormData({ ...formData, applicant_select_service: serviceName });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.applicant_name) errors.applicant_name = "Name is required";
    if (!formData.applicant_father)
      errors.applicant_father = "Father's name is required";
    if (!formData.applicant_number)
      errors.applicant_number = "Number is required";
    if (!formData.applicant_select_service)
      errors.applicant_select_service = "Service selection is required";
    if (!formData.amount || formData.amount === "0")
      errors.amount = "Amount is required and cannot be zero";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with amount:", formData);

    setFormData((prevFormData) => ({
      ...prevFormData,
      amount: totalAmount,
    }));

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setFileError("Please fill all required fields.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("applicant_name", formData.applicant_name);
    formDataObj.append("applicant_father", formData.applicant_father);
    formDataObj.append("applicant_number", formData.applicant_number);
    formDataObj.append("email", formData.email);
    formDataObj.append(
      "applicant_select_service",
      formData.applicant_select_service
    );
    formDataObj.append("other", formData.other);
    formDataObj.append("eStampAmount", formData.eStampAmount);
    formDataObj.append("amount", formData.amount);
    if (formData.attached_form)
      formDataObj.append("attached_form", formData.attached_form);
    if (formData.attached_photo)
      formDataObj.append("attached_photo", formData.attached_photo);
    if (formData.attached_sign)
      formDataObj.append("attached_sign", formData.attached_sign);
    formData.attached_kyc.forEach((file) => {
      formDataObj.append("attached_kyc", file);
    });
    formDataObj.append("userId", formData.userId);

    try {
      const response = await axios.post(
        `http://localhost:7777/api/auth/retailer/applyOfflineForm`,
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // alert(response.data.message);
      console.log(response.data.message);

      setFormData({
        applicant_name: "",
        applicant_father: "",
        applicant_number: "",
        email: "",
        applicant_select_service: "",
        other: "",
        eStampAmount: "",
        totalAmount: "",
        attached_form: null,
        attached_photo: null,
        attached_sign: null,
        attached_kyc: [],
      });
    } catch (error) {
      // alert("An error occurred. Please try again.");
      console.log(error);
    }
  };

  const optionsDrop = [
    { id: 1, name: "Birth Certificate" },
    { id: 2, name: "Death Certificate" },
    { id: 3, name: "Pan Find" },
    { id: 4, name: "E-Stamp" },
    { id: 5, name: "ITR Registration" },
    { id: 6, name: "GST Registration" },
    { id: 7, name: "Udyog Aadhar" },
    { id: 8, name: "Sambal" },
  ];

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
              <div className="main shadow-none">
                <div className="row shadow-none">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="col-12 d-flex justify-content-center">
                      <div className="border border-danger rounded shadow-sm mb-3">
                        <h2 className="text-center m-0 px-5 py-3">
                          Other Services
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={openPinModal}>
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
                            placeholder="Username"
                            name="applicant_name"
                            value={formData.applicant_name}
                            onChange={handleChange}
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
                          <SlPeople />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup2"
                            placeholder="Username"
                            name="applicant_father"
                            value={formData.applicant_father}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup2">
                            Applicant Father Name
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
                            placeholder="Username"
                            name="applicant_number"
                            value={formData.applicant_number}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup3">
                            Mobile Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <MdAlternateEmail />
                        </span>
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="floatingInputGroup3"
                            placeholder="UserEmail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup3">
                            User Email
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <RiMarkPenLine />
                        </span>
                        <div className="form-floating">
                          <select
                            className="form-select custom-dropdown"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                            name="applicant_select_service"
                            value={formData.applicant_select_service}
                            onChange={(e) => {
                              handleChange(e);
                              handleSelect(e);
                            }}
                          >
                            <option value="">Select an option ....</option>
                            {optionsDrop.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="floatingSelect">Choose Option</label>
                        </div>
                      </div>
                    </div>
                    {/* {formData.applicant_select_service && (
                      <div className="alert alert-info mt-2">
                        Price for selected service: {selectedPrice}
                      </div>
                    )} */}
                    {selectOption && (
                      <>
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
                                name="eStampAmount"
                                value={eStampAmount}
                                onChange={handleChange}
                              />
                              <label htmlFor="eStampAmountInput">
                                E-Stamp Amount
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaIndianRupeeSign />
                        </span>
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            id="floatingInputGroup3"
                            placeholder="Total Amount"
                            name="amount"
                            value={totalAmount || selectedPrice || ""}
                            onChange={handleChange}
                            readOnly
                          />
                          <label htmlFor="floatingInputGroup3">Amount</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg1" className="form-label">
                          Attachment Form (PDF only)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg1"
                          type="file"
                          name="attached_form"
                          accept="application/pdf"
                          onChange={handleFileChange}
                        />
                        {fileError && (
                          <p className="text-danger fs-6">{fileError}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg2" className="form-label">
                          Attachment Photo (JPG, JPEG, PNG)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg2"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          name="attached_photo"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg3" className="form-label">
                          Attachment Signature (JPG, JPEG, PNG)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg3"
                          type="file"
                          name="attached_sign"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg4" className="form-label">
                          Attachment KYC (JPG, JPEG, PNG)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg4"
                          type="file"
                          name="attached_kyc"
                          multiple
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start mb-3">
                        <button className="btn p-2" type="submit">
                          Submit
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

export default PanForm;

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
  /* <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="px-lg-3">Apply Offline</h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; Apply Offline
                      </h6>
                    </div> */
}
