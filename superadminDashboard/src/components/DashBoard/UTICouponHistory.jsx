import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { Dropdown, Modal, Spinner } from "react-bootstrap";

const UTICouponHistory = () => {
  //   const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const { currentUser, token } = useSelector((state) => state.user);
  //   const [users, setUsers] = useState([]);
  //   const [keyword, setKeyword] = useState("");
  //   const complaintsPerPage = 10;
  //   const [currentPage, setCurrentPage] = useState(0);
  //   const [formStatus, setFormStatus] = useState(""); // For user type filter
  //   const [ShowApproveModel, setShowApproveModel] = useState(false);
  //   const [ShowRejectModel, setShowRejectModel] = useState(false);
  //   const [isRefresh, setIsRefresh] = useState(false);
  //   const [selectedItem, setSelectedItem] = useState("");
  //   const [fromDate, setFromDate] = useState(""); // From date filter
  //   const [toDate, setToDate] = useState(""); // To date filter

  //   const userID = currentUser.userId;

  //   const fetchOfflineForm = async () => {
  //     setLoading(true);
  //     try {
  //       const { data } = await axios.get(
  //         `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getCoupon/${userID}`
  //         // {
  //         //   headers: {
  //         //     "Content-Type": "application/json",
  //         //     Authorization: `Bearer ${token}`,
  //         //   },
  //         // }
  //       );
  //       setUsers(data.data);
  //       console.log(data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       if (error?.response?.status == 401) {
  //         // alert("Your token is expired please login again")
  //         Swal.fire({
  //           icon: "error",
  //           title: "Your token is expired please login again",
  //         });
  //         dispatch(clearUser());
  //         navigate("/");
  //       }
  //       setLoading(false);
  //     }
  //   };

  //   // useEffect(() => {
  //   //   fetchOfflineForm();
  //   // }, []);

  //   useEffect(() => {
  //     fetchOfflineForm();
  //   }, [isRefresh]);

  //   const filteredItems = users.filter((row) => {
  //     const matchesKeyword =
  //       (row?.user_id &&
  //         row.user_id.toLowerCase().includes(keyword.trim().toLowerCase())) ||
  //       (row?.UserName &&
  //         row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
  //       (row?.ContactNo &&
  //         row.ContactNo.toLowerCase().includes(keyword.trim().toLowerCase())) ||
  //       (row?.Email &&
  //         row.Email.toLowerCase().includes(keyword.trim().toLowerCase())) ||
  //       (row?.order_id &&
  //         row.order_id.toLowerCase().includes(keyword.trim().toLowerCase()));

  //     // const matchesType = !formStatus || formStatus === "---Select Form Status---" || row.status === formStatus;
  //     // return matchesKeyword && matchesType ;
  //     const matchesDate =
  //       (!fromDate ||
  //         new Date(row.created_at).toISOString().split("T")[0] >=
  //           new Date(fromDate).toISOString().split("T")[0]) &&
  //       (!toDate ||
  //         new Date(row.created_at).toISOString().split("T")[0] <=
  //           new Date(toDate).toISOString().split("T")[0]);
  //     console.log(matchesKeyword);
  //     return matchesKeyword && matchesDate;
  //   });

  //   const totalPages = Math.ceil(filteredItems.length / complaintsPerPage);

  //   const filterPagination = () => {
  //     const startIndex = currentPage * complaintsPerPage;
  //     const endIndex = startIndex + complaintsPerPage;
  //     return filteredItems?.slice(startIndex, endIndex);
  //   };

  //   const handlePageChange = ({ selected }) => {
  //     setCurrentPage(selected);
  //   };

  //   const showApiData = filterPagination();

  //   console.log(showApiData);

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata"
              >
                <div className="main shadow-none">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          UTI Coupon History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; UTI Coupon History{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4 ">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-3 col-lg-3">
                            <label for="fromDate" className="form-label">
                              From
                            </label>
                            <input
                              id="fromDate"
                              className="form-control"
                              type="date"
                            />
                          </div>
                          <div className="col-12 col-md-3 col-lg-3">
                            <label for="toDate" className="form-label">
                              To
                            </label>
                            <input
                              id="toDate"
                              className="form-control "
                              type="date"
                            />
                          </div>
                          <div className="col-12 col-md-3 col-lg-3 d-flex align-items-end">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>---Distributed---</option>
                              <option value="1">---Wallet Bought---</option>
                            </select>
                          </div>
                          <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                            >
                              Search
                            </button>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            <table class="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Order Id</th>
                                  <th scope="col">Transaction Id</th>
                                  <th scope="col">Reference</th>
                                  <th scope="col">User Id</th>
                                  <th scope="col">User Name</th>
                                  <th scope="col">To</th>
                                  <th scope="col">Role</th>
                                  <th scope="col">No Of Coupon</th>
                                  <th scope="col">Total Amount</th>
                                  <th scope="col">Type</th>
                                  <th scope="col">
                                    Opening <br /> Balance
                                  </th>
                                  <th scope="col">
                                    Closing <br /> Balance
                                  </th>
                                  {/* <th scope="col">Transaction  <br /> Details</th> */}
                                  <th scope="col">Website</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* <tr>

                                                                    <td>23/05/2024 14:35:58</td>
                                                                    <td>Wallet-Ashi465484654</td>
                                                                    <td>4564564644444167851656541654</td>
                                                                    <td>100.00</td>
                                                                    <td>100.00</td>
                                                                    <td>200.00</td>
                                                                    <td>Add Money to Wallet</td>
                                                                    <td>success</td>
                                                                </tr> */}
                                {/* <tr>
                                                                    <th scope="row">2</th>
                                                                    <td>23/05/2024 14:35:58</td>
                                                                    <td>Wallet-Ashi465484654</td>
                                                                    <td>4564564644444167851656541654</td>
                                                                    <td>100.00</td>
                                                                    <td>100.00</td>
                                                                    <td>200.00</td>
                                                                    <td>Add Money to Wallet</td>
                                                                    <td>success</td>
                                                                </tr> */}
                              </tbody>
                            </table>
                          </div>
                          <div className="float-end">
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
                          </div>
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

export default UTICouponHistory;

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
