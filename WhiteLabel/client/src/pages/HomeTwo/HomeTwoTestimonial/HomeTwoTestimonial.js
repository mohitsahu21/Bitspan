import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const HomeTwoTestimonial = () => {
  // slick setting
  const settings = {
    autoplay: false,
    autoplaySpeed: 10000,
    dots: true,
    fade: false,
    arrows: false,
  };
  const testimonialData = [
    {
      id: 1,
      name: "Ashish Kumar",
      title: "Founder and CEO",
    },
    // {
    //    id:2,
    //    name:'Shahnewaz Sakil',
    //    title:'Developer',
    // },
  ];

  return (
    <>
      <Wrapper>
        <section className="testimoinal__area" id="testimonial-Section">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-6">
                <div className="testimonial__content pt-165 pb-175">
                  <div className="section__title section__title-3 mb-30">
                    <span className="white-color">WHO WE ARE?</span>
                    <h2 className="white-color">About Us</h2>
                  </div>

                  <Slider className="testimonial__slider pb-70" {...settings}>
                    {testimonialData.map((testimonial, index) => {
                      return (
                        <div key={index} className="testimonial__item">
                          <p className="white-color">
                            BITS PAN SERVICE CENTER PROVIDER. Now PAN CARD is
                            mandatory for all citizens in India. We are
                            providing a smart business solution. PAN AGENCY is
                            working two years over in India.There are more than
                            six thousands Retailers-Distributors & Super
                            Distributors is working now smoothly.
                          </p>
                          <div className="testimonial__content d-flex align-items-center">
                            <div className="quote mr-20">
                              <img
                                src="assets/img/icon/testimonial/quote.png"
                                alt="quote"
                              />
                            </div>
                            <div className="testimonial__info">
                              <h4 className="white-color">
                                {testimonial.name}
                              </h4>
                              <span className="white-color">
                                {testimonial.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
              <div className="col-xl-7 col-lg-6">
                <div className="testimonial__thumb m-img text-end pt-120 ">
                  <img
                    src="assets/img/testimonial/testimonial-4.png"
                    alt="testimonbial"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default HomeTwoTestimonial;
const Wrapper = styled.div`
  #testimonial-Section {
    background: linear-gradient(332deg, #c0c0c0, #1e9ebd);
  }
`;
