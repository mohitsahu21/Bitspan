import React, { useEffect, useState } from "react";
import counterIconOne from "../../assets/images/icon/counter-icon-1.svg";
import counterIconTwo from "../../assets/images/icon/counter-icon-2.svg";
import counterIconThree from "../../assets/images/icon/counter-icon-3.svg";
import counterIconFour from "../../assets/images/icon/counter-icon-4.svg";
import CounterUpCom from "../../lib/CounterUpCom.jsx";
import heroThumb1 from "../../assets/images/about-1.png";
import Loader from "../Helper/Loader.jsx";

// ✅ Default dummy data
// const defaultHeroData = {
//   Home_Page_1st_Paragraph: "Welcome to Bitspan",
//   Home_Page_2nd_Paragraph: "Your Trusted Partner in Finance",
//   Calling_No: "0000000000",
//   Email_Id: "info@bitspan.com",
//   Home_Page_Background: heroThumb1, // ✅ Default Background Image
//   Logo: "/default-logo.png",
// };

function CounterArea({ style, homePage }) {
  console.log(homePage);
  // const [heroData, setHeroData] = useState(defaultHeroData);

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

  const [loading, setLoading] = useState(true);
  if (!homePage) {
    return (
      <div className={`appie-loader ${loading ? "active" : ""}`}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section
        className="appie-counter-area pt-90 pb-190"
        id="counter"
        style={style}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="appie-section-title">
                <h3 className="appie-title">About Us</h3>
                <p>{homePage?.about}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div
                className="appie-single-counter mt-30 wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="200ms"
              >
                <div className="counter-content">
                  <div className="icon">
                    <img src={counterIconOne} alt="" />
                  </div>
                  <h3 className="title">
                    <span className="counter-item">
                      <CounterUpCom endValue={370} sectionSelect="counter" />
                    </span>
                    +
                  </h3>
                  <p>Whitelabel</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="appie-single-counter mt-30 item-2 wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="400ms"
              >
                <div className="counter-content">
                  <div className="icon">
                    <img src={counterIconTwo} alt="" />
                  </div>
                  <h3 className="title">
                    <span className="counter-item">
                      <CounterUpCom endValue={1500} sectionSelect="counter" />
                    </span>
                    +
                  </h3>
                  <p>Super Distributor</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="appie-single-counter mt-30 item-3 wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="600ms"
              >
                <div className="counter-content">
                  <div className="icon">
                    <img src={counterIconThree} alt="" />
                  </div>
                  <h3 className="title">
                    <span className="counter-item">
                      <CounterUpCom endValue={6000} sectionSelect="counter" />
                    </span>
                    +
                  </h3>
                  <p>Distributor</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="appie-single-counter mt-30 item-4 wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="800ms"
              >
                <div className="counter-content">
                  <div className="icon">
                    <img src={counterIconFour} alt="" />
                  </div>
                  <h3 className="title">
                    <span className="counter-item">
                      <CounterUpCom endValue={24} sectionSelect="counter" />
                    </span>
                    k+
                  </h3>
                  <p>Retailer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CounterArea;
