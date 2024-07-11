import React, { useState } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { IoMail } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";

const PanForm = () => {
  const [fileError, setFileError] = useState("");
  const [selectOption, setSelectOption] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type !== "application/pdf") {
      setFileError("Only PDF files are allowed.");
    } else {
      setFileError("");
    }
  };

  const optionsDrop = [
    {
      id: 1,
      name: "Pan Card Form",
    },
    {
      id: 2,
      name: "Income",
    },
    {
      id: 3,
      name: "Domicile",
    },
    {
      id: 4,
      name: "Birth Certificate",
    },
    {
      id: 5,
      name: "Death Certificate",
    },
    {
      id: 6,
      name: "Pan Find",
    },
    {
      id: 7,
      name: "E-Stamp",
    },
    {
      id: 8,
      name: "ITR Registration",
    },
    {
      id: 9,
      name: "GST Registration",
    },
    {
      id: 10,
      name: "Udyog Aadhar",
    },
    {
      id: 11,
      name: "Pan Card Services",
    },
    {
      id: 12,
      name: "New Bank ID",
    },
  ];

  const handleSelect = (e) => {
    const selectItem = e.target.value;
    setSelectOption(selectItem === "E-Stamp");
  };
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-start">
                        <h3>Raise Complaint</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Apply Pan Card Offline</h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Apply Pan Card Offline
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    {/* <div className="text-center">
                      <h4>Apply Pan Card Offline </h4>
                    </div> */}
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="form-floating">
                        <select
                          class="form-select"
                          id="floatingSelect"
                          aria-label="Floating label select example"
                        >
                          <option selected>Select complaint type</option>
                          <option value="1">Coupon Issue</option>
                          <option value="2">UTI PAN Debit</option>
                          <option value="3">UTI PAN Refund</option>
                          <option value="3">Nsdl Refund</option>
                          <option value="3">Recharge Refund</option>
                          <option value="3">Account Support</option>
                          <option value="3">Report a Bug</option>
                          <option value="3">Feature Support</option>
                          <option value="3">API Support</option>
                          <option value="3">Others</option>
                        </select>
                        <label for="floatingSelect">Complaint Type</label>
                      </div>
                    </div> */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <IoPerson />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">
                            Applicant Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <IoMail />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">
                            Applicant Father Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="input-group">
                        <span class="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">
                            Applicant Number
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div class="input-group">
                        <span class="input-group-text">
                          <RiMarkPenLine />
                        </span>
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                          />
                          <label for="floatingInputGroup1">Remarks</label>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <RiMarkPenLine />
                        </span>
                        <div className="form-floating">
                          <select
                            className="form-select custom-dropdown"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                            onChange={handleSelect}
                          >
                            <option value="">Select an option ....</option>
                            {optionsDrop.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="floatingSelect">Choose Option</label>
                        </div>
                      </div>
                    </div>
                    {selectOption && (
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="floatingInputGroup1">Other</label>
                        <div class="input-group">
                          <span class="input-group-text">
                            <FaMobileAlt />
                          </span>
                          <div class="form-floating">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInputGroup1"
                              placeholder="Username"
                            />
                            <label for="floatingInputGroup1">
                              E-Stamp type{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label for="formFileLg" class="form-label">
                          Attachment Form
                        </label>
                        <input
                          class="form-control form-control-lg"
                          id="formFileLg"
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="m-2">
                        {fileError && (
                          <p className="text-danger fs-6">{fileError}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label for="formFileLg" class="form-label">
                          Attachment Photo
                        </label>
                        <input
                          class="form-control form-control-lg"
                          id="formFileLg"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label for="formFileLg" class="form-label">
                          Attachment Signature
                        </label>
                        <input
                          class="form-control form-control-lg"
                          id="formFileLg"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label for="formFileLg" class="form-label">
                          Attachment KYC
                        </label>
                        <input
                          class="form-control form-control-lg"
                          id="formFileLg"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start mb-3">
                        <button className="btn p-2">Submit</button>
                      </div>
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

export default PanForm;

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
    /* padding: 8px 12px; */
    font-size: 16px; /* Example font size */
    border-radius: 5px; /* Example border radius */
  }

  .custom-dropdown option {
    background-color: #e8e4f0; /* Example option background color */
    color: #343a40; /* Example option text color */
  }
`;
