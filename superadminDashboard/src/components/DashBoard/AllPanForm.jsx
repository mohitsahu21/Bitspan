import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Dropdown, DropdownButton, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import PanFormEditModel from "./PanFormEditModel";
import { useSelector } from "react-redux";

const AllPanForm = () => {
  const [formData, setFormData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const complaintsPerPage = 10; // Set items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [showMarkEditModel, setShowMarkEditModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const { currentUser, token } = useSelector((state) => state.user);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        // `http://localhost:7777/api/auth/retailer/getApplyOfflineForm`
        // `https://2kadam.co.in/api/auth/retailer/getApplyOfflineForm`,
        `https://2kadam.co.in/api/auth/retailer/getApplyOfflineFormByid/${currentUser?.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      const newResponseData = response.data.filter(
        (item) => item.applicant_select_service !== "New Bank ID"
      );
      setLoading(false);

      setFormData(newResponseData);
      console.log(newResponseData);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(formData);

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, isRefresh]);

  const handleSearch = () => {
    fetchData();
  };

  console.log(formData);

  const filteredData = formData?.filter((item) => {
    const matchesSearch =
      item.applicant_name
        ?.toLowerCase()
        ?.includes(searchQuery?.trim()?.toLowerCase()) ||
      item.applicant_number
        ?.toLowerCase()
        ?.includes(searchQuery?.trim()?.toLowerCase()) ||
      item.order_id
        ?.toLowerCase()
        ?.includes(searchQuery?.trim()?.toLowerCase());
    const matchesStatus =
      !selectedStatus ||
      selectedStatus === "---Select Form Status---" ||
      item?.status?.toLowerCase() === selectedStatus?.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, selectedStatus]);

  // const filteredData = formData.filter((item) => {
  //   if (selectedStatus === "All") {
  //     return true;
  //   } else {
  //     return item.status?.toLowerCase() === selectedStatus.toLowerCase();
  //   }
  // });

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
                          Other Services History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Other Services History{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-md-row gap-3">
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
                          </div>
                          <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                              onClick={handleSearch}
                            >
                              Search
                            </button>
                          </div> */}
                          {/* <div className="col-12 col-md-4 col-lg-3"> */}
                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            {/* <label for="fromDate" className="form-label">
                              Search
                            </label> */}
                            <input
                              type="search"
                              className="form-control responsive-input"
                              placeholder="Search by Name, Mobile, or Order ID"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-3">
                            {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={selectedStatus}
                              onChange={(e) =>
                                setSelectedStatus(e.target.value)
                              }
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
                          {/* <div className="col-12 col-md-4 col-lg-3 d-flex align-items-end">
                            <DropdownButton
                              id="dropdown-basic-button"
                              title={selectedStatus}
                              onSelect={(e) => setSelectedStatus(e)}
                            >
                              <Dropdown.Item eventKey="All">All</Dropdown.Item>
                              <Dropdown.Item eventKey="Success">
                                Success
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Reject">
                                Reject
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Pending">
                                Pending
                              </Dropdown.Item>
                            </DropdownButton>
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
                                      <th scope="col">Applicant Name</th>
                                      <th scope="col">Applicant Father Name</th>
                                      <th scope="col">Applicant Email</th>
                                      <th scope="col">Applicant Number</th>
                                      <th scope="col">Service</th>
                                      <th scope="col">other</th>
                                      <th scope="col">View Form</th>
                                      <th scope="col">View Photo</th>
                                      <th scope="col">View Signature</th>
                                      <th scope="col">View KYC</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Note</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {displayData?.length > 0 ? (
                                      displayData.map((item, index) => (
                                        <tr key={index}>
                                          <th scope="row">
                                            {currentPage * complaintsPerPage +
                                              index +
                                              1}
                                          </th>
                                          <td>{item.created_at}</td>
                                          <td>{item.order_id}</td>
                                          <td>{item.applicant_name}</td>
                                          <td>{item.applicant_father}</td>
                                          <td>{item.email}</td>
                                          <td>{item.applicant_number}</td>
                                          <td>
                                            {item.applicant_select_service}
                                          </td>
                                          <td>{item.other}</td>
                                          {/* <td>
                                            <a
                                              href={item.attached_form}
                                              target="_blank"
                                            >
                                              View Form
                                            </a>
                                          </td> */}
                                          <td>
                                            {item.attached_form ? (
                                              <a
                                                href={item.attached_form}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                View Form
                                              </a>
                                            ) : (
                                              "Not Available"
                                            )}
                                          </td>

                                          <td>
                                            {item.attached_photo ? (
                                              <a
                                                href={item.attached_photo}
                                                target="_blank"
                                              >
                                                View Photo
                                              </a>
                                            ) : (
                                              "Not Available"
                                            )}
                                          </td>
                                          <td>
                                            {item.attached_sign ? (
                                              <a
                                                href={item.attached_sign}
                                                target="_blank"
                                              >
                                                View Sign
                                              </a>
                                            ) : (
                                              "Not Available"
                                            )}
                                          </td>
                                          {/* <td>
                                            {item?.attached_kyc
                                              ?.split(",")
                                              ?.map((kycurl, kycindx) => (
                                                <div key={kycindx}>
                                                  <a
                                                    href={kycurl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    View KYC {kycindx + 1}
                                                  </a>
                                                </div>
                                              ))}
                                          </td> */}
                                          <td>
                                            {item?.attached_kyc
                                              ? item.attached_kyc.split(",")
                                                  .length > 0
                                                ? item.attached_kyc
                                                    .split(",")
                                                    .map((kycurl, kycindx) =>
                                                      kycurl.trim() ? (
                                                        <div key={kycindx}>
                                                          <a
                                                            href={kycurl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                          >
                                                            View KYC{" "}
                                                            {kycindx + 1}
                                                          </a>
                                                        </div>
                                                      ) : null
                                                    )
                                                : "Not Available"
                                              : "Not Available"}
                                          </td>

                                          <td>{item.status}</td>
                                          <td>{item.note}</td>
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
                                        <td colSpan="19">No data available</td>{" "}
                                        {/* Updated colSpan to match table columns */}
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </>
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
                              pageRangeDisplayed={3}
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

        {/* Mark Edit Model  start*/}

        <Modal
          // size="lg"
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
              <PanFormEditModel
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

export default AllPanForm;

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
