import React from "react";
import styled from "styled-components";
import HeadBar from "../components/HeadBar";
import Sider from "../components/SideBar";

const Dashboard = () => {
  return (
    <>
      <Wrapper>
        <HeadBar />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 p-0">
                <Sider />
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9">
                <div className="container-fluid">Hello Dev</div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Dashboard;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
