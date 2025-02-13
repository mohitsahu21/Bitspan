import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  MdCurrencyRupee,
  MdEmail,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import {
  FaAddressCard,
  FaMobileAlt,
  FaRupeeSign,
  FaUser,
} from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { PiAddressBook } from "react-icons/pi";
import { LuTextSelect, LuUserCheck } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import { Modal, Spinner, Button } from "react-bootstrap";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const WLTransferId = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]); // Store options for Select
  const [selectedOption, setSelectedOption] = useState(null); // Store selected option

  const userId = useSelector((state) => state.user.currentUser?.userId);
  const username = useSelector((state) => state.user.currentUser?.username);

  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "bold", // Bold for selected options
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
  };

  const [remainingIds, setRemainingIds] = useState({
    remaining_whitelable_id: 0,
    remaining_superDistributor_id: 0,
    remaining_distributor_id: 0,
    remaining_retailer_id: 0,
  });

  const fetchNoOfIds = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/auth/whiteLabel/getRemainingIds/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRemainingIds(response.data.data);
    } catch (error) {
      console.error("Error fetching No of Available IDs:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error Fetching Data",
          text: "An error occurred while fetching available IDs.",
        });
      }
    }
  };

  useEffect(() => {
    if (userId) fetchNoOfIds();
  }, [userId]);

  const fetchActiveUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getActiveUsers/${userId}`,
        `http://localhost:7777/api/auth/whiteLabel/getActiveUsers/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Transform users into the required format for react-select
      const userOptions = data.data.map((user) => ({
        value: user.UserId, // Use the user ID or unique identifier
        // label: "User Id" +  "--" + user.UserId  + "--User Name --"+ user.UserName + "--User Role --" + user.role + "--User Mobile --" + user.ContactNo,
        label: `User Id: ${user.UserId}\nUser Name: ${user.UserName}\nUser Role: ${user.userType}\nUser Mobile: ${user.ContactNo}`, // Format the label
        user: user,
      }));
      setUsers(data.data);
      setOptions(userOptions); // Set options for Select
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      }
      setLoading(false);
    }
  };

  const fetchUsersRemainingIds = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/auth/whiteLabel/getRemainingIds/${formData.userId}`,
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getWalletBalance/${formData.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setFormData({
          ...formData,
          // availableBalance: data.data[0].Closing_Balance,
          // availableBalance: data.data,
          availableIds: data.data,
        });
        console.log(data);
      } else {
        setFormData({
          ...formData,
          availableIds: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        setFormData({
          ...formData,
          availableIds: 0,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
  }, [isRefresh]);
  useEffect(() => {
    // fetchUsersBalance();
    fetchUsersRemainingIds();
  }, [selectedOption]);

  useEffect(() => {
    console.log("Options Data:", options); // Yeh dekho ki options array kaisa hai
  }, [options]);

  const handleSelectChange = (selectedOption) => {
    console.log("Selected User:", selectedOption);
    setSelectedOption(selectedOption.user);
    setFormData({
      ...formData,
      userId: selectedOption?.value || "", // Update `package_for` with the selected value
    });
  };

  console.log("Selected User:", selectedOption);

  const [formData, setFormData] = useState({
    senderId: "",
    sender_name: "",
    receiverId: "",
    receiver_name: "",
    no_of_ids: "",
    transferType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    // Get available IDs based on selected role
    const availableIds =
      selectedOption?.role === "Distributor"
        ? Number(remainingIds?.remaining_retailer_id || 0)
        : selectedOption?.role === "SuperDistributor"
        ? Number(remainingIds?.remaining_distributor_id || 0)
        : selectedOption?.role === "whitelabel"
        ? Number(remainingIds?.remaining_whitelable_id || 0)
        : selectedOption?.role === "Retailer"
        ? Number(remainingIds?.remaining_retailer_id || 0)
        : 0;

    // Check if input value exceeds available IDs
    if (name === "no_of_ids" && numericValue > availableIds) {
      Swal.fire({
        icon: "warning",
        title: "Limit Exceeded!",
        text: `You can only enter up to ${availableIds} IDs.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return; // Stop execution to prevent state update
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Before Submit:", formData);

    const noOfIds = parseInt(formData.no_of_ids, 10);

    if (!formData.no_of_ids || isNaN(noOfIds) || noOfIds <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid ID Transfer",
        text: "Please enter a valid number of IDs to transfer.",
      });
      return;
    }

    const updatedFormData = {
      senderId: userId,
      sender_name: username,
      receiverId: formData.userId,
      receiver_name: selectedOption?.UserName,
      no_of_ids: noOfIds,
      transferType:
        selectedOption?.role === "SuperDistributor"
          ? "distributor" // ✅ Super Distributor → Distributor ID
          : "retailer", // ✅ Distributor → Retailer ID
    };

    try {
      setButtonLoading(true);

      const response = await axios.post(
        `http://localhost:7777/api/auth/whiteLabel/idTransfer`,
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setButtonLoading(false);

      if (response.data?.success) {
        Swal.fire({
          icon: "success",
          title: "ID Transfer Successful",
          text:
            response.data.message ||
            "The ID has been transferred successfully!",
        });

        setFormData({
          senderId: "",
          sender_name: "",
          receiverId: "",
          receiver_name: "",
          no_of_ids: "",
          transferType: "",
        });
        setSelectedOption(null);
        fetchNoOfIds();
        setIsRefresh((prev) => !prev);
        Swal.fire({
          icon: "success",
          title: response.data.message,
        });
        setPin(["", "", "", ""]);
        pinRefs.current[0]?.focus();

        // ✅ Reset Remaining IDs (if needed)
        setRemainingIds({
          remaining_whitelable_id: "",
          remaining_distributor_id: "",
          remaining_superDistributor_id: "",
          remaining_retailer_id: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Transfer Failed",
          text:
            response.data?.message && response.data?.message !== ""
              ? response.data.message
              : response.data?.error && response.data?.error !== ""
              ? response.data.error
              : "ID transfer failed. Please check your balance or try again later.",
        });
      }
    } catch (error) {
      console.error("Error in ID transfer:", error);
      setButtonLoading(false);

      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your token is expired, please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Transfer Failed",
          text:
            error?.response?.data?.message &&
            error?.response?.data?.message !== ""
              ? error.response.data.message
              : error?.response?.data?.error &&
                error?.response?.data?.error !== ""
              ? error.response.data.error
              : "An error occurred. Please try again.",
        });
      }
    }
  };

  console.log(formData);
  console.log(selectedOption);

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
        // http://localhost:7777/api/auth/log-reg/verify-pin,
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verify-pin`,
        { user_id: userId || "", pin: pin.join("") }
      );

      if (response.data.success) {
        return true;
      } else {
        // alert(response.data.message);
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
      await handleSubmit(e);
    } else {
      setPin(["", "", "", ""]);
      pinRefs.current[0]?.focus();
    }
  };

  const openPinModal = (e) => {
    e.preventDefault();
    setShowPinModal(true);
  };

  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-start">
                        <h3>Raise Complaint</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Transfer IDs</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Transfer IDs
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={openPinModal}>
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3 pb-3">
                      {loading ? (
                        <div className="d-flex justify-content-center">
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden ">Loading...</span>
                          </Spinner>
                        </div>
                      ) : (
                        <>
                          <div className="text-center">
                            <h5>Enter All Correct Details For Share IDs</h5>
                          </div>
                          {/* <div className="d-flex justify-content-between align-items-center mt-3">
                            <h5>
                              Total Available IDs:{" "}
                              <span className="badge bg-primary">
                                {" "}
                                {remainingIds?.remaining_whitelable_id}
                              </span>
                            </h5>
                          </div> */}
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label for="name" class="form-label">
                              Select User
                            </label>

                            <Select
                              value={options.find(
                                (option) =>
                                  option.value === formData.package_for
                              )} // Match the selected value
                              onChange={(selectedOption) =>
                                handleSelectChange(selectedOption)
                              } // Pass selected option
                              options={options.filter(
                                (option) => option.user.role !== "Retailer"
                              )}
                              classNamePrefix="react-select"
                              styles={customStyles}
                              required={true}
                            />
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label for="name" class="form-label">
                              User ID
                            </label>
                            <div class="input-group flex-nowrap">
                              <span
                                class="input-group-text"
                                id="addon-wrapping"
                              >
                                {" "}
                                <FaUser />
                              </span>
                              <input
                                type="text"
                                class="form-control"
                                value={selectedOption?.UserId}
                                disabled
                                required
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label for="name" class="form-label">
                              User Name
                            </label>
                            <div class="input-group flex-nowrap">
                              <span
                                class="input-group-text"
                                id="addon-wrapping"
                              >
                                {" "}
                                <FaUser />
                              </span>
                              <input
                                type="text"
                                class="form-control"
                                value={selectedOption?.UserName}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label for="name" class="form-label">
                              User Role
                            </label>
                            <div class="input-group flex-nowrap">
                              <span
                                class="input-group-text"
                                id="addon-wrapping"
                              >
                                {" "}
                                <FaUser />
                              </span>
                              <input
                                type="text"
                                class="form-control"
                                value={selectedOption?.role}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label for="name" class="form-label">
                              User Mobile
                            </label>
                            <div class="input-group flex-nowrap">
                              <span
                                class="input-group-text"
                                id="addon-wrapping"
                              >
                                {" "}
                                <FaMobileAlt />
                              </span>
                              <input
                                type="text"
                                class="form-control"
                                value={selectedOption?.ContactNo}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label for="name" class="form-label">
                              Users available{" "}
                              {selectedOption?.role === "SuperDistributor"
                                ? "distributor"
                                : selectedOption?.role === "Distributor"
                                ? "retailer"
                                : ""}{" "}
                              IDs
                            </label>
                            <div class="input-group flex-nowrap">
                              <span
                                className="input-group-text"
                                id="addon-wrapping"
                              >
                                {" "}
                                <FaIndianRupeeSign />
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                name="amount"
                                value={
                                  selectedOption?.role === "SuperDistributor"
                                    ? selectedOption?.remaining_distributor_id ||
                                      "0"
                                    : selectedOption?.role === "Distributor"
                                    ? selectedOption?.remaining_retailer_id ||
                                      "0"
                                    : "0"
                                }
                                // value={selectedOption.remaining_retailer_id}
                                disabled
                                placeholder=""
                                pattern="^\d+(\.\d+)?$"
                                title="Price should be digits Only"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label for="name" class="form-label">
                              No. of{" "}
                              {selectedOption?.role === "SuperDistributor"
                                ? "distributor"
                                : selectedOption?.role === "Distributor"
                                ? "retailer"
                                : ""}{" "}
                              IDs
                            </label>
                            <div class="input-group flex-nowrap">
                              <span
                                class="input-group-text"
                                id="addon-wrapping"
                              >
                                {" "}
                                <FaIndianRupeeSign />
                              </span>

                              <input
                                type="number"
                                name="no_of_ids" // Changed 'amount' to 'idQuantity'
                                placeholder="Enter  No. of IDs"
                                className="form-control"
                                value={formData.no_of_ids} // Ensure correct state field
                                onChange={handleChange}
                                required
                                min="1"
                              />
                            </div>
                            <small className="text-muted">
                              Available IDs:{" "}
                              {selectedOption?.role === "Distributor"
                                ? remainingIds?.remaining_retailer_id || "0"
                                : selectedOption?.role === "SuperDistributor"
                                ? remainingIds?.remaining_distributor_id || "0"
                                : selectedOption?.role === "whitelabel"
                                ? remainingIds?.remaining_whitelable_id || "0"
                                : selectedOption?.role === "Retailer"
                                ? remainingIds?.remaining_retailer_id || "0"
                                : "0"}
                            </small>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="text-start mb-3">
                              <button
                                type="submit"
                                className={`btn p-2 ${
                                  buttonLoading
                                    ? "btn-secondary"
                                    : "btn-primary"
                                }`}
                                disabled={buttonLoading}
                              >
                                {buttonLoading ? "Processing..." : "Submit"}
                              </button>
                            </div>
                          </div>
                        </>
                      )}
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
      </Wrapper>
    </>
  );
};

export default WLTransferId;

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
  @media (max-width: 576px) {
    .responsive-label {
      font-size: 0.5rem; /* Adjust as needed */
    }
  }
  @media (max-width: 768px) {
    .responsive-label {
      font-size: 1rem; /* Adjust as needed */
    }
  }
  .react-select__option {
    white-space: pre-wrap; /* Preserve new lines and spacing */
  }
`;
