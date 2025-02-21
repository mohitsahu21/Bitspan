import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

const Complaints = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    complainType: "",
    transactionNo: "",
    mobileNo: "",
    remark: "",
    userID: currentUser.userId,
  });
  const [complainFile, setComplainFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
        console.log(`File input changed - Name: ${name}, Files:`, files);
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png" , "application/pdf"];
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    
         if (!allowedTypes.includes(files[0].type)) {
                    Swal.fire({
                      icon: "error",
                      title: "Invalid File Type",
                      text: `Invalid file: ${files[0].name}. Only JPEG, JPG, PNG , PDF are allowed.`,
                    });
                    e.target.value = "";
                    return;
                  }
                     if (files[0].size > maxSize) {
                          Swal.fire({
                            icon: "error",
                            title: "File Too Large",
                            text: `File ${files[0].name} exceeds the 5MB limit.`,
                          });
                          e.target.value = "";
                          return;
                        }
    setComplainFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("complainType", formData.complainType);
    data.append("transactionNo", formData.transactionNo);
    data.append("mobileNo", formData.mobileNo);
    data.append("remark", formData.remark);
    data.append("userID", formData.userID);
    if (complainFile) {
      data.append("complainFile", complainFile);
    }

    try {
      const res = await axios.post(
        // `http://localhost:7777/api/auth/retailer/complain-query`,
        `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/complain-query`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(res.data);
      setLoading(false);
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Complaint Registered Successfully!",
        text: "Your complaint has been recorded. We will get back to you shortly.",
      });
    } catch (err) {
      console.error("Error submitting the form", err);
      setResponse({ status: "Failure", message: err.message });
      setLoading(false);
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
                      {/* <div className="text-start">
                        <h3>Raise Complaint</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Raise Complaint</h4>
                        <h6 className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp; Raise Complaint{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                      <div className="text-center">
                        <h4>Enter All Correct Details For Raising Ticket</h4>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-floating">
                          <select
                            class="form-select"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                            name="complainType"
                            value={formData.complainType}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled>
                              Select complaint type
                            </option>
                            <option value="Coupon Issue">Coupon Issue</option>
                            <option value="UTI PAN Debit">UTI PAN Debit</option>
                            <option value="UTI PAN Refund">
                              UTI PAN Refund
                            </option>
                            <option value="Nsdl Refund">Nsdl Refund</option>
                            <option value="Recharge Refund">
                              Recharge Refund
                            </option>
                            <option value="Account Support">
                              Account Support
                            </option>
                            <option value="Report a Bug">Report a Bug</option>
                            <option value="Feature Support">
                              Feature Support
                            </option>
                            <option value="API Support">API Support</option>
                            <option value="Others">Others</option>
                          </select>
                          <label for="floatingSelect">Complaint Type</label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="input-group mb-3">
                          <span class="input-group-text">
                            <MdOutlineFormatListNumbered />
                          </span>
                          <div class="form-floating">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInputGroup1"
                              placeholder="Username"
                              name="transactionNo"
                              value={formData.transactionNo}
                              onChange={handleChange}
                              // required
                            />
                            <label for="floatingInputGroup1">
                              Transaction Number
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="input-group">
                          <span class="input-group-text">
                            <FaMobileAlt />
                          </span>
                          <div class="form-floating">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInputGroup1"
                              placeholder="Username"
                              name="mobileNo"
                              value={formData.mobileNo}
                              onChange={handleChange}
                              required
                            />
                            <label for="floatingInputGroup1">
                              Mobile Number
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="input-group">
                          <span class="input-group-text">
                            <RiMarkPenLine />
                          </span>
                          <div class="form-floating">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInputGroup1"
                              placeholder="Username"
                              name="remark"
                              value={formData.remark}
                              onChange={handleChange}
                              required
                            />
                            <label for="floatingInputGroup1">Remarks</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div>
                          <label for="formFileLg" class="form-label">
                            Attechment
                          </label>
                          <input
                            class="form-control form-control-lg"
                            id="formFileLg"
                            accept="image/*,application/pdf"
                            type="file"
                            name="complainFile"
                            onChange={handleFileChange}
                            // required
                          />
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="text-start mb-3">
                          <button className="btn btn-primary p-2" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
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
      </Wrapper>
    </>
  );
};

export default Complaints;

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
