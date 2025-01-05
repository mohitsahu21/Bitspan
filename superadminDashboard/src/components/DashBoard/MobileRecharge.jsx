import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { toggleRefresh } from "../../redux/user/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Spinner } from "react-bootstrap";

const MobileRecharge = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("tab1");
  const [apiData, setApiData] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  // console.log(currentUser.userId);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [formData, setFormData] = useState({
    // opcode: "",
    operatorName: "",
    number: "",
    amount: "",
    recharge_Type: "Prepaid",
    created_by_userid: currentUser.userId,
    // orderid: "4654747",
  });

  console.log(formData);

  const [offlineForm, setOfflineForm] = useState({
    mobile_no: "",
    operator_name: "",
    amount: "",
    recharge_Type: "Prepaid",
    userId: currentUser.userId,
  });

  console.log(offlineForm);
  const [response, setResponse] = useState(null);
  const [responseForm, setResponseForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const [selectedOperator, setSelectedOperator] = useState(""); // This State use for Fetch Plan
  const [selectedCircle, setSelectedCircle] = useState(""); // This State use for Fetch Plan
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecharge, setIsRecharge] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);

  const operatorOptions = [
    { name: "Airtel", value: "Airtel" },
    { name: "BSNL STV", value: "BSNL STV" },
    { name: "BSNL TOPUP", value: "BSNL TOPUP" },
    // { name: "Airtel Postpaid", value: "Airtel Postpaid" },
    // { name: "BSNL Postpaid", value: "BSNL Postpaid" },
    { name: "Jio", value: "Jio" },
    // { name: "Jio Postpaid", value: "Jio Postpaid" },
    { name: "Vi", value: "Vi" },
    // { name: "Vi Postpaid", value: "Vi Postpaid" },
  ];

  const operatorCircle = [
    { ID: 1, Name: "DELHI", CircleCode: "10" },
    { ID: 2, Name: "UP(West)", CircleCode: "97" },
    { ID: 3, Name: "PUNJAB", CircleCode: "02" },
    { ID: 4, Name: "HP", CircleCode: "03" },
    { ID: 5, Name: "HARYANA", CircleCode: "96" },
    { ID: 6, Name: "J&K", CircleCode: "55" },
    { ID: 7, Name: "UP(East)", CircleCode: "54" },
    { ID: 8, Name: "MUMBAI", CircleCode: "92" },
    { ID: 9, Name: "MAHARASHTRA", CircleCode: "90" },
    { ID: 10, Name: "GUJARAT", CircleCode: "98" },
    { ID: 11, Name: "MP", CircleCode: "93" },
    { ID: 12, Name: "RAJASTHAN", CircleCode: "70" },
    { ID: 13, Name: "KOLKATTA", CircleCode: "31" },
    { ID: 14, Name: "West Bengal", CircleCode: "51" },
    { ID: 15, Name: "ORISSA", CircleCode: "53" },
    { ID: 16, Name: "ASSAM", CircleCode: "56" },
    { ID: 17, Name: "NESA", CircleCode: "16" },
    { ID: 18, Name: "BIHAR", CircleCode: "52" },
    { ID: 19, Name: "KARNATAKA", CircleCode: "06" },
    { ID: 20, Name: "CHENNAI", CircleCode: "40" },
    { ID: 21, Name: "TAMIL NADU", CircleCode: "94" },
    { ID: 22, Name: "KERALA", CircleCode: "95" },
    { ID: 23, Name: "AP", CircleCode: "49" },
    { ID: 24, Name: "SIKKIM", CircleCode: "99" },
    { ID: 25, Name: "TRIPURA", CircleCode: "100" },
    { ID: 26, Name: "CHHATISGARH", CircleCode: "101" },
    { ID: 27, Name: "GOA", CircleCode: "102" },
    { ID: 28, Name: "MEGHALAY", CircleCode: "103" },
    { ID: 29, Name: "MIZZORAM", CircleCode: "104" },
    { ID: 30, Name: "JHARKHAND", CircleCode: "105" },
  ];

  const unifiedOperatorList = [
    { name: "Airtel", value: "Airtel", OpCode: "2" },
    { name: "BSNL STV", value: "BSNL STV", OpCode: "4" },
    { name: "BSNL TOPUP", value: "BSNL TOPUP", OpCode: "5" },
    { name: "Jio", value: "Jio", OpCode: "11" },
    { name: "Vi", value: "Vi", OpCode: "6" },
  ];

  const operatorCode = [
    { ID: 1, Name: "Airtel", OpCode: "2", Type: "PREPAID" },
    { ID: 2, Name: "BSNL TOPUP", OpCode: "4", Type: "PREPAID" },
    { ID: 3, Name: "BSNL SPECIAL", OpCode: "5", Type: "PREPAID" },
    { ID: 4, Name: "IDEA", OpCode: "6", Type: "PREPAID" },
    { ID: 5, Name: "RELIANCE JIO", OpCode: "11", Type: "PREPAID" },
  ];

  const fetchPlanData = async () => {
    setIsRecharge(false);
    setLoadingPlans(true);
    if (!selectedOperator || !selectedCircle) {
      alert("Please select both operator and circle!");
      return;
    }

    try {
      const response = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/fetch/plan/getMobilePlans?operatorCode=${selectedOperator}&circleCode=${selectedCircle}`
      );
      const data = response.data;

      if (data.ERROR === "0" && data.STATUS === "0") {
        // Define plan type based on selected operator
        let planCategory = "";
        switch (data.Operator) {
          case "RELIANCE JIO":
            planCategory = "Polular Plans ";
            break;
          case "Airtel":
            planCategory = "Data";
            break;
          case "IDEA":
            planCategory = "Unlimited ";
            break;
          case "BSNL TOPUP":
          case "BSNL SPECIAL":
            planCategory = "Unlimited Plans";
            break;
          default:
            alert("Unsupported operator!");
            return;
        }

        // Extract plans
        const plans = data.RDATA[planCategory] || [];
        if (plans.length > 0) {
          setPlans(plans);
          setIsModalOpen(true); // Open modal to display plans
        } else {
          alert("No plans available for the selected operator and circle.");
          setPlans([]);
        }
      } else {
        alert("No plans available or an error occurred!");
        setPlans([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching plans:", error);
      alert("Failed to fetch plans. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:7777/api/auth/retailer/getAllRechargeApi`
          `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getAllRechargeApi`
        );
        if (response.data.status === "Success") {
          console.log(response.data.data);
          setApiData(response.data.data);
        }
      } catch (error) {
        console.log(`Error In API URLs accessing data ${error}`);
      }
    };

    fetchData();
  }, []);

  // console.log(apiData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeForm = (e) => {
    setOfflineForm({
      ...offlineForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRecharge) {
      return;
    }

    setLoading(true);
    let success = false;

    for (const api of apiData) {
      try {
        const result = await axios.post(api.API_URL, formData);

        if (result.data && result.data.message === "Recharge successful") {
          Swal.fire({
            title: "Done!",
            text: "Recharge Successful",
            icon: "success",
          });
          setResponse(result.data);
          success = true;
          break;
        } else if (
          result.data.rechargeData &&
          result.data.rechargeData.status === "Failure"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong with this API!",
          });
        }
      } catch (error) {
        console.error(
          "Error in recharge:",
          error.response ? error.response.data : error.message
        );
      }
    }

    if (!success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All providers are currently unavailable. Please try again later.",
      });
    }

    setLoading(false);
  };

  // const handlesubmitForm = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const result = await axios.post(
  //       // "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/offline-recharge",
  //       "http://localhost:7777/api/auth/wallet/offlineRechargeAndUpdateWallet",
  //       offlineForm
  //     );
  //     setResponseForm(result.data); // Update the response state with the received data
  //     console.log(result.data);
  //     if (result.data.status === "Failure") {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: result.data.error || result.data.message,
  //         // footer: '<a href="#">Why do I have this issue?</a>',
  //       });
  //     } else if (result.data.status === "Success") {
  //       Swal.fire({
  //         title: "Done!",
  //         text: "Recharge Successfull",
  //         icon: "success",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error in recharge:",
  //       error.response ? error.response.data : error.message
  //     );
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong!",
  //       footer: '<a href="#">Why do I have this issue?</a>',
  //     });
  //     setResponseForm(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlesubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make the API call
      const result = await axios.post(
        // "http://localhost:7777/api/auth/wallet/offlineRechargeAndUpdateWallet",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/wallet/offlineRechargeAndUpdateWallet",
        offlineForm
      );

      setResponseForm(result.data);
      console.log("API Response:", result.data);

      if (result.data.status === "Failure") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.data.error || result.data.message || "Recharge failed!",
        });
      } else if (result.data.status === "Success") {
        Swal.fire({
          title: "Done!",
          text: `Recharge Successful! Order ID: ${result.data.details.recharge.orderId}`,
          icon: "success",
        });
        setOfflineForm({
          mobile_no: "",
          operator_name: "",
          amount: "",
        });
      }
    } catch (error) {
      console.error(
        "Error in recharge:",
        error.response ? error.response.data : error.message
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
      setResponseForm(null);
    } finally {
      setLoading(false);
    }
  };

  // PIN Integration
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
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verify-pin`,
        { user_id: currentUser.userId || "", pin: pin.join("") }
      );

      if (response.data.success) {
        return true;
      } else {
        alert(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      alert("Error verifying PIN");
      return false;
    }
  };

  const handleModalSubmit = async (e) => {
    setIsVerifying(true);
    const isPinValid = await verifyPin();
    setIsVerifying(false);
    if (isPinValid) {
      setShowPinModal(false);
      handlesubmitForm(e);
      // handleSubmit(e);
      setPin(["", "", "", ""]);
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
        {/* <HeadBar /> */}
        {/* {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Loading />
          </div>
        ) : ( */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-12 col-lg-12 col-md-12  col-sm-12  col-11
                             mt-5 formdata"
              >
                <div className="main shadow-none">
                  <div className="row shadow-none mb-5">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Prepaid Recharge
                        </h4>
                        <h6 className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp; / &nbsp; Prepaid Recharge
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="circle-nav">
                    <button
                      className={`circle-btn ${
                        activeTab === "tab1" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("tab1")}
                    >
                      Provider 1
                    </button>
                    <button
                      className={`circle-btn ${
                        activeTab === "tab2" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("tab2")}
                    >
                      Provider 2
                    </button>
                  </div>
                  <div className="tab-content">
                    <div
                      className={`tab-pane ${
                        activeTab === "tab1" ? "active" : ""
                      }`}
                    >
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-md-8 col-lg-6 col-xl-6">
                            <div className="card bg-body-tertiary shadow">
                              <div className="p-4">
                                <div className="text-center">
                                  <h3 className="mb-4">Prepaid Recharge</h3>
                                  <div>
                                    {/* {loading ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          // height: "40vh",
                                        }}
                                      >
                                        <Loading />
                                      </div>
                                    ) : ( */}

                                    <form onSubmit={handleSubmit}>
                                      <div class="input-group mb-3">
                                        <span class="input-group-text">
                                          <FaMobileAlt />
                                        </span>
                                        <div class="form-floating">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="floatingInputGroup1"
                                            placeholder="Username"
                                            value={formData.number}
                                            onChange={handleChange}
                                            name="number"
                                            autoComplete="off"
                                          />
                                          <label for="floatingInputGroup1">
                                            Mobile Number
                                          </label>
                                        </div>
                                      </div>

                                      {/* ---------Fetch Plan Inputs------ */}

                                      <div className="input-group mb-3">
                                        <div className="form-floating">
                                          <select
                                            className="form-select"
                                            id="floatingSelectPlanOperator"
                                            aria-label="Select Operator"
                                            value={selectedOperator}
                                            onChange={(e) => {
                                              const selectedOp =
                                                unifiedOperatorList.find(
                                                  (op) =>
                                                    op.OpCode === e.target.value
                                                );
                                              setSelectedOperator(
                                                e.target.value
                                              );
                                              setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                operatorName: selectedOp
                                                  ? selectedOp.name
                                                  : "",
                                              }));
                                            }}
                                          >
                                            <option value="">
                                              Select Operator
                                            </option>
                                            {unifiedOperatorList.map((op) => (
                                              <option
                                                key={op.value}
                                                value={op.OpCode}
                                              >
                                                {op.name}
                                              </option>
                                            ))}
                                          </select>
                                          <label htmlFor="floatingSelectPlanOperator">
                                            Select Plan Operator
                                          </label>
                                        </div>
                                      </div>

                                      <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <select
                                            class="form-select"
                                            id="floatingSelectOperator"
                                            aria-label="Select Operator"
                                            value={selectedCircle}
                                            onChange={(e) =>
                                              setSelectedCircle(e.target.value)
                                            }
                                          >
                                            <option value="">
                                              Select Operator
                                            </option>
                                            {operatorCircle.map((opitem) => (
                                              <>
                                                <option
                                                  key={opitem.ID}
                                                  value={opitem.CircleCode}
                                                >
                                                  {opitem.Name}
                                                </option>
                                              </>
                                            ))}
                                          </select>
                                          <label for="floatingSelectOperator">
                                            Select Operator Circle
                                          </label>
                                        </div>
                                      </div>

                                      <div className="text-start mt-2 mb-3">
                                        <button
                                          className="btn btn-none text-light"
                                          style={{
                                            backgroundColor: "#6d70ff",
                                          }}
                                          onClick={fetchPlanData}
                                          disabled={loadingPlans}
                                        >
                                          {loadingPlans
                                            ? "Checking Plans..."
                                            : "Check Plans"}
                                        </button>
                                      </div>

                                      {isModalOpen && (
                                        <div
                                          className="modal fade show"
                                          style={{
                                            display: "block",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                          }}
                                          tabIndex="-1"
                                        >
                                          <div className="modal-dialog">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title">
                                                  Available Plans
                                                </h5>
                                                <button
                                                  type="button"
                                                  className="btn-close"
                                                  onClick={() => {
                                                    setIsModalOpen(false);
                                                    setLoadingPlans(false);
                                                  }}
                                                ></button>
                                              </div>
                                              <div className="modal-body">
                                                {plans.length > 0 ? (
                                                  <ul className="list-group">
                                                    {plans.map(
                                                      (plan, index) => (
                                                        <li
                                                          key={index}
                                                          className="list-group-item"
                                                          onClick={() => {
                                                            setFormData(
                                                              (
                                                                prevFormData
                                                              ) => ({
                                                                ...prevFormData,
                                                                amount: plan.rs,
                                                              })
                                                            );
                                                            setIsModalOpen(
                                                              false
                                                            );
                                                            setLoadingPlans(
                                                              false
                                                            );
                                                          }}
                                                          style={{
                                                            cursor: "pointer",
                                                          }}
                                                        >
                                                          <p>
                                                            <strong>
                                                              Price:
                                                            </strong>{" "}
                                                            ₹{plan.rs}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Validity:
                                                            </strong>{" "}
                                                            {plan.validity}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Description:
                                                            </strong>{" "}
                                                            {plan.desc}
                                                          </p>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                ) : (
                                                  <p>No plans available.</p>
                                                )}
                                              </div>
                                              <div className="modal-footer">
                                                <button
                                                  type="button"
                                                  className="btn btn-secondary"
                                                  onClick={() => {
                                                    setIsModalOpen(false);
                                                    setLoadingPlans(false);
                                                  }}
                                                >
                                                  Close
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* ------Fetch Plan Inputs--------- */}

                                      <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="floatingInputGroup1"
                                            placeholder="Username"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            name="amount"
                                            autoComplete="off"
                                          />
                                          <label for="floatingInputGroup1">
                                            Amount
                                          </label>
                                        </div>
                                      </div>

                                      <div className="text-start mt-2 mb-3">
                                        <button
                                          className="btn btn-none text-light"
                                          style={{
                                            backgroundColor: "#6d70ff",
                                          }}
                                          type="submit"
                                          onClick={() => setIsRecharge(true)}
                                        >
                                          Recharge Now
                                        </button>
                                      </div>
                                    </form>
                                    {/*  )} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`tab-pane ${
                        activeTab === "tab2" ? "active" : ""
                      }`}
                    >
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-md-8 col-lg-6 col-xl-6">
                            <div className="card bg-body-tertiary shadow">
                              <div className="p-4">
                                <div className="text-center">
                                  <h3 className="mb-4">Prepaid Recharge 2</h3>
                                  <div>
                                    <form onSubmit={openPinModal}>
                                      <div class="input-group mb-3">
                                        <span class="input-group-text">
                                          <FaMobileAlt />
                                        </span>
                                        <div class="form-floating">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="floatingInputGroup1"
                                            placeholder="Username"
                                            value={offlineForm.mobile_no}
                                            onChange={handleChangeForm}
                                            name="mobile_no"
                                          />
                                          <label for="floatingInputGroup1">
                                            Mobile Number
                                          </label>
                                        </div>
                                      </div>

                                      {/* ---------Fetch Plan Inputs------ */}

                                      <div className="input-group mb-3">
                                        <div className="form-floating">
                                          <select
                                            className="form-select"
                                            id="floatingSelectPlanOperator"
                                            aria-label="Select Operator"
                                            value={selectedOperator}
                                            onChange={(e) => {
                                              const selectedOp =
                                                unifiedOperatorList.find(
                                                  (op) =>
                                                    op.OpCode === e.target.value
                                                );
                                              setSelectedOperator(
                                                e.target.value
                                              );
                                              setOfflineForm(
                                                (prevFormData) => ({
                                                  ...prevFormData,
                                                  operator_name: selectedOp
                                                    ? selectedOp.name
                                                    : "",
                                                })
                                              );
                                            }}
                                          >
                                            <option value="">
                                              Select Operator
                                            </option>
                                            {unifiedOperatorList.map((op) => (
                                              <option
                                                key={op.value}
                                                value={op.OpCode}
                                              >
                                                {op.name}
                                              </option>
                                            ))}
                                          </select>
                                          <label htmlFor="floatingSelectPlanOperator">
                                            Select Plan Operator
                                          </label>
                                        </div>
                                      </div>

                                      <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <select
                                            class="form-select"
                                            id="floatingSelectOperator"
                                            aria-label="Select Operator"
                                            value={selectedCircle}
                                            onChange={(e) =>
                                              setSelectedCircle(e.target.value)
                                            }
                                          >
                                            <option value="">
                                              Select Operator
                                            </option>
                                            {operatorCircle.map((opitem) => (
                                              <>
                                                <option
                                                  key={opitem.ID}
                                                  value={opitem.CircleCode}
                                                >
                                                  {opitem.Name}
                                                </option>
                                              </>
                                            ))}
                                          </select>
                                          <label for="floatingSelectOperator">
                                            Select Operator Circle
                                          </label>
                                        </div>
                                      </div>

                                      <div className="text-start mt-2 mb-3">
                                        <button
                                          className="btn btn-none text-light"
                                          style={{
                                            backgroundColor: "#6d70ff",
                                          }}
                                          onClick={fetchPlanData}
                                          disabled={loadingPlans}
                                        >
                                          {loadingPlans
                                            ? "Checking Plans..."
                                            : "Check Plans"}
                                        </button>
                                      </div>

                                      {isModalOpen && (
                                        <div
                                          className="modal fade show"
                                          style={{
                                            display: "block",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                          }}
                                          tabIndex="-1"
                                        >
                                          <div className="modal-dialog">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title">
                                                  Available Plans
                                                </h5>
                                                <button
                                                  type="button"
                                                  className="btn-close"
                                                  onClick={() => {
                                                    setIsModalOpen(false);
                                                    setLoadingPlans(false);
                                                  }}
                                                ></button>
                                              </div>
                                              <div className="modal-body">
                                                {plans.length > 0 ? (
                                                  <ul className="list-group">
                                                    {plans.map(
                                                      (plan, index) => (
                                                        <li
                                                          key={index}
                                                          className="list-group-item"
                                                          onClick={() => {
                                                            setOfflineForm(
                                                              (
                                                                prevFormData
                                                              ) => ({
                                                                ...prevFormData,
                                                                amount: plan.rs,
                                                              })
                                                            );
                                                            setIsModalOpen(
                                                              false
                                                            );
                                                            setLoadingPlans(
                                                              false
                                                            );
                                                          }}
                                                          style={{
                                                            cursor: "pointer",
                                                          }}
                                                        >
                                                          <p>
                                                            <strong>
                                                              Price:
                                                            </strong>{" "}
                                                            ₹{plan.rs}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Validity:
                                                            </strong>{" "}
                                                            {plan.validity}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Description:
                                                            </strong>{" "}
                                                            {plan.desc}
                                                          </p>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                ) : (
                                                  <p>No plans available.</p>
                                                )}
                                              </div>
                                              <div className="modal-footer">
                                                <button
                                                  type="button"
                                                  className="btn btn-secondary"
                                                  onClick={() => {
                                                    setIsModalOpen(false);
                                                    setLoadingPlans(false);
                                                  }}
                                                >
                                                  Close
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* ------Fetch Plan Inputs--------- */}

                                      {/* <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <select
                                            class="form-select"
                                            id="floatingSelectOperator"
                                            value={offlineForm.operator_name}
                                            onChange={handleChangeForm}
                                            name="operator_name"
                                            aria-label="Select Operator"
                                          >
                                            <option value="">
                                              Select Operator
                                            </option>
                                            {operatorOptions.map((item) => (
                                              <>
                                                <option value={item.value}>
                                                  {item.name}
                                                </option>
                                              </>
                                            ))}
                                          </select>
                                          <label for="floatingInputGroup1">
                                            Select Operator
                                          </label>
                                        </div>
                                      </div> */}
                                      <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="floatingInputGroup1"
                                            placeholder="Username"
                                            value={offlineForm.amount}
                                            onChange={handleChangeForm}
                                            name="amount"
                                          />
                                          <label for="floatingInputGroup1">
                                            Amount
                                          </label>
                                        </div>
                                      </div>
                                      <div className="text-start mt-2 mb-3">
                                        <button
                                          className="btn btn-none text-light"
                                          type="submit"
                                          style={{
                                            backgroundColor: "#6d70ff",
                                          }}
                                        >
                                          Recharge Now
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  )} */}
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
                  onChange={(e) => handlePinChange(index, e.target.value)}
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
            <div className="w-100 d-flex justify-content-center">
              <Button
                variant="secondary"
                onClick={() => setShowPinModal(false)}
                className="mx-1"
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
            </div>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    </>
  );
};

export default MobileRecharge;
const Wrapper = styled.div`
  .circle-nav {
    width: 100%;
    display: flex;
    justify-content: center;
    @media (min-width: 360px) and (max-width: 540px) {
      flex-wrap: wrap;
      position: absolute;
      left: 0;
    }
  }

  .circle-btn {
    width: 150px;
    height: 50px;
    border-radius: 25px;
    border: 2px solid #007bff;
    background-color: #ffffff;
    color: #007bff;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .circle-btn:hover {
    background-color: #007bff;
    color: #ffffff;
  }

  .circle-btn.active {
    background-color: #007bff;
    color: #ffffff;
    border-color: #0056b3;
  }

  .tab-pane {
    display: none;
  }

  .tab-pane.active {
    display: block;
  }

  .card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.5rem;
    background-color: #ffffff;
    margin-top: 4rem;
    @media (min-width: 360px) and (max-width: 400px) {
      margin-top: 6rem;
      position: absolute;
      left: 35px;
    }
    @media (min-width: 401px) and (max-width: 500px) {
      margin-top: 6rem;
      position: absolute;
      left: 60px;
    }
    @media (min-width: 501px) and (max-width: 600px) {
      margin-top: 6rem;
      position: absolute;
      left: 110px;
    }
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  @media (min-width: 1025px) and (max-width: 1500px) {
    .formdata {
      padding-left: 15rem;
    }
  }
  @media (min-width: 1500px) {
    .formdata {
      padding-left: 15rem;
    }
  }

  .modal-content {
    border-radius: 8px;
  }
  .modal-header {
    background-color: #6d70ff;
    color: white;
  }
`;

{
  /* <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="floatingInputGroup1"
                                            placeholder="Username"
                                          />
                                          <label for="floatingInputGroup1">
                                            Select Circle
                                          </label>
                                        </div>
                                      </div>
                                      <div className="text-start mt-2 mb-3">
                                        <button
                                          className="btn btn-none text-light"
                                          style={{ backgroundColor: "#6d70ff" }}
                                        >
                                          Check Plans
                                        </button>
                                      </div> */
}

{
  /* <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="floatingInputGroup1"
                                            placeholder="Username"
                                            value={formData.opcode}
                                            onChange={handleChange}
                                            name="opcode"
                                          />
                                          <label for="floatingInputGroup1">
                                            Select Operator
                                          </label>
                                        </div>
                                      </div> */
}

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     const result = await axios.post(
//       // "https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/recharge-instpy",
//       "https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/api-recharge",
//       formData
//     );
//     setResponse(result.data); // Update the response state with the received data
//     // console.log(result.data.rechargeData.status);
//     console.log(result.data);
//     if (result.data.rechargeData.status === "Failure") {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong!",
//         // footer: '<a href="#">Why do I have this issue?</a>',
//       });
//     } else if (result.data.rechargeData.status === "Success") {
//       Swal.fire({
//         title: "Done!",
//         text: "Recharge Successfull",
//         icon: "success",
//       });
//     }
//   } catch (error) {
//     console.error(
//       "Error in recharge:",
//       error.response ? error.response.data : error.message
//     );
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Something went wrong!",
//       footer: '<a href="#">Why do I have this issue?</a>',
//     });
//     setResponse(null);
//   } finally {
//     setLoading(false); // Stop loading
//   }
// };

{
  /* <div className="plans-container">
                                      {plans.length > 0 ? (
                                        <ul className="list-group">
                                          {plans.map((plan, index) => (
                                            <li
                                              key={index}
                                              className="list-group-item"
                                            >
                                              <p>
                                                <strong>Price:</strong> ₹
                                                {plan.rs}
                                              </p>
                                              <p>
                                                <strong>Validity:</strong>{" "}
                                                {plan.validity}
                                              </p>
                                              <p>
                                                <strong>Description:</strong>{" "}
                                                {plan.desc}
                                              </p>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p>
                                          No plans available. Please select
                                          operator and circle.
                                        </p>
                                      )}
                                    </div> */
}
{
  /* <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <select
                                            class="form-select"
                                            id="floatingSelectOperator"
                                            value={formData.operatorName}
                                            onChange={handleChange}
                                            name="operatorName"
                                            aria-label="Select Operator"
                                          >
                                            <option value="">
                                              Select Operator
                                            </option>
                                            {operatorOptions.map((item) => (
                                              <>
                                                <option value={item.value}>
                                                  {item.name}
                                                </option>
                                              </>
                                            ))}
                                          </select>
                                          <label for="floatingSelectOperator">
                                            Select Operator
                                          </label>
                                        </div>
                                      </div> */
}

{
  /* <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <select
                                            class="form-select"
                                            id="floatingSelectOperator"
                                            aria-label="Select Operator"
                                            value={selectedOperator}
                                            onChange={(e) =>
                                              setSelectedOperator(
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">
                                              Select Operator
                                            </option>
                                            {operatorCode.map((opitem) => (
                                              <>
                                                <option
                                                  key={opitem.ID}
                                                  value={opitem.OpCode}
                                                >
                                                  {opitem.Name}
                                                </option>
                                              </>
                                            ))}
                                          </select>
                                          <label for="floatingSelectOperator">
                                            Select Plan Operator
                                          </label>
                                        </div>
                                      </div> */
}
