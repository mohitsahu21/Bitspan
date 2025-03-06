import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProviderTwoHistory from "./ProviderTwoHistory";
const PostpaidRechargeHistory = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const userID = currentUser.userId;

  const fetchRechargeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getApiPostRechargeData/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data);
      setAllData(data);
      setFilteredData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  console.log(allData);

  useEffect(() => {
    const filtered = allData.filter((item) => {
      const searchValue = filterValue.trim().toLowerCase();
      const mobileNo = item.mobile_no ? item.mobile_no.toLowerCase() : "";
      const transactionId = item.transaction_id
        ? item.transaction_id.toLowerCase()
        : "";
      const orderId = item.orderid ? item.orderid.toLowerCase() : "";

      return (
        mobileNo.includes(searchValue) ||
        transactionId.includes(searchValue) ||
        orderId.includes(searchValue)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(0);
  }, [filterValue, allData]);

  useEffect(() => {
    fetchRechargeData();
  }, []);

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
                className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>Prepaid Recharge History</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Postpaid Recharge History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Postpaid Recharge History
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <Tabs
                        defaultActiveKey="Provider 1"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        variant="tabs"
                      >
                        <Tab eventKey="Provider 1" title="Provider 1">
                          <div className="row d-flex flex-column g-4">
                            <div className="d-flex flex-column flex-md-row gap-3">
                              <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                                <input
                                  className="form-control"
                                  type="search"
                                  id="floatingInputGroup1"
                                  placeholder="Search by Mob No, TXN ID, or Ord ID"
                                  value={filterValue}
                                  onChange={(e) => {
                                    setFilterValue(e.target.value);
                                    setCurrentPage(0);
                                    // if (e.target.value === "") {
                                    //   setCurrentPage(0);
                                    // }
                                  }}
                                  // onKeyDown={(e) => {
                                  //   if (e.key === "Escape") {
                                  //     setFilterValue("");
                                  //     setCurrentPage(0);
                                  //   }
                                  // }}
                                />
                              </div>

                              {/* <div className="d-flex">
                            <button
                              type="button"
                              className="btn btn-primary button px-4"
                              onClick={() => fetchRechargeData()}
                            >
                              Search
                            </button>
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
                                  <>
                                    <table class="table table-striped">
                                      <thead className="table-dark">
                                        <tr>
                                          <th scope="col">#</th>
                                          <th scope="col">Date</th>
                                          <th scope="col">Order ID</th>
                                          <th scope="col">Transaction ID</th>
                                          <th scope="col">Operator Name</th>
                                          <th scope="col">Phone Number</th>
                                          <th scope="col">Details</th>
                                          <th scope="col">Amount</th>
                                          <th scope="col">Debit</th>
                                          <th scope="col">Earning</th>
                                          <th scope="col">Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {displayData.length > 0 ? (
                                          displayData.map((item, index) => (
                                            <tr key={item.id}>
                                              <td>
                                                {currentPage *
                                                  complaintsPerPage +
                                                  index +
                                                  1}
                                              </td>
                                              <td>{item.created_at}</td>
                                              <td>{item.orderid}</td>
                                              <td>{item.transaction_id}</td>
                                              <td>{item.operator_name}</td>
                                              <td>{item.mobile_no}</td>
                                              <td>{item.message}</td>
                                              <td>{item.amount}</td>
                                              {item.status == "Success" ||
                                              item.status == "SUCCESS" ? (
                                                <td>{item.walletDeductAmt}</td>
                                              ) : (
                                                <td>NA</td>
                                              )}
                                              {item.walletDeductAmt &&
                                              item.amount &&
                                              (item.status == "Success" ||
                                                item.status == "SUCCESS") ? (
                                                <td>
                                                  {(
                                                    parseFloat(item.amount) -
                                                    parseFloat(
                                                      item.walletDeductAmt
                                                    )
                                                  ).toFixed(2)}
                                                </td>
                                              ) : (
                                                <td>NA</td>
                                              )}
                                              <td>{item.status}</td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td
                                              colSpan="10"
                                              className="text-center"
                                            >
                                              No results found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </>
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
                        </Tab>
                        <Tab eventKey="Provider 2" title="Provider 2">
                          <ProviderTwoHistory rechargeType="Postpaid" />
                        </Tab>
                      </Tabs>
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

export default PostpaidRechargeHistory;

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
