import React from 'react';
import useToggle from '../../Hooks/useToggle.js';
import BackToTop from '../BackToTop.jsx';
import ServicesHomeOne from '../HomeOne/ServicesHomeOne.jsx';
import TestimonialHomeOne from '../HomeOne/TestimonialHomeOne.jsx';
import FooterHomeThree from '../HomeThree/FooterHomeThree.jsx';
import ProjectHomeThree from '../HomeThree/ProjectHomeThree.jsx';
import CounterArea from '../HomeTwo/CounterArea.jsx';
import VideoPlayerHomeTwo from '../HomeTwo/VideoPlayerHomeTwo.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import FeaturesHomeFour from './FeaturesHomeFour.jsx';
import HeaderHomeFour from './HeaderHomeFour.jsx';
import HeroHomeFour from './HeroHomeFour.jsx';
import WhatWeDo from './WhatWeDo.jsx';
import PricingHomeFour from './PricingHomeFour.jsx';
import DownloadHomeTwo from '../HomeTwo/DownloadHomeTwo.jsx';
import DownloadHomeFour from './DownloadHomeFour.jsx';
import FooterHomeTwo from '../HomeTwo/FooterHomeTwo.jsx';

function HomeFour() {
    const [drawer, drawerAction] = useToggle(false);
    return (
        <>

            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderHomeFour action={drawerAction.toggle} />
            <HeroHomeFour />
            <ServicesHomeOne className="pt-190" />
            <FeaturesHomeFour />
            <CounterArea style={{ backgroundColor: '#EEF1F6' }} />
            <WhatWeDo/>
            
            
            <PricingHomeFour/>
            <VideoPlayerHomeTwo className="pt-100" />
            
            {/* <ProjectHomeThree className="home-four-project" /> */}
            <TestimonialHomeOne />
            <DownloadHomeFour/>
            {/* <FooterHomeThree className="home-four-footer" /> */}
            <FooterHomeTwo />
            <BackToTop className="back-to-top-3" />
        </>
    );
}

export default HomeFour;
