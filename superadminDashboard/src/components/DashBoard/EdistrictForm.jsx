import React from "react";
import styled from "styled-components";

const EdistrictForm = () => {
  return (
    <Wrapper>
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-wrap justify-content-center">
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
              <div className="container mt-4">
                <div className="col-12 d-flex justify-content-center">
                  <div className="border border-danger rounded shadow-sm mb-3">
                    <h2 className="text-center m-0 px-5 py-3">E District</h2>
                  </div>
                </div>
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Select Application</label>
                      <select className="form-select">
                        <option value="income">Income</option>
                        <option value="domicile">Domicile</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Samagar</label>
                      <select className="form-select">
                        <option value="ekyc">Ekyc</option>
                        <option value="non-ekyc">Non Ekyc</option>
                        <option value="non">Non</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Gender</label>
                      <select className="form-select">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Father / Husband Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>DOB</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="House No, Village, Gram Panchayat, Post, Block, District, Pincode"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Mobile No.</label>
                      <input type="tel" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Cast</label>
                      <select className="form-select">
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                        <option value="obc">OBC</option>
                        <option value="general">General</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>UID - Aadhar No.</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Samagar Member ID</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>State</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Annual Income</label>
                      <input type="number" className="form-control" />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label>Have you ever applied before?</label>
                      <select className="form-select">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Document Upload</label>
                      <input type="file" className="form-control" multiple />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                      <label>Charge Amount</label>
                      <select className="form-select">
                        <option value="ekyc">Ekyc</option>
                        <option value="non-ekyc">Non Ekyc</option>
                        <option value="non">Non</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary mb-4">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EdistrictForm;
const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  @media (min-width: 1025px) and (max-width: 1500px) {
    .formdata {
      padding-left: 15rem;
    }
  }
  @media (min-width: 1500px) {
    .formdata {
      padding-left: 13rem;
    }
  }
  .custom-dropdown {
    font-size: 16px;
    border-radius: 5px;
  }

  .custom-dropdown option {
    background-color: #e8e4f0;
    color: #343a40;
  }
`;
