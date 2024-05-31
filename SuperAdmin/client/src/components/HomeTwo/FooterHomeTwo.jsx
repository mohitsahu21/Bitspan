import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-2.png';

function FooterHomeTwo() {
    const date = new Date();
  const year = date.getFullYear();
    return (
        <>
            <section className="appie-footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-about-widget footer-about-widget-2">
                                <div className="logo">
                                    <a href="#">
                                        <img src={logo} alt="" />
                                    </a>
                                </div>
                                <p>
                                BITS PAN SERVICE CENTER PROVIDER. Now PAN CARD is mandatory for all citizens in India. We are providing a smart business solution. PAN AGENCY is working two years over in India.There are more than six thousands Retailers-Distributors & Super Distributors is working now smoothly.
                                </p>
                                {/* <a href="#">
                                    Read More <i className="fal fa-arrow-right" />
                                </a> */}
                                <div className="social mt-30">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-pinterest-p" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-linkedin-in" />
                                            </a>
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
                                        <Link to="/about-us">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/Service">Photo & Sign Croping Tool</Link>
                                    </li>
                                    <li>
                                        <a href="#">Find User ID</a>
                                    </li>
                                    <li>
                                        <Link to="/news">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-navigation footer-navigation-2">
                                <h4 className="title">Policies</h4>
                                <ul>
                                    <li>
                                        <Link to="/about-us">Refund and Cancellation Policies</Link>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policies</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms and Conditions</a>
                                    </li>
                                  
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget-info">
                                <h4 className="title">Get In Touch</h4>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="fal fa-envelope" /> admin@bitspan.in
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fal fa-phone" /> 8770109518
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fal fa-map-marker-alt" />INDORE MP
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
                                    {/* <p>Copyright 2017-2023 © BITS PAN. All rights reserved.</p> */}
                                    <p>DOAGuru InfoSystems © {year} All rights reserved.</p>
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
