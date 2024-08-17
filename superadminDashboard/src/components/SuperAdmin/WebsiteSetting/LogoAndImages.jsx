import React, { useRef, useState } from "react";
import styled from "styled-components";
import logo from "../../../assets/images/logo.png"

const LogoAndImages = () => {
    const [errors, setErrors] = useState({});
    const homepageBgRef = useRef(null);
  const logoRef = useRef(null);
  const faviconRef = useRef(null);
  const signatureRef = useRef(null);
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
                                  
                                    <div className="col-sm-12 mb-5">
                                        <label for="name" class="form-label">
                                            Upload To Change Home Page Background (100 X 600)px
                                        </label>
                                        <div>
                                        <img src={logo} width={600} height={100} className="img-fluid" />
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                onChange={(e) => validateImage(e, 100, 600, "homepage-bg", homepageBgRef)}
                                                accept="image/png, image/jpeg"
                                                ref={homepageBgRef}
                                            />
                                        </div>
                                      <span className="text-danger"> { errors['homepage-bg'] && <div className="error">{errors['homepage-bg']}</div>}</span> 
                                    </div>
                                    <div className="col-sm-12 mb-5">
                                        <label for="name" class="form-label">
                                            Upload To Change Logo (300 X 96)px - PNG Only
                                        </label>
                                        <div>
                                        <img src={logo} width={300} height={96} className="img-fluid"/>
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                accept="image/png"
                                                ref={logoRef}
                                                onChange={(e) => validateImage(e, 300, 96, "logo", logoRef)}
                                            />
                                        </div>
                                        <span className="text-danger"> {errors["logo"] && <div className="error">{errors["logo"]}</div>}</span>
                                    </div>
                                    <div className="col-sm-12 mb-5">
                                        <label for="name" class="form-label">
                                            Upload To Change Fav Icon (16 X 16)px
                                        </label>
                                        <div>
                                        <img src={logo} width={100} height={100} className="img-fluid"/>
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                accept="image/png, image/jpeg"
                        ref={faviconRef}
                        onChange={(e) => validateImage(e, 16, 16, "favicon", faviconRef)}
                                            />
                                        </div>
                                        <span className="text-danger">  {errors["favicon"] && <div className="error">{errors["favicon"]}</div>}</span>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="name" class="form-label">
                                            Upload To Change Signature With Stamp (200 X 58)px - PNG Only
                                        </label>
                                        <div>
                                        <img src={logo} width={200} height={58} className="img-fluid"/>
                                        </div>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="file"
                                                id="name"
                                                class="form-control"
                                                accept="image/png"
                                                ref={signatureRef}
                                                onChange={(e) => validateImage(e, 200, 58, "signature", signatureRef)}
                                            />
                                        </div>
                                        <span className="text-danger">  {errors["signature"] && <div className="error">{errors["signature"]}</div>}</span>
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