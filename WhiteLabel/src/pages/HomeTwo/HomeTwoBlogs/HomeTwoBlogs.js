import React from 'react';
import HomeTwoSingleBlog from '../../../components/HomeTwoSingleBlog/HomeTwoSingleBlog';
import { CgArrowLongRight } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import SinglePrice from '../../../components/SinglePrice/SinglePrice';
import HomeTwoSinglePrice from '../../../components/HomeTwoSinglePrice/HomeTwoSinglePrice';

const HomeTwoBlogs = () => {
   return (
      <>
         <section className="blog__area  pt-115 pb-135">
            <div className="container">
               <div className="row">
                  <div className="col-xl-5">
                     <div className="section__title section__title-3 mb-65">
                        {/* <span>Latest News</span> */}
                        <h2>What We Serve To You</h2>
                        <p>A Retailer can start a PAN center with minimum investment only. Retailer can makes unlimited PAN cards through proper channel. A Distributor can makes unlimited PAN cards.He/She can create unlimited Retailers with low cost investment only. T&C apply. Super Distributor can makes unlimited PAN cards.He/She can create unlimited Distributors & Retailers with low cost investment.</p>
                     </div>
                  </div>
               </div>
               
               <div className="row">

                  {/* <HomeTwoSingleBlog date="24" name="Elon Gated" desc="The Start-Up Ultimate Guide to Make Your WordPress Journal." />
                  <HomeTwoSingleBlog date="12" name="Lance Bogrol" desc="Businesses Are Thriving, Societies Are Not. Time for
                  Urgent Change" />
                  <HomeTwoSingleBlog date="10" name="Shahnewaz Sakil" desc="For Banks, Modernizing Technology Has Become a Perpetual Challenge" /> */}
                  <HomeTwoSinglePrice title="Own Brand Portal" price="5500" description="Start Own brand portal with own website.Here you can access your control panel & manage Retailers, Distributors, Super Distributors"/>
                           <HomeTwoSinglePrice title="Super Distributor" price="200" description="Super Distributor can makes unlimited PAN cards.He/She can create unlimited Distributors & Retailers with low cost investment.T&C apply." active="" />
                           <HomeTwoSinglePrice title="Distributor" price="100" description="A Distributor can makes unlimited PAN cards.He/She can create unlimited Retailers with low cost investment only."/>
                           <HomeTwoSinglePrice title="Retailer" price="10" description="A Retailer can start a PAN center with minimum investment only.Retailer can makes unlimited PAN cards through proper channel."/>

               </div>
               {/* <div className="row">
                  <div className="col-xl-12">
                     <div className="blog__more mt-60">
                        <Link to="/blogs" className="z-btn z-btn-border">View all News
                           <i > <CgArrowLongRight /> </i>
                        </Link>
                     </div>
                  </div>
               </div> */}
            </div>
         </section>
      </>
   );
};

export default HomeTwoBlogs;