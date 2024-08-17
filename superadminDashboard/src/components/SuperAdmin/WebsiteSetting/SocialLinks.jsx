import React from "react";
import styled from "styled-components";

const SocialLinks = () => {
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
                                           Facebook Link
                                        </label>
                                        <div class="input-group flex-nowrap">
                                           
                                            <input
                                                type="text"
                                                id="name"
                                                class="form-control"
                                                placeholder="Enter Facebook Link"
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
                                            />
                                        </div>
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