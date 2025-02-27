import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaAddressCard, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams for fetching bid from URL
import Swal from "sweetalert2";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const WLBankAccountVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    bankholder_name: "",
    bankaccount_number: "",
    IFSC_code: "",
    bank_name: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent
  const [error, setError] = useState(""); // To hold validation error messages
  const [timer, setTimer] = useState(0); // Timer state
  const [loading, setLoading] = useState(false); // State for loading effect

  const { bid } = useParams(); // Fetch bid from URL params

  // Function to fetch bank account details using bid
  const fetchBankDetails = async (bid) => {
    console.log("Fetching bank details for bid:", bid); // Log bid before request
    try {
      const response = await axios.get(
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getBankAccountDetails/${bid}`,
        `https://bitspan.vimubds5.a2hosted.com/api/auth/whiteLabel/getBankAccountDetails/${bid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        }
      );
      console.log("Response from API:", response.data); // Log API response

      if (response.data.success) {
        console.log("Bank details found:", response.data.data);
        setFormData(response.data.data); // Set the form with fetched data
      } else {
        console.warn("Bank account not found");
        alert("Bank account not found");
      }
    } catch (error) {
      console.error("Error fetching bank details:", error);
      if (error?.response?.status === 401) {
        // Token expired handling
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });

        dispatch(clearUser()); // Clear user session (ensure `clearUser` is defined in your Redux actions)
        navigate("/"); // Redirect to login page
      } else {
        alert("Failed to fetch bank details");
      }
    }
  };

  // Fetch bank details when bid is available
  useEffect(() => {
    console.log("useEffect triggered with bid:", bid); // Log when useEffect is triggered
    if (bid) {
      fetchBankDetails(bid);
    }
  }, [bid]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // Cleanup interval when timer reaches 0 or on component unmount
    return () => clearInterval(interval);
  }, [timer]);

  const UserId = useSelector((state) => state.user.currentUser?.userId);
  // Function to handle OTP request
  const handleGetOtp = async () => {
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/changeBankStatus",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/whiteLabel/changeBankStatus",
        { UserId, bid },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        }
      );

      console.log(response);

      if (response.data.status == "Success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "OTP sent successfully!",
          confirmButtonText: "Okay",
        });
        setOtpSent(true); // Change button text to "Resend OTP"
        setTimer(30); // Start 30-second timer
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to send OTP",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error sending OTP. Please try again later.",
        confirmButtonText: "Okay",
      });
    }
    setLoading(false); // Stop loading after the request completes
  };

  console.log(otp);

  const SubmitBankOtp = async () => {
    // Check if OTP is empty
    if (!otp) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please Enter OTP",
      });
      return; // Stop the function execution if OTP is not provided
    }

    try {
      const response = await axios.post(
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/verifyOtpAndChangeBankStatus",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/whiteLabel/verifyOtpAndChangeBankStatus",
        { UserId, otp },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "Success") {
        Swal.fire({
          icon: "success",
          title: "OTP Submitted Successfully!",
          text: "Your OTP has been verified and status updated.",
          willClose: () => {
            // Navigate to another page once SweetAlert closes
            window.location.href = "/bank-account-setup"; // Replace '/success' with your desired route
          },
        });
        setOtpSent(true); // OTP has been sent
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Submit OTP",
          text:
            `${response.data.message}` ||
            "An error occurred while submitting the OTP. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submit OTP:", error);

      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Your token is expired, please login again",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "An error occurred while submitting the OTP. Please try again.",
        });
      }
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
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="px-lg-3">Bank Details</h4>
                      <p className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp;
                        <span
                          className="text-body-secondary"
                          style={{ fontSize: "13px" }}
                        >
                          Bank Details
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                  <div className="text-center">
                    <h5>Verify Bank Account</h5>
                  </div>

                  {/* Bank Holder Name */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="bankholder_name" className="form-label">
                      Bank Holder Name
                    </label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        id="bankholder_name"
                        className="form-control"
                        value={formData.bankholder_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bankholder_name: e.target.value,
                          })
                        }
                        placeholder="Enter Name"
                        disabled={true}
                      />
                    </div>
                  </div>

                  {/* Bank Account Number */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="bankaccount_number" className="form-label">
                      Bank Account Number/ UPI ID
                    </label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        <FaAddressCard />
                      </span>
                      <input
                        type="text"
                        id="bankaccount_number"
                        className="form-control"
                        value={formData.bankaccount_number}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bankaccount_number: e.target.value,
                          })
                        }
                        placeholder="Enter Bank Account Number/ UPI ID"
                        disabled={true}
                      />
                    </div>
                  </div>

                  {/* IFSC Code */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="IFSC_code" className="form-label">
                      IFSC Code
                    </label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        <MdEmail />
                      </span>
                      <input
                        type="text"
                        id="IFSC_code"
                        className="form-control"
                        value={formData.IFSC_code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            IFSC_code: e.target.value,
                          })
                        }
                        placeholder="Enter IFSC Code"
                        disabled={true}
                      />
                    </div>
                  </div>

                  {/* Bank Name */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="bank_name" className="form-label">
                      Bank Name
                    </label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        <FaAddressCard />
                      </span>
                      <input
                        type="text"
                        id="bank_name"
                        className="form-control"
                        value={formData.bank_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bank_name: e.target.value,
                          })
                        }
                        placeholder="Enter Bank Name"
                        disabled={true}
                      />
                    </div>
                  </div>

                  {/* OTP Field with Get OTP Button */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <button
                      className="btn btn-primary"
                      onClick={handleGetOtp}
                      disabled={timer > 0 || loading} // Disable button when loading or timer is active
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          {" Loading..."}
                        </>
                      ) : otpSent ? (
                        timer > 0 ? (
                          `Resend OTP (${timer}s)`
                        ) : (
                          "Resend OTP"
                        )
                      ) : (
                        "Get OTP"
                      )}
                    </button>

                    <div className="input-group flex-nowrap mt-2">
                      <span className="input-group-text" id="addon-wrapping">
                        <FaAddressCard />
                      </span>
                      <input
                        type="text"
                        id="otp"
                        className="form-control"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="text-start mb-3">
                      <button
                        className="btn p-2"
                        onClick={SubmitBankOtp}
                        disabled={!otpSent} // Disable the button if OTP has not been sent
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WLBankAccountVerify;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  th {
    font-weight: 500;
    font-size: 14px;
  }
  td {
    font-size: 14px;
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
  @media (max-width: 576px) {
    .responsive-label {
      font-size: 0.5rem;
    }
  }
  @media (max-width: 768px) {
    .responsive-label {
      font-size: 1rem;
    }
  }
`;
