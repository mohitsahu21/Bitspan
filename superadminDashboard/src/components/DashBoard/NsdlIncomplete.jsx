import React, { useState } from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const NsdlIncomplete = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    orderid: "",
  });

  const [loading, setLoading] = useState(false);
  const [redirectURL, setRedirectURL] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/nsdl-pan-incomplete`,
        formData
      );
      setFormData(data);
      console.log(data);
      if (data.status === "Success") {
        setRedirectURL(data.url);
        setShowModal(true);
      } else if (data.status === "Failure") {
        Swal.fire({
          icon: "error",
          title: "Orderid not found , please enter correct order id.",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-center justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata"
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>NSDL PAN Track Status</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Incomplete PAN Request
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Incomplete PAN Request
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow bg-body-tertiary rounded  py-5 m-4">
                      <form onSubmit={handleSubmit}>
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto">
                          <div class="input-group">
                            <span class="input-group-text">
                              <MdFormatListNumberedRtl />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Order ID"
                                name="orderid"
                                value={formData.orderid}
                                onChange={handleChange}
                                required
                              />
                              <label for="floatingInputGroup2">
                                Enter Order ID
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                          <div className="text-center">
                            <button
                              className="btn p-2"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Loading..." : "Submit"}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* Modal Code Start */}
                    <Modal
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Form Submitted</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <strong>Redirect URL:</strong>
                        <br />
                        <a
                          href={redirectURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {redirectURL}
                        </a>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="primary"
                          onClick={() => {
                            navigator.clipboard.writeText(redirectURL);
                            Swal.fire({
                              icon: "success",
                              title: "Link copied to clipboard!",
                            });
                          }}
                        >
                          Copy Link
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => window.open(redirectURL, "_blank")} // Open link in a new tab
                        >
                          Open Link
                        </Button>
                        {/* <Button
                          variant="secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </Button> */}
                      </Modal.Footer>
                    </Modal>
                    {/* Modal Code End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default NsdlIncomplete;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
  .guidline {
  }
  .list {
    list-style: none;
    padding-left: 0;
    font-size: 14px;
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
`;
