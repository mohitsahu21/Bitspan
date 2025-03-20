import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SAAllUsersJoinedList = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [complaintsPerPage, setComplaintsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [userType, setUserType] = useState(""); // For user type filter
  const [status, setStatus] = useState(""); // For status filter

  const userId = useSelector((state) => state.user.currentUser?.userId);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        // "https://2kadam.co.in/api/auth/superAdmin/getAllUsers",
        `https://2kadam.co.in/api/auth/superDistributor/getSuperDistributorUsersData/${userId}`,
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
    fetchAllUsers();
  }, []);

  const filteredItems = users.filter((row) => {
    const matchesKeyword =
      (row?.UserName &&
        row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.UserId &&
        row.UserId.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.package_name &&
        row.package_name
          .toLowerCase()
          .includes(keyword.trim().toLowerCase())) ||
      (row?.ContactNo &&
        row.ContactNo.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.Email &&
        row.Email.toLowerCase().includes(keyword.trim().toLowerCase()));

    const matchesUserType =
      !userType ||
      userType === "---Select User Type---" ||
      row.role === userType;
    const matchesStatus =
      !status || status === "---Select Status---" || row.Status === status;

    return matchesKeyword && matchesUserType && matchesStatus;
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

  console.log(users);

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
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">All Users</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            All Users
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
                      <div className="form-container d-flex flex-column gap-3">
                        <div className="d-flex flex-wrap gap-3">
                          <div className=" col-12 col-md-12 col-lg-12">
                            {/* <label for="toDate" className="form-label fw-bold">To</label> */}
                            <input
                              id="toDate"
                              className="form-control "
                              type="search"
                              placeholder="Enter User Name/User Id/Mobile/Email Id"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                          </div>

                          <div className="field-group col-11 col-md-4 col-lg-2">
                            {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={userType}
                              onChange={(e) => setUserType(e.target.value)}
                            >
                              <option selected>---Select User Type---</option>
                              <option value="Retailer">Retailer</option>
                              <option value="Distributor">Distributor</option>
                              {/* <option value="SuperDistributor">
                                Super Distributor
                              </option>
                              <option value="WhiteLabel">White Label</option> */}
                            </select>
                          </div>
                          <div className="field-group col-11 col-md-4 col-lg-2">
                            {/* <label for="toDate" className="form-label fw-bold">PAN Type</label> */}
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option selected>---Select Status---</option>
                              <option value="Active">Active</option>
                              <option value="Deactive">Deactive</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>
                          <div className="field-group  col-11 col-md-4 col-lg-2 ">
                            {/* <label for="toDate" className="form-label fw-bold">Status</label> */}
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={complaintsPerPage}
                              onChange={(e) =>
                                setComplaintsPerPage(e.target.value)
                              }
                            >
                              {/* <option selected>--Row Per Page---</option> */}
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                          </div>

                          {/* <div className=" col-11 col-md-4 col-lg-2">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div> */}
                        </div>

                        {/* <div className="d-flex flex-column flex-md-row gap-3">
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="fromDate" className="form-label">From</label>
                                                        <input id="fromDate" className="form-control" type="date" />
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div>
                                                    <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div>

                                                </div> */}

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

                                      <th scope="col">User Id</th>
                                      <th scope="col">
                                        User <br /> Name
                                      </th>
                                      <th scope="col">Role</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Mobile</th>
                                      {/* <th scope="col">Package Id</th> */}
                                      {/* <th scope="col">Package Name</th> */}
                                      {/* <th scope="col">Address</th> */}
                                      <th scope="col">PAN No</th>
                                      <th scope="col">AAdhaar No</th>
                                      <th scope="col">Business Name</th>
                                      <th scope="col">City</th>
                                      <th scope="col">State</th>
                                      <th scope="col">Pincode</th>

                                      {/* <th scope="col">P-Coupon <br/>Price</th>
                                                                      <th scope="col">E-Coupon <br/>Price</th> */}

                                      <th scope="col">Created By</th>
                                      <th scope="col">Website Name</th>

                                      <th scope="col">Payment Status</th>
                                      {/* <th scope="col">Aadhar Front</th>
                                    <th scope="col">Aadhar Back</th>
                                    <th scope="col">Pan Card Front</th> */}
                                      {/* <th scope="col">View KYC</th> */}
                                      <th scope="col">Status</th>
                                      {/* <th scope="col">Note</th> */}
                                      {/* <th scope="col">Action</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {showApiData && showApiData.length > 0 ? (
                                      showApiData?.map((user, index) => (
                                        <tr key={user.id}>
                                          <td>
                                            {currentPage * complaintsPerPage +
                                              index +
                                              1}
                                          </td>
                                          <td>{user.CreateAt}</td>

                                          <td>{user.UserId}</td>

                                          <td>{user.UserName}</td>
                                          <td>{user.role}</td>
                                          <td>{user.Email}</td>
                                          <td>{user.ContactNo}</td>
                                          {/* <td>{user.package_Id}</td> */}
                                          {/* <td>{user.package_name}</td> */}
                                          <td>{user.PanCardNumber}</td>
                                          <td>{user.AadharNumber}</td>
                                          <td>{user.BusinessName}</td>
                                          <td>{user.City}</td>

                                          <td>{user.State}</td>
                                          <td>{user.PinCode}</td>
                                          <td>
                                            {user?.created_By_User_Id +
                                              " " +
                                              user?.created_By_User_Role}
                                          </td>
                                          <td>
                                            {user?.role == "WhiteLabel"
                                              ? user?.White_Label_Website_URL
                                              : user?.created_By_Website}
                                          </td>
                                          <td>{user?.payment_status}</td>

                                          {/* <td>
                                        {item.attached_kyc
                                            .split(",")
                                            .map((kycurl, kycindx) => (
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
                                          {/* <td>
                                          <a
                                            href={user.AadharFront}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>
                                          <a
                                            href={user.AadharBack}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>
                                          <a
                                            href={user.PanCardFront}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a>
                                        </td> */}
                                          <td>{user.Status}</td>
                                          {/* <td> <Link to={'/change-price'}>Change Price </Link></td> */}
                                          {/* <td>{user?.Note}</td> */}
                                          {/* <td>
                                          <Dropdown>
                                            <Dropdown.Toggle
                                              variant="success"
                                              // id={`dropdown-${user.id}`}
                                              as="span" style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                                              className="custom-dropdown-toggle"
                                            >
                                             <PiDotsThreeOutlineVerticalBold />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              { user.Status === "Active" && 
                                                <Dropdown.Item
                                                onClick={() => {
                                                  // setSelectedUser(user);
                                                  // setShowApproveModel(true);
                                                  deactivateUser(user.UserId)
                                                }}
                                              >
                                                <span className="">
                                                  {" "}
                                                  <CiViewList />
                                                </span>{" "}
                                                Deactivate User
                                              </Dropdown.Item>
                                              }
                                            
                                         
                                            </Dropdown.Menu>
                                          </Dropdown>
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

export default SAAllUsersJoinedList;

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
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .field-group {
    display: flex;
    flex-direction: column;
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
  @media (max-width: 768px) {
    .field-group {
      flex: 1 1 100%;
    }
  }
  @media (min-width: 769px) and (max-width: 1200px) {
    .field-group {
      flex: 1 1 45%;
    }
  }

  @media (min-width: 1201px) {
    .field-group {
      width: 30%;
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
