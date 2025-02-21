import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const AllComplaintsList = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const complaintsPerPage = 10;
  const [complaintStatus, setComplaintStatus] = useState(""); // For user type filter
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        // `http://localhost:7777/api/auth/retailer/complain-data`
        `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/complain-data/${currentUser?.userId}`
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

  // const handleSearch = () => {
  //   const from = fromDate ? moment(fromDate, "YYYY-MM-DD") : null;
  //   const to = toDate ? moment(toDate, "YYYY-MM-DD") : null;

  //   return apiData.filter((item) => {
  //     const itemDate = moment(item.createdAt, "YYYY-MM-DD HH:mm:ss");
  //     // Apply date filter based on from and to dates
  //     const isAfterFromDate = from ? itemDate.isSameOrAfter(from) : true;
  //     const isBeforeToDate = to ? itemDate.isSameOrBefore(to) : true;
  //     return isAfterFromDate && isBeforeToDate;
  //   });
  // };

  const filteredItems = apiData.filter(
    (row) =>{ 
      const matchesKeyword =  
        (row?.id &&
          row?.id.toString().toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.transactionNo && row?.transactionNo.toLowerCase().includes(keyword.trim().toLowerCase())) 

          const matchesType = !complaintStatus || complaintStatus === "---Select Complaint Status---" || row.status === complaintStatus;
          return matchesKeyword && matchesType;
        }
  );
  // const handleSearch = () => {
  //   const filteredDate = apiData.filter((item) => {
  //     const itemDate = new Date(item.createdAt);
  //     const from = new Date(fromDate);
  //     const to = new Date(toDate);

  //     if (fromDate && toDate) {
  //       return itemDate >= from && itemDate <= to;
  //     }
  //     return true;
  //   });
  //   return filteredDate;
  // };

  const clearDateFilters = () => {
    setFromDate(""); // Clear fromDate
    setToDate(""); // Clear toDate
    setCurrentPage(0); // Reset pagination to the first page
  };

  const totalPages = Math.ceil(apiData.length / complaintsPerPage);

  const filterPagination = () => {
    const filteredItem = filteredItems;
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredItem?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showApiData = filterPagination();
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
                          Complaint Raised List
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Complaint Raised List{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          {/* <div className="col-12 col-md-4 col-lg-3">
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
                              className="form-control"
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
                          <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                              onClick={clearDateFilters}
                            >
                              Clear
                            </button>
                          </div> */}

<div className="col-12 col-md-12 col-lg-12 col-xl-8">
                                                        {/* <label for="fromDate" className="form-label">From</label> */}
                                                        <input id="fromDate" 
                                                        className="form-control"
                                                         type="search"
                                                         placeholder="Search By Complaint ID ,Transaction No."
                                                         value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                                                         />
                                                    </div>
                                                    <div className="col-12 col-md-12 col-lg-12 col-xl-3">
                                                        
                                                  
                                                        {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                                                        <select
                                                          className="form-select"
                                                          aria-label="Default select example"
                                                          value={complaintStatus}
                                                          onChange={(e) => setComplaintStatus(e.target.value)}
                                                          
                                                        >
                                                          <option selected>---Select Complaint Status---</option>
                                                          <option value="Pending">Pending</option>
                                                          <option value="Resolve">Resolve</option>
                                                      
                                                        </select>
                                                     
                                                                                </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            {loading ? (
                             <div className="d-flex justify-content-center">
                             <Spinner animation="border" role="status">
                               <span className="visually-hidden ">
                                 Loading...
                               </span>
                             </Spinner>
                           </div>
                            ) : (
                              <table class="table table-striped">
                                <thead className="table-dark">
                                  <tr>
                                    <th scope="col">Complaint ID</th>
                                    <th scope="col">Ticket Raised Date</th>
                                    <th scope="col">Complaint Type</th>
                                    <th scope="col">Complaint Mobile</th>
                                    <th scope="col">Remark</th>
                                    <th scope="col">Transaction No.</th>
                                    <th scope="col">Complaint File</th>
                                    <th scope="col">Resolve Date</th>
                                    <th scope="col">Response</th>

                                    <th scope="col">Status</th>
                                    {/* <th scope="col">Response</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {showApiData && showApiData.length > 0 ? (
                                    showApiData.map((item, index) => (
                                      <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.createdAt}</td>
                                        <td>{item.complainType}</td>
                                        <td>{item.mobileNo}</td>
                                        <td>{item.remark}</td>
                                        <td>{item.transactionNo}</td>
                                        <td>
                                              {
                                               item.complainFile ? 
                                               <a
                                               href={item.complainFile}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                             >
                                               View
                                             </a> 
                                             :
                                             "Not Available"
                                              }
                                             
                                            </td>
                                            <td>{item.process_date}</td>
                                            <td>{item.response}</td>
                                        <td>{item.status}</td>
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

export default AllComplaintsList;

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
