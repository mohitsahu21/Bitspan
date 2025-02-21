import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toggleRefresh } from "../../redux/user/userSlice";
import { Modal, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const EdistrictEditModel = ({item,setShowMarkEditModel,setIsRefresh}) => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    order_id : item.order_id,
    application_type: item.application_type,
    samagar: item.samagar,
    gender: item.gender,
    name: item.name,
    father_husband_name: item.father_husband_name,
    dob: item.dob,
    address: item.address,
    mobile_no: item.mobile_no,
    cast: item.cast,
    aadhar_no: item.aadhar_no,
    samagar_member_id: item.samagar_member_id,
    state: item.state,
    annual_income: item.annual_income,
    previous_application: item.previous_application,
    // charge_amount: "",
    amount: item.charge_amount,
    userId: currentUser.userId,
    status: "Pending",
    previous_documentUpload: item.documentUpload,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState({
    documentUpload : item.documentUpload || [],
  });
    const [preveiewfiles, preveiewSetFiles] = useState({
        documentUpload : item.documentUpload || [],
      
    });
  const [message, setMessage] = useState("");
  const [prices, setPrices] = useState([]);
  const kycRef = useRef(null)
  console.log(formData);
  console.log(files);
  console.log(kycRef);
  
//   useEffect(() => {
//     const fetchPackage = async () => {
//       try {
//         const response = await axios.get(
//           `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getPackageData/${currentUser?.package_Id}`
//         );
//         // console.log(response.data.data);
//         if (Array.isArray(response.data.data)) {
//           setPrices(response.data.data);
//         } else {
//           console.error("Expected an array, received:", response.data.data);
//         }
//       } catch (error) {
//         console.error("Fetching package data failed:", error);
//       }
//     };
//     fetchPackage();
//   }, []);

  // console.log(prices[0]?.offline_kyc_eDistrict);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "mobile_no" || name === "aadhar_no" || name === "samagar_member_id" || name === "annual_income"){
      
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
    else{
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
    }
  
  };

  // const handleFileChange = (e) => {
  //   setFiles(e.target.files);
  // };

   const handleFileChange = (e) => {
      const { name, files } = e.target;
      console.log(`File input changed - Name: ${name}, Files:`, files);
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png" , "application/pdf"];
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
       for (const file of files) {
                       if (file.size > maxSize) {
                         Swal.fire({
                           title: "File Too Large",
                           text: `The file "${file.name}" exceeds the 2 MB size limit. Please select smaller files.`,
                           icon: "error",
                         });
                         // Clear the file input
                         e.target.value = null;
                         return;
                       }
                       else if(!allowedTypes.includes(file.type)){
                 Swal.fire({
                                   icon: "error",
                                   title: "Invalid File Type",
                                   text: `Invalid file: ${file.name}. Only JPEG, JPG, PNG , PDF are allowed.`,
                                 });
                                 e.target.value = null;
                                 return;
                       }
                      
                     }
      setFiles(e.target.files);
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();

    // Append form data fields
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    if(kycRef.current.value){
        // submitForm.append('Electricity_bill', Electricity_bill_ref.current.files[0]);
        Array.from(files).forEach((file) => data.append("documentUpload", file));
    }
  
    // Append files to form data
    

    try {
      const response = await axios.put(
        // "http://localhost:7777/api/auth/retailer/e-district-Form",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/UpdateeDistrictFormData",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if(response?.data?.status == "Success"){
      const resData = response?.data?.message;
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
        userId: currentUser.userId,
        status: "Pending",
      });
      setShowMarkEditModel(false);
      setIsRefresh((value) => !value);
      if(kycRef.current){
        kycRef.current.value = null
      }
    }
     else{
                Swal.fire({
                  title: "Error",
                  text: response?.data?.message || "Something went wrong!",
                  icon: "error",
                });
              }
    } catch (error) {
      setMessage("Error submitting form");
      console.error("Error:", error);
       Swal.fire({
              title: "Error",
              text: error?.response?.data?.message || "Something went wrong!",
              icon: "error",
            });
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
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata ">
              <div className="container mt-4">
                <div className="col-12 d-flex justify-content-center">
                  <div className="border border-danger rounded shadow-sm mb-3">
                    <h2 className="text-center m-0 px-5 py-3">E District</h2>
                  </div>
                </div>
                <form onSubmit={openPinModal} className="shadow p-3 mb-5 bg-body rounded">
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Select Application</label>
                      <select
                        name="application_type"
                        className="form-select"
                        value={formData.application_type}
                        onChange={handleChange}
                        required
                        disabled
                      >
                        <option value="">--Select Option--</option>
                        <option value="income">Income</option>
                        <option value="domicile">Domicile</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Samagra</label>
                      <select
                        name="samagar"
                        className="form-select"
                        value={formData.samagar}
                        onChange={handleChange}
                        required
                        disabled
                      >
                        <option value="">--Select Option--</option>
                        <option value="ekyc">Ekyc</option>
                        {prices[0]?.offline_kyc_eDistrict === "Yes" ? (
                          <option value="non-ekyc">Non Ekyc</option>
                        ) : (
                          ""
                        )}
                        {prices[0]?.offline_kyc_eDistrict === "Yes" ? (
                          <option value="non">Non Samagra</option>
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
                        required
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
                        required
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
                        required
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
                        required
                        maxLength={10}
                        minLength={10}
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
                        maxLength={12}
                        minLength={12}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Samagar Member ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="samagar_member_id"
                        maxLength={9}
                        
                        value={formData.samagar_member_id}
                        onChange={handleChange}
                        required={formData.samagar == "ekyc" || formData.samagar == "non-ekyc"}
                        disabled={formData.samagar == "non"}
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
                        
                        ref={kycRef}
                      />
                        {preveiewfiles.documentUpload.length > 0 && preveiewfiles?.documentUpload
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
                        type="text"
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
                        disabled
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

export default EdistrictEditModel;
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
