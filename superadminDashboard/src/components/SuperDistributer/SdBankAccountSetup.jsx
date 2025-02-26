import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaAddressCard, FaUser } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SdBankAccountSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  // States to hold the form data
  const [bankData, setBankData] = useState({
    userId: "",
    holderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });
  const [formData, setFormData] = useState({
    bankholder_name: "",
    bankaccount_number: "",
    IFSC_code: "",
    bank_name: "",
  });

  // State to hold the list of bank accounts
  const [bankAccounts, setBankAccounts] = useState([]);

  const userId = useSelector((state) => state.user.currentUser?.userId);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankData({
      ...bankData,
      [name]: value,
    });
  };

  // Fetch bank accounts from backend
  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getBankDetails/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request header
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
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to login page
      } else {
        alert("Failed to load bank accounts.");
      }
    }
  };
  // Fetch bank accounts on component mount
  useEffect(() => {
    if (userId) {
      fetchBankAccounts();
      console.log(userId);
    }
  }, [userId]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if userId is available
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "You need to be logged in to add a bank account.",
        confirmButtonText: "Okay",
      });
      return;
    }

    // Validate required fields
    if (
      !bankData.holderName ||
      !bankData.accountNumber ||
      !bankData.ifscCode ||
      !bankData.bankName
    ) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required. Please fill in all fields.",
        confirmButtonText: "Okay",
      });
      return; // Prevent form submission
    }

    // Proceed with the form submission if validation is passed
    axios
      .post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/addBankDetails/${userId}`,
        {
          userId: userId, // Ensure userId is passed to the backend
          bankholder_name: bankData.holderName,
          bankaccount_number: bankData.accountNumber,
          IFSC_code: bankData.ifscCode,
          bank_name: bankData.bankName,
          status: "Pending", // You can set a default status here
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request header
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Bank Account Added!",
            text: "The bank account has been added successfully.",
            confirmButtonText: "Okay",
          });

          // Clear form fields
          setBankData({
            holderName: "",
            accountNumber: "",
            ifscCode: "",
            bankName: "",
          });

          // Fetch latest bank accounts to display updated list
          fetchBankAccounts();
        }
      })
      .catch((error) => {
        console.error("Error adding bank account:", error);

        // Token expired handling (401 Unauthorized)
        if (error?.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
          });
          dispatch(clearUser()); // Clear user session
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error Adding Bank Account",
            text: "An error occurred while adding the bank account. Please try again later.",
          });
        }
      });
  };

  // Handle bank account deletion
  const handleDelete = async (bid) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to delete this bank account?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/deleteBankDetails/${bid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token to the request header
            },
          }
        );

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The bank account has been deleted successfully.",
            confirmButtonText: "Okay",
          });

          // Refresh the bank accounts list after deletion
          fetchBankAccounts();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: response.data.message || "Failed to delete bank account.",
            confirmButtonText: "Okay",
          });
        }
      } catch (error) {
        console.error("Error deleting bank account:", error);
        if (error?.response?.status === 401) {
          // Token expired handling
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
          });

          dispatch(clearUser()); // Clear user session (ensure `clearUser` is defined in your Redux actions)
          navigate("/"); // Redirect to login page
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again.",
            confirmButtonText: "Okay",
          });
        }
      }
    }
  };

  return (
    <Wrapper>
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-wrap justify-content-center">
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
              <div className="main shadow-none">
                <div className="row shadow-none">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="px-lg-3">Bank Details</h4>
                      <p className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp;
                        <span
                          className="text-body-secondary"
                          style={{ fontSize: "13px" }}
                        >
                          Bank Details
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add New Bank Account Form */}
                <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                  <div className="text-center">
                    <h5>Add New Bank Account</h5>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="holderName" className="form-label">
                      Bank Holder Name
                    </label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        id="holderName"
                        name="holderName"
                        className="form-control"
                        value={bankData.holderName}
                        onChange={handleInputChange}
                        placeholder="Enter Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="accountNumber" className="form-label">
                      Bank Account Number/ UPI ID
                    </label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        <FaAddressCard />
                      </span>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        className="form-control"
                        value={bankData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Bank Account Number/ UPI ID"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="ifscCode" className="form-label">
                      IFSC Code
                    </label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        <FaAddressCard />
                      </span>
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        className="form-control"
                        value={bankData.ifscCode}
                        onChange={handleInputChange}
                        placeholder="Enter IFSC Code"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="bankName" className="form-label">
                      Bank Name
                    </label>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        <FaAddressCard />
                      </span>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        className="form-control"
                        value={bankData.bankName}
                        onChange={handleInputChange}
                        placeholder="Enter Bank Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="text-start mb-3">
                      <button className="btn p-2" onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                {/* All Listed Bank Accounts */}
                <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                  <div className="text-center">
                    <h5>All Your Listed Bank Accounts</h5>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="table-responsive">
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
                          {bankAccounts.map((account, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{account.bankholder_name}</td>
                              <td>{account.bankaccount_number}</td>
                              <td>{account.IFSC_code}</td>
                              <td>{account.bank_name}</td>
                              <td>{account.status}</td>
                              <td>
                                <div className="d-flex justify-content-start ">
                                  {/* Only show Verify button if status is not active */}
                                  {account.status &&
                                    account.status.toLowerCase() !==
                                      "active" && (
                                      <Link
                                        to={`/bank-account-setup/verify/${account.bid}`}
                                      >
                                        <button
                                          className="btn btn-primary btn-sm"
                                          onClick={() =>
                                            fetchBankDetails(account.bid)
                                          }
                                        >
                                          Verify
                                        </button>
                                      </Link>
                                    )}
                                  {/* If status is active, show a disabled button or nothing */}
                                  {account.status &&
                                    account.status.toLowerCase() ===
                                      "active" && (
                                      <button
                                        className="btn btn-primary btn-sm"
                                        disabled
                                      >
                                        Verify
                                      </button>
                                    )}
                                  <button
                                    className="btn btn-danger btn-sm"
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => handleDelete(account.bid)}
                                  >
                                    <MdDeleteForever />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* <div className="float-end">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <a className="page-link" href="#">
                              Previous
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>

                          <li className="page-item">
                            <a className="page-link" href="#">
                              Next
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SdBankAccountSetup;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
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
  @media (max-width: 576px) {
    .responsive-label {
      font-size: 0.5rem;
    }
  }
  @media (max-width: 768px) {
    .responsive-label {
      font-size: 1rem;
    }
  }
`;
