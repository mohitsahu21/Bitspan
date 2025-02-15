import React, { useEffect } from "react";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";
import FooterHomeOne from "../HomeOne/FooterHomeOne.jsx";
import Drawer from "../Mobile/Drawer.jsx";
import HeaderNews from "../News/HeaderNews.jsx";
import HeroNews from "../News/HeroNews.jsx";
import Forms from "./Forms.jsx";
import HeaderHomeTwo from "../HomeTwo/HeaderHomeTwo.jsx";
import FooterHomeTwo from "../HomeTwo/FooterHomeTwo.jsx";
import HeaderHomeThree from "../HomeThree/HeaderHomeThree.jsx";
import HeaderHomeFour from "../HomeFour/HeaderHomeFour.jsx";
import ScrollingInfo from "../Info/ScrollingInfo.jsx";

function Contact({ homePage }) {
  console.log(homePage);
  // function Contact() {
  const [drawer, drawerAction] = useToggle(false);
  useEffect(() => {
    console.log("🔥 Updated homePage in Contact:", homePage);
  }, [homePage]);

  return (
    <>
      <Drawer
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      <HeaderNews
        drawer={drawer}
        action={drawerAction.toggle}
        homePage={homePage}
      />
      {/* <HeaderHomeTwo action={drawerAction.toggle} /> */}
      {/* <HeaderHomeThree action={drawerAction.toggle} /> */}

      {/* Conditional Rendering for Header */}
      {/* {
        homePage == 1 ? (
          <HeaderHomeTwo action={drawerAction.toggle} />
        ) : homePage == 2 ? (
          <HeaderHomeThree action={drawerAction.toggle} />
        ) : homePage == 3 ? (
          <HeaderHomeFour action={drawerAction.toggle} />
        ) : null
      } */}

      <HeroNews
        title="Contact Us"
        breadcrumb={[
          { link: "/", title: "home" },
          { link: "/contact", title: "Contact Us" },
        ]}
      />
      <Forms homePage={homePage} />
      <FooterHomeTwo homePage={homePage} />
      {/* <BackToTop className="back-to-top-2 mb-2" /> */}
      {/* <ScrollingInfo /> */}
    </>
  );
}

export default Contact;
