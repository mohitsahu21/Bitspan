import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
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
import { MdGrid3X3 } from "react-icons/md";

// const SAApproveModel = ({
//   item,
//   setShowApproveModel,
//   amount,
//   packageAmount,
//   setIsRefresh,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.user);
//   // const [formData, setFormData] = useState({
//   //   order_id: "",
//   //   note : "",
//   //   status : "Reject",
//   //   amount : "",
//   //   chargeAmount : "",
//   //   refundAmount : "",
//   //   Transaction_details : ``,
//   //   user_id : ""
//   // });

//   const [formData, setFormData] = useState({
//     userId: item.created_By_User_Id, // This will store the selected options
//     amount: amount,
//     Joining_Amount: item.amount,
//     Package_Amount: packageAmount,
//     Transaction_details: `Commission Credit for Joining User ${item.UserId} UserType ${item.role}`,
//     status: "Success",
//     availableBalance: "",
//     JoinUserId: item.UserId,
//   });

//   // const handleChange = (e) => {
//   //   setFormData({
//   //     ...formData,
//   //     [e.target.name]: e.target.value,
//   //   });
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

// Update formData and calculate refund amount if chargeAmount changes
//   setFormData((prev) => {
//     const updatedFormData = { ...prev, [name]: value };

//     if (name === "chargeAmount") {
//       // Calculate refundAmount dynamically
//       const chargeAmount = parseFloat(value) || 0; // Handle non-numeric input
//       const refundAmount = Math.max(
//         0,
//         parseFloat(item.amount) - chargeAmount
//       );
//       updatedFormData.refundAmount = refundAmount.toFixed(2); // Format to 2 decimal places
//     }

//     return updatedFormData;
//   });
// };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/AddCommisionForWhiteLabelJoinUser",
//         // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response);
//       setLoading(false);
//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Credit Commission Successfully",
//         });
//         setShowApproveModel(false);
//         setIsRefresh((value) => !value);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "An error occurred during the process. Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("There was an error submitting the form!", error);
//       setLoading(false);
//       if (error?.response?.status == 401) {
//         // alert("Your token is expired please login again")
//         Swal.fire({
//           icon: "error",
//           title: "Your token is expired please login again",
//         });
//         dispatch(clearUser());
//         navigate("/");
//       }
//       Swal.fire({
//         icon: "error",
//         title: "An error occurred during the process. Please try again.",
//       });
//     }
//   };
//   return (
//     <>
//       <div>
//         <form onSubmit={handlesubmit}>
//           <div className="">
//             <label for="name" class="form-label">
//               White Label Id
//             </label>
//             <div class="input-group flex-nowrap">
//               <span class="input-group-text" id="addon-wrapping">
//                 {" "}
//                 <MdGrid3X3 />
//               </span>
//               <input
//                 type="text"
//                 name="package_name"
//                 class="form-control"
//                 placeholder="Enter Package Name"
//                 value={formData.userId}
//                 // onChange={handleChange}
//                 disabled
//                 required
//               />
//             </div>
//           </div>
//           <div className="mt-3">
//             <label for="name" class="form-label">
//               Joining Amount
//             </label>
//             <div class="input-group flex-nowrap">
//               <span class="input-group-text" id="addon-wrapping">
//                 {" "}
//                 <MdGrid3X3 />
//               </span>
//               <input
//                 type="text"
//                 name="package_name"
//                 class="form-control"
//                 placeholder="Enter Package Name"
//                 value={formData.Joining_Amount}
//                 // onChange={handleChange}
//                 disabled
//                 required
//               />
//             </div>
//           </div>
//           <div className="mt-3">
//             <label for="name" class="form-label">
//               Package Amount
//             </label>
//             <div class="input-group flex-nowrap">
//               <span class="input-group-text" id="addon-wrapping">
//                 {" "}
//                 <MdGrid3X3 />
//               </span>
//               <input
//                 type="text"
//                 name="chargeAmount"
//                 class="form-control"
//                 placeholder="Enter Amount"
//                 value={formData.Package_Amount}
//                 // onChange={handleChange}
//                 // pattern="^\d+(\.\d+)?$"
//                 // title="Price should be digits Only"
//                 required
//               />
//             </div>
//           </div>
//           <div className="mt-3">
//             <label for="name" class="form-label">
//               Commission Amount
//             </label>
//             <div class="input-group flex-nowrap">
//               <span class="input-group-text" id="addon-wrapping">
//                 {" "}
//                 <MdGrid3X3 />
//               </span>
//               <input
//                 type="text"
//                 name="package_name"
//                 class="form-control"
//                 placeholder="Refund amount"
//                 value={formData.amount}
//                 // onChange={handleChange}
//                 disabled
//               />
//             </div>
//           </div>

//           {/* <div className="mt-3">
//               <label for="name" class="form-label">
//                 Enter Note
//               </label>
//               <div class="input-group flex-nowrap">
//                 <span class="input-group-text" id="addon-wrapping">
//                   {" "}
//                   <MdGrid3X3 />
//                 </span>
//                 <input
//                   type="text"
//                   name="note"
//                   class="form-control"
//                   placeholder="Enter Note"
//                   value={formData.note}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div> */}

