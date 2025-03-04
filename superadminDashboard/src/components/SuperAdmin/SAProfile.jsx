import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaMobileButton } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "./Loading";

const SAProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const {token } = useSelector((state) => state.user);
 
   const [isLoading, setLoading] = useState(false);
   const [userData,setUserData] = useState([]);
   console.log(userData);
  const [profileImage, setprofileImage] = useState(null);
   const [formData,setFormData] = useState(
   {
    userId : userData.UserId,
    username: userData.UserName,
    ContactNo : userData.ContactNo,
    email: userData.Email,
    PanCardNumber : userData.PanCardNumber,
    AadharNumber : userData.AadharNumber,
    BusinessName : userData.BusinessName,
    City : userData.City,
    State : userData.State,
    PinCode : userData.PinCode

   })
   const getUserData = async (e) => {
    
    try {
      setLoading(true);
     
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/superAdmin/getUserDetails/${user.userId}`,
        // "https://2kadam.co.in/api/auth/log-reg/user-register",
        
  {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  }
  
      );
      // console.log(response);
      setLoading(false);
      if (response.data.success) {
        setUserData(response.data.data[0])
        setFormData({
          userId : response.data.data[0].UserId,
    username: response.data.data[0].UserName,
    ContactNo : response.data.data[0].ContactNo,
    email: response.data.data[0].Email,
    PanCardNumber : response.data.data[0].PanCardNumber,
    AadharNumber : response.data.data[0].AadharNumber,
    BusinessName : response.data.data[0].BusinessName,
    City : response.data.data[0].City,
    State : response.data.data[0].State,
    PinCode : response.data.data[0].PinCode
        })
     
      } else {
        Swal.fire({
          icon: "error",
          title: response.data.message || "An error occurred during the process. Please try again.",
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
        title: error.response.data.message || "An error occurred during the process. Please try again.",
      });
    }
  };
useEffect(()=>{
 getUserData()
},[])
 const handleChange = (e)=>{
   const {name,value} = e.target;
   if (name === "ContactNo" || name === "AadharNumber" || name === "PinCode") {
    if (/^\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }
  else {
    setFormData({
      ...formData,
      [name]: name === "PanCardNumber" ? value.toUpperCase() : value,
    });
  }


 }

 const handlesubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("userId", formData.userId);
  data.append("username", formData.username);
  data.append("ContactNo", formData.ContactNo);
  data.append("email", formData.email);
  data.append("PanCardNumber", formData.PanCardNumber);
  data.append("AadharNumber", formData.AadharNumber);
  data.append("BusinessName", formData.BusinessName);
  data.append("City", formData.City);
  data.append("State", formData.State);
  data.append("PinCode", formData.PinCode);
  if (profileImage) {
    data.append("profileImage", profileImage);
  }
  try {
    setLoading(true);
   
    const response = await axios.put(
      "https://2kadam.co.in/api/auth/superAdmin/EditSuperAdminProfile",
      // "https://2kadam.co.in/api/auth/log-reg/user-register",
      data,
      
{
headers: {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${token}`,
},
}

    );
    // console.log(response);
    setLoading(false);
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: response.data.message ,
      });
   
    } else {
      Swal.fire({
        icon: "error",
        title: response.data.message || "An error occurred during the process. Please try again.",
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
      title: error.response.data.message || "An error occurred during the process. Please try again.",
    });
  }
};

  const handleFileChange = (e) => {
     const { name, files } = e.target;
     console.log(`File input changed - Name: ${name}, Files:`, files);
     const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
     const maxSize = 5 * 1024 * 1024; // 5MB in bytes
 
     const requiredWidth = 50; // Required width
     const requiredHeight = 75; // Required height
 
      if (!allowedTypes.includes(files[0].type)) {
             Swal.fire({
               icon: "error",
               title: "Invalid File Type",
               text: `Invalid file: ${files[0].name}. Only JPEG, JPG, PNG are allowed.`,
             });
             e.target.value = "";
             return;
           }
              if (files[0].size > maxSize) {
                   Swal.fire({
                     icon: "error",
                     title: "File Too Large",
                     text: `File ${files[0].name} exceeds the 5MB limit.`,
                   });
                   e.target.value = "";
                   return;
                 }
    
     if (name === "profileImage") {
         // Check image resolution
   const img = new Image();
   img.src = URL.createObjectURL(files[0]);
   img.onload = () => {
     if (img.width !== requiredWidth || img.height !== requiredHeight) {
       Swal.fire({
         icon: "error",
         title: "Invalid Image Resolution",
         text: `Image must be exactly ${requiredWidth}x${requiredHeight} pixels.`,
       });
       e.target.value = "";
       return;
     }
       
       setprofileImage(files[0]);
       console.log("Updated profileImage:", files[0]);
       Swal.fire(
         "File Selected",
         "Profile Image file selected successfully!",
         "success"
       );
     }
   };
 }
  
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid bg-body-tertiary">
            <div className="row flex-nowrap justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 bg-body-tertiary formdata">
                <div className="main shadow-none bg-body-tertiary">
                  <div className="row shadow-none bg-body-tertiary">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-start">
                        <h3>Update Profile</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 ">Update Profile</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Update Profile
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  {
                   isLoading ?  <Loading/> :
                  
                  <form onSubmit={handlesubmit}>
                  <div className="row g-4 shadow bg-body-tertiary rounded px-3 proForm">
                    <div className="text-center">
                      <h4>Profile Information</h4>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>User Id</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User ID"
                          value={user.userId}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>User Type</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUsers />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User Type"
                          value={user.role}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>User Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={formData.username}
                          name="username"
                          onChange={handleChange}
                          title="Text should contain only letters"
                    placeholder="Enter full name"
                    required
                    autocomplete="off"
                    maxLength={100}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter Contact No</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileButton />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          
                          value={formData.ContactNo}
                          name="ContactNo"
                          onChange={handleChange}
                          placeholder="Enter 10-digit mobile number"
                    pattern="[0-9]{10}"
                    title="Mobile number should be 10 digits"
                    maxLength={10}
                    minLength={10}
                    required

                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter E-mail</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <MdEmail />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter E-mail"
                          value={formData.email}
                          name="email"
                          onChange={handleChange}
                         required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter Pan Card Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Pan Card Number"
                          value={formData.PanCardNumber}
                          name="PanCardNumber"
                          onChange={handleChange}
                         style={{ textTransform: 'uppercase' }}
                         required
                         pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
  title="PAN card number should be in the format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
  maxLength={10}
  minLength={10}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Aadhar Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                         
                          value={formData.AadharNumber}
                          name="AadharNumber"
                          onChange={handleChange}
                          placeholder="Enter 12-digit aadhaar number"
                    pattern="[0-9]{12}"
                    title="Aadhaar number should be 12 digits"
                    maxLength={12}
                    minLength={12}
                    required

                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Company / Shop Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company / Shop Name"
                          value={formData.BusinessName}
                          name="BusinessName"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter City</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <BiSolidContact />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter City"
                          value={formData.City}
                          name="City"
                          onChange={handleChange}
                          required

                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>State</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaRegBuilding />
                        </span>
                         <select
                          class="form-select" aria-label="Default select example"
                          name="State"
                          value={formData.State}
                          onChange={handleChange}
                          required>
                          <option selected value="">Select...</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Enter Pin Code</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMapMarkerAlt />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Pin Code"
                          value={formData.PinCode}
                          name="PinCode"
                          onChange={handleChange}
                          pattern="[0-9]{6}"
                          title="Mobile number should be 6 digits"
                          maxLength={6}
                          minLength={6}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label>Profile Image (50 X 75)px</label>
                          <div className="input-group">
                            <input
                              class="form-control"
                              type="file"
                              id="formFile"
                              name="profileImage"
                              accept="image/*"
                              onChange={handleFileChange}
                              required
                            />
                          </div>
                        </div>

                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Photo</label>
                      <div className="input-group">
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Aadhar Front</label>
                      <div className="input-group">
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div>
                
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Aadhar Back</label>
                      <div className="input-group">
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label>Pan Card</label>
                      <div className="input-group">
                        <input class="form-control" type="file" id="formFile" />
                      </div>
                    </div> */}
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start m-3">
                        <button className="btn p-2">Update</button>
                      </div>
                    </div>
                  </div>
                  </form>
}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SAProfile;
const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }


  .proForm {
    margin: 24px;
    @media (min-width: 1024px) and (max-width: 1280px) {
      margin-left: 4.9rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      margin-left: 4.9rem;
    }
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