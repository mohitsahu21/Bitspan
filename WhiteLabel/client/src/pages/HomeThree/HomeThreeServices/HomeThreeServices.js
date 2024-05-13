import React from 'react';
import { CgArrowLongRight } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HomeThreeSingleService from '../../../components/HomeThreeSingleService/HomeThreeSingleService';

const HomeThreeServices = () => {
   return (
      <>
         <section className="services__area-2 mt--120 pt-270 pb-140 p-relative" style={{ background: `url(assets/img/bg/wave-bg-2.png)`, backgroundPosition: 'bottom', backgroundSize: 'cover' }}>
            <div className="container">
               <div className="row g-0">

                  <HomeThreeSingleService image="1" title="Smart Portal for Smart People"  />
                  <HomeThreeSingleService image="2" title="99% Uptime"  />
                  <HomeThreeSingleService image="3" title="Best Commissions"  />
                  <HomeThreeSingleService image="4" title="Fastest Fund Approval System" />

               </div>
               <div className="about__area-2 pt-130">
                  <div className="row">
                     <div className="col-xl-7 col-lg-6">
                        <div className="about__thumb-2 p-relative m-img">
                           <img src="assets/img/about/about-2.png" alt=""/>
                        </div>
                     </div>
                     <div className="col-xl-5 col-lg-6">
                        <div className="about__content">
                           <div className="section__title section__title-3 mb-25">
                              <h2 >About Us</h2>
                           </div>
                           <p >BITS PAN SERVICE CENTER PROVIDER. Now PAN CARD is mandatory for all citizens in India. We are providing a smart business solution. PAN AGENCY is working two years over in India.There are more than six thousands Retailers-Distributors & Super Distributors is working now smoothly.</p>
                           <div className="about__list">
                              <ul>
                                 <li><span><i > <FaCheck/> </i>PAN Card Portal</span></li>
                                 <li><span><i > <FaCheck/> </i>Mobile Recharge, DTH Recharge, Etc</span></li>
                                 <li><span><i > <FaCheck/> </i>24*7 Online Auto Billing</span></li>
                              </ul>
                           </div>
                           {/* <Link to="/about" className="z-btn">What we do<i > <CgArrowLongRight /> </i></Link> */}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default HomeThreeServices;