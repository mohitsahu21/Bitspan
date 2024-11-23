import React, { useState } from "react";
import styled from "styled-components";
import { FaRupeeSign } from "react-icons/fa";
import { TbTransactionRupee } from "react-icons/tb";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AddMoneyOffline = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    user_id: currentUser.userId,
    amount: "",
    userName: currentUser.username,
    userPhone: currentUser.ContactNo,
    userEmail: currentUser.email,
    userRole: currentUser.role,
    Payment_Mode: "",
    Transaction_Reference: "",
  });
  const [receiptAttachment, setReceiptAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setReceiptAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = new FormData();
      // Append form fields
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      // Append file
      if (receiptAttachment) {
        data.append("Receiept_Attechment", receiptAttachment);
      }

      const response = await axios.post(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/add-money-wallet",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 ms-md-10 ps-md-5 col-9
                             mt-5 formdata"
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ms-lg-5">
                      {/* <div className="text-center">
                                                <h3>Add Money To Wallet Offline</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5  px-lg-5  px-xl-5">
                          Add Money To Wallet Offline
                        </h4>
                        <h6 className="">
                          <BiHomeAlt /> &nbsp; / &nbsp; Add Money To Wallet
                          Offline
                        </h6>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row justify-content-lg-end justify-content-center pe-lg-4">
                      <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-10 col-sm-10 shadow   bg-body-tertiary rounded m-4 px-3 py-5">
                        <div className="row d-flex flex-column g-4">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-floating">
                              <select
                                class="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                name="Payment_Mode"
                                value={formData.Payment_Mode}
                                onChange={handleChange}
                                required
                              >
                                <option selected>Choose Bank</option>
                                <option value="UPI ID">UPI ID</option>
                                <option value="QR Code">QR Code</option>
                              </select>
                              <label for="floatingSelect">
                                Select Payment Mode
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
                                  placeholder="Mobile Number"
                                  name="amount"
                                  value={formData.amount}
                                  onChange={handleChange}
                                  required
                                />
                                <label for="floatingInputGroup2">
                                  Amount in Rs. {"(Min 100/-)"}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <span class="input-group-text">
                                <TbTransactionRupee />
                              </span>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="floatingInputGroup2"
                                  name="Transaction_Reference"
                                  placeholder="Transaction Reference"
                                  value={formData.Transaction_Reference}
                                  onChange={handleChange}
                                />
                                <label for="floatingInputGroup2">
                                  Transaction Reference (If any)
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div>
                              <label for="formFileLg" class="form-label">
                                Receiept Attechment
                              </label>
                              <input
                                class="form-control form-control-lg"
                                id="formFileLg"
                                type="file"
                                name="Receiept_Attechment"
                                onChange={handleFileChange}
                                accept="image/*"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="text-start mb-3">
                              <button className="btn p-2" disabled={isLoading}>
                                {isLoading
                                  ? "Processing..."
                                  : "Add Wallet Amount Request"}
                              </button>
                            </div>
                          </div>
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

export default AddMoneyOffline;

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
