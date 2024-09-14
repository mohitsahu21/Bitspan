import React, { useState } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";

const MobileRecharge = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [formData, setFormData] = useState({
    // opcode: "",
    operatorName: "",
    number: "",
    amount: "",
    recharge_Type: "Prepaid",
    // orderid: "4654747",
  });
  const [offlineForm, setOfflineForm] = useState({
    mobile_no: "",
    operator_name: "",
    amount: "",
    recharge_Type: "Prepaid",
    created_by_userid: "1",
  });
  const [response, setResponse] = useState(null);
  const [responseForm, setResponseForm] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const result = await axios.post(
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/recharge-instpy",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/api-recharge",
        formData
      );
      setResponse(result.data); // Update the response state with the received data
      // console.log(result.data.rechargeData.status);
      console.log(result.data);
      if (result.data.rechargeData.status === "Failure") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          // footer: '<a href="#">Why do I have this issue?</a>',
        });
      } else if (result.data.rechargeData.status === "Success") {
        Swal.fire({
          title: "Done!",
          text: "Recharge Successfull",
          icon: "success",
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
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      setResponse(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlesubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:7777/api/auth/retailer/offline-recharge",
        offlineForm
      );
      setResponseForm(result.data); // Update the response state with the received data
      console.log(result.data);
      // if (result.data.rechargeData.status === "Failure") {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "Something went wrong!",
      //     // footer: '<a href="#">Why do I have this issue?</a>',
      //   });
      // } else if (result.data.rechargeData.status === "Success") {
      //   Swal.fire({
      //     title: "Done!",
      //     text: "Recharge Successfull",
      //     icon: "success",
      //   });
      // }
    } catch (error) {
      console.error(
        "Error in recharge:",
        error.response ? error.response.data : error.message
      );
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Something went wrong!",
      //   footer: '<a href="#">Why do I have this issue?</a>',
      // });
      setResponseForm(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        {loading ? (
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
        ) : (
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

                                        <div class="input-group mb-3">
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
                                        </div>

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
                                      <form onSubmit={handlesubmitForm}>
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
                                        <div class="input-group mb-3">
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
                                        </div>
                                        {/* <div class="input-group mb-3">
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
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                          >
                                            Check Plans
                                          </button>
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
        )}
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
