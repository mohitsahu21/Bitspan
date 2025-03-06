import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SdAllCommissionHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const complaintsPerPage = 10; // Set items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const { currentUser, token } = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState("");

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        // `https://2kadam.co.in/api/auth/superDistributor/getAllCommission/${userId}`,
        `https://2kadam.co.in/api/auth/whiteLabel/getAllCommission/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const filteredData = response.data.data.filter(
          (item) => item.applicant_select_service !== "New Bank ID"
        );
        setFormData(filteredData); // Set the filtered data
      } else {
        setFormData([]); // Set an empty array if no data found
      }
    } catch (error) {
      console.error("Error fetching commission data:", error);

      if (error?.response?.status === 401) {
        // Handle token expiration
        Swal.fire({
          icon: "error",
          title: "Your session has expired.",
          text: "Please log in again to continue.",
        });
        dispatch(clearUser()); // Clear the user session
        navigate("/"); // Redirect to login page
      } else {
        // Handle other errors
        Swal.fire({
          icon: "error",
          title: "Error fetching data",
          text: "An error occurred while fetching recharge data. Please try again later.",
        });
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]);

  const handleSearch = () => {
    fetchData();
  };

  console.log(formData);

  const filteredData = formData?.filter((row) => {
    const matchesSearch =
      row.applicant_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      row.applicant_number
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      row.transaction_id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      row.order_id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" ||
      row.status?.toLowerCase() === selectedStatus?.toLowerCase();

    //   return matchesSearch && matchesStatus;
    // });

    const matchesKeyword =
      // (row?.userId &&
      //   row.userId.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      // (row?.UserName &&
      // row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.order_id &&
        row.order_id.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.transaction_id &&
        row.transaction_id
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()));
    // (row?.name &&
    //   row.name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
    // (row?.mobile &&
    //   row.mobile.toLowerCase().includes(keyword.trim().toLowerCase())) ||
    // (row?.email &&
    //   row.email.toLowerCase().includes(keyword.trim().toLowerCase()));

    // const matchesType =
    //   !status || status === "---Select---" || row.status === status;
    // // return matchesKeyword && matchesType ;
    const matchesDate =
      (!fromDate ||
        new Date(row.created_at).toISOString().split("T")[0] >=
          new Date(fromDate).toISOString().split("T")[0]) &&
      (!toDate ||
        new Date(row.created_at).toISOString().split("T")[0] <=
          new Date(toDate).toISOString().split("T")[0]);
    console.log(matchesKeyword);
    return matchesKeyword && matchesDate && matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / complaintsPerPage);

  const paginateData = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredData.slice(startIndex, endIndex);
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
                          View All Commission History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; View All Commission
                          History{" "}
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
                              type="text"
                              className="form-control responsive-input"
                              // placeholder="Search by Name, Mobile, or Order ID"
                              placeholder="Search by  Order ID"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>

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
                              <Dropdown.Item eventKey="Pending">
                                Pending
                              </Dropdown.Item>
                            </DropdownButton>
                          </div> */}
                        </div>

                        {/* <div className="d-flex flex-column flex-md-row gap-3">
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
                        </div> */}

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Sr.No</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Order ID</th>
                                  <th scope="col">Transaction ID</th>
                                  <th scope="col">Amount</th>
                                  {/* <th scope="col">White Label ID</th> */}
                                  {/* <th scope="col">Super Distributor ID</th> */}
                                  {/* <th scope="col">Super Distributor ID</th> */}
                                  {/* <th scope="col">Retailer ID</th> */}
                                  {/* <th scope="col">White Label Commission</th> */}
                                  <th scope="col">White Label Commission</th>
                                  {/* <th scope="col">Distributor Commission</th> */}
                                  {/* <th scope="col">Retailer Commission</th> */}
                                  <th scope="col">Transaction Type</th>
                                  <th scope="col">Transaction Details</th>
                                  {/* <th scope="col">Status</th> */}
                                  {/* <th scope="col">Note</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {loading ? (
                                  <p>Loading...</p>
                                ) : displayData.length > 0 ? (
                                  displayData.map((item, index) => (
                                    <tr key={index}>
                                      <td>
                                        {currentPage * complaintsPerPage +
                                          index +
                                          1}
                                      </td>
                                      <td>{item.created_at}</td>
                                      <td>{item.order_id}</td>
                                      <td>{item.transaction_id}</td>
                                      <td>{item.amount}</td>
                                      {/* <td>{item.whiteLabel_id}</td> */}
                                      {/* <td>{item.super_Distributor_id}</td> */}
                                      {/* <td>{item.super_Distributor_id}</td> */}
                                      {/* <td>{item.retailer_id}</td> */}
                                      {/* <td>{item.whiteLabel_Commission}</td> */}
                                      <td>{item.whiteLabel_Commission}</td>
                                      {/* <td>{item.distributor_Commission}</td>
                                      <td>{item.retailer_Commission}</td> */}
                                      <td>{item.transaction_type}</td>
                                      <td>{item.transaction_details}</td>
                                      {/* <td>{item.status}</td> */}
                                      {/* <td>{item.note}</td> */}
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="17"
                                      style={{ textAlign: "center" }}
                                    >
                                      No data available
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
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SdAllCommissionHistory;

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
