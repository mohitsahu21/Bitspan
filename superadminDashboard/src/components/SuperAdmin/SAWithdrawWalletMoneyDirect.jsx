import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdCurrencyRupee, MdEmail, MdOutlineFormatListNumbered } from "react-icons/md";
import { FaAddressCard, FaMobileAlt, FaRupeeSign, FaUser } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { PiAddressBook } from "react-icons/pi";
import { LuTextSelect, LuUserCheck } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import { Spinner } from "react-bootstrap";
import { FaIndianRupeeSign } from "react-icons/fa6";




const SAWithdrawWalletMoneyDirect = () => {



  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
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

  const fetchActiveUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getAllUsers"
      );
        // Transform users into the required format for react-select
        const userOptions = data.data.map((user) => ({
            value: user.UserId, // Use the user ID or unique identifier
            // label: "User Id" +  "--" + user.UserId  + "--User Name --"+ user.UserName + "--User Role --" + user.role + "--User Mobile --" + user.ContactNo,
            label: `User Id: ${user.UserId}\nUser Name: ${user.UserName}\nUser Role: ${user.role}\nUser Mobile: ${user.ContactNo}`, // Format the label
            user:user
          }));
      setUsers(data.data);
      setOptions(userOptions); // Set options for Select
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
  }, []);


//   const options = [
//     { value: "package_WhiteLabel", label: "White Label" },
//   { value: "package_SuperDistributor", label: "Super Distributor" },
//   { value: "package_Distributor", label: "Distributor" },
//   { value: "package_Retailer", label: "Retailer" },
//   ];
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption.user);
    setFormData({
      ...formData,
      userId: selectedOption?.value || "", // Update `package_for` with the selected value
    });
  };

  const [formData, setFormData] = useState({

    userId: "", // This will store the selected options
    amount : "",
    Transaction_details : "",
    status : "Success"
  
  });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
     
      const response = await axios.put(
        "http://localhost:7777/api/auth/superAdmin/WithdrawWalletAddMoneyDirect",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/AddWalletAddMoneyDirect",
        formData
      );
      // console.log(response);
      setLoading(false);
      if (response.data.success) {
        setFormData({
        
          userId: "", // This will store the selected options
          amount : "",
          Transaction_details : "",
          status : "Success"

        })
        setSelectedOption(null)
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
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: error.response.data.message || "An error occurred during the process. Please try again.",
      });
    }
  };
  console.log(formData)
  console.log(selectedOption);
  

  
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-start">
                        <h3>Raise Complaint</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Withdraw Wallet Money Direct</h4>
                        <p className="mx-lg-5"> <BiHomeAlt /> &nbsp;/ &nbsp; <span className="text-body-secondary" style={{ fontSize: "13px" }}>Withdraw Wallet Money Direct</span> </p>
                      </div>
                    </div>
                  </div>
                   <form onSubmit={handlesubmit}>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3 pb-3">
                  {loading ? (
                              <div className="d-flex justify-content-center">
                              <Spinner animation="border" role="status">
                              <span className="visually-hidden ">Loading...</span>
                            </Spinner>
                            </div>
                            ) : (
                              <>
                    <div className="text-center">
                      <h5>Enter All Correct Details For Withdraw wallet Money Direct</h5>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">Select User</label>
                     
                       
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
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">User ID</label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"> <FaUser /></span>
                        <input type="text"  class="form-control"  
                          value={selectedOption?.UserId}
                         
                          disabled
                
                    required/>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">User Name</label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"> <FaUser /></span>
                        <input type="text"  class="form-control" 
                          value={selectedOption?.UserName}
                         
                          disabled/>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">User Role</label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"> <FaUser /></span>
                        <input type="text"  class="form-control"  
                          value={selectedOption?.role}
                         
                          disabled/>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">User Mobile</label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"> <FaMobileAlt /></span>
                        <input type="text"  class="form-control"  
                           value={selectedOption?.ContactNo}
                          
                          disabled/>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">Enter Amount</label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">  <FaIndianRupeeSign /></span>
                        <input type="text"  class="form-control"   name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="Enter Amount"
                          pattern="^\d+(\.\d+)?$" 
                          title="Price should be digits Only"
                    required/>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">Enter Transaction Details</label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"> <MdEmail /></span>
                        <input type="text" id="name" class="form-control" placeholder="Enter Transaction Details" 
                         name="Transaction_details"
                         value={formData.Transaction_details}
                         onChange={handleChange}
                         required/>
                      </div>
                    </div>
                   
                  
                  
                
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start mb-3">
                        <button type="submit" className="btn p-2" disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
                      </div>
                    </div>


                 </>
                  )}
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SAWithdrawWalletMoneyDirect;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
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
  @media (max-width: 576px) {
    .responsive-label {
      font-size: 0.5rem; /* Adjust as needed */
    }
  }
  @media (max-width: 768px) {
    .responsive-label {
      font-size: 1rem; /* Adjust as needed */
    }
  }
  .react-select__option {
  white-space: pre-wrap; /* Preserve new lines and spacing */
}
`;
