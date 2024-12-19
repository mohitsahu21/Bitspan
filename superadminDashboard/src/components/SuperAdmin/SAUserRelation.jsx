import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdDelete, MdOutlineFormatListNumbered } from "react-icons/md";
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
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


// Change White Label User Model Component start ----------

const SAChangeWhiteLabel = ({ user, setWhiteLabelModel, setIsRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [userRelation,setUserRelation] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
  
    const [formData, setFormData] = useState({
      UserName: user?.UserName,
      UserId: user?.UserId,
      UserRole : user?.role,
      WhiteLabelId: "",
        
    });
  
    
  
    
  
  
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
 
    const [packages, setPackages] = useState([]);
    const [packagesLoading, setPackagesLoading] = useState(false);
    const [options, setOptions] = useState([]); // Store options for Select
    const [selectedOption, setSelectedOption] = useState(null); // Store selected option
  
    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          fontWeight: state.isSelected ? "bold" : "bold", // Bold for selected options
        }),
        singleValue: (provided) => ({
          ...provided,
         
        }),
      };
   
  console.log(packages)
    const fetchPackages = async () => {
      setPackagesLoading(true);
      try {
        const { data } = await axios.get(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getAllUsers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
  
        );

        const filterPackage = data?.data?.filter((item)=>{
          return item?.role?.includes("WhiteLabel") 
        })

         // Transform users into the required format for react-select
         const userOptions = filterPackage.map((user) => ({
            value: user.UserId, // Use the user ID or unique identifier
            // label: "User Id" +  "--" + user.UserId  + "--User Name --"+ user.UserName + "--User Role --" + user.role + "--User Mobile --" + user.ContactNo,
            label: `User Id: ${user.UserId}\nUser Name: ${user.UserName}\nUser Role: ${user.role}\nUser Mobile: ${user.ContactNo}`, // Format the label
            user:user
          }));
    //   setUsers(data.data);
      setOptions(userOptions); // Set options for Select
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
   
    }, []);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption.user);
        setFormData({
          ...formData,
          WhiteLabelId: selectedOption?.value || "", // Update `package_for` with the selected value
        });
      };
  
    console.log(formData);
  
    const handlesubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
       
        const response = await axios.put(
          // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/approveUser",
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/changeUserWhiteLabel",
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
            title: "Change User Successfully",
          });
          setWhiteLabelModel(false);
          setIsRefresh((value) => !value);
        } else {
          Swal.fire({
            icon: "error",
            title: "An error occurred during the process. Please try again.",
          });
          setWhiteLabelModel(false);
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
       <Wrapper>
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
                    <FaRupeeSign />
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
                    <FaRupeeSign />
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
                    <FaRupeeSign />
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
              <div className="mt-3 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <label for="name" class="form-label">Select White Label</label>
                     
                       
                        <Select
                          // defaultValue={selectedOption}
                          // onChange={setSelectedOption}

                          // defaultValue={formData.package_for}
                          value={options.find(option => option.value === formData.package_for)} // Match the selected value
                          onChange={(selectedOption) => handleSelectChange(selectedOption)} // Pass selected option
                          options={options}
                          classNamePrefix="react-select"
                          styles={customStyles}
                          required={true}
                        />
                      
                    </div>
             
{/*             
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
              </div> */}
           
             
  
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="text-center  m-5">
                  <button type="submit" className="btn p-2" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        </Wrapper>
      </>
    );
  };
  
  // change White Label User Model Component end -----------


  // Change Super Distributer User Model Component start ----------

