
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdGrid3X3 } from "react-icons/md";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



//  approve model component start//
const SAApproveModel = ({ item, setShowApproveModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    order_id: item.order_id,
    note: "",
    status: "Under Process"
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
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/ApproveBankIdForm",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
        formData
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Approve Form Successfully",
        });
        setShowApproveModel(false);
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
                placeholder="Enter Package Name"
                value={item.order_id}
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


//  approve model component end//

// Mark for edit Model start // 
const SAMarkEditModel = ({ item, setShowMarkEditModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    order_id: item.order_id,
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
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/markForEditBankIdForm",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
        formData
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
                placeholder="Enter Package Name"
                value={item.order_id}
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


// Success Model start // 
const SASuccessModel = ({ item, setShowSuccessModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    order_id: item.order_id,
    note: "",
    status: "Success",
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
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/SuccessBankIdForm",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
        formData
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Mark Success Form Successfully",
        });
        setShowSuccessModel(false);
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
                placeholder="Enter Package Name"
                value={item.order_id}
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
// Success Model end // 


//  reject model component start//
const SARejectModel = ({ item, setShowRejectModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    order_id: item.order_id,
    note: "",
    status: "Reject",
    amount : item.amount,
    chargeAmount : "",
    refundAmount : "",
    user_id : item.user_id

  });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData and calculate refund amount if chargeAmount changes
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      if (name === "chargeAmount") {
        // Calculate refundAmount dynamically
        const chargeAmount = parseFloat(value) || 0; // Handle non-numeric input
        const refundAmount = Math.max(0, parseFloat(item.amount) - chargeAmount);
        updatedFormData.refundAmount = refundAmount.toFixed(2); // Format to 2 decimal places
      }

      return updatedFormData;
    });
  };




  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/rejectBankIdForm",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
        formData
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Reject Form Successfully",
        });
        setShowRejectModel(false);
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
                placeholder="Enter Package Name"
                value={item.order_id}
                onChange={handleChange}
                disabled
                required
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
                name="package_name"
                class="form-control"
                placeholder="Enter Package Name"
                value={item.amount}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
             Charge Amount
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="chargeAmount"
                class="form-control"
                placeholder="Enter Charge Amount"
                value={formData.chargeAmount}
                onChange={handleChange}
                pattern="^\d+(\.\d+)?$"
                title="Price should be digits Only"
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
             Refund Amount
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
                placeholder="Refund amount"
                value={formData.refundAmount  || formData.amount}
                // onChange={handleChange}
                disabled
                
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


//  reject model component end//



