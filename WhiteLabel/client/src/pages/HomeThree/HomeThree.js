import React from 'react';
import CommonCtaArea from '../../components/CommonCtaArea/CommonCtaArea';
import PageHelmet from '../../components/shared/PageHelmet';
import HomeTwoTestimonial from '../HomeTwo/HomeTwoTestimonial/HomeTwoTestimonial';
import HomeThreeFaq from './HomeThreeFaq/HomeThreeFaq';
import HomeThreeFooter from './HomeThreeFooter/HomeThreeFooter';
import HomeThreeHeader from './HomeThreeHeader/HomeThreeHeader';
import HomeThreeHeroSection from './HomeThreeHeroSection/HomeThreeHeroSection';
import HomeThreeProjects from './HomeThreeProjects/HomeThreeProjects';
import HomeThreeSecondServices from './HomeThreeSecondServices/HomeThreeSecondServices';
import HomeThreeServices from './HomeThreeServices/HomeThreeServices';
import HomeTwoCounter from '../HomeTwo/HomeTwoCounter/HomeTwoCounter';
import HomePricing from '../Home/HomePricing/HomePricing';
import DownloadApp from '../../components/DownloadApp/DownloadApp';
import TrainingVideo from '../TrainingVideo/TrainingVideo';
import HomeContact from '../Home/HomeContact/HomeContact';
import Footer from '../../components/shared/Footer';
import BackToTop from '../../components/BackToTop/BackToTop';
import SendWhatsApp from '../../components/SendWhatsApp/SendWhatsApp';

const HomeThree = () => {
   return (
      <>
         <PageHelmet pageTitle="Home Three" />

         <HomeThreeHeader />
         <HomeThreeHeroSection />
         <HomeThreeServices />
         <HomeTwoCounter/>
         <HomeThreeSecondServices />
         <HomeThreeProjects />
         <CommonCtaArea />
         <HomeThreeFaq />
         <DownloadApp/>
         <HomePricing/>
         
         <HomeTwoTestimonial />
         <TrainingVideo/>
         <HomeContact/>
            <Footer/>
            <BackToTop/>
            <SendWhatsApp/>
         
         
         
         {/* <HomeThreeFooter /> */}
      </>
   );
};

export default HomeThree;