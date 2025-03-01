import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SdPanTransactionReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [fromDate, setFromDate] = useState(""); // Missing initialization
  const [toDate, setToDate] = useState(""); // Missing initialization
  const [PaymentMode, setPaymentMode] = useState("---Select---"); // Missing initialization
  const [status, setStatus] = useState("---Select---"); // Missing initialization

  // const userData = currentUser.userId;
  // Fetch userId and token from Redux store
  const userId = useSelector((state) => state.user.currentUser?.userId);

  // const maskSensitiveInfo = (value, maskLength, revealLength) => {
  //   const maskedValue = "*".repeat(maskLength);
  //   const revealedValue = value.slice(-revealLength);
  //   return maskedValue + revealedValue;
  // };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        // `http://localhost:7777/api/auth/retailer/pan-4.0/${userData}`
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getOnlinePan/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
      if (error?.response?.status === 401) {
        // Handle token expiration
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to the login page
      } else {
        // Handle other errors
        Swal.fire({
          icon: "error",
          title: "Error Fetching Data",
          text: "An error occurred while fetching the data. Please try again later.",
        });
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = apiData.filter((row) => {
    const matchesKeyword =
      (row?.name &&
        row.name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.orderid && row.orderid.includes(keyword.trim())) ||
      (row?.txid && row.txid.includes(keyword.trim()));

    const matchesType =
      !status || status === "---Select---" || row.status === status;

    const matchesDate =
      (!fromDate ||
        new Date(row.created_at).toISOString().split("T")[0] >=
          new Date(fromDate).toISOString().split("T")[0]) &&
      (!toDate ||
        new Date(row.created_at).toISOString().split("T")[0] <=
          new Date(toDate).toISOString().split("T")[0]);

    return matchesKeyword && matchesDate && matchesType; // Return combined conditions
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / complaintsPerPage);
  const filterPagination = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredItems.slice(startIndex, endIndex); // Fix: avoid ?. on filterPagination
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showApiData = filterPagination();
  console.log(showApiData);

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-center justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata"
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>PAN Transaction Report</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          PAN Transaction Report
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; PAN Transaction Report
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow bg-body-tertiary rounded  p-5 m-4">
                      <div className="row d-flex flex-column g-4">
                        {/* <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="fromDate" className="form-label">
                              From
                            </label>
                            <input
                              id="fromDate"
                              className="form-control"
                              type="date"
                            />
                          </div>
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="toDate" className="form-label">
                              To
                            </label>
                            <input
                              id="toDate"
                              className="form-control "
                              type="date"
                            />
                          </div>
                          <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                            >
                              Search
                            </button>
                          </div>
                        </div> */}

                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="fromDate" className="form-label">
                              From
                            </label>
                            <input
                              id="fromDate"
                              className="form-control"
                              type="date"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="toDate" className="form-label">
                              To
                            </label>
                            <input
                              id="toDate"
                              className="form-control "
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                            />
                          </div>
                          {/* <div className="col-12 col-md-4 col-lg-3">
                            <label for="toDate" className="form-label">
                              Select Status
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option selected>---Select---</option>
                              <option value="Success">Success</option>
                              <option value="Failed">Failed</option>
                            </select>
                          </div> */}

                          {/* <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div> */}
                        </div>

                        <div className="d-flex flex-column flex-xl-row gap-3">
                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            {/* <label for="fromDate" className="form-label">From</label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              placeholder="search By Order Id Or Txn Id"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                          </div>

                          {/* <div className="d-flex align-items-end">
        <button type="button" className="btn btn-primary button">Search</button>
    </div> */}
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <table class="table table-striped">
                                <thead className="table-dark">
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Application Mode</th>
                                    <th scope="col">Select Type</th>
                                    {/* <th scope="col">Name</th>
                                    <th scope="col">Date of Birth</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Email</th> */}
                                    <th scope="col">Physical PAN</th>
                                    <th scope="col">Wallet Deduction Amount</th>
                                    <th scope="col">Transaction ID</th>
                                    <th scope="col">Status</th>
                                    {/* <th scope="col">OP ID</th>
                                    <th scope="col">Message</th> */}
                                    {/* <th scope="col">URL</th>
                                    <th scope="col">Number</th> */}
                                    <th scope="col">Amount</th>
                                    <th scope="col">Order ID</th>
                                    {/* <th scope="col">Provider Name</th> */}
                                    <th scope="col">User ID</th>
                                    <th scope="col">Created At</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {showApiData && showApiData.length > 0 ? (
                                    showApiData.map((item, index) => (
                                      <tr key={index}>
                                        <td>
                                          {currentPage * complaintsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>{item.id}</td>
                                        <td>{item.applicationMode}</td>
                                        <td>{item.selectType}</td>
                                        {/* <td>{item.name}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.email}</td> */}
                                        <td>{item.physicalPan}</td>
                                        <td>{item.walletDeductAmt}</td>
                                        <td>{item.txid}</td>
                                        <td
                                          style={{
                                            color:
                                              item.status === "Pending"
                                                ? "#FFC107"
                                                : item.status === "Reject"
                                                ? "#DC3545"
                                                : item.status === "Success"
                                                ? "#28A745"
                                                : "black",
                                          }}
                                        >
                                          {item.status}
                                        </td>
                                        {/* <td>{item.opid}</td>
                                        <td>{item.message}</td> */}
                                        {/* <td>
                                          <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>{item.number}</td> */}
                                        <td>{item.amount}</td>
                                        <td>{item.orderid}</td>
                                        {/* <td>{item.providerName}</td> */}
                                        <td>{item.userId}</td>
                                        <td>{item.created_at}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="22">No data available</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            )}
                          </div>

                          <PaginationContainer>
                            <ReactPaginate
                              previousLabel={"previous"}
                              nextLabel={"next"}
                              breakLabel={"..."}
                              pageCount={totalPages}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                            />
                          </PaginationContainer>
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

export default SdPanTransactionReport;

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
  th {
    font-weight: 500;
    font-size: 14px;
  }
  td {
    font-size: 14px;
    white-space: nowrap;
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

const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px;
    list-style: none;
    border-radius: 5px;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    display: block;
    padding: 8px 16px;
    border: 1px solid #e6ecf1;
    color: #007bff;
    cursor: pointer;
    /* background-color: #004aad0a; */
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0px 0px 1px #000;
  }

  .pagination li.active a {
    background-color: #004aad;
    color: white;
    border: 1px solid #004aad;
    border-radius: 5px;
  }

  .pagination li.disabled a {
    color: white;
    cursor: not-allowed;
    border-radius: 5px;
    background-color: #3a4e69;
    border: 1px solid #3a4e69;
  }

  .pagination li a:hover:not(.active) {
    background-color: #004aad;
    color: white;
    border-radius: 5px;
    border: 1px solid #004aad;
  }

  /* Responsive adjustments for smaller screens */
  @media (max-width: 768px) {
    .pagination {
      padding: 5px;
      flex-wrap: wrap;
    }

    .pagination li {
      margin: 2px;
    }

    .pagination li a {
      padding: 6px 10px;
      font-size: 12px;
    }
  }

  @media (max-width: 480px) {
    .pagination {
      padding: 5px;
    }

    .pagination li {
      margin: 2px;
    }

    .pagination li a {
      padding: 4px 8px;
      font-size: 10px;
    }

    /* Hide the previous and next labels for extra-small screens */
    .pagination li:first-child a::before {
      content: "«";
      margin-right: 5px;
    }

    .pagination li:last-child a::after {
      content: "»";
      margin-left: 5px;
    }
  }
`;
