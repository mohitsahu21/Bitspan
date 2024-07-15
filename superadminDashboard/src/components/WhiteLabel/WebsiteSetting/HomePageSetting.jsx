import React, { useRef, useState } from "react";
import styled from "styled-components";
import logo from "../../../assets/images/logo.png"

const HomePageSetting = () => {
    const [errors, setErrors] = useState({});
    const homepageBgRef = useRef(null);
  
    const validateImage = (event, width, height, field,inputRef) => {
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
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [field]: ''
                    }));
                }
            };
            img.src = URL.createObjectURL(file);
        }
        console.log(inputRef)
    };
    return (
        <Wrapper>
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
                                    <label for="name" class="form-label">
                                           Theme Design
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <select
                                                className="form-select" aria-label="Default select example"
                                            >
                                                <option selected>Default</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div className=" col-sm-12">
                                    <label for="name" class="form-label">
                                         Company Name
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Enter Company Namek"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="homePara1" className="form-label">About Us</label>
                                            <textarea placeholder="Enter About Us" className="form-control" id="homePara1" rows="2"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div class="mb-2">
                                            <label for="homePara1" className="form-label">Change Notice</label>
                                            <textarea placeholder="Enter Notice" className="form-control" id="homePara1" rows="2"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                           Change Training Video 
                                        </label>
                                        <div class="input-group flex-nowrap">
                                          
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Training Video Link"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <label for="name" class="form-label">
                                           Show Offer Banner
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <select
                                                className="form-select" aria-label="Default select example"
                                            >
                                                <option selected>Yes</option>
                                                <option value="1">No</option>
                                               
                                                </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-5">
                                        <label for="name" class="form-label">
                                        Offer Banner (450 X 150)px
                                        </label>
                                        <div>
                                        <img src={logo} width={600} height={100} className="img-fluid" />
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                onChange={(e) => validateImage(e,450, 150, "homepage-bg", homepageBgRef)}
                                                accept="image/png, image/jpeg"
                                                ref={homepageBgRef}
                                            />
                                        </div>
                                      <span className="text-danger"> { errors['homepage-bg'] && <div className="error">{errors['homepage-bg']}</div>}</span> 
                                    </div>
                                  
                                   
                                   
                                  
                                   





                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="text-center mb-2">
                                            <button className="btn p-2">UPDATE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default HomePageSetting

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