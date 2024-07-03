import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";



const PanStatus = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-center justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>NSDL PAN Track Status</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">NSDL PAN Track Status</h4>
                        <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp;/ &nbsp; NSDL PAN Track Status</h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow bg-body-tertiary rounded  py-5 m-4">



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
                              Acknowledgement No.
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
      </Wrapper>
    </>
  );
}

export default PanStatus

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
