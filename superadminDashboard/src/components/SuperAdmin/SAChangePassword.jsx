import React, { useState } from "react";
import styled from "styled-components";
import { FaRupeeSign } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const SAChangePassword = () => {
  const [userId, setUserId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
   const { token } = useSelector((state) => state.user);

  const userID = currentUser?.userId;
  console.log(userID);

  // Handle password change request
  const handlePasswordChangeRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/change-password-request`,
        {
          UserId: userID,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      console.log(response.data);

      if (response.data.status === "Success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message ||"OTP sent to your email. Please verify it.",
          showConfirmButton: true,
          // timer: 1500,
        });
        setNewPassword("");
        setOldPassword("");
        setStep(2); // Move to OTP verification step
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data?.message || "An error occurred.",
        showConfirmButton: true,
        // timer: 1500,
      });

      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification and password change
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verify-otp-change-password`,
        {
          UserId: userID,
          otp: otp,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setMessage(response.data.message);
      console.log(response.data);
      if (response.data.status === "Success") {
        // Password successfully changed, reset form or navigate to another page
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password Change Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setOtp("")
        setStep(1); // Move to OTP verification step
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data?.message || "An error occurred.",
        showConfirmButton: true,
        // timer: 1500,
      });
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-11 col-md-11  col-11
                             mt-5  formdata"
              >
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                      {/* <div className="text-center">
                        <h3>Change Password</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Change Password
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Change Password{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11  shadow  rounded m-4 px-3 py-5 bg-body-tertiary">
                      {step === 1 ? (
                        <form onSubmit={handlePasswordChangeRequest}>
                          <div className="row d-flex flex-column g-4">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group">
                                <span class="input-group-text">
                                  <RiLockPasswordFill />
                                </span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    value={oldPassword}
                                    onChange={(e) =>
                                      setOldPassword(e.target.value)
                                    }
                                    required
                                    class="form-control"
                                    id="floatingInputGroup2"
                                    placeholder="Mobile Number"
                                  />
                                  <label for="floatingInputGroup2">
                                    Enter Old Password
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group">
                                <span class="input-group-text">
                                  <RiLockPasswordFill />
                                </span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) =>
                                      setNewPassword(e.target.value)
                                    }
                                    required
                                    class="form-control"
                                    id="floatingInputGroup2"
                                    placeholder="Mobile Number"
                                  />
                                  <label for="floatingInputGroup2">
                                    Enter New Password
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="text-center mb-3">
                                <button
                                  className="btn btn-primary py-2 px-4"
                                  type="submit"
                                  disabled={isLoading}
                                >
                                  {isLoading ? "Sending OTP..." : "Send OTP"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <>
                          <form onSubmit={handleOtpVerification}>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group">
                                <span class="input-group-text">
                                  <RiLockPasswordFill />
                                </span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    class="form-control"
                                    id="floatingInputGroup2"
                                    placeholder="Mobile Number"
                                    required
                                  />
                                  <label for="floatingInputGroup2">
                                    Enter OTP
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="text-center mb-3 mt-3">
                                <button
                                  className="btn btn-primary py-2 px-4"
                                  type="submit"
                                  disabled={isLoading}
                                >
                                  {isLoading
                                    ? "Verifying OTP..."
                                    : "Verify OTP"}
                                </button>
                              </div>
                            </div>
                          </form>
                        </>
                      )}
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

export default SAChangePassword;

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
`;
