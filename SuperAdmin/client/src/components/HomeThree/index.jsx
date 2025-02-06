import React from "react";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";
import Drawer from "../Mobile/Drawer.jsx";
import AboutHomeThree from "./AboutHomeThree.jsx";
import BlogHomeThree from "./BlogHomeThree.jsx";
import DownloadHomeThree from "./DownloadHomeThree.jsx";
import FooterHomeThree from "./FooterHomeThree.jsx";
import FunFactHomeThree from "./FunFactHomeThree.jsx";
import HeaderHomeThree from "./HeaderHomeThree.jsx";
import HeroHomeThree from "./HeroHomeThree.jsx";
import ProjectHomeThree from "./ProjectHomeThree.jsx";
import ServicesHomeThree from "./ServicesHomeThree.jsx";
import ShowCaseHomeThree from "./ShowCaseHomeThree.jsx";
import ServicesHomeTwo from "../HomeTwo/ServicesHomeTwo.jsx";
import WhatWeDo from "../HomeTwo/WhatWeDo.jsx";
import FooterHomeTwo from "../HomeTwo/FooterHomeTwo.jsx";
import HeaderHomeTwo from "../HomeTwo/HeaderHomeTwo.jsx";
import MyModal from "../Modal/MyModal.jsx";
import Forms from "../Contact/Forms.jsx";

function HomeThree({ homePage }) {
  console.log(homePage);
  const [drawer, drawerAction] = useToggle(false);
  return (
    <>
      <Drawer
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      <HeaderHomeThree action={drawerAction.toggle} homePage={homePage} />
      {/* <HeaderHomeTwo action={drawerAction.toggle} /> */}

      <HeroHomeThree homePage={homePage} />

      <section id="join">
        <ServicesHomeThree homePage={homePage} />
      </section>

      <ServicesHomeTwo homePage={homePage} />
      <WhatWeDo homePage={homePage} />
      <FunFactHomeThree homePage={homePage} />
      {/* <AboutHomeThree /> */}
      {/* <ShowCaseHomeThree /> */}
      <BlogHomeThree />
      <DownloadHomeThree />
      <Forms homePage={homePage} />
      {/* <ProjectHomeThree /> */}
      <FooterHomeTwo homePage={homePage} />
      <MyModal />
      {/* <FooterHomeThree /> */}
      <BackToTop className="back-to-top-3" />
    </>
  );
}

export default HomeThree;
