import React, { useState } from "react";
import { Link } from 'react-router-dom';

const LoginForm = () => {
 
  return (
    <div>
      <section className="contact__help  p-relative custom">
        <div className="contact__shape">
          <img className="dot" src="assets/img/icon/contact/dot.png" alt="" />
          <img
            className="shape"
            src="assets/img/icon/contact/shape.png"
            alt=""
          />
        </div>
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-10 col-lg-5 col-xl-5">
              <div
                className="card shadow card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className=" pb-md-0  text-center">
                    Sign in to account
                  </h3>
                  <p className="text-center">Enter your User ID & password to login</p>
                  <form>
                    <div className="row">
                      <div className="col-md-12 mb-4 mx-auto">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                           User ID
                          </label>
                          <input
                            type="text"
                            id="Name"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                      
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="emailAddress">
                            Password
                          </label>
                          <input
                            type="password"
                            id="emailAddress"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                    
                    </div>

                    

                    <div className="mt-2 pt-2 text-center">
                      <input
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Sign in"
                      />
                    </div>
                    <div className="mt-2 pt-2 text-center">
                     <Link to='/register'><p>Forgot password ? </p></Link> 
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
