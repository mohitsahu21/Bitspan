import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const DSambalHistory = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [fromDate, setFromDate] = useState(""); // From date filter
  const [toDate, setToDate] = useState(""); // To date filter
  const [PaymentMode, setPaymentMode] = useState("");
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);

  const userID = currentUser.userId;

  const maskSensitiveInfo = (value, maskLength, revealLength) => {
    const maskedValue = "*".repeat(maskLength);
    const revealedValue = value.slice(-revealLength);
    return maskedValue + revealedValue;
  };

  const fetchRechargeData = async () => {
    setDataLoading(true);
    try {
      const response = await axios.get(
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getSambalHistory/${userID}`
        `https://bitspan.vimubds5.a2hosted.com/api/auth/Distributor/getSambalHistory/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const data = response.data.data;
      setApiData(response.data.data);
      console.log(response.data.data);
      // console.log(data);
      // setAllData(data);
      // setFilteredData(data);
    } catch (error) {
      console.log(error);
      // Handle token expiration (401 error)
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to login page
      } else {
        // Handle other errors (optional)
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred while fetching recharge data.",
        });
      }
    } finally {
      setDataLoading(false); // Stop loading
    }
  };
  console.log(allData);

  useEffect(() => {
    fetchRechargeData();
  }, []);

  const filteredItems = apiData.filter((row) => {
    const matchesKeyword =
      // (row?.userId &&
      //   row.userId.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      // (row?.UserName &&
      // row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      row?.order_id &&
      row.order_id.toLowerCase().includes(keyword.trim().toLowerCase());
    //   ||
    // (row?.txid &&
    //   row.txid.toLowerCase().includes(keyword.trim().toLowerCase()));
    // (row?.name &&
    //   row.name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
    // (row?.mobile &&
    //   row.mobile.toLowerCase().includes(keyword.trim().toLowerCase())) ||
    // (row?.email &&
    //   row.email.toLowerCase().includes(keyword.trim().toLowerCase()));

    const matchesType =
      !status || status === "---Select---" || row.status === status;
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

  // const totalPages = Math.ceil(filteredData.length / complaintsPerPage);

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
          <div className="container-fluid">
            {dataLoading ? (
              <div className="loader">Loading data, please wait...</div>
            ) : (
              <div className="row flex-wrap justify-content-lg-center justify-content-center ">
                <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                  {/* <Sider /> */}
                </div>
                <div
                  className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata "
                >
                  <div className="main shadow-none ">
                    <div className="row shadow-none ">
                      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        {/* <div className="text-center">
                                                <h3>Prepaid Recharge History</h3>
                                            </div> */}
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                            Sambal History
                          </h4>
                          <h6 className="mx-lg-5">
                            <BiHomeAlt /> &nbsp;/ &nbsp; Sambal History
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                      <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                        <div className="row d-flex flex-column g-4">
                          <div className="d-flex flex-column flex-md-row gap-3">
                            {/* <div className="col-12 col-md-4 col-lg-3">
                              <input
                                className="form-control"
                                type="search"
                                id="floatingInputGroup1"
                                placeholder="Search by  Ord ID"
                                value={filterValue}
                                onChange={(e) => {
                                  setFilterValue(e.target.value);
                                  if (e.target.value === "") {
                                    setCurrentPage(0);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Escape") {
                                    setFilterValue("");
                                    setCurrentPage(0);
                                  }
                                }}
                              />
                            </div> */}

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
                            <div className="col-12 col-md-4 col-lg-3">
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
                                <option value="Pending">Pending</option>
                                <option value="Reject">Reject</option>
                              </select>
                            </div>
                          </div>

                          <div className="d-flex flex-column flex-xl-row gap-3">
                            <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                              {/* <label for="fromDate" className="form-label">From</label> */}
                              <input
                                id="fromDate"
                                className="form-control"
                                type="search"
                                placeholder="search By Order Id "
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
                              <table class="table table-striped">
                                <thead className="table-dark">
                                  <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Date</th>

                                    <th scope="col">Order ID</th>
                                    {/* <th scope="col">Samagra ID</th>
                                    <th scope="col">Family ID</th> */}
                                    <th scope="col">Applicant Type</th>
                                    {/* <th scope="col">Education</th>
                                    <th scope="col">Occupation</th> */}
                                    {/* <th scope="col">SMS Notification</th>
                                    <th scope="col">Income Tax Payer</th>
                                    <th scope="col">Land Ownership</th>
                                    <th scope="col">Govt Service</th> */}
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {showApiData && showApiData.length > 0 ? (
                                    showApiData.map((item, index) => (
                                      <tr key={index}>
                                        {/* <tr key={item.id}> */}
                                        <td>
                                          {currentPage * complaintsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>{item.created_at}</td>
                                        <td>{item.order_id}</td>
                                        {/* <td>{item.samagra_id}</td>
                                        <td>{item.family_id}</td> */}
                                        <td>{item.applicant_type}</td>
                                        {/* <td>{item.education}</td>
                                        <td>{item.occupation}</td> */}
                                        {/* <td>{item.sms_notification}</td>
                                        <td>{item.income_tax_payer}</td>
                                        <td>{item.land_ownership}</td>
                                        <td>{item.govt_service}</td> */}
                                        {/* <td>{item.mobile_number}</td> */}
                                        <td>
                                          {maskSensitiveInfo(
                                            item.mobile_number,
                                            6,
                                            4
                                          )}
                                        </td>
                                        <td>{item.status}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="10" className="text-center">
                                        No results found
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <PaginationContainer>
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
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
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default DSambalHistory;

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
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0px 0px 1px #000;
    font-size: 14px; /* Default font size */
  }

  .pagination li.active a {
    background-color: #004aad;
    color: white;
    border: 1px solid #004aad;
  }

  .pagination li.disabled a {
    color: white;
    cursor: not-allowed;
    background-color: #3a4e69;
    border: 1px solid #3a4e69;
  }

  .pagination li a:hover:not(.active) {
    background-color: #004aad;
    color: white;
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
