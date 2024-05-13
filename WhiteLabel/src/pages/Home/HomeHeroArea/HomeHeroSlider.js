import React from 'react';
import Slider from 'react-slick';
import VideoPopup from '../../../components/VideoPopup/VideoPopup';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiChevronRightCircle } from "react-icons/bi";

const HomeHeroArea = () => {
   const { setIsVideoOpen} = useGlobalContext();
   // slider data
   const homeSliderData = [
      {
         id:1,
         bgImg:'home_slider_1',
      },
      {
         id: 2,
         bgImg:'home_slider_2',
      },
   ]
   // slick setting
   const settings = {
      autoplay: true,
      autoplaySpeed: 8000,
      speed: 500,
      infinite: true,
      dots: false,
      fade: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
   };

   return (
      <>
         <VideoPopup videoId="noqlNjPLMgc" />
         <section className="slider__area">
               <Slider className='slider-active' {...settings}>
                {
                  homeSliderData.map((slider,index) => {
                     return <div key={index} className={`single-slider slider__height d-flex align-items-center ${slider.bgImg}`}>
                        <div className="slider__shape">
                           <img className="shape triangle" src="assets/img/icon/slider/triangle.png" alt="triangle" />
                           <img className="shape dotted-square" src="assets/img/icon/slider/dotted-square.png" alt="dotted-square" />
                           <img className="shape solid-square" src="assets/img/icon/slider/solid-square.png" alt="solid-square" />
                           <img className="shape circle" src="assets/img/icon/slider/circle.png" alt="circle" />
                        </div>
                        <div className="container h1_slider_wrapper">
                           <div className="row">
                              <div className="col-xl-9 col-lg-9 col-md-10 col-sm-10">
                                 <div className="slider__content">
                                    <span>Fully Automatic</span>
                                    <h1>India's Leading PAN Card Portal</h1>
                                    {/* <ul>
                                       <li className='d-flex'>
                                          <div className='me-3'><i><BiChevronRightCircle/></i></div>
                                          <div> <p>Smart Portal for Smart People </p></div>
                                         
                                       </li>
                                       <li className='d-flex'>
                                       <div className='me-3'><i><BiChevronRightCircle/></i></div>
                                          <p>99% Uptime </p>
                                       </li>
                                       <li className='d-flex'>
                                       <div className='me-3'><i><BiChevronRightCircle/></i></div>
                                          <p>Best Commissions </p>
                                       </li>
                                       <li className='d-flex'>
                                       <div className='me-3'><i><BiChevronRightCircle/></i></div>
                                          <p>Fastest Fund Approval System </p>
                                       </li>
                                    </ul> */}
                                    <div className="slider__btn">
                                       {/* <Link to="/contact" className="z-btn z-btn-transparent">JOIN NOW</Link> */}
                                       <Link to="/" className="z-btn z-btn-transparent">JOIN NOW</Link>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2">
                                 <div className="slider__play">
                                    <button onClick={() => setIsVideoOpen(true)} className="slider__play-btn">
                                       <i> <FiPlay/> </i></button>
                                       <span className='text-white fs-5 ms-2'>Training Video</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  })
                }
               </Slider>
         </section>
      </>
   );
};

export default HomeHeroArea;