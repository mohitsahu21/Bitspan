import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SetJoiningPrice = () => {
    const [data,setData] = useState([]);
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { token } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id : "",
        Retailer_Joining_Price : "",
        Distributor_Joining_Price : "",
        Super_Distributor_Joining_Price : "",
        White_Label_Joining_Price : "",
       
    });

    const fetchData = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
          );
          setData(data.data);
          setFormData({
            id : data.data.id,
            Retailer_Joining_Price : data.data.Retailer_Joining_Price,
            Distributor_Joining_Price : data.data.Distributor_Joining_Price,
            Super_Distributor_Joining_Price : data.data.Super_Distributor_Joining_Price,
            White_Label_Joining_Price : data.data.White_Label_Joining_Price
           

           
          })
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
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
            const response = await axios.put("https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/UpdateSAWebsiteJoiningPrice", formData,
                
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
        <Wrapper>
             <form onSubmit={handleSubmit}>
            <div className="main">
                <div className="container-fluid">
                    <div className="row flex-wrap justify-content-center mb-4">

                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="main shadow-none">

                                <div className="row g-4 shadow bg-body-tertiary rounded m-1 px-3 pb-4">
                                {loading ? (
                              <div className="d-flex justify-content-center">
                              <Spinner animation="border" role="status">
                              <span className="visually-hidden ">Loading...</span>
                            </Spinner>
                            </div>
                            ) : (
                                <>
                                    <div className="text-center">
                                        <h4>Change Joining Price</h4>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label for="name" class="form-label">
                                     Enter Retailer Joining Price
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                name="Retailer_Joining_Price"
                                                class="form-control"
                                                placeholder="Enter Retailer Joining Price"
                                                value={formData.Retailer_Joining_Price}
                                                onChange={handleChange}
                                                required
                                                pattern="^[0-9]*$"
                                                //  pattern="^\d+(\.\d+)?$" 
                                                title="Price should be digits Only"

                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label for="name" class="form-label">
                                    Enter Distributor Joining Price
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Distributor Joining Price"
                                                name="Distributor_Joining_Price"
                                                value={formData.Distributor_Joining_Price}
                                                onChange={handleChange}
                                                required
                                                pattern="^[0-9]*$"
                                                title="Price should be digits Only"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <label for="name" class="form-label">
                                        Enter Super Distributor Joining Price

                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Super Distributor Joining Price"
                                                name="Super_Distributor_Joining_Price"
                                                value={formData.Super_Distributor_Joining_Price}
                                                onChange={handleChange}
                                                required
                                                pattern="^[0-9]*$"
                                                title="Price should be digits Only"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <label for="name" class="form-label">
                                        Enter White Label Joining Price
                                        </label>
                                        <div class="input-group flex-nowrap">
                                          
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter White Label Joining Price"
                                                name="White_Label_Joining_Price"
                                                value={formData.White_Label_Joining_Price}
                                                onChange={handleChange}
                                                required
                                                pattern="^[0-9]*$"
                                                title="Price should be digits Only"
                                                // maxLength={10}
                                                // minLength={10}
                                            />
                                        </div>
                                    </div>
                                  
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="text-center mb-2">
                                            <button type="submit" className="btn p-2" disabled={loading}>{loading ? "Loading..." :  "UPDATE"}</button>
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
    )
}

export default SetJoiningPrice

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