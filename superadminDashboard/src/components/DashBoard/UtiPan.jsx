import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UtiPan = () => {
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 col-sm-2  d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata ">
                <div className="main">
                  <div className="row">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mx-lg-5 px-lg-5">
                        <h4>UTI PAN Card</h4>
                        <h6>/ &nbsp; UTI PAN Card </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11  shadow  rounded m-4 px-3 py-5 bg-body-tertiary">
                      <div className="text-start m-3">
                       <Link target="_blank" to="https://www.psaonline.utiitsl.com/psaonline/showLogin"> <button className="btn p-2">Login to UTI Portal</button> </Link>
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

export default UtiPan;
const Wrapper = styled.div`

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
 

  button {
    color: #fff;
    background: #6d70ff;
    &:hover {
      color: #fff;
      background: #000000;
    }
  }
`;

{
  /* <form action="">
<div className="row">
  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
    <label htmlFor="userId">User Id</label>
    <div className="input-group">
      <span className="input-group-text">
        <FaUser />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="User ID"
        id="userId"
      />
    </div>
  </div>
  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3">
    <label htmlFor="userType">User Type</label>
    <div className="input-group">
      <span className="input-group-text">
        <FaUsers />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="User Type"
        id="userType"
      />
    </div>
  </div>
</div>
</form> */
}
