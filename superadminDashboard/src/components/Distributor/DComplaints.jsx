import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";

const DComplaints = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [formData, setFormData] = useState({
    complainType: "",
    transactionNo: "",
    mobileNo: "",
    remark: "",
    userID: user.userId,
    status: "Pending",
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "mobileNo" && /^\d{0,10}$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name !== "mobileNo") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("complainType", formData.complainType);
    data.append("transactionNo", formData.transactionNo);
    data.append("mobileNo", formData.mobileNo);
    data.append("remark", formData.remark);
    data.append("userID", formData.userID);
    data.append("status", formData.status);
    data.append("attachment", file);
    try {
      const res = await axios.post(
        "http://localhost:7171/api/auth/superDistributor/makeComplaints",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData({
        complainType: "",
        transactionNo: "",
        mobileNo: "",
        remark: "",
      });
      setFile(null);
      alert("complaint submitted successfully");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Raise Complaint</h4>
                        <h6 className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp; Raise Complaint{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                      <div className="text-center">
                        <h4>Enter All Correct Details For Raising Ticket</h4>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                            name="complainType"
                            value={formData.complainType}
                            onChange={handleChange}
                            required
                          >
                            <option selected>Select complaint type</option>
                            <option value="coupon issue">Coupon Issue</option>
                            <option value="UTI PAN Debit">UTI PAN Debit</option>
                            <option value="UTI PAN Refund">
                              UTI PAN Refund
                            </option>
                            <option value="NSDL Refund">NSDL Refund</option>
                            <option value="Recharge Refund">
                              Recharge Refund
                            </option>
                            <option value="Account Support">
                              Account Support
                            </option>
                            <option value="Report A Bug">Report a Bug</option>
                            <option value="Feature Support">
                              Feature Support
                            </option>
                            <option value="API Support">API Support</option>
                            <option value="Other">Others</option>
                          </select>
                          <label htmlFor="floatingSelect">Complaint Type</label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <MdOutlineFormatListNumbered />
                          </span>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInputGroup1"
                              placeholder="Username"
                              name="transactionNo"
                              required
                              onChange={handleChange}
                              value={formData.transactionNo}
                            />
                            <label htmlFor="floatingInputGroup1">
                              Transaction Number
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaMobileAlt />
                          </span>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInputGroup1"
                              placeholder="Username"
                              required
                              name="mobileNo"
                              value={formData.mobileNo}
                              onChange={handleChange}
                            />
                            <label htmlFor="floatingInputGroup1">
                              Mobile Number
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="input-group">
                          <span className="input-group-text">
                            <RiMarkPenLine />
                          </span>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInputGroup1"
                              placeholder="Username"
                              required
                              name="remark"
                              value={formData.remark}
                              onChange={handleChange}
                            />
                            <label htmlFor="floatingInputGroup1">Remarks</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div>
                          <label htmlFor="formFileLg" className="form-label">
                            Attechment
                          </label>
                          <input
                            className="form-control form-control-lg"
                            id="formFileLg"
                            type="file"
                            required
                            onChange={handleFileChange}
                          />
                          {file && <p>Selected File: {file.name}</p>}
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="text-start mb-3">
                          <button className="btn btn-warning p-2">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>{" "}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default DComplaints;

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
`;
