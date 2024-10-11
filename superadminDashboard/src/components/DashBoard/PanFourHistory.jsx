import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";

const PanFourHistory = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:7777/api/auth/retailer/pan-4.0`
      );
      setApiData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = apiData.filter(
    (row) =>
      (row?.name &&
        row.name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.orderid && row.orderid.includes(keyword.trim()))
  );

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
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="fromDate" className="form-label">
                              Search Name & Order ID
                            </label>
                            <input
                              id="fromDate"
                              className="form-control"
                              type="text"
                              placeholder="Search"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-md-4 col-lg-3">
                            {/* <label for="toDate" className="form-label">
                              Date
                            </label>
                            <input
                              id="date"
                              className="form-control"
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                            /> */}
                          </div>
                          <div className="d-flex align-items-end">
                            {/* <button
                              type="button"
                              className="btn btn-primary button"
                              onClick={() => setCurrentPage(0)} // Reset pagination to the first page on search
                            >
                              Search
                            </button> */}
                          </div>
                          <div className="d-flex align-items-end">
                            {/* <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={handleApiChange}
                              value={selectedApi}
                            >
                              <option value="">-- Select API --</option>
                              <option value="api1">NSDL New Request</option>
                              <option value="api2">NSDL Correction</option>
                            </select> */}
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
                                    <th scope="col">
                                      Application <br /> Type
                                    </th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Father Name</th>
                                    <th scope="col">Mother Name</th>
                                    <th scope="col">
                                      Date of <br />
                                      Birth
                                    </th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Office Address</th>
                                    <th scope="col">Aadhar Details</th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Pincode</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Change Request</th>
                                    <th scope="col">KYC </th>
                                    <th scope="col">Form </th>
                                    <th scope="col">Signature</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Message</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {showApiData && showApiData.length > 0 ? (
                                    showApiData.map((item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>{" "}
                                        <td>{item.created_at}</td>
                                        <td>{item.application_type}</td>
                                        <td>{item.select_title}</td>
                                        <td>{item.name}</td>
                                        <td>{item.father_name}</td>
                                        <td>{item.mother_name}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.office_address}</td>
                                        <td>{item.aadhar_details}</td>
                                        <td>{item.mobile_no}</td>
                                        <td>{item.email_id}</td>
                                        <td>{item.pin_code}</td>
                                        <td>{item.state}</td>
                                        <td>{item.Change_Request}</td>
                                        <td>
                                          {item.documentUpload
                                            ? item.documentUpload
                                                .split(",")
                                                .map((kycurl, kycindx) => (
                                                  <div key={kycindx}>
                                                    <a
                                                      href={kycurl}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      View KYC {kycindx + 1}
                                                    </a>
                                                  </div>
                                                ))
                                            : "No KYC available"}
                                        </td>
                                        <td>
                                          {" "}
                                          <a
                                            href={item.attachment_form}
                                            target="_blank"
                                          >
                                            View Sign
                                          </a>
                                        </td>
                                        <td>
                                          {" "}
                                          <a
                                            href={item.attachment_signature}
                                            target="_blank"
                                          >
                                            View Sign
                                          </a>
                                        </td>
                                        <td>
                                          {" "}
                                          <a
                                            href={item.attachment_photo}
                                            target="_blank"
                                          >
                                            View Sign
                                          </a>
                                        </td>
                                        <td>{item.Charge_Amount}</td>
                                        <td
                                          style={{
                                            color:
                                              item.status === "Pending"
                                                ? "#FFC107" // Yellow/Orange
                                                : item.status === "Reject"
                                                ? "#DC3545" // Red
                                                : item.status === "Success"
                                                ? "#28A745" // Green
                                                : "black", // Default color if none of the statuses match
                                          }}
                                        >
                                          {item.status}
                                        </td>
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

export default PanFourHistory;

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
`;
