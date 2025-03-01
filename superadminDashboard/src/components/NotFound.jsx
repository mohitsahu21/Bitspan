import React from "react";
import { useNavigate } from "react-router-dom";
import Svg from "./Svg";
// import Svg from "./components/Svg";

const NotFound = () => {
  const history = useNavigate();
  const goBack = (e) => {
    e.preventDefault();
    history(-1);
  };
  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-12 mx-auto">
            <div className="appie-error-content">
              <Svg />
              <span className="text-danger fs-4 fw-bold">Sorry!</span>
              <h3 className="title fs-2 fw-bold">The page can’t be found.</h3>
              <p className="text-muted">
                The page you're looking for isn't available. Use the go back
                button below.
              </p>
              <a
                onClick={(e) => goBack(e)}
                href="/"
                className="btn btn-danger mt-3"
              >
                Go Back <i className="fas fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound