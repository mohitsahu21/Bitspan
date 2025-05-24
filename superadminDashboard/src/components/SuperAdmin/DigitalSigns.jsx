import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
import { FaPlus } from "react-icons/fa";

const DigitalSigns = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [Status, setStatus] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    year: "",
    amount: "",
    link: "",
    status: "",
  });

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/retailer/getdigitalSignaturePlan",
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
    fetchComplaints();
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [isRefresh]);

  const filteredItems = users.filter((row) => {
    const matchesKeyword =
      row?.year &&
      row.year.toLowerCase().includes(keyword.trim().toLowerCase());

    const matchesType =
      !Status || Status === "---Select Status---" || row.status === Status;
    return matchesKeyword && matchesType;
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

  const handleUpdateSubmit = async () => {
    const { id, year, amount, link, status } = editData;
    if (!year || !amount || !link || !status) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    try {
      const { data } = await axios.put(
        `https://2kadam.co.in/api/auth/retailer/updateDigitalSignaturePlan/${id}`,
        { year, amount, link, status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.status === "Success") {
        Swal.fire("Success", data.message, "success");
        setShowModal(false);
        fetchComplaints(); // Refresh table
      }
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire(
        "Error",
        error?.response?.data?.error || "Update failed",
        "error"
      );
    }
  };

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
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Digital Signature
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Digital Signature
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                            {/* <label for="fromDate" className="form-label">From</label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              placeholder="Search Plan"
                              value={keyword}
                              // onChange={(e) => setKeyword(e.target.value)}
                              onChange={(e) => {
                                setKeyword(e.target.value);
                                setCurrentPage(0);
                              }}
                            />
                          </div>
                          <div className="col-12 col-md-6 col-lg-3 col-xl-3">
                            {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={Status}
                              onChange={(e) => {
                                setStatus(e.target.value);
                                setCurrentPage(0);
                              }}
                            >
                              <option selected>---Select Status---</option>
                              <option value="Active">Active</option>
                              <option value="Deactive">Deactive</option>
                            </select>
                          </div>
                          <div className="col-12 col-md-6 col-lg-3 col-xl-3 d-grid">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                // Handle add new plan logic here
                                console.log("Add New Plan clicked");
                                navigate("/new-digital-signature-plan");
                              }}
                            >
                              <FaPlus className="me-2" /> Add New Plan
                            </button>
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
                                      <th scope="col">Plan Id</th>
                                      <th scope="col">Year</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Link</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Created At</th>
                                      <th scope="col">Updated At</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {showApiData && showApiData.length > 0 ? (
                                      showApiData?.map((user, index) => (
                                        <tr key={user.id}>
                                          <th scope="row">{user.id}</th>
                                          <td>{user.year}</td>
                                          <td>{user.amount}</td>
                                          <td>{user.link}</td>
                                          <td>{user.status}</td>
                                          <td>{user.created_at}</td>
                                          <td>{user.updated_at}</td>
                                          <td>
                                            <button
                                              className="btn btn-sm btn-warning"
                                              onClick={() => {
                                                setEditData(user);
                                                setShowModal(true);
                                              }}
                                            >
                                              Edit
                                            </button>
                                          </td>
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
                              forcePage={currentPage}
                            />
                          </PaginationContainer>
                        </div>

                        {/* Start Modal */}
                        <Modal
                          show={showModal}
                          onHide={() => setShowModal(false)}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Update Plan</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form>
                              <div className="mb-3">
                                <label>Year</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editData.year}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      year: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label>Amount</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editData.amount}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      amount: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label>Link</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editData.link}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      link: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label>Status</label>
                                <select
                                  className="form-select"
                                  value={editData.status}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      status: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="Active">Active</option>
                                  <option value="Deactive">Deactive</option>
                                </select>
                              </div>
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setShowModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={handleUpdateSubmit}
                            >
                              Update
                            </button>
                          </Modal.Footer>
                        </Modal>

                        {/* END Modal */}
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

export default DigitalSigns;

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
