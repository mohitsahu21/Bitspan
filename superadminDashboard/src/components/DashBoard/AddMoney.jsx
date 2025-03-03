import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {  fetchWalletBalance } from "../../redux/user/userSlice";
const AddMoney = () => {
   const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const { walletBalance } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fullUrl = window.location.href;
  console.log(fullUrl)
  const [formData, setFormData] = useState({
    user_id: currentUser.userId,
    amount: "",
    userName: currentUser.username,
    userPhone: currentUser.ContactNo,
    userEmail: currentUser.email,
    userRole: currentUser.role,
    Payment_Mode: "",
    website: fullUrl,
  });


  useEffect(()=>{
    if (currentUser?.userId) {
            dispatch(fetchWalletBalance(currentUser.userId));
          }
  },[])


  const [receiptAttachment, setReceiptAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    if (name === "amount") {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
    else {
      setFormData({
        ...formData,
        [name] : value,
      });
    }
  };

  const handleFileChange = (e) => {
    setReceiptAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.amount < 100){
      Swal.fire({
        title: "Error",
        text:
         "Minimum amount is 100",
        icon: "error",
      });
      return
    }
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

      // const response = await axios.post(
      //   "https://2kadam.co.in/api/auth/retailer/add-money-wallet",
      //   data,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      const response = await axios.post(
        "https://2kadam.co.in/api/auth/upiwf/createOrderToAddWalletMoney",
        // "http://localhost:7777/api/auth/superAdmin/createOrderToAddWalletMoney",
        formData
      );
    console.log(response)
      // alert(response.data.message);
     
      if(response.data.status){
        Swal.fire({
          title: "Payment Link Created Successfully",
          text: `Your Order Id is ${response.data.data.result.orderId}`,
          icon: "success",
        }).then(() => {
          // Navigate to the payment URL after closing the alert
          // window.location.href = response.data.data.result.payment_url; 
          window.open(response.data.data.result.payment_url, "_blank");
        });
        // navigate(`/${response.data.data.result.payment_url}`)
        setFormData({
          user_id: currentUser.userId,
          amount: "",
          userName: currentUser.username,
          userPhone: currentUser.ContactNo,
          userEmail: currentUser.email,
          userRole: currentUser.role,
          Payment_Mode: "",
          website: fullUrl,
        });

      }

      // Swal.fire({
      //   title: "Form Submitted Successfully",
      //   text: response.data.message,
      //   icon: "success",
      // });
      
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
      alert("Failed to submit form. Please try again.");
      Swal.fire({
        title: "Error",
        text:
          error.response?.data || "Failed to submit form. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Wrapper>
        <div className="main ">
          <div className="container-fluid">
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
                        <h3>Add Money To Wallet</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5  px-lg-5  px-xl-5">
                          Add Money To Wallet
                        </h4>
                        <h6 className="">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp; Add Money To Wallet
                        </h6>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="row justify-content-lg-end justify-content-center pe-lg-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-10 col-sm-10 shadow bg-body-tertiary rounded m-4 px-3 py-5">
                      <div className="row d-flex flex-column g-4">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="input-group mb-3">
                            <span class="input-group-text">
                              <MdOutlineFormatListNumbered />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup1"
                                placeholder="Transaction Number"
                                readOnly
                                value={currentUser.userId}
                              />
                              <label for="floatingInputGroup1">
                                Your User Id
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
                                placeholder="Enter Amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                min={100}
                              />
                              <label for="floatingInputGroup2">
                                Amount in Rs. {"(Min 100/-)"}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <p className="fw-bold">
                            Wallet Available Amount : Rs. {walletBalance}
                          </p>
                        </div>

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
                              <option selected value="">Select Payment Method</option>
                              <option value="Online">Online</option>
                              {/* <option value="2">
                                Debit Card/ Credit Card / Netbanking
                              </option> */}
                            </select>
                            <label for="floatingSelect">Payment Method</label>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <p className="m-0">UPI Payment - Free</p>
                          {/* <p className="m-0">
                            Debit Card/ Credit Card / Netbanking - 3% Additional
                            Charges
                          </p> */}
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="text-start mb-3">
                          <button className="btn btn-primary p-2" disabled={isLoading}>
                                {isLoading
                                  ? "Processing..."
                                  : "Pay Now"}
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

export default AddMoney;

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
