import React from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { IoMdFingerPrint } from "react-icons/io";
import {
  FaIdCard,
  FaCarSide,
  FaRegIdCard,
  FaAddressCard,
  FaRegAddressCard,
} from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import { MdDriveEta } from "react-icons/md";
import { FaPassport } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FindPage = () => {
  const navigate = useNavigate();
  const cardData = [
    // {
    //   title: "Aadhar Details",
    //   path: "#",
    //   icon: <IoMdFingerPrint color="#3498db" />,
    // },
    {
      title: "Aadhaar Details",
      path: "/aadhar-find",
      icon: <IoMdFingerPrint color="#3498db" />,
    },
    {
      title: "Pan by Aadhaar No.",
      path: "/pan-find-by-aadhar",
      icon: <FaIdCard color="#e74c3c" />,
    },
    {
      title: "Pan Details",
      path: "/pan-details",
      icon: <FaAddressCard color="#2ecc71" />,
    },
    {
      title: "RC Download",
      path: "/rc-find",
      icon: <FaCarSide color="#f39c12" />,
    },
    {
      title: "RC Details",
      path: "/view-rc-find",
      icon: <FaRegAddressCard color="#2980b9" />,
    },
    // {
    //   title: "Ration Card Details",
    //   path: "#",
    //   icon: <FaRegIdCard color="#9b59b6" />,
    // },
    {
      title: "Voter Details",
      path: "/voter-find",
      icon: <FaRegIdCard color="#9b59b6" />,
    },
    {
      // title: "Driving Licence Details",
      title: "Driving Licence Download",
      path: "/dl-find",
      icon: <MdDriveEta color="#1abc9c" />,
    },
    {
      title: "GST Details",
      // path: "/gst-find", //Backend Working but Frontend not working
      path: "/gstverify-find",
      icon: <FaFileInvoice color="#e67e22" />,
    },
    {
      title: "Passport Details",
      path: "/passport-find",
      icon: <FaPassport color="#2980b9" />,
    },
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
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Find Service</h4>
                    <h6 className="mx-lg-5">
                      <BiHomeAlt /> &nbsp;/ &nbsp; Find Service
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 mt-5">
                {/* -- */}
                <div className="container mt-5">
                  <div className="row formdata">
                    {/* {cardData.map((item, index) => (
                      <div className="col-md-4 mb-4" key={index}>
                        <Link
                          href={item.path}
                          className="text-decoration-none text-dark"
                        >
                          <div className="card shadow-sm h-100">
                            <div className="card-body d-flex align-items-center">
                              <div className="me-3 fs-3">{item.icon}</div>
                              <h5 className="card-title mb-0">{item.title}</h5>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))} */}
                    {cardData.map((item, index) => (
                      <div
                        className="col-md-4 mb-4"
                        key={index}
                        onClick={() => navigate(item.path)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card shadow-sm h-100">
                          <div className="card-body d-flex align-items-center">
                            <div className="me-3 fs-3">{item.icon}</div>
                            <h5 className="card-title mb-0">{item.title}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* -- */}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default FindPage;
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
