// import React, { useState } from "react";
// import styled from "styled-components";
// import { MdOutlineFormatListNumbered } from "react-icons/md";
// import { FaMobileAlt } from "react-icons/fa";
// import { RiMarkPenLine } from "react-icons/ri";
// import { BiHomeAlt } from "react-icons/bi";

// const SAFundTransferStatus = () => {
//   return (
//     <>
//       <Wrapper>
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row flex-wrap justify-content-center ">
//               <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
//                 {/* <Sider /> */}
//               </div>
//               <div
//                 className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
//                              mt-5 formdata"
//               >
//                 <div className="main shadow-none">
//                   <div className="row shadow-none">
//                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//                       {/* <div className="text-center">
//                                                 <h3>Wallet Transaction Report</h3>
//                                             </div> */}
//                       <div className="d-flex justify-content-between align-items-center flex-wrap">
//                         <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
//                           Fund Transfer Status
//                         </h4>
//                         <p className="mx-lg-5">
//                           {" "}
//                           <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
//                           <span
//                             className="text-body-secondary"
//                             style={{ fontSize: "13px" }}
//                           >
//                             {" "}
//                             Fund Transfer Status
//                           </span>{" "}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    
//                     <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
//                       <div className="row d-flex flex-column g-4">
//                         {/* <div className="d-flex flex-column flex-md-row gap-3">
//                                                     <div className="col-12 col-md-4 col-lg-3">
//                                                         <label for="fromDate" className="form-label">From</label>
//                                                         <input id="fromDate" className="form-control" type="date" />
//                                                     </div>
//                                                     <div className="col-12 col-md-4 col-lg-3">
//                                                         <label for="toDate" className="form-label">To</label>
//                                                         <input id="toDate" className="form-control " type="date" />
//                                                     </div>
//                                                     <div className="d-flex align-items-end">
//                                                         <button type="button" className="btn btn-primary button">Search</button>
//                                                     </div>

//                                                 </div> */}
//                                                 <div className="text-center">
//                       <h5>All Fund Transfer Request Status</h5>
//                     </div>

//                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                           <div class="table-responsive">
//                             <table class="table table-striped">
//                               <thead className="table-dark">
//                                 <tr>
//                                   <th scope="col">#</th>
//                                   <th scope="col">Transaction ID</th>
//                                   <th scope="col">Amount</th>
//                                   <th scope="col">
//                                   Payout Charge
//                                   </th>
//                                   <th scope="col">Payment Mode</th>
//                                   <th scope="col">Transaction No.</th>
//                                   <th scope="col">My Comments</th>
//                                   <th scope="col">Status</th>
//                                   <th scope="col">
//                                   Request Date
//                                   </th>
                                 
//                                 </tr>
//                               </thead>
//                               {/* <tbody>
//                                 <tr>
//                                   <th scope="row">1</th>
//                                   <td>23/05/2024 14:35:58</td>
//                                   <td>MOHIT29605</td>
//                                   <td>Mohit Sahu </td>
//                                   <td>JABALPUR</td>
//                                   <td>482002</td>
//                                   <td>MADHYA PRADESH</td>
//                                   <td>FTIPS3345K</td>
//                                   <td>0.00</td>
//                                   <td>0.00</td>
//                                   <td>RETAILER</td>
//                                   <td>ID : AASHISD29164 - Aashish Kumar</td>
//                                   <td>www.bitspan.in</td>
//                                   <td>COMPLETE</td>
//                                   <td>ACTIVE</td>
//                                 </tr>
//                               </tbody> */}
//                             </table>
//                           </div>
//                           <div className="float-end">
//                             <nav aria-label="Page navigation example">
//                               <ul className="pagination">
//                                 <li className="page-item">
//                                   <a className="page-link" href="#">
//                                     Previous
//                                   </a>
//                                 </li>
//                                 <li className="page-item">
//                                   <a className="page-link" href="#">
//                                     1
//                                   </a>
//                                 </li>

//                                 <li className="page-item">
//                                   <a className="page-link" href="#">
//                                     Next
//                                   </a>
//                                 </li>
//                               </ul>
//                             </nav>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Wrapper>
//     </>
//   );
// };

// export default SAFundTransferStatus;

// const Wrapper = styled.div`
//   .main {
//     height: 100%;
//     width: 100%;
//   }
//   .button {
//     background: #6d70ff;
//     border-color: #6d70ff;
//   }
//   .button:hover {
//     background: #5356fa;
//     border-color: #5356fa;
//   }
//   .form-container {
//     width: 50%;
//     margin: auto;
//   }
//   th {
//     font-weight: 500;
//     font-size: 14px;
//     white-space: nowrap;
//   }
//   td {
//     font-size: 14px;
//   }
//   @media (min-width: 1025px) and (max-width: 1500px) {
//     .formdata {
//       padding-left: 15rem;
//     }
//   }
//   @media (min-width: 1500px) {
//     .formdata {
//       padding-left: 13rem;
//     }
//   }
// `;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";

import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SAFundTransferStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [transactions, setTransactions] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // For Pagination

  const { token } = useSelector((state) => state.user);
  const complaintsPerPage = 10;
  const [fromDate, setFromDate] = useState(""); // From date filter
  const [toDate, setToDate] = useState(""); // To date filter
  const [keyword, setKeyword] = useState("");
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const [apiData, setApiData] = useState([]);
  const [status, setStatus] = useState("");

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getWalletToWalletTransfer`,
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getWalletToWalletTransfer/${userId}`,
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
        // Handle expired token
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        // Handle other errors gracefully
        setApiData([]);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch data. Please try again later.",
        });
      }
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Effect to fetch data whenever the currentPage changes
  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = apiData.filter((row) => {
    // const searchKeyword = keyword.trim().toLowerCase();
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
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                           mt-5 formdata"
              >
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      {/* <div className="text-center">
                                              <h3>Wallet Transaction Report</h3>
                                          </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Wallet TO Wallet Transfer History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Wallet TO Wallet Transfer
                          History
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded p-5 m-4">
                      <div className="text-center">
                        <h5>All Wallet Transfer Status</h5>
                      </div>
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
                              {/* <option value="Reject">Reject</option> */}
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
                              <>
                                <table className="table table-striped">
                                  <thead className="table-dark">
                                    <tr>
                                      <th scope="col">S.No.</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Sender ID</th>
                                      <th scope="col">Sender Name</th>
                                      <th scope="col">Receiver ID</th>
                                      <th scope="col">Receiver Name</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Order ID</th>
                                      <th scope="col">Transaction ID</th>
                                      <th scope="col">Transaction Details</th>
                                      <th scope="col">Status</th>
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
                                          <td>{item.sender_id}</td>
                                          <td>{item.sender_name}</td>
                                          <td>{item.receiver_id}</td>
                                          <td>{item.receiver_name}</td>
                                          <td>{item.amount}</td>
                                          <td>{item.order_id}</td>
                                          <td>{item.transaction_id}</td>
                                          <td>{item.transaction_details}</td>
                                          <td>{item.status}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="10">No data available</td>{" "}
                                        {/* Updated colSpan */}
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </>
                            )}
                          </div>
                          {/* Pagination */}
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

export default SAFundTransferStatus;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  .button {
    background: #6d70ff;
    border-color: #6d70ff;
  }
  .button:hover {
    background: #5356fa;
    border-color: #5356fa;
  }
  .form-container {
    width: 50%;
    margin: auto;
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
  .pagination {
    display: flex;
    list-style-type: none;
    padding: 0;
  }
  .pagination .active {
    font-weight: bold;
    color: #6d70ff;
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

