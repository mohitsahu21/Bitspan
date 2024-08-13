import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";



const AadharLinkingStatus = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-end justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-12
                             mt-5">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>Aadhaar Linking Status</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap ">
                        <h4 className="mx-lg-5 mx-xl-5 mx-xxl-2  px-lg-3 px-xxl-0" >Aadhaar Linking Status</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Aadhaar Linking Status
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-center pe-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-10 col-md-12 col-sm-12  rounded  px-3">


                      <div className="guidline px-3 py-5 p-md-5 mt-5 shadow bg-body-tertiary rounded">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto">
                          <div class="input-group">
                            <span class="input-group-text">
                              <MdFormatListNumberedRtl />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Mobile Number"
                              />
                              <label for="floatingInputGroup2">
                                Aadhaar No.
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                          <div className="text-center">
                            <button className="btn p-2">Submit</button>
                          </div>
                        </div>
                      </div>
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

export default AadharLinkingStatus

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
