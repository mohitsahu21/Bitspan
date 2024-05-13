import React from 'react';
import CommonCtaArea from '../../components/CommonCtaArea/CommonCtaArea';
import PageHelmet from '../../components/shared/PageHelmet';
import HomeTwoAchievement from './HomeTwoAchievement/HomeTwoAchievement';
import HomeTwoBlogs from './HomeTwoBlogs/HomeTwoBlogs';
import HomeTwoCaseArea from './HomeTwoCaseArea/HomeTwoCaseArea';
import HomeTwoCounter from './HomeTwoCounter/HomeTwoCounter';
import HomeTwoExpertArea from './HomeTwoExpertArea/HomeTwoExpertArea';
import HomeTwoFaq from './HomeTwoFaq/HomeTwoFaq';
import HomeTwoFeatures from './HomeTwoFeatures/HomeTwoFeatures';
import HomeTwoFooter from './HomeTwoFooter/HomeTwoFooter';
import HomeTwoHeader from './HomeTwoHeader/HomeTwoHeader';
import HomeTwoHeroSlider from './HomeTwoHeroSlider/HomeTwoHeroSlider';
import HomeTwoTestimonial from './HomeTwoTestimonial/HomeTwoTestimonial';
import WhatWeDo from '../Home/HomeWhatWeDo/WhatWeDo';
import HomeTwoWhatWeDo from './HomeTwoWhatWeDo/HomeTwoWhatWeDo';
import BankDetails from '../../components/BankDetails/BankDetails';
import DownloadApp from '../../components/DownloadApp/DownloadApp';
import TrainingVideo from '../TrainingVideo/TrainingVideo';
import HomeContact from '../Home/HomeContact/HomeContact';
import Footer from '../../components/shared/Footer';
import BackToTop from '../../components/BackToTop/BackToTop';
import SendWhatsApp from '../../components/SendWhatsApp/SendWhatsApp';

const HomeTwo = () => {
   return (
      <>
         <PageHelmet pageTitle="Home Two" />

         <HomeTwoHeader/>
         <HomeTwoHeroSlider/>
         <HomeTwoFeatures/>
         <HomeTwoFaq/>
         {/* <HomeTwoAchievement/> */}
         <HomeTwoExpertArea/>
         <HomeTwoCounter/>
        
         {/* <HomeTwoTestimonial/> */}
         {/* <HomeTwoCaseArea/> */}
         <HomeTwoWhatWeDo/>
         <CommonCtaArea/>
        
         <HomeTwoBlogs/>
         <DownloadApp/>
         <TrainingVideo/>
         {/* <BankDetails/> */}
         <HomeContact/>
            <Footer/>
            <BackToTop/>
            <SendWhatsApp/>
         
         {/* <HomeTwoFooter/> */}
      </>
   );
};

export default HomeTwo;