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
                        Offline E PAN Card Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="offline_E_PAN_Card_Price"
                          value={packages.offline_E_PAN_Card_Price}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Offline P PAN Card Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="offline_P_PAN_Card_Price"
                          value={packages.offline_P_PAN_Card_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Pan Find Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="Pan_Find_Price"
                          value={packages.Pan_Find_Price}
                          required
                        />
                      </div>
                    </div>

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
                        Udyog Aadhar Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="Udyog_Aadhar_Price"
                          value={packages.Udyog_Aadhar_Price}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        offline KYC e-District Service
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          name="offline_kyc_eDistrict"
                          value={packages.offline_kyc_eDistrict}
                          className="form-select"
                          aria-label="Default select example"
                          disabled
                        >
                          <option value="" selected>
                            Select...
                          </option>

                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        eKYC Income Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="eKYC_Income_Certificate_Price"
                          value={packages.eKYC_Income_Certificate_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        eKYC Domicile Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="eKYC_Domicile_Certificate_Price"
                          value={packages.eKYC_Domicile_Certificate_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        offline KYC Income Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="offlineKYC_Income_Certificate_Price"
                          value={packages.offlineKYC_Income_Certificate_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        offline KYC Domicile Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="offlineKYC_Domicile_Certificate_Price"
                          value={packages.offlineKYC_Domicile_Certificate_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Non Samagra Income Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="non_samagra_income_Certificate_Price"
                          value={packages.non_samagra_income_Certificate_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Non Samagra Domicile Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="non_samagra_Domicile_Certificate_Price"
                          value={
                            packages.non_samagra_Domicile_Certificate_Price
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Verify e-district Certificate Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="verify_edistrict_Certificate_Price"
                          value={packages.verify_edistrict_Certificate_Price}
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

                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Bank Id Price</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Ayushman ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="Ayushman_Id_Price"
                          value={packages.Ayushman_Id_Price}
                          required
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
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="IRCTC_Agent_ID_Price"
                          value={packages.IRCTC_Agent_ID_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        PayNearBy Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="PayNearBy_BankId_Price"
                          value={packages.PayNearBy_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Fino Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="Fino_BankId_Price"
                          value={packages.Fino_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Spice Money Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="SpiceMoney_BankId_Price"
                          value={packages.SpiceMoney_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Nsdl Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="Nsdl_BankId_Price"
                          value={packages.Nsdl_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Ezee pay Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="Ezeepay_BankId_Price"
                          value={packages.Ezeepay_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Religare Digipay Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="ReligareDigipay_BankId_Price"
                          value={packages.ReligareDigipay_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Airtel Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="Airtel_BankId_Price"
                          value={packages.Airtel_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Payworld Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="payworld_BankId_Price"
                          value={packages.payworld_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Anypay Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="Anypay_BankId_Price"
                          value={packages.Anypay_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Roinet Bank ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="Roinet_BankId_Price"
                          value={packages.Roinet_BankId_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        NSDL PSA ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="NSDL_PSA_ID_Price"
                          value={packages.NSDL_PSA_ID_Price}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        UTI PSA ID Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter price"
                          name="UTI_PSA_ID_Price"
                          value={packages.UTI_PSA_ID_Price}
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
                        Offline E PAN Card Commission
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
                          name="offline_E_PAN_Card_Commission"
                          value={packages.offline_E_PAN_Card_Commission}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Offline P PAN Card Commission
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
                          name="offline_P_PAN_Card_Commission"
                          value={packages.offline_P_PAN_Card_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Pan Find Commission
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
                          name="Pan_Find_Commission"
                          value={packages.Pan_Find_Commission}
                        />
                      </div>
                    </div>

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
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
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
                    </div> */}
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
                        Udyog Aadhar Commission
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
                          name="Udyog_Aadhar_Commission"
                          value={packages.Udyog_Aadhar_Commission}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        eKYC Income Certificate Commission
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
                          name="eKYC_Income_Certificate_Commission"
                          value={packages.eKYC_Income_Certificate_Commission}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        eKYC Domicile Certificate Commission
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
                          name="eKYC_Domicile_Certificate_Commission"
                          value={packages.eKYC_Domicile_Certificate_Commission}
                        />
                      </div>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                        Offline KYC Income Certificate Commission
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
                            name="offlineKYC_Income_Certificate_Commission"
                            value={packages.offlineKYC_Income_Certificate_Commission}
                           
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                        Offline KYC Domicile Certificate Commission
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
                            name="offlineKYC_Domicile_Certificate_Commission"
                            value={packages.offlineKYC_Domicile_Certificate_Commission}
                            
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                        Non samagra income Certificate Commission
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
                            name="non_samagra_income_Certificate_Commission"
                            value={packages.non_samagra_income_Certificate_Commission}
                           
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                         Non Samagra Domicile Certificate Commission
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
                            name="non_samagra_Domicile_Certificate_Commission"
                            value={packages.non_samagra_Domicile_Certificate_Commission}
                            
                            required
                          />
                        </div>
                      </div> */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Verify e-district Certificate Commission
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
                          name="verify_edistrict_Certificate_Commission"
                          value={
                            packages.verify_edistrict_Certificate_Commission
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
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
                    </div> */}

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
                          value={
                            packages.Online_New_DTH_Connection_Commission_Type
                          }
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
                          value={
                            packages.On_Dish_TV_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.On_Tata_Sky_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.On_Videocon_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.On_Sun_Direct_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.On_Airtel_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.Offline_New_DTH_Connection_Commission_Type
                          }
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
                          value={
                            packages.Off_Dish_TV_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.Off_Tata_Sky_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.Off_Videocon_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.Off_Sun_Direct_New_DTH_Connection_Commission
                          }
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
                          value={
                            packages.Off_Airtel_New_DTH_Connection_Commission
                          }
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
                      <h2>Online Broadband Bill Pay Commission</h2>
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
                          name="Online_Broadband_Bill_Pay_Commission_Type"
                          className="form-select"
                          aria-label="Default select example"
                          value={
                            packages.Online_Broadband_Bill_Pay_Commission_Type
                          }
                          disabled
                        >
                          <option value="">Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Online Broadband Bill Pay Commission
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
                          name="Online_Broadband_Bill_Pay_Commission"
                          value={packages.Online_Broadband_Bill_Pay_Commission}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline Broadband Bill Pay Commission</h2>
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
                          name="Offline_Broadband_Bill_Pay_Commission_Type"
                          value={
                            packages.Offline_Broadband_Bill_Pay_Commission_Type
                          }
                          className="form-select"
                          aria-label="Default select example"
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
                        Offline Broadband Bill Pay Commission
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
                          name="Offline_Broadband_Bill_Pay_Commission"
                          value={packages.Offline_Broadband_Bill_Pay_Commission}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Online Electricity Bill Pay Commission</h2>
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
                          value={
                            packages.Online_Electricity_Bill_Pay_Commission_Type
                          }
                          disabled
                        >
                          <option value="">Select...</option>

                          <option value="Percentage">Percentage (%)</option>
                          <option value="Rupees">Rupees (&#8377;)</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Online Electricity Bill Pay Commission
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
                          value={
                            packages.Online_Electricity_Bill_Pay_Commission
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline Electricity Bill Pay Commission</h2>
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
                          name="Offline_Electricity_Bill_Pay_Commission_Type"
                          value={
                            packages.Offline_Electricity_Bill_Pay_Commission_Type
                          }
                          className="form-select"
                          aria-label="Default select example"
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
                        Offline Electricity Bill Pay Commission
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
                          value={
                            packages.Offline_Electricity_Bill_Pay_Commission
                          }
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
                          <option>Select...</option>

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
                          <option>Select...</option>

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
                      <h2>PAN Card And DSC Price</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        E PAN Card Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="E_PAN_Card_Price"
                          value={packages.E_PAN_Card_Price}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        P PAN Card Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="P_PAN_Card_Price"
                          value={packages.P_PAN_Card_Price}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        PAN Coupon Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="UTI_PAN_Coupon_Price"
                          value={packages.UTI_PAN_Coupon_Price}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        DSC Coupon Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="DSC_token_Price"
                          value={packages.DSC_token_Price}
                          required
                          min={0}
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
                      <h2>PAN Card And DSC Commission</h2>
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
                          name="PAN_Card_Commission_Type"
                          value={packages.PAN_Card_Commission_Type}
                          className="form-select"
                          aria-label="Default select example"
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
                        E PAN Card Commission
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
                          name="E_PAN_Card_Commission"
                          value={packages.E_PAN_Card_Commission}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        PAN Coupon Commission
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
                        P PAN Card Commission
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
                          name="P_PAN_Card_Commission"
                          value={packages.P_PAN_Card_Commission}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter DSC Token Commission
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
                          name="DSC_Coupon_Commission"
                          value={packages.DSC_Coupon_Commission}
                          required
                          min={0}
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
                      <h2>Joining Price (for White Label)</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        White Label Joining Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="whitelabel_joining_price"
                          value={packages.whitelabel_joining_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Super Distributor Joining Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="superDistributor_joining_price"
                          value={packages.superDistributor_joining_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Distributor Joining Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="distributor_joining_price"
                          value={packages.distributor_joining_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Retailer Joining Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="retailer_joining_price"
                          value={packages.retailer_joining_price}
                          required
                          min={0}
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
                      <h2>User ID Price (For Create Users)</h2>
                    </div>

                    <div>
                      <h4>White Label ID Price</h4>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        White Label Id Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="whiteLabel_id_price"
                          value={packages.whiteLabel_id_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        White Label Minimum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter White Label Minimum Id limit"
                          name="whiteLabel_min_id_limit"
                          value={packages.whiteLabel_min_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        White Label Maximum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter White Label Maximum Id limit"
                          name="whiteLabel_max_id_limit"
                          value={packages.whiteLabel_max_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div>
                      <h4>Super Distributor ID Price</h4>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Super Distributor Id Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="superDistributor_id_price"
                          value={packages.superDistributor_id_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Super Distributor Minimum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Super Distributor Minimum Id limit"
                          name="superDistributor_min_id_limit"
                          value={packages.superDistributor_min_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Super Distributor Maximum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Super Distributor Maximum Id limit"
                          name="superDistributor_max_id_limit"
                          value={packages.superDistributor_max_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div>
                      <h4>Distributor ID Price</h4>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Distributor Id Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="distributor_id_price"
                          value={packages.distributor_id_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Distributor Minimum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Distributor Minimum Id limit"
                          name="distributor_min_id_limit"
                          value={packages.distributor_min_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Distributor Maximum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Distributor Maximum Id limit"
                          name="distributor_max_id_limit"
                          value={packages.distributor_max_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div>
                      <h4>Retailer ID Price</h4>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Retailer Id Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="retailer_id_price"
                          value={packages.retailer_id_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Retailer Minimum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Retailer Minimum Id limit"
                          name="retailer_min_id_limit"
                          value={packages.retailer_min_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Retailer Maximum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder=" Enter Retailer Maximum Id limit"
                          name="retailer_max_id_limit"
                          value={packages.retailer_max_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                              <div className="text-center  mb-5 mt-3">
                                                                  <button className="btn p-2">Change</button>
                                                              </div>
                                                          </div> */}
                  </div>

                  {/* ---XXXX--- Add Find Services Start ---XXXX--- */}
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Digital Signature Pay Commission</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Selected Commission Type
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <LuTextSelect />
                        </span>
                        <select
                          name="DSC_Commission_Type"
                          value={packages.DSC_Commission_Type}
                          className="form-select"
                          aria-label="Default select example"
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
                        DSC Commission
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="DSC_Commission"
                          value={packages.DSC_Commission}
                          required
                          min={0}
                        />
                      </div>
                    </div>
                  </div>
                  {/* ---XXXX--- Add Find Services End ---XXXX--- */}

                  {/* ---**--- Add Find Services Start ---**--- */}
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Find Services Price</h2>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Aadhar Details Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="aadhar_price"
                          value={packages.aadhar_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Find Pan by Aadhaar Number Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="pan_aadhar_price"
                          value={packages.pan_aadhar_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Pan Details Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="pan_price"
                          value={packages.pan_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        RC Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="rc_price"
                          value={packages.rc_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        RC Download Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="rc_download_price"
                          value={packages.rc_download_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Voter Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="ration_price"
                          value={packages.ration_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Driving Licence Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="dl_price"
                          value={packages.dl_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Passport Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="passport_price"
                          value={packages.passport_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        GST Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <MdNumbers />
                        </span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Price"
                          name="gst_price"
                          value={packages.gst_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>
                  </div>
                  {/* ---**--- Add Find Services End ---**--- */}
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
