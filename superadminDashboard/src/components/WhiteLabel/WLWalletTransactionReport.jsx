import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const WLWalletTransactionReport = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [filteredItems, setFilteredItems] = useState([]);
  const userId = currentUser?.userId;

  const fetchOfflineForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        // `https://2kadam.co.in/api/auth/superDistributor/getWalletSummary/${userId}`,
        `https://2kadam.co.in/api/auth/whiteLabel/getWalletSummary/${userId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfflineForm();
  }, []);

  // useEffect(() => {
  //   fetchOfflineForm();
  // }, [isRefresh]);

  useEffect(() => {
    // Update filtered items when filters change
    applyFilters();
  }, [keyword, fromDate, toDate, users]);

  const applyFilters = () => {
    console.log("Filtering data from:", fromDate, "to:", toDate);
    const filtered = users.filter((row) => {
      const searchKeyword = keyword.trim().toLowerCase();
      const matchesKeyword =
        (row?.Transaction_Id &&
          row.Transaction_Id.toLowerCase().includes(searchKeyword)) ||
        (row?.Order_Id && row.Order_Id.toLowerCase().includes(searchKeyword));

      // const matchesDate =
      //   (!fromDate || new Date(row.transaction_date) >= new Date(fromDate)) &&
      //   (!toDate || new Date(row.transaction_date) <= new Date(toDate));

      const matchesDate =
        (!fromDate ||
          new Date(row.transaction_date).setHours(0, 0, 0, 0) >=
            new Date(fromDate).setHours(0, 0, 0, 0)) &&
        (!toDate ||
          new Date(row.transaction_date).setHours(23, 59, 59, 999) <=
            new Date(toDate).setHours(23, 59, 59, 999));

      return matchesKeyword && matchesDate;
    });

    setFilteredItems(filtered);
    setCurrentPage(0); // Reset pagination on filter change
  };

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
                          Wallet Transaction Report
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Wallet Transaction Report
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
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
                              className="form-control"
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                            />
                          </div>
                          {/* <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                              onClick={applyFilters}
                            >
                              Search
                            </button>
                          </div> */}
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
                                      <th scope="col">#</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Order Id</th>
                                      <th scope="col">Transaction Id</th>
                                      <th scope="col">Credit Amount</th>
                                      <th scope="col">Debit Amount</th>
                                      <th scope="col">
                                        Opening <br /> Balance
                                      </th>
                                      <th scope="col">
                                        Closing <br /> Balance
                                      </th>
                                      <th scope="col">
                                        Transaction <br /> Type
                                      </th>
                                      <th scope="col">Transaction Details</th>
                                      <th scope="col">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {showApiData && showApiData.length > 0 ? (
                                      showApiData?.map((item, index) => (
                                        <tr key={index}>
                                          <td>
                                            {currentPage * complaintsPerPage +
                                              index +
                                              1}
                                          </td>
                                          <td>{item.transaction_date}</td>
                                          <td>{item.Order_Id}</td>
                                          <td>{item.Transaction_Id}</td>
                                          <td>{item.credit_amount}</td>{" "}
                                          <td>{item.debit_amount}</td>{" "}
                                          {/* Added 'Amount' field */}
                                          <td>{item.Opening_Balance}</td>
                                          <td>{item.Closing_Balance}</td>
                                          <td>{item.Transaction_Type}</td>
                                          <td>{item.Transaction_details}</td>
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

export default WLWalletTransactionReport;

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
