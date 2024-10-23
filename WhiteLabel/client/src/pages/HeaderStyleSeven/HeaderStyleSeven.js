import React from "react";
import CommonCtaArea from "../../components/CommonCtaArea/CommonCtaArea";
import PageHelmet from "../../components/shared/PageHelmet";
import HomeThreeFaq from "../HomeThree/HomeThreeFaq/HomeThreeFaq";
import HomeThreeFooter from "../HomeThree/HomeThreeFooter/HomeThreeFooter";
import HomeThreeHeroSection from "../HomeThree/HomeThreeHeroSection/HomeThreeHeroSection";
import HomeThreeProjects from "../HomeThree/HomeThreeProjects/HomeThreeProjects";
import HomeThreeSecondServices from "../HomeThree/HomeThreeSecondServices/HomeThreeSecondServices";
import HomeThreeServices from "../HomeThree/HomeThreeServices/HomeThreeServices";
import HomeTwoTestimonial from "../HomeTwo/HomeTwoTestimonial/HomeTwoTestimonial";
import StyleHeaderSeven from "./StyleHeaderSeven/StyleHeaderSeven";
import HomeNewSection from "../New Template/HomeNewSection";
import HomeCardTemplate from "../New Template/HomeCardTemplate";
import HomeServices from "../Home/HomeServices/HomeServices";
import NewWhatWeDo from "../New Template/NewWhatWeDo";
import NewCommonCtaArea from "../New Template/NewCommonCtaArea";

const HeaderStyleSeven = () => {
  return (
    <>
      <PageHelmet pageTitle="Header Style Seven" />

      <StyleHeaderSeven />
      {/* <HomeThreeHeroSection /> */}
      <HomeNewSection />
      {/* <HomeThreeServices /> */}
      <HomeCardTemplate />
      {/* <HomeServices /> */}
      <HomeThreeSecondServices />
      <HomeTwoTestimonial />
      {/* <HomeThreeProjects /> */}
      {/* <HomeThreeFaq /> */}
      <NewWhatWeDo />
      {/* <CommonCtaArea /> */}
      <NewCommonCtaArea />
      <HomeThreeFooter />
    </>
  );
};

export default HeaderStyleSeven;
