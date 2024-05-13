import React from 'react';
import { Link } from 'react-router-dom';
import SingleService from '../SingleService/SingleService';
import SingleWork from '../HowItWorks/SingleWork';

const DownloadApp = () => {
   return (
      <>
         <section className="cta__area pt-5  pb-5"  >
            <div className="container p-relative p-5">
               <div className="row">
                  <div className="col-xl-10 offset-xl-1">
                     <div className="cta__content text-center">
                     <h1 className='fs-1 mb-3'>Download Apps Managing Business</h1>
                        <span className='mb-4'>Building your Apps busines helps attract more potential clients. Our integrated marketing team will work directly long-term high-impact convergence.</span>
                       
                        {/* <div className="cta__btn">
                           <Link to="/contact" className="z-btn z-btn-white mb-30">Contact Us</Link>
                           <Link to="/contact" className="z-btn z-btn-transparent mb-30">Work with us</Link>
                        </div> */}
                        {/* <div className='row'>
                        <SingleWork icon="1" title="Create An Account" description="Create Own Team With Your Super Distributer, Distributer And Retailer Accounts."/>
                        <SingleWork icon="1" title="Buy & Distribute Coupon" description="Buy Coupon And Distribute Coupons To Your Team With Realtime Coupon Updation."/>
                        <SingleWork icon="1" title="Check History" description="Get The Realtime Coupon Buying Data, Distributed Data And Joining Data."/>
                        </div> */}
                         <div className="slider__btn">
                                       <Link to="/" className="z-btn z-btn-transparent">Download App</Link>
                                       {/* <Link to="/contact" className="z-btn z-btn-transparent">Download App</Link> */}
                                    </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default DownloadApp;