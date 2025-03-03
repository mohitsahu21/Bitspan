import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const PanDocumentUpload = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
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
    const { name, files } = e.target;
    console.log(`File input changed - Name: ${name}, Files:`, files);
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (!allowedTypes.includes(files[0].type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: `Invalid file: ${files[0].name}. Only JPEG, JPG, PNG , PDF are allowed.`,
      });
      e.target.value = "";
      return;
    }
    if (files[0].size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: `File ${files[0].name} exceeds the 5MB limit.`,
      });
      e.target.value = "";
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (file) {
      formDataToSend.append("podfile", file); // Append file
    }

    try {
      const response = await axios.post(
        "https://2kadam.co.in/api/auth/retailer/panDocument",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "Success") {
        Swal.fire({
          title: "Done!",
          text: `${response.data.message}`,
          icon: "success",
        });
        setFormData({
          userId: "",
          agency: "",
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
      }
      console.log("Form submitted successfully: " + response.data.message);
    } catch (error) {
      console.error("Error uploading document:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      // alert("Error uploading document: " + error.message);
    } finally {
      setLoading(false);
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
                                    type="number"
                                    class="form-control"
                                    id="floatingInputGroup1"
                                    name="documentCount"
                                    value={formData.documentCount}
                                    onChange={handleChange}
                                    placeholder="Document Count"
                                    required
                                    min={1}
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                  required
                                ></textarea>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex  flex-column flex-xl-row gap-3">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div>
                                <label for="formFileLg" class="form-label">
                                  Tab to upload scan copy of POD
                                </label>
                                <input
                                  class="form-control form-control-lg"
                                  accept="image/*,application/pdf"
                                  id="formFileLg"
                                  type="file"
                                  onChange={handleFileChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="text-start mb-3">
                              <button
                                className="p-2 btn btn-primary"
                                type="submit"
                                disabled={loading}
                              >
                                {loading ? "Submit...." : "Submit"}
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
