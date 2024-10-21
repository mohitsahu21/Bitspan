import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../../images/loading-effect.json";
import { BiHomeAlt } from "react-icons/bi";

const GooglePlayOffline = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { refreshTable, currentUser } = useSelector((state) => state.user);
  const token = currentUser?.token;
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString()?.split("T")[0]
  ); // Initialize with today's date
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const branch = currentUser.branch_name;
  const [appointmentsData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEffect, setLoadingEffect] = useState(false);

  const [selectedDateAppData, setSelectedDateAppData] = useState([]);
  const [panData, setPanData] = useState([]);

  const getPanData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:7171/api/auth/superAdminEmployee/getAllOfflineServices"
      );
      setPanData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPanData();
  }, []);

  console.log(panData);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1);

    const filteredResults = panData.filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm.trim()) ||
        row.mobile_no.includes(searchTerm.trim()) ||
        row.email_id.toLowerCase().includes(searchTerm.trim())
    );

    setFilteredData(filteredResults);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Pagination functions
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = searchTerm
    ? filteredData.slice(indexOfFirstRow, indexOfLastRow)
    : panData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(panData.length / rowsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(panData.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers?.map((number, index) => {
    // Display the first two page numbers
    if (index < 2) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    }
    // Display an ellipsis for the first middle section
    else if (index === 2 && currentPage > 3) {
      return (
        <Button key={number} disabled>
          ...
        </Button>
      );
    } else if (
      (index >= currentPage - 1 && index <= currentPage + 1) ||
      (index === 2 && currentPage <= 3)
    ) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    } else if (
      index === pageNumbers.length - 3 &&
      currentPage < pageNumbers.length - 2
    ) {
      return (
        <Button key={number} disabled>
          ...
        </Button>
      );
    }
    // Display the last two page numbers
    else if (index >= pageNumbers.length - 2) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    }
    return null;
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log(currentRows);
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 d-none "></div>
              <div className="row shadow-none  formdata mt-4">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                      Google Play Offline
                    </h4>
                    <p className="mx-lg-5">
                      {" "}
                      <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                      <span
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Google Play Offline
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10 mt-4">
                <div className="container-fluid">
                  <div className="row d-flex formdata justify-content-center mb-3">
                    <div className="col-12 boarder bg-white p-2">
                      <div className="news d-flex align-items-center"></div>
                    </div>
                    <div className="mt-4">
                      <div
                        className="widget-area-2 proclinic-box-shadow"
                        id="tableres"
                      >
                        <div className="d-lg-flex justify-content-between align-items-center">
                          <Form.Group
                            controlId="rowsPerPageSelect"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <h5 className="d-flex  align-items-center row-per-page ">
                              {" "}
                              Rows Per Page :{" "}
                            </h5>

                            <Form.Control
                              as="select"
                              value={rowsPerPage}
                              className="m-2"
                              style={{ width: "auto", cursor: "pointer" }}
                              onChange={handleRowsPerPageChange}
                            >
                              <option value={5}>5</option>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </Form.Control>
                          </Form.Group>

                          <div className="d-flex flex-row">
                            <input
                              type="search"
                              placeholder="Enter Patient Name or Mobile or UHID"
                              onChange={handleSearch}
                              value={searchTerm}
                              className="mb-2 rounded-5 p-2 form-control"
                              id="form1"
                            />
                          </div>
                        </div>
                        {loadingEffect ? (
                          <Lottie
                            options={defaultOptions}
                            height={300}
                            width={400}
                            style={{ background: "transparent" }}
                          ></Lottie>
                        ) : (
                          <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                              <thead>
                                <tr>
                                  <th>ref. ID</th>
                                  <th>Applicant Name</th>
                                  <th>Applicant Father</th>
                                  <th>Applicant Mother</th>
                                  <th>Applicant Number</th>
                                  <th>Email</th>
                                  <th>Aadhar Number</th>
                                  <th>Pan Number</th>
                                  <th>Service</th>
                                  <th>Attached Form</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              {currentRows.length === 0 ? (
                                <div className="no-data-container">
                                  <h4>No Data Found</h4>
                                </div>
                              ) : (
                                <tbody>
                                  {currentRows?.map((patient, index) => {
                                    const appointmentDate = new Date(
                                      patient?.appointment_dateTime?.split(
                                        "T"
                                      )[0]
                                    );
                                    appointmentDate.setHours(0, 0, 0, 0);
                                    return (
                                      <tr key={index}>
                                        <td>{patient.id}</td>
                                        <td>{patient.operator_name}</td>
                                        <td className="text-capitalize">
                                          {patient.mobile_no}
                                        </td>
                                        <td>{patient.amount}</td>
                                        <td>{patient.orderid}</td>
                                        <td>{patient.recharge_Type}</td>
                                        {/* <td>
                                          <Link
                                            to={`/pan-card-offline-details/${patient.id}`}
                                          >
                                            {" "}
                                            <button
                                              className="btn btn-warning"
                                              style={{
                                                backgroundColor: "#12CBC4",
                                              }}
                                            >
                                              View Details
                                            </button>
                                          </Link>
                                        </td> */}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              )}
                            </table>
                          </div>
                        )}
                        <div className="container mt-3 mb-3">
                          <div className="row">
                            <div className="col-lg-10 col-xl-8 col-md-12 col-sm-12 col-8">
                              {" "}
                              <h4
                                style={{
                                  color: "black",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                  fontSize: "1.1rem",
                                }}
                              >
                                {/* Showing Page {currentPage} of {totalPages} from {data?.length} entries */}
                                {searchTerm ? (
                                  <>
                                    {" "}
                                    Showing Page {currentPage} of {totalPages}{" "}
                                    from {filteredData?.length} entries
                                    (filtered from {selectedDateAppData?.length}{" "}
                                    total entries){" "}
                                  </>
                                ) : (
                                  <>
                                    Showing Page {currentPage} of {totalPages}{" "}
                                    from {panData?.length} entries
                                  </>
                                )}
                              </h4>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                              <div className="d-flex justify-content-evenly">
                                <Button
                                  onClick={() => paginate(currentPage - 1)}
                                  disabled={currentPage === 1}
                                  variant="warning"
                                >
                                  Previous
                                </Button>
                                {renderPageNumbers}

                                <Button
                                  onClick={() => paginate(currentPage + 1)}
                                  disabled={indexOfLastRow >= panData.length}
                                  variant="success"
                                >
                                  Next
                                </Button>
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
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default GooglePlayOffline;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .card {
    width: 100%;
    padding: 10px;
    margin: 0 15px;
    border-radius: 10px;
    cursor: pointer;
    white-space: nowrap;

    transition: transform 0.3s ease-in-out, border 0.3s ease,
      border-radius 0.3s ease;
  }
  .card:hover {
    background-image: linear-gradient(
      85.2deg,
      rgba(33, 3, 40, 1) 7.5%,
      rgba(65, 5, 72, 1) 88.7%
    );
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px) scale(1.1);
    .icon {
      transform: scale(1.2);
    }
  }
  .cardtext {
    color: white;
  }
  .icon {
    color: #fe662b;
  }

  .card-1 {
    background: #6e6e6e;
  }

  .card-2 {
    background: #6e6e6e;
  }
  .card-3 {
    background: #6e6e6e;
  }
  .card-4 {
    background: #6e6e6e;
  }
  a {
    text-decoration: none;
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

  .news {
    border: 1px solid black;
    position: relative;
    overflow: hidden;
  }

  @keyframes moveLeftToRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .news p {
    display: inline-block;
    white-space: nowrap;
    animation: moveLeftToRight 30s linear infinite;
    position: absolute;
    right: 0;
  }
  .news-icon {
    z-index: 100;
    font-size: large;
  }

  .table-container {
    width: 100%;
    overflow-x: auto;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
  }

  .custom-table th,
  .custom-table td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .custom-table th {
    background-color: #f2f2f2;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .pagination-button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
  }

  .pagination-button.active {
    background-color: #007bff;
    color: #fff;
  }

  .pagination-button:hover {
    background-color: #007bff;
    color: #fff;
  }

  #title {
    white-space: nowrap; /* Prevent text wrapping */

    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }

  #btn1 {
    width: 100%;

    @media screen and (min-width: 1600px) and (max-width: 3700px) {
      width: 75%;
    }
  }

  th {
    background-color: #12cbc4;
    color: black;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }
  .table-responsive {
    min-height: 10rem;
  }
  .dropdown-item {
  }
  .drop-pointer {
    cursor: pointer;
  }
  .dropdown-item.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  .table-responsive {
    position: relative;
  }

  .loading-container,
  .no-data-container {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 100px; /* Adjust as necessary */
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .no-data-container h4 {
    margin: 0 20px;
  }
  #form1 {
    width: 350px;
    @media screen and (max-width: 1200px) {
      width: 100%;
    }
    @media screen and (min-width: 1100px) and (max-width: 1300px) {
      width: auto;
    }
  }
  #form2 {
    @media screen and (max-width: 1200px) {
    }
  }
`;
