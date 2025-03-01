import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DownloadCertificate = () => {
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata">
                <div className=" shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Download Certificate</h4>
                        <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp;/ &nbsp; Download Certificate </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow  rounded  p-5 m-4 bg-body-tertiary">
                      <div className="text-start">
                      <Link to={"/download-certificate-print"} target="_blank">  <button className="btn btn-primary px-4 py-2">Download</button></Link>
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
};

export default DownloadCertificate;
const Wrapper = styled.div`
 
.main{
    height: 91vh;
}
  button {
    color: #fff;
    background: #6d70ff;
    /* &:hover {
      color: #fff;
      background: #000000;
    } */
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
