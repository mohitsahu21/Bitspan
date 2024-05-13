import React from 'react';
import HomeSingleFeature from '../../../components/HomeSingleFeature/HomeSingleFeature';
import { FiBook, FiLock} from 'react-icons/fi';
import { FaLightbulb, FaRibbon } from 'react-icons/fa';
import { BsHouseDoor } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';

const HomeFeatures = () => {
   return (
      <>
         <section className="features__area pb-100 mt--100 wow fadeInUp" data-wow-delay=".5s">
            <div className="container">
               <div className="features__inner fix">
                  <div className="row g-0 ">

                     <HomeSingleFeature icon={<FiBook />} title="Smart Portal for Smart People" />
                     <HomeSingleFeature icon={<FaLightbulb />} title="99% Uptime" />
                     <HomeSingleFeature icon={<BsHouseDoor />} title="Best Commissions" />
                     <HomeSingleFeature icon={<IoDocumentTextOutline />} title="Fastest Fund Approval System" />
                     {/* <HomeSingleFeature icon={<FiLock />} title="Mobile Application NSDL Instant Pan" />
                     <HomeSingleFeature icon={<FaRibbon />} title="Recharge White Label" /> */}

                  </div>
               </div>
            </div>
         </section>

      </>
   );
};

export default HomeFeatures;