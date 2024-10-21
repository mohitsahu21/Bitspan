import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import nsdlpan from "../../assets/images/nsdl-vector.png";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";

const NsdlPanCorrection = () => {
  const [formData, setFormData] = useState({
    applicationMode: "",
    selectType: "",
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    physicalPan: "",
    walletDeductAmt: "10",
    userId: "userID",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await axios.post(
        `http://localhost:7171/api/auth/instpay/nsdl-pan-correction-request`,
        formData
      );
      setFormData(apiResponse.data);
      console.log(apiResponse.data);
      if (
        apiResponse.data.message === "Successful" &&
        apiResponse.data.nsdlData.status === "Success"
      ) {
        // window.location = apiResponse.data.nsdlData.url;
        window.open(apiResponse.data.nsdlData.url, "_blank");
      } else if (apiResponse.data.message === "Failure") {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
                className="col-xxl-10 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-9
                             mt-5 "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                        <h3>NSDL Correction Apply</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-0">
                          NSDL Correction Apply
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; NSDL Correction Apply
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-center pe-4">
                    <div className="col-xxl-5 col-xl-5 col-lg-9 col-md-10 col-sm-10  rounded  px-3 mt-3">
                      <div className="text-center">
                        <img src={nsdlpan} className="img-fluid" />
                      </div>

                      <div className="guidline p-5 mt-5 shadow bg-body-tertiary rounded">
                        <h3 className="mt-2">NSDL Guidelines</h3>
                        <ul className="list mb-5">
                          <li>
                            <p>{`01) Id activated charges no refunding`}</p>
                          </li>
                          <li>
                            <p>{`02) At the time PAN apply process failed or pending casess auto refunding in 3 working days`}</p>
                          </li>
                          <li>
                            <p>{`03)NSDL instant PAN apply in only retailer login`}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xxl-7 col-xl-6 col-lg-9 col-md-10 col-sm-10 shadow bg-body-tertiary rounded  px-4 py-3 mb-3 mt-5">
                      <form onSubmit={handleSubmit}>
                        <div className="row d-flex flex-column g-4">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="applicationMode"
                                value={formData.applicationMode}
                                onChange={handleChange}
                                required
                              >
                                <option value="" disabled>
                                  Select Application Mode
                                </option>
                                <option value="Instant PAN Card">
                                  Instant PAN Card
                                </option>
                                <option value="Scan Based PAN Card">
                                  Scan Based PAN Card
                                </option>
                              </select>
                              <label for="floatingSelect">
                                Select Application Mode
                              </label>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="selectType"
                                value={formData.selectType}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  Select Category Type
                                </option>
                                <option value="Individual">Individual</option>
                              </select>
                              <label for="floatingSelect">
                                Select Category Type
                              </label>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  placeholder="Enter Name"
                                  required
                                />
                                <label for="floatingInputGroup2">
                                  Enter Name
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="date"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  placeholder="Date of Birth"
                                  name="dob"
                                  value={formData.dob}
                                  onChange={handleChange}
                                  required
                                />
                                <label for="floatingInputGroup2">
                                  Date of Birth
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                              >
                                <option value="" disabled>
                                  Select Gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                              <label for="floatingSelect">Gender</label>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="mobile"
                                  value={formData.mobile}
                                  onChange={handleChange}
                                  placeholder="Mobile Number"
                                  required
                                />
                                <label for="floatingInputGroup2">
                                  Mobile Number
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <FaRupeeSign />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="Email"
                                  required
                                />
                                <label for="floatingInputGroup2">
                                  Email Id
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="physicalPan"
                                value={formData.physicalPan}
                                onChange={handleChange}
                                required
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              <label for="floatingSelect">
                                Is Physical PAN Required?
                              </label>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <p className="fw-bold">
                              Wallet Available Amount : Rs. 200.00
                            </p>
                            <p className="fw-bold">
                              Payable Amount : Rs. 100.00
                            </p>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="text-start mb-3">
                              <button
                                className="btn p-2"
                                type="submit"
                                disabled={loading}
                              >
                                {loading ? "Processing..." : "Pay Now"}
                              </button>
                            </div>
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
    </>
  );
};

export default NsdlPanCorrection;

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
