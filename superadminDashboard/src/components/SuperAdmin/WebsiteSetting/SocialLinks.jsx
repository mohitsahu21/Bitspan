import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SocialLinks = () => {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { token } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        id : "",
        Facebook_Link : "",
        Twitter_Link : "",
        LinkedIn_Link : "",
        Instagram_Link : "",
        Youtube_Link : ""
    });

    const fetchData = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://2kadam.co.in/api/auth/superAdmin/getSuperAdminSettings"
          );
          setData(data.data);
          setFormData({
            id : data.data.id,
            Facebook_Link : data.data.Facebook_Link,
            Twitter_Link : data.data.Twitter_Link,
            LinkedIn_Link : data.data.LinkedIn_Link,
            Instagram_Link : data.data.Instagram_Link,
            Youtube_Link : data.data.Youtube_Link

           
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
            const response = await axios.put("https://2kadam.co.in/api/auth/superAdmin/UpdateSocialLinkSetting", formData,
                
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
                                        <h4>Enter All Correct Details For Update</h4>
                                    </div>
                                    <div className=" col-sm-12">
                                    <label for="name" class="form-label">
                                           Facebook Link
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                name="Facebook_Link"
                                                class="form-control"
                                                placeholder="Enter Facebook Link"
                                                value={formData.Facebook_Link}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className=" col-sm-12">
                                    <label for="name" class="form-label">
                                          Twitter Link
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Twitter Link"
                                                name="Twitter_Link"
                                                value={formData.Twitter_Link}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            LinkedIn Link
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter LinkedIn Link"
                                                name="LinkedIn_Link"
                                                value={formData.LinkedIn_Link}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                           Instagram Link
                                        </label>
                                        <div class="input-group flex-nowrap">
                                          
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Instagram Link"
                                                name="Instagram_Link"
                                                value={formData.Instagram_Link}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                           Youtube Link
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter  Youtube Link"
                                                name="Youtube_Link"
                                                value={formData.Youtube_Link}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                  
                                   
                                   
                                  
                                   





                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="text-center mb-2">
                                            <button type="submit" className="btn btn-primary p-2" disabled={loading}>{loading ? "Loading..." :  "UPDATE"}</button>
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

export default SocialLinks

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