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
