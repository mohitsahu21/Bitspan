import React from 'react';
import { Link } from 'react-router-dom';

const SingleBankDetails = ({icon,title,description,image}) => {
   return (
      <>
         <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 bg-white mt-3 p-4 mx-auto rounded" >
            <div className="services__item   p-0">
               <div className="services__icon mb-35">
                  <img src={`assets/img/icon/services/services-${icon}.png`} alt="services"/>
               </div>
               <div className="services__content">
                  <h2><Link to="/servicesDetails">{title}</Link></h2>
                  <p>{description}</p>
                  {image && 
                  <> 
                  <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg?w=400&h=300&c=crop" width={150} height={150}/>
                  </>}
               </div>
            </div>
         </div>
      </>
   );
};

export default SingleBankDetails;