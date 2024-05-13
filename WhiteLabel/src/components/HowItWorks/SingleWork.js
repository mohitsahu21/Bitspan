import React from 'react';
import { Link } from 'react-router-dom';

const SingleWork = ({icon,title,description,step}) => {
   return (
      <>
         <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 bg-white  p-4 mx-auto rounded" >
            <div className="services__item mb-90  p-0">
            <span >{step} Step</span>
    {/* {step !== "03" && <img className='shape1' src='assets/img/howItsWorks/shape-04.png' width={90} height={28}/>} 
    {step !== "03" && <img className='shape2' src='assets/img/howItsWorks/shape-04.png' width={90} height={28}/>}  */}
               <div className="services__icon mb-35">
              
                  <img src={`assets/img/howItsWorks/${icon}.png`} alt="services" width={200} height={200} className='rounded-circle'/>
                 
               </div>
               
               <div className="services__content">
                  <h3><Link to="/servicesDetails">{title}</Link></h3>
                  <p>{description}</p>
               </div>
            </div>
            
         </div>
      </>
   );
};

export default SingleWork;