//           <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
//             <div className="text-center  m-5">
//               <button type="submit" className="btn p-2" disabled={loading}>
//                 {loading ? "Loading..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

const WLWebUsersJoinedList = () => {
  const [loading, setLoading] = useState(false);
  const [ShowApproveModel, setShowApproveModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [commissionAmount, setcommissionAmount] = useState("");
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

  const fetchActiveUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getWhiteLabelWebisiteJoinUsers",
        `https://bitspan.vimubds5.a2hosted.com/api/auth/whiteLabel/getWhiteLabelWebisiteJoinUsers/${userId}`,
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

  const findPackagePrice = (user) => {
    if (user.role == "Retailer") {
      return parseInt(user?.retailer_Package_price);
    } else if (user.role == "WhiteLabel") {
      return parseInt(user?.whiteLabel_Package_price);
    } else if (user.role == "Distributor") {
      return parseInt(user?.distributor_Package_price);
    } else if (user.role == "SuperDistributor") {
      return parseInt(user?.superDistributor_Package_price);
    }
  };

  const findCommissionAmount = (user) => {};

  const filteredItems = users.filter((row) => {
    const matchesKeyword =
      (row?.UserName &&
        row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.UserId &&
        row.UserId.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      // (row?.package_name &&
      //   row.package_name
      //     .toLowerCase()
      //     .includes(keyword.trim().toLowerCase())) ||
      (row?.ContactNo &&
        row.ContactNo.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.Email &&
        row.Email.toLowerCase().includes(keyword.trim().toLowerCase()));

    const matchesUserType =
      !userType ||
      userType === "---Select User Type---" ||
      row.role === userType;
    const matchesStatus =
      !status ||
      status === "---Select Payment Status---" ||
      row.payment_status === status;

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
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Website Users Joined List
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Website Users Joined List
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
                              <option value="SuperDistributor">
                                Super Distributor
                              </option>
                              <option value="WhiteLabel">White Label</option>
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
                              <option selected>
                                ---Select Payment Status---
                              </option>
                              <option value="Pending">Pending</option>
                              <option value="Complete">Complete</option>
                              {/* <option value="Pending">Pending</option> */}
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
                                      {/* <th scope="col">Package Id</th>
                                      <th scope="col">Package Name</th> */}
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
                                      <th scope="col">Joining Amount</th>
                                      <th scope="col">Package Amount</th>
                                      <th scope="col">
                                        WhiteLabel Commission Amount
                                      </th>

                                      <th scope="col">Payment Status</th>
                                      {/* <th scope="col">Aadhar Front</th>
                                    <th scope="col">Aadhar Back</th>
                                    <th scope="col">Pan Card Front</th> */}
                                      {/* <th scope="col">View KYC</th> */}
                                      <th scope="col">KYC Status</th>
                                      <th scope="col">
                                        Commission Credit Status
                                      </th>
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
                                          {/* <td>{user.package_Id}</td>
                                          <td>{user.package_name}</td> */}
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
                                          {/* <td>{user?.role == "WhiteLabel" ? user?.White_Label_Website_URL :  user?.created_By_Website}</td> */}
                                          <td>{user?.created_By_Website}</td>
                                          <td>
                                            {user?.amount ? user?.amount : "NA"}
                                          </td>
                                          <td>
                                            {findPackagePrice(user)
                                              ? findPackagePrice(user)
                                              : "NA"}
                                          </td>
                                          <td>
                                            {parseInt(user?.amount) -
                                            findPackagePrice(user)
                                              ? parseInt(user?.amount) -
                                                findPackagePrice(user)
                                              : "NA"}
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
                                          <td>
                                            {user.White_Label_Commission_Status}
                                          </td>
                                          {/* <td>
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
                                                {user.payment_status ===
                                                  "Complete" &&
                                                  user.White_Label_Commission_Status !=
                                                    "Credit" && (
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        // setSelectedUser(user);
                                                        setShowApproveModel(
                                                          true
                                                        );
                                                        setSelectedItem(user);
                                                        setPackageAmount(
                                                          findPackagePrice(user)
                                                        );
                                                        setcommissionAmount(
                                                          parseInt(
                                                            user?.amount
                                                          ) -
                                                            findPackagePrice(
                                                              user
                                                            )
                                                        );
                                                        // deactivateUser(user.UserId)
                                                      }}
                                                    >
                                                      <span className="">
                                                        {" "}
                                                        <CiViewList />
                                                      </span>{" "}
                                                      Credit Commission
                                                    </Dropdown.Item>
                                                  )}
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

        {/* Approve Model  start*/}

        <Modal
          // size="lg"
          show={ShowApproveModel}
          //   fullscreen={true}
          onHide={() => setShowApproveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Commission Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SAApproveModel
                item={selectedItem}
                setShowApproveModel={setShowApproveModel}
                amount={commissionAmount}
                packageAmount={packageAmount}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Approve Model  end*/}
      </Wrapper>
    </>
  );
};

export default WLWebUsersJoinedList;

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
