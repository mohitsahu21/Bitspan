import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BiSolidCreditCardAlt } from "react-icons/bi";
import { BiGroup } from "react-icons/bi";
import { ImAddressBook } from "react-icons/im";
import { LuSquareCode } from "react-icons/lu";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";

const DthConnection = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    number: "",
    amount: "",
    plan_id: "",
    first_name: "",
    last_name: "",
    full_address: "",
    postal_code: "",
  });

  const [plans, setPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      ...formData,
      amount: plan.amount,
      plan_id: plan.plan_id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const operatorName = "Tata Play";
    const opcode = "TPC";

    const requestData = {
      ...formData,
      operatorName,
      opcode,
    };

    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/api-dth-recharge`,
        requestData
      );

      console.log(response.data);
    } catch (error) {
      console.log(`Error in Apply Connection ${error}`);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/dth-plan`
        );
        setPlan(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const [offlineForm, setOfflineForm] = useState({
    operatorName: "",
    first_name: "",
    last_name: "",
    full_address: "",
    postal_code: "",
    number: "",
    amount: "",
    message: "",
    user_id: "",
  });

  const handleOfflineChange = (e) => {
    const { name, value } = e.target;
    setOfflineForm({ ...offlineForm, [name]: value });
  };

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();

    const operatorName = "Tata Play";
    const opcode = "TPC";

    const requestData = {
      ...offlineForm,
      operatorName,
      opcode,
    };

    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/offline-dth-connection`,
        requestData
      );

      console.log(response.data);
    } catch (error) {
      console.log(`Error in Apply Connection ${error}`);
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
                            DTH Connection
                          </h4>
                          <h6 className="mx-lg-5">
                            {" "}
                            <BiHomeAlt /> &nbsp; / &nbsp; DTH Connection
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
                                    <h3 className="mb-4">DTH Connection</h3>
                                    <div>
                                      <form onSubmit={handleSubmit}>
                                        <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="plans"
                                              value={
                                                selectedPlan?.plan_id || ""
                                              }
                                              onChange={(e) =>
                                                handlePlanChange(
                                                  plans.find(
                                                    (plan) =>
                                                      plan.plan_id ===
                                                      e.target.value
                                                  )
                                                )
                                              }
                                            >
                                              <option value="" disabled>
                                                Select Operator
                                              </option>
                                              {plans.map((plan) => (
                                                <option
                                                  key={plan.plan_id}
                                                  value={plan.plan_id}
                                                >
                                                  {plan.details}
                                                </option>
                                              ))}
                                            </select>
                                            <label for="floatingSelectOperator">
                                              Select Operator
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="number"
                                              placeholder="Number"
                                              value={formData.number}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Mobile Number
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMoneyBillAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="amount"
                                              placeholder="Amount"
                                              value={formData.amount}
                                              onChange={handleChange}
                                              required
                                              readOnly
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Amount
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiSolidCreditCardAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="plan_id"
                                              placeholder="Plan ID"
                                              value={formData.plan_id}
                                              onChange={handleChange}
                                              required
                                              readOnly
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Plan ID
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiGroup />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="first_name"
                                              placeholder="First Name"
                                              value={formData.first_name}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              First Name
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiGroup />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="last_name"
                                              placeholder="Last Name"
                                              value={formData.last_name}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Last Name
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <ImAddressBook />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="full_address"
                                              placeholder="Full Address"
                                              value={formData.full_address}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Full Address
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <LuSquareCode />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="postal_code"
                                              placeholder="Postal Code"
                                              value={formData.postal_code}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Postal Code
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
                                            Submit Now
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
                                    <h3 className="mb-4">DTH Connection 2</h3>
                                    <div>
                                      <form onSubmit={handleOfflineSubmit}>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiGroup />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="first_name"
                                              placeholder="First Name"
                                              value={offlineForm.first_name}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              First Name
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiGroup />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="last_name"
                                              placeholder="Last Name"
                                              value={offlineForm.last_name}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Last Name
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <ImAddressBook />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="full_address"
                                              placeholder="Full Address"
                                              value={offlineForm.full_address}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Full Address
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <LuSquareCode />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="postal_code"
                                              placeholder="Postal Code"
                                              value={offlineForm.postal_code}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Postal Code
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="number"
                                              placeholder="Phone Number"
                                              value={offlineForm.number}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Phone Number
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMoneyBillAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="amount"
                                              placeholder="Amount"
                                              value={offlineForm.amount}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Amount
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="message"
                                              placeholder="Message"
                                              value={offlineForm.message}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              DTH Description
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
                                            Submit Now
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

export default DthConnection;
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
      left: 0px;
    }
    @media (min-width: 401px) and (max-width: 500px) {
      margin-top: 6rem;
      position: absolute;
      left: 1px;
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
