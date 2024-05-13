import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const HomeThreeProjects = () => {
   // slick setting
   const settings = {
      autoplay: false,
      autoplaySpeed: 4000,
      dots: true,
      fade: false,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               initialSlide: 2
            }
         },
      ]
   }
   const testimonialData = [
      {
         id: 1,
         title: <h3><Link to="/portfolioDetails">NSDL instant Pan White Label </Link></h3>,
         img:"assets/img/project/project-1.png",
         description : "Instant Create Unlimited Retailers, Distributors, Super Distributors.instant NSDL Service Onboarding within a second No any onbording charges, apply Pancard OTP & Biometric Through."
      },
      {
         id: 2,
         title: <h3><Link to="/portfolioDetails">NSDL instant Pan Admin Panel</Link></h3>,
         img:"assets/img/project/project-2.png",
         description : "Instant Create Unlimited Retailers, Distributors, Super Distributors.instant NSDL Service Onboarding within a second No any onbording charges, apply Pancard OTP & Biometric Through."
      },
      {
         id: 3,
         title: <h3><Link to="/portfolioDetails">NSDL instant Pan API</Link></h3>,
         img: "assets/img/project/project-1.png",
         description : "Instant NSDL Service Onboarding within a second, No any Onboarding Charges, Developer Frindly API, Integration Support."
      },
      {
         id: 4,
         title: <h3><Link to="/portfolioDetails">Recharge API</Link></h3>,
         img: "assets/img/project/project-1.png",
         description : "Mobile Recharge, DTH Recharge, Google Play Voucher Recharge, 24*7 Online Auto Billing."
      },
      {
         id: 5,
         title: <h3><Link to="/portfolioDetails">Mobile Application NSDL Instant</Link></h3>,
         img: "assets/img/project/project-1.png",
         description : "Now Apply NSDL instant Pan in your Mobile with Aadhaar OTP Through,"
      },
      {
         id: 6,
         title: <h3><Link to="/portfolioDetails">Recharge White Label</Link></h3>,
         img: "assets/img/project/project-1.png",
         description : "We Are Providing Recharge White Label & Mobile Application, Mobile Recharge, DTH Recharge, Etc"
      },
   ]
   return (
      <>
         <section className="project__area pt-115 pb-120">
            <div className="container">
               <div className="row">
                  <div className="col-xl-7">
                     <div className="section-title section__title-3 mb-70">
                     <p>Our Services.</p>
                        <h2>What Solutions <br/>
We Provide</h2>
                        
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-xl-12">

                     <Slider className='project__slider' {...settings}>

                        {
                           testimonialData.map((testimonial, index) => {
                              return <div key={index} className="project__item grey-bg-19">
                                 <div className="project__content">
                                    <div className="project__no">
                                       <h5>{testimonial.id}</h5>
                                    </div>
                                    {testimonial.title}
                                    <p >{testimonial.description}</p>
                                 </div>
                                 <div className="project__thumb m-img">
                                    <img src={testimonial.img} alt="" />
                                 </div>
                              </div>
                           })
                        }

                     </Slider>

                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default HomeThreeProjects;