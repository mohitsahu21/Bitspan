import React from "react";
import styled from "styled-components";
import pancard from "../../assets/Form_49A (1).pdf";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";

const OffilnePanCard = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 d-none ">
                {/* <Sider /> */}
              </div>
              <div className="row shadow-none  formdata mt-5">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                  {/* <div className="text-center">
                        <h3>Change Password</h3>
                      </div> */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Download Forms</h4>
                    <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp;/ &nbsp; Download Forms</h6>
                  </div>
                </div>
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 mt-5">
                <div className="container-fluid">
                  <div className="row formdata">
                    <div className="col-sm-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title" style={{whiteSpace:"nowrap"}}>Pan Card Form</h5>

                          <div className="mt-3">
                            <a
                              href={pancard}
                              download="Pan Card Form"
                              className="btn btn-primary"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-sm-6 mt-custom">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            Special title treatment
                          </h5>
                          <p className="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                          <a href="#" className="btn btn-primary">
                            Go somewhere
                          </a>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default OffilnePanCard;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: 1025px) and (max-width: 1500px) {
    .formdata {
      padding-left: 15rem;
    }
  }
  @media (min-width: 1500px) {
    .formdata {
      padding-left: 13rem;
    }
  }

  @media (max-width: 576px) {
    .mt-custom {
      margin-top: 2rem;
    }
  }
`;
