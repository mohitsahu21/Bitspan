import React from "react";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";
import ServicesHomeOne from "../HomeOne/ServicesHomeOne.jsx";
import TestimonialHomeOne from "../HomeOne/TestimonialHomeOne.jsx";
import FooterHomeThree from "../HomeThree/FooterHomeThree.jsx";
import ProjectHomeThree from "../HomeThree/ProjectHomeThree.jsx";
import CounterArea from "../HomeTwo/CounterArea.jsx";
import VideoPlayerHomeTwo from "../HomeTwo/VideoPlayerHomeTwo.jsx";
import Drawer from "../Mobile/Drawer.jsx";
import FeaturesHomeFour from "./FeaturesHomeFour.jsx";
import HeaderHomeFour from "./HeaderHomeFour.jsx";
import HeroHomeFour from "./HeroHomeFour.jsx";
import WhatWeDo from "./WhatWeDo.jsx";
import PricingHomeFour from "./PricingHomeFour.jsx";
import DownloadHomeTwo from "../HomeTwo/DownloadHomeTwo.jsx";
import DownloadHomeFour from "./DownloadHomeFour.jsx";
import FooterHomeTwo from "../HomeTwo/FooterHomeTwo.jsx";
import ScrollingInfo from "../Info/ScrollingInfo.jsx";
import Forms from "../Contact/Forms.jsx";
import MyModal from "../Modal/MyModal.jsx";

function HomeFour({ homePage }) {
  console.log(homePage);
  const [drawer, drawerAction] = useToggle(false);
  return (
    <>
      <Drawer
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      <HeaderHomeFour action={drawerAction.toggle} homePage={homePage} />
      <HeroHomeFour homePage={homePage} />
      <ServicesHomeOne className="pt-190" />
      <FeaturesHomeFour />
      <CounterArea style={{ backgroundColor: "#EEF1F6" }} homePage={homePage} />
      <WhatWeDo homePage={homePage} />

      <section id="join">
        <PricingHomeFour homePage={homePage} />
      </section>
      <VideoPlayerHomeTwo className="pt-100" homePage={homePage} />

      {/* <ProjectHomeThree className="home-four-project" /> */}
      <TestimonialHomeOne />
      <DownloadHomeFour />
      <Forms homePage={homePage} />
      {/* <FooterHomeThree className="home-four-footer" /> */}
      <FooterHomeTwo homePage={homePage} />
      <MyModal />
      <BackToTop className="back-to-top-3 mb-2" />
      {/* <ScrollingInfo /> */}
    </>
  );
}

export default HomeFour;
