import React from 'react';
import { Link } from 'react-router-dom';
import SingleService from '../SingleService/SingleService';
import SingleWork from '../HowItWorks/SingleWork';
import SingleBankDetails from '../SingleBankDetails/SingleBankDetails';

const BankDetails = () => {
   return (
      <>
         <section className="cta__area pt-5  pb-5"  >
            <div className="container p-relative p-5">
               <div className="row">
                  <div className="col-xl-10 offset-xl-1">
                     <div className="cta__content text-center">
                     <h1 className='fs-1 mb-3'>Our Bank Details</h1>
                       
                       
                        {/* <div className="cta__btn">
                           <Link to="/contact" className="z-btn z-btn-white mb-30">Contact Us</Link>
                           <Link to="/contact" className="z-btn z-btn-transparent mb-30">Work with us</Link>
                        </div> */}
                        <div className='row'>
                        <SingleBankDetails icon="1" title="Bank Details" description="UPI ID :- 8770109518@ybl"/>
                        <SingleBankDetails icon="1" title="QR Code" image={true}/>
                      
                        </div>
                        
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default BankDetails;