import React from 'react';
import HomeTwoSingleSlide from '../../../components/HomeTwoSingleSlide/HomeTwoSingleSlide';
import Slider from "react-slick";

const HomeTwoHeroSlider = () => {
   // slider setting
   const settings = {
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 500,
      infinite: true,
      dots: true,
      fade: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
   };

    return (
        <>
          <section className="slider__area slider__area-2">

             <Slider className='slider-active' {...settings}>

                <HomeTwoSingleSlide slider_class="col-xl-7 offset-xl-6 col-lg-8 offset-lg-4 col-md-9 offset-md-3 col-sm-10 offset-sm-2" content_class="" attr_1={<span >Welcome To Bitspan.in</span>} attr_2={<h1 >India's Leading PAN Card Portal </h1>} btn_text="JOIN NOW" image={1}/>

                <HomeTwoSingleSlide slider_class="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-9 offset-md-3 col-sm-10 offset-sm-2" content_class="slider__content-3 text-center" attr_1={<span >Welcome To Bitspan.in</span>} attr_2={<h1 >Smart Portal for Smart People </h1>} btn_text="JOIN NOW" image={2}/>

                <HomeTwoSingleSlide slider_class="col-xl-6" content_class="slider__content-4" attr_1={<span >Welcome To Bitspan.in</span>} attr_2={<h1 >Lets Join ! Become Our Family Member </h1>}  btn_text="JOIN NOW" image={3}/>

             </Slider>

          </section>
        </>
    );
};

export default HomeTwoHeroSlider;