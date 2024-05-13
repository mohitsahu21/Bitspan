import React from 'react';
import { Link } from 'react-router-dom';

const SingleDoForList = ({title,price,active,description}) => {
   return (
      <>
         <div className="col-xl-4 col-lg-4 col-md-6">
            <div className={`do__item ${active && active} p-relative transition-3 text-center fix mb-30`}>
               <div className="do__shape transition-3 p-absolute">
                  <img src="assets/img/icon/price/triangle.png" alt=""/>
               </div>
               <div className="do__inner p-relative">
                  <p className='fs-4'>{title}</p>
                  {/* <div className="price__tag mb-45">
                     <h2>{`₹${price}`}</h2>
                     <span>Per month</span>
                  </div> */}
                  <div className="do__features text-start mb-30">
                  <ul>
                    <li>• Become Authorized PAN Agent.</li>
                    <li>• Smart Portal for Smart People</li>
                    <li>• 99% Uptime</li>
                    <li>• Best Commissions</li>
                    <li>• Fastest Fund Approval System.</li>
                    <li>• Payment Gatway LIVE System</li>
                  </ul>
                  </div>
                  {/* <Link to="/contact" className="price-btn">Get Started</Link> */}
               </div>
            </div>
         </div>
      </>
   );
};

export default SingleDoForList;