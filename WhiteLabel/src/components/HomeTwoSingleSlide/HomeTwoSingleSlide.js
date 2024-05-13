import React from 'react';
import { Link } from 'react-router-dom';

const HomeTwoSingleSlide = ({ image,slider_class,content_class, attr_1, attr_2, attr_3 = "Fully Automatic",btn_text}) => {
   return (
      <>
         <div className="single-slider single-slider-2 slider__height slider__height-2 d-flex align-items-center" style={{
            background: `url(assets/img/slider/02/slider-${image}.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover' }}>

            <div className="container">
               <div className="row">
                  <div className={`${slider_class}`}>
                     <div className={`slider__content slider__content-2 ${content_class && content_class}`}>
                         {attr_1 && attr_1}
                         {attr_2}
                        <p >{attr_3}</p>
                        <div className="slider__btn">
                           <Link to="/contact" className="z-btn z-btn-transparent">{btn_text}</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default HomeTwoSingleSlide;