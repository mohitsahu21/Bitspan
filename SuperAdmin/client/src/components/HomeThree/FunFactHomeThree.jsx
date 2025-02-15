import React, { useState } from "react";
import FunFactThumb from "../../assets/images/fun-fact-thumb.png";
import CounterUpCom from "../../lib/CounterUpCom.jsx";
import PopupVideo from "../PopupVideo.jsx";

function FunFactHomeThree({ homePage }) {
  console.log(homePage);
  const [showVideo, setVideoValue] = useState(false);
  const handleShowVideo = (e) => {
    e.preventDefault();
    setVideoValue(!showVideo);
  };
  return (
    <>
      {showVideo && (
        <PopupVideo
          videoSrc={homePage.Training_Video_Link}
          handler={(e) => handleShowVideo(e)}
        />
      )}
      <section className="appie-fun-fact-area" id="fun-fact-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="appie-fun-fact-box wow animated fadeInUp"
                data-wow-duration="2000ms"
                data-wow-delay="400ms"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="appie-fun-fact-content">
                      <h3 className="title">About Us</h3>
                      <p>{homePage?.About_Us}</p>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="appie-fun-fact-item">
                            <h4 className="title">
                              <CounterUpCom
                                endValue="370"
                                sectionSelect="fun-fact-area"
                              />
                              +
                            </h4>
                            <span>Whitelabel</span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="appie-fun-fact-item">
                            <h4 className="title">
                              <CounterUpCom
                                endValue="1500"
                                sectionSelect="fun-fact-area"
                              />
                              +
                            </h4>
                            <span>Super Distributor</span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="appie-fun-fact-item">
                            <h4 className="title">
                              <CounterUpCom
                                endValue="6000"
                                sectionSelect="fun-fact-area"
                              />
                              +
                            </h4>
                            <span>Distributor</span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="appie-fun-fact-item">
                            <h4 className="title">
                              <CounterUpCom
                                endValue="24"
                                sectionSelect="fun-fact-area"
                              />
                              k+
                            </h4>
                            <span>Retailer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="appie-fun-fact-play">
                      <a
                        onClick={(e) => handleShowVideo(e)}
                        className="appie-video-popup"
                        href="https://www.youtube.com/watch?v=EE7NqzhMDms"
                      >
                        <i className="fas fa-play" />
                      </a>
                      <img src={FunFactThumb} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FunFactHomeThree;
