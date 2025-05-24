import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { use } from "react";

const SdPanFourHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [fromDate, setFromDate] = useState(""); // From date filter
  const [toDate, setToDate] = useState(""); // To date filter
  const [PaymentMode, setPaymentMode] = useState("");

  // const userData = currentUser.userId;
  // Fetch userId and token from Redux store
  const userId = useSelector((state) => state.user.currentUser?.userId);

  const maskSensitiveInfo = (value, maskLength, revealLength) => {
    const maskedValue = "*".repeat(maskLength);
    const revealedValue = value.slice(-revealLength);
    return maskedValue + revealedValue;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        // `https://2kadam.co.in/api/auth/retailer/pan-4.0/${userData}`
        `https://2kadam.co.in/api/auth/superDistributor/getOfflinePan/${userId}`,
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
      // (row?.userId &&
      //   row.userId.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      // (row?.UserName &&
      //   row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.order_id &&
        row.order_id.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.txid &&
        row.txid.toLowerCase().includes(keyword.trim().toLowerCase()));
    // (row?.name &&
    //   row.name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
    // (row?.mobile &&
    //   row.mobile.toLowerCase().includes(keyword.trim().toLowerCase())) ||
    // (row?.email &&
    //   row.email.toLowerCase().includes(keyword.trim().toLowerCase()));

    const matchesType =
      !PaymentMode ||
      PaymentMode === "---Select---" ||
      row.status === PaymentMode;
    // return matchesKeyword && matchesType ;
    const matchesDate =
      (!fromDate ||
        new Date(row.created_at).toISOString().split("T")[0] >=
          new Date(fromDate).toISOString().split("T")[0]) &&
      (!toDate ||
        new Date(row.created_at).toISOString().split("T")[0] <=
          new Date(toDate).toISOString().split("T")[0]);
    console.log(matchesKeyword);
    return matchesKeyword && matchesDate && matchesType;
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword, fromDate, toDate, PaymentMode]);

  const totalPages = Math.ceil(filteredItems.length / complaintsPerPage);

  const filterPagination = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredItems?.slice(startIndex, endIndex);
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
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            {/* <label for="fromDate" className="form-label">From</label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              placeholder="search By Order Id "
                              value={keyword}
                              onChange={(e) => (
                                setKeyword(e.target.value), setCurrentPage(0)
                              )}
                            />
                          </div>

                          <div className="col-12 col-md-12 col-lg-12 col-xl-3">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={PaymentMode}
                              onChange={(e) => setPaymentMode(e.target.value)}
                            >
                              <option selected>---Select---</option>
                              <option value="Success">Success</option>
                              <option value="Failed">Failed</option>
                            </select>
                          </div>
                        </div>
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="fromDate" className="form-label">
                              From
                            </label>
                            <input
                              id="fromDate"
                              className="form-control"
                              type="date"
                              value={fromDate}
                              onChange={(e) => (
                                setFromDate(e.target.value), setCurrentPage(0)
                              )}
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
                              onChange={(e) => (
                                setToDate(e.target.value), setCurrentPage(0)
                              )}
                            />
                          </div>
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
                                    <th scope="col">Date</th>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">
                                      Application <br /> Type
                                    </th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Note</th>
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
                                        <td>{item.created_at}</td>
                                        <td>{item.order_id}</td>
                                        <td>{item.application_type}</td>
                                        <td>
                                          {maskSensitiveInfo(
                                            item.mobile_no,
                                            6,
                                            4
                                          )}
                                        </td>
                                        <td>{item.Charge_Amount}</td>
                                        <td>{item.status}</td>
                                        <td>{item.note}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="13">No data available</td>{" "}
                                      {/* Updated colSpan to match table columns */}
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            )}
                          </div>
                          <PaginationContainer>
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              breakLabel={"..."}
                              pageCount={totalPages}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                              forcePage={currentPage}
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

export default SdPanFourHistory;

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
