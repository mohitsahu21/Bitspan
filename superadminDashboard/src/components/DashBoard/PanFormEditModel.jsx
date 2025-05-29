import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { IoMail, IoPerson } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdAlternateEmail } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Swal from "sweetalert2";

const PanFormEditModel = ({ item, setShowMarkEditModel, setIsRefresh }) => {
  const dispatch = useDispatch();
  console.log(item);

  const { currentUser, token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [selectOption, setSelectOption] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const [prices, setPrices] = useState();
  const [selectedPrice, setSelectedPrice] = useState("");
  const [eStampAmount, setEStampAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const attachFormRef = useRef(null);
  const attachPhotoRef = useRef(null);
  const attachSignRef = useRef(null);
  const attachKycRef = useRef(null);
  const [formData, setFormData] = useState({
    applicant_name: item.applicant_name,
    applicant_father: item.applicant_father,
    applicant_number: item.applicant_number,
    email: item.email,
    applicant_select_service: item.applicant_select_service,
    eStampAmount: item.eStampAmount,
    amount: item.amount,
    other: item.other,
    attached_form: item.attached_form || null,
    attached_photo: item.attached_photo || null,
    attached_sign: item.attached_sign || null,
    attached_kyc: item.attached_kyc || [],
    userId: currentUser?.userId,
    order_id: item.order_id,
    previous_attached_photo: item.attached_photo,
    previous_attached_kyc: item.attached_kyc,
    previous_attached_form: item.attached_form,
    previous_attached_sign: item.attached_sign,
  });

  const [preveiewfiles, preveiewSetFiles] = useState({
    attached_form: item.attached_form || null,
    attached_kyc: item.attached_kyc || [],
    attached_photo: item.attached_photo || null,
    attached_sign: item.attached_sign || null,
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const { data } = await axios.get(
          `https://2kadam.co.in/api/auth/retailer/getPackageData/${currentUser?.package_Id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data.data);
        setPrices(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPackage();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "eStampAmount") {
      if (/^\d*$/.test(value)) {
        let parsedValue = parseInt(value, 10);
        parsedValue = isNaN(parsedValue) ? 0 : parsedValue; // Default to 0 if not a number

        const parsedSelectedPrice = parseInt(selectedPrice, 10) || 0;
        const total = parsedValue + parsedSelectedPrice;

        setEStampAmount(value); // Always update the input value to allow changes
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value, // Reflect the input directly
          amount: total.toString(), // Calculate the total amount
        }));
      }
    } else if (name === "applicant_number") {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  //   useEffect(() => {
  //     let calculatedTotal = 0;

  //     if (selectOption && selectedPrice) {
  //       calculatedTotal =
  //         parseInt(eStampAmount, 10) + (parseInt(selectedPrice, 10) || 0);
  //     } else {
  //       calculatedTotal = parseInt(selectedPrice, 10) || 0;
  //     }

  //     const totalAsString = calculatedTotal.toString();

  //     setTotalAmount(totalAsString);

  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       amount: totalAsString,
  //     }));
  //   }, [selectedPrice, eStampAmount, selectOption]);
  useEffect(() => {
    if (item) {
      const selectedService = item.applicant_select_service;
      if (selectedService == "E-Stamp") {
        setSelectOption(true);
      }
    }
  }, []);

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   if (name === "attached_kyc") {
  //     setFormData({ ...formData, [name]: Array.from(files) });
  //   } else {
  //     setFormData({ ...formData, [name]: files[0] });
  //   }
  // };

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  const allowedPhoto = ["image/jpeg", "image/jpg", "image/png"];
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "attached_kyc") {
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE) {
          Swal.fire({
            title: "File Too Large",
            text: `The file "${file.name}" exceeds the 2 MB size limit. Please select smaller files.`,
            icon: "error",
          });
          // Clear the file input
          e.target.value = null;
          return;
        } else if (!allowedTypes.includes(file.type)) {
          Swal.fire({
            icon: "error",
            title: "Invalid File Type",
            text: `Invalid file: ${file.name}. Only JPEG, JPG, PNG , PDF are allowed.`,
          });
          e.target.value = null;
          return;
        }
      }
      setFormData({ ...formData, [name]: Array.from(files) });
    } else if (name === "attached_photo" || name === "attached_sign") {
      // For single file input
      const file = files[0];
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
        } else if (!allowedPhoto.includes(file.type)) {
          Swal.fire({
            icon: "error",
            title: "Invalid File Type",
            text: `Invalid file: ${file.name}. Only JPEG, JPG, PNG are allowed.`,
          });
          e.target.value = null;
          return;
        }
        setFormData((prevFiles) => ({
          ...prevFiles,
          [name]: file,
        }));
      }
    } else {
      const file = files[0];
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
      }
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
    console.log(`${priceKey}: ${price}`);

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

  useEffect(() => {
    if (currentUser?.userId) {
      setFormData((prev) => ({
        ...prev,
        userId: currentUser.userId,
      }));
    }
  }, [currentUser]);

  const clearFileInput = () => {
    if (attachFormRef.current) {
      attachFormRef.current.value = null;
    }
    if (attachPhotoRef.current) {
      attachPhotoRef.current.value = null;
    }
    if (attachSignRef.current) {
      attachSignRef.current.value = null;
    }
    if (attachKycRef.current) {
      attachKycRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting with amount:", formData);

    if (!formData.userId) {
      console.error("User ID is missing");
      return;
    }

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   amount: totalAmount,
    // }));

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
    if (formData.previous_attached_photo) {
      formDataObj.append(
        "previous_attached_photo",
        formData.previous_attached_photo
      );
    }
    if (formData.previous_attached_kyc) {
      formDataObj.append(
        "previous_attached_kyc",
        formData.previous_attached_kyc
      );
    }
    if (formData.previous_attached_form) {
      formDataObj.append(
        "previous_attached_form",
        formData.previous_attached_form
      );
    }
    if (formData.previous_attached_sign) {
      formDataObj.append(
        "previous_attached_sign",
        formData.previous_attached_sign
      );
    }

    if (attachPhotoRef.current.value) {
      // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
      formDataObj.append("attached_photo", formData.attached_photo);
    }
    if (attachFormRef.current.value) {
      // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
      formDataObj.append("attached_form", formData.attached_form);
    }

    if (attachSignRef.current.value) {
      // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
      formDataObj.append("attached_sign", formData.attached_sign);
    }
    if (attachKycRef.current.value) {
      // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
      formData.attached_kyc.forEach((file) => {
        formDataObj.append("attached_kyc", file);
      });
    }
    // if (formData.attached_form)
    //   formDataObj.append("attached_form", formData.attached_form);
    // if (formData.attached_photo)
    //   formDataObj.append("attached_photo", formData.attached_photo);
    // if (formData.attached_sign)
    //   formDataObj.append("attached_sign", formData.attached_sign);
    // formData.attached_kyc.forEach((file) => {
    //   formDataObj.append("attached_kyc", file);
    // });
    formDataObj.append("userId", formData.userId);
    formDataObj.append("order_id", formData.order_id);

    try {
      const response = await axios.put(
        // `http://localhost:7777/api/auth/retailer/applyOfflineForm`,
        `https://2kadam.co.in/api/auth/retailer/update_applyOfflineForm`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert(response.data.message);
      console.log(response);
      const resData = response?.data?.message;
      setIsLoading(false);
      if (response.data.status == "Success") {
        Swal.fire({
          title: "Form Sumitted Success",
          text:
            `${resData}` ||
            "Other Services processed and wallet updated successfully.",
          icon: "success",
        });

        setFormData({
          applicant_name: "",
          applicant_father: "",
          applicant_number: "",
          email: "",
          applicant_select_service: "",
          other: "",
          eStampAmount: "",
          totalAmount: "",
          amount: "",
          attached_form: null,
          attached_photo: null,
          attached_sign: null,
          attached_kyc: [],
          userId: currentUser?.userId,
        });

        setEStampAmount("");
        setTotalAmount("");
        setSelectedPrice("");
        clearFileInput();
        setShowMarkEditModel(false);
        setIsRefresh((value) => !value);
        // dispatch(toggleRefresh());
        setPin(["", "", "", ""]);
        pinRefs.current[0]?.focus();
      } else {
        Swal.fire({
          title: "Something went wrong!",
          text:
            response?.data?.message || "Something went wrong! Please Try again",
          icon: "error",
        });
      }
    } catch (error) {
      // alert("An error occurred. Please try again.");
      console.log(error);
      setIsLoading(false);
      Swal.fire({
        title: "Something went wrong!",
        text:
          error?.response?.data?.message ||
          "Something went wrong! Please Try again",
        icon: "error",
      });
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
    // { id: 8, name: "Sambal" },
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
        // `http://localhost:7777/api/auth/log-reg/verify-pin`,
        `https://2kadam.co.in/api/auth/log-reg/verify-pin`,
        { user_id: currentUser.userId || "", pin: pin.join("") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return true;
      } else {
        // alert(response.data.message);
        Swal.fire({
          title: "Error verifying PIN",
          text:
            response?.data?.message || "Something went wrong! Please Try again",
          icon: "error",
        });
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);

      Swal.fire({
        title: "Error verifying PIN",
        text:
          error?.response?.data?.message ||
          "Something went wrong! Please Try again",
        icon: "error",
      });
      return false;
    }
  };

  const handleModalSubmit = async (e) => {
    setIsVerifying(true);
    const isPinValid = await verifyPin();
    setIsVerifying(false);
    if (isPinValid) {
      setShowPinModal(false);
      setPin(["", "", "", ""]);
      await handleSubmit(e);
    } else {
      setPin(["", "", "", ""]);
      pinRefs.current[0]?.focus();
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
                        {/* <h2 className="text-center m-0 px-5 py-3">
                          Other Services
                        </h2> */}
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
                            required
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
                            required
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
                            pattern="[0-9]{10}"
                            title="Mobile number should be 10 digits"
                            maxLength={10}
                            minLength={10}
                            name="applicant_number"
                            value={formData.applicant_number}
                            onChange={handleChange}
                            onInput={(e) => {
                              if (e.target.value.length > 10)
                                e.target.value = e.target.value.slice(0, 10);
                            }}
                            required
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
                            required
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
                            disabled
                            onChange={(e) => {
                              handleChange(e);
                              handleSelect(e);
                            }}
                            required
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
                                required
                                disabled
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
                                value={formData.eStampAmount}
                                onChange={handleChange}
                                required
                                disabled
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
                            // value={totalAmount || selectedPrice || ""}
                            value={formData.amount}
                            // onChange={handleChange}
                            readOnly
                            required
                            disabled
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
                          ref={attachFormRef}
                        />
                        {preveiewfiles.attached_form && (
                          <a
                            href={preveiewfiles.attached_form}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Existing File
                          </a>
                        )}
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
                          ref={attachPhotoRef}
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
                          ref={attachSignRef}
                        />
                        {preveiewfiles.attached_sign && (
                          <a
                            href={preveiewfiles.attached_sign}
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
                        <label htmlFor="formFileLg4" className="form-label">
                          Attachment KYC (JPG, JPEG, PNG,PDF)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg4"
                          type="file"
                          name="attached_kyc"
                          multiple
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          ref={attachKycRef}
                        />
                        {preveiewfiles.attached_kyc.length > 0 &&
                          preveiewfiles?.attached_kyc
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start mb-3">
                        <button
                          className="btn btn-primary p-2"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Submit..." : "Submit"}
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

export default PanFormEditModel;

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
// useEffect(() => {
//   if (selectOption && selectedPrice) {
//     const total =
//       parseInt(eStampAmount, 10) + (parseInt(selectedPrice, 10) || 0);
//     const totalAsString = total.toString();
//     setTotalAmount(totalAsString);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       amount: totalAsString, // Ensuring amount is always updated
//     }));
//   } else {
//     const fallbackValue = selectedPrice || "0";
//     setTotalAmount(fallbackValue);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       amount: fallbackValue,
//     }));
//   }
// }, [selectedPrice, eStampAmount, selectOption]);

// console.log("Break comments");

// const handleChange = (e) => {
//   const { name, value } = e.target;

//   setFormData((prevFormData) => {
//     if (name === "eStampAmount") {
//       const parsedValue = parseInt(value, 10);
//       const parsedSelectedPrice = parseInt(selectedPrice, 10) || 0;

//       const total = isNaN(parsedValue)
//         ? ""
//         : (parsedValue + parsedSelectedPrice).toString();

//       return {
//         ...prevFormData,
//         eStampAmount: value, // Update eStampAmount directly from the input
//         amount: total, // Update amount based on calculation
//       };
//     } else {
//       // For all other inputs, update normally
//       return {
//         ...prevFormData,
//         [name]: value,
//       };
//     }
//   });
// };
