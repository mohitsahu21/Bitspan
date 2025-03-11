import React from "react";
import styled from "styled-components";
import pancard from "../../assets/Form_49A (1).pdf";
import Domicile_Declaration_From from "../../assets/Domicile_Declaration_From.pdf";
import MOOLNIVASI from "../../assets/MOOLNIVASI.pdf";
import Aay_New_Form from "../../assets/Aay_New_Form.pdf";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";

const OffilnePanCard = () => {
  const cardsData = [
    { title: "Pan Card Form", link: pancard, download: true },
    {
      title: "Birth Certificate",
      link: "http://birth.ezeeportal.in/",
      download: false,
    },
    {
      title: "Death Certificate",
      link: "http://death.ezeeportal.in/",
      download: false,
    },
    { title: "E-Stamp", link: "http://estam.ezeeportal.in/", download: false },
    {
      title: "ITR Registration",
      link: "http://itr.ezeeportal.in/",
      download: false,
    },
    {
      title: "GST Registration",
      link: "http://gst.ezeeportal.in/",
      download: false,
    },
    {
      title: "Udyog Aadhar",
      link: "http://udyog.ezeeportal.in/",
      download: false,
    },
    { title: "E-district", link: Domicile_Declaration_From, download: true },
    { title: "Domicile", link: MOOLNIVASI, download: true },
    { title: "Income", link: Aay_New_Form, download: true },
  ];
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
                    <h6 className="mx-lg-5">
                      <BiHomeAlt /> &nbsp;/ &nbsp; Download Forms
                    </h6>
                  </div>
                </div>
              </div>
              {/* <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 mt-5">
                <div className="container-fluid">
                  <div className="row formdata">
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Permanent Account Number Form"
                          >
                            Pan Card Form
                          </h5>

                          <div className="mt-3">
                            <a
                              href={pancard}
                              download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Birth Certificate"
                          >
                            Birth Certificate
                          </h5>

                          <div className="mt-3">
                            <a
                              href="http://birth.ezeeportal.in/"
                              target="_blank"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Death Certificate"
                          >
                            Death Certificate
                          </h5>

                          <div className="mt-3">
                            <a
                              href="http://death.ezeeportal.in/"
                              target="_blank"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Electronic stamping"
                          >
                            E-Stamp
                          </h5>

                          <div className="mt-3">
                            <a
                              href="http://estam.ezeeportal.in/"
                              target="_blank"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Income Tax Return Registration"
                          >
                            ITR Registration
                          </h5>

                          <div className="mt-3">
                            <a
                              href="http://itr.ezeeportal.in/"
                              target="_blank"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Goods and Services Tax Registration"
                          >
                            GST Registration
                          </h5>

                          <div className="mt-3">
                            <a
                              href="http://gst.ezeeportal.in/"
                              target="_blank"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Udyog Aadhar Registration"
                          >
                            Udyog Aadhar
                          </h5>

                          <div className="mt-3">
                            <a
                              href="http://udyog.ezeeportal.in/"
                              target="_blank"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Purchase New Bank ID"
                          >
                            New Bank ID
                          </h5>

                          <div className="mt-3">
                            <a
                              href="#"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div> */}
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 mt-5">
                <div className="container-fluid">
                  <div className="row formdata">
                    {cardsData.map((card, index) => (
                      <div className="col-sm-4 mt-2" key={index}>
                        <div className="card cds">
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{ whiteSpace: "nowrap" }}
                              title={card.title}
                            >
                              {card.title}
                            </h5>
                            <div className="mt-3">
                              <a
                                href={card.link}
                                download={
                                  card.download ? card.title : undefined
                                }
                                target={card.download ? "_self" : "_blank"}
                                className="btn btn-secondary text-light"
                              >
                                Download
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
  .card-title {
    cursor: pointer;
  }
  .cds {
    background-image: linear-gradient(160deg, #afa9a7 0%, #d8d5c2 100%);
  }
`;
{
  /* <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Permanent Account Number Find"
                          >
                            Pan Find
                          </h5>

                          <div className="mt-3">
                            <a
                              href="#"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div> */
}
{
  /* <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Pan Card - Correction, Apply, Ministry"
                          >
                            Pan Card Services
                          </h5>

                          <div className="mt-3">
                            <a
                              href="#"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div> */
}
{
  /* <div className="col-sm-6 mt-custom">
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
                    </div> */
}
{
  /* <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Income"
                          >
                            Income
                          </h5>

                          <div className="mt-3">
                            <a
                              href="#"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mt-2">
                      <div className="card cds">
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ whiteSpace: "nowrap" }}
                            title="Domicile"
                          >
                            Domicile
                          </h5>

                          <div className="mt-3">
                            <a
                              href="#"
                              // download="Pan Card Form"
                              className="btn btn-secondary text-light"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div> */
}
