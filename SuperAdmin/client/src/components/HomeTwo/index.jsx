import React from "react";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";
import Drawer from "../Mobile/Drawer.jsx";
import AboutHomeTwo from "./AboutHomeTwo.jsx";
import CounterArea from "./CounterArea.jsx";
import DownloadHomeTwo from "./DownloadHomeTwo.jsx";
import FeaturesHomeTwo from "./FeaturesHomeTwo.jsx";
import FooterHomeTwo from "./FooterHomeTwo.jsx";
import HeaderHomeTwo from "./HeaderHomeTwo.jsx";
import HeroHomeTwo from "./HeroHomeTwo.jsx";
import PricingHomeTwo from "./PricingHomeTwo.jsx";
import ServicesHomeTwo from "./ServicesHomeTwo.jsx";
import SponserHomeTwo from "./SponserHomeTwo.jsx";
import TestimonialHomeTwo from "./TestimonialHomeTwo.jsx";
import VideoPlayerHomeTwo from "./VideoPlayerHomeTwo.jsx";
import WhatWeDo from "./WhatWeDo.jsx";
// import Forms from "../Contact/Forms.jsx";
import Forms from "../Contact/Forms.jsx";
import ScrollingInfo from "../Info/ScrollingInfo.jsx";
import MyModal from "../Modal/MyModal.jsx";

function HomeTwo({ homePage }) {
  console.log(homePage);
  const [drawer, drawerAction] = useToggle(false);
  return (
    <>
      <Drawer
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      <HeaderHomeTwo action={drawerAction.toggle} homePage={homePage} />

      <HeroHomeTwo homePage={homePage} />

      <section id="about">
        <CounterArea homePage={homePage} />
      </section>

      <section id="Services">
        <ServicesHomeTwo homePage={homePage} />
      </section>

      {/* <AboutHomeTwo /> */}
      <section id="#">
        <FeaturesHomeTwo homePage={homePage} />
      </section>

      <section id="#">
        <WhatWeDo homePage={homePage} />
      </section>

      <section id="join">
        <PricingHomeTwo homePage={homePage} />
      </section>

      <section id="#">
        <VideoPlayerHomeTwo homePage={homePage} />
      </section>

      <section id="#">
        <DownloadHomeTwo />
      </section>

      <section id="#">
        <TestimonialHomeTwo />
      </section>
      <section id="contacts">
        <Forms homePage={homePage} />
      </section>
      {/* <SponserHomeTwo /> */}
      <FooterHomeTwo homePage={homePage} />
      <MyModal />

      <BackToTop className="back-to-top-2 mb-2" />
      {/* <ScrollingInfo /> */}
    </>
  );
}

export default HomeTwo;
