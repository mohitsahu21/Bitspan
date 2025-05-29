import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Button, Dropdown, Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdGrid3X3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

// Active component start//
const SAActiveApi = ({ complaint, setShowActiveModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    id: complaint.id,
    status: "Active",
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
        "https://2kadam.co.in/api/auth/superAdmin/ActiveApi",
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
          title: "Active API Successfully",
        });
        setShowActiveModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
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
              Id
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
                placeholder="Enter Package Name"
                value={complaint.id}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label for="name" class="form-label">
              API Name
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="response"
                class="form-control"
                placeholder="Enter Note"
                value={complaint.API_Name}
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
              API For
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="response"
                class="form-control"
                placeholder="Enter Note"
                value={complaint.API_for}
                required
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="text-center  m-5">
              <button type="submit" className="btn btn-primary p-2" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

// Active component end//

// Deactive component start//
const SADeactiveApi = ({ complaint, setShowEditModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    id: complaint.id,
    amount: complaint.amount,
    validity: complaint.validity,
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
        "https://2kadam.co.in/api/auth/superAdmin/EditDTHConnetionPlans",
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
          title: "Edit Plan Successfully",
        });
        setShowEditModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
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
              Id
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
                placeholder="Enter Package Name"
                value={complaint.id}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label for="name" class="form-label">
              Operator Name
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="response"
                class="form-control"
                placeholder="Enter Note"
                value={complaint.operator}
                required
                disabled
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
              Amount
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="amount"
                class="form-control"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleChange}
                pattern="^[0-9]*$"
                title="Price should be digits Only"
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
              Validity
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="validity"
                class="form-control"
                placeholder="Enter Validity"
                value={formData.validity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="text-center  m-5">
              <button type="submit" className="btn btn-primary p-2" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

// Deactive component end//

// Create plan component start//
const SACreatePlan = ({  setShowCreatePlanModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    operator : "",
    amount: "",
    validity: "",
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
      const response = await axios.post(
        "https://2kadam.co.in/api/auth/superAdmin/CreateDTHConnectionPlans",
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
          title: "Create Plan Successfully",
        });
        setShowCreatePlanModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
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
             Operator
            </label>
            <select className="form-select" aria-label="Default select example"
            name="operator" required
                                                         value={formData.operator}
                                                         onChange={handleChange}>
                                                             <option selected value="">---Select Operator---</option>
                                                            <option value="Dish TV">Dish TV</option>
                                                            <option value="Tata Sky">Tata Sky</option>
                                                            <option value="Videocon">Videocon</option>
                                                            <option value="Sun Direct">Sun Direct</option>
                                                            <option value="Airtel DTH">Airtel DTH</option>


                                                        </select>
          </div>

         
          <div className="mt-3">
            <label for="name" class="form-label">
              Amount
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="amount"
                class="form-control"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleChange}
                pattern="^[0-9]*$"
                title="Price should be digits Only"
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
              Validity
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="validity"
                class="form-control"
                placeholder="Enter Validity"
                value={formData.validity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="text-center  m-5">
              <button type="submit" className="btn btn-primary p-2" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

// Create plan component end//




const SASetDTHPlans = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [Status, setStatus] = useState(""); // For user type filter
  const [ShowDeactiveModel, setShowDeactiveModel] = useState(false);
  const [ShowCreatePlanModel, setShowCreatePlanModel] = useState(false);
  const [ShowEditModel, setShowEditModel] = useState(false);
  const [showActiveModel, setShowActiveModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState("");

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getDTHConnectionPlans",
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

  // useEffect(() => {
  //   fetchComplaints();
  // }, []);

  useEffect(() => {
    fetchComplaints();
  }, [isRefresh]);

  const deletePlan = async (id) => {
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const { data } = await axios.delete(
            "https://2kadam.co.in/api/auth/superAdmin/DeleteDTHConnetionPlans", 
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              data: { id }, // Pass data correctly in the second argument
            }
    
          );
          if (data.success) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: data.message,
              icon: "success"
            });
            setIsRefresh((value) => !value);
          } else {
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: data.message || "An error occurred during the process. Please try again.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error deleting plan:", error);
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
            icon: "error"
          });
        } finally {
          setLoading(false);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your plan is safe :)",
          icon: "error"
        });
      }
    });
  };

  const filteredItems = users.filter((row) => {
    const matchesKeyword =
      (row?.operator &&
        row.operator.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.amount &&
        row.amount.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.validity &&
        row.validity.toLowerCase().includes(keyword.trim().toLowerCase()));

    //   const matchesType = !Status || Status === "---Select Status---" || row.API_Status	 === Status;
    return matchesKeyword;
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

  //   const deactivateUser = async (id) => {
  //     const swalWithBootstrapButtons = Swal.mixin({
  //       customClass: {
  //         confirmButton: "btn btn-success",
  //         cancelButton: "btn btn-danger"
  //       },
  //       buttonsStyling: false
  //     });

  //     swalWithBootstrapButtons.fire({
  //       title: "Are you sure?",
  //       // text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, deactive it!",
  //       cancelButtonText: "No, cancel!",
  //       reverseButtons: true
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         setLoading(true);
  //         try {
  //           const { data } = await axios.put(
  //             "https://2kadam.co.in/api/auth/superAdmin/deactivateUser",
  //             {
  //                userId: id
  //             }
  //           );
  //           if (data.success) {
  //             swalWithBootstrapButtons.fire({
  //               title: "Deactivated!",
  //               text: data.message,
  //               icon: "success"
  //             });
  //            fetchActiveUsers();
  //           } else {
  //             swalWithBootstrapButtons.fire({
  //               title: "Error!",
  //               text: data.message || "An error occurred during the process. Please try again.",
  //               icon: "error"
  //             });
  //           }
  //         } catch (error) {
  //           console.error("Error deactivate user:", error);
  //           swalWithBootstrapButtons.fire({
  //             title: "Error!",
  //             text: "An error occurred during the process. Please try again.",
  //             icon: "error"
  //           });
  //         } finally {
  //           setLoading(false);
  //         }
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         swalWithBootstrapButtons.fire({
  //           title: "Cancelled",
  //           text: "Your user is safe :)",
  //           icon: "error"
  //         });
  //       }
  //     });
  //   };
  console.log(showApiData);

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
                          Set DTH Connection Plans
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Set DTH Connection Plans
                          </span>{" "}
                        </p>
                      </div>
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
                              placeholder="Search Operator/Amount/Validity"
                              value={keyword}
                              // onChange={(e) => setKeyword(e.target.value)}
                              onChange={(e) => {
                                setKeyword(e.target.value)
                                setCurrentPage(0);
                              }}
                            />
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-3">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={()=>setShowCreatePlanModel(true)}
                            >
                              Create Plan
                            </button>
                            {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label>
                                                        <select
                                                          className="form-select"
                                                          aria-label="Default select example"
                                                          value={Status}
                                                          onChange={(e) => setStatus(e.target.value)}
                                                          
                                                        >
                                                          <option selected>---Select Status---</option>
                                                          <option value="Active">Active</option>
                                                          <option value="Deactive">Deactive</option>
                                                      
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
                              <>
                                <table class="table table-striped">
                                  <thead className="table-dark">
                                    <tr>
                                      <th scope="col">Id</th>
                                      <th scope="col">Operator Name</th>

                                      <th scope="col">Amount</th>
                                      <th scope="col">Validity</th>
                                      {/* <th scope="col">Status</th> */}
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {showApiData && showApiData.length > 0 ? (
                                      showApiData?.map((user, index) => (
                                        <tr key={user.id}>
                                          {/* <th scope="row">{index + 1}</th> */}
                                          <th scope="row">{user.id}</th>

                                          <td>{user.operator}</td>
                                          <td>{user.amount}</td>
                                          <td>{user.validity}</td>
                                          {/* <td>{user.API_Status}</td> */}

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
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    // setSelectedUser(user);
                                                    setShowEditModel(true);
                                                    setSelectedComplaint(user);
                                                    //   deactivateUser(user.UserId)
                                                  }}
                                                >
                                                  <span className="">
                                                    {" "}
                                                    <CiViewList />
                                                  </span>{" "}
                                                  Edit Plan
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  onClick={() => {
                                                   
                                                    setSelectedComplaint(user);
                                                    deletePlan(user.id)
                                                  }}
                                                >
                                                  <span className="">
                                                    {" "}
                                                    <CiViewList />
                                                  </span>{" "}
                                                Delete Plan
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>

                                            {/* { user.API_Status	 === "Deactive" && 
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
                                                      setShowActiveModel(true)
                                                      setSelectedComplaint(user)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                 Active
                                                  </Dropdown.Item>
                                                  
                                                
                                             
                                                </Dropdown.Menu>
                                              </Dropdown>
} */}
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

        {/* Active Model  start*/}

        <Modal
          // size="lg"
          show={showActiveModel}
          //   fullscreen={true}
          onHide={() => setShowActiveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Active API
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedComplaint && (
              <SAActiveApi
                complaint={selectedComplaint}
                setShowActiveModel={setShowActiveModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Active Model  end*/}

        {/* Deactive Model  start*/}

        <Modal
          // size="lg"
          show={ShowEditModel}
          //   fullscreen={true}
          onHide={() => setShowEditModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Edit Plan
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedComplaint && (
              <SADeactiveApi
                complaint={selectedComplaint}
                setShowEditModel={setShowEditModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Deactive  Model  end*/}

         {/* Create Plan Model  start*/}

         <Modal
          // size="lg"
          show={ShowCreatePlanModel}
          //   fullscreen={true}
          onHide={() => setShowCreatePlanModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Create Plan
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
              <SACreatePlan
               
                setShowCreatePlanModel={setShowCreatePlanModel}
                setIsRefresh={setIsRefresh}
              />
            
          </Modal.Body>
        </Modal>

        {/*  Create Plan  Model  end*/}
      </Wrapper>
    </>
  );
};

export default SASetDTHPlans;

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
