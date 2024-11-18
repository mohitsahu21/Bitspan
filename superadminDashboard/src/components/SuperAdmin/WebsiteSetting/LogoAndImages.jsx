import React, { useRef, useState,useEffect } from "react";
import styled from "styled-components";
import logo from "../../../assets/images/logo.png"
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";

const LogoAndImages = () => {
    const [errors, setErrors] = useState({});
    const homepageBgRef = useRef(null);
  const logoRef = useRef(null);
  const faviconRef = useRef(null);
  const signatureRef = useRef(null);
    const validateImage = (event, width, height, field,preview, inputRef) => {
        const file = event.target.files[0];
         // Check if the file type is valid
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "* Please select a valid image.",
        }));
        inputRef.current.value = null; // Clear the input field
        return;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      }
        if (file) {
            const img = new Image();
            img.onload = () => {
                if (img.width !== width || img.height !== height) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [field]: `* Image dimensions should be ${width}x${height}px`
                    }));
                    inputRef.current.value = null; // Clear the input field
                    return;
                } else {
                    const reader = new FileReader();
                    const { name } = event.target;
    
                    reader.onload = () => {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            [name]: file, // Use the Base64 string to preview the image
                            [preview]: reader.result, // Store the preview URL
                        }));
                    };
            
                    reader.readAsDataURL(file);
                    
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [field]: ''
                    }));
                }
            };
            img.src = URL.createObjectURL(file);
        }

       

      

    };

    const [data,setData] = useState([]);
    // const qrCodeRef = useRef(null);
    // const [qrCodeError, setQrCodeError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id : "",
        Home_Page_Background : null,
        Home_Page_Background_Preview : null,
        Logo : null,
        Logo_Preview : null,
        Fav_Icon : null,
        Fav_Icon_Preview : null,
        Signature_With_Stamp : null,
        Signature_With_Stamp_Preview : null
    });

    const fetchData = async () => {
       
        try {
          const { data } = await axios.get(
            "http://localhost:7777/api/auth/superAdmin/getSuperAdminSettings"
          );
          setData(data.data);
          setFormData({
            id : data.data.id,
            Home_Page_Background : data.data.Home_Page_Background,
        Home_Page_Background_Preview : data.data.Home_Page_Background,
        Logo : data.data.Logo,
        Logo_Preview : data.data.Logo,
        Fav_Icon : data.data.Fav_Icon,
        Fav_Icon_Preview : data.data.Fav_Icon,
        Signature_With_Stamp : data.data.Signature_With_Stamp,
        Signature_With_Stamp_Preview : data.data.Signature_With_Stamp
            
          })
         
        } catch (error) {
          console.error("Error fetching data:", error);
          
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
        // const formDataToSend = new FormData();
        // Object.entries(formData).forEach(([key, value]) => {
        //     formDataToSend.append(key, value);
        // });
       
        const formDataSend = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //     if (key !== "QR_Code_Preview" ) { 
    //         // Exclude the preview URL and id from submission
    //         formDataSend.append(key, value);
    //         console.log(key,value)
    //     }
    // });
     Object.entries(formData).forEach(([key, value]) => {
        if (key !== "Home_Page_Background_Preview" &&  key !== "Logo_Preview" && key !== "Fav_Icon_Preview" && key !== "Signature_With_Stamp_Preview") { 
            // Exclude the preview URL and id from submission
            formDataSend.append(key, value);
            console.log(key,value)
        }
    });
    formDataSend.append("Home_Page_Background_Preview", data.Home_Page_Background);
    formDataSend.append("Logo_Preview", data.Logo);
    formDataSend.append("Fav_Icon_Preview", data.Fav_Icon);
    formDataSend.append("Signature_With_Stamp_Preview", data.Signature_With_Stamp);
        console.log(formDataSend)
        console.log(data);
        

        try {
            const response = await axios.post("http://localhost:7777/api/auth/superAdmin/UpdateLogoImageSetting", formDataSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            if(response.data.success){
                Swal.fire({
                    icon: "success",
                    title: "Details updated successfully!",
                  });
                  setErrors({});
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
                                  
                                    <div className="col-sm-12 mb-5">
                                        <label for="name" class="form-label">
                                            Upload To Change Home Page Background (100 X 600)px
                                        </label>
                                        <div>
                                        <img src={formData.Home_Page_Background_Preview} width={600} height={100} className="img-fluid" />
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                name="Home_Page_Background"
                                                onChange={(e) => validateImage(e, 600, 100, "Home_Page_Background",
                                                    "Home_Page_Background_Preview",     homepageBgRef)}
                                                accept="image/png, image/jpeg"
                                                ref={homepageBgRef}
                                            />
                                        </div>
                                      <span className="text-danger"> { errors['Home_Page_Background'] && <div className="error">{errors['Home_Page_Background']}</div>}</span> 
                                    </div>
                                    <div className="col-sm-12 mb-5">
                                        <label for="name" class="form-label">
                                            Upload To Change Logo (300 X 96)px - PNG Only
                                        </label>
                                        <div>
                                        <img src={formData.Logo_Preview} width={300} height={96} className="img-fluid"/>
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                name="Logo"
                                                accept="image/png"
                                                ref={logoRef}
                                                onChange={(e) => validateImage(e, 300, 96, "Logo","Logo_Preview", logoRef)}
                                            />
                                        </div>
                                        <span className="text-danger"> {errors["Logo"] && <div className="error">{errors["Logo"]}</div>}</span>
                                    </div>
                                    <div className="col-sm-12 mb-5">
                                        <label for="name" class="form-label">
                                            Upload To Change Fav Icon (16 X 16)px
                                        </label>
                                        <div>
                                        <img src={formData.Fav_Icon_Preview} width={100} height={100} className="img-fluid"/>
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                accept="image/png, image/jpeg"
                                                name="Fav_Icon"
                        ref={faviconRef}
                        onChange={(e) => validateImage(e, 16, 16, "Fav_Icon","Fav_Icon_Preview", faviconRef)}
                                            />
                                        </div>
                                        <span className="text-danger">  {errors["Fav_Icon"] && <div className="error">{errors["Fav_Icon"]}</div>}</span>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            Upload To Change Signature With Stamp (200 X 58)px - PNG Only
                                        </label>
                                        <div>
                                        <img src={formData.Signature_With_Stamp_Preview} width={200} height={58} className="img-fluid"/>
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                accept="image/png"
                                                name="Signature_With_Stamp"
                                                ref={signatureRef}
                                                onChange={(e) => validateImage(e, 200, 58, "Signature_With_Stamp", "Signature_With_Stamp_Preview",
                                                    signatureRef)}
                                            />
                                        </div>
                                        <span className="text-danger">  {errors["Signature_With_Stamp"] && <div className="error">{errors["Signature_With_Stamp"]}</div>}</span>
                                    </div>
                                   





                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="text-center mb-2">
                                            <button type="submit" disabled={loading} className="btn p-2">{loading ? "Loading..." :  "UPDATE"}</button>
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

export default LogoAndImages

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