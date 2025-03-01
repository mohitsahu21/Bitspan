import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DAllDistributorList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  // const userData = currentUser.userId;
  // Fetch userId and token from Redux store
  const userId = useSelector((state) => state.user.currentUser?.userId);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        // `http://localhost:7777/api/auth/superDistributor/getBoughtUserId/${userId}`
        `https://bitspan.vimubds5.a2hosted.com/api/auth/Distributor/getAllPartner/${userId}`,
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
      if (error?.response?.status === 401) {
        // Handle token expiration
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser()); // Clear user session
        navigate("/"); // Redirect to the login page
      } else {
        // Handle other errors
        Swal.fire({
          icon: "error",
          title: "Error Updating Profile",
          text: "An error occurred while updating the profile. Please try again later.",
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleSearch = () => {
  //   fetchData();
  // };

  // const filteredItems = apiData.filter(
  //   (row) =>
  //     row?.created_By_User_Id && row.created_By_User_Id.includes(keyword.trim())
  // );

  // Filter data based on search input
  const filteredItems = apiData.filter(
    (item) =>
      item.UserId?.toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase()) ||
      item.UserName?.toLowerCase().includes(filterValue.toLowerCase())
  );

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
                          All Distributor List
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; All Distributor List{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <input
                              className="form-control"
                              type="search"
                              id="floatingInputGroup1"
                              placeholder="Search by Ord ID"
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
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Sr.No</th>
                                  <th scope="col">User ID</th>
                                  <th scope="col">Username</th>
                                  <th scope="col">Role</th>
                                  <th scope="col">Contact No</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Pan Card Number</th>
                                  <th scope="col">Aadhar Number</th>
                                  <th scope="col">Business Name</th>
                                  <th scope="col">City</th>
                                  <th scope="col">State</th>
                                  <th scope="col">Pin Code</th>
                                  {/* <th scope="col">Aadhar Front</th>
                                  <th scope="col">Aadhar Back</th>
                                  <th scope="col">Pan Card Front</th>
                                  <th scope="col">White Label Website URL</th> */}
                                  <th scope="col">Status</th>
                                  <th scope="col">Payment Status</th>
                                  <th scope="col">Package ID</th>
                                  {/* <th scope="col">Created By User ID</th>
                                  <th scope="col">Created By User Role</th> */}
                                  <th scope="col">Created By Website</th>
                                  {/* <th scope="col">Two-Step Pin</th>
                                  <th scope="col">Remaining White Label ID</th>
                                  <th scope="col">
                                    Remaining Super Distributor ID
                                  </th> */}
                                  <th scope="col">Remaining Distributor ID</th>
                                  {/* <th scope="col">Remaining Retailer ID</th> */}
                                  <th scope="col">Note</th>
                                  <th scope="col">Created At</th>
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
                                      </td>
                                      <td>{item.UserId}</td>
                                      <td>{item.UserName}</td>
                                      <td>{item.role}</td>
                                      <td>{item.ContactNo}</td>
                                      <td>{item.Email}</td>
                                      <td>{item.PanCardNumber}</td>
                                      <td>{item.AadharNumber}</td>
                                      <td>{item.BusinessName}</td>
                                      <td>{item.City}</td>
                                      <td>{item.State}</td>
                                      <td>{item.PinCode}</td>
                                      {/* <td>{item.AadharFront}</td>
                                      <td>{item.AadharBack}</td>
                                      <td>{item.PanCardFront}</td>
                                      <td>{item.White_Label_Website_URL}</td> */}
                                      <td>{item.Status}</td>
                                      <td>{item.payment_status}</td>
                                      <td>{item.package_Id}</td>
                                      {/* <td>{item.created_By_User_Id}</td>
                                      <td>{item.created_By_User_Role}</td> */}
                                      <td>{item.created_By_Website}</td>
                                      {/* <td>{item.twostep_pin}</td> */}
                                      {/* <td>{item.remaining_whitelable_id}</td>
                                      <td>
                                        {item.remaining_superDistributor_id}
                                      </td> */}
                                      <td>{item.remaining_distributor_id}</td>
                                      {/* <td>{item.remaining_retailer_id}</td> */}
                                      <td>{item.Note}</td>
                                      <td>{item.CreateAt}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="30">No data available</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
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
      </Wrapper>
    </>
  );
};

export default DAllDistributorList;

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