const SAChangeSuperDistributor = ({ user, setSuperDistributorModel, setIsRefresh }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
  
    const [formData, setFormData] = useState({
      UserName: user?.UserName,
      UserId: user?.UserId,
      UserRole : user?.role,
      superDistributorID: "",
        
    });
  
    
  
    
  
  
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
 
    const [packages, setPackages] = useState([]);
    const [packagesLoading, setPackagesLoading] = useState(false);
    const [options, setOptions] = useState([]); // Store options for Select
    const [selectedOption, setSelectedOption] = useState(null); // Store selected option
  
    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          fontWeight: state.isSelected ? "bold" : "bold", // Bold for selected options
        }),
        singleValue: (provided) => ({
          ...provided,
         
        }),
      };
   
  console.log(packages)
    const fetchPackages = async () => {
      setPackagesLoading(true);
      try {
        const { data } = await axios.get(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getAllUsers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
  
        );

        const filterPackage = data?.data?.filter((item)=>{
          return item?.role?.includes("SuperDistributor") 
        })

         // Transform users into the required format for react-select
         const userOptions = filterPackage.map((user) => ({
            value: user.UserId, // Use the user ID or unique identifier
            // label: "User Id" +  "--" + user.UserId  + "--User Name --"+ user.UserName + "--User Role --" + user.role + "--User Mobile --" + user.ContactNo,
            label: `User Id: ${user.UserId}\nUser Name: ${user.UserName}\nUser Role: ${user.role}\nUser Mobile: ${user.ContactNo}`, // Format the label
            user:user
          }));
    //   setUsers(data.data);
      setOptions(userOptions); // Set options for Select
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
   
    }, []);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption.user);
        setFormData({
          ...formData,
          superDistributorID: selectedOption?.value || "", // Update `package_for` with the selected value
        });
      };
  
    console.log(formData);
  
    const handlesubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
       
        const response = await axios.put(
          // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/approveUser",
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/changeUserSuperDistributor",
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
            title: "Change User Successfully",
          });
          setSuperDistributorModel(false);
          setIsRefresh((value) => !value);
        } else {
          Swal.fire({
            icon: "error",
            title: "An error occurred during the process. Please try again.",
          });
          setSuperDistributorModel(false);
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
       <Wrapper>
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
                    <FaRupeeSign />
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
                    <FaRupeeSign />
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
                    <FaRupeeSign />
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
              <div className="mt-3 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <label for="name" class="form-label">Select Super Distributor</label>
                     
                       
                        <Select
                          // defaultValue={selectedOption}
                          // onChange={setSelectedOption}

                          // defaultValue={formData.package_for}
                          value={options.find(option => option.value === formData.package_for)} // Match the selected value
                          onChange={(selectedOption) => handleSelectChange(selectedOption)} // Pass selected option
                          options={options}
                          classNamePrefix="react-select"
                          styles={customStyles}
                          required={true}
                        />
                      
                    </div>
             
  
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="text-center  m-5">
                  <button type="submit" className="btn p-2" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        </Wrapper>
      </>
    );
  };
  
  // change Super distributor User Model Component end -----------

  // Change Distributer User Model Component start ----------

