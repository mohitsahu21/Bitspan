import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SdEdistrict = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  const userData = currentUser.userId;
  // console.log(userData);
  const [formData, setFormData] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const complaintsPerPage = 10; // Set items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [keyword, setKeyword] = useState("");

  // Fetch userId and token from Redux store
  const userId = useSelector((state) => state.user.currentUser?.userId);

  const maskSensitiveInfo = (value, maskLength, revealLength) => {
    const maskedValue = "*".repeat(maskLength);
    const revealedValue = value.slice(-revealLength);
    return maskedValue + revealedValue;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/superDistributor/getEDistrictHistory/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData(response.data.data);
      console.log("Fetched Data:", response.data); // Add this line to check the response
      setLoading(false);
    } catch (error) {
      console.log(error);

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
    // setCurrentPage(0);
  }, [userId, token]);

  const filteredData =
    formData?.length > 0
      ? formData.filter((row) => {
          const matchesSearch =
            row.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
            // item.mobile_no
            //   ?.toLowerCase()
            //   ?.includes(searchQuery?.toLowerCase()) ||
            row.order_id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
          const matchesStatus =
            selectedStatus === "All" ||
            row.status?.toLowerCase() === selectedStatus?.toLowerCase();

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

          const matchesDate =
            (!fromDate ||
              new Date(row.created_at).toISOString().split("T")[0] >=
                new Date(fromDate).toISOString().split("T")[0]) &&
            (!toDate ||
              new Date(row.created_at).toISOString().split("T")[0] <=
                new Date(toDate).toISOString().split("T")[0]);
          console.log(matchesKeyword);

          return (
            matchesSearch && matchesStatus && matchesDate && matchesKeyword
          );
        })
      : []; // Ensure it's an empty array if formData is empty or not loaded yet

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, fromDate, toDate]);

  const totalPages = Math.ceil(filteredData?.length / complaintsPerPage);

  const paginateData = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredData?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayData = paginateData();

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-lg-center justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>Complaint Raised List</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          E-District History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; E-District History{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="fromDate" className="form-label">
                              Search
                            </label>
                            <input
                              type="search"
                              className="form-control "
                              placeholder="Search by Name or Order ID"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>

                          {/* <div className="col-12 col-md-4 col-lg-3 d-flex align-items-end">
                            <DropdownButton
                              id="dropdown-basic-button"
                              title={selectedStatus}
                              onSelect={(e) => setSelectedStatus(e)}
                            >
                              <Dropdown.Item eventKey="All">All</Dropdown.Item>
                              <Dropdown.Item eventKey="Success">
                                Success
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Reject">
                                Reject
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Under Process">
                                Under Process
                              </Dropdown.Item>
                            </DropdownButton>
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
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="table-responsive">
                            {loading ? (
                              <div className="d-flex justify-content-center">
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </Spinner>
                              </div>
                            ) : (
                              <table className="table table-striped">
                                <thead className="table-dark">
                                  <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Applicant Type</th>
                                    <th scope="col">Prev Application</th>
                                    <th scope="col">Annual inc</th>
                                    <th scope="col">View Document</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Note</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {displayData && displayData.length > 0 ? (
                                    displayData.map((item, index) => (
                                      <tr key={index}>
                                        <td>
                                          {currentPage * complaintsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>{item.order_id}</td>
                                        <td>{item.application_type}</td>
                                        <td>{item.previous_application}</td>
                                        <td>{item.annual_income}</td>
                                        {/* <td>
                                          {item?.documentUpload
                                            ?.split(",")
                                            .map((kycurl, kycindx) => (
                                              <div key={kycindx}>
                                                <a
                                                  href={kycurl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  View {kycindx + 1}
                                                </a>
                                              </div>
                                            ))}
                                        </td> */}
                                        <td>
                                          {item?.documentUpload &&
                                          item.documentUpload.trim() !== ""
                                            ? item.documentUpload
                                                .split(",")
                                                .map((kycurl, kycindx) => (
                                                  <div key={kycindx}>
                                                    <a
                                                      href={kycurl}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      View {kycindx + 1}
                                                    </a>
                                                  </div>
                                                ))
                                            : "Not Available"}
                                        </td>
                                        <td>{item.charge_amount}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.status}</td>
                                        <td>{item.note}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="20" className="text-start">
                                        No data available
                                      </td>
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
                              pageRangeDisplayed={3}
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

export default SdEdistrict;

const Wrapper = styled.div`
  .main {
    height: 100vh;
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
  table {
    overflow-x: scroll;
  }
  th {
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
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
  a {
    text-decoration: none;
  }
  .responsive-input {
    padding: 10px;
    width: 100%; /* Ensures full width within the grid */
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
