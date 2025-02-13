import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaRupeeSign, FaUser, FaAddressCard } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios"; // Make sure axios is imported
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearUser } from "../../redux/user/userSlice";

const WLWalletWithdraw = () => {
  const dispatch = useDispatch();
  const [bankAccounts, setBankAccounts] = useState([]);
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const username = useSelector((state) => state.user.currentUser?.username);
  const ContactNo = useSelector((state) => state.user.currentUser?.ContactNo);
  const email = useSelector((state) => state.user.currentUser?.email);
  const role = useSelector((state) => state.user.currentUser?.role);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [walletBalance, setWalletBalance] = useState("");
  const { token } = useSelector((state) => state.user);
  const [amount, setAmount] = useState(""); // Amount state
  const [finalAmount, setFinalAmount] = useState(0); // Final Amount state
  const payoutCharges = 10; // Fixed payout charges
  const [formData, setFormData] = useState({
    userId: userId,
    username: username,
    userPhone: ContactNo,
    userEmail: email,
    userRole: role,
    amount: "",
    amountToCredited: "",
    reason: "",
    bankaccount_number: "",
    bankholder_name: "",
    IFSC_code: "",
    bank_name: "",
    status: "Pending",
  });

  //   const [walletAmount, setWalletAmount] = useState(500); // Wallet amount
  const [inputAmount, setInputAmount] = useState(""); // User input amount

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check if input amount is greater than wallet amount
    if (parseFloat(value) > walletBalance) {
      alert("Entered amount is greater than wallet amount!");
      setInputAmount(""); // Reset the input field
    } else {
      setInputAmount(value); // Set the input field
    }
  };

  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/auth/whiteLabel/getActiveBankDetails/${userId}`,
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getActiveBankDetails/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBankAccounts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your token is expired. Please login again.",
        });

        dispatch(clearUser()); // Clear user data
        navigate("/"); // Redirect to login page
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Load Bank Accounts",
          text:
            error.response?.data?.message ||
            "An error occurred while fetching bank details. Please try again.",
        });
      }
    }
  };

  // Fetch Wallet Balance
  const fetchWalletBalance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/auth/whiteLabel/getWalletBalance/${userId}`,
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getWalletBalance/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setWalletBalance(response.data.data); // Set the fetched wallet balance
      } else {
        setWalletBalance(0); // Default to 0 if no data found
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      // Check for token expiration (401 error)
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser()); // Clear user data
        navigate("/"); // Redirect to login page
      } else {
        alert("Failed to load wallet balance.");
      }
    }
  };
  console.log(walletBalance);
  console.log(finalAmount);

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
    console.log(account);
    setFormData({
      ...formData,
      bankaccount_number: account.bankaccount_number,
      bankholder_name: account.bankholder_name,
      IFSC_code: account.IFSC_code,
      bank_name: account.bank_name,
    });
  };
  console.log(formData);

  const submitHandler = async () => {
    if (finalAmount < 500) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Minimum withdrawal amount should be 500.",
      });
      return;
    }
    // Check if all the necessary data is provided before submitting
    if (!selectedAccount) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a bank account.",
      });

      return;
    }

    try {
      // Submit the form data to the server
      const response = await axios.post(
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/WalletWithdraw/${userId}`,
        `http://localhost:7777/api/auth/whiteLabel//WalletWithdraw/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Withdrawal request submitted successfully.",
        }).then(() => {
          // Reset form after success
          setSelectedAccount(null); // Reset selected bank account
          setFormData({
            userId: userId,
            username: username,
            userPhone: ContactNo,
            userEmail: email,
            userRole: role,
            amount: "",
            reason: "",
            bankaccount_number: "",
            bankholder_name: "",
            IFSC_code: "",
            bank_name: "",
            status: "Pending",
            Transaction_Type: "Offline",
          });
          setInputAmount(""); // Clear input amount field
          setFinalAmount(0); // Reset final amount
          fetchWalletBalance();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to submit withdrawal request.",
        }).then(() => {
          // Reset form after failure
          setSelectedAccount(null); // Reset selected bank account
          setFormData({
            userId: userId,
            username: username,
            userPhone: ContactNo,
            userEmail: email,
            userRole: role,
            amount: "",
            reason: "",
            bankaccount_number: "",
            bankholder_name: "",
            IFSC_code: "",
            bank_name: "",
            status: "Pending",
            Transaction_Type: "Offline",
          });
          setInputAmount(""); // Clear input amount field
          setFinalAmount(0); // Reset final amount
        });
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);

      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to login page
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred while submitting your request.",
        }).then(() => {
          // Reset form after error
          setSelectedAccount(null); // Reset selected bank account
          setFormData({
            userId: userId,
            username: username,
            userPhone: ContactNo,
            userEmail: email,
            userRole: role,
            amount: "",
            reason: "",
            bankaccount_number: "",
            bankholder_name: "",
            IFSC_code: "",
            bank_name: "",
            status: "Pending",
            Transaction_Type: "Offline",
          });
          setInputAmount(""); // Clear input amount field
          setFinalAmount(0); // Reset final amount
        });
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBankAccounts();
      fetchWalletBalance();
      console.log(userId);
      console.log(username);
    }
  }, [userId]);

  useEffect(() => {
    if (inputAmount) {
      const calculatedFinalAmount = inputAmount - payoutCharges;
      setFinalAmount(calculatedFinalAmount < 0 ? 0 : calculatedFinalAmount); // Ensure it doesn't go below 0
      setFormData({
        ...formData,
        amount: calculatedFinalAmount,
        amountToCredited: inputAmount,
      });
    } else {
      setFinalAmount(0);
    }
  }, [inputAmount]);

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
                        <h4 className="px-lg-3">Wallet Withdraw</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Wallet Withdraw
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="text-center">
                      <h5></h5>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        User ID
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="Enter Name"
                          value={userId}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Full Name
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="UserName"
                          value={username}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="walletBalance" className="form-label">
                        Your Wallet Balance
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="walletBalance"
                          className="form-control"
                          placeholder="Wallet Balance"
                          value={walletBalance || "0"}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="amount" className="form-label">
                        Amount
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          <FaRupeeSign />
                        </span>
                        {/* <input
                          type="number"
                          id="amount"
                          className="form-control"
                          placeholder="Enter Amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          max={walletBalance}
                        /> */}
                        <input
                          type="number"
                          placeholder="Enter amount"
                          className="form-control"
                          value={inputAmount}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="payoutCharges" className="form-label">
                        Payout Charges
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          <FaRupeeSign />
                        </span>
                        <input
                          type="number"
                          id="payoutCharges"
                          className="form-control"
                          placeholder="Payout Charges"
                          value={payoutCharges}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label htmlFor="finalAmount" className="form-label">
                        Final Amount
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          <FaRupeeSign />
                        </span>
                        <input
                          type="number"
                          id="finalAmount"
                          className="form-control"
                          placeholder="Final Amount"
                          value={finalAmount}
                          disabled
                          min={500}
                        />
                      </div>
                      <span
                        className="text-danger fw-bold"
                        style={{
                          fontSize: "0.85rem",
                          marginTop: "5px",
                          display: "block",
                        }}
                      >
                        Minimum withdraw amount should be 500
                      </span>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Reason
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          <MdEdit />
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="reason"
                          value={formData.reason}
                          onChange={(e) =>
                            setFormData({ ...formData, reason: e.target.value })
                          }
                          class="form-control"
                          placeholder="Enter Reason"
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-start mb-3">
                                                <button className="btn p-2">Submit</button>
                                            </div> */}
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="text-center">
                      <h5>All Your Listed Bank Account</h5>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="table-responsive">
                        {/* <table className="table table-striped">
                          <thead className="table-dark">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">A/c Holder Name</th>
                              <th scope="col">Bank Account Number</th>
                              <th scope="col">IFSC Code</th>
                              <th scope="col">Bank Name</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bankAccounts.map((account, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{account.bankholder_name}</td>
                                <td>{account.bankaccount_number}</td>
                                <td>{account.IFSC_code}</td>
                                <td>{account.bank_name}</td>
                                <td>{account.status}</td>
                                <td>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id={`flexCheckDefault${index}`}
                                      checked={
                                        selectedAccount?.bankaccount_number ===
                                        account.bankaccount_number
                                      }
                                      onClick={() =>
                                        handleSelectAccount(account)
                                      }
                                    />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table> */}

                        <table className="table table-striped">
                          <thead className="table-dark">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">A/c Holder Name</th>
                              <th scope="col">Bank Account Number</th>
                              <th scope="col">IFSC Code</th>
                              <th scope="col">Bank Name</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bankAccounts.length > 0 ? (
                              bankAccounts.map((account, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{account.bankholder_name}</td>
                                  <td>{account.bankaccount_number}</td>
                                  <td>{account.IFSC_code}</td>
                                  <td>{account.bank_name}</td>
                                  <td>{account.status}</td>
                                  <td>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id={`flexCheckDefault${index}`}
                                        checked={
                                          selectedAccount?.bankaccount_number ===
                                          account.bankaccount_number
                                        }
                                        onClick={() =>
                                          handleSelectAccount(account)
                                        }
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7" className="text-center">
                                  No bank accounts found! Please add bank
                                  account first.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="col-12 text-start mt-4 mb-4">
                      <button
                        className="btn btn-primary"
                        onClick={submitHandler}
                      >
                        Submit
                      </button>
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

export default WLWalletWithdraw;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  th {
    font-weight: 500;
    font-size: 14px;
  }
  td {
    font-size: 14px;
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
  .total-amount {
    font-size: 14px;
    color: #cd0808;
  }
  .total-amount > span {
    font-weight: bold;
  }
`;
