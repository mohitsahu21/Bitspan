import React from 'react';
import heroMan from '../../assets/images/hero-mans.png';
// import heroThumb from '../../assets/images/hero-thumb-3.png';
import heroThumb from '../../assets/images/about-1.png';
import shapeTen from '../../assets/images/shape/shape-10.png';
import shapeEleven from '../../assets/images/shape/shape-11.png';
import shapeTwelve from '../../assets/images/shape/shape-12.png';
import shapeNine from '../../assets/images/shape/shape-9.png';

function HeroHomeTwo() {
    return (
        <>
            <section className="appie-hero-area-2 mb-90">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="appie-hero-content-2">
                                {/* <span>14 day free</span> */}
                                <h5>Welcome to Bitspan.in</h5>
                                <h1 className="appie-title">
                                India's Leading PAN Card <span>Portal</span>
                                </h1>
                                <p>Fully Automatic</p>
                                
                                <form action="#">
                                    {/* <div className="input-box">
                                        <input type="text" placeholder="info@appie.com" />
                                        <i className="fal fa-envelope" />
                                        <button type="button">
                                            <i className="fal fa-arrow-right" />
                                        </button>
                                    </div> */}
                                </form>
                                <div className="appie-hero-content">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-apple" /> JOIN NOW
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a className="item-2" href="#">
                                            <i className="fab fa-google-play" /> Download for
                                            Android
                                        </a>
                                    </li> */}
                                </ul>
                                </div>
                            
                                {/* <div className="hero-users">
                                    <img src={heroMan} alt="" />
                                    <span>
                                        30k <span> Feedback</span>
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="appie-hero-thumb-3 wow animated fadeInRight"
                    data-wow-duration="2000ms"
                    data-wow-delay="400ms"
                >
                    {/* <img src={heroThumb} alt="" /> */}
                    <img src={heroThumb} alt="" />
                </div>
                <div className="hero-shape-1">
                    <img src={shapeNine} alt="" />
                </div>
                <div className="hero-shape-2">
                    <img src={shapeTen} alt="" />
                </div>
                <div className="hero-shape-3">
                    <img src={shapeEleven} alt="" />
                </div>
                <div className="hero-shape-4">
                    <img src={shapeTwelve} alt="" />
                </div>
            </section>
        </>
    );
}

export default HeroHomeTwo;
