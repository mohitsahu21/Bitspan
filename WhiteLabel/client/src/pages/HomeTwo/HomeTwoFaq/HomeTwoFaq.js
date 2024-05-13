import React from 'react';

const HomeTwoFaq = () => {
   return (
      <>
         <section className="faq__area p-relative pt-135 pb-120 grey-bg-12">
            <div className="faq__thumb" style={{ background: `url(assets/img/faq/about-1.png)`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
            <div className="container">
               <div className="row">
                  <div className="col-xl-5 offset-xl-7 col-lg-6 offset-lg-6 col-md-7 offset-md-5">
                     <div className="faq__wrapper">
                        <div className="section__title section__title-3 mb-25 wow fadeInUp" data-wow-delay=".2s">
                           <span>Our Services</span>
                           <h2>What Solutions  <br/> We Provide</h2>
                        </div>

                        <div className="accordion" id="accordionExample">

                           <div className="card accordion-item">
                              <div className="accordion-header" id="headingOne">
                                 <h5 className="mb-0">
                                    <button className="btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    NSDL instant Pan White Label
                                    </button>
                                 </h5>
                              </div>

                              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                 <div className="card-body accordion-body">
                                 Instant Create Unlimited Retailers, Distributors, Super Distributors.Instant NSDL Service Onboarding within a second, apply Pancard OTP & Biometric Through.
                                 </div>
                              </div>
                           </div>

                           <div className="card accordion-item">
                              <div className="accordion-header" id="headingTwo">
                                 <h5 className="mb-0">
                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    NSDL instant Pan Admin Panel
                                    </button>
                                 </h5>
                              </div>
                              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                 <div className="card-body accordion-body">
                                 Instant Create Unlimited Retailers, Distributors, Super Distributors.Instant NSDL Service Onboarding within a second No any onbording charges, apply Pancard OTP & Biometric Through.
                                 </div>
                              </div>
                           </div>

                           <div className="card accordion-item">
                              <div className="accordion-header" id="headingThree">
                                 <h5 className="mb-0">
                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    NSDL instant Pan API
                                    </button>
                                 </h5>
                              </div>
                              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                 <div className="card-body accordion-body">
                                 Instant NSDL Service Onboarding within a second, No any Onboarding Charges, Developer Frindly API, Integration Support.
                                 </div>
                              </div>
                           </div>

                           <div className="card accordion-item">
                              <div className="accordion-header" id="headingfour">
                                 <h5 className="mb-0">
                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                    Recharge API
                                    </button>
                                 </h5>
                              </div>
                              <div id="collapsefour" className="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                                 <div className="card-body accordion-body">
                                 Mobile Recharge, DTH Recharge, Google Play Voucher Recharge, 24*7 Online Auto Billing
                                 </div>
                              </div>
                           </div>

                           <div className="card accordion-item">
                              <div className="accordion-header" id="headingfive">
                                 <h5 className="mb-0">
                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                                    Mobile Application NSDL Instant Pan
                                    </button>
                                 </h5>
                              </div>
                              <div id="collapsefive" className="accordion-collapse collapse" aria-labelledby="headingfive" data-bs-parent="#accordionExample">
                                 <div className="card-body accordion-body">
                                 Now Apply NSDL instant Pan in your Mobile with Aadhaar OTP Through,
                                 </div>
                              </div>
                           </div>

                           <div className="card accordion-item">
                              <div className="accordion-header" id="headingsix">
                                 <h5 className="mb-0">
                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsesix" aria-expanded="false" aria-controls="collapsesix">
                                    Recharge White Label
                                    </button>
                                 </h5>
                              </div>
                              <div id="collapsesix" className="accordion-collapse collapse" aria-labelledby="headingsix" data-bs-parent="#accordionExample">
                                 <div className="card-body accordion-body">
                                 We Are Providing Recharge White Label & Mobile Application, Mobile Recharge, DTH Recharge, Etc
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

export default HomeTwoFaq;