import React, { useRef, useEffect, useState } from "react";
import heroThumb1 from "../../assets/images/about-1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import videoSlideOne from "../../assets/images/video-slide-1.jpg";
import videoSlideTwo from "../../assets/images/video-slide-2.jpg";
// import videoThumb from '../../assets/images/video-thumb-1.jpg';
import videoThumb from "../../assets/images/videodemo.png";
import PopupVideo from "../PopupVideo.jsx";

// ✅ Default dummy data
// const defaultHeroData = {
//   Home_Page_1st_Paragraph: "Welcome to Bitspan",
//   Home_Page_2nd_Paragraph: "Your Trusted Partner in Finance",
//   Calling_No: "0000000000",
//   Email_Id: "info@bitspan.com",
//   Home_Page_Background: heroThumb1, // ✅ Default Background Image
//   Training_Video_Link: "",
//   Logo: "/default-logo.png",
// };

function VideoPlayerHomeTwo({ className, homePage }) {
  console.log(homePage);
  const [showVideo, setshowVideoValue] = useState(false);
  const handleVideoShow = (e) => {
    e.preventDefault();
    setshowVideoValue(!showVideo);
  };
  const sliderRef = useRef();
  const settings = {
    autoplay: true,
    arrows: false,
    dots: false,
  };
  const sliderNext = () => {
    sliderRef.current.slickNext();
  };
  const sliderPrev = () => {
    sliderRef.current.slickPrev();
  };

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
      {showVideo && (
        <PopupVideo
          handler={(e) => handleVideoShow(e)}
          videoSrc={homePage.Training_Video_Link}
        />
      )}
      <section className={`appie-video-player-area pb-100 ${className || ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="appie-video-player-item">
                <div className="thumb">
                  <img src={videoThumb} alt="" />
                  <div className="video-popup">
                    <a
                      onClick={(e) => handleVideoShow(e)}
                      role="button"
                      href={homePage.Training_Video_Link}
                      className="appie-video-popup"
                    >
                      <i className="fas fa-play" />
                    </a>
                  </div>
                </div>
                <div className="content">
                  <h3 className="title text-center">
                    Watch the two-minute Training video to learn how.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VideoPlayerHomeTwo;
