import React, { useState } from "react";

const RegisterForm = () => {
  const [fees, setFees] = useState("");

  const handleFees = (e) => {
    const value = e.target.value;
    if (value === "RETAILER") {
        setFees(10)
    } else if (value === "DISTRIBUTER") {
        setFees(100)
    } else if (value === "SUPER DISTRIBUTER") {
        setFees(200)
    } else if (value === "WHITE LABEL") {
        setFees(5500)
    }
    else if(value === "")
        {
            setFees("")   
        }
  };
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
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                    Registration Form
                  </h3>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                            Name
                          </label>
                          <input
                            type="text"
                            id="Name"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 ">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="mobileNumber">
                            Mobile No.
                          </label>
                          <input
                            type="tel"
                            id="mobileNumber"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="emailAddress">
                            Email
                          </label>
                          <input
                            type="email"
                            id="emailAddress"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="panCard">
                            Pan Card
                          </label>
                          <input
                            type="text"
                            id="panCard"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="city">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="city">
                            Aadhaar No.
                          </label>
                          <input
                            type="text"
                            id="city"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="Shop">
                            Shop / Company Name
                          </label>
                          <input
                            type="text"
                            id="Shop"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label
                            for="region"
                            className="form-label select-label"
                          >
                            Select a State or Union Territory in India:
                          </label>
                          <select
                            id="region"
                            name="region"
                            className="form-select form-select-lg"
                          >
                            <option value="">
                              Select a state or union territory...
                            </option>
                            <optgroup label="States">
                              <option value="Andhra Pradesh">
                                Andhra Pradesh
                              </option>
                              <option value="Arunachal Pradesh">
                                Arunachal Pradesh
                              </option>
                              <option value="Assam">Assam</option>
                              <option value="Bihar">Bihar</option>
                              <option value="Chhattisgarh">Chhattisgarh</option>
                              <option value="Goa">Goa</option>
                              <option value="Gujarat">Gujarat</option>
                              <option value="Haryana">Haryana</option>
                              <option value="Himachal Pradesh">
                                Himachal Pradesh
                              </option>
                              <option value="Jharkhand">Jharkhand</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Kerala">Kerala</option>
                              <option value="Madhya Pradesh">
                                Madhya Pradesh
                              </option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Manipur">Manipur</option>
                              <option value="Meghalaya">Meghalaya</option>
                              <option value="Mizoram">Mizoram</option>
                              <option value="Nagaland">Nagaland</option>
                              <option value="Odisha">Odisha</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Rajasthan">Rajasthan</option>
                              <option value="Sikkim">Sikkim</option>
                              <option value="Tamil Nadu">Tamil Nadu</option>
                              <option value="Telangana">Telangana</option>
                              <option value="Tripura">Tripura</option>
                              <option value="Uttar Pradesh">
                                Uttar Pradesh
                              </option>
                              <option value="Uttarakhand">Uttarakhand</option>
                              <option value="West Bengal">West Bengal</option>
                            </optgroup>
                            <optgroup label="Union Territories">
                              <option value="Andaman and Nicobar Islands">
                                Andaman and Nicobar Islands
                              </option>
                              <option value="Chandigarh">Chandigarh</option>
                              <option value="Dadra and Nagar Haveli">
                                Dadra and Nagar Haveli
                              </option>
                              <option value="Daman and Diu">
                                Daman and Diu
                              </option>
                              <option value="Lakshadweep">Lakshadweep</option>
                              <option value="Delhi">Delhi</option>
                              <option value="Puducherry">Puducherry</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* <div className="col-12">
                        <select className="select form-control-lg">
                          <option value="1" disabled>
                            Choose option
                          </option>
                          <option value="2">Subject 1</option>
                          <option value="3">Subject 2</option>
                          <option value="4">Subject 3</option>
                        </select>
                        <label className="form-label select-label">
                          Choose option
                        </label>
                      </div> */}
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="pincode">
                            Pincode
                          </label>
                          <input
                            type="text"
                            id="pincode"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label
                            for="region"
                            className="form-label select-label"
                          >
                            Select a State or Union Territory in India:
                          </label>
                          <select
                            id="region"
                            name="region"
                            className="form-select form-select-lg"
                            onChange={(e) => handleFees(e)}
                          >
                            <option value="">Select User Type...</option>

                            <option value="RETAILER">RETAILER</option>
                            <option value="DISTRIBUTER">DISTRIBUTER</option>
                            <option value="SUPER DISTRIBUTER">
                              SUPER DISTRIBUTER
                            </option>
                            <option value="WHITE LABEL">WHITE LABEL</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label
                            for="region"
                            className="form-label select-label"
                          >
                            Select Payment Mode
                          </label>
                          <select
                            id="region"
                            name="region"
                            className="form-select form-select-lg"
                          >
                            <option value="">Select Payment Mode...</option>

                            <option value="Online Payment">
                              Online Payment
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="pincode">
                            Fee in Rupees
                          </label>
                          <input
                            type="text"
                            id="pincode"
                            className="form-control form-control-lg"
                            value={fees}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    

                    <div className="mt-4 pt-2 text-center">
                      <input
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                      />
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

export default RegisterForm;
