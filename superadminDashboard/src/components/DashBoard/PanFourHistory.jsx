import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import PanCardFourEditModel from "./PanCardFourEditModel";

const PanFourHistory = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [showMarkEditModel, setShowMarkEditModel] = useState(false);
  const [formStatus, setFormStatus] = useState(""); // For user type filter

  const userData = currentUser.userId;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        // `http://localhost:7777/api/auth/retailer/pan-4.0/${userData}`
        `https://2kadam.co.in/api/auth/retailer/pan-4.0/${userData}`,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isRefresh]);

  const filteredItems = apiData.filter((row) => {
    const matchesKeyword =
      (row?.name &&
        row.name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.order_id &&
        row.order_id.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.mobile_no &&
        row.mobile_no.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.email_id &&
        row.email_id.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.aadhar_details &&
        row.aadhar_details
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()));

    const matchesType =
      !formStatus ||
      formStatus === "---Select Form Status---" ||
      row.status === formStatus;
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

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-center justify-content-center">
              {/* <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                <Sider />
              </div> */}
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
                          PAN Transaction Report
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; PAN Transaction Report
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow bg-body-tertiary rounded  p-5 m-4">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            {/* <label for="fromDate" className="form-label">
                              Search Name & Order ID
                            </label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              placeholder="Search by Name, Mobile no , Aadhar no, Email , Order Id"
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
                          <div className="col-12 col-md-4 col-lg-3">
                            {/* <label for="toDate" className="form-label">
                              Date
                            </label>
                            <input
                              id="date"
                              className="form-control"
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                            /> */}
                          </div>
                          <div className="d-flex align-items-end">
                            {/* <button
                              type="button"
                              className="btn btn-primary button"
                              onClick={() => setCurrentPage(0)} // Reset pagination to the first page on search
                            >
                              Search
                            </button> */}
                          </div>
                          <div className="d-flex align-items-end">
                            {/* <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={handleApiChange}
                              value={selectedApi}
                            >
                              <option value="">-- Select API --</option>
                              <option value="api1">NSDL New Request</option>
                              <option value="api2">NSDL Correction</option>
                            </select> */}
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
                              <table class="table table-striped">
                                <thead className="table-dark">
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">
                                      Application <br /> Type
                                    </th>
                                    <th scope="col">
                                      Applicant
                                      <br /> Type
                                    </th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Father Name</th>
                                    <th scope="col">Mother Name</th>
                                    <th scope="col">
                                      Date of <br />
                                      Birth
                                    </th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Office Address</th>
                                    <th scope="col">Aadhar Details</th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Pincode</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Change Request</th>
                                    <th scope="col">KYC </th>
                                    <th scope="col">Form </th>
                                    <th scope="col">Signature</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Action</th>
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
                                        </td>{" "}
                                        <td>{item.created_at}</td>
                                        <td>{item.order_id}</td>
                                        <td>{item.application_type}</td>
                                        <td>{item.applicant_type}</td>
                                        <td>{item.select_title}</td>
                                        <td>{item.name}</td>
                                        <td>{item.father_name}</td>
                                        <td>{item.mother_name}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.office_address}</td>
                                        <td>{item.aadhar_details}</td>
                                        <td>{item.mobile_no}</td>
                                        <td>{item.email_id}</td>
                                        <td>{item.pin_code}</td>
                                        <td>{item.state}</td>
                                        {/* <td>{item.Change_Request}</td> */}
                                        <td>
                                          {(() => {
                                            let parsedChangeRequest = {};

                                            try {
                                              parsedChangeRequest = JSON.parse(
                                                item.Change_Request
                                              ); // Parse JSON string
                                            } catch (error) {
                                              console.error(
                                                "Invalid JSON format:",
                                                error
                                              );
                                              return "No Changes";
                                            }

                                            // Get keys where value is true
                                            const trueKeys = Object.keys(
                                              parsedChangeRequest
                                            ).filter(
                                              (key) => parsedChangeRequest[key]
                                            );

                                            return trueKeys.length > 0
                                              ? trueKeys
                                                  .join(", ")
                                                  .replace(/_/g, " ")
                                                  .toUpperCase()
                                              : "No Changes";
                                          })()}
                                        </td>
                                        <td>
                                          {item.documentUpload
                                            ? item.documentUpload
                                                .split(",")
                                                .map((kycurl, kycindx) => (
                                                  <div key={kycindx}>
                                                    <a
                                                      href={kycurl}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >
                                                      View {kycindx + 1}
                                                    </a>
                                                  </div>
                                                ))
                                            : "No KYC available"}
                                        </td>
                                        <td>
                                          {" "}
                                          <a
                                            href={item.attachment_form}
                                            target="_blank"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>
                                          {" "}
                                          <a
                                            href={item.attachment_signature}
                                            target="_blank"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>
                                          {" "}
                                          <a
                                            href={item.attachment_photo}
                                            target="_blank"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>{item.Charge_Amount}</td>
                                        <td
                                          style={{
                                            color:
                                              item.status === "Pending"
                                                ? "#FFC107"
                                                : item.status === "Reject"
                                                ? "#DC3545"
                                                : item.status === "Success"
                                                ? "#28A745"
                                                : "black",
                                          }}
                                        >
                                          {item.status}
                                        </td>
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
                                                    setShowMarkEditModel(true);
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
                                      <td colSpan="13">No data available</td>{" "}
                                      {/* Updated colSpan to match table columns */}
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            )}
                          </div>
                          <PaginationContainer>
                            <ReactPaginate
                              previousLabel={"previous"}
                              nextLabel={"next"}
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
              <PanCardFourEditModel
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

export default PanFourHistory;

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
