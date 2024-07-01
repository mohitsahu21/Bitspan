import React from "react";
import styled from "styled-components";
import CropingTool from "./CropingTool";

const Tool = () => {
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main bg-body-tertiary">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 p-0">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9 mt-5 ">
                <CropingTool />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Tool;
const Wrapper = styled.div`
  .main {
    height: 90vh;
  }
  .raisecomp {
    width: 100%;
    margin-bottom: 1rem;
    @media (min-width: 450px) and (max-width: 575px) {
      width: 80%;
      margin-left: 5rem;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    @media (min-width: 1025px) and (max-width: 1280px) {
      width: 85%;
      margin-left: 4.9rem;
    }
  }

  .proForm {
    margin: 24px;
    @media (min-width: 1024px) and (max-width: 1280px) {
      margin-left: 4.9rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-left: -5rem;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-left: -5rem;
    }
  }
`;
