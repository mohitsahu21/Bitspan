import React, { useState } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { IoMail, IoPerson } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";

const NewBankID = () => {
  const [fileError, setFileError] = useState("");
  const [selectOption, setSelectOption] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: "",
    applicant_father: "",
    applicant_mother: "",
    applicant_number: "",
    email: "",
    applicant_select_service: "",
    aadhar_card: "",
    pan_card: "",
    business_name: "",
    attached_photo: null,
    attached_kyc: [],
    bank_passbook: null,
    shop_photo: null,
    electric_bill: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "attached_kyc") {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  // const handleSelect = (e) => {
  //   const selectItem = e.target.value;
  //   setSelectOption(selectItem === "E-Stamp");
  // };

  const validateForm = () => {
    const errors = {};
    if (!formData.applicant_name) errors.applicant_name = "Name is required";
    if (!formData.applicant_father)
      errors.applicant_father = "Father's name is required";
    if (!formData.applicant_mother)
      errors.applicant_father = "Mother's name is required";
    if (!formData.applicant_number)
      errors.applicant_number = "Number is required";
    if (!formData.email) errors.email = "Email ID is required";
    if (!formData.applicant_select_service)
      errors.applicant_select_service = "Service selection is required";
    if (!formData.aadhar_card) errors.aadhar_card = "Aadhar Card is required";
    if (!formData.pan_card) errors.pan_card = "Pan Card is required";
    if (!formData.business_name)
      errors.business_name = "Business / Shop name is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setFileError("Please fill all required fields.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("applicant_name", formData.applicant_name);
    formDataObj.append("applicant_father", formData.applicant_father);
    formDataObj.append("applicant_mother", formData.applicant_mother);
    formDataObj.append("applicant_number", formData.applicant_number);
    formDataObj.append("email", formData.email);
    formDataObj.append(
      "applicant_select_service",
      formData.applicant_select_service
    );
    formDataObj.append("aadhar_card", formData.aadhar_card);
    formDataObj.append("pan_card", formData.pan_card);
    formDataObj.append("business_name", formData.business_name);
    if (formData.attached_photo)
      formDataObj.append("attached_photo", formData.attached_photo);
    formData.attached_kyc.forEach((file) => {
      formDataObj.append("attached_kyc", file);
    });
    if (formData.bank_passbook)
      formDataObj.append("bank_passbook", formData.bank_passbook);
    if (formData.bank_passbook)
      formDataObj.append("shop_photo", formData.shop_photo);
    if (formData.electric_bill)
      formDataObj.append("electric_bill", formData.electric_bill);
    try {
      const response = await axios.post(
        `http://localhost:7777/api/auth/retailer/bankidForm`,
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const optionsDrop = [
    { id: 1, name: "Pan Card Form" },
    { id: 2, name: "Income" },
    { id: 3, name: "Domicile" },
    { id: 4, name: "Birth Certificate" },
    { id: 5, name: "Death Certificate" },
    { id: 6, name: "Pan Find" },
    { id: 7, name: "E-Stamp" },
    { id: 8, name: "ITR Registration" },
    { id: 9, name: "GST Registration" },
    { id: 10, name: "Udyog Aadhar" },
    { id: 11, name: "Pan Card Services" },
    { id: 12, name: "New Bank ID" },
  ];

  return (
    <Wrapper>
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-wrap justify-content-center">
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
              <div className="main shadow-none">
                <div className="row shadow-none">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="px-lg-3">New Bank ID</h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; New Bank ID
                      </h6>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <IoPerson />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup1"
                            placeholder="Username"
                            name="applicant_name"
                            value={formData.applicant_name}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup1">
                            Applicant Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <IoMail />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup2"
                            placeholder="Username"
                            name="applicant_father"
                            value={formData.applicant_father}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup2">
                            Applicant Father Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <IoMail />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup2"
                            placeholder="Username"
                            name="applicant_mother"
                            value={formData.applicant_mother}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup2">
                            Applicant Mother Name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup3"
                            placeholder="Username"
                            name="applicant_number"
                            value={formData.applicant_number}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup3">
                            Applicant Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup3"
                            placeholder="Username"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup3">Email ID</label>
                        </div>
                      </div>
                    </div>
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
                            name="applicant_select_service"
                            value={formData.applicant_select_service}
                            onChange={(e) => {
                              handleChange(e);
                              handleSelect(e);
                            }}
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
                    {/* {selectOption && (
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaMobileAlt />
                          </span>
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInputGroup4"
                              placeholder="Username"
                              name="other"
                              value={formData.other}
                              onChange={handleChange}
                            />
                            <label htmlFor="floatingInputGroup4">
                              E-Stamp Type
                            </label>
                          </div>
                        </div>
                      </div>
                    )} */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaMobileAlt />
                        </span>
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup3"
                            placeholder="Username"
                            name="aadhar_card"
                            value={formData.aadhar_card}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInputGroup3">
                            aadhar_card
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg1" className="form-label">
                          Attachment Form (PDF only)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg1"
                          type="file"
                          name="attached_form"
                          accept="application/pdf"
                          onChange={handleFileChange}
                        />
                        {fileError && (
                          <p className="text-danger fs-6">{fileError}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg2" className="form-label">
                          Attachment Photo (JPG, JPEG, PNG)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg2"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          name="attached_photo"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg3" className="form-label">
                          Attachment Signature (JPG, JPEG, PNG)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg3"
                          type="file"
                          name="attached_sign"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label htmlFor="formFileLg4" className="form-label">
                          Attachment KYC (JPG, JPEG, PNG)
                        </label>
                        <input
                          className="form-control form-control-lg"
                          id="formFileLg4"
                          type="file"
                          name="attached_kyc"
                          multiple
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-start mb-3">
                        <button className="btn p-2" type="submit">
                          Submit
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
    </Wrapper>
  );
};

export default NewBankID;

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
