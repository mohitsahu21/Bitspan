import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";



const TrainingVideo = () => {
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid ">
                        <div className="row flex-wrap justify-content-lg-end justify-content-center">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-11 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-12
                             mt-5">
                                <div className="main shadow-none ">
                                    <div className="row shadow-none ">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ms-xxl-5">
                                            {/* <div className="text-center">
                                                <h3>Training Video</h3>
                                            </div> */}
                                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Training Video</h4>
                                                <h6 className="mx-lg-5 px-sm-5 px-2"><BiHomeAlt /> &nbsp;/ &nbsp; Training Video</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3 justify-content-center pe-4">
                                        <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-12 col-sm-12  rounded  px-3">
                                      
                                        
                                        <iframe width="100%" height="500px" src="https://www.youtube.com/embed/noqlNjPLMgc?si=jeUOUvYFDlVjKvTN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
}

export default TrainingVideo

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
  .guidline{
  
  }
  .list{
    list-style: none;
    padding-left: 0;
    font-size: 14px;
  }
`;