const SAChangeDistributor = ({ user, setDistributorModel, setIsRefresh }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
  
    const [formData, setFormData] = useState({
      UserName: user?.UserName,
      UserId: user?.UserId,
      UserRole : user?.role,
      distributorID: "",
        
    });
  
    
  
    
  
  
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
 
    const [packages, setPackages] = useState([]);
    const [packagesLoading, setPackagesLoading] = useState(false);
    const [options, setOptions] = useState([]); // Store options for Select
    const [selectedOption, setSelectedOption] = useState(null); // Store selected option
  
    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          fontWeight: state.isSelected ? "bold" : "bold", // Bold for selected options
        }),
        singleValue: (provided) => ({
          ...provided,
         
        }),
      };
   
  console.log(packages)
    const fetchPackages = async () => {
      setPackagesLoading(true);
      try {
        const { data } = await axios.get(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getAllUsers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
  
        );

        const filterPackage = data?.data?.filter((item)=>{
          return item?.role?.includes("Distributor") &&  !item?.role?.includes("SuperDistributor")
        })

         // Transform users into the required format for react-select
         const userOptions = filterPackage.map((user) => ({
            value: user.UserId, // Use the user ID or unique identifier
            // label: "User Id" +  "--" + user.UserId  + "--User Name --"+ user.UserName + "--User Role --" + user.role + "--User Mobile --" + user.ContactNo,
            label: `User Id: ${user.UserId}\nUser Name: ${user.UserName}\nUser Role: ${user.role}\nUser Mobile: ${user.ContactNo}`, // Format the label
            user:user
          }));
    //   setUsers(data.data);
      setOptions(userOptions); // Set options for Select
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
   
    }, []);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption.user);
        setFormData({
          ...formData,
          distributorID: selectedOption?.value || "", // Update `package_for` with the selected value
        });
      };
  
    console.log(formData);
  
    const handlesubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
       
        const response = await axios.put(
          // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/approveUser",
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/changeUserDistributor",
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
            title: "Change User Successfully",
          });
          setDistributorModel(false);
          setIsRefresh((value) => !value);
        } else {
          Swal.fire({
            icon: "error",
            title: "An error occurred during the process. Please try again.",
          });
          setDistributorModel(false);
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
       <Wrapper>
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
                    <FaRupeeSign />
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
                    <FaRupeeSign />
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
                    <FaRupeeSign />
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
              <div className="mt-3 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <label for="name" class="form-label">Select Distributor</label>
                     
                       
                        <Select
                          // defaultValue={selectedOption}
                          // onChange={setSelectedOption}

                          // defaultValue={formData.package_for}
                          value={options.find(option => option.value === formData.package_for)} // Match the selected value
                          onChange={(selectedOption) => handleSelectChange(selectedOption)} // Pass selected option
                          options={options}
                          classNamePrefix="react-select"
                          styles={customStyles}
                          required={true}
                        />
                      
                    </div>
             
  
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="text-center  m-5">
                  <button type="submit" className="btn p-2" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        </Wrapper>
      </>
    );
  };
  
  // change Super distributor User Model Component end -----------




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
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/rejectUser",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/rejectUser",
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
                  <FaRupeeSign />
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
                  <FaRupeeSign />
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
                  <FaRupeeSign />
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

const SAUserRelation = () => {
  const [ShowApproveModel, setShowApproveModel] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [whiteLabelModel,setWhiteLabelModel] = useState(false);
  const [superDistributor,setSuperDistributorModel] = useState(false);
  const [Distributor,setDistributorModel] = useState(false);
  const [ShowRejectModel, setShowRejectModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
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
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserRelationData",
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

          const matchesUserType = !userType || userType === "---Select User Type---" || row.userType === userType;
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
                          User Relation Table
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            User Relation Table
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
                                    

                                    <th scope="col">User Id</th>
                                    <th scope="col">
                                      User <br /> Name
                                    </th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">White Label</th>
                                    <th scope="col">Super Distributor</th>
                                    <th scope="col">Distributor</th>
                                    <th scope="col">Website Url</th>
                                    <th scope="col">Action</th>
                                    
                                  </tr>
                                </thead>
                                <tbody>
                                  {showApiData && showApiData.length > 0 ? (
                                    showApiData?.map((user, index) => (
                                      <tr key={user.ur_id }>
                                        <th scope="row">{index + 1}</th>
                                      

                                        <td>{user.UserId}</td>

                                        <td>{user.UserName}</td>
                                        <td>{user.userType}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.ContactNo}</td>
                                        <td>{user.white_lable ? user.white_lable : "NA" }</td>
                                        <td>{user.superDistributor ? user.superDistributor : "NA" }</td>
                                        <td>{user.distributor ? user.distributor : "NA" }</td>
                                        <td>{user.website_url ? user.website_url : "NA" }</td>
                                        
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
                                            
                                                {
                                                    user.userType === "SuperDistributor" &&  (
                                                        <Dropdown.Item
                                                        onClick={() => {
                                                          setSelectedUser(user);
                                                          setWhiteLabelModel(true);
                                                        }}
                                                      >
                                                        <span className="">
                                                          {" "}
                                                          <CiViewList />
                                                        </span>{" "}
                                                        Change White Label
                                                      </Dropdown.Item>
                                                    )
                                                   
                                                }
                                                   {
                                                    user.userType === "Distributor" &&  (
                                                        <Dropdown.Item
                                                        onClick={() => {
                                                          setSelectedUser(user);
                                                          setWhiteLabelModel(true);
                                                        }}
                                                      >
                                                        <span className="">
                                                          {" "}
                                                          <CiViewList />
                                                        </span>{" "}
                                                        Change White Label
                                                      </Dropdown.Item>
                                                    )
                                                   
                                                }
                                                   {
                                                    user.userType === "Distributor" &&  (
                                                        <Dropdown.Item
                                                        onClick={() => {
                                                          setSelectedUser(user);
                                                          setSuperDistributorModel(true);
                                                        }}
                                                      >
                                                        <span className="">
                                                          {" "}
                                                          <CiViewList />
                                                        </span>{" "}
                                                        Change Super Distributor
                                                      </Dropdown.Item>
                                                    )
                                                   
                                                }
                                                 {
                                                    user.userType === "Retailer" &&  (
                                                        <Dropdown.Item
                                                        onClick={() => {
                                                          setSelectedUser(user);
                                                          setWhiteLabelModel(true);
                                                        }}
                                                      >
                                                        <span className="">
                                                          {" "}
                                                          <CiViewList />
                                                        </span>{" "}
                                                        Change White Label
                                                      </Dropdown.Item>
                                                    )
                                                   
                                                }

{
                                                    user.userType === "Retailer" &&  (
                                                        <Dropdown.Item
                                                        onClick={() => {
                                                          setSelectedUser(user);
                                                          setSuperDistributorModel(true);
                                                        }}
                                                      >
                                                        <span className="">
                                                          {" "}
                                                          <CiViewList />
                                                        </span>{" "}
                                                        Change Super Distributor
                                                      </Dropdown.Item>
                                                    )
                                                   
                                                }

{
                                                    user.userType === "Retailer" &&  (
                                                        <Dropdown.Item
                                                        onClick={() => {
                                                          setSelectedUser(user);
                                                          setDistributorModel(true);
                                                        }}
                                                      >
                                                        <span className="">
                                                          {" "}
                                                          <CiViewList />
                                                        </span>{" "}
                                                        Change Distributor
                                                      </Dropdown.Item>
                                                    )
                                                   
                                                }
                                              {/* <Dropdown.Item
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
                                              </Dropdown.Item> */}
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

        {/* Approve user Model  start*/}

        <Modal
          // size="lg"
          show={whiteLabelModel}
          //   fullscreen={true}
          onHide={() => setWhiteLabelModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
             Change White Label
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <SAChangeWhiteLabel
                user={selectedUser}
                setWhiteLabelModel={setWhiteLabelModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Approve user Model  end*/}
        {/* Approve user Model  start*/}

        <Modal
          // size="lg"
          show={superDistributor}
          //   fullscreen={true}
          onHide={() => setSuperDistributorModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
             Change Super Distributor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <SAChangeSuperDistributor
                user={selectedUser}
                setSuperDistributorModel={setSuperDistributorModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Approve user Model  end*/}
        {/* Change distributor user Model  start*/}

        <Modal
          // size="lg"
          show={Distributor}
          //   fullscreen={true}
          onHide={() => setDistributorModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
             Change Distributor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <SAChangeDistributor
                user={selectedUser}
                setDistributorModel={setDistributorModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/* Change distributor user Model  end*/}

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

export default SAUserRelation;

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
.react-select__option {
  white-space: pre-wrap; /* Preserve new lines and spacing */
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
