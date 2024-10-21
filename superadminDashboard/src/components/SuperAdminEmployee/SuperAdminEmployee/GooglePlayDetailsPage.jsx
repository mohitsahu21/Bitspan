import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditPanCardDetails from "./EditPanCardDetails";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import EditOtherOffService from "../../editmodals/EditOtherOffService";

const GooglePlayDetailsPage = () => {
  const params = useParams();
  const [panDetails, setPanDetails] = React.useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedPanCard, setSelectedPanCard] = useState("");
  console.log(params);

  const getPanDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7171/api/auth/superAdminEmployee/getAllOfflineServicesById/${params.id}`
      );
      setPanDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPanDetails();
  }, []);

  console.log(panDetails);

  const handleEditAppointment = (pan) => {
    setSelectedPanCard(pan);
    setShowEditPopup(true);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 d-none "></div>
              <div className="row shadow-none  formdata mt-4">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                      <IoArrowBackCircleSharp onClick={goBack} />
                      Offline Services Details
                    </h4>
                    <p className="mx-lg-5">
                      {" "}
                      <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                      <span
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Offline Services Details
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10 mt-4">
                <div className="container-fluid">
                  <div className="row d-flex formdata justify-content-center mb-3">
                    <div className="col-12 boarder bg-white p-2">
                      <div className="news d-flex align-items-center"></div>
                    </div>
                    <div className="mt-4">
                      <div
                        className="widget-area-2 proclinic-box-shadow"
                        id="tableres"
                      >
                        <div className="d-lg-flex justify-content-between align-items-center"></div>
                        <div className="row g-3">
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Applicant Name</h5>
                              <p>{panDetails[0]?.applicant_name}</p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Father Name</h5>
                              <p>{panDetails[0]?.applicant_father}</p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Mother Name</h5>
                              <p>{panDetails[0]?.applicant_mother}</p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Mobile Number</h5>
                              <p>{panDetails[0]?.applicant_number}</p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Aadhar Number</h5>
                              <p>{panDetails[0]?.aadhar_card}</p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Pan Number</h5>
                              <p>{panDetails[0]?.pan_card}</p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Service Details</h5>
                              <p>
                                {panDetails[0]?.applicant_select_service ===
                                null
                                  ? panDetails[0]?.other
                                  : panDetails[0]?.applicant_select_service}
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Business Name</h5>
                              <p>{panDetails[0]?.business_name}</p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Attached Form</h5>
                              <p>
                                <a
                                  href={panDetails[0]?.attached_form}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Attached Photo</h5>
                              <p>
                                {" "}
                                <a
                                  href={panDetails[0]?.attached_photo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Attached Sign</h5>
                              <p>
                                {" "}
                                <a
                                  href={panDetails[0]?.attached_sign}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Attached KYC</h5>
                              <p>
                                {" "}
                                <a
                                  href={panDetails[0]?.attached_kyc}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Bank Passbook</h5>
                              <p>
                                {" "}
                                <a
                                  href={panDetails[0]?.bank_passbook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Shop Photo</h5>
                              <p>
                                <a
                                  href={panDetails[0]?.shop_photo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Electric Bill</h5>
                              <p>
                                {" "}
                                <a
                                  href={panDetails[0]?.electric_bill}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Document
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Status</h5>
                              <p>{panDetails[0]?.status}</p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div className="shadow p-4 rounded">
                              <h5>Note</h5>
                              <p>{panDetails[0]?.note}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <button
                            className="btn btn-warning"
                            onClick={() =>
                              handleEditAppointment(panDetails[0]?.id)
                            }
                          >
                            Update Details
                          </button>
                        </div>
                      </div>
                      {showEditPopup && (
                        <EditOtherOffService
                          onClose={() => setShowEditPopup(false)}
                          pancardInfo={selectedPanCard}
                          getPanDetails={getPanDetails}
                        />
                      )}
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

export default GooglePlayDetailsPage;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .card {
    width: 100%;
    padding: 10px;
    margin: 0 15px;
    border-radius: 10px;
    cursor: pointer;
    white-space: nowrap;

    transition: transform 0.3s ease-in-out, border 0.3s ease,
      border-radius 0.3s ease;
  }
  .card:hover {
    background-image: linear-gradient(
      85.2deg,
      rgba(33, 3, 40, 1) 7.5%,
      rgba(65, 5, 72, 1) 88.7%
    );
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px) scale(1.1);
    .icon {
      transform: scale(1.2);
    }
  }
  .cardtext {
    color: white;
  }
  .icon {
    color: #fe662b;
  }

  .card-1 {
    background: #6e6e6e;
  }

  .card-2 {
    background: #6e6e6e;
  }
  .card-3 {
    background: #6e6e6e;
  }
  .card-4 {
    background: #6e6e6e;
  }
  a {
    text-decoration: none;
  }
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

  .news {
    border: 1px solid black;
    position: relative;
    overflow: hidden;
  }

  @keyframes moveLeftToRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .news p {
    display: inline-block;
    white-space: nowrap;
    animation: moveLeftToRight 30s linear infinite;
    position: absolute;
    right: 0;
  }
  .news-icon {
    z-index: 100;
    font-size: large;
  }

  .table-container {
    width: 100%;
    overflow-x: auto;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
  }

  .custom-table th,
  .custom-table td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .custom-table th {
    background-color: #f2f2f2;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .pagination-button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
  }

  .pagination-button.active {
    background-color: #007bff;
    color: #fff;
  }

  .pagination-button:hover {
    background-color: #007bff;
    color: #fff;
  }

  #title {
    white-space: nowrap; /* Prevent text wrapping */

    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }

  #btn1 {
    width: 100%;

    @media screen and (min-width: 1600px) and (max-width: 3700px) {
      width: 75%;
    }
  }

  th {
    background-color: #12cbc4;
    color: black;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }
  .table-responsive {
    min-height: 10rem;
  }
  .dropdown-item {
  }
  .drop-pointer {
    cursor: pointer;
  }
  .dropdown-item.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  .table-responsive {
    position: relative;
  }

  .loading-container,
  .no-data-container {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 100px; /* Adjust as necessary */
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .no-data-container h4 {
    margin: 0 20px;
  }
  #form1 {
    width: 350px;
    @media screen and (max-width: 1200px) {
      width: 100%;
    }
    @media screen and (min-width: 1100px) and (max-width: 1300px) {
      width: auto;
    }
  }
  #form2 {
    @media screen and (max-width: 1200px) {
    }
  }
`;
