import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DigitalSign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  const [prices, setPrices] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedPlanAmount, setSelectedPlanAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    mobile: "",
    email: "",
    pan: "",
    aadhar: "",
    address: "",
    plan: "",
    userId: currentUser.userId,
    amount: "",
  });

  console.log(formData);

  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/retailer/getActiveDigitalSignaturePlans",
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

  console.log(prices[0]?.DSC_Commission);

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
    if (prices && prices.length > 0) {
      setFormData((prev) => ({
        ...prev,
        amount: prices[0]?.DSC_Commission || "",
      }));
    }
  }, [prices]);

  //   console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNo") {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/retailer/addDSCForm`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status == "Success") {
        Swal.fire({
          title: "Form Submitted Successfully",
          html: `
            <p>${response?.data?.message}</p>
            <p>Please pay ₹${selectedPlanAmount} only after the link
                            is activated.</p>
          `,
          icon: "success",
        });
        setFormData({
          name: "",
          father_name: "",
          mobile: "",
          email: "",
          pan: "",
          aadhar: "",
          address: "",
          plan: "",
          userId: currentUser.userId,
          amount: prices[0]?.DSC_Commission,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message || "Something went wrong!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
      console.error("Error submitting form:", error);
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
    <Wrapper>
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-wrap justify-content-center">
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
              <div className="main shadow-none">
                <div className="row shadow-none">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="px-lg-3">Digital Signature</h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; Digital Signature
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="container p-3">
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
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Father Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="father_name"
                          value={formData.father_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Mobile Number </label>
                        <small>
                          {" "}
                          <span style={{ color: "red", fontSize: "13px" }}>
                            &nbsp;( Aadhaar Linked Mobile Required )
                          </span>
                        </small>
                        <input
                          type="text"
                          className="form-control"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                          maxLength={10}
                          minLength={10}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email ID</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Pan Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="pan"
                          value={formData.pan}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Aadhar Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="aadhar"
                          value={formData.aadhar}
                          onChange={handleChange}
                          maxLength={12}
                          minLength={12}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Select Plan</label>
                        <select
                          className="form-select"
                          name="plan"
                          value={formData.plan}
                          onChange={(e) => {
                            const selectedPlan = services.find(
                              (plan) => plan.id === parseInt(e.target.value)
                            );
                            setFormData({
                              ...formData,
                              plan: selectedPlan?.year || "",
                            });
                            setSelectedPlanAmount(selectedPlan?.amount || "");
                          }}
                          required
                        >
                          <option value="">- Select -</option>
                          {services.map((plan) => (
                            <option key={plan.id} value={plan.year}>
                              {plan.year} - ₹{plan.amount}
                            </option>
                          ))}
                        </select>
                        {selectedPlanAmount && (
                          <div className="mt-2 text-danger fw-bold">
                            Please pay ₹{selectedPlanAmount} only after the link
                            is activated.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 m-3 d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit"}
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
                            value={digit ? "●" : ""}
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

export default DigitalSign;

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
