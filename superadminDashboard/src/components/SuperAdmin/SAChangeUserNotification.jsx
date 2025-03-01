import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SAChangeUserNotification = () => {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        id : "",
        White_Label_Notification : "",
        Super_Distributor_Notification : "",
        Distributor_Notification : "",
        Retailer_Notification : ""
    });

    const fetchData = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserNotification",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
    
          );
          setData(data.data);
          setFormData({
            id : data.data.id,
            White_Label_Notification : data.data.White_Label_Notification,
        Super_Distributor_Notification : data.data.Super_Distributor_Notification,
        Distributor_Notification : data.data.Distributor_Notification,
        Retailer_Notification : data.data.Retailer_Notification

           
          })
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
      console.log(data)

      useEffect(()=>{
         fetchData()
      },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleFileChange = (e) => {
    //     const { name } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: e.target.files[0], // Handle file input
    //     });
    // };

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put("https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/UpdateUserNotification", formData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
      
            );
            setLoading(false);
            if(response.data.success){
                Swal.fire({
                    icon: "success",
                    title: "Details updated successfully!",
                  });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Failed to update details. Please try again.",
                  });
            }
            console.log(response.data);
        } catch (error) {
            setLoading(false);
            console.error("Error updating details:", error);
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
                title: "Failed to update details. Please try again.",
              });
        }
    };
    console.log(formData);
    
    return (
        <>
            <Wrapper>
                <form onSubmit={handleSubmit}>
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
                                                <h4 className="px-lg-3">Choice User Notification</h4>
                                                <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Choice User Notification
                          </span>{" "}
                        </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                                    {loading ? (
                              <div className="d-flex justify-content-center">
                              <Spinner animation="border" role="status">
                              <span className="visually-hidden ">Loading...</span>
                            </Spinner>
                            </div>
                            ) : (
                                <>
                                        <div className="text-center my-5">
                                            <h2>Choice User Notification</h2>
                                        </div>

                                        <div className="col-xl-12  col-sm-12">
                                            <label for="whiteLabeltext" className="form-label fs-4">
                                                Enter User Notification for White Label
                                            </label>
                                            <div class="input-group flex-nowrap">
                                               
                                            
  <textarea class="form-control" placeholder="Enter User Notification for White Label" id="whiteLabeltext" style={{height:"150px"}} 
  name="White_Label_Notification"
  value={formData.White_Label_Notification}
  onChange={handleChange} ></textarea>
  {/* <label for="whiteLabeltext">Enter User Notification for White Label</label> */}
</div>
                                            </div>
                                        <div className="col-xl-12  col-sm-12 mt-5">
                                            <label for="SuperDistributortext" className="form-label fs-4">
                                                Enter User Notification for Super Distributor
                                            </label>
                                            <div class="input-group flex-nowrap">
                                               
                                            
  <textarea class="form-control" placeholder="Enter User Notification for Super Distributor" id="SuperDistributortext" style={{height:"150px"}}
    name="Super_Distributor_Notification"
    value={formData.Super_Distributor_Notification}
    onChange={handleChange}></textarea>
</div>
                                            </div>
                                        <div className="col-xl-12  col-sm-12 mt-5">
                                            <label for="Distributortext" className="form-label fs-4">
                                                Enter User Notification for Distributor
                                            </label>
                                            <div class="input-group flex-nowrap">
                                               
                                            
  <textarea class="form-control" placeholder="Enter User Notification for Distributor" id="Distributortext" style={{height:"150px"}}   name="Distributor_Notification"
  value={formData.Distributor_Notification}
  onChange={handleChange}></textarea>
</div>
                                            </div>
                                        <div className="col-xl-12  col-sm-12 mt-5">
                                            <label for="Retailertext" className="form-label fs-4">
                                                Enter User Notification for Retailer
                                            </label>
                                            <div class="input-group flex-nowrap">
                                               
                                            
  <textarea class="form-control" placeholder="Enter User Notification for Retailer" id="Retailertext" style={{height:"150px"}}   name="Retailer_Notification"
  value={formData.Retailer_Notification}
  onChange={handleChange}></textarea>
</div>
                                            </div>
                                       
                                    
                                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                            Enter White Label Joining Price
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <FaRupeeSign />
                                                </span>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}
                                                    
                                                />
                                            </div>
                                        </div> */}

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center mb-5 mt-3">
                                                <button type="submit" disabled={loading} className="btn btn-primary p-2"> {loading ? "Loading..." : "Submit"}</button>
                                            </div>
                                        </div>
                                        </>
                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </Wrapper>
        </>
    );
};

export default SAChangeUserNotification;

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
`;