const SABankIdForms = () => {

  const [loading, setLoading] = useState(false);
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
  const [selectedItem, setSelectedItem] = useState("")


  const fetchOfflineForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getBankIdForm"
      );
      const applicationData = data?.data?.filter((item) => item.status !== "Under Process")
      setUsers(applicationData);

      const filterData = data?.data?.filter((item) => item.status === "Under Process")
      setUnderProcessForms(filterData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchOfflineForm();
  // }, []);

  useEffect(() => {
    fetchOfflineForm();
  }, [isRefresh]);

  const filteredItems = users.filter(
    (row) => {
      const matchesKeyword = (row?.applicant_name &&
        row.applicant_name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
        (row?.applicant_number && row.applicant_number.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.email &&
          row.email.toLowerCase().includes(keyword.trim().toLowerCase())) ||
        (row?.order_id &&
          row.order_id.toLowerCase().includes(keyword.trim().toLowerCase()))

      const matchesType = !formStatus || formStatus === "---Select Form Status---" || row.status === formStatus;
      return matchesKeyword && matchesType;
    }
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

  console.log(showApiData);


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
  //             "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/deactivateUser", 
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
  const filteredUnderProcessItems = underProcessForms.filter((row) => {
    const matchesKeyword =
      (row?.applicant_name &&
        row.applicant_name
          .toLowerCase()
          .includes(keyword.trim().toLowerCase())) ||
      (row?.applicant_number &&
        row.applicant_number
          .toLowerCase()
          .includes(keyword.trim().toLowerCase())) ||
      (row?.email &&
        row.email.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.order_id &&
        row.order_id.toLowerCase().includes(keyword.trim().toLowerCase()));


    return matchesKeyword;
  });

  const totalUnderProcessPages = Math.ceil(filteredUnderProcessItems.length / complaintsPerPage);

  const filterUnderProcessPagination = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredUnderProcessItems?.slice(startIndex, endIndex);
  };

  const handleUnderProcessPageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showUnderProcessData = filterUnderProcessPagination();

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
              <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata ">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>Complaint Raised List</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Bank-Id-history</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Bank-Id-history
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <Tabs
                        defaultActiveKey="Application"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        variant="tabs"
                      >
                        <Tab eventKey="Application" title="Application">
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
                                <input id="fromDate"
                                  className="form-control"
                                  type="search"
                                  placeholder="Enter Applicant Name/Mobile/Email Id/Order Id"
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
                                  <option value="Approve">Approve</option>
                                  <option value="Reject">Reject</option>

                                </select>

                              </div>

                            </div>


                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div class="table-responsive">
                                {loading ? (
                                  <div className="d-flex justify-content-center">
                                    <Spinner animation="border" role="status">
                                      <span className="visually-hidden ">Loading...</span>
                                    </Spinner>
                                  </div>
                                )
                                  :
                                  (
                                    <>
                                      <table class="table table-striped">
                                        <thead className="table-dark">
                                          <tr>
                                            <th scope="col">Sr.No</th>
                                            <th scope="col">Created Date</th>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Applicant Name</th>
                                            <th scope="col">Applicant Father Name</th>
                                            <th scope="col">Applicant Mother Name</th>
                                            <th scope="col">Mobile Number</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Service</th>
                                            <th scope="col">Select Bank Service</th>
                                            <th scope="col">Aadhaar Card</th>
                                            <th scope="col">PAN Card</th>
                                            <th scope="col">Business Name</th>
                                            {/* <th scope="col">View Form</th> */}
                                            <th scope="col">View Photo</th>
                                            <th scope="col">View Signature</th>
                                            <th scope="col">View KYC</th>
                                            <th scope="col">View Passbook</th>
                                            <th scope="col">View Shop Photo</th>
                                            <th scope="col">View Electricity Bill</th>
                                            <th scope="col">User Id</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">User Mobile</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Note</th>
                                            <th scope="col">Action</th>
                                          </tr>
                                        </thead>
                                        <tbody>

                                          {showApiData && showApiData.length > 0 ? (
                                            showApiData?.map((item, index) => (
                                              <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.created_at}</td>
                                                <td>{item.order_id}</td>
                                                <td>{item.applicant_name}</td>
                                                <td>{item.applicant_father}</td>
                                                <td>{item.applicant_mother}</td>
                                                <td>{item.applicant_number}</td>
                                                <td>{item.email}</td>
                                                <td>{item.applicant_select_service}</td>
                                                <td>{item.select_bank_service}</td>
                                                <td>{item.aadhar_card}</td>
                                                <td>{item.pan_card}</td>
                                                <td>{item.business_name}</td>
                                                {/* <td>
<a
href={item.attached_form}
target="_blank"
>
View Form
</a>
</td> */}
                                                <td>
                                                  <a
                                                    href={item.attached_photo}
                                                    target="_blank"
                                                  >
                                                    View Photo
                                                  </a>
                                                </td>
                                                <td>
                                                  <a
                                                    href={item.attached_sign}
                                                    target="_blank"
                                                  >
                                                    View Sign
                                                  </a>
                                                </td>
                                                <td>
                                                  {item.attached_kyc
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
                                                </td>
                                                <td>
                                                  <a
                                                    href={item.bank_passbook}
                                                    target="_blank"
                                                  >
                                                    View Passbook
                                                  </a>
                                                </td>
                                                <td>
                                                  <a
                                                    href={item.shop_photo}
                                                    target="_blank"
                                                  >
                                                    View Shop Photo
                                                  </a>
                                                </td>
                                                <td>
                                                  <a
                                                    href={item.electric_bill}
                                                    target="_blank"
                                                  >
                                                    View Electricity Bill
                                                  </a>
                                                </td>
                                                <td>{item.user_id}</td>
                                                <td>{item.UserName}</td>
                                                <td>{item.ContactNo}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.status}</td>
                                                <td>{item.note}</td>
                                                <td>
                                                  {(item.status === "Pending" || item.status === "Mark Edit") &&
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
                        </Tab>
                        <Tab eventKey="Under Process" title="Under Process">
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
    <input id="fromDate"
      className="form-control"
      type="search"
      placeholder="Enter Applicant Name/Mobile/Email Id/Order Id"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  </div>
  {/* <div className="col-12 col-md-12 col-lg-12 col-xl-3">


    <label for="toDate" className="form-label fw-bold">PAN Mode</label>
    <select
      className="form-select"
      aria-label="Default select example"
      value={formStatus}
      onChange={(e) => setFormStatus(e.target.value)}

    >
      <option selected>---Select Form Status---</option>
      <option value="Pending">Pending</option>
      <option value="Approve">Approve</option>
      <option value="Reject">Reject</option>

    </select>

  </div> */}

</div>


<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
  <div class="table-responsive">
    {loading ? (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden ">Loading...</span>
        </Spinner>
      </div>
    )
      :
      (
        <>
          <table class="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Created Date</th>
                <th scope="col">Order Id</th>
                <th scope="col">Applicant Name</th>
                <th scope="col">Applicant Father Name</th>
                <th scope="col">Applicant Mother Name</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Email</th>
                <th scope="col">Service</th>
                <th scope="col">Select Bank Service</th>
                <th scope="col">Aadhaar Card</th>
                <th scope="col">PAN Card</th>
                <th scope="col">Business Name</th>
                {/* <th scope="col">View Form</th> */}
                <th scope="col">View Photo</th>
                <th scope="col">View Signature</th>
                <th scope="col">View KYC</th>
                <th scope="col">View Passbook</th>
                <th scope="col">View Shop Photo</th>
                <th scope="col">View Electricity Bill</th>
                <th scope="col">User Id</th>
                <th scope="col">User Name</th>
                <th scope="col">User Mobile</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Note</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {showUnderProcessData && showUnderProcessData.length > 0 ? (
                showUnderProcessData?.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.created_at}</td>
                    <td>{item.order_id}</td>
                    <td>{item.applicant_name}</td>
                    <td>{item.applicant_father}</td>
                    <td>{item.applicant_mother}</td>
                    <td>{item.applicant_number}</td>
                    <td>{item.email}</td>
                    <td>{item.applicant_select_service}</td>
                    <td>{item.select_bank_service}</td>
                    <td>{item.aadhar_card}</td>
                    <td>{item.pan_card}</td>
                    <td>{item.business_name}</td>
                    {/* <td>
<a
href={item.attached_form}
target="_blank"
>
View Form
</a>
</td> */}
                    <td>
                      <a
                        href={item.attached_photo}
                        target="_blank"
                      >
                        View Photo
                      </a>
                    </td>
                    <td>
                      <a
                        href={item.attached_sign}
                        target="_blank"
                      >
                        View Sign
                      </a>
                    </td>
                    <td>
                      {item.attached_kyc
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
                    </td>
                    <td>
                      <a
                        href={item.bank_passbook}
                        target="_blank"
                      >
                        View Passbook
                      </a>
                    </td>
                    <td>
                      <a
                        href={item.shop_photo}
                        target="_blank"
                      >
                        View Shop Photo
                      </a>
                    </td>
                    <td>
                      <a
                        href={item.electric_bill}
                        target="_blank"
                      >
                        View Electricity Bill
                      </a>
                    </td>
                    <td>{item.user_id}</td>
                    <td>{item.UserName}</td>
                    <td>{item.ContactNo}</td>
                    <td>{item.amount}</td>
                    <td>{item.status}</td>
                    <td>{item.note}</td>
                    <td>
                      {item.status === "Under Process" &&
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
                                setShowSuccessModel(true);
                                setSelectedItem(item)
                                //   deactivateUser(user.UserId)
                              }}
                            >
                              <span className="">
                                {" "}
                                <CiViewList />
                              </span>{" "}
                              Success
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                // setSelectedUser(user);
                                setShowRejectModel(true);
                                setSelectedItem(item)
                                //   deactivateUser(user.UserId)
                              }}
                            >
                              <span className="">
                                {" "}
                                <CiViewList />
                              </span>{" "}
                              Reject
                            </Dropdown.Item>


                          </Dropdown.Menu>
                        </Dropdown>
                      }

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
              pageCount={totalUnderProcessPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handleUnderProcessPageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </PaginationContainer>

</div>
</div>
                        </Tab>

                      </Tabs>




                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approve  Model  start*/}

        <Modal
          // size="lg"
          show={ShowApproveModel}
          //   fullscreen={true}
          onHide={() => setShowApproveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Approve Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && <SAApproveModel item={selectedItem} setShowApproveModel={setShowApproveModel} setIsRefresh={setIsRefresh} />}
          </Modal.Body>
        </Modal>

        {/*  Approve Model  end*/}

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

        
           {/* Success Model  start*/}

           <Modal
          // size="lg"
          show={showSuccessModel}
          //   fullscreen={true}
          onHide={() => setShowSuccessModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Success Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SASuccessModel
                item={selectedItem}
                setShowSuccessModel={setShowSuccessModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Success Model  end*/}



        {/* Reject Model  start*/}

        <Modal
          // size="lg"
          show={ShowRejectModel}
          //   fullscreen={true}
          onHide={() => setShowRejectModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Reject Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && <SARejectModel item={selectedItem} setShowRejectModel={setShowRejectModel} setIsRefresh={setIsRefresh} />}
          </Modal.Body>
        </Modal>

        {/*  Reject Model  end*/}
      </Wrapper>
    </>
  );
}

export default SABankIdForms

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
  th{
    font-weight: 500;
    font-size: 14px;
   
  }
  td{
   font-size: 14px;
   white-space: nowrap;
   
  }
  @media (min-width: 1025px) and (max-width : 1500px){
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
