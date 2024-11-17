import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

const Genral = () => {
   
    const [data,setData] = useState([]);
    const qrCodeRef = useRef(null);
    const [qrCodeError, setQrCodeError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id : "",
        Home_Page_1st_Paragraph: "",
        Home_Page_2nd_Paragraph: "",
        Email_Id: "",
        Calling_No: "",
        Whatsapp_No: "",
        App_Link: "",
        Bank_Holder_Name : "",
        Bank_Account_Number : "",
        IFSC_Code : "",
        Bank_Name : "",
        UPI_ID: "",
        QR_Code: null, // For file input
        QR_Code_Preview: null, // For preview URL
        Address: "",
    });

    const fetchData = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "http://localhost:7777/api/auth/superAdmin/getSuperAdminSettings"
          );
          setData(data.data);
          setFormData({
            id : data.data.id,
            Home_Page_1st_Paragraph: data.data.Home_Page_1st_Paragraph,
        Home_Page_2nd_Paragraph: data.data.Home_Page_2nd_Paragraph,
        Email_Id: data.data.Email_Id,
        Calling_No: data.data.Calling_No,
        Whatsapp_No: data.data.Whatsapp_No,
        App_Link: data.data.App_Link,
        Bank_Holder_Name : data.data.Bank_Holder_Name,
        Bank_Account_Number : data.data.Bank_Account_Number,
        IFSC_Code : data.data.IFSC_Code,
        Bank_Name : data.data.Bank_Name,
        UPI_ID: data.data.UPI_ID,
        QR_Code: data.data.QR_Code,
        QR_Code_Preview: data.data.QR_Code, // For preview URL
        Address: data.data.Address,
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

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
         // Reset error message
        setQrCodeError("");
    
        if (file) {
            
              // Check file type
        const validImageTypes = ["image/jpeg", "image/png"];
        if (!validImageTypes.includes(file.type)) {
            setQrCodeError("Please upload a valid image (JPEG or PNG).");
            qrCodeRef.current.value = null; // Clear the input field
            return; // Stop further processing
        }

            const reader = new FileReader();
    
            reader.onload = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: file, // Use the Base64 string to preview the image
                    QR_Code_Preview: reader.result, // Store the preview URL
                }));
            };
    
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        if (key !== "QR_Code_Preview" ) { 
            // Exclude the preview URL and id from submission
            formDataSend.append(key, value);
            console.log(key,value)
        }
    });
    formDataSend.append("QR_Code_Preview", data.QR_Code);
        console.log(formDataSend)

        try {
            const response = await axios.post("http://localhost:7777/api/auth/superAdmin/UpdateGenralSetting", formDataSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
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
                                    <div className="text-center">
                                        <h4>Enter All Correct Details For Update</h4>
                                    </div>
                                    <div className=" col-sm-12">
                                        <div class="mb-2">
                                            <label for="homePara1" className="form-label">Home Page 1st Paragraph</label>
                                            <textarea placeholder="Enter Home Page 1st Paragraph" className="form-control" id="homePara1" name="Home_Page_1st_Paragraph" rows="2"
                                            value={formData.Home_Page_1st_Paragraph || ""}
                                            onChange={handleChange}></textarea>
                                        </div>
                                    </div>
                                    <div className=" col-sm-12">
                                        <div class="mb-2">
                                            <label for="homePara2" className="form-label">Home Page 2nd Paragraph</label>
                                            <textarea placeholder="Enter Home Page 2nd Paragraph"
                                            name="Home_Page_2nd_Paragraph" className="form-control" id="homePara2" rows="2"
                                             value={formData.Home_Page_2nd_Paragraph || ""}
                                             onChange={handleChange}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            Email Id
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="email"
                                                id="name"
                                                name="Email_Id"
                                                class="form-control"
                                                placeholder="Enter Email Id"
                                                value={formData.Email_Id || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            Calling No
                                        </label>
                                        <div class="input-group flex-nowrap">
                                          
                                            <input
                                               type="text"
                                                id="name"
                                                name="Calling_No"
                                                class="form-control"
                                               
                                                value={formData.Calling_No || ""}
                                                onChange={handleChange}
                                                placeholder="Enter 10-digit mobile number"
                                                pattern="[0-9]{10}"
                                                title="Mobile number should be 10 digits"
                                                maxLength={10}
                                                minLength={10}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            Whatsapp No
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                name="Whatsapp_No"
                                                class="form-control"
                                                
                                                value={formData.Whatsapp_No || ""}
                                                onChange={handleChange}
                                                placeholder="Enter 10-digit mobile number"
                                                pattern="[0-9]{10}"
                                                title="Mobile number should be 10 digits"
                                                maxLength={10}
                                                minLength={10}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            App Link
                                        </label>
                                        <div class="input-group flex-nowrap">
                                          
                                            <input
                                                type="text"
                                                id="name"
                                                name="App_Link"
                                                class="form-control"
                                                placeholder="Enter App Link"
                                                value={formData.App_Link || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="bankDetails" className="form-label">Bank Account Name</label>
                                            <input placeholder="Enter Bank Details" className="form-control" id="bankDetails"
                                            name="Bank_Holder_Name"
                                             value={formData.Bank_Holder_Name || ""}
                                             onChange={handleChange}
                                             pattern="[A-Za-z\s]*"
                    title="Text should contain only letters"
                    
                    
                    autocomplete="off"
                    maxLength={100}
                                            />
                                
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="bankDetails" className="form-label">Bank Account Number</label>
                                            <input placeholder="Enter Bank Details" className="form-control" id="bankDetails" 
                                            name="Bank_Account_Number"
                                             value={formData.Bank_Account_Number || ""}
                                             onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="bankDetails" className="form-label">IFSC Code</label>
                                            <input placeholder="Enter Bank Details" className="form-control" id="bankDetails"
                                            name="IFSC_Code"
                                             value={formData.IFSC_Code || ""}
                                             onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="bankDetails" className="form-label">Bank Name</label>
                                            <input placeholder="Enter Bank Details" className="form-control" id="bankDetails"
                                            name="Bank_Name"
                                             value={formData.Bank_Name || ""}
                                             onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            UPI ID
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter UPI ID"
                                                name="UPI_ID"
                                                value={formData.UPI_ID || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            QR Code
                                        </label>
                                        <div>
                                        <img src={formData.QR_Code_Preview} width={200} height={200} className="img-fluid" />
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                name="QR_Code"
                                                class="form-control"
                                                placeholder="Enter Name"
                                                 accept="image/png, image/jpeg"
                                                onChange={handleFileChange}
                                                ref={qrCodeRef}
                                            />
                                        </div>
                                        {qrCodeError && <div className="text-danger mt-2">{qrCodeError}</div>}
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="bankDetails" className="form-label">Enter Address</label>
                                            <textarea placeholder="Enter Address" className="form-control" id="bankDetails" 
                                            name="Address"
                                             value={formData.Address || ""}
                                             onChange={handleChange}></textarea>
                                        </div>
                                    </div>





                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="text-center mb-2">
                                            <button type="submit"  className="btn p-2">UPDATE</button>
                                        </div>
                                    </div>
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

export default Genral

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