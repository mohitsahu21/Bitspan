import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const ForgotPassword = () => {
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
   const navigate = useNavigate();

  // Function to send OTP request
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/log-reg/forgot-password`,
        { UserId: userId }
      );
      if (response.data.status === "Success") {
        alert(response.data.message);
        setOtpSent(true);
        setShowOtpModal(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP and reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/log-reg/verifyOTP-forgot`,
        {
          UserId: userId,
          otp: otp,
          newPassword: newPassword,
        }
      );
      if (response.data.status === "Success") {
        alert(response.data.message);
        setShowOtpModal(false); // Close the modal
        navigate("/");
        
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Error resetting password");
    }finally {
      setIsLoading(false);
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-xl-4">
            <div className="card">
              <div className="p-4">
                <div className="text-center">
                  {/* <h3>Bitspan.com</h3> */}
                  <h4 className="text-muted mt-2 text-center fs-5">
                    Forgot Your Password?
                  </h4>
                  <p className="mb-5 text-center">
                    Don't worry! Enter your email to receive an OTP and reset
                    your password.
                  </p>
                </div>
                <form onSubmit={handleSendOtp}>
                  <>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form2Example1">
                        User ID
                      </label>
                      <input
                        type="text"
                        id="form2Example1"
                        className="form-control"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your User ID"
                        required
                      />
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        // onClick={handleSendOtp}
                        disabled={loading}
                      >
                        {loading ? "Send OTP...." : "Send OTP"}
                      </button>
                    </div>
                  </>
                </form>
              </div>
            </div>
            <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Enter OTP and New Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {otpSent && (
                  <form onSubmit={handleResetPassword}>
                  <div>
                    <div className="form-group">
                      <label htmlFor="otp">OTP</label>
                      <input
                        type="text"
                        className="form-control"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter the OTP"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <button
                      // onClick={handleResetPassword}
                      type="submit"
                      className="btn btn-success mt-3"
                      disabled={isloading}
                    >
                      Reset Password
                    </button>
                  </div>
                  </form>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowOtpModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ForgotPassword;

const Wrapper = styled.div`
  background-color: black;
  bottom: 0;
  height: 100%;
  left: 0;
  /* opacity: 0.; */
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  .card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.5rem;
    background-color: #ffffff;
    margin-top: 8rem;
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  h3 {
    color: #0bb197;
  }
  button {
    background-color: #0bb197;
    color: #ffffff;
    border: #0bb197;
    :hover {
      background-color: #92d6cc;
    }
  }
`;
