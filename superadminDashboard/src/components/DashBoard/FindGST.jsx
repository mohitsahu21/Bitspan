import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FindGST = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  const [prices, setPrices] = useState([]);
  const [formData, setFormData] = useState({
    number: "",
    userId: currentUser?.userId,
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const [services, setServices] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/retailer/getAllServicesList",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(data.data);
      console.log("Services data:", data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status == 401) {
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `https://2kadam.co.in/api/auth/retailer/getPackageData/${currentUser?.package_Id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (Array.isArray(response.data.data)) {
          setPrices(response.data.data);
          console.log("Package data:", response.data.data);
        } else {
          console.error("Expected an array, received:", response.data.data);
        }
      } catch (error) {
        console.error("Fetching package data failed:", error);
      }
    };
    fetchPackage();
    fetchServices();
  }, []);

  useEffect(() => {
    if (services) {
      const purchaseBankIdService = services.find(
        (item) => item.service_name === "GST Number"
      );

      if (purchaseBankIdService?.status === "Deactive") {
        Swal.fire({
          title: "Service Unavailable",
          text: "This service is temporarily down and will be available shortly. Please check back later.",
          icon: "error",
        });
        navigate("/dashboard");
      }
    }
  }, [services]);

  useEffect(() => {
    if (prices.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: prices[0].rc_download_price,
      }));
    }
  }, [prices]);

  console.log("Form data:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "samagraId" ||
      name === "familyId" ||
      name === "mobileNumber"
    ) {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // if (
  //   //   formData.amount === null ||
  //   //   formData.amount === undefined ||
  //   //   formData.amount === "" ||
  //   //   isNaN(formData.amount) ||
  //   //   Number(formData.amount) <= 0
  //   // ) {
  //   //   Swal.fire({
  //   //     title: "Failure",
  //   //     text: "Please connect with admin.",
  //   //     icon: "error",
  //   //   }).then(() => {
  //   //     navigate("/raise-complaint");
  //   //   });
  //   //   setLoading(false);
  //   //   return;
  //   // }
  //   console.log("Form Data Submitted: ", formData);
  //   try {
  //     const response = await axios.post(
  //       `https://2kadam.co.in/api/auth/instpay/fetchGSTVerification`,
  //       formData
  //       // {
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //     Authorization: `Bearer ${token}`,
  //       //   },
  //       // }
  //     );

  //     console.log("Response data:", response.data);
  //     Swal.fire({
  //       title: "GST Data Retrieved",
  //       text: "GST Data Retrieved",
  //       icon: "success",
  //     });

  //     // console.log("GST Data:", response.data.gstData);
  //     // console.log("Wallet Data:", response.data.wallet);
  //     //     if (
  //     //       response.data.status === "Success" &&
  //     //       response.data.gstData.status === "Success"
  //     //     ) {
  //     //       const { gstData, wallet } = response.data;
  //     //       console.log("GST Data:", gstData);
  //     //       console.log("Wallet Data:", wallet);
  //     //       //   <strong>Nature of Business Activities:</strong> ${gstData?.nature_of_business_activities?.join(
  //     //       //         ", "
  //     //       //       )}<br/>
  //     //       Swal.fire({
  //     //         title: "PAN Data Retrieved",
  //     //         html: `
  //     //     <strong>Operator ID:</strong> ${gstData?.opid || "N/A"}<br/>
  //     //  <strong>Trade name of Business:</strong> ${
  //     //    gstData?.trade_name_of_business || "N/A"
  //     //  }<br/>
  //     //  <strong>GST No:</strong> ${gstData?.number || "N/A"}<br/>
  //     //  <strong>Center Jurisdiction:</strong> ${
  //     //    gstData?.center_jurisdiction || "N/A"
  //     //  }<br/>
  //     //  <strong>State Jurisdiction:</strong> ${
  //     //    gstData?.state_jurisdiction || "N/A"
  //     //  }<br/>
  //     //  <strong>Date of Registration:</strong> ${
  //     //    gstData?.date_of_registration || "N/A"
  //     //  }<br/>
  //     //  <strong>Constitution of Business:</strong> ${
  //     //    gstData?.constitution_of_business || "N/A"
  //     //  }<br/>
  //     //  <strong>Taxpayer Type:</strong> ${gstData?.taxpayer_type || "N/A"}<br/>
  //     //  <strong>GST in Status:</strong> ${gstData?.gst_in_status || "N/A"}<br/>
  //     //  <strong>Last Update Date:</strong> ${gstData?.last_update_date || "N/A"}<br/>
  //     //  <strong>Principal Place Address:</strong> ${
  //     //    gstData?.principal_place_address || "N/A"
  //     //  }<br/>
  //     //  <strong>Message:</strong> ${gstData?.message || "N/A"}<br/>
  //     //  <strong>Order ID:</strong> ${gstData?.orderid || "N/A"}<br/>
  //     //  <hr/>
  //     //  <strong>Transaction ID:</strong> ${wallet?.transactionId || "N/A"}<br/>
  //     //   `,
  //     //         icon: "success",
  //     //       });

  //     //       // Reset form
  //     //       setFormData({
  //     //         number: "",
  //     //         userId: currentUser?.userId,
  //     //         amount: prices[0]?.pan_aadhar_price,
  //     //       });
  //     //     } else {
  //     //       Swal.fire({
  //     //         title: "Error",
  //     //         text: response?.data?.message || "Something went wrong!",
  //     //         icon: "error",
  //     //       });
  //     //     }
  //   } catch (error) {
  //     console.log(error);
  //     // console.log(error?.response?.data?.message);

  //     Swal.fire({
  //       title: "Error",
  //       text: error?.response?.data?.message || "Something went wrong!",
  //       icon: "error",
  //     });
  //   } finally {
  //     setLoading(false);
  //     setPin(["", "", "", ""]);
  //     pinRefs.current[0]?.focus();
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Data Submitted: ", formData);
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/instpay/fetchGSTVerification`,
        formData
      );

      console.log("Response data:", response?.data);
      console.log("Response data:", response?.data?.gstData);
      console.log("Response data:", response?.data?.wallet);
      Swal.fire({
        title: "GST Data Retrieved",
        text: "GST Data Retrieved",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      console.log("Error Response:", error?.response);
      console.log("Error Message:", error?.message);
      Swal.fire({
        title: "Error",
        text: error?.message || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
      setPin(["", "", "", ""]);
      pinRefs.current[0]?.focus();
    }
  };

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
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-end justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-10 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-12
                             mt-5"
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5 mx-xl-5 mx-xxl-2  px-lg-3 px-xxl-0">
                          Pan Find by Aadhar
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Pan Find by Aadhar
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-center pe-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-12 col-sm-12  rounded  px-3">
                      <div className="guidline px-3 py-5 p-md-5 mt-5 shadow bg-body-tertiary rounded">
                        <form onSubmit={openPinModal}>
                          {loading && (
                            <div className="text-center my-3">
                              <Spinner animation="border" variant="primary" />
                            </div>
                          )}
                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto">
                            <div class="input-group">
                              <span class="input-group-text">
                                <MdFormatListNumberedRtl />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  placeholder="GST (Goods and Services Tax) No."
                                  onChange={handleChange}
                                  name="number"
                                  value={formData.number}
                                />
                                <label for="floatingInputGroup2">
                                  GST (Goods and Services Tax) No.
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                            <div className="text-center">
                              <button className="btn p-2" disabled={loading}>
                                {loading ? "Loading..." : "Submit"}
                              </button>
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
                                    e.key === "Backspace" &&
                                    handleBackspace(index)
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
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default FindGST;

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

// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const FindGST = () => {
//   const [formData, setFormData] = useState({
//     number: "",
//     userId: "",
//     amount: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   console.log("Form data:", formData);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://2kadam.co.in/api/auth/instpay/fetchGSTVerification",
//         formData
//       );
//       const data = res.data;
//       console.log("Response data:", data);
//       console.log("Response data:", data.gstData);
//       console.log("Response data:", data.wallet);

//       Swal.fire({
//         icon: "success",
//         title: "GST Verification Successful",
//         html: `
//           <p><strong>Transaction ID:</strong> ${data.wallet.transactionId}</p>
//           <p><strong>Previous Balance:</strong> ₹${
//             data.wallet.previousBalance
//           }</p>
//           <p><strong>New Balance:</strong> ₹${data.wallet.newBalance}</p>
//           <p><strong>Deducted Amount:</strong> ₹${
//             data.wallet.deductedAmount
//           }</p>
//           <pre>${JSON.stringify(data.gstData, null, 2)}</pre>
//         `,
//         width: "600px",
//       });
//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.message || "Something went wrong!",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">GST Verification</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">GST Number</label>
//           <input
//             type="text"
//             name="number"
//             value={formData.number}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             placeholder="Enter GST Number"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">User ID</label>
//           <input
//             type="text"
//             name="userId"
//             value={formData.userId}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             placeholder="Enter User ID"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Amount</label>
//           <input
//             type="number"
//             step="0.01"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             placeholder="Enter amount to deduct"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? "Verifying..." : "Verify GST"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FindGST;
