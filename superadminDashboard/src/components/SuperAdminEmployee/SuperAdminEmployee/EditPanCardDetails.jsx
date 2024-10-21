import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

const EditPanCardDetails = ({ onClose, pancardInfo }) => {
  const [loading, setLoading] = useState(false);
  console.log(pancardInfo);

  return (
    <>
      <Wrapper className="container">
        <>
          <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="w-100">
                {" "}
                <form>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Application Type:
                        </label>
                        <select
                          name=""
                          id=""
                          className="form-control text-capitalize"
                        >
                          <option value="">-select-</option>
                          <option value="Major">Major</option>
                          <option value="Minor">Minor</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Patient Name:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Name"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Father Name:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Father Name"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Mother Name:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Mother Name"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Date of Birth:</label>
                        <input
                          type="date"
                          value=""
                          placeholder="Enter Mother Name"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Gender:</label>
                        <select
                          name=""
                          id=""
                          className="form-control text-capitalize"
                        >
                          <option value="">-select-</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Address:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Address"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Aadhar Number:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Aadhar Number"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Alternate Address:
                        </label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Alternate Address"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Mobile:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Mobile Number"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Email:</label>
                        <input
                          type="email"
                          value=""
                          placeholder="Enter Email Address"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Pin code:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Pin Code"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">State:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter State"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">KYC Document:</label>
                        <input
                          type="text"
                          value=""
                          placeholder="Enter Pin Code"
                          className="form-control text-capitalize"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Wrapper>
    </>
  );
};

export default EditPanCardDetails;
const Wrapper = styled.div``;
