import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import Swal from "sweetalert2";

const FindAadhar = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [refId, setRefId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userId] = useState(currentUser?.userId);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

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
        (item) => item.service_name === "Aadhar Details"
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
      setAmount(prices[0].aadhar_price);
    }
  }, [prices]);

  // Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    console.log("Sending OTP...");

    try {
      const res = await axios.post(
        "https://2kadam.co.in/api/auth/aadhar/aadhaarSendOtp",
        {
          aadhaar_number: aadhaarNumber,
          userId,
          amount,
        }
      );

      if (res.data.status === "Success") {
        console.log("OTP sent successfully");
        console.log("OTP Data:", res.data.otpData);
        setRefId(res.data.otpData.ref_id);
        setOrderId(res.data.orderId);
        setStep(2);
        Swal.fire({
          icon: "success",
          title: "OTP sent successfully!",
        });
        setLoading(false);
      } else {
        console.log("Failed to send OTP");
        Swal.fire({
          icon: "error",
          title: res.data.message || "Failed to send OTP",
        });
      }
    } catch (err) {
      console.log("Error during OTP sending:", err);
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Something went wrong",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    console.log("Verifying OTP...");

    if (!otp) {
      console.log("OTP is required");

      return Swal.fire({
        icon: "warning",
        title: "Please enter OTP",
      });
    }
    setLoading(true);

    try {
      const res = await axios.post(
        "https://2kadam.co.in/api/auth/aadhar/aadhaarVerifyOtp",
        {
          aadhaar_number: aadhaarNumber,
          ref_id: refId,
          otp,
          orderid: orderId,
        }
      );

      if (res.data.status === "Success") {
        console.log("Aadhaar Details:", res.data.aadhaarData);
        const data = res.data.aadhaarData;

        const getValue = (val) => {
          return val === null || val === undefined || val === "" ? "N/A" : val;
        };
        Swal.fire({
          title: "Aadhaar Verified Successfully!",
          html: `
          <strong>Name:</strong> ${getValue(data.name)}<br/>
          <strong>Address:</strong> ${getValue(data.address)}<br/>
          <strong>DOB:</strong> ${getValue(data.dob)}<br/>
          <strong>Gender:</strong> ${getValue(data.gender)}<br/>
          <strong>Pincode:</strong> ${getValue(data.pincode)}<br/>
          <strong>State:</strong> ${getValue(data.state)}<br/>
          <strong>District:</strong> ${getValue(data.dist)}<br/>
          <strong>House:</strong> ${getValue(data.house)}<br/>
          <strong>Landmark:</strong> ${getValue(data.landmark)}<br/>
          <strong>Street:</strong> ${getValue(data.street)}<br/>
        `,
          icon: "success",
        }).then(() => {
          setAadhaarNumber("");
          setOtp("");
          setRefId("");
          setOrderId("");
          setStep(1);
        });
        setLoading(false);
      } else {
        console.log("OTP verification failed");
        Swal.fire({
          icon: "error",
          title: res.data.message || "OTP verification failed",
        });
      }
    } catch (err) {
      console.log("Error during OTP verification:", err);

      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Something went wrong",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
                      {/* <div className="text-center">
                                                    <h3>Aadhaar Linking Status</h3>
                                                </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5 mx-xl-5 mx-xxl-2  px-lg-3 px-xxl-0">
                          Aadhaar Linking Status
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Aadhaar Linking Status
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-center pe-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-12 col-sm-12  rounded  px-3">
                      {step === 1 && (
                        <>
                          <div className="guidline px-3 py-5 p-md-5 mt-5 shadow bg-body-tertiary rounded">
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
                                    placeholder="Enter OTP"
                                    value={aadhaarNumber}
                                    onChange={(e) =>
                                      setAadhaarNumber(e.target.value)
                                    }
                                  />
                                  <label for="floatingInputGroup2">
                                    Aadhaar No.
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                              <div className="text-center">
                                <button
                                  className="btn p-2"
                                  onClick={handleSendOtp}
                                  disabled={loading}
                                >
                                  {loading ? "Send OTP..." : "Send OTP"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {step === 2 && (
                        <>
                          <div className="guidline px-3 py-5 p-md-5 mt-5 shadow bg-body-tertiary rounded">
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
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                  />
                                  <label for="floatingInputGroup2">
                                    Enter OTP
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                              <div className="text-center">
                                <button
                                  className="btn p-2"
                                  onClick={handleVerifyOtp}
                                  disabled={loading}
                                >
                                  {loading ? "Verify OTP..." : "Verify OTP"}
                                </button>
                              </div>
                            </div>
                          </div>
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

export default FindAadhar;
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
