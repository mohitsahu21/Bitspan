import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FindRCView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  const [prices, setPrices] = useState([]);
  const [formData, setFormData] = useState({
    vehicle_number: "",
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
        (item) => item.service_name === "Pan Details"
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
        amount: prices[0].pan_price,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      formData.amount === null ||
      formData.amount === undefined ||
      formData.amount === "" ||
      isNaN(formData.amount) ||
      Number(formData.amount) <= 0
    ) {
      Swal.fire({
        title: "Failure",
        text: "Please connect with admin.",
        icon: "error",
      }).then(() => {
        navigate("/raise-complaint");
      });
      setLoading(false);
      return;
    }
    console.log("Form Data Submitted: ", formData);
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/aadhar/VehicleRCVerification`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "Success") {
        const { rcData, wallet } = response.data;

        Swal.fire({
          title: "RC Data Retrieved",
          html: `
          <strong>Name:</strong> ${rcData?.owner}<br/>
          <strong>Father Name:</strong> ${rcData?.data?.owner_father_name}<br/>
          <strong>Registration No:</strong> ${rcData?.data?.reg_no}<br/>
          <strong>Class:</strong> ${rcData?.data?.class}<br/>
          <strong>Chassis:</strong> ${rcData?.data?.chassis}<br/>
          <strong>Engine:</strong> ${rcData?.data?.engine}<br/>
          <strong>Vehicle Manufacturer:</strong> ${rcData?.data?.vehicle_manufacturer_name}<br/>
          <strong>Model:</strong> ${rcData?.data?.model}<br/>
          <strong>Colour:</strong> ${rcData?.data?.vehicle_colour}<br/>
          <strong>Type:</strong> ${rcData?.data?.type}<br/>
          <strong>Reg Date:</strong> ${rcData?.data?.reg_date}<br/>
          <strong>Reg Authority:</strong> ${rcData?.data?.reg_authority}<br/>
          <strong>Manufacturing Month Year:</strong> ${rcData?.data?.vehicle_manufacturing_month_year}<br/>
          <strong>Insurance Company:</strong> ${rcData?.data?.vehicle_insurance_company_name}<br/>
          <strong>Manufacturing Month Year:</strong> ${rcData?.data?.vehicle_manufacturing_month_year}<br/>
          <strong>Insurance Upto:</strong> ${rcData?.data?.vehicle_insurance_upto}<br/>
          <strong>Insurance Policy No:</strong> ${rcData?.data?.vehicle_insurance_policy_number}<br/>
          <strong>RC Financer:</strong> ${rcData?.data?.rc_financer}<br/>
          <strong>Present Address:</strong> ${rcData?.data?.present_address}<br/>
      <hr/>
      <strong>Transaction ID:</strong> ${wallet?.transactionId}<br/>
    `,
          icon: "success",
        });

        // Reset form
        setFormData({
          vehicle_number: "",
          userId: currentUser?.userId,
          amount: prices[0]?.pan_aadhar_price,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message || "Something went wrong!",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
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
                          View RC Details
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            View RC Details
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
                                  placeholder="Mobile Number"
                                  onChange={handleChange}
                                  name="vehicle_number"
                                  value={formData.vehicle_number}
                                />
                                <label for="floatingInputGroup2">
                                  Registration Number
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

export default FindRCView;

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
