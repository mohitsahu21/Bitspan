import React from 'react';
import { BiLock } from 'react-icons/bi';
import { CgArrowLongRight } from 'react-icons/cg';
import { FaLightbulb, FaRibbon } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import HomeTwoSingleFeature from '../../../components/HomeTwoSingleFeature/HomeTwoSingleFeature';

const HomeTwoFeatures = () => {
   return (
      <>
         <section className="features__area pt-115 pb-120">
            <div className="container">
               <div className="row">
                  <div className="col-xl-5 col-lg-6">
                     <div className="features__content-left">
                        <div className="section__title section__title-h2 mb-25">
                           <span >Our Key Features</span>
                           <h2>We Unlock Potential </h2>
                        </div>
                        {/* <p>Do one plastered chinwag only a quid squiffy bugger all mate, the little rotter horse play.</p>
                        <Link to="/about" className="z-btn">What we do<i><CgArrowLongRight/></i></Link> */}
                     </div>
                  </div>
                  <div className="col-xl-6 offset-xl-1 col-lg-6">
                     <div className="features__content-right">
                        <div className="row">
                           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">

                              <HomeTwoSingleFeature icon={<FaLightbulb />} title="Smart Portal for Smart People
" />
                              <HomeTwoSingleFeature icon={<IoDocumentTextOutline />} title="99% Uptime" />

                           </div>

                           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">

                              <HomeTwoSingleFeature icon={<FaRibbon />} title="Best Commissions" />
                              <HomeTwoSingleFeature icon={<BiLock />} title="Fastest Fund Approval System" />

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default HomeTwoFeatures;