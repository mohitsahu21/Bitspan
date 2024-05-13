import React from 'react';
import { Link } from 'react-router-dom';

const HomeThreeFaq = () => {
   return (
     <>
       <section className="faq__area pb-200 pt-75">
         <div className="container">
           <div className="row">
             <div className="col-xl-4 col-lg-5 col-md-5">
               <div className="faq__content">
                 <div className="section-title mb-45">
                   <h2>WHAT WE DO ?</h2>
                   <p>
                     BITS PAN IS LEADING B2B PTAL WE HAVE 10K+ SATISFIED
                     CUSTOMERS TODAY AT WWW.BITSPAN.IN CREATED BY THE INDUSTRY
                     LEADERS, BITS PAN PAN PROVIDES A DEDICATED TEAM FOR EACH
                     CUSTOMER WHO MAKES SURE THAT THE WORK IS DONE WITHIN THE
                     TIME FRAME.
                   </p>
                 </div>
                 {/* <Link to="/about" className="z-btn z-btn-border">All Question</Link> */}
               </div>
             </div>
             <div className="col-xl-6 col-lg-6 col-md-7 offset-xl-2 offset-lg-1">
               <div className="faq__accordion p-relative">
                 <div className="accordion" id="accordionExample">
                   <div className="card accordion-item">
                     <div className="card-header accordion-header" id="acc_1">
                       <h5 className="mb-0">
                         <button
                           className="btn btn-link"
                           data-bs-toggle="collapse"
                           data-bs-target="#collapse_1"
                           aria-expanded="true"
                           aria-controls="collapse_1"
                         >
                           B2B PAN CARD PORTAL
                         </button>
                       </h5>
                     </div>

                     <div
                       id="collapse_1"
                       className="collapse show"
                       aria-labelledby="acc_1"
                       data-bs-parent="#accordionExample"
                     >
                       <div className="card-body accordion-body">
                         <ul>
                           <li>• Become Authorized PAN Agent. </li>
                         <li>• Smart Portal for Smart People </li>  
                         <li>• 99% Uptime </li>   
                         <li>• Best Commissions </li>   
                         <li>•Fastest Fund Approval System. </li>  
                         <li> • Payment Gatway LIVE System</li> 
                         </ul>
                       </div>
                     </div>
                   </div>
                   <div className="card">
                     <div className="card-header" id="acc_2">
                       <h5 className="mb-0">
                         <button
                           className="btn btn-link collapsed"
                           data-bs-toggle="collapse"
                           data-bs-target="#collapse_2"
                           aria-expanded="true"
                           aria-controls="collapse_2"
                         >
                          RETAILER, DISTRIBUTOR & SUPER DISTRIBUTOR
                         </button>
                       </h5>
                     </div>

                     <div
                       id="collapse_2"
                       className="collapse"
                       aria-labelledby="acc_2"
                       data-bs-parent="#accordionExample"
                     >
                       <div className="card-body accordion-body">
                         <p>
                         A Retailer can start a PAN center with minimum investment only.Retailer can makes unlimited PAN cards through proper channel. A Distributor can makes unlimited PAN cards.He/She can create unlimited Retailers with low cost investment only.
                         </p>
                       </div>
                     </div>
                   </div>
                   <div className="card">
                     <div className="card-header" id="acc_3">
                       <h5 className="mb-0">
                         <button
                           className="btn btn-link collapsed"
                           data-bs-toggle="collapse"
                           data-bs-target="#collapse_3"
                           aria-expanded="true"
                           aria-controls="collapse_3"
                         >
                           PAN CARD WHITE LABEL
                         </button>
                       </h5>
                     </div>

                     <div
                       id="collapse_3"
                       className="collapse"
                       aria-labelledby="acc_3"
                       data-bs-parent="#accordionExample"
                     >
                       <div className="card-body accordion-body">
                         <p>
                         We are providing pan card white label portal for your business. Here you can create unlimited pan card agent, pan card Super distributor & distributor with full admin control panel. You can upload your company logo. If you want to business with pan card white label then TEST is best for your company.
                         </p>
                       </div>
                     </div>
                   </div>
                 
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </>
   );
};

export default HomeThreeFaq;