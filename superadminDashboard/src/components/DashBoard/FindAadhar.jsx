import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  console.log("profileID " + userId);
  console.log("Amount = " + amount);

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
      setAmount(prices[0].rc_download_price);
    }
  }, [prices]);

  // Send OTP
  const handleSendOtp = async () => {
    if (!aadhaarNumber) {
      setMessage("Please enter Aadhaar number");
      return;
    }

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
        setRefId(res.data.otpData.ref_id);
        setOrderId(res.data.orderId);
        setStep(2);
        setMessage("OTP sent successfully!");
      } else {
        setMessage(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

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
        setMessage("Aadhaar verified successfully!");
        console.log("Aadhaar Details:", res.data.aadhaarData);
      } else {
        setMessage(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Aadhaar Verification</h2>
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter Aadhaar Number"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <p>OTP sent to your Aadhaar-linked mobile.</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default FindAadhar;
