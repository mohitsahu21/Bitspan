import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import useToggle from "../../Hooks/useToggle.js";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";

import Drawer from "../Mobile/Drawer.jsx";

import HeaderHomeTwo from "../HomeTwo/HeaderHomeTwo.jsx";
import FooterHomeTwo from "../HomeTwo/FooterHomeTwo.jsx";
import ScrollingInfo from "../Info/ScrollingInfo.jsx";
import HeaderNews from "../News/HeaderNews.jsx";
import HeroNews from "../News/HeroNews.jsx";

// import {
//   FaUniversity,
//   FaUser,
//   FaWallet,
//   FaCodeBranch,
//   FaQrcode,
// } from "react-icons/fa"; // Icons

// import "bootstrap/dist/css/bootstrap.min.css";

const BankDetails = ({ homePage }) => {
  console.log(homePage);
  // const [heroData, setHeroData] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
  //       );
  //       const result = await response.json();

  //       // API response structure validate karna
  //       if (result.success && result.data) {
  //         console.log("✅ API fetched successfully:", result.data);
  //         setHeroData(result.data);
  //       } else {
  //         console.error("❌ Invalid API response", result);
  //       }
  //     } catch (error) {
  //       console.error("❌ Error fetching hero data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [drawer, drawerAction] = useToggle(false);
  return (
    <>
      <Drawer
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />

      {/* <HeaderHomeTwo action={drawerAction.toggle} /> */}

      <HeaderNews
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      <HeroNews
        title="Bank Details"
        breadcrumb={[
          { link: "/", title: "Home" },
          { link: "/Bank-Details", title: "Bank Details" },
        ]}
      />

      <div className="container mt-5 p-5">
        <div className="row justify-content-center">
          {/* UPI ID Card */}
          <div className="col-md-6 mb-4 mt-5">
            <div
              className="card shadow-lg border-0 p-4"
              style={{ borderLeft: "5px solid #007bff" }}
            >
              <h4 className="card-title text-primary text-center mb-3">
                💳 Bank Details
              </h4>
              <div className="px-3">
                <p className="card-text fs-5 gap-2">
                  <strong style={{ marginRight: "8px" }}>Bank Name:</strong>{" "}
                  {homePage?.Bank_Name}
                </p>
                <p className="card-text fs-5">
                  <strong style={{ marginRight: "8px" }}>
                    Bank Holder Name:
                  </strong>{" "}
                  {homePage?.Bank_Holder_Name}
                </p>
                <p className="card-text fs-5">
                  <strong style={{ marginRight: "8px" }}>Account No:</strong>{" "}
                  {homePage?.Bank_Account_Number}
                </p>
                <p className="card-text fs-5">
                  <strong style={{ marginRight: "8px" }}>IFSC Code:</strong>{" "}
                  {homePage?.IFSC_Code}
                </p>
                <p className="card-text fs-5">
                  <strong style={{ marginRight: "8px" }}>UPI ID:</strong>{" "}
                  {homePage?.UPI_ID}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="col-md-5 mb-4 mt-5">
            <div className="card shadow-lg border-0 text-center p-4">
              <h4 className="card-title text-success">Scan QR Code</h4>
              <div className="d-flex justify-content-center">
                <img
                  src={homePage?.QR_Code}
                  alt="QR Code"
                  className="img-fluid"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterHomeTwo homePage={homePage} />
      {/* <BackToTop className="back-to-top-2 mb-2" /> */}
      {/* <ScrollingInfo homePage={homePage} /> */}
    </>
  );
};

export default BankDetails;
