import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Genral from "./WebsiteSetting/Genral";
import LogoAndImages from "./WebsiteSetting/LogoAndImages";
import SocialLinks from "./WebsiteSetting/SocialLinks";
import HomePageSetting from "./WebsiteSetting/HomePageSetting";
import MapSetting from "./WebsiteSetting/MapSetting";


const WebsiteSetting = () => {
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid ">
                        <div className="row flex-wrap justify-content-lg-end justify-content-center">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata">
                                <div className="main shadow-none ">
                                    <div className="row shadow-none ">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            {/* <div className="text-center">
                                                <h3>Training Video</h3>
                                            </div> */}
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Website Setting</h4>
                                                <p className="mx-lg-5">
                                                    {" "}
                                                    <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                                                    <span
                                                        className="text-body-secondary"
                                                        style={{ fontSize: "13px" }}
                                                    >
                                                        {" "}
                                                        Website Setting
                                                    </span>{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3 justify-content-center pe-4">
                                        <div className="col-xxl-10 col-xl-11 col-lg-10 col-md-12 col-sm-12  rounded  px-3">
                                            <div>
                                                <Tabs
                                                    defaultActiveKey="Genral"
                                                    id="uncontrolled-tab-example"
                                                    className="mb-3"
                                                    variant="tabs"
                                                >
                                                    <Tab eventKey="Genral" title="Genral">
                                                        <Genral />
                                                    </Tab>
                                                    <Tab eventKey="profile" title="Logo and Images">
                                                        <LogoAndImages/>
                                                    </Tab>
                                                    <Tab eventKey="Social Links" title="Social Links">
                                                        <SocialLinks/>  
                                                    </Tab>
                                                    <Tab eventKey="Home Page Setting" title="Home Page Setting">
                                                        <HomePageSetting/>
                                                    </Tab>
                                                    <Tab eventKey="Map Setting" title="Map Setting">
                                                       <MapSetting/>
                                                    </Tab>
                                                </Tabs>

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

export default WebsiteSetting

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
