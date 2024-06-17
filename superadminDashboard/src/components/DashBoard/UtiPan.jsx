import React from "react";
import styled from "styled-components";

const UtiPan = () => {
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 p-0">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9 mt-5">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center raisecomp flex-wrap">
                        <h4>UTI PAN Card</h4>
                        <h6>/ &nbsp; UTI PAN Card </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row shadow p-3 mb-5 bg-body rounded raisecomp">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start m-3">
                        <button className="btn p-2">Login to UTI Portal</button>
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
  .raisecomp {
    width: 100%;
    margin-bottom: 1rem;
    @media (min-width: 576px) and (max-width: 767px) {
      width: 80%;
      margin-left: 5rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 90%;
      margin-left: 3.5rem;
    }
    @media (min-width: 1025px) and (max-width: 1280px) {
      width: 85%;
      margin-left: 2.9rem;
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
