import React from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { LuArrowBigRightDash } from "react-icons/lu";
import { Link } from "react-router-dom";

const ImportantLink = () => {
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 p-0">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9 mt-5">
                <div className="container-fluid m-0 rechargeNav">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center raisecomp flex-wrap">
                        <h4>Important Links</h4>
                        <h6>
                          {" "}
                          <BiHomeAlt /> &nbsp; / &nbsp; Important Links
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row raisecomp">
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link to="/crop-tool" className="link">
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#706fff", color: "#fff" }}
                        >
                          Photo & Sign Croping Tool{" "}
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link
                        to="https://www.ilovepdf.com/jpg_to_pdf"
                        target="_blank"
                      >
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#4aa821", color: "#fff" }}
                        >
                          Convert JPG to PDF
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link
                        to="https://www.trackpan.utiitsl.com/PANONLINE/forms/TrackPan/trackApp#forward"
                        target="_blank"
                      >
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#ff4763", color: "#fff" }}
                        >
                          PAN Track
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link
                        to="https://www.psaonline.utiitsl.com/psaonline/showLogin"
                        target="_blank"
                      >
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#2d323f", color: "#fff" }}
                        >
                          PSA Login
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link
                        to="https://www.trackpan.utiitsl.com/PANONLINE/forms/TrackPan/trackApp#forward"
                        target="_blank"
                      >
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#ff4763", color: "#fff" }}
                        >
                          PSA Application Status
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link
                        to="https://www.utiitsl.com/aocodedetails"
                        target="_blank"
                      >
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#706fff", color: "#fff" }}
                        >
                          PSA Aocode
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link to="https://download.mantratecapp.com/StaticDownload/MantraRDService_1.0.6.exe">
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#2d323f", color: "#fff" }}
                        >
                          Download MFS100 RD Services (1.0.6)
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link to="https://download.mantratecapp.com/StaticDownload/MFS100ClientService_9.0.3.8.exe">
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#4aa821", color: "#fff" }}
                        >
                          Download MFS100 Client Services (9.0.3.8)
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link to="https://download.mantratecapp.com/StaticDownload/MFS100Driver_9.2.0.0.exe">
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#2d323f", color: "#fff" }}
                        >
                          Download MFS100 Client Services (9.2.0.0)
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link to="https://www.trackpan.utiitsl.com/PANONLINE/#forward">
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#4aa821", color: "#fff" }}
                        >
                          UTI 2.4 PAN Track
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link
                        to="https://tin.tin.nsdl.com/pantan/StatusTrack.html"
                        target="_blank"
                      >
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#ff4763", color: "#fff" }}
                        >
                          NSDL PAN Track Status
                        </div>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                      <Link
                        to="https://image-converter.index.wf/"
                        target="_blank"
                      >
                        <div
                          className="p-3 border rounded"
                          style={{ background: "#706fff", color: "#fff" }}
                        >
                          Image Converter
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="row raisecomp">
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                      <div
                        className="p-3 border rounded"
                        style={{ background: "#4aa821", color: "#fff" }}
                      >
                        <div className="text-start fs-5 fw-bold">
                          Name of Zone / West (Munbai) Zone Jurisdiction (State
                          under the zone) /
                        </div>
                        <div>
                          <ul>
                            <li>
                              <a href="#">
                                <LuArrowBigRightDash /> Gujarat
                              </a>
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Maharashtra
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Madhya Pradesh
                            </li>
                            <li>
                              <LuArrowBigRightDash /> GOA
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Chattisgarh
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Daman AND DIU
                            </li>
                            <li>
                              <LuArrowBigRightDash /> DADR & NAGAR H
                            </li>
                          </ul>
                        </div>
                        <div className="text-start fs-5">
                          Address of Zone office
                        </div>
                        <div>
                          <div className="contxt mt-2">
                            <p>
                              UTI Infrastructure Technology Services Limited
                            </p>
                          </div>
                          <div className="contxt">
                            <p>
                              UTI ITSL Tower Plot No. 3, Sector 11, CBD Belapur
                            </p>
                          </div>
                          <div className="contxt">
                            <p>Navi Mumbai - 400614</p>
                          </div>
                          <div className="contxt">
                            <p>E-mail : utiitsl.gsd@utiitsl.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                      <div
                        className="p-3 border rounded"
                        style={{ background: "#706fff", color: "#fff" }}
                      >
                        <div className="text-start fs-5 fw-bold">
                          North (New Delhi) Zone Jurisdiction (State under the
                          zone)
                        </div>
                        <div>
                          <ul>
                            <li>
                              <a href="#">
                                <LuArrowBigRightDash /> Jammu & Kashmir
                              </a>
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Himachal Pradesh
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Madhya Pradesh
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Punjab
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Haryana
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Uttaranchal
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Uttar Pradesh
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Delhi
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Rajasthan
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Chandigarh UT
                            </li>
                          </ul>
                        </div>
                        <div className="text-start fs-5">
                          Address of Zone office
                        </div>
                        <div>
                          <div className="contxt mt-2">
                            <p style={{ marginBottom: "0.5rem" }}>
                              UTI Infrastructure Technology Services Limited
                            </p>
                          </div>
                          <div className="contxt">
                            <p style={{ marginBottom: "0.5rem" }}>
                              1/2 Sunlight Building, Asaf Ali Road
                            </p>
                          </div>
                          <div className="contxt">
                            <p style={{ marginBottom: "0.5rem" }}>
                              New Delhi - 110002
                            </p>
                          </div>
                          <div className="contxt">
                            <p style={{ marginBottom: "0.5rem" }}>
                              E-mail : pan.delhi@utiitsl.com
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                      <div
                        className="p-3 border rounded"
                        style={{ background: "#2d323f", color: "#fff" }}
                      >
                        <div className="text-start fs-5 fw-bold">
                          East (Kolkata) Zone Jurisdiction (State under the
                          zone)
                        </div>
                        <div>
                          <ul>
                            <li>
                              <a href="#">
                                <LuArrowBigRightDash /> West Bengal
                              </a>
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Orissa
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Bihar
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Jharkhand
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Assam
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Mizoram
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Tripura
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Meghalaya
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Sikkim
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Arunachal Pradesh
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Manipur
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Nagaland
                            </li>
                          </ul>
                        </div>
                        <div className="text-start fs-5">
                          Address of Zone office
                        </div>
                        <div>
                          <div className="contxt mt-2">
                            <p>
                              UTI Infrastructure Technology Services Limited
                            </p>
                          </div>
                          <div className="contxt">
                            <p>
                              29, N.S.Road Ground floor, Opp. Gilander House &
                              Standard Chartered Bank,
                            </p>
                          </div>
                          <div className="contxt">
                            <p>KOLKATA - 700 001</p>
                          </div>
                          <div className="contxt">
                            <p>E-mail : pan.kolkata@utiitsl.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                      <div
                        className="p-3 border rounded"
                        style={{ background: "#ff4763", color: "#fff" }}
                      >
                        <div className="text-start fs-5 fw-bold">
                          South (Chennai) Zone Jurisdiction (State under the
                          zone)
                        </div>
                        <div>
                          <ul>
                            <li>
                              <a href="#">
                                <LuArrowBigRightDash /> Tamilnadu
                              </a>
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Kerla
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Karnataka{" "}
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Andhra Pradesh
                            </li>
                            <li>
                              <LuArrowBigRightDash /> Telangana
                            </li>
                            <li>
                              <LuArrowBigRightDash /> ANDMAN NICOBAR
                            </li>
                            <li>
                              <LuArrowBigRightDash /> LAKHSWADEEP
                            </li>
                            <li>
                              <LuArrowBigRightDash /> PONDICHERRY
                            </li>
                          </ul>
                        </div>
                        <div className="text-start fs-5">
                          Address of Zone office
                        </div>
                        <div>
                          <div className="contxt mt-2">
                            <p>
                              UTI Infrastructure Technology Services Limited
                            </p>
                          </div>
                          <div className="contxt">
                            <p>
                              D-1, First Floor, Thiru-Vi-Ka Industrial Estate,
                              Guindy,
                            </p>
                          </div>
                          <div className="contxt">
                            <p>Chennai - 600032</p>
                          </div>
                          <div className="contxt">
                            <p>E-mail : pan.chennai@utiitsl.com</p>
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
};

export default ImportantLink;
const Wrapper = styled.div`
  overflow: hidden;
  .raisecomp {
    width: 100%;
    margin-bottom: 1rem;
    @media (min-width: 450px) and (max-width: 575px) {
      width: 80%;
      margin-left: 5rem;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      width: 100%;
      margin-left: -4rem;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      margin-left: -6rem;
    }
    @media (min-width: 1025px) and (max-width: 1280px) {
      width: 85%;
      margin-left: 4.9rem;
    }
    @media (min-width: 1280px) and (max-width: 1500px) {
      width: 85%;
      margin-left: 4.9rem;
    }
  }
  ul {
    padding-left: 0.5rem;
  }
  ul li {
    list-style: none;
  }
  ul li a {
    color: #fff;
    text-decoration: none;
  }
  .contxt {
    font-size: 14px;
  }
  a {
    text-decoration: none;
  }
`;
