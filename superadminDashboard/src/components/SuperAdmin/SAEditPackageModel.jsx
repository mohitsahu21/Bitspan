import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { LuTextSelect } from "react-icons/lu";
import { MdNumbers } from "react-icons/md";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SAEditPackageModel = ({
  packages,
  setEditPackgeDetail,
  setIsRefresh,
}) => {
  const options = [
    { value: "WhiteLabel", label: "White Label" },
    { value: "SuperDistributor", label: "Super Distributor" },
    { value: "Distributor", label: "Distributor" },
    { value: "Retailer", label: "Retailer" },
  ];

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [formData, setFormData] = useState({
    packageId: packages.id,
    package_name: packages.package_name,
    package_for: packages.package_for, // This will store the selected options
    offline_E_PAN_Card_Price: packages.offline_E_PAN_Card_Price,
    offline_P_PAN_Card_Price: packages.offline_P_PAN_Card_Price,
    Pan_Find_Price: packages.Pan_Find_Price,
    Google_Play_Price: packages.Google_Play_Price,
    Birth_Certificate_Price: packages.Birth_Certificate_Price,
    Death_Certificate_Price: packages.Death_Certificate_Price,
    E_Stamp_Price: packages.E_Stamp_Price,
    ITR_Registration_Price: packages.ITR_Registration_Price,
    GST_Registration_Price: packages.GST_Registration_Price,
    Sambal_Price: packages.Sambal_Price,
    Udyog_Aadhar_Price: packages.Udyog_Aadhar_Price,
    offline_kyc_eDistrict: packages.offline_kyc_eDistrict,
    eKYC_Income_Certificate_Price: packages.eKYC_Income_Certificate_Price,
    eKYC_Domicile_Certificate_Price: packages.eKYC_Domicile_Certificate_Price,
    offlineKYC_Income_Certificate_Price:
      packages.offlineKYC_Income_Certificate_Price,
    offlineKYC_Domicile_Certificate_Price:
      packages.offlineKYC_Domicile_Certificate_Price,
    non_samagra_income_Certificate_Price:
      packages.non_samagra_income_Certificate_Price,
    non_samagra_Domicile_Certificate_Price:
      packages.non_samagra_Domicile_Certificate_Price,
    verify_edistrict_Certificate_Price:
      packages.verify_edistrict_Certificate_Price,
    Ayushman_Id_Price: packages.Ayushman_Id_Price,
    IRCTC_Agent_ID_Price: packages.IRCTC_Agent_ID_Price,
    PayNearBy_BankId_Price: packages.PayNearBy_BankId_Price,
    Fino_BankId_Price: packages.Fino_BankId_Price,
    SpiceMoney_BankId_Price: packages.SpiceMoney_BankId_Price,
    Nsdl_BankId_Price: packages.Nsdl_BankId_Price,
    Ezeepay_BankId_Price: packages.Ezeepay_BankId_Price,
    ReligareDigipay_BankId_Price: packages.ReligareDigipay_BankId_Price,
    Airtel_BankId_Price: packages.Airtel_BankId_Price,
    payworld_BankId_Price: packages.payworld_BankId_Price,
    Anypay_BankId_Price: packages.Anypay_BankId_Price,
    Roinet_BankId_Price: packages.Roinet_BankId_Price,
    NSDL_PSA_ID_Price: packages.NSDL_PSA_ID_Price,
    UTI_PSA_ID_Price: packages.UTI_PSA_ID_Price,
    Offline_Services_Commission_Type: packages.Offline_Services_Commission_Type,
    offline_E_PAN_Card_Commission: packages.offline_E_PAN_Card_Commission,
    offline_P_PAN_Card_Commission: packages.offline_P_PAN_Card_Commission,
    Pan_Find_Commission: packages.Pan_Find_Commission,
    Google_Play_Commission: packages.Google_Play_Commission,
    IRCTC_Agent_ID_Commission: packages.IRCTC_Agent_ID_Commission,
    Birth_Certificate_Commission: packages.Birth_Certificate_Commission,
    Death_Certificate_Commission: packages.Death_Certificate_Commission,
    E_Stamp_Commission: packages.E_Stamp_Commission,
    ITR_Registration_Commission: packages.ITR_Registration_Commission,
    GST_Registration_Commission: packages.GST_Registration_Commission,
    Sambal_Commission: packages.Sambal_Commission,
    Udyog_Aadhar_Commission: packages.Udyog_Aadhar_Commission,
    eKYC_Income_Certificate_Commission:
      packages.eKYC_Income_Certificate_Commission,
    eKYC_Domicile_Certificate_Commission:
      packages.eKYC_Domicile_Certificate_Commission,
    offlineKYC_Income_Certificate_Commission:
      packages.offlineKYC_Income_Certificate_Commission,
    offlineKYC_Domicile_Certificate_Commission:
      packages.offlineKYC_Domicile_Certificate_Commission,
    non_samagra_income_Certificate_Commission:
      packages.non_samagra_income_Certificate_Commission,
    non_samagra_Domicile_Certificate_Commission:
      packages.non_samagra_Domicile_Certificate_Commission,
    verify_edistrict_Certificate_Commission:
      packages.verify_edistrict_Certificate_Commission,
    Bank_ID_Commission: packages.Bank_ID_Commission,
    Off_Prepaid_Recharge_Comm_Type: packages.Off_Prepaid_Recharge_Comm_Type,
    Off_Airtel_Prepaid_Recharge_Comm: packages.Off_Airtel_Prepaid_Recharge_Comm,
    Off_Jio_Prepaid_Recharge_Comm: packages.Off_Jio_Prepaid_Recharge_Comm,
    Off_Vi_Prepaid_Recharge_Comm: packages.Off_Vi_Prepaid_Recharge_Comm,
    Off_Bsnl_Prepaid_Recharge_Comm: packages.Off_Bsnl_Prepaid_Recharge_Comm,
    Off_Postpaid_Recharge_Comm_Type: packages.Off_Postpaid_Recharge_Comm_Type,
    Off_Airtel_Postpaid_Recharge_Comm:
      packages.Off_Airtel_Postpaid_Recharge_Comm,
    Off_Jio_Postpaid_Recharge_Comm: packages.Off_Jio_Postpaid_Recharge_Comm,
    Off_Vi_Postpaid_Recharge_Comm: packages.Off_Vi_Postpaid_Recharge_Comm,
    Off_Bsnl_Postpaid_Recharge_Comm: packages.Off_Bsnl_Postpaid_Recharge_Comm,
    On_Prepaid_Recharge_Comm_Type: packages.On_Prepaid_Recharge_Comm_Type,
    On_Airtel_Prepaid_Recharge_Comm: packages.On_Airtel_Prepaid_Recharge_Comm,
    On_Jio_Prepaid_Recharge_Comm: packages.On_Jio_Prepaid_Recharge_Comm,
    On_Vi_Prepaid_Recharge_Comm: packages.On_Vi_Prepaid_Recharge_Comm,
    On_Bsnl_Prepaid_Recharge_Comm: packages.On_Bsnl_Prepaid_Recharge_Comm,
    On_Postpaid_Recharge_Comm_Type: packages.On_Postpaid_Recharge_Comm_Type,
    On_Airtel_Postpaid_Recharge_Comm: packages.On_Airtel_Postpaid_Recharge_Comm,
    On_Jio_Postpaid_Recharge_Comm: packages.On_Jio_Postpaid_Recharge_Comm,
    On_Vi_Postpaid_Recharge_Comm: packages.On_Vi_Postpaid_Recharge_Comm,
    On_Bsnl_Postpaid_Recharge_Comm: packages.On_Bsnl_Postpaid_Recharge_Comm,
    Online_DTH_Recharge_Commission_Type:
      packages.Online_DTH_Recharge_Commission_Type,
    On_Dish_TV_Recharge_Commission: packages.On_Dish_TV_Recharge_Commission,
    On_Tata_Sky_Recharge_Commission: packages.On_Tata_Sky_Recharge_Commission,
    On_Videocon_Recharge_Commission: packages.On_Videocon_Recharge_Commission,
    On_Sun_Direct_Recharge_Commission:
      packages.On_Sun_Direct_Recharge_Commission,
    On_Airtel_Dth_Recharge_Commission:
      packages.On_Airtel_Dth_Recharge_Commission,
    Offline_DTH_Recharge_Commission_Type:
      packages.Offline_DTH_Recharge_Commission_Type,
    Off_Dish_TV_Recharge_Commission: packages.Off_Dish_TV_Recharge_Commission,
    Off_Tata_Sky_Recharge_Commission: packages.Off_Tata_Sky_Recharge_Commission,
    Off_Videocon_Recharge_Commission: packages.Off_Videocon_Recharge_Commission,
    Off_Sun_Direct_Recharge_Commission:
      packages.Off_Sun_Direct_Recharge_Commission,
    Off_Airtel_Dth_Recharge_Commission:
      packages.Off_Airtel_Dth_Recharge_Commission,
    Online_New_DTH_Connection_Commission_Type:
      packages.Online_New_DTH_Connection_Commission_Type,
    On_Dish_TV_New_DTH_Connection_Commission:
      packages.On_Dish_TV_New_DTH_Connection_Commission,
    On_Tata_Sky_New_DTH_Connection_Commission:
      packages.On_Tata_Sky_New_DTH_Connection_Commission,
    On_Videocon_New_DTH_Connection_Commission:
      packages.On_Videocon_New_DTH_Connection_Commission,
    On_Sun_Direct_New_DTH_Connection_Commission:
      packages.On_Sun_Direct_New_DTH_Connection_Commission,
    On_Airtel_New_DTH_Connection_Commission:
      packages.On_Airtel_New_DTH_Connection_Commission,
    Offline_New_DTH_Connection_Commission_Type:
      packages.Offline_New_DTH_Connection_Commission_Type,
    Off_Dish_TV_New_DTH_Connection_Commission:
      packages.Off_Dish_TV_New_DTH_Connection_Commission,
    Off_Tata_Sky_New_DTH_Connection_Commission:
      packages.Off_Tata_Sky_New_DTH_Connection_Commission,
    Off_Videocon_New_DTH_Connection_Commission:
      packages.Off_Videocon_New_DTH_Connection_Commission,
    Off_Sun_Direct_New_DTH_Connection_Commission:
      packages.Off_Sun_Direct_New_DTH_Connection_Commission,
    Off_Airtel_New_DTH_Connection_Commission:
      packages.Off_Airtel_New_DTH_Connection_Commission,
    Online_Broadband_Bill_Pay_Commission_Type:
      packages.Online_Broadband_Bill_Pay_Commission_Type,
    Online_Broadband_Bill_Pay_Commission:
      packages.Online_Broadband_Bill_Pay_Commission,
    Offline_Broadband_Bill_Pay_Commission_Type:
      packages.Offline_Broadband_Bill_Pay_Commission_Type,
    Offline_Broadband_Bill_Pay_Commission:
      packages.Offline_Broadband_Bill_Pay_Commission,
    Online_Electricity_Bill_Pay_Commission_Type:
      packages.Online_Electricity_Bill_Pay_Commission_Type,
    Online_Electricity_Bill_Pay_Commission:
      packages.Online_Electricity_Bill_Pay_Commission,
    Offline_Electricity_Bill_Pay_Commission_Type:
      packages.Offline_Electricity_Bill_Pay_Commission_Type,
    Offline_Electricity_Bill_Pay_Commission:
      packages.Offline_Electricity_Bill_Pay_Commission,
    Online_Insurance_Pay_Commission_Type:
      packages.Online_Insurance_Pay_Commission_Type,
    Online_Insurance_Pay_Commission: packages.Online_Insurance_Pay_Commission,
    Offline_Insurance_Pay_Commission_Type:
      packages.Offline_Insurance_Pay_Commission_Type,
    Offline_Insurance_Pay_Commission: packages.Offline_Insurance_Pay_Commission,
    E_PAN_Card_Price: packages.E_PAN_Card_Price,
    P_PAN_Card_Price: packages.P_PAN_Card_Price,
    UTI_PAN_Coupon_Price: packages.UTI_PAN_Coupon_Price,
    DSC_token_Price: packages.DSC_token_Price,
    PAN_Card_Commission_Type: packages.PAN_Card_Commission_Type,
    E_PAN_Card_Commission: packages.E_PAN_Card_Commission,
    UTI_PAN_Coupon_Commission: packages.UTI_PAN_Coupon_Commission,
    DSC_Coupon_Commission: packages.DSC_Coupon_Commission,
    P_PAN_Card_Commission: packages.P_PAN_Card_Commission,
    whitelabel_joining_price: packages.whitelabel_joining_price,
    retailer_joining_price: packages.retailer_joining_price,
    superDistributor_joining_price: packages.superDistributor_joining_price,
    distributor_joining_price: packages.distributor_joining_price,
    whiteLabel_id_price: packages.whiteLabel_id_price,
    whiteLabel_min_id_limit: packages.whiteLabel_min_id_limit,
    whiteLabel_max_id_limit: packages.whiteLabel_max_id_limit,
    superDistributor_id_price: packages.superDistributor_id_price,
    superDistributor_min_id_limit: packages.superDistributor_min_id_limit,
    superDistributor_max_id_limit: packages.superDistributor_max_id_limit,
    distributor_id_price: packages.distributor_id_price,
    distributor_min_id_limit: packages.distributor_min_id_limit,
    distributor_max_id_limit: packages.distributor_max_id_limit,
    retailer_id_price: packages.retailer_id_price,
    retailer_min_id_limit: packages.retailer_min_id_limit,
    retailer_max_id_limit: packages.retailer_max_id_limit,
    DSC_Commission_Type: packages.DSC_Commission_Type,
    DSC_Commission: packages.DSC_Commission,
    aadhar_price: packages.aadhar_price,
    pan_aadhar_price: packages.pan_aadhar_price,
    pan_price: packages.pan_price,
    rc_price: packages.rc_price,
    rc_download_price: packages.rc_download_price,
    ration_price: packages.ration_price,
    dl_price: packages.dl_price,
    passport_price: packages.passport_price,
    gst_price: packages.gst_price,
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        // "https://2kadam.co.in/api/auth/superAdmin/editPackage",
        "https://2kadam.co.in/api/auth/superAdmin/editPackage",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Package edited Successfully",
        });
        setEditPackgeDetail(false);
        setIsRefresh((value) => !value);
        // setFormData({
        //   package_name: "",
        //   package_for: [], // Reset the select field
        //   Google_Play_Price: "",
        //   IRCTC_Agent_ID_Price: "",
        //   Birth_Certificate_Price: "",
        //   Death_Certificate_Price: "",
        //   E_Stamp_Price: "",
        //   ITR_Registration_Price: "",
        //   GST_Registration_Price: "",
        //   Sambal_Price: "",
        //   Income_Certificate_Price: "",
        //   Domicile_Certificate_Price: "",
        //   Bank_ID_Price: "",
        //   Offline_Services_Commission_Type: "",
        //   Google_Play_Commission: "",
        //   IRCTC_Agent_ID_Commission: "",
        //   Birth_Certificate_Commission: "",
        //   Death_Certificate_Commission: "",
        //   E_Stamp_Commission: "",
        //   ITR_Registration_Commission: "",
        //   GST_Registration_Commission: "",
        //   Sambal_Commission: "",
        //   Income_Certificate_Commission: "",
        //   Domicile_Certificate_Commission: "",
        //   Bank_ID_Commission: "",
        //   Off_Prepaid_Recharge_Comm_Type: "",
        //   Off_Airtel_Prepaid_Recharge_Comm: "",
        //   Off_Jio_Prepaid_Recharge_Comm: "",
        //   Off_Vi_Prepaid_Recharge_Comm: "",
        //   Off_Bsnl_Prepaid_Recharge_Comm: "",
        //   Off_Postpaid_Recharge_Comm_Type: "",
        //   Off_Airtel_Postpaid_Recharge_Comm: "",
        //   Off_Jio_Postpaid_Recharge_Comm: "",
        //   Off_Vi_Postpaid_Recharge_Comm: "",
        //   Off_Bsnl_Postpaid_Recharge_Comm: "",
        //   On_Prepaid_Recharge_Comm_Type: "",
        //   On_Airtel_Prepaid_Recharge_Comm: "",
        //   On_Jio_Prepaid_Recharge_Comm: "",
        //   On_Vi_Prepaid_Recharge_Comm: "",
        //   On_Bsnl_Prepaid_Recharge_Comm: "",
        //   On_Postpaid_Recharge_Comm_Type: "",
        //   On_Airtel_Postpaid_Recharge_Comm: "",
        //   On_Jio_Postpaid_Recharge_Comm: "",
        //   On_Vi_Postpaid_Recharge_Comm: "",
        //   On_Bsnl_Postpaid_Recharge_Comm: "",
        //   Online_DTH_Recharge_Commission_Type: "",
        //   On_Dish_TV_Recharge_Commission: "",
        //   On_Tata_Sky_Recharge_Commission: "",
        //   On_Videocon_Recharge_Commission: "",
        //   On_Sun_Direct_Recharge_Commission: "",
        //   On_Airtel_Dth_Recharge_Commission: "",
        //   Offline_DTH_Recharge_Commission_Type: "",
        //   Off_Dish_TV_Recharge_Commission: "",
        //   Off_Tata_Sky_Recharge_Commission: "",
        //   Off_Videocon_Recharge_Commission: "",
        //   Off_Sun_Direct_Recharge_Commission: "",
        //   Off_Airtel_Dth_Recharge_Commission: "",
        //   Online_New_DTH_Connection_Commission_Type: "",
        //   On_Dish_TV_New_DTH_Connection_Commission: "",
        //   On_Tata_Sky_New_DTH_Connection_Commission: "",
        //   On_Videocon_New_DTH_Connection_Commission: "",
        //   On_Sun_Direct_New_DTH_Connection_Commission: "",
        //   On_Airtel_New_DTH_Connection_Commission: "",
        //   Offline_New_DTH_Connection_Commission_Type: "",
        //   Off_Dish_TV_New_DTH_Connection_Commission: "",
        //   Off_Tata_Sky_New_DTH_Connection_Commission: "",
        //   Off_Videocon_New_DTH_Connection_Commission: "",
        //   Off_Sun_Direct_New_DTH_Connection_Commission: "",
        //   Off_Airtel_New_DTH_Connection_Commission: "",
        //   Online_Electricity_Bill_Pay_Commission_Type: "",
        //   Online_Electricity_Bill_Pay_Commission: "",
        //   Offline_Electricity_Bill_Pay_Commission_Type: "",
        //   Offline_Electricity_Bill_Pay_Commission: "",
        //   Online_Insurance_Pay_Commission_Type: "",
        //   Online_Insurance_Pay_Commission: "",
        //   Offline_Insurance_Pay_Commission_Type: "",
        //   Offline_Insurance_Pay_Commission: "",
        //   PAN_Card_Commission_Type: "",
        //   UTI_PAN_Card_Commission: "",
        //   UTI_PAN_Coupon_Commission : "",
        //   NSDL_PAN_Card_Commission: "",
        // });
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      }
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "An error occurred during the process. Please try again.",
      });
    }
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
                <form onSubmit={handlesubmit}>
                  <div className="main shadow-none ">
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4  px-3 pb-5">
                      <div className="text-center my-5">
                        <h2>Edit Package Details</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Package Name
                        </label>
                        <div class="input-group flex-nowrap">
                          <span class="input-group-text" id="addon-wrapping">
                            {" "}
                            <FaRupeeSign />
                          </span>
                          <input
                            type="text"
                            name="package_name"
                            class="form-control"
                            placeholder="Enter Package Name"
                            value={formData.package_name}
                            onChange={handleChange}
                            required
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
                            value={formData.package_for}
                            disabled
                          />
                        </div>

                        {/* <label for="name" class="form-label">
                          Select Package for
                        </label>
                        <Select
                          // defaultValue={selectedOption}
                          // onChange={setSelectedOption}

                          // defaultValue={formData.package_for}
                          value={options.filter(option => formData.package_for.includes(option.value))}  // Set value to match selected options
                        //   onChange={handleSelectChange}
                          options={options}
                          isMulti={true}
                          required={true}
                          
                        /> */}
                      </div>

                      {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                    </div>
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                      <div className="text-center  my-5">
                        <h2>Edit Offline Services Price</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Offline E PAN Card Price
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
                            value={formData.offline_E_PAN_Card_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Offline P PAN Card Price
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
                            value={formData.offline_P_PAN_Card_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Pan Find Price
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
                            name="Pan_Find_Price"
                            value={formData.Pan_Find_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Google Play Price
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
                            name="Google_Play_Price"
                            value={formData.Google_Play_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Birth Certificate Price
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
                            name="Birth_Certificate_Price"
                            value={formData.Birth_Certificate_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Death Certificate Price
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
                            name="Death_Certificate_Price"
                            value={formData.Death_Certificate_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter E-Stamp Price
                        </label>
                        <div class="input-group flex-nowrap">
                          <span class="input-group-text" id="addon-wrapping">
                            {" "}
                            <MdNumbers />
                          </span>
                          <input
                            type="number"
                            id="E_Stamp_Price"
                            class="form-control"
                            placeholder="Enter price"
                            name="E_Stamp_Price"
                            value={formData.E_Stamp_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter ITR Registration Price
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
                            name="ITR_Registration_Price"
                            value={formData.ITR_Registration_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter GST Registration Price
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
                            name="GST_Registration_Price"
                            value={formData.GST_Registration_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Sambal Price
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
                            name="Sambal_Price"
                            value={formData.Sambal_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Udyog Aadhar Price
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
                            value={formData.Udyog_Aadhar_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select offline KYC e-District Service
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="offline_kyc_eDistrict"
                            value={formData.offline_kyc_eDistrict}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
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
                          Enter eKYC Income Certificate Price
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
                            value={formData.eKYC_Income_Certificate_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter eKYC Domicile Certificate Price
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
                            value={formData.eKYC_Domicile_Certificate_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter offline KYC Income Certificate Price
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
                            value={formData.offlineKYC_Income_Certificate_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter offline KYC Domicile Certificate Price
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
                            value={
                              formData.offlineKYC_Domicile_Certificate_Price
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Non Samagra Income Certificate Price
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
                            value={
                              formData.non_samagra_income_Certificate_Price
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Non Samagra Domicile Certificate Price
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
                              formData.non_samagra_Domicile_Certificate_Price
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Verify e-district Certificate Price
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
                            value={formData.verify_edistrict_Certificate_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Bank Id Price</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Ayushman ID Price
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
                            value={formData.Ayushman_Id_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter IRCTC Agent ID Price
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
                            value={formData.IRCTC_Agent_ID_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter PayNearBy Bank ID Price
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
                            value={formData.PayNearBy_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Fino Bank ID Price
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
                            value={formData.Fino_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Spice Money Bank ID Price
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
                            value={formData.SpiceMoney_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Nsdl Bank ID Price
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
                            value={formData.Nsdl_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Ezee pay Bank ID Price
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
                            value={formData.Ezeepay_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Religare Digipay Bank ID Price
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
                            value={formData.ReligareDigipay_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel Bank ID Price
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
                            value={formData.Airtel_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Payworld Bank ID Price
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
                            value={formData.payworld_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Anypay Bank ID Price
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
                            value={formData.Anypay_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Roinet Bank ID Price
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
                            value={formData.Roinet_BankId_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter NSDL PSA ID Price
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
                            value={formData.NSDL_PSA_ID_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter UTI PSA ID Price
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
                            value={formData.UTI_PSA_ID_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Offline Services Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Select Commission Type
                        </label>
                        <div class="input-group flex-nowrap">
                          <span class="input-group-text" id="addon-wrapping">
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Offline_Services_Commission_Type"
                            value={formData.Offline_Services_Commission_Type}
                            onChange={handleChange}
                            class="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Enter Electricity Bill Pay  Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div> */}

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Offline E PAN Card Commission
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
                            value={formData.offline_E_PAN_Card_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Offline P PAN Card Commission
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
                            value={formData.offline_P_PAN_Card_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Pan Find Commission
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
                            value={formData.Pan_Find_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Google Play Commission
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
                            name="Google_Play_Commission"
                            value={formData.Google_Play_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter IRCTC Agent ID Commission
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
                            name="IRCTC_Agent_ID_Commission"
                            value={formData.IRCTC_Agent_ID_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div> */}
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Birth Certificate Commission
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
                            name="Birth_Certificate_Commission"
                            value={formData.Birth_Certificate_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Death Certificate Commission
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
                            name="Death_Certificate_Commission"
                            value={formData.Death_Certificate_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter E-Stamp Commission
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
                            name="E_Stamp_Commission"
                            value={formData.E_Stamp_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter ITR Registration Commission
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
                            name="ITR_Registration_Commission"
                            value={formData.ITR_Registration_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter GST Registration Commission
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
                            name="GST_Registration_Commission"
                            value={formData.GST_Registration_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Sambal Commission
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
                            name="Sambal_Commission"
                            value={formData.Sambal_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Udyog Aadhar Commission
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
                            value={formData.Udyog_Aadhar_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter eKYC Income Certificate Commission
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
                            value={formData.eKYC_Income_Certificate_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter eKYC Domicile Certificate Commission
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
                            value={
                              formData.eKYC_Domicile_Certificate_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                        Enter offline KYC Income Certificate Commission
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
                            value={formData.offlineKYC_Income_Certificate_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                        Enter offline KYC Domicile Certificate Commission
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
                            value={formData.offlineKYC_Domicile_Certificate_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                        Enter Non samagra income Certificate Commission
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
                            value={formData.non_samagra_income_Certificate_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                        Enter Non Samagra Domicile Certificate Commission
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
                            value={formData.non_samagra_Domicile_Certificate_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div> */}
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Verify e-district Certificate Commission
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
                              formData.verify_edistrict_Certificate_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Bank ID Commission
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
                            name="Bank_ID_Commission"
                            value={formData.Bank_ID_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Offline Prepaid Recharge Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Off_Prepaid_Recharge_Comm_Type"
                            value={formData.Off_Prepaid_Recharge_Comm_Type}
                            onChange={handleChange}
                            required
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel Recharge Commision
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
                            name="Off_Airtel_Prepaid_Recharge_Comm"
                            value={formData.Off_Airtel_Prepaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Jio Recharge Commision
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
                            name="Off_Jio_Prepaid_Recharge_Comm"
                            value={formData.Off_Jio_Prepaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter VI Recharge Commision
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
                            name="Off_Vi_Prepaid_Recharge_Comm"
                            value={formData.Off_Vi_Prepaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter BSNL Recharge Commision
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
                            name="Off_Bsnl_Prepaid_Recharge_Comm"
                            value={formData.Off_Bsnl_Prepaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Offline Postpaid Recharge Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Off_Postpaid_Recharge_Comm_Type"
                            value={formData.Off_Postpaid_Recharge_Comm_Type}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel Recharge Commision
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
                            name="Off_Airtel_Postpaid_Recharge_Comm"
                            value={formData.Off_Airtel_Postpaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Jio Recharge Commision
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
                            name="Off_Jio_Postpaid_Recharge_Comm"
                            value={formData.Off_Jio_Postpaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter VI Recharge Commision
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
                            name="Off_Vi_Postpaid_Recharge_Comm"
                            value={formData.Off_Vi_Postpaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter BSNL Recharge Commision
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
                            name="Off_Bsnl_Postpaid_Recharge_Comm"
                            value={formData.Off_Bsnl_Postpaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Online Prepaid Recharge Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="On_Prepaid_Recharge_Comm_Type"
                            value={formData.On_Prepaid_Recharge_Comm_Type}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel Recharge Commision
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
                            name="On_Airtel_Prepaid_Recharge_Comm"
                            value={formData.On_Airtel_Prepaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Jio Recharge Commision
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
                            name="On_Jio_Prepaid_Recharge_Comm"
                            value={formData.On_Jio_Prepaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter VI Recharge Commision
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
                            name="On_Vi_Prepaid_Recharge_Comm"
                            value={formData.On_Vi_Prepaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter BSNL Recharge Commision
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
                            name="On_Bsnl_Prepaid_Recharge_Comm"
                            value={formData.On_Bsnl_Prepaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Online Postpaid Recharge Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="On_Postpaid_Recharge_Comm_Type"
                            value={formData.On_Postpaid_Recharge_Comm_Type}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel Recharge Commision
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
                            name="On_Airtel_Postpaid_Recharge_Comm"
                            value={formData.On_Airtel_Postpaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Jio Recharge Commision
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
                            name="On_Jio_Postpaid_Recharge_Comm"
                            value={formData.On_Jio_Postpaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter VI Recharge Commision
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
                            name="On_Vi_Postpaid_Recharge_Comm"
                            value={formData.On_Vi_Postpaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter BSNL Recharge Commision
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
                            name="On_Bsnl_Postpaid_Recharge_Comm"
                            value={formData.On_Bsnl_Postpaid_Recharge_Comm}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Online DTH Recharge Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Online_DTH_Recharge_Commission_Type"
                            value={formData.Online_DTH_Recharge_Commission_Type}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Dish TV Recharge Commission
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
                            name="On_Dish_TV_Recharge_Commission"
                            value={formData.On_Dish_TV_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Tata Sky Recharge Commission
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
                            name="On_Tata_Sky_Recharge_Commission"
                            value={formData.On_Tata_Sky_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Videocon Recharge Commission
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
                            name="On_Videocon_Recharge_Commission"
                            value={formData.On_Videocon_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Sun Direct Recharge Commission
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
                            name="On_Sun_Direct_Recharge_Commission"
                            value={formData.On_Sun_Direct_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel DTH Recharge Commission
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
                            name="On_Airtel_Dth_Recharge_Commission"
                            value={formData.On_Airtel_Dth_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Offline DTH Recharge Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Offline_DTH_Recharge_Commission_Type"
                            value={
                              formData.Offline_DTH_Recharge_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Dish TV Recharge Commission
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
                            name="Off_Dish_TV_Recharge_Commission"
                            value={formData.Off_Dish_TV_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Tata Sky Recharge Commission
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
                            name="Off_Tata_Sky_Recharge_Commission"
                            value={formData.Off_Tata_Sky_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Videocon Recharge Commission
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
                            name="Off_Videocon_Recharge_Commission"
                            value={formData.Off_Videocon_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Sun Direct Recharge Commission
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
                            name="Off_Sun_Direct_Recharge_Commission"
                            value={formData.Off_Sun_Direct_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel DTH Recharge Commission
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
                            name="Off_Airtel_Dth_Recharge_Commission"
                            value={formData.Off_Airtel_Dth_Recharge_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Online New DTH Connection Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Online_New_DTH_Connection_Commission_Type"
                            value={
                              formData.Online_New_DTH_Connection_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Dish TV Commission
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
                            name="On_Dish_TV_New_DTH_Connection_Commission"
                            value={
                              formData.On_Dish_TV_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Tata Sky Commission
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
                            name="On_Tata_Sky_New_DTH_Connection_Commission"
                            value={
                              formData.On_Tata_Sky_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Videocon Commission
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
                            name="On_Videocon_New_DTH_Connection_Commission"
                            value={
                              formData.On_Videocon_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Sun Direct Commission
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
                            name="On_Sun_Direct_New_DTH_Connection_Commission"
                            value={
                              formData.On_Sun_Direct_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel DTH Commission
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
                            name="On_Airtel_New_DTH_Connection_Commission"
                            value={
                              formData.On_Airtel_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Offline New DTH Connection Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Offline_New_DTH_Connection_Commission_Type"
                            value={
                              formData.Offline_New_DTH_Connection_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Dish TV Commission
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
                            name="Off_Dish_TV_New_DTH_Connection_Commission"
                            value={
                              formData.Off_Dish_TV_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Tata Sky Commission
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
                            name="Off_Tata_Sky_New_DTH_Connection_Commission"
                            value={
                              formData.Off_Tata_Sky_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Videocon Commission
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
                            name="Off_Videocon_New_DTH_Connection_Commission"
                            value={
                              formData.Off_Videocon_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Sun Direct Commission
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
                            name="Off_Sun_Direct_New_DTH_Connection_Commission"
                            value={
                              formData.Off_Sun_Direct_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Airtel DTH Commission
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
                            name="Off_Airtel_New_DTH_Connection_Commission"
                            value={
                              formData.Off_Airtel_New_DTH_Connection_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Online Broadband Bill Pay Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Online_Broadband_Bill_Pay_Commission_Type"
                            value={
                              formData.Online_Broadband_Bill_Pay_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Online Broadband Bill Pay Commission
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
                            value={
                              formData.Online_Broadband_Bill_Pay_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                      <div className="text-center  my-5">
                        <h2>Edit Offline Broadband Bill Pay Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Offline_Broadband_Bill_Pay_Commission_Type"
                            value={
                              formData.Offline_Broadband_Bill_Pay_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Offline Broadband Bill Pay Commission
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
                            value={
                              formData.Offline_Broadband_Bill_Pay_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                            Enter M.P. Madhya Kshetra Vidyut Vitaran - RURAL Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                            Enter M.P. Poorv Kshetra Vidyut Vitaran Company Ltd (RURAL) Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

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
                        <h2>Edit Online Electricity Bill Pay Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Online_Electricity_Bill_Pay_Commission_Type"
                            value={
                              formData.Online_Electricity_Bill_Pay_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
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
                            value={
                              formData.Online_Electricity_Bill_Pay_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Enter M.P. Madhya Kshetra Vidyut Vitaran - URBAN Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                            Enter M.P. Madhya Kshetra Vidyut Vitaran - RURAL Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                            Enter M.P. Poorv Kshetra Vidyut Vitaran Company Ltd (RURAL) Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

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
                        <h2>Edit Offline Electricity Bill Pay Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Offline_Electricity_Bill_Pay_Commission_Type"
                            value={
                              formData.Offline_Electricity_Bill_Pay_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
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
                            value={
                              formData.Offline_Electricity_Bill_Pay_Commission
                            }
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                            Enter M.P. Madhya Kshetra Vidyut Vitaran - RURAL Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                            Enter M.P. Poorv Kshetra Vidyut Vitaran Company Ltd (RURAL) Commission
                                            </label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">
                                                    {" "}
                                                    <MdNumbers />
                                                </span>
                                                <input
                                                    type="text"
                                                    
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

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
                        <h2>Edit Online Insurance Pay Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                            required
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Online_Insurance_Pay_Commission_Type"
                            value={
                              formData.Online_Insurance_Pay_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Insurance Commission
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
                            name="Online_Insurance_Pay_Commission"
                            value={formData.Online_Insurance_Pay_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Offline Insurance Pay Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="Offline_Insurance_Pay_Commission_Type"
                            value={
                              formData.Offline_Insurance_Pay_Commission_Type
                            }
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Insurance Commission
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
                            name="Offline_Insurance_Pay_Commission"
                            value={formData.Offline_Insurance_Pay_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit PAN Card and DSC Price</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter E PAN Card Price
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
                            value={formData.E_PAN_Card_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter P PAN Card Price
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
                            value={formData.P_PAN_Card_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter PAN Coupon Price
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
                            value={formData.UTI_PAN_Coupon_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter DSC Coupon Price
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
                            value={formData.DSC_token_Price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit PAN Card And DSC Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="PAN_Card_Commission_Type"
                            value={formData.PAN_Card_Commission_Type}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter E PAN Card Commission
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
                            value={formData.E_PAN_Card_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter PAN Coupon Commission
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
                            value={formData.UTI_PAN_Coupon_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter P PAN Card Commission
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
                            value={formData.P_PAN_Card_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.DSC_Coupon_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                        <h2>Edit Joining Price (for White Label)</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter White Label Joining Price
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
                            value={formData.whitelabel_joining_price}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Super Distributor Joining Price
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
                            value={formData.superDistributor_joining_price}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Distributor Joining Price
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
                            value={formData.distributor_joining_price}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Retailer Joining Price
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
                            value={formData.retailer_joining_price}
                            onChange={handleChange}
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
                        <h2>Edit User ID Price (For Create Users)</h2>
                      </div>

                      <div>
                        <h4>Set White Label ID Price</h4>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter White Label Id Price
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
                            value={formData.whiteLabel_id_price}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter White Label Minimum Id limit
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
                            value={formData.whiteLabel_min_id_limit}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter White Label Maximum Id limit
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
                            value={formData.whiteLabel_max_id_limit}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>

                      <div>
                        <h4>Set Super Distributor ID Price</h4>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Super Distributor Id Price
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
                            value={formData.superDistributor_id_price}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Super Distributor Minimum Id limit
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
                            value={formData.superDistributor_min_id_limit}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Super Distributor Maximum Id limit
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
                            value={formData.superDistributor_max_id_limit}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>

                      <div>
                        <h4>Set Distributor ID Price</h4>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Distributor Id Price
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
                            value={formData.distributor_id_price}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Distributor Minimum Id limit
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
                            value={formData.distributor_min_id_limit}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Distributor Maximum Id limit
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
                            value={formData.distributor_max_id_limit}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>

                      <div>
                        <h4>Set Retailer ID Price</h4>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Retailer Id Price
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
                            value={formData.retailer_id_price}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Retailer Minimum Id limit
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
                            value={formData.retailer_min_id_limit}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Retailer Maximum Id limit
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
                            value={formData.retailer_max_id_limit}
                            onChange={handleChange}
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
                        <h2>Edit Digital Signature Pay Commission</h2>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" className="form-label">
                          Select Commission Type
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            name="DSC_Commission_Type"
                            value={formData.DSC_Commission_Type}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Default select example"
                            required
                          >
                            <option value="" selected>
                              Select...
                            </option>

                            <option value="Percentage">Percentage (%)</option>
                            <option value="Rupees">Rupees (&#8377;)</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter DSC Commission
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
                            value={formData.DSC_Commission}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                      <div className="text-center  my-5">
                        <h2>Edit Find Services Price</h2>
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
                            value={formData.aadhar_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.pan_aadhar_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.pan_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.rc_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.rc_download_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.ration_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.dl_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.passport_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
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
                            value={formData.gst_price}
                            onChange={handleChange}
                            required
                            min={0}
                            step="0.01" // Allows decimal input
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-center  m-5">
                        <button
                          type="submit"
                          className="btn btn-primary p-2"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SAEditPackageModel;

const Wrapper = styled.div`
  button {
    color: #fff;
    background: #6d70ff;
  }
`;
