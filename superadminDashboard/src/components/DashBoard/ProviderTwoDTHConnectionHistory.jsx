import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner, Tab, Tabs } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdGrid3X3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

// Mark for edit Model start //
const SAMarkEditModel = ({ item, setShowMarkEditModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    order_id: item.orderid,
    note: "",
    status: "Mark Edit",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "https://2kadam.co.in/api/auth/superAdmin/markForEditOfflineDTHConnection",
        // "https://2kadam.co.in/api/auth/superAdmin/resolveComplaint",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Mark For Edit Form Successfully",
        });
        setShowMarkEditModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setLoading(false);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      }
      Swal.fire({
        icon: "error",
        title: "An error occurred during the process. Please try again.",
      });
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handlesubmit}>
          <div className="">
            <label for="name" class="form-label">
              Order Id
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Enter order Id"
                value={item.orderid}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label for="name" class="form-label">
              Enter Note
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="note"
                class="form-control"
                placeholder="Enter Note"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="text-center  m-5">
              <button type="submit" className="btn p-2" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
// Mark for edit Model end //

const ProviderTwoDTHConnectionHistory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [underProcessForms, setUnderProcessForms] = useState([]);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [formStatus, setFormStatus] = useState(""); // For user type filter
  const [ShowApproveModel, setShowApproveModel] = useState(false);
  const [showMarkEditModel, setShowMarkEditModel] = useState(false);
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [ShowRejectModel, setShowRejectModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [OperatorName, setOperatorName] = useState("");
  const userID = currentUser.userId;

  const fetchOfflineForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getOfflineDTHConnection/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   const applicationData = data?.data?.filter((item) => item.status !== "Under Process")
      const applicationData = data?.data;
      setUsers(applicationData);

      //  const filterData = data?.data?.filter((item) => item.status === "Under Process")
      //  setUnderProcessForms(filterData);
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

  // useEffect(() => {
  //   fetchOfflineForm();
  // }, []);

  useEffect(() => {
    fetchOfflineForm();
  }, [isRefresh]);

  const filteredItems = users.filter((row) => {
    const matchesKeyword =
      (row?.first_name &&
        row.first_name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.number &&
        row.number.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.UserName &&
        row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.orderid &&
        row.orderid.toLowerCase().includes(keyword.trim().toLowerCase()));

    const matchesOperator =
      !OperatorName ||
      OperatorName === "---Select Operator---" ||
      row.operatorName === OperatorName;
    // return matchesKeyword && matchesType ;

    const matchesType =
      !formStatus ||
      formStatus === "---Select Form Status---" ||
      row.status === formStatus;
    return matchesKeyword && matchesType && matchesOperator;
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

  console.log(users);

  // const filteredUnderProcessItems = underProcessForms.filter((row) => {
  //   const matchesKeyword =  (row?.first_name &&
  //     row.first_name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
  //   (row?.number && row.number.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.UserName &&
  //       row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
  //     (row?.orderid &&
  //       row.orderid.toLowerCase().includes(keyword.trim().toLowerCase()))

  //   return matchesKeyword;
  // });

  // const totalUnderProcessPages = Math.ceil(filteredUnderProcessItems.length / complaintsPerPage);

  // const filterUnderProcessPagination = () => {
  //   const startIndex = currentPage * complaintsPerPage;
  //   const endIndex = startIndex + complaintsPerPage;
  //   return filteredUnderProcessItems?.slice(startIndex, endIndex);
  // };

  // const handleUnderProcessPageChange = ({ selected }) => {
  //   setCurrentPage(selected);
  // };

  // const showUnderProcessData = filterUnderProcessPagination();

  // console.log(showUnderProcessData);

  return (
    <>
      <Wrapper>
        <div className="row d-flex flex-column g-4">
          <div className="d-flex flex-column flex-lg-row gap-3">
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
            <div className="col-12 col-md-12 col-lg-6">
              {/* <label for="toDate" className="form-label">Select Operator</label> */}
              <select
                className="form-select"
                aria-label="Default select example"
                value={OperatorName}
                onChange={(e) => setOperatorName(e.target.value)}
              >
                <option selected>---Select Operator---</option>
                <option value="Dish TV">Dish TV</option>
                <option value="Tata Sky">Tata Sky</option>
                <option value="Videocon">Videocon</option>
                <option value="Sun Direct">Sun Direct</option>
                <option value="Airtel DTH">Airtel DTH</option>
              </select>
            </div>

            <div className="col-12 col-md-12 col-lg-6 col-xl-6">
              {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
              <select
                className="form-select"
                aria-label="Default select example"
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
              >
                <option selected>---Select Form Status---</option>
                <option value="Pending">Pending</option>
                <option value="Under Process">Under Process</option>
                <option value="Success">Success</option>
                {/* <option value="Mark Edit">Mark Edit</option> */}
                <option value="Reject">Reject</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
            {/* <label for="fromDate" className="form-label">From</label> */}
            <input
              id="fromDate"
              className="form-control"
              type="search"
              placeholder="Search By Name,Mobile,Order Id"
              value={keyword}
              onChange={(e) => (setKeyword(e.target.value), setCurrentPage(0))}
            />
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="table-responsive">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden ">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <table class="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Order Id</th>
                        <th scope="col">first_name</th>
                        <th scope="col">last_name</th>
                        <th scope="col">full_address</th>
                        <th scope="col">postal_code</th>
                        <th scope="col">number</th>
                        <th scope="col">Operator Name</th>
                        <th scope="col">Validity</th>
                        <th scope="col">amount</th>
                        <th scope="col">Description</th>
                        {/* <th scope="col">User Id</th>
                                  <th scope="col">User Name</th>
                                  <th scope="col">User Mobile</th> */}
                        <th scope="col">Status</th>
                        <th scope="col">Note</th>
                        {/* <th scope="col">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {showApiData && showApiData.length > 0 ? (
                        showApiData?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {currentPage * complaintsPerPage + index + 1}
                            </td>
                            <td>{item.created_at}</td>
                            <td>{item.orderid}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.full_address}</td>
                            <td>{item.postal_code}</td>
                            <td>{item.number}</td>
                            <td>{item.operatorName}</td>
                            <td>{item.validity}</td>
                            <td>{item.amount}</td>
                            <td>{item.message}</td>

                            {/* <td>{item.user_id}</td>
                                          <td>{item.UserName}</td>
                                          <td>{item.ContactNo}</td> */}
                            <td>{item.status}</td>
                            <td>{item.note}</td>
                            {/* <td>
                                            { (item.status === "Pending" || item.status === "Mark Edit") && 
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
                                                 
                                                    <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowApproveModel(true)
                                                      setSelectedItem(item)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Approve
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowMarkEditModel(true);
                                                      setSelectedItem(item)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Mark for Edit
                                                  </Dropdown.Item>
                                                
                                             
                                                </Dropdown.Menu>
                                              </Dropdown>
}

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

        {/* Mark Edit Model  start*/}

        <Modal
          // size="lg"
          show={showMarkEditModel}
          //   fullscreen={true}
          onHide={() => setShowMarkEditModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Mark For Edit Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SAMarkEditModel
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

export default ProviderTwoDTHConnectionHistory;

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
