import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { LuTextSelect } from "react-icons/lu";
import { MdNumbers } from "react-icons/md";

const SAViewPackageModel = ({ packages }) => {
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
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4  px-3 pb-5">
                    <div className="text-center my-5">
                      <h2>Package Details</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Package Name
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="Package Name"
                          value={packages.package_name}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Package for
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder=""
                          value={packages.package_for}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline Services Price</h2>
                    </div>

                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" class="form-label">Select Commission Type</label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    class="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

                                                </select>
                                            </div>


                                        </div> */}

                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Electricity Bill Pay  Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    class="form-control"
                                                    placeholder="IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div> */}

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Google Play Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Google_Play_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        IRCTC Agent ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.IRCTC_Agent_ID_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Birth Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Birth_Certificate_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Death Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Death_Certificate_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        E-Stamp Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.E_Stamp_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        ITR Registration Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.ITR_Registration_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        GST Registration Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.GST_Registration_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Sambal Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Sambal_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Income Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Income_Certificate_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Domicile Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Domicile_Certificate_Price}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Bank_ID_Price}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline Services Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Commission Type
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          value={packages.Offline_Services_Commission_Type}
                          disabled
                        >
                          <option>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Electricity Bill Pay  Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    class="form-control"
                                                    placeholder="IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div> */}

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Google Play Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Google_Play_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        IRCTC Agent ID Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.IRCTC_Agent_ID_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Birth Certificate Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Birth_Certificate_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Death Certificate Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Death_Certificate_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        E-Stamp Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.E_Stamp_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        ITR Registration Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.ITR_Registration_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        GST Registration Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.GST_Registration_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Sambal Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Sambal_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Income Certificate Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Income_Certificate_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Domicile Certificate Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Domicile_Certificate_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Bank ID Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Bank_ID_Commission}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline Prepaid Recharge Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Off_Prepaid_Recharge_Comm_Type}
                          disabled
                        >
                          <option>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Airtel_Prepaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Jio Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Jio_Prepaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        VI Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Vi_Prepaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        BSNL Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Bsnl_Prepaid_Recharge_Comm}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline Postpaid Recharge Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Off_Postpaid_Recharge_Comm_Type}
                          disabled
                        >
                          <option>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Airtel_Postpaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Jio Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Jio_Postpaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        VI Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Vi_Postpaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        BSNL Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Bsnl_Postpaid_Recharge_Comm}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Online Prepaid Recharge Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.On_Prepaid_Recharge_Comm_Type}
                          disabled
                        >
                          <option>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Airtel_Prepaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Jio Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Jio_Prepaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        VI Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Vi_Prepaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        BSNL Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Bsnl_Prepaid_Recharge_Comm}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Online Postpaid Recharge Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.On_Postpaid_Recharge_Comm_Type}
                          disabled
                        >
                          <option>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Airtel_Postpaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Jio Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Jio_Postpaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        VI Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Vi_Postpaid_Recharge_Comm}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        BSNL Recharge Commision
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Bsnl_Postpaid_Recharge_Comm}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Online DTH Recharge Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Online_DTH_Recharge_Commission_Type}
                          disabled
                        >
                          <option>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Dish TV Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Dish_TV_Recharge_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Tata Sky Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Tata_Sky_Recharge_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Videocon Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Videocon_Recharge_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Sun Direct Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Sun_Direct_Recharge_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel DTH Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Airtel_Dth_Recharge_Commission}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline DTH Recharge Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Offline_DTH_Recharge_Commission_Type}
                          disabled
                        >
                          <option>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Dish TV Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Dish_TV_Recharge_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Tata Sky Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Tata_Sky_Recharge_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Videocon Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Videocon_Recharge_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Sun Direct Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Sun_Direct_Recharge_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel DTH Recharge Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Airtel_Dth_Recharge_Commission}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Online New DTH Connection Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Online_New_DTH_Connection_Commission_Type}
                          disabled
                        >
                          <option>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Dish TV Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Dish_TV_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Tata Sky Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Tata_Sky_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Videocon Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Videocon_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Sun Direct Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Sun_Direct_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel DTH Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.On_Airtel_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline New DTH Connection Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Offline_New_DTH_Connection_Commission_Type}
                          disabled
                        >
                          <option selected>Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Dish TV Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Dish_TV_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Tata Sky Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Tata_Sky_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Videocon Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Videocon_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Sun Direct Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Sun_Direct_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel DTH Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Off_Airtel_New_DTH_Connection_Commission}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>

                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Create Online Electricity Bill Pay Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Select Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          name="Online_Electricity_Bill_Pay_Commission_Type"
                          
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Online_Electricity_Bill_Pay_Commission_Type}
                          disabled
                        >
                          <option value="">
                            Select...
                          </option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Online Electricity Bill Pay Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Commission"
                          name="Online_Electricity_Bill_Pay_Commission"
                          value={packages.Online_Electricity_Bill_Pay_Commission}
                         
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Create Offline Electricity Bill Pay Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Select Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          name="Offline_Electricity_Bill_Pay_Commission_Type"
                          value={packages.Offline_Electricity_Bill_Pay_Commission_Type}
                          className="form-select"
                          aria-label="Default select example"
                          disabled
                        >
                          <option >
                            Select...
                          </option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Offline Electricity Bill Pay Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Commission"
                          name="Offline_Electricity_Bill_Pay_Commission"
                          value={packages.Offline_Electricity_Bill_Pay_Commission}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Online Insurance Pay Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Online_Insurance_Pay_Commission_Type}
                          disabled
                        >
                          <option >Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Insurance Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Online_Insurance_Pay_Commission}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline Insurance Pay Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={packages.Offline_Insurance_Pay_Commission_Type}
                          disabled
                        >
                          <option >Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Insurance Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="text"
                          id="name"
                          class="form-control"
                          placeholder="IFSC Code"
                          value={packages.Offline_Insurance_Pay_Commission}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Create PAN Card Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Select Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          name="PAN_Card_Commission_Type"
                          value={packages.PAN_Card_Commission_Type}
                          className="form-select"
                          aria-label="Default select example"
                          disabled
                          
                        >
                          <option>
                            Select...
                          </option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter UTI PAN Card Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Commission"
                          name="UTI_PAN_Card_Commission"
                          value={packages.UTI_PAN_Card_Commission}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter UTI PAN Coupon Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Commission"
                          name="UTI_PAN_Coupon_Commission"
                          value={packages.UTI_PAN_Coupon_Commission}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter NSDL PAN Card Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Commission"
                          name="NSDL_PAN_Card_Commission"
                          value={packages.NSDL_PAN_Card_Commission}
                          required
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    {/* <div className="text-center  m-5">
                      <button className="btn p-2">Submit</button>
                    </div> */}
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

export default SAViewPackageModel;

const Wrapper = styled.div``;
