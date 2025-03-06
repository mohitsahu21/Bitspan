import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { FaHashtag, FaRupeeSign, FaUser } from "react-icons/fa";
import { LuTextSelect } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2"; // Import Swal for alerts
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const BuyUserId = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const [sdPackage, setSdPackage] = useState("");
  const [idPrice, setIdPrice] = useState({
    distributor_id_price: "",
    distributor_max_id_limit: "",
    distributor_min_id_limit: "",
    superDistributor_id_price: "",
    superDistributor_min_id_limit: "",
    superDistributor_max_id_limit: "",
    retailer_id_price: "",
    retailer_min_id_limit: "",
    retailer_max_id_limit: "",
    whiteLabel_id_price: "",
    whiteLabel_min_id_limit: "",
    whiteLabel_max_id_limit: "",
  });
  const [remainingIds, setRemainingIds] = useState({
    remaining_whitelable_id: 0,
    remaining_superDistributor_id: 0,
    remaining_distributor_id: 0,
    remaining_retailer_id: 0,
  });

  const userId = useSelector((state) => state.user.currentUser?.userId);
  const package_Id = useSelector((state) => state.user.currentUser?.package_Id);
  const userPhone = useSelector((state) => state.user.currentUser?.ContactNo);

  const [formData, setFormData] = useState({
    userId: userId || "",
    userPhone: userPhone,
    userId_type: "",
    idPrice: "",
    noOfId: "",
    paymentMethod: "",
  });

  //fetch package
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `https://2kadam.co.in/api/auth/whiteLabel/getPackageData/${package_Id}`,
          // `https://2kadam.co.in/api/auth/superDistributor/getPackageData/${package_Id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token to the request header
            },
          }
        );

        const priceData = response.data.data[0];
        // console.log("Price Data:", priceData);
        setSdPackage(priceData);
      } catch (error) {
        console.error("Fetching package data failed:", error);
        if (error?.response?.status === 401) {
          // Handle token expiration
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
          });
          dispatch(clearUser()); // Clear user session
          navigate("/"); // Redirect to the login page
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching the package data. Please try again later.",
          });
        }
      }
    };

    fetchPackage();
  }, []);

  useEffect(() => {
    setIdPrice({
      distributor_id_price: sdPackage.distributor_id_price,
      distributor_max_id_limit: sdPackage.distributor_max_id_limit,
      distributor_min_id_limit: sdPackage.distributor_min_id_limit,
      superDistributor_id_price: sdPackage.superDistributor_id_price,
      superDistributor_min_id_limit: sdPackage.superDistributor_min_id_limit,
      superDistributor_max_id_limit: sdPackage.superDistributor_max_id_limit,
      retailer_id_price: sdPackage.retailer_id_price,
      retailer_min_id_limit: sdPackage.retailer_min_id_limit,
      retailer_max_id_limit: sdPackage.retailer_max_id_limit,
      whiteLabel_id_price: sdPackage.whiteLabel_id_price,
      whiteLabel_min_id_limit: sdPackage.whiteLabel_min_id_limit,
      whiteLabel_max_id_limit: sdPackage.whiteLabel_max_id_limit,
    });
  }, [sdPackage]);

  // Fetch Wallet Balance
  const fetchWalletBalance = async () => {
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/whiteLabel/getWalletBalance/${userId}`,
        // `https://2kadam.co.in/api/auth/superDistributor/getWalletBalance/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        }
      );
      if (response.data.success) {
        setWalletBalance(response.data.data);
        console.log(response.data.data);
      } else {
        setWalletBalance(0);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      if (error?.response?.status === 401) {
        // Handle token expiration
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to login page
      } else {
        alert("Failed to load wallet balance.");
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWalletBalance();
    }
  }, [userId]);

  // Fetch Remaining IDs
  const fetchNoOfIds = async () => {
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/whiteLabel/getRemainingIds/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        }
      );

      setRemainingIds(response.data.data);
    } catch (error) {
      console.error("Error fetching No of Available IDs:", error);
      if (error?.response?.status === 401) {
        // Handle token expiration
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to login page
      } else {
        alert("Failed to fetch No of Available IDs.");
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNoOfIds();
    }
  }, [userId]);

  const calculateTotalAmount = () => {
    const pricePerId =
      formData.userId_type === "distributor"
        ? idPrice.distributor_id_price
        : formData.userId_type === "whiteLabel"
        ? idPrice.whiteLabel_id_price
        : formData.userId_type === "retailer"
        ? idPrice.retailer_id_price
        : formData.userId_type === "SuperDistributor"
        ? idPrice.superDistributor_id_price
        : 0;

    return (parseInt(formData.noOfId) || 0) * (parseInt(pricePerId) || 0);
  };

  const handlePaymentMethodChange = (e) => {
    // Validate number of IDs before submitting
    const noOfId = parseInt(formData.noOfId) || 0;

    // Get min & max limit dynamically based on userId_type
    const minLimit =
      parseInt(idPrice[`${formData.userId_type}_min_id_limit`]) || 0;
    const maxLimit =
      parseInt(idPrice[`${formData.userId_type}_max_id_limit`]) || Infinity;

    if (noOfId < minLimit) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Input",
        text: `You must purchase at least ${minLimit} IDs.`,
      }).then(() => {
        setFormData({ ...formData, noOfId: "" });
      });
      return;
    }

    // Validate max limit
    if (noOfId > maxLimit) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Input",
        text: `You can purchase a maximum of ${maxLimit} IDs.`,
      }).then(() => {
        setFormData({ ...formData, noOfId: "" });
      });
      return;
    }

    const selectedPaymentMethod = e.target.value;

    console.log(walletBalance);
    if (
      selectedPaymentMethod === "Offline" &&
      calculateTotalAmount() > walletBalance
    ) {
      Swal.fire({
        icon: "warning",
        title: "Insufficient Wallet Balance",
        text: "Your wallet balance is insufficient. Please select another payment method.",
      }).then(() => {
        // Optionally, reset the payment method to an empty value after the alert
        setFormData({
          ...formData,
          paymentMethod: "", // Reset the payment method
        });
      });
      return; // Stop further processing if wallet balance is insufficient
    }

    setFormData({
      ...formData,
      paymentMethod: selectedPaymentMethod,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!formData.userId_type || !formData.noOfId || !formData.paymentMethod) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields.",
      });
      return;
    }

    const payload = {
      userId: formData.userId,
      number_of_userId: formData.noOfId,
      userId_amount: formData.idPrice,
      userId_type: formData.userId_type,
      bought_date: new Date().toISOString(),
      total_amount: calculateTotalAmount(),
      payment_method: formData.paymentMethod,
    };

    try {
      const response = await axios.post(
        // "https://2kadam.co.in/api/auth/superDistributor/buyId",
        "https://2kadam.co.in/api/auth/whiteLabel/buyId",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        }
      );

      // Check for success response
      if (response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Successfully purchased ${formData.noOfId} ${formData.userId_type} ID(s) using ${formData.paymentMethod} method.`,
        });

        // Reset the form
        setFormData({
          userId: userId,
          userId_type: "",
          idPrice: "",
          noOfId: "",
          paymentMethod: "",
        });
        fetchNoOfIds();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: response.data.message || "Failed to submit purchase request.",
        });
      }
    } catch (error) {
      console.error("Error submitting purchase request:", error);

      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your token is expired. Please login again.",
        });

        dispatch(clearUser()); // Logout user
        navigate("/"); // Redirect to login
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text:
            error.response?.data?.message ||
            "An error occurred while submitting your request.",
        });
      }
    }
  };

  const host = window.location.href;
  const handleSubmitOnline = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!formData.userId_type || !formData.noOfId || !formData.paymentMethod) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields.",
      });
      return;
    }

    const payload = {
      userId: formData.userId,
      userPhone: userPhone,
      number_of_userId: formData.noOfId,
      userId_amount: formData.idPrice,
      userId_type: formData.userId_type,
      // total_amount: "1",
      total_amount: calculateTotalAmount(),
      payment_method: formData.paymentMethod,
      website: host,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://2kadam.co.in/api/auth/upiwf/createOrderToBuyUserId",
        payload
      );

      // Check for success response
      // if (response.data.success) {
      //   await Swal.fire({
      //     icon: "success",
      //     title: "Success!",
      //     text: `Successfully purchased ${formData.noOfId} ${formData.userId_type} ID(s) using ${formData.paymentMethod} method.`,
      //   });
      setLoading(false);
      if (response.data.status) {
        Swal.fire({
          title: "Payment Link Created Successfully",
          text: `Your Order Id is ${response.data.data.result.orderId}`,
          icon: "success",
        }).then(() => {
          // Navigate to the payment URL after closing the alert
          // window.location.href = response.data.data.result.payment_url;
          window.open(response.data.data.result.payment_url, "_blank");
        });
        // navigate(/${response.data.data.result.payment_url})
        setFormData({
          userId: userId,
          userId_type: "",
          idPrice: "",
          noOfId: "",
          paymentMethod: "",
        });

        // Reset the form
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: response?.data?.message || "Failed to submit purchase request.",
        });
      }
    } catch (error) {
      console.error("Error submitting purchase request:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while submitting your request.",
      });
    }
  };

  return (
    <Wrapper>
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-wrap justify-content-lg-end justify-content-center">
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
              {/* <Sider /> */}
            </div>
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12 mt-5">
              <div className="main shadow-none">
                <div className="row shadow-none ">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Buy User ID</h4>
                      <p className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp;
                        <span
                          className="text-body-secondary"
                          style={{ fontSize: "13px" }}
                        >
                          Buy User ID
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center pe-4">
                  <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-12 col-sm-12 rounded px-3">
                    <form
                      onSubmit={
                        formData.paymentMethod == "Online"
                          ? handleSubmitOnline
                          : handleSubmit
                      }
                    >
                      <div className="guidline px-3 py-4 mt-4 shadow bg-body-tertiary rounded">
                        <div className="col-xl-8 mx-auto">
                          <label htmlFor="userId" className="form-label">
                            Your User ID
                          </label>
                          <div className="input-group flex-nowrap">
                            <span className="input-group-text">
                              <FaUser />
                            </span>
                            <input
                              type="text"
                              id="userId"
                              className="form-control"
                              value={formData.userId}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-xl-8 mx-auto mt-3">
                          <label htmlFor="userId_type" className="form-label">
                            Select User ID Type
                          </label>
                          <select
                            className="form-select"
                            value={formData.userId_type}
                            onChange={(e) => {
                              const userId_type = e.target.value;
                              setFormData({
                                ...formData,
                                userId_type: userId_type,
                                idPrice: idPrice.distributor_id_price,
                              });
                            }}
                          >
                            <option value="">Select...</option>

                            <option value="retailer">Retailer</option>
                            <option value="distributor">Distributor</option>
                            <option value="SuperDistributor">
                              Super Distributor
                            </option>
                            <option value="whiteLabel">White Label</option>
                          </select>
                        </div>

                        {formData.userId_type && (
                          <div className="col-xl-8 mx-auto mt-3">
                            <label htmlFor="availableId" className="form-label">
                              Available {formData.userId_type} ID
                            </label>
                            <input
                              type="number"
                              id="availableId"
                              className="form-control"
                              value={
                                formData.userId_type === "distributor"
                                  ? remainingIds.remaining_distributor_id
                                  : formData.userId_type === "whiteLabel"
                                  ? remainingIds.remaining_whitelable_id
                                  : formData.userId_type === "retailer"
                                  ? remainingIds.remaining_retailer_id
                                  : formData.userId_type === "SuperDistributor"
                                  ? remainingIds.remaining_superDistributor_id
                                  : ""
                              }
                              disabled
                            />
                          </div>
                        )}

                        <div className="col-xl-8 mx-auto mt-3">
                          <label htmlFor="noOfId" className="form-label">
                            No. Of ID For Purchase
                          </label>
                          <input
                            type="number"
                            id="noOfId"
                            className="form-control"
                            value={formData.noOfId}
                            // min={idPrice.distributor_min_id_limit}
                            min={
                              formData.userId_type === "distributor"
                                ? idPrice.distributor_min_id_limit
                                : formData.userId_type === "whiteLabel"
                                ? idPrice.whiteLabel_min_id_limit
                                : formData.userId_type === "retailer"
                                ? idPrice.retailer_min_id_limit
                                : formData.userId_type === "SuperDistributor"
                                ? idPrice.superDistributor_min_id_limit
                                : ""
                            }
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                noOfId: Math.max(0, e.target.value),
                              })
                            }
                          />
                        </div>

                        {/* <div className="col-xl-8 mx-auto mt-3">
                          <label htmlFor="noOfId" className="form-label">
                            No. Of ID For Purchase
                          </label>
                          <input
                            type="number"
                            id="noOfId"
                            className="form-control"
                            value={formData.noOfId}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;

                              if (value < 2) {
                                Swal.fire({
                                  icon: "warning",
                                  title: "Invalid Input",
                                  text: "You must purchase at least 2 IDs.",
                                }).then(() => {
                                  setFormData({
                                    ...formData,
                                    noOfId: "",
                                  });
                                });
                              } else if (value > 10) {
                                Swal.fire({
                                  icon: "warning",
                                  title: "Invalid Input",
                                  text: "You can purchase a maximum of 10 IDs.",
                                }).then(() => {
                                  setFormData({
                                    ...formData,
                                    noOfId: "",
                                  });
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  noOfId: value,
                                });
                              }
                            }}
                          />
                        </div> */}

                        <div className="col-xl-8 mx-auto mt-3">
                          <label htmlFor="totalAmount" className="form-label">
                            Total Amount
                          </label>
                          <input
                            type="number"
                            id="totalAmount"
                            className="form-control"
                            value={calculateTotalAmount()}
                            disabled
                          />
                        </div>

                        <div className="col-xl-8 mx-auto mt-3">
                          <label htmlFor="paymentMethod" className="form-label">
                            Payment Method
                          </label>
                          <select
                            className="form-select"
                            value={formData.paymentMethod}
                            onChange={handlePaymentMethodChange}
                          >
                            <option value="">Select Payment Method</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Wallet</option>
                          </select>
                        </div>

                        <div className="col-xl-12 text-center mt-4">
                          <button
                            className="btn btn-primary p-2"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Buy ID"}
                          </button>
                        </div>
                      </div>
                    </form>
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

export default BuyUserId;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
`;
