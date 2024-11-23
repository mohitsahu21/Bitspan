import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const PanDocumentUpload = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userId: currentUser.userId,
    agency: currentUser.BusinessName,
    applicationDetails: "",
    documentCount: "",
    courierDate: "",
    trackingNumber: "",
    courierCompany: "",
    deliveryDate: "",
    deliveryLocation: "",
    confirmAddress: "",
    remark: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (file) {
      formDataToSend.append("podfile", file); // Append file
    }

    try {
      const response = await axios.post(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/panDocument",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Form submitted successfully: " + response.data.message);
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Error uploading document: " + error.message);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-10 col-xl-9 col-lg-9 col-md-9 ms-md-5 ps-md-5 col-9
                             mt-5 "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-9">
                      {/* <div className="text-center">
                                                <h3>Upload Pan Card Document</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Upload Pan Card Document
                        </h4>
                        <h6 className="">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Upload Pan Card Document
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center ">
                    <div className="col-xxl-6 col-xl-9 col-lg-9 col-md-10 col-sm-9 shadow rounded m-4  px-5 py-5 bg-body-tertiary">
                      <form onSubmit={handleSubmit}>
                        <div className="row d-flex flex-column g-4">
                          <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    placeholder="User ID"
                                    required
                                    readOnly
                                  />
                                  <label for="floatingInputGroup1">
                                    Your User Id
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="agency"
                                    value={formData.agency}
                                    onChange={handleChange}
                                    placeholder="Agency"
                                    required
                                    readOnly
                                  />
                                  <label for="floatingInputGroup1">
                                    Agency
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="input-group">
                              <div>
                                <div class="mb-3">
                                  <label
                                    for="exampleFormControlTextarea1"
                                    class="form-label"
                                  >
                                    {" "}
                                    Application Details ( Input multiple
                                    application no and it should be (space)
                                    separated)
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    name="applicationDetails"
                                    value={formData.applicationDetails}
                                    onChange={handleChange}
                                    placeholder="Enter Appication Details"
                                    required
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="documentCount"
                                    value={formData.documentCount}
                                    onChange={handleChange}
                                    placeholder="Document Count"
                                    required
                                  />
                                  <label for="floatingInputGroup1">
                                    No. of Document
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group mb-3">
                                <div class="form-floating">
                                  <input
                                    type="date"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="courierDate"
                                    value={formData.courierDate}
                                    onChange={handleChange}
                                    placeholder="Courier Date"
                                  />
                                  <label for="floatingInputGroup1">
                                    Date of Courier
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="trackingNumber"
                                    value={formData.trackingNumber}
                                    onChange={handleChange}
                                    placeholder="Tracking Number"
                                  />
                                  <label for="floatingInputGroup1">
                                    POD/Tracking Number
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="courierCompany"
                                    value={formData.courierCompany}
                                    onChange={handleChange}
                                    placeholder="Courier Company"
                                  />
                                  <label for="floatingInputGroup1">
                                    Courier Company Name
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group mb-3">
                                <div class="form-floating">
                                  <input
                                    type="date"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="deliveryDate"
                                    value={formData.deliveryDate}
                                    onChange={handleChange}
                                    placeholder="Delivery Date"
                                  />
                                  <label for="floatingInputGroup1">
                                    Delivery Date
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="deliveryLocation"
                                    value={formData.deliveryLocation}
                                    onChange={handleChange}
                                    placeholder="Delivery Location"
                                  />
                                  <label for="floatingInputGroup1">
                                    Delivery Location
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center flex-column flex-xl-row gap-3">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="input-group">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="confirmAddress"
                                    value={formData.confirmAddress}
                                    onChange={handleChange}
                                    placeholder="Confirm Address"
                                  />
                                  <label for="floatingInputGroup1">
                                    Confirm the Address
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div class="mb-3">
                                <textarea
                                  class="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                  name="remark"
                                  value={formData.remark}
                                  onChange={handleChange}
                                  placeholder="Remark"
                                ></textarea>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex  flex-column flex-xl-row gap-3">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                              <div>
                                <label for="formFileLg" class="form-label">
                                  Tab to upload scan copy of POD
                                </label>
                                <input
                                  class="form-control form-control-lg"
                                  id="formFileLg"
                                  type="file"
                                  onChange={handleFileChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="text-start mb-3">
                              <button className="btn p-2" type="submit">
                                Upload
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
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

export default PanDocumentUpload;

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
`;
