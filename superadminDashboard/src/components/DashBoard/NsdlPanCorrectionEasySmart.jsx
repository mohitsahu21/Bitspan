import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import nsdlpan from "../../assets/images/nsdl-vector.png";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  fetchWalletBalance } from "../../redux/user/userSlice";


const NsdlPanCorrectionEasySmart = () => {
  const dispatch = useDispatch();
      const navigate = useNavigate();
      const { currentUser, token } = useSelector((state) => state.user);
      const { walletBalance } = useSelector((state) => state.user);
      const [prices, setPrices] = useState([]);
      const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    app_mode: "",
    redirect_url : "https://bitspan.vimubds5.a2hosted.com/easySmartNsdlPANCallback",
    selectType: "",
    first_name: "",
    middle_name : "",
    last_name : "",
    dob: "",
    gender: "",
    mobile_no: "",
    email_id: "",
    phyPanIsReq: "",
    walletDeductAmt: "",
    userId: currentUser.userId,
    pan_no : ""
  });

  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
      const [pin, setPin] = useState(["", "", "", ""]);
      const pinRefs = useRef([]);
    console.log(prices);
  
    useEffect(() => {
      const fetchPackage = async () => {
        try {
          const response = await axios.get(
            `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getPackageData/${currentUser?.package_Id}`
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
 console.log(formData)
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     // [e.target.name]: e.target.value,
  //     [name] : name === "pan_no" ? value.toUpperCase() : value,
  //   });
  // };

    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if(name === "mobile_no"){
        
        if (/^\d*$/.test(value)) {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      }
      else{
          setFormData({
      ...formData,
      // [e.target.name]: e.target.value,
      [name] : name === "pan_no" ? value.toUpperCase() : value,
    });
      }
  
    };
      useEffect(()=>{
         setFormData({
          ...formData,
          walletDeductAmt : formData.phyPanIsReq == "Yes" ? prices[0]?.P_PAN_Card_Price : prices[0]?.E_PAN_Card_Price
         })
      },[formData.phyPanIsReq])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/nsdlpan/easySmartCorrectionPanRequest`,
        // `http://localhost:7777/api/auth/nsdlpan/easySmartNSDLNewPanRequest`,
        formData
      );
      // setFormData(apiResponse.data);
      console.log(apiResponse.data);
      if (apiResponse.data.nsdlData.status
        == "Success") {
       // Navigate to the success page and pass the response data
      navigate('/nsdl-correction-pan-card-redirect', { state: { enc_data: apiResponse.data.nsdlData.enc_data } });
     setFormData({
      app_mode: "",
      redirect_url : "https://bitspan.vimubds5.a2hosted.com/easySmartNsdlPANCallback",
      selectType: "",
      first_name: "",
      middle_name : "",
      last_name : "",
      dob: "",
      gender: "",
      mobile_no: "",
      email_id: "",
      phyPanIsReq: "",
      walletDeductAmt: "",
      userId: currentUser.userId,
      pan_no : ""
     })
     dispatch(fetchWalletBalance(currentUser.userId))
      // const encData = apiResponse.data.nsdlData.enc_data;
  // Open a new tab using an anchor tag and the route
  // window.open(`/nsdl-new-pan-card-redirect?enc_data=${encData}`, '_blank');
        

      } else if (apiResponse.data.nsdlData.status == "Failed") {
        // Swal.fire({
        //   icon: "error",
        //   title: "An error occurred during the process. Please try again.",
        // });
         Swal.fire({
                         icon: "error",
                         title: "Oops",
                         text: apiResponse?.data?.nsdlData?.message || "Something went wrong! Please Try again",
                       });
        setLoading(false);
      }
        else{
                    setLoading(false)
                    Swal.fire({
                      icon: "error",
                      title: "Oops",
                      text: "Something went wrong! Please Try again",
                    });
                  }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "An error occurred during the process. Please try again.",
      });
    } finally {
      setLoading(false);
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

  const verifyPin = async () => {
    try {
      const response = await axios.post(
        // `http://localhost:7777/api/auth/log-reg/verify-pin`,
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
                       return false
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
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-lg-end justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-10 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-9
                             mt-5 "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                        <h3>NSDL PAN Apply</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-0">
                        NSDL Correction Apply
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; NSDL Correction Apply
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-center pe-4">
                    <div className="col-xxl-5 col-xl-5 col-lg-9 col-md-10 col-sm-10  rounded  px-3 mt-3">
                      <div className="text-center">
                        <img src={nsdlpan} className="img-fluid" />
                      </div>

                      <div className="guidline p-5 mt-5 shadow bg-body-tertiary rounded">
                        <h3 className="mt-2">NSDL Guidelines</h3>
                        <ul className="list mb-5">
                          <li>
                            <p>{`01) Id activated charges no refunding`}</p>
                          </li>
                          <li>
                            <p>{`02) At the time PAN apply process failed or pending casess auto refunding in 3 working days`}</p>
                          </li>
                          <li>
                            <p>{`03)NSDL instant PAN apply in only retailer login`}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xxl-7 col-xl-6 col-lg-9 col-md-10 col-sm-10 shadow bg-body-tertiary rounded  px-4 py-3 mb-3 mt-5">
                      <form onSubmit={openPinModal}>
                        <div className="row d-flex flex-column g-4">
                          {/* <form> */}
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="app_mode"
                                value={formData.app_mode}
                                onChange={handleChange}
                                required
                              >
                                <option value="" disabled>
                                  Select Application Mode
                                </option>
                                {/* <option value="1">Instant PAN Card</option>
                                <option value="2">Scan Based PAN Card</option> */}
                                <option value="Instant PAN Card - EKYC">
                                  Instant PAN Card - EKYC
                                </option>
                                <option value="Scan Based PAN Card">
                                  Scan Based PAN Card
                                </option>
                              </select>
                              <label for="floatingSelect">
                                Select Application Mode
                              </label>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="selectType"
                                value={formData.selectType}
                                onChange={handleChange}
                                required
                              >
                                <option value="" disabled>
                                  Select Category Type
                                </option>
                                <option value="Individual">Individual</option>
                              </select>
                              <label for="floatingSelect">
                                Select Category Type
                              </label>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="first_name"
                                  value={formData.first_name}
                                  onChange={handleChange}
                                  placeholder="Enter Name"
                                  required
                                   pattern="[A-Za-z\s]*"
                    title="Text should contain only letters"

                                />
                                <label for="floatingInputGroup2">
                                  Enter First Name
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="middle_name"
                                  value={formData.middle_name}
                                  onChange={handleChange}
                                  placeholder="Enter Middle Name"
                                   pattern="[A-Za-z\s]*"
                    title="Text should contain only letters"
                                  
                                />
                                <label for="floatingInputGroup2">
                                  Enter Middle Name
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="last_name"
                                  value={formData.last_name}
                                  onChange={handleChange}
                                  placeholder="Enter Last Name"
                                  required
                                   pattern="[A-Za-z\s]*"
                    title="Text should contain only letters"
                                  
                                />
                                <label for="floatingInputGroup2">
                                  Enter Last Name
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="date"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  placeholder="Date of Birth"
                                  name="dob"
                                  value={formData.dob}
                                  onChange={handleChange}
                                  required
                                />
                                <label for="floatingInputGroup2">
                                  Date of Birth
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                              >
                                <option value="" disabled>
                                  Select Gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                              <label for="floatingSelect">Gender</label>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="mobile_no"
                                  value={formData.mobile_no}
                                  onChange={handleChange}
                                  placeholder="Mobile Number"
                                  required
                                  maxLength={10}
                                  minLength={10}
                                  
                                />
                                <label for="floatingInputGroup2">
                                  Mobile Number
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="email"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="email_id"
                                  value={formData.email_id}
                                  onChange={handleChange}
                                  placeholder="Email"
                                  required
                                />
                                <label for="floatingInputGroup2">
                                  Email Id
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="pan_no"
                                  value={formData.pan_no}
                                  onChange={handleChange}
                                  placeholder="pan_no"
                                  required
                                  style={{ textTransform: 'uppercase' }}
                                  pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
                                  title="PAN card number should be in the format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
                                  maxLength={10}
                                  minLength={10}
                                />
                                <label for="floatingInputGroup2">
                                  PAN Number
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="phyPanIsReq"
                                value={formData.phyPanIsReq}
                                onChange={handleChange}
                                required
                              >
                                <option selected  value="" disabled>Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              <label for="floatingSelect">
                                Is Physical PAN Required?
                              </label>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <p className="fw-bold">
                              Wallet Available Amount : Rs. {walletBalance}
                            </p>
                            <p className="fw-bold">
                              Payable Amount : Rs. {formData.walletDeductAmt}
                            </p>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="text-start mb-3">
                              <button type="submit" className="btn btn-primary p-2" disabled={loading}>
                              {loading ? "Submitting..." : "Submit"}
                              </button>
                            </div>
                          </div>
                          {/* </form> */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         {/* pin Model start*/}
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
                                           {/* pin Model end*/}
      </Wrapper>
    </>
  );
};

export default NsdlPanCorrectionEasySmart;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
  .guidline {
  }
  .list {
    list-style: none;
    padding-left: 0;
    font-size: 14px;
  }
`;