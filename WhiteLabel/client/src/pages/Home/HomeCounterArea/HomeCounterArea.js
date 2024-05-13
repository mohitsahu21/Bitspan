import React from 'react';
import SingleCount from '../../../components/SingleCount/SingleCount';

const HomeCounterArea = () => {
   return (
      <>
         <section className="counter__area pb-100">
            <div className="container">
               <div className="counter__inner white-bg wow fadeInUp" data-wow-delay=".2s">
                  <div className="row">

                     <SingleCount counter={34} title="Whitelabel" />
                     <SingleCount counter={137} title="Super Distributor" />
                     <SingleCount counter={1648} title="Distributor" />
                     <SingleCount counter={6000} title="Retailer" />

                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default HomeCounterArea;