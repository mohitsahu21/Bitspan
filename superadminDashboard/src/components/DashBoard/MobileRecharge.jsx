import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const MobileRecharge = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Wrapper>
        <div className="container mt-5">
          <div className="circle-nav">
            <button
              className={`circle-btn ${activeTab === "tab1" ? "active" : ""}`}
              onClick={() => handleTabClick("tab1")}
            >
              Provider 1
            </button>
            <button
              className={`circle-btn ${activeTab === "tab2" ? "active" : ""}`}
              onClick={() => handleTabClick("tab2")}
            >
              Provider 2
            </button>
          </div>
          <div className="tab-content mt-3">
            <div className={`tab-pane ${activeTab === "tab1" ? "active" : ""}`}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-6">
                    <div className="card">
                      <div className="p-4">
                        <div className="text-center">
                          <h3 className="mb-4">Prepaid Recharge</h3>
                          <div>
                            <form action="">
                              <div class="input-group mb-3">
                                <span class="input-group-text">@</span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="Username"
                                  />
                                  <label for="floatingInputGroup1">
                                    Mobile Number
                                  </label>
                                </div>
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text">@</span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="Username"
                                  />
                                  <label for="floatingInputGroup1">
                                    Select Operator
                                  </label>
                                </div>
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text">@</span>
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
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text">@</span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="Username"
                                  />
                                  <label for="floatingInputGroup1">
                                    Amount
                                  </label>
                                </div>
                              </div>
                              <div className="text-start mt-2 mb-3">
                                <button
                                  className="btn btn-none text-light"
                                  style={{ backgroundColor: "#6d70ff" }}
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
            <div className={`tab-pane ${activeTab === "tab2" ? "active" : ""}`}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-6">
                    <div className="card">
                      <div className="p-4">
                        <div className="text-center">
                          <h3 className="mb-4">Prepaid Recharge</h3>
                          <div>
                            <form action="">
                              <div class="input-group mb-3">
                                <span class="input-group-text">@</span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="Username"
                                  />
                                  <label for="floatingInputGroup1">
                                    Mobile Number
                                  </label>
                                </div>
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text">@</span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="Username"
                                  />
                                  <label for="floatingInputGroup1">
                                    Select Operator
                                  </label>
                                </div>
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text">@</span>
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
                              </div>
                              <div class="input-group mb-3">
                                <span class="input-group-text">@</span>
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    placeholder="Username"
                                  />
                                  <label for="floatingInputGroup1">
                                    Amount
                                  </label>
                                </div>
                              </div>
                              <div className="text-start mt-2 mb-3">
                                <button
                                  className="btn btn-none text-light"
                                  style={{ backgroundColor: "#6d70ff" }}
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
      </Wrapper>
    </>
  );
};

export default MobileRecharge;
const Wrapper = styled.div`
  .circle-nav {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .circle-btn {
    width: 150px;
    height: 50px;
    border-radius: 25px; /* Rounded rectangle instead of a circle */
    border: 2px solid #007bff;
    background-color: #ffffff;
    color: #007bff;
    font-size: 16px; /* Slightly smaller font size to fit text */
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
    margin-top: 8rem;
  }
  .p-4 {
    padding: 1.5rem !important;
  }
`;
