import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

const DAllOfflineForm = () => {
  const [formData, setFormData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const complaintsPerPage = 10; // Set items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const { token } = useSelector((state) => state.user);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/Distributor/getApplyOfflineFormById/${userId}`,
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getApplyOfflineForm`

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newResponseData = response.data.filter(
        (item) => item.applicant_select_service !== "New Bank ID"
      );

      setFormData(newResponseData);
      console.log(newResponseData);
    } catch (error) {
      console.log(error);
      // Check if the error is due to token expiration (401)
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
          text: "An error occurred while fetching data.",
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]);

  const handleSearch = () => {
    fetchData();
  };

  console.log(formData);

  const filteredData = formData?.filter((item) => {
    const createdAtDate = item.created_at ? new Date(item.created_at) : null;
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    const matchesSearch =
      item.applicant_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item.applicant_number
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item.order_id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" ||
      item.status?.toLowerCase() === selectedStatus?.toLowerCase();
    const matchesDate =
      (!fromDateObj || (createdAtDate && createdAtDate >= fromDateObj)) &&
      (!toDateObj || (createdAtDate && createdAtDate <= toDateObj));

    return matchesSearch && matchesStatus && matchesDate;
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
                          View All Offline History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; View All Offline History{" "}
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
                          <div className="col-12 col-md-4 col-lg-3 d-flex align-items-end">
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
                          </div>
                        </div>

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

                          {/* <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div> */}
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            <table class="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Sr.No</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Order ID</th>
                                  {/* <th scope="col">Applicant Name</th>
                                  <th scope="col">Applicant Father Name</th>
                                  <th scope="col">Applicant Number</th> */}
                                  <th scope="col">Service</th>
                                  <th scope="col">other</th>
                                  {/* <th scope="col">View Form</th>
                                  <th scope="col">View Photo</th>
                                  <th scope="col">View Signature</th>
                                  <th scope="col">View KYC</th> */}
                                  <th scope="col">Status</th>
                                  <th scope="col">Note</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loading ? (
                                  <>
                                    <p>Loading...</p>
                                  </>
                                ) : (
                                  <>
                                    {displayData.map((item, index) => (
                                      <tr key={index}>
                                        <td>
                                          {currentPage * complaintsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>{item.created_at}</td>
                                        <td>{item.order_id}</td>
                                        {/* <td>{item.applicant_name}</td>
                                        <td>{item.applicant_father}</td>
                                        <td>{item.applicant_number}</td> */}
                                        <td>{item.applicant_select_service}</td>
                                        <td>{item.other}</td>
                                        {/* <td>
                                          <a
                                            href={item.attached_form}
                                            target="_blank"
                                          >
                                            View Form
                                          </a>
                                        </td>
                                        <td>
                                          <a
                                            href={item.attached_photo}
                                            target="_blank"
                                          >
                                            View Photo
                                          </a>
                                        </td>
                                        <td>
                                          <a
                                            href={item.attached_sign}
                                            target="_blank"
                                          >
                                            View Sign
                                          </a>
                                        </td>
                                        <td>
                                          {item?.attached_kyc
                                            ?.split(",")
                                            ?.map((kycurl, kycindx) => (
                                              <div key={kycindx}>
                                                <a
                                                  href={kycurl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  View KYC {kycindx + 1}
                                                </a>
                                              </div>
                                            ))}
                                        </td> */}
                                        <td>{item.status}</td>
                                        <td>{item.note}</td>
                                      </tr>
                                    ))}
                                  </>
                                )}
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

export default DAllOfflineForm;

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
