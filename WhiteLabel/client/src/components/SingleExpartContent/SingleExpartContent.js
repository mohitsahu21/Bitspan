import React from 'react';
import { Link } from 'react-router-dom';

const SingleExpartContent = ({image}) => {
    return (
        <>
            <div className="expart__tab-content white-bg">
               
                <div className="row">
                    <div className="col-xl-6 col-lg-6 ">
                        <div className="expart__content">
                        <span>WHO WE ARE?</span>
                            <h2>About Us</h2>
                            <p>BITS PAN SERVICE CENTER PROVIDER. Now PAN CARD is mandatory for all citizens in India. We are providing a smart business solution. PAN AGENCY is working two years over in India.There are more than six thousands Retailers-Distributors & Super Distributors is working now smoothly.</p>
                            {/* <Link to="/about" className="z-btn">Learn More</Link> */}
                        </div>
                    </div>
                </div>
                 <div className="expart__thumb" style={{ background: `url(assets/img/expart/expart-3.png)`, backgroundPosition: 'center', backgroundSize: 'cover' }} ></div>
            </div>
        </>
    );
};

export default SingleExpartContent;