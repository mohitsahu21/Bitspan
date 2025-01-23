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

const BankIdEditModel = ({ item, setShowMarkEditModel, setIsRefresh }) => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [optionPrices, setOptionPrices] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(null);
  // console.log(selectedPrice);
  const [isVerifying, setIsVerifying] = useState(false);
  console.log(selectedPrice);

  const attached_photo_ref = useRef(null);
  const attached_Kyc_ref = useRef(null);
  const bank_passbook_ref = useRef(null);
  const shop_photo_ref = useRef(null);
  const Electricity_bill_ref = useRef(null);

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
    applicant_father: item.applicant_father,
    applicant_mother: item.applicant_mother,
    applicant_number: currentUser.ContactNo,
    email: currentUser.email,
    applicant_select_service: "New Bank ID",
    select_bank_service: item.select_bank_service,
    aadhar_card: currentUser.AadharNumber,
    pan_card: currentUser.PanCardNumber,
    business_name: currentUser.BusinessName,
    status: "Pending",
    amount: item.amount,
    userId: currentUser.userId,
    id : item.id,
    previous_attached_photo: item.attached_photo,
    previous_attached_kyc: item.attached_kyc,
    previous_bank_passbook: item.bank_passbook,
    previous_shop_photo: item.shop_photo,
    previous_electric_bill: item.electric_bill,

  });

  console.log(formData);
 
  const [files, setFiles] = useState({
    attached_photo: item.attached_photo || null,
    attached_kyc: item.attached_kyc || [],
    bank_passbook: item.bank_passbook || null,
    shop_photo: item.shop_photo || null,
    electric_bill: item.electric_bill || null,
  });
  const [preveiewfiles, preveiewSetFiles] = useState({
    attached_photo: item.attached_photo || null,
    attached_kyc: item.attached_kyc || [],
    bank_passbook: item.bank_passbook || null,
    shop_photo: item.shop_photo || null,
    electric_bill: item.electric_bill || null,
  });
  console.log(files);

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

