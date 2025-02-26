import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import VerifyEdistrictEditModel from "./VerifyEdistrictEditModel";

const VerifyDistrictHistory = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [showMarkEditModel, setShowMarkEditModel] = useState(false);
  const [formStatus, setFormStatus] = useState(""); // For user type filter

  const userID = currentUser.userId;

  const fetchRechargeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getVerifyEdistrict/${userID}`,
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
      // setFilteredData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(allData);

  // useEffect(() => {
  //   const filtered = allData.filter((item) => {
  //     const searchValue = filterValue.toLowerCase();
  //     const orderID = item.order_id ? item.order_id.toLowerCase() : "";
  //     const mobileNO = item.mobileNo ? item.mobileNo.toLowerCase() : "";

  //     return orderID.includes(searchValue) || mobileNO.includes(searchValue);
  //   });
  //   setFilteredData(filtered);
  // }, [filterValue, allData]);

  const filteredItems = allData?.filter((row) => {
    const matchesKeyword =
      (row?.samagra_id &&
        row.order_id
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase())) ||
      (row?.mobileNo &&
        row.mobileNo
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase())) ||
      (row?.name &&
        row.name.toLowerCase().includes(filterValue.trim().toLowerCase())) ||
      (row?.rsNumber &&
        row.rsNumber.toLowerCase().includes(filterValue.trim().toLowerCase()));

    const matchesType =
      !formStatus ||
      formStatus === "---Select Form Status---" ||
      row.status === formStatus;
    return matchesKeyword && matchesType;
  });
  // setFilteredData(filteredItems);

  useEffect(() => {
    fetchRechargeData();
  }, [isRefresh]);

  const totalPages = Math.ceil(filteredItems.length / complaintsPerPage);

  const paginateData = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredItems.slice(startIndex, endIndex);
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
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Verify E-District History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Verify E-District History
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            <input
                              className="form-control"
                              type="search"
                              id="floatingInputGroup1"
                              placeholder="Search by Name, Mob No, Order Id, RS Number"
                              value={filterValue}
                              onChange={(e) => {
                                setFilterValue(e.target.value);
                                if (e.target.value === "") {
                                  setCurrentPage(0);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                  setFilterValue("");
                                  setCurrentPage(0);
                                }
                              }}
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
                              <option value="Under Process">
                                Under Process
                              </option>
                              <option value="Success">Success</option>
                              <option value="Mark Edit">Mark Edit</option>
                              <option value="Reject">Reject</option>
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
                              <>
                                <table class="table table-striped">
                                  <thead className="table-dark">
                                    <tr>
                                      <th scope="col">Sr.No</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Order ID</th>
                                      <th scope="col">Application Type</th>
                                      <th scope="col">Name</th>
                                      <th scope="col">Mobile Number</th>
                                      <th scope="col">RS Number</th>
                                      <th scope="col">District</th>
                                      <th scope="col">Tehsil / Block</th>
                                      <th scope="col">Note</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {displayData.length > 0 ? (
                                      displayData.map((item, index) => (
                                        <tr key={(item.id, index)}>
                                          <th scope="row">
                                            {currentPage * complaintsPerPage +
                                              index +
                                              1}
                                          </th>
                                          <td>{item.created_at}</td>
                                          <td>{item.order_id}</td>
                                          <td>{item.applicationType}</td>
                                          <td>{item.name}</td>
                                          <td>{item.mobileNo}</td>
                                          <td>{item.rsNumber}</td>
                                          <td>{item.district}</td>
                                          <td>{item.tehsil}</td>
                                          <td>{item.note}</td>
                                          <td>{item.status}</td>
                                          <td>
                                            {(item.status === "Pending" ||
                                              item.status === "Mark Edit") && (
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
                                                      setShowMarkEditModel(
                                                        true
                                                      );
                                                      setSelectedItem(item);
                                                      //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Edit
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            )}
                                          </td>
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
        {/* Mark Edit Model  start*/}

        <Modal
          // size="lg"
          // centered
          show={showMarkEditModel}
          fullscreen={true}
          onHide={() => setShowMarkEditModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Edit Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <VerifyEdistrictEditModel
                item={selectedItem}
                setShowMarkEditModel={setShowMarkEditModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Mark Edit Model  end*/}
      </Wrapper>
    </>
  );
};

export default VerifyDistrictHistory;

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
