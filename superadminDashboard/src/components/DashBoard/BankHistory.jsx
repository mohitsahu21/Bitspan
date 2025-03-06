import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import BankIdEditModel from "./BankIdEditModel";
import ReactPaginate from "react-paginate";
const BankHistory = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const userData = currentUser.userId;
  const [showMarkEditModel, setShowMarkEditModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [formStatus, setFormStatus] = useState(""); // For user type filter

  useEffect(() => {
    const fetchBankHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://2kadam.co.in/api/auth/retailer/getAllBranchId/${userData}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setGetData(response.data);
        // setFilterData(
        //   response.data.filter((item) => item.user_id === currentUser.userId)
        // );
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBankHistory();
  }, [currentUser.userId, isRefresh]);

  const filteredItems = getData.filter((row) => {
    const matchesKeyword =
      row?.order_id &&
      row.order_id.toLowerCase().includes(keyword.trim().toLowerCase());

    const matchesType =
      !formStatus ||
      formStatus === "---Select Form Status---" ||
      row.status === formStatus;
    return matchesKeyword && matchesType;
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword, formStatus]);

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

  console.log(filterData);
  console.log(getData);

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-12 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Bank ID History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Bank ID History
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <div className="border border-danger rounded shadow-sm mb-3">
                      <h2 className="text-center m-0 px-5 py-3">
                        Bank ID History
                      </h2>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          {/* <div className="col-12 col-md-4 col-lg-3">
        <label for="fromDate" className="form-label">From</label>
        <input id="fromDate" className="form-control" type="date" />
    </div>
    <div className="col-12 col-md-4 col-lg-3">
        <label for="toDate" className="form-label">To</label>
        <input id="toDate" className="form-control " type="date" />
    </div>
    <div className="d-flex align-items-end">
        <button type="button" className="btn btn-primary button">Search</button>
    </div> */}

                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            {/* <label for="fromDate" className="form-label">From</label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              placeholder="Enter Order Id"
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
                                      <th scope="col">#</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Order ID</th>
                                      <th scope="col">Name</th>
                                      <th scope="col">Father Name</th>
                                      <th scope="col">Mother Name</th>
                                      <th scope="col">Mobile Number</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Service</th>
                                      <th scope="col">Aadhar No.</th>
                                      <th scope="col">Pan No.</th>
                                      <th scope="col">Business</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Photo</th>
                                      <th scope="col">KYC</th>
                                      <th scope="col">Passbook</th>
                                      <th scope="col">Shop Photo</th>
                                      <th scope="col">Eletricity Bill</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Note</th>
                                      <th scope="col">Action</th>
                                      {/* <th scope="col">Action</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {showApiData.length > 0 ? (
                                      showApiData.map((data, index) => (
                                        <tr key={index}>
                                          <th scope="row">
                                            {currentPage * complaintsPerPage +
                                              index +
                                              1}
                                          </th>
                                          <td>{data.created_at}</td>
                                          <td>{data.order_id}</td>
                                          <td>{data.applicant_name}</td>
                                          <td>{data.applicant_father}</td>
                                          <td>{data.applicant_mother}</td>
                                          <td>{data.applicant_number}</td>
                                          <td>{data.email}</td>
                                          <td>{data.select_bank_service}</td>
                                          <td>{data.aadhar_card}</td>
                                          <td>{data.pan_card}</td>
                                          <td>{data.business_name}</td>
                                          <td>{data.amount}</td>
                                          <td>
                                            <a
                                              href={data.attached_photo}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              View
                                            </a>
                                          </td>
                                          <td>
                                            {data?.attached_kyc
                                              ?.split(",")
                                              ?.map((kycurl, kycindx) => (
                                                <div key={kycindx}>
                                                  <a
                                                    href={kycurl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    View {kycindx + 1}
                                                  </a>
                                                </div>
                                              ))}
                                          </td>
                                          <td>
                                            <a
                                              href={data.bank_passbook}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              View
                                            </a>
                                          </td>
                                          <td>
                                            <a
                                              href={data.shop_photo}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              View
                                            </a>
                                          </td>
                                          <td>
                                            <a
                                              href={data.electric_bill}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              View
                                            </a>
                                          </td>
                                          <td>{data.status}</td>
                                          <td>{data.note}</td>
                                          <td>
                                            {(data.status === "Pending" ||
                                              data.status === "Mark Edit") && (
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
                                                      setSelectedItem(data);
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
                                        <td colSpan="19">No data available</td>{" "}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Model  start*/}

        <Modal
          // size="lg"
          show={showMarkEditModel}
          fullscreen={true}
          onHide={() => setShowMarkEditModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Edit Bank Id Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <BankIdEditModel
                item={selectedItem}
                setShowMarkEditModel={setShowMarkEditModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*Edit Model  end*/}
      </Wrapper>
    </>
  );
};

export default BankHistory;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
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
  table {
    overflow-x: scroll;
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
  a {
    text-decoration: none;
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
