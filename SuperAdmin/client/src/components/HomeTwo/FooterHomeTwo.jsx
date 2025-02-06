import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-2.png";
import heroThumb1 from "../../assets/images/about-1.png";

// ✅ Default dummy data
// const defaultHeroData = {
//   Home_Page_1st_Paragraph: "Welcome to Bitspan",
//   Home_Page_2nd_Paragraph: "Your Trusted Partner in Finance",
//   Calling_No: "0000000000",
//   Email_Id: "info@bitspan.com",
//   Home_Page_Background: heroThumb1, // ✅ Default Background Image
//   Logo: "/default-logo.png",
// };

function FooterHomeTwo({ homePage }) {
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

  if (!homePage) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="appie-footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-about-widget footer-about-widget-2">
                <div className="logo">
                  {/* <a href="#">
                    <img src={heroData.Logo} alt="" />
                  </a> */}
                  <Link to="/">
                    {" "}
                    <img src={homePage?.Logo} alt=" Logo" />
                  </Link>
                </div>
                <p>
                  BITS PAN SERVICE CENTER PROVIDER. Now PAN CARD is mandatory
                  for all citizens in India. We are providing a smart business
                  solution. PAN AGENCY is working two years over in India.There
                  are more than six thousands Retailers-Distributors & Super
                  Distributors is working now smoothly.
                </p>
                {/* <a href="#">
                                    Read More <i className="fal fa-arrow-right" />
                                </a> */}
                <div className="social mt-30">
                  <ul>
                    <li>
                      <Link to={homePage?.Facebook_Link}>
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to={homePage?.Instagram_Link}>
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to={homePage?.LinkedIn_Link}>
                        <i className="fab fa-pinterest-p" />
                      </Link>
                    </li>
                    <li>
                      <Link to={homePage?.LinkedIn_Link}>
                        <i className="fab fa-linkedin-in" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-navigation footer-navigation-2">
                <h4 className="title">Useful links</h4>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Photo & Sign Croping Tool</Link>
                  </li>
                  <li>
                    <Link to="/FindId">Find User ID </Link>
                  </li>
                  <li>
                    <Link to="/Bank-Details">Bank Details</Link>
                  </li>
                  <li>
                    <Link to="#">Login</Link>
                  </li>
                  {/* <li>
                    <Link to="/contact">Contact</Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-navigation footer-navigation-2">
                <h4 className="title">Policies</h4>
                <ul>
                  <li>
                    {/* <Link to="/about-us">Refund and Cancellation Policies</Link> */}
                    <Link to="/RefundPolicy">
                      Refund and Cancellation Policies
                    </Link>
                  </li>
                  <li>
                    <Link to="/PrivacyPolicies">Privacy Policies </Link>
                  </li>
                  <li>
                    <Link to="/Terms-and-Condition">Terms and Conditions </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget-info">
                <h4 className="title">Get In Touch</h4>
                <ul>
                  <li>
                    <a href={`mailto:${homePage.Email_Id}`}>
                      <i className="fal fa-envelope mt-1" />{" "}
                      {homePage?.Email_Id}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${homePage.Calling_No}`}>
                      <i className="fal fa-phone mt-1" /> {homePage?.Calling_No}
                    </a>
                    <br />
                    <a
                      href={`https://wa.me/${homePage.Whatsapp_No}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fab fa-whatsapp mt-1"></i>
                      {homePage?.Whatsapp_No}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        homePage.Address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fal fa-map-marker-alt mt-1" />
                      {homePage?.Address}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div
                className="
                footer-copyright
                d-flex
                align-items-center
                justify-content-between
                pt-35
              "
              >
                {/* <div className="apps-download-btn">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-apple" /> Download for iOS
                                            </a>
                                        </li>
                                        <li>
                                            <a className="item-2" href="#">
                                                <i className="fab fa-google-play" /> Download for
                                                Android
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                <div className="copyright-text">
                  <p>Copyright 2017-2023 © BITS PAN. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FooterHomeTwo;
