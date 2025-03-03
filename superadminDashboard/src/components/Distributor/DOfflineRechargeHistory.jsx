import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdGrid3X3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const DOfflineRechargeHistory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [formStatus, setFormStatus] = useState(""); // For user type filter
  const [ShowApproveModel, setShowApproveModel] = useState(false);
  const [ShowRejectModel, setShowRejectModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [fromDate, setFromDate] = useState(""); // From date filter
  const [toDate, setToDate] = useState(""); // To date filter

  // Fetch userId and token from Redux store
  const userId = useSelector((state) => state.user.currentUser?.userId);

  const maskSensitiveInfo = (value, maskLength, revealLength) => {
    const maskedValue = "*".repeat(maskLength);
    const revealedValue = value.slice(-revealLength);
    return maskedValue + revealedValue;
  };

  const fetchOfflineForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/Distributor/getSpecificUserTransactions/${userId}`,
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

  // useEffect(() => {
  //   fetchOfflineForm();
  // }, []);

  useEffect(() => {
    fetchOfflineForm();
  }, [isRefresh, userId, token]);

  const filteredItems = users.filter((row) => {
    const matchesKeyword =
      (row?.mobile_no &&
        row.mobile_no.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.UserName &&
        row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.orderid &&
        row.orderid.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.created_by_userid &&
        row.created_by_userid
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()));

    const matchesType =
      !formStatus ||
      formStatus === "---Select Form Status---" ||
      row.status === formStatus;

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

  console.log(filteredItems);

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

  console.log(users);

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
                          Offline Recharge Requests
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Offline Recharge Requests
                          </span>{" "}
                        </p>
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
                              className="form-control "
                              type="date"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                            />
                          </div> */}
                          {/* <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                            >
                              Search
                            </button>
                          </div> */}

                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            {/* <label for="fromDate" className="form-label">From</label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              // placeholder="Enter Number/Order Id/User Name/User Id"
                              placeholder="Order Id/User Id"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-3">
                            {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={formStatus}
                              onChange={(e) => setFormStatus(e.target.value)}
                            >
                              <option selected>---Select Form Status---</option>
                              <option value="Pending">Pending</option>
                              <option value="Approve">Approve</option>
                              <option value="Reject">Reject</option>
                            </select>
                          </div>
                        </div>

                        <div className="d-flex flex-column flex-xl-row gap-3">
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
                                      <th scope="col">Sr.No</th>
                                      <th scope="col"> Date</th>
                                      <th scope="col">Order Id</th>
                                      <th scope="col">Number</th>
                                      <th scope="col">Operator Name</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Recharge Type</th>
                                      <th scope="col">User Id</th>
                                      {/* <th scope="col">User Name</th>
                                      <th scope="col">User Mobile</th> */}
                                      <th scope="col">Status</th>
                                      <th scope="col">Note</th>
                                      {/* <th scope="col">Action</th> */}
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
                                          <td>{item.created_at}</td>
                                          <td>{item.orderid}</td>
                                          {/* <td>{item.mobile_no}</td> */}
                                          <td>
                                            {maskSensitiveInfo(
                                              item.mobile_no,
                                              6,
                                              4
                                            )}
                                          </td>

                                          <td>{item.operator_name}</td>
                                          <td>{item.amount}</td>
                                          <td>{item.recharge_Type}</td>

                                          <td>{item.created_by_userid}</td>
                                          {/* <td>{item.UserName}</td>
                                          <td>{item.ContactNo}</td> */}
                                          <td>{item.status}</td>
                                          <td>{item.note}</td>
                                          {/* <td>
                                            {item.status === "Pending" && (
                                              <Dropdown>
                                                <Dropdown.Toggle
                                                  variant="success"
                                                  // id={`dropdown-${user.id}`}
                                                  as="span"
                                                  style={{
                                                    border: "none",
                                                    background: "none",
                                                    cursor: "pointer",
                                                  }}
                                                  className="custom-dropdown-toggle"
                                                >
                                                  <PiDotsThreeOutlineVerticalBold />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowApproveModel(true);
                                                      setSelectedItem(item);
                                                      //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Approve
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowRejectModel(true);
                                                      setSelectedItem(item);
                                                      //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Reject
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            )}
                                          </td> */}
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

        {/* Approve  Model  start*/}

        <Modal
          // size="lg"
          show={ShowApproveModel}
          //   fullscreen={true}
          onHide={() => setShowApproveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Approve
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SAApproveModel
                item={selectedItem}
                setShowApproveModel={setShowApproveModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Approve Model  end*/}

        {/* Reject Model  start*/}

        <Modal
          // size="lg"
          show={ShowRejectModel}
          //   fullscreen={true}
          onHide={() => setShowRejectModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Reject
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SARejectModel
                item={selectedItem}
                setShowRejectModel={setShowRejectModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Reject Model  end*/}
      </Wrapper>
    </>
  );
};

export default DOfflineRechargeHistory;

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
  .custom-dropdown-toggle::after {
    display: none !important;
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