//   useEffect(() => {
//     setFormData((prevData) => ({
//       ...prevData,
//       amount: selectedPrice,
//     }));
//   }, [selectedPrice]);

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    console.log("Selected Option:", selectedOption);
    console.log("Option Prices:", optionPrices);
    console.log("Price for Selected Option:", optionPrices[selectedOption]);
    // setSelectedPrice(optionPrices[selectedOption] || null);
    setSelectedPrice(optionPrices[selectedOption] || "Price not available");

    handleInputChange(e);

    setFormData((prevData) => ({
      ...prevData,
      select_bank_service: selectedOption,
    }));
  };

  // const handleFileChange = (e) => {

  //   const { name, files: selectedFiles } = e.target;
  //   if (name === "attached_kyc") {
  //     setFiles({ ...files, [name]: [...selectedFiles] });
  //   } else {
  //     setFiles({ ...files, [name]: selectedFiles[0] });
  //   }
  // };

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    // For multiple files (e.g., "attached_kyc")
    if (name === "attached_kyc") {
      const validFiles = [];
      for (const file of selectedFiles) {
        if (file.size > MAX_FILE_SIZE) {
          Swal.fire({
            title: "File Too Large",
            text: `The file "${file.name}" exceeds the 2 MB size limit. Please select smaller files.`,
            icon: "error",
          });
          // Clear the file input
          e.target.value = null;
          return;
        } else {
          validFiles.push(file);
        }
      }

      // Only set files that are within the size limit
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: validFiles,
      }));
    } else {
      // For single file input
      const file = selectedFiles[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          Swal.fire({
            title: "File Too Large",
            text: `The file "${file.name}" exceeds the 2 MB size limit. Please select a smaller file.`,
            icon: "error",
          });

          // Clear the file input
          e.target.value = null;
          return;
        }

        setFiles((prevFiles) => ({
          ...prevFiles,
          [name]: file,
        }));
      }
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

  const clearFileInput = () => {
    if (attached_photo_ref.current) {
      attached_photo_ref.current.value = null;
    }
    if (attached_Kyc_ref.current) {
      attached_Kyc_ref.current.value = null;
    }
    if (bank_passbook_ref.current) {
      bank_passbook_ref.current.value = null;
    }
    if (shop_photo_ref.current) {
      shop_photo_ref.current.value = null;
    }
    if (Electricity_bill_ref.current) {
      Electricity_bill_ref.current.value = null;
    }
  };

  useEffect(() => {
    getServices();
  }, [currentUser.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const submitForm = new FormData();

    // Append form text data
    Object.entries(formData).forEach(([key, value]) => {
      submitForm.append(key, value);
    });



    if(attached_photo_ref.current.value){
        // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
        submitForm.append("attached_photo", files.attached_photo);
    }
    if(bank_passbook_ref.current.value){
        // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
        submitForm.append("bank_passbook", files.bank_passbook);
    }
    if(shop_photo_ref.current.value){
        // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
        submitForm.append("shop_photo", files.shop_photo);
    }
    if(Electricity_bill_ref.current.value){
        // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
        submitForm.append("electric_bill", files.electric_bill);
    }
    if(attached_Kyc_ref.current.value){
        // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
        files.attached_kyc.forEach((file) => {
            submitForm.append("attached_kyc", file);
          });
    }


    // Append files
    // submitForm.append("attached_photo", files.attached_photo);
    // submitForm.append("bank_passbook", files.bank_passbook);
    // submitForm.append("shop_photo", files.shop_photo);
    // submitForm.append("electric_bill", files.electric_bill);
    // files.attached_kyc.forEach((file) => {
    //   submitForm.append("attached_kyc", file);
    // });

    try {
      const response = await axios.put(
        // "http://localhost:7777/api/auth/retailer/update_bankidForm",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/update_bankidForm",
        submitForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // alert(response.data.message);
      if (response.data.status == "Success") {
        Swal.fire({
          title: "Form Submitted Successfully",
          text: response.data.message,
          icon: "success",
        });
        setFormData({
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
          amount: selectedPrice,
          userId: currentUser.userId,
        });
        setFiles({
          attached_photo: null,
          attached_kyc: [],
          bank_passbook: null,
          shop_photo: null,
          electric_bill: null,
        });
        getServices();
        setSelectedPrice(null);
        clearFileInput();
        setShowMarkEditModel(false);
        setIsRefresh((value) => !value);
        // dispatch(toggleRefresh());

      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message || "Something went wrong!",
          icon: "error",
        });
      }
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

      // setFormData({
      //   // applicant_name: "",
      //   applicant_father: "",
      //   applicant_mother: "",
      //   // applicant_number: "",
      //   // email: "",
      //   applicant_select_service: "",
      //   select_bank_service: "",
      //   // aadhar_card: "",
      //   // pan_card: "",
      //   // business_name: "",
      //   userId: currentUser.userId,
      // });

      setPin(["", "", "", ""]);
      pinRefs.current[0]?.focus();
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

  const validateForm = () => {
    const requiredFields = [
      "applicant_name",
      "applicant_father",
      "applicant_mother",
      "applicant_number",
      "email",
      "applicant_select_service",
      "select_bank_service",
      "aadhar_card",
      "pan_card",
      "business_name",
      "amount",
    ];

    // Check if all required fields in formData are filled
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        Swal.fire({
          title: "Validation Error",
          text: `Please fill in the ${field.replace(/_/g, " ")} field.`,
          icon: "error",
        });
        return false;
      }
    }

    // Check if files are uploaded
    if (!files.attached_photo) {
      Swal.fire({
        title: "Validation Error",
        text: "Please upload the attached photo.",
        icon: "error",
      });
      return false;
    }
    if (files.attached_kyc.length === 0) {
      Swal.fire({
        title: "Validation Error",
        text: "Please upload the attached KYC documents.",
        icon: "error",
      });
      return false;
    }
    if (!files.bank_passbook) {
      Swal.fire({
        title: "Validation Error",
        text: "Please upload the bank passbook.",
        icon: "error",
      });
      return false;
    }
    if (!files.shop_photo) {
      Swal.fire({
        title: "Validation Error",
        text: "Please upload the shop photo.",
        icon: "error",
      });
      return false;
    }
    if (!files.electric_bill) {
      Swal.fire({
        title: "Validation Error",
        text: "Please upload the electricity bill.",
        icon: "error",
      });
      return false;
    }
    if (!formData.userId) {
      Swal.fire({
        title: "Validation Error",
        text: "Something went wrong! Please Try again",
        icon: "error",
      });
      return false;
    }

    return true; // Validation passed
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

    // Validate the form
    if (!validateForm()) {
      return; // Stop the submission if validation fails
    }
    setShowPinModal(true);
  };

  const [existingFiles, setExistingFiles] = useState({
    attached_photo: item.attached_photo_url || null,
    attached_kyc: item.attached_kyc_urls || [],
    bank_passbook: item.bank_passbook_url || null,
    shop_photo: item.shop_photo_url || null,
    electric_bill: item.electric_bill_url || null,
  });

  // Function to open a file in a new tab
  const openFileInNewTab = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      Swal.fire({
        title: "File Not Available",
        text: "There is no file to display.",
        icon: "info",
      });
    }
  };

  // Function to handle re-uploading or retaining files
  const handleReupload = (fileKey, newFile) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileKey]: newFile || prevFiles[fileKey], // Retain old if newFile is null
    }));
    if (!newFile) {
      setExistingFiles((prev) => ({
        ...prev,
        [fileKey]: null, // Remove old file URL if reuploading
      }));
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
                      <h4 className="px-lg-3">Edit Bank ID Form</h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; Edit Bank ID Form
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
                            // onChange={handleInputChange}
                            // onChange={handleDropdownChange}
                          >
                            <option value="">Select an option ....</option>
                            {optionsDrop.map((item) => {
                              const selectedServices = selectedOptions.find(
                                (option) => option.service === item.name
                              );
                              const isDisabled =
                                selectedServices &&
                                selectedServices.status !== "Reject";
                              console.log(isDisabled);

                              // const isDisabled =
                              //   selectedServices &&
                              //   (selectedServices.status == "Success" || selectedServices.status == "Pending" || selectedServices.status == "Mark Edit"  || selectedServices.status == "Under Process")
                              return (
                                <option
                                  key={item.id}
                                  value={item.name}
                                  disabled={true}
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
                            // value={selectedPrice}
                            value={formData.amount}
                            // onChange={handleInputChange}
                            readOnly
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                          ref={attached_photo_ref}
                        />
                        {preveiewfiles.attached_photo && (
                          <a
                            href={preveiewfiles.attached_photo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Existing File
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="attached_kyc" className="form-label">
                          Attached KYC (Multiple Files)
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="attached_kyc"
                          name="attached_kyc"
                          multiple
                          onChange={handleFileChange}
                          ref={attached_Kyc_ref}
                        />
                         {preveiewfiles.attached_kyc.length > 0 && preveiewfiles?.attached_kyc
                                          ?.split(",")
                                          ?.map((kycurl, kycindx) => (
                                            <div key={kycindx}>
                                              <a
                                                href={kycurl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                View Existing File {kycindx + 1}
                                              </a>
                                            </div>
                                          ))}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="bank_passbook" className="form-label">
                          Bank Passbook
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="bank_passbook"
                          name="bank_passbook"
                          onChange={handleFileChange}
                          ref={bank_passbook_ref}
                        />
                         {preveiewfiles.bank_passbook && (
                          <a
                            href={preveiewfiles.bank_passbook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Existing File
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="shop_photo" className="form-label">
                          Shop Photo
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="shop_photo"
                          name="shop_photo"
                          onChange={handleFileChange}
                          ref={shop_photo_ref}
                        />
                        {preveiewfiles.shop_photo && (
                          <a
                            href={preveiewfiles.shop_photo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Existing File
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="electric_bill" className="form-label">
                          Electricity Bill
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          id="electric_bill"
                          name="electric_bill"
                          onChange={handleFileChange}
                          ref={Electricity_bill_ref}
                        />
                        {preveiewfiles.electric_bill && (
                          <a
                            href={preveiewfiles.electric_bill}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Existing File
                          </a>
                        )}
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

export default BankIdEditModel;

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
