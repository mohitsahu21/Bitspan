import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { LuTextSelect } from "react-icons/lu";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const DDeactiveUsersList = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [isRefresh, setIsRefresh] = useState(false);
  const [ShowChangeUserinfoModel, setShowChangeUserinfoModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [userType, setUserType] = useState(""); // For user type filter

  const userId = useSelector((state) => state.user.currentUser?.userId);

  const fetchActiveUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getActiveUsers",
        `https://bitspan.vimubds5.a2hosted.com/api/auth/Distributor/getDeactiveUsers/${userId}`,
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
    fetchActiveUsers();
  }, [isRefresh]);

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
    return matchesKeyword && matchesUserType;
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

  const deactivateUser = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, deactive it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const { data } = await axios.put(
              "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/deactivateUser",
              {
                userId: id,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (data.success) {
              swalWithBootstrapButtons.fire({
                title: "Deactivated!",
                text: data.message,
                icon: "success",
              });
              fetchActiveUsers();
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text:
                  data.message ||
                  "An error occurred during the process. Please try again.",
                icon: "error",
              });
            }
          } catch (error) {
            console.error("Error deactivate user:", error);
            if (error?.response?.status == 401) {
              // alert("Your token is expired please login again")
              Swal.fire({
                icon: "error",
                title: "Your token is expired please login again",
              });
              dispatch(clearUser());
              navigate("/");
            }
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: "An error occurred during the process. Please try again.",
              icon: "error",
            });
          } finally {
            setLoading(false);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your user is safe :)",
            icon: "error",
          });
        }
      });
  };

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
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Deactive Users
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Deactive Users
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            {/* <label for="fromDate" className="form-label">From</label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              placeholder="Enter User Name/User Id/Mobile/Email Id"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-3">
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
                          {/* <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
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

                                      <th scope="col">User Id</th>
                                      <th scope="col">
                                        User <br /> Name
                                      </th>
                                      <th scope="col">Role</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Mobile</th>
                                      <th scope="col">Package Id</th>
                                      <th scope="col">Package Name</th>
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
                                      <th scope="col">Aadhar Front</th>
                                      <th scope="col">Aadhar Back</th>
                                      <th scope="col">Pan Card Front</th>
                                      {/* <th scope="col">View KYC</th> */}
                                      <th scope="col">Status</th>
                                      {/* <th scope="col">Note</th> */}
                                      <th scope="col">Action</th>
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
                                          <td>{user.package_Id}</td>
                                          <td>{user.package_name}</td>
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
                                          <td>{user?.PaymentStatus}</td>

                                          <td>
                                            {user.AadharFront ? (
                                              <a
                                                href={user.AadharFront}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                View
                                              </a>
                                            ) : (
                                              "Not Available"
                                            )}
                                          </td>
                                          <td>
                                            {user.AadharBack ? (
                                              <a
                                                href={user.AadharBack}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                View
                                              </a>
                                            ) : (
                                              "Not Available"
                                            )}
                                          </td>
                                          <td>
                                            {user.PanCardFront ? (
                                              <a
                                                href={user.PanCardFront}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                View
                                              </a>
                                            ) : (
                                              "Not Available"
                                            )}
                                          </td>
                                          <td>{user.Status}</td>
                                          {/* <td> <Link to={'/change-price'}>Change Price </Link></td> */}
                                          {/* <td>{user?.Note}</td> */}
                                          <td>
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
                                                {user.Status === "Active" && (
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      // setShowApproveModel(true);
                                                      deactivateUser(
                                                        user.UserId
                                                      );
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Deactivate User
                                                  </Dropdown.Item>
                                                )}
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowChangeUserinfoModel(
                                                      true
                                                    );
                                                    // deactivateUser(user.UserId)
                                                  }}
                                                >
                                                  <span className="">
                                                    {" "}
                                                    <CiViewList />
                                                  </span>{" "}
                                                  Change User Info
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
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
        {/* Change user info Model  start*/}

        <Modal
          // size="lg"
          show={ShowChangeUserinfoModel}
          //   fullscreen={true}
          onHide={() => setShowChangeUserinfoModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Change User Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <SAChangeUserInfo
                user={selectedUser}
                setShowChangeUserinfoModel={setShowChangeUserinfoModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Change user info Model  end*/}
      </Wrapper>
    </>
  );
};

export default DDeactiveUsersList;

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
