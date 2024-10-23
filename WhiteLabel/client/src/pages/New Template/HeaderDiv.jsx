import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const HeaderDiv = () => {
  return (
    <>
      <Wrapper>
        <div className="container-fluid">
          <div className="row">
            <div className="mt-3">
              <NavBar />
            </div>
            <div className="head-main grid gap-0 column-gap-3">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-5">
                <div className="row">
                  <div className="d-flex justify-content-center flex-column ">
                    <div className="text-center">
                      <p style={{ color: "#684df4" }}>
                        India's Leading PAN Card Portal
                      </p>
                      <p style={{ color: "black" }}>Fully Automatic</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12"></div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default HeaderDiv;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ecebfd;

  .head-main {
    margin-top: 7rem;
  }
`;
