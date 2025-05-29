import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PanTransactionReport = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [selectedApi, setSelectedApi] = useState("api1");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  // const [selectedDate, setSelectedDate] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [fromDate, setFromDate] = useState(""); // From date filter
  const [toDate, setToDate] = useState(""); // To date filter
  const [PaymentMode, setPaymentMode] = useState("");

  const api1Url = `https://2kadam.co.in/api/auth/retailer/nsdl-trans-new-requst/${currentUser?.userId}`;
  const api2Url = `https://2kadam.co.in/api/auth/retailer/nsdl-trans-correction/${currentUser?.userId}`;

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setApiData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedApi === "api1") {
      fetchData(api1Url);
    } else if (selectedApi === "api2") {
      fetchData(api2Url);
    }
  }, [selectedApi]);

  const handleApiChange = (e) => {
    setSelectedApi(e.target.value);
  };

  // const filteredItems = apiData.filter(
  //   (row) =>
  //     (row?.name &&
  //       row.name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
  //     (row?.orderid && row.orderid.includes(keyword.trim())) ||
  //     (row?.created_at && row.created_at.split(" ")[0] === selectedDate)
  // );
  const filteredItems = apiData.filter((row) => {
    const matchesKeyword =
      (row?.orderid &&
        row.orderid.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.txid &&
        row.txid.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.name &&
        row.name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.mobile &&
        row.mobile.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.email &&
        row.email.toLowerCase().includes(keyword.trim().toLowerCase()));

    // const matchesType = !PaymentMode || PaymentMode === "---Select---" || row.status === PaymentMode;
    const matchesType =
      !PaymentMode ||
      PaymentMode === "---Select---" ||
      (PaymentMode === "Failed" &&
        (row.status === "Failed" || row.status === "Failure")) ||
      row.status === PaymentMode;
    // return matchesKeyword && matchesType ;
    const matchesDate =
      (!fromDate ||
        new Date(row.created_at).toISOString().split("T")[0] >=
          new Date(fromDate).toISOString().split("T")[0]) &&
      (!toDate ||
        new Date(row.created_at).toISOString().split("T")[0] <=
          new Date(toDate).toISOString().split("T")[0]);
    // console.log(matchesKeyword);
    return matchesKeyword && matchesDate && matchesType;
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [PaymentMode, fromDate, toDate, keyword]);

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
                          NSDL PAN Transaction History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; NSDL PAN Transaction
                          History
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
                            <label for="toDate" className="form-label">
                              Date
                            </label>
                            <input
                              id="date"
                              className="form-control"
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                            />
                          </div>
                          <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                              onClick={() => setCurrentPage(0)} // Reset pagination to the first page on search
                            >
                              Search
                            </button>
                          </div>
                          <div className="d-flex align-items-end">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={handleApiChange}
                              value={selectedApi}
                            >
                              <option value="" disabled>-- Select--</option>
                              <option value="api1">NSDL New Request</option>
                              <option value="api2">NSDL Correction</option>
                            </select>
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
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="toDate" className="form-label">
                              Select Status
                            </label>
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
                              placeholder="Search By Name/Mobile/Email/Order Id/Txn Id"
                              value={keyword}
                              onChange={(e) => (
                                setKeyword(e.target.value), setCurrentPage(0)
                              )}
                            />
                          </div>
                          <div className="d-flex align-items-end">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={handleApiChange}
                              value={selectedApi}
                            >
                              <option value="" disabled>
                                -- Select--
                              </option>
                              <option value="api1">NSDL New Request</option>
                              <option value="api2">NSDL Correction</option>
                            </select>
                          </div>

                          {/* <div className="d-flex align-items-end">
        <button type="button" className="btn btn-primary button">Search</button>
    </div> */}
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
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    {/* <th scope="col">P-Order Id</th> */}
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Transaction Id</th>
                                    <th scope="col">
                                      Application <br /> Mode
                                    </th>
                                    <th scope="col">Category</th>
                                    {/* <th scope="col">Ack No.</th> */}
                                    <th scope="col">Amount</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">
                                      Date of <br />
                                      Birth
                                    </th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Physical Pan</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">View</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {showApiData && showApiData.length > 0 ? (
                                    showApiData.map(
                                      (
                                        item,
                                        index // Pass `index` here as the second argument
                                      ) => (
                                        <tr key={index}>
                                          <td>
                                            {currentPage * complaintsPerPage +
                                              index +
                                              1}
                                          </td>{" "}
                                          {/* Use `index + 1` for the row number */}
                                          <td>{item.created_at}</td>
                                          <td>{item.orderid}</td>
                                          <td>{item.txid}</td>
                                          <td>{item.applicationMode}</td>
                                          <td>{item.selectType}</td>
                                          <td>{item.walletDeductAmt}</td>
                                          <td>{item.name}</td>
                                          <td>{item.dob}</td>
                                          <td>{item.gender}</td>
                                          <td>{item.mobile}</td>
                                          <td>{item.email}</td>
                                          <td>{item.physicalPan}</td>
                                          <td>{item.status}</td>
                                          <td>{item.message}</td>
                                          <td>
                                            <button
                                              className="btn btn-dark btn-sm"
                                              onClick={() =>
                                                navigate(
                                                  `/pan-receipt/${item.orderid}`
                                                )
                                              }
                                            >
                                              Receipt
                                            </button>
                                          </td>
                                        </tr>
                                      )
                                    )
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

export default PanTransactionReport;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    /* background: #6d70ff; */
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

  // import React from "react";
  // import styled from "styled-components";
  // import { MdFormatListNumberedRtl } from "react-icons/md";
  // import { BiHomeAlt } from "react-icons/bi";

  // const PanTransactionReport = () => {
  //     return (
  //         <>
  //             <Wrapper>
  //                 <div className="main">
  //                     <div className="container-fluid ">
  //                         <div className="row flex-wrap justify-content-lg-center justify-content-center">
  //                             <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
  //                                 {/* <Sider /> */}
  //                             </div>
  //                             <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
  //                              mt-5 formdata">
  //                                 <div className="main shadow-none ">
  //                                     <div className="row shadow-none ">
  //                                         <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
  //                                             {/* <div className="text-center">
  //                                                 <h3>PAN Transaction Report</h3>
  //                                             </div> */}
  //                                             <div className="d-flex justify-content-between align-items-center flex-wrap">
  //                                                 <h4 className="mx-lg-5 px-lg-3 px-xxl-5">PAN Transaction Report</h4>
  //                                                 <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp;/ &nbsp; PAN Transaction Report</h6>
  //                                             </div>

  //                                         </div>
  //                                     </div>

  //                                     <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
  //                                         <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow bg-body-tertiary rounded  p-5 m-4">
  //                                             <div className="row d-flex flex-column g-4">

  //                                                 <div className="d-flex flex-column flex-md-row gap-3">
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

  //                                                 </div>

  //                                                 <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
  //                                                     <div class="table-responsive">
  //                                                         <table class="table table-striped">
  //                                                             <thead className="table-dark">
  //                                                                 <tr>
  //                                                                     <th scope="col">#</th>
  //                                                                     <th scope="col">Date</th>
  //                                                                     <th scope="col">P-Order Id</th>
  //                                                                     <th scope="col">Order Id</th>
  //                                                                     <th scope="col">Application <br /> Type</th>
  //                                                                     <th scope="col">Category</th>
  //                                                                     <th scope="col">Ack No.</th>
  //                                                                     <th scope="col">Amount</th>
  //                                                                     <th scope="col">Name</th>
  //                                                                     <th scope="col">Date of <br />Birth</th>
  //                                                                     <th scope="col">Gender</th>
  //                                                                     <th scope="col">Mobile No</th>
  //                                                                     <th scope="col">Email</th>
  //                                                                     <th scope="col">Status</th>
  //                                                                     <th scope="col">Message</th>
  //                                                                 </tr>
  //                                                             </thead>
  //                                                             <tbody>
  //                                                                 <tr>
  //                                                                     <th scope="row">1</th>
  //                                                                     <td>23/05/2024 14:35:58</td>
  //                                                                     <td>PAN465484654</td>
  //                                                                     <td>NSDL464444416785165</td>
  //                                                                     <td>EKYC 49A</td>
  //                                                                     <td>Individual</td>
  //                                                                     <td>984616846516846</td>
  //                                                                     <td>107.00</td>
  //                                                                     <td>Mohit Sahu</td>
  //                                                                     <td>30/05/2000</td>
  //                                                                     <td>M</td>
  //                                                                     <td>9856325698</td>
  //                                                                     <td>mohitsahu@gmail.com</td>
  //                                                                     <td>SUCCESS</td>
  //                                                                     <td>Transaction Successfull</td>
  //                                                                 </tr>
  //                                                                 <tr>
  //                                                                     <th scope="row">2</th>
  //                                                                     <td>23/05/2024 14:35:58</td>
  //                                                                     <td>PAN465484654</td>
  //                                                                     <td>NSDL464444416785165</td>
  //                                                                     <td>EKYC 49A</td>
  //                                                                     <td>Individual</td>
  //                                                                     <td>984616846516846</td>
  //                                                                     <td>107.00</td>
  //                                                                     <td>Mohit Sahu</td>
  //                                                                     <td>30/05/2000</td>
  //                                                                     <td>M</td>
  //                                                                     <td>9856325698</td>
  //                                                                     <td>mohitsahu@gmail.com</td>
  //                                                                     <td>SUCCESS</td>
  //                                                                     <td>Transaction Successfull</td>
  //                                                                 </tr>

  //                                                             </tbody>
  //                                                         </table>
  //                                                     </div>
  //                                                     <div className="float-end">
  //                                                         <nav aria-label="Page navigation example">
  //                                                             <ul className="pagination">
  //                                                                 <li className="page-item"><a className="page-link" href="#">Previous</a></li>
  //                                                                 <li className="page-item"><a className="page-link" href="#">1</a></li>

  //                                                                 <li className="page-item"><a className="page-link" href="#">Next</a></li>
  //                                                             </ul>
  //                                                         </nav>
  //                                                     </div>
  //                                                 </div>
  //                                             </div>

  //                                         </div>

  //                                     </div>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </Wrapper>
  //         </>
  //     );
  // }

  // export default PanTransactionReport

  // const Wrapper = styled.div
`;
//   .main {
//     height: 100%;
//     width: 100%;
//   }
//   button {
//     color: #fff;
//     background: #6d70ff;
//   }
//   .form-container {
//     width: 50%;
//     margin: auto;
//   }
//   th{
//     font-weight: 500;
//     font-size: 14px;

//   }
//   td{
//    font-size: 14px;

//   }
//   @media (min-width: 1025px) and (max-width : 1500px){
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
{
  /* <tbody>
                                  {apiData && apiData.length > 0 ? (
                                    apiData.map((item) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.orderid}</td>
                                        <td>{item.applicationMode}</td>
                                        <td>{item.selectType}</td>
                                        <td>{item.walletDeductAmt}</td>
                                        <td>{item.name}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.email}</td>
                                        <td>{item.status}</td>
                                        <td>{item.message}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="3">No data available</td>
                                    </tr>
                                  )}
                                </tbody> */
}
