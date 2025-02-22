import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const CreatePin = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  console.log(currentUser.userId);

  const [isUserAvailable, setIsUserAvailable] = useState(false);

  console.log(isUserAvailable);

  const [createPinData, setCreatePinData] = useState({
    user_id: currentUser.userId || "",
    pin: "",
  });

  const [changePinData, setChangePinData] = useState({
    user_id: currentUser.userId || "",
    new_pin: "",
    email: currentUser.email || "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUserAvailable = async () => {
      console.log("35", currentUser.userId);

      try {
        const response = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/check-user`,
          {
            params: { user_id: currentUser.userId },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API response:", response.data); // Log API response
        setIsUserAvailable(response.data.exits); // Change `exists` to `exits`
      } catch (error) {
        console.error("Error checking user availability:", error);
      }
    };

    if (currentUser?.userId) {
      checkUserAvailable();
    }
  }, [currentUser?.userId]);

  console.log("isUserAvailable:", isUserAvailable);

  const handleInputChange = (e, form) => {
    const { name, value } = e.target;
    if (form === "create") {
      setCreatePinData({ ...createPinData, [name]: value });
    } else {
      setChangePinData({ ...changePinData, [name]: value });
    }
  };

  const handleCreatePinSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/create-pin`,
        createPinData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.status === "Failure") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.data.message || "PIN failed!",
        });
      } else if (response.data.status === "Success") {
        Swal.fire({
          title: "Done!",
          text: `${response.data.message}`,
          icon: "success",
        });
        setCreatePinData(response.data);
        setIsUserAvailable(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      console.log(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/request-otp`,
        changePinData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOtpSent(true);
      // alert(response.data.message);
      console.log(response.data.message);
      if (response.data.status === "Success") {
        Swal.fire({
          title: "Done!",
          text: `${response.data.message}`,
          icon: "success",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      console.log(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePinSubmit = async (e) => {
    e.preventDefault();
    if (!changePinData.user_id || !changePinData.otp) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User ID and OTP are required!",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verify-otp`,
        { user_id: changePinData.user_id, otp: changePinData.otp },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      if (response.data.status === "Failure") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message || "OTP failed!",
        });
      } else if (response.data.status === "Success") {
        Swal.fire({
          title: "Done!",
          text: response.data.message,
          icon: "success",
        });
      }
      setOtpSent(false); // Reset OTP state
      setChangePinData({ ...changePinData, new_pin: "", otp: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
      console.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleChangePinSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(
  //       `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verify-otp`,
  //       { user_id: changePinData.user_id, otp: changePinData.otp }
  //     );
  //     alert(response.data.message);
  //     console.log(response.data.message);
  //     if (response.data.status === "Failure") {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: result.data.message || "OTP failed!",
  //       });
  //     } else if (response.data.status === "Success") {
  //       Swal.fire({
  //         title: "Done!",
  //         text: `${response.data.message}`,
  //         icon: "success",
  //       });
  //     }
  //     setOtpSent(false); // Reset OTP state to allow entering new PIN
  //     setChangePinData({ ...changePinData, new_pin: "", otp: "" }); // Clear the PIN and OTP fields
  //   } catch (error) {
  //     alert(error.response.data.message);
  //     console.log(error.response.data.message);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: error.response.data.message,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Create Pin</h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/&nbsp; Create Pin
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* - */}
                  <div className="container py-5">
                    <h2 className="text-center mb-4">PIN Management</h2>
                    <div className="row d-flex justify-content-center align-item-center">
                      {isUserAvailable ? (
                        <div className="col-md-6 mb-4">
                          <div className="card">
                            <div className="card-body">
                              <h4 className="card-title">Change PIN</h4>
                              <form
                                onSubmit={
                                  otpSent ? handleChangePinSubmit : requestOtp
                                }
                              >
                                <div className="mb-3">
                                  <label
                                    htmlFor="user_id"
                                    className="form-label"
                                  >
                                    User ID
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="user_id"
                                    name="user_id"
                                    value={changePinData.user_id}
                                    onChange={(e) =>
                                      handleInputChange(e, "change")
                                    }
                                    required
                                    readOnly
                                    disabled
                                  />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={changePinData.email}
                                    onChange={(e) =>
                                      handleInputChange(e, "change")
                                    }
                                    required
                                    readOnly
                                    disabled
                                  />
                                </div>
                                {otpSent ? (
                                  <>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="otp"
                                        className="form-label"
                                      >
                                        OTP
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="otp"
                                        name="otp"
                                        value={changePinData.otp}
                                        onChange={(e) =>
                                          handleInputChange(e, "change")
                                        }
                                        required
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn btn-primary w-100"
                                      disabled={isLoading}
                                    >
                                      {isLoading
                                        ? "Change PIN..."
                                        : "Change PIN"}
                                    </button>
                                  </>
                                ) : (
                                  <div className="mb-3">
                                    <label
                                      htmlFor="new_pin"
                                      className="form-label"
                                    >
                                      New PIN
                                    </label>{" "}
                                    &nbsp;&nbsp;
                                    <small style={{ color: "red" }}>
                                      Only Enter 4 Digit Number
                                    </small>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="new_pin"
                                      name="new_pin"
                                      value={changePinData.new_pin}
                                      onChange={(e) =>
                                        handleInputChange(e, "change")
                                      }
                                      maxLength={4}
                                      minLength={4}
                                      required
                                      autoComplete="off"
                                    />
                                  </div>
                                )}
                                {!otpSent && (
                                  <button
                                    type="submit"
                                    className="btn btn-warning w-100"
                                    disabled={isLoading}
                                  >
                                    {isLoading
                                      ? "Request OTP..."
                                      : "Request OTP"}
                                  </button>
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-6 mb-4">
                          <div className="card">
                            <div className="card-body">
                              <h4 className="card-title">Create PIN</h4>
                              <form onSubmit={handleCreatePinSubmit}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="user_id"
                                    className="form-label"
                                  >
                                    User ID
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="user_id"
                                    name="user_id"
                                    value={createPinData.user_id}
                                    onChange={(e) =>
                                      handleInputChange(e, "create")
                                    }
                                    required
                                  />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="pin" className="form-label">
                                    PIN
                                  </label>{" "}
                                  &nbsp;&nbsp;
                                  <small style={{ color: "red" }}>
                                    Only Enter 4 Digit Number
                                  </small>
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="pin"
                                    name="pin"
                                    value={createPinData.pin}
                                    onChange={(e) =>
                                      handleInputChange(e, "create")
                                    }
                                    maxLength={4}
                                    minLength={4}
                                    required
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-primary w-100"
                                  disabled={isLoading}
                                >
                                  {isLoading ? "Create PIN..." : "Create PIN"}
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
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

export default CreatePin;
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
`;
