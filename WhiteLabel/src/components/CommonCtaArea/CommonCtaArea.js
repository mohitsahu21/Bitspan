import React from 'react';
import { Link } from 'react-router-dom';
import SingleService from '../SingleService/SingleService';
import SingleWork from '../HowItWorks/SingleWork';

const CommonCtaArea = () => {
   return (
      <>
         <section className="cta__area pt-180 pb-155" style={{ background: `url(assets/img/cta/cta-bg.jpg)`
            , backgroundPosition: 'center', backgroundSize: 'cover' }} >
            <div className="container p-relative">
               <div className="row">
                  <div className="col-xl-12 ">
                     <div className="cta__content text-center">
                        <span >Lets Join ! Become Our Family Member</span>
                        <h1 >How it Works</h1>
                        {/* <div className="cta__btn">
                           <Link to="/contact" className="z-btn z-btn-white mb-30">Contact Us</Link>
                           <Link to="/contact" className="z-btn z-btn-transparent mb-30">Work with us</Link>
                        </div> */}
                        <div className='row'>
                        <SingleWork icon="user" title="Create An Account" description="Create Own Team With Your Super Distributer, Distributer And Retailer Accounts." step="01"/>
                        
                        <SingleWork icon="coupon" title="Buy & Distribute Coupon" description="Buy Coupon And Distribute Coupons To Your Team With Realtime Coupon Updation." step="02"/>
                        
                        <SingleWork icon="growth" title="Check History" description="Get The Realtime Coupon Buying Data, Distributed Data And Joining Data." step="03"/>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default CommonCtaArea;