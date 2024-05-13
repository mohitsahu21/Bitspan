import React from 'react';
import SingleCount from '../../../components/SingleCount/SingleCount';

const HomeTwoCounter = () => {
    return (
        <>
            <section className="counter__area counter__area-2 pt-85 pb-85">
                <div className="container">
                    <div className="row">
                        <SingleCount counter={370} title="Whitelabel" color="blue-2-color" />
                        <SingleCount counter={1500} title="Super Distributor" color="pink-color" />
                        <SingleCount counter={6000} title="Distributor" color="green-4-color" />
                        <SingleCount counter={24000} title="Retailer" color="orange-color" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeTwoCounter;