import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdDelete, MdGrid3X3, MdOutlineFormatListNumbered } from "react-icons/md";
import { FaEdit, FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { LuTextSelect } from "react-icons/lu";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";



// Approve User Model Component start ----------

const SAApproveUser = ({ user, setShowApproveModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [userRelation,setUserRelation] = useState([]);

  const [formData, setFormData] = useState({
    UserName: user?.UserName,
    UserId: user?.UserId,
    UserRole : user?.role,
    PackageId: "",
    Status: "Active",
    white_lable : userRelation?.white_lable,
    superDistributor : userRelation?.superDistributor,
    distributor : user.created_By_User_Role == "WhiteLabel" || user.created_By_User_Role == "SuperAdmin" ? "" : user.created_By_User_Id,
    website_url : user?.created_By_Website
  });

  const [retailerCreateformData, setRetailerCreateFormData] = useState({
    UserName: user?.UserName,
    UserId: user?.UserId,
    UserRole : user?.role,
    PackageId: "",
    Status: "Active",
    white_lable :  user.created_By_User_Role == "SuperAdmin" ? "" : user.created_By_User_Role == "WhiteLabel"  ?
    user.created_By_User_Id : userRelation?.white_lable,
    superDistributor : user.created_By_User_Role == "WhiteLabel" || user.created_By_User_Role == "SuperAdmin" ? "" : userRelation?.superDistributor,
    distributor : user.created_By_User_Role == "WhiteLabel" || user.created_By_User_Role == "SuperAdmin" ? "" : user.created_By_User_Id,
    website_url : user?.created_By_Website
  });
  const [distributorCreateformData, setdistributorCreateFormData] = useState({
    UserName: user?.UserName,
    UserId: user?.UserId,
    UserRole : user?.role,
    PackageId: "",
    Status: "Active",
    white_lable :  user.created_By_User_Role == "SuperAdmin" ? "" : user.created_By_User_Role == "WhiteLabel"  ?
    user.created_By_User_Id : userRelation?.white_lable,
    superDistributor : user.created_By_User_Role == "WhiteLabel" || user.created_By_User_Role == "SuperAdmin" ? "" : user.created_By_User_Id,
    distributor : "",
    website_url : user?.created_By_Website
  });
  const [superdistributorCreateformData, setSuperdistributorCreateFormData] = useState({
    UserName: user?.UserName,
    UserId: user?.UserId,
    UserRole : user?.role,
    PackageId: "",
    Status: "Active",
    white_lable : user.created_By_User_Role == "SuperAdmin" ? "" : user.created_By_User_Id,
    superDistributor : "",
    distributor : "",
    website_url : user?.created_By_Website
  });
  const [whiteLableCreateformData, setWhiteLableCreateFormData] = useState({
    UserName: user?.UserName,
    UserId: user?.UserId,
    UserRole : user?.role,
    PackageId: "",
    Status: "Active",
    white_lable : "",
    superDistributor : "",
    distributor : "",
    website_url : user?.White_Label_Website_URL
  });

  useEffect(() => {
    // Update form data when userRelation is loaded
    if (userRelation) {
      setFormData({
        ...formData,
        white_lable: userRelation?.white_lable,
        superDistributor: userRelation?.superDistributor,
      });
  
      setRetailerCreateFormData({
        ...retailerCreateformData,
        white_lable: user.created_By_User_Role === "SuperAdmin" ? "" : user.created_By_User_Role === "WhiteLabel" 
          ? user.created_By_User_Id : userRelation?.white_lable,
        superDistributor: user.created_By_User_Role === "WhiteLabel" || user.created_By_User_Role === "SuperAdmin"
          ? "" : userRelation?.superDistributor,
      });
  
      setdistributorCreateFormData({
        ...distributorCreateformData,
        white_lable: user.created_By_User_Role === "SuperAdmin" ? "" : user.created_By_User_Role === "WhiteLabel"
          ? user.created_By_User_Id : userRelation?.white_lable,
        superDistributor: user.created_By_User_Role === "WhiteLabel" || user.created_By_User_Role === "SuperAdmin"
          ? "" : user.created_By_User_Id,
      });
  
      setSuperdistributorCreateFormData({
        ...superdistributorCreateformData,
        white_lable: user.created_By_User_Role === "SuperAdmin" ? "" : user.created_By_User_Id,
      });
  
      setWhiteLableCreateFormData({
        ...whiteLableCreateformData,
        white_lable: "", // Or update based on userRelation if needed
      });
    }
  }, [userRelation]);


  let formDataToSend;

  // Determine which form data to send based on the user role
  if (user.role === "Retailer") {
    formDataToSend = retailerCreateformData;
  } else if (user.role === "Distributor") {
    formDataToSend = distributorCreateformData;
  } else if (user.role === "SuperDistributor") {
    formDataToSend = superdistributorCreateformData;
  } else if (user.role === "WhiteLabel") {
    formDataToSend = whiteLableCreateformData;
  }

  console.log(formDataToSend)


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Package selection handler
const handlePackageSelect = (e) => {
  const selectedPackageId = e.target.value;

  // Update the respective form data based on the user's role
  if (user.role === "Retailer") {
    setRetailerCreateFormData((prev) => ({
      ...prev,
      PackageId: selectedPackageId,
    }));
  } else if (user.role === "Distributor") {
    setdistributorCreateFormData((prev) => ({
      ...prev,
      PackageId: selectedPackageId,
    }));
  } else if (user.role === "SuperDistributor") {
    setSuperdistributorCreateFormData((prev) => ({
      ...prev,
      PackageId: selectedPackageId,
    }));
  } else if (user.role === "WhiteLabel") {
    setWhiteLableCreateFormData((prev) => ({
      ...prev,
      PackageId: selectedPackageId,
    }));
  }
};
  const [packages, setPackages] = useState([]);
  const [packagesLoading, setPackagesLoading] = useState(false);

  const fetchUserRelation = async () => {
    
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/superAdmin/getUserRelations/${user.created_By_User_Id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

      );
    
      console.log(data)
      setUserRelation(data.data);
      // setPackages(data.data);
      
    } catch (error) {
      console.error("Error fetching package data:", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
                  icon: "error",
                  title: "Your token is expired please login again",
                });
        dispatch(clearUser());
        navigate("/");
      }
      
    }
  };

  const fetchPackages = async () => {
    setPackagesLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPackage",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

      );
      const packageFind = ()=>{
        if(user.role == "Retailer"){
          return "package_Retailer"
        }
       else if(user.role == "WhiteLabel"){
          return "package_WhiteLabel"
        }
      else  if(user.role == "SuperDistributor"){
          return "package_SuperDistributor"
        }
       else if(user.role == "Distributor"){
          return "package_Distributor"
        }
       
      }
      const packagefor = packageFind();
      const filterPackage = data?.data?.filter((item)=>{
        return item?.package_for?.includes(packagefor) 
      })
      console.log(filterPackage)
      setPackages(filterPackage);
      // setPackages(data.data);
      setPackagesLoading(false);
    } catch (error) {
      console.error("Error fetching package data:", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
                  icon: "error",
                  title: "Your token is expired please login again",
                });
        dispatch(clearUser());
        navigate("/");
      }
      setPackagesLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchUserRelation();
  }, []);

  console.log(packages);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
     
      const response = await axios.put(
        // "https://2kadam.co.in/api/auth/superAdmin/approveUser",
        "https://2kadam.co.in/api/auth/superAdmin/approveUser",
        formDataToSend,
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
          title: "Active User Successfully",
        });
        setShowApproveModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
        setShowApproveModel(false);
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
        {packagesLoading ? (
          <div> Loading...</div>
        ) : (
          <form onSubmit={handlesubmit}>
            <div className="">
              <label for="name" class="form-label">
                User Name
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  // name="package_name"
                  class="form-control"
                  // placeholder="Enter Package Name"
                  value={user.UserName}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label for="name" class="form-label">
                User Id
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  // name="package_name"
                  class="form-control"
                  // placeholder="Enter Package Name"
                  value={user.UserId}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label for="name" class="form-label">
                User Role
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  // name="package_name"
                  class="form-control"
                  // placeholder="Enter Package Name"
                  value={user.role}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label for="name" class="form-label">
                Created By User Id
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  // name="package_name"
                  class="form-control"
                  // placeholder="Enter Package Name"
                  value={user.created_By_User_Id}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label for="name" class="form-label">
                Created By User Role
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  // name="package_name"
                  class="form-control"
                  // placeholder="Enter Package Name"
                  value={user.created_By_User_Role}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label for="name" class="form-label">
                Select Package
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <LuTextSelect />
                </span>
                <select
                  name="PackageId"
                  value={formDataToSend.PackageId}
                  onChange={handlePackageSelect}
                  class="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option value="" selected>
                    Select...
                  </option>

                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.package_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          {user.role != "WhiteLabel" && <div className="mt-3">
              <label for="name" class="form-label">
              Allotted  WhiteLabel User Id
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  name="white_lable"
                  class="form-control"
                  placeholder={formDataToSend.white_lable ? formDataToSend.white_lable : "NA"}
                  value={formDataToSend.white_lable}
                  onChange={handleChange}
                  disabled
                  
                  
                />
              </div>
            </div>} 
            {(user.role != "SuperDistributor" &&  user.role != "WhiteLabel" ) &&
             <div className="mt-3">
             <label for="name" class="form-label">
               Allotted Super Distributor User Id
             </label>
             <div class="input-group flex-nowrap">
               <span class="input-group-text" id="addon-wrapping">
                 {" "}
                 <MdGrid3X3 />
               </span>
               <input
                 type="text"
                 name="superDistributor"
                 class="form-control"
                 placeholder={formDataToSend.superDistributor ? formDataToSend.superDistributor : "NA"}
                 value={formDataToSend.superDistributor}
                 onChange={handleChange}
                 disabled
                 
                
               />
             </div>
           </div>}
           {(user.role != "SuperDistributor" &&  user.role != "WhiteLabel" && user.role != "Distributor") && 
            <div className="mt-3">
            <label for="name" class="form-label">
             Allotted  Distributor User Id
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="distributor"
                class="form-control"
                placeholder={formDataToSend.distributor ? formDataToSend.distributor : "NA"}
                value={formDataToSend.distributor}
                onChange={handleChange}
                disabled
                
               
              />
            </div>
          </div>}
           

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="text-center  m-5">
                <button type="submit" className="btn btn-primary p-2" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

// Approve User Model Component end -----------


// Reject User Model Component start ----------

const SARejectUser = ({ user, setShowRejectModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    UserName: user.UserName,
    UserId: user.UserId,
    // PackageId: "",
    // Status: "Active",
    Note : ""
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
        // "https://2kadam.co.in/api/auth/superAdmin/rejectUser",
        "https://2kadam.co.in/api/auth/superAdmin/rejectUser",
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
          title: "Reject User Successfully",
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
                User Name
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
                  value={user.UserName}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label for="name" class="form-label">
                User Id
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
                  value={user.UserId}
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
                  name="Note"
                  class="form-control"
                  placeholder="Enter Note"
                  value={formData.Note}
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

// Reject User Model Component end -----------

const SAPendingKycUsers = () => {
  const [ShowApproveModel, setShowApproveModel] = useState(false);
  const [ShowRejectModel, setShowRejectModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [userType, setUserType] = useState(""); // For user type filter

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingUsers",
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
      console.error("Error fetching package data:", error);
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
  //   fetchPendingUsers();
  // }, []);
  useEffect(() => {
    fetchPendingUsers();
  }, [isRefresh]);

  console.log(users);

  // const filteredItems = users.filter(
  //   (row) =>
  //     (row?.UserName &&
  //       row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
  //     (row?.UserId && row.UserId.toLowerCase().includes(keyword.trim().toLowerCase()))
  // );

  const filteredItems = users.filter(
    (row) =>{ 
      const matchesKeyword =  (row?.UserName &&
        row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.UserId && row.UserId.toLowerCase().includes(keyword.trim().toLowerCase()))  ||  (row?.ContactNo &&
          row.ContactNo.toLowerCase().includes(keyword.trim().toLowerCase())) ||
        (row?.Email &&
          row.Email.toLowerCase().includes(keyword.trim().toLowerCase()))

          const matchesUserType = !userType || userType === "---Select User Type---" || row.role === userType;
          return matchesKeyword && matchesUserType;
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
                          Pending KYC Users
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Pending KYC Users
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
                      <div className="row d-flex flex-column g-4">
                        {/* <div className="d-flex flex-column flex-md-row gap-3">
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="fromDate" className="form-label">From</label>
                                                        <input id="fromDate" className="form-control" type="date" />
                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6">
                                                        <label for="toDate" className="form-label">To</label>

                                                        <input id="toDate" className="form-control " type="search"
                                                         placeholder="Search User"
                                                         value={keyword}
                              onChange={(e) => setKeyword(e.target.value)} />
                                                    </div>
                                                    <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div>

                                                </div> */}

                                                <div className="d-flex flex-column flex-xl-row gap-3">
                                                    <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                                                        {/* <label for="fromDate" className="form-label">From</label> */}
                                                        <input id="fromDate" 
                                                        className="form-control"
                                                         type="search"
                                                         placeholder="Enter User Name/User Id/Mobile/Email Id"
                                                         value={keyword}
                              // onChange={(e) => setKeyword(e.target.value)}
                              onChange={(e) => {
                                setKeyword(e.target.value)
                                setCurrentPage(0);
                              }}
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
                              <option value="SuperDistributor">Super Distributor</option>
                              <option value="WhiteLabel">White Label</option>
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
                              <span className="visually-hidden ">Loading...</span>
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

                                    
                                    <th scope="col">Aadhar Front</th>
                                    <th scope="col">Aadhar Back</th>
                                    <th scope="col">Pan Card Front</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Payment Status</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Note</th>
                                    <th scope="col">Action</th>
                                    
                                  </tr>
                                </thead>
                                <tbody>
                                  {showApiData && showApiData.length > 0 ? (
                                    showApiData?.map((user, index) => (
                                      <tr key={user.id}>
                                        {/* <th scope="row">{index + 1}</th> */}
                                        <td>
                                                {currentPage *
                                                  complaintsPerPage +
                                                  index +
                                                  1}
                                              </td>
                                        <td>{user.CreateAt}</td>

                                        <td>{user.UserId}</td>

                                        <td>{user.UserName}</td>
                                        <td>{user.role}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.ContactNo}</td>
                                        <td>{user.PanCardNumber}</td>
                                        <td>{user.AadharNumber}</td>
                                        <td>{user.BusinessName}</td>
                                        <td>{user.City}</td>

                                        <td>{user.State}</td>
                                        <td>{user.PinCode}</td>
                                        <td>{user?.created_By_User_Id + " " + user?.created_By_User_Role}</td>
                                        <td>{user?.role == "WhiteLabel" ? user?.White_Label_Website_URL :  user?.created_By_Website}</td>
                                      

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
                                        <td>
                                          {
                                            user.AadharFront ?
                                            <a
                                            href={user.AadharFront}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a> 
                                            :
                                            "Not Available"
                                          }
                                         
                                        </td>
                                        <td>
                                          {
                                            user.AadharBack ? 
                                            <a
                                            href={user.AadharBack}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a>
                                            :
                                            "Not Available"
                                          }
                                         
                                        </td>
                                        <td>
                                          {
                                           user.PanCardFront ?
                                           <a
                                           href={user.PanCardFront}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                         >
                                           View
                                         </a> : 
                                         "Not Available"
                                          }
                                         
                                        </td>
                                        <td>
                                          {
                                           user.profileImage ?
                                           <a
                                           href={user.profileImage}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                         >
                                           View
                                         </a> : 
                                         "Not Available"
                                          }
                                         
                                        </td>
                                        <td>{user?.payment_status}</td>
                                        <td>{user.Status}</td>
                                        {/* <td> <Link to={'/change-price'}>Change Price </Link></td> */}
                                        <td>{user?.Note}</td>
                                        <td>
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
                                                  setSelectedUser(user);
                                                  setShowApproveModel(true);
                                                }}
                                              >
                                                <span className="">
                                                  {" "}
                                                  <CiViewList />
                                                </span>{" "}
                                                Approve User
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                onClick={() => {
                                                  setSelectedUser(user);
                                                  setShowRejectModel(true);
                                                }}
                                              >
                                                <CiViewList /> Reject User
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

        {/* Approve user Model  start*/}

        <Modal
          // size="lg"
          show={ShowApproveModel}
          //   fullscreen={true}
          onHide={() => setShowApproveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Approve User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <SAApproveUser
                user={selectedUser}
                setShowApproveModel={setShowApproveModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Approve user Model  end*/}

        {/* Reject user Model  start*/}

        <Modal
          // size="lg"
          show={ShowRejectModel}
          //   fullscreen={true}
          onHide={() => setShowRejectModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Reject User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && <SARejectUser user={selectedUser} setShowRejectModel={setShowRejectModel}  setIsRefresh={setIsRefresh}/>}
          </Modal.Body>
        </Modal>

        {/*  Reject user Model  end*/}
      </Wrapper>
    </>
  );
};

export default SAPendingKycUsers;

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
