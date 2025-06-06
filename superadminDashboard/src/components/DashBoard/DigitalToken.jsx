import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const DigitalToken = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [prices, setPrices] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    coupon_Quantity: "",
    coupon_Price: "",
    total_Amount: "",
    userId: currentUser.userId,
  });

  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `https://2kadam.co.in/api/auth/retailer/getPackageData/${currentUser?.package_Id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.data);
        if (Array.isArray(response.data.data)) {
          setPrices(response.data.data);
          console.log(response.data.data);
        } else {
          console.error("Expected an array, received:", response.data.data);
        }
      } catch (error) {
        console.error("Fetching package data failed:", error);
      }
    };
    fetchPackage();
  }, []);

  useEffect(() => {
    if (prices.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        coupon_Price: prices[0]?.DSC_token_Price,
      }));
    }
  }, [prices]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      total_Amount: prevFormData.coupon_Quantity * prevFormData.coupon_Price,
    }));
  }, [formData.coupon_Quantity, formData.coupon_Price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "coupon_Quantity" || name === "total_Amount") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/retailer/buyDSCcoupon`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "Success") {
        Swal.fire({
          title: "Form Submitted Successfully",
          text: response.data.message,
          icon: "success",
        });
        setFormData({
          coupon_Quantity: "",
          coupon_Price: prices[0]?.DSC_token_Price,
          total_Amount: "",
          coupon_Type: "",
          pan_id: "",
          userId: currentUser.userId,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "An error occurred",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
      console.error("Error submitting form:", error);
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
    if (!token) {
      alert("Token Missing");
      return false;
    }

    try {
      const pinString = Array.isArray(pin) ? pin.join("") : ""; // Ensure pin is an array

      const response = await axios.post(
        `https://2kadam.co.in/api/auth/log-reg/verify-pin`,
        { user_id: currentUser?.userId || "", pin: pinString },
        {
          headers: {
            "Content-Type": "application/json", // Corrected Content-Type
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return true;
      } else {
        alert(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      alert(error.response?.data?.message || "Error verifying PIN");
      return false;
    }
  };

  const handleModalSubmit = async (e) => {
    setIsVerifying(true);
    const isPinValid = await verifyPin();
    setIsVerifying(false);
    if (isPinValid) {
      setShowPinModal(false);
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
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
              <div className="main shadow-none">
                <div className="row shadow-none">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="px-lg-3">Digital Token</h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; Digital Token
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="container p-3">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="col-6 mb-4 border border-danger rounded shadow-sm">
                      <h5 className="text-center m-0 p-3">Digital Token</h5>
                    </div>
                  </div>
                  <form
                    onSubmit={openPinModal}
                    className="shadow p-3 mb-5 bg-body-tertiary rounded"
                  >
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter Name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter Email ID"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          maxLength={10}
                          minLength={10}
                          placeholder="Enter Mobile Number"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter Address"
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Token Quantity</label>
                        <input
                          type="text"
                          className="form-control"
                          name="coupon_Quantity"
                          value={formData.coupon_Quantity}
                          onChange={handleChange}
                          required
                          placeholder="Enter Token Quantity"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Token Price</label>
                        <input
                          type="text"
                          className="form-control"
                          name="coupon_Price"
                          value={formData.coupon_Price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Total Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          name="total_Amount"
                          value={formData.total_Amount}
                          onChange={handleChange}
                          required
                          placeholder="Enter PSA User ID"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">User ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="userId"
                          value={formData.userId}
                          onChange={handleChange}
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 m-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* - */}
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
      </div>
    </Wrapper>
  );
};

export default DigitalToken;

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
