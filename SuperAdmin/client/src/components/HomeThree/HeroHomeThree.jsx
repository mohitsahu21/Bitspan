import React, { useState, useEffect } from "react";
import heroThumb from "../../assets/images/pan-card.png";
import PopupVideo from "../PopupVideo.jsx";
import styled from "styled-components";
import Loader from "../Helper/Loader";

function HeroHomeThree({ homePage }) {
  console.log(homePage);
  const [showVideo, setVideoValue] = useState(false);
  // const [heroData, setHeroData] = useState("");
  const [loading, setLoading] = useState(true);
  const handleShowVideo = (e) => {
    e.preventDefault();
    setVideoValue(!showVideo);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
  //       );
  //       const result = await response.json();

  //       // API response structure validate karna
  //       if (result.success && result.data) {
  //         setLoading(false);
  //         console.log("✅ API fetched successfully:", result.data);
  //         setHeroData(result.data);
  //       } else {
  //         console.error("❌ Invalid API response", result);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("❌ Error fetching hero data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (!homePage) {
    return (
      <div className={`appie-loader ${loading ? "active" : ""}`}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Wrapper>
        {showVideo && (
          <PopupVideo
            videoSrc={homePage?.Training_Video_Link}
            handler={(e) => handleShowVideo(e)}
          />
        )}
        <section className="appie-hero-area appie-hero-3-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="appie-hero-content text-center">
                  <h1
                    className="appie-title "
                    style={{ textTransform: "capitalize" }}
                  >
                    {homePage?.Home_Page_2nd_Paragraph}
                  </h1>
                  <h3 style={{ textTransform: "capitalize" }}>
                    {homePage?.Home_Page_1st_Paragraph}
                  </h3>
                  <div className="hero-btns">
                    <a
                      className="main-btn"
                      href="#"
                      onClick={() => scrollToSection("join")}
                    >
                      Join Now
                    </a>
                    <a
                      onClick={(e) => handleShowVideo(e)}
                      className="appie-video-popup"
                      href={homePage?.Training_Video_Link}
                    >
                      <i className="fas fa-play" /> Traning Video
                    </a>
                  </div>
                  <div
                    className="thumb mt-100 wow animated fadeInUp"
                    data-wow-duration="2000ms"
                    data-wow-delay="400ms"
                  >
                    <img src={heroThumb} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}

export default HeroHomeThree;
const Wrapper = styled.div`
  h3 {
    font-size: 36px;
    font-weight: 400;
    line-height: 24px;
    color: #505056;
    margin: 0px;
  }
`;
