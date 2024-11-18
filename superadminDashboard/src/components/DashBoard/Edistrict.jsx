import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

const Edistrict = () => {
  const dispatch = useDispatch();
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/auth/retailer/getEdistrictData/${userData}`
      );
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]);

  const handleSearch = () => {
    fetchData();
  };

  const filteredData = formData?.filter((item) => {
    if (selectedStatus === "All") {
      return true;
    } else {
      return item.status?.toLowerCase() === selectedStatus.toLowerCase();
    }
  });

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
                          <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                              onClick={handleSearch}
                            >
                              Search
                            </button>
                          </div>
                          <div className="col-12 col-md-4 col-lg-3 d-flex align-items-end">
                            <DropdownButton
                              id="dropdown-basic-button"
                              title={selectedStatus}
                              onSelect={(e) => setSelectedStatus(e)}
                            >
                              <Dropdown.Item eventKey="All">All</Dropdown.Item>
                              <Dropdown.Item eventKey="Approved">
                                Approved
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

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            <table class="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Sr.No</th>
                                  <th scope="col">Order ID</th>
                                  <th scope="col">Applicant Type</th>
                                  <th scope="col">Applicant Name</th>
                                  <th scope="col">Applicant Father Name</th>
                                  <th scope="col">Mobile Number</th>
                                  <th scope="col">DOB</th>
                                  <th scope="col">Gender</th>
                                  <th scope="col">Cast</th>
                                  <th scope="col">Aadhar No</th>
                                  <th scope="col">Samagra ID</th>
                                  <th scope="col">Address</th>
                                  <th scope="col">State</th>
                                  <th scope="col">Prev Application</th>
                                  <th scope="col">Annual inc</th>
                                  <th scope="col">View Document</th>
                                  <th scope="col">Charge Amt</th>
                                  <th scope="col">Date</th>
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
                                    {displayData?.map((item, index) => (
                                      <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.order_id}</td>
                                        <td>{item.application_type}</td>
                                        <td>{item.name}</td>
                                        <td>{item.father_husband_name}</td>
                                        <td>{item.mobile_no}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.cast}</td>
                                        <td>{item.aadhar_no}</td>
                                        <td>{item.samagar_member_id}</td>
                                        <td>{item.address}</td>
                                        <td>{item.state}</td>
                                        <td>{item.previous_application}</td>
                                        <td>{item.annual_income}</td>
                                        <td>
                                          {item?.documentUpload
                                            ?.split(",")
                                            ?.map((kycurl, kycindx) => (
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
                                        </td>
                                        <td>{item.charge_amount}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.status}</td>
                                        <td>{item.note}</td>
                                      </tr>
                                    ))}
                                  </>
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

export default Edistrict;

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