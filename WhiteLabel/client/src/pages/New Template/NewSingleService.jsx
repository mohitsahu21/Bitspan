import React from "react";
import { Link } from "react-router-dom";

const NewSingleService = ({ icon, title, description }) => {
  return (
    <>
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
        <div className="services__item mb-90 ">
          <div className="services__icon mb-35">
            <img
              src={`assets/img/icon/services/services-${icon}.png`}
              alt="services"
            />
          </div>
          <div className="services__content">
            <h3>
              <Link to="#">{title}</Link>
            </h3>
            <hr />
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSingleService;
