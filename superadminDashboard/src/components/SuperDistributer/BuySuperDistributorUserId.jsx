import { useEffect, useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { FaHashtag, FaRupeeSign, FaUser } from "react-icons/fa";
import { LuTextSelect } from "react-icons/lu";
import { useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
  });
};

const BuySuperDistributorUserId = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [walletData, setWalletData] = useState([]);
  const [userIdCount, setUserIdCount] = useState([]);
  const [userPrice, setUserPrice] = useState([]);

  const [data, setData] = useState({
    userId: "",
    availableWhiteLabelId: "20",
  });
  const [payStats, setPayStats] = useState("");
  const [formData, setFormData] = useState({
    userId: user.userId,
    selectUserIdType: "",
    idPrice: 800,
    noOfId: "",
    paymentMethod: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // If the field is `noOfId`, apply range validation
    if (name === "noOfId") {
      const numericValue = parseInt(value, 10);
      if (numericValue < 2 || numericValue > 10) {
        return; // Prevent updating if out of range
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalAmount = formData.noOfId * formData.idPrice;

  const getWalletDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7171/api/auth/distributor/getWalletBalance/${user.userId}`
      );
      setWalletData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPrice = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:7171/api/auth/superDistributor/getUserPriceList"
      );
      setUserPrice(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData);
  console.log(walletData);
  console.log(walletData[walletData.length - 1]);

  const walletFormDetails = {
    userId: user.userId,
    Opening_Balance:
      walletData[walletData.length - 1]?.Opening_Balance - totalAmount,
    Closing_Balance:
      walletData[walletData.length - 1]?.Closing_Balance - totalAmount,
    Transaction_Type: "Payment",
    transaction_amount: totalAmount,
    Transaction_details: "buy retailer ID",
    status: "success",
  };

  const changeWalletAmount = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7171/api/auth/superDistributor/makePaymentByWallet",
        walletFormDetails
      );
      cogoToast.success("data added successfully");
      getWalletDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalUserIds = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7171/api/auth/superDistributor/getTotalUserIdCount/${user.userId}`
      );
      setUserIdCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userIdCount);

  console.log(
    typeof formData?.noOfId,
    typeof userIdCount[0]?.total_retailer_id
  );

  const userIdCountValue = {
    total_super_dist_id:
      formData?.selectUserIdType === "SuperDistributor" &&
      Number(formData?.noOfId) + userIdCount[0]?.total_super_dist_id,
    total_dist_id:
      formData?.selectUserIdType === "Distributor" &&
      Number(formData?.noOfId) + userIdCount[0]?.total_dist_id,
    total_retailer_id:
      formData?.selectUserIdType === "Retailer" &&
      Number(formData?.noOfId) + userIdCount[0]?.total_retailer_id,
  };

  const addUserIdCount = async () => {
    try {
      const res = await axios.post(
        `http://localhost:7171/api/auth/superDistributor/purchaseUserIds/${user.userId}`,
        userIdCountValue
      );
      cogoToast.success("Successfully added");
      getTotalUserIds();
    } catch (error) {
      console.log(error);
    }
  };

  const formDetails = {
    userId: user.userId,
    selectUserIdType: formData.selectUserIdType,
    noOfId: formData.noOfId,
    paymentMethod: formData.paymentMethod,
    totalAmount: totalAmount,
    paymentStatus: "success",
  };

  const handleBuyUserId = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:7171/api/auth/distributor/makePurchaseUserId`,
        formDetails
      );
      console.log(res.data);
      {
        formData.paymentMethod === "wallet" && changeWalletAmount();
      }
      addUserIdCount();
      alert("User Id Purchased Successfully");
      setFormData({
        selectUserIdType: "",
        idPrice: 800,
        noOfId: "",
        paymentMethod: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletDetails();
    getTotalUserIds();
    getUserPrice();
  }, []);

  console.log(userPrice);

  // const initializeRazorpay = async (e) => {
  //   e.preventDefault();
  //   await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  //   try {
  //     const options = {
  //       // key: "rzp_test_BGDch2dcTs1gNs",
  //       key: "rzp_test_AbyfFFyCYfsJOa",
  //       amount: totalAmount * 100,
  //       // currency: currency,
  //       name: "Bitspan",
  //       description: "Description of the purchase",
  //       handler: async function (response) {
  //         try {
  //           const { razorpay_payment_id } = response;
  //           const formDetails = {
  //             userId: user.userId,
  //             selectUserIdType: formData.selectUserIdType,
  //             noOfId: formData.noOfId,
  //             paymentMethod: formData.paymentMethod,
  //             totalAmount: totalAmount,
  //             paymentId: razorpay_payment_id,
  //             paymentStatus: "pending",
  //           };

  //           // Send payment details to your backend for verification
  //           const paymentVerificationResponse = await axios.post(
  //             "http://localhost:7171/api/auth/distributor/makePurchaseUserId",
  //             formDetails
  //           );

  //           const paymentStatus = paymentVerificationResponse.data.status;
  //           setPayStats(paymentStatus);

  //           if (paymentStatus === "success") {
  //             cogoToast.success("Payment successful");
  //           } else {
  //             cogoToast.error("Payment unsuccessful:", paymentStatus);
  //           }
  //           console.log(
  //             payStats,
  //             "Payment verification response:",
  //             paymentVerificationResponse.data
  //           );
  //         } catch (error) {
  //           console.error("Error verifying payment:", error, error.message);
  //         }
  //       },
  //       prefill: {
  //         name: "User Name",
  //         email: "user@example.com",
  //       },
  //     };

  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     console.error("Error initializing Razorpay:", error);
  //   }
  // };

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-end justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-12 mt-5">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5 mx-xl-5 mx-xxl-2  px-lg-3 px-xxl-0">
                          Buy User ID
                        </h4>
                        <p className="mt-3">
                          <strong> Wallet Available Amount : </strong> Rs.
                          {walletData[walletData.length - 1]?.Opening_Balance}
                        </p>
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

                  <div className="row  justify-content-center pe-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-12 col-sm-12  rounded  px-3">
                      <form onSubmit={handleBuyUserId}>
                        <div className="row guidline px-3 py-4 g-5 mt-4 shadow bg-body-tertiary rounded">
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mx-auto">
                            <label className="form-label">Your User ID</label>
                            <div className="input-group flex-nowrap">
                              <span
                                className="input-group-text"
                                id="addon-wrapping"
                              >
                                <FaUser />
                              </span>
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={user.userId}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mx-auto">
                            <label className="form-label">
                              Select User ID Type
                            </label>
                            <div className="input-group flex-nowrap">
                              <span
                                className="input-group-text"
                                id="addon-wrapping"
                              >
                                <LuTextSelect />
                              </span>
                              <select
                                className="form-select"
                                aria-label="Default select exuser.userId"
                                name="selectUserIdType"
                                value={formData.selectUserIdType}
                                onChange={handleChange}
                              >
                                <option selected>Select...</option>
                                <option value="Distributor">Distributor</option>
                              </select>
                            </div>
                          </div>
                          {formData.selectUserIdType === "Distributor" && (
                            <>
                              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mx-auto">
                                <label className="form-label">
                                  Available Distributor ID
                                </label>
                                <div className="input-group flex-nowrap">
                                  <span
                                    className="input-group-text"
                                    id="addon-wrapping"
                                  >
                                    <FaHashtag />
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={userIdCount[0]?.total_dist_id}
                                    disabled
                                  />
                                </div>
                              </div>

                              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mx-auto">
                                <label className="form-label">
                                  Distributor ID Price
                                </label>
                                <div className="input-group flex-nowrap">
                                  <span
                                    className="input-group-text"
                                    id="addon-wrapping"
                                  >
                                    <FaRupeeSign />
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={userPrice[0]?.distributor_id_price}
                                    disabled
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mx-auto">
                            <label className="form-label">
                              No. Of ID For Purchase
                            </label>
                            <div className="input-group flex-nowrap">
                              <span
                                className="input-group-text"
                                id="addon-wrapping"
                              >
                                <FaHashtag />
                              </span>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter No. Of ID For Purchase"
                                name="noOfId"
                                value={formData.noOfId}
                                max={10}
                                min={2}
                                onChange={handleChange}
                              />
                            </div>
                            {formData.noOfId && (
                              <>
                                <p>
                                  Total Amount :{" "}
                                  <span className="text-danger">
                                    {formData.noOfId *
                                      userPrice[0]?.retailer_id_price}
                                  </span>
                                </p>
                              </>
                            )}
                          </div>

                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mx-auto">
                            <label className="form-label">Payment Method</label>
                            <div className="input-group flex-nowrap">
                              <span
                                className="input-group-text"
                                id="addon-wrapping"
                              >
                                <LuTextSelect />
                              </span>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                              >
                                <option value=""> Payment Method</option>
                                <option value="online">Online</option>
                                {formData.noOfId * formData.idPrice <
                                  walletData[walletData.length - 1]
                                    ?.Opening_Balance && (
                                  <option value="wallet">Wallet</option>
                                )}
                              </select>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                            <div className="text-center">
                              <button className="btn btn-warning p-2">
                                Buy ID
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

export default BuySuperDistributorUserId;

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
