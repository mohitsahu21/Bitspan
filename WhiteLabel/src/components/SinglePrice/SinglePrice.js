import React from 'react';
import { Link } from 'react-router-dom';

const SinglePrice = ({title,price,active,description}) => {
   return (
      <>
         <div className="col-xl-3 col-lg-3 col-md-6" >
            <div className={`price__item ${active && active} p-relative transition-3 text-center fix mb-30`}>
               <div className="price__shape transition-3 p-absolute">
                  <img src="assets/img/icon/price/triangle.png" alt=""/>
               </div>
               <div className="price__inner p-relative">
                  <p>{title}</p>
                  <div className="price__tag ">
                     <h2>{`₹${price}`}</h2>
                     {/* <span>Per month</span> */}
                  </div>
                  <div className="price__features  mb-30">
                 <span>{description}</span>
                  </div>
                  <Link to="/register" className="price-btn">Get Started</Link>
                  {/* <Link to="/contact" className="price-btn">Get Started</Link> */}
               </div>
            </div>
         </div>
      </>
   );
};

export default SinglePrice;