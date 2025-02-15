import React, { useState } from "react";
// import heroThumb from '../../assets/images/hero-thumb-6.png';
// import heroThumb from '../../assets/images/pan2.png';
import heroThumb from "../../assets/images/pan1.webp";
import PopupVideo from "../PopupVideo.jsx";
import styled from "styled-components";

function HeroHomeFour({ homePage }) {
  console.log(homePage);
  const [showVideo, setVideoValue] = useState(false);
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
  return (
    <>
      <Wrapper>
        {showVideo && (
          <PopupVideo
            videoSrc={homePage?.Training_Video_Link}
            handler={(e) => handleShowVideo(e)}
          />
        )}
        <section className="appie-hero-area appie-hero-5-area appie-hero-3-area">
          <div className="container">
            <div className="row  justify-content-center">
              <div className="col-lg-10">
                <div className="appie-hero-content text-center">
                  <h2
                    className="welcome-heading"
                    style={{
                      textTransform: "capitalize",
                      color: "#19094d",
                      opacity: "1",
                    }}
                  >
                    {" "}
                    {homePage?.Home_Page_1st_Paragraph}
                  </h2>
                  <h1
                    className="appie-title"
                    style={{ textTransform: "capitalize" }}
                  >
                    {homePage?.Home_Page_2nd_Paragraph}
                  </h1>
                  {/* <p>Fully Automatic</p> */}

                  <div className="hero-btns">
                    <a
                      className="main-btn"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("join");
                      }}
                    >
                      JOIN NOW
                    </a>
                    <a
                      onClick={(e) => handleShowVideo(e)}
                      className="appie-video-popup"
                      href={homePage?.Training_Video_Link}
                    >
                      <i className="fas fa-play"></i> Training Video
                    </a>
                  </div>
                  <div
                    className="thumb mt-80 wow animated fadeInUp"
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

export default HeroHomeFour;

const Wrapper = styled.section`
  .welcome-heading {
    color: #fff;
    opacity: 0.5;
  }
`;
