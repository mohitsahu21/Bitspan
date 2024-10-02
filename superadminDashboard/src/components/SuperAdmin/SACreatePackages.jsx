import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { LuTextSelect } from "react-icons/lu";
import { MdNumbers } from "react-icons/md";
import Select from "react-select";
import messageSound from "../../assets/sound/sound.mp3";

const SACreatePackages = () => {
  const sound = new Audio(messageSound);

  const playSound = () => {
    sound.play();
  };

  const [formData, setFormData] = useState({
    package_name: "",
    package_for: [], // This will store the selected options
    Google_Play_Price: "",
    IRCTC_Agent_ID_Price: "",
    Birth_Certificate_Price: "",
    Death_Certificate_Price: "",
    E_Stamp_Price: "",
    ITR_Registration_Price: "",
    GST_Registration_Price: "",
    Sambal_Price: "",
    Income_Certificate_Price: "",
    Domicile_Certificate_Price: "",
    Bank_ID_Price: "",
    Offline_Services_Commission_Type: "",
    Google_Play_Commission: "",
    IRCTC_Agent_ID_Commission: "",
    Birth_Certificate_Commission: "",
    Death_Certificate_Commission: "",
    E_Stamp_Commission: "",
    ITR_Registration_Commission: "",
    GST_Registration_Commission: "",
    Sambal_Commission: "",
    Income_Certificate_Commission: "",
    Domicile_Certificate_Commission: "",
    Bank_ID_Commission: "",
    Off_Prepaid_Recharge_Comm_Type: "",
    Off_Airtel_Prepaid_Recharge_Comm: "",
    Off_Jio_Prepaid_Recharge_Comm: "",
    Off_Vi_Prepaid_Recharge_Comm: "",
    Off_Bsnl_Prepaid_Recharge_Comm: "",
    Off_Postpaid_Recharge_Comm_Type: "",
    Off_Airtel_Postpaid_Recharge_Comm: "",
    Off_Jio_Postpaid_Recharge_Comm: "",
    Off_Vi_Postpaid_Recharge_Comm: "",
    Off_Bsnl_Postpaid_Recharge_Comm: "",
    On_Prepaid_Recharge_Comm_Type: "",
    On_Airtel_Prepaid_Recharge_Comm: "",
    On_Jio_Prepaid_Recharge_Comm: "",
    On_Vi_Prepaid_Recharge_Comm: "",
    On_Bsnl_Prepaid_Recharge_Comm: "",
    On_Postpaid_Recharge_Comm_Type: "",
    On_Airtel_Postpaid_Recharge_Comm: "",
    On_Jio_Postpaid_Recharge_Comm: "",
    On_Vi_Postpaid_Recharge_Comm: "",
    On_Bsnl_Postpaid_Recharge_Comm: "",
    Online_DTH_Recharge_Commission_Type: "",
    On_Dish_TV_Recharge_Commission: "",
    On_Tata_Sky_Recharge_Commission: "",
    On_Videocon_Recharge_Commission: "",
    On_Sun_Direct_Recharge_Commission: "",
    On_Airtel_Dth_Recharge_Commission: "",
    Offline_DTH_Recharge_Commission_Type: "",
    Off_Dish_TV_Recharge_Commission: "",
    Off_Tata_Sky_Recharge_Commission: "",
    Off_Videocon_Recharge_Commission: "",
    Off_Sun_Direct_Recharge_Commission: "",
    Off_Airtel_Dth_Recharge_Commission: "",
    Online_New_DTH_Connection_Commission_Type: "",
    On_Dish_TV_New_DTH_Connection_Commission: "",
    On_Tata_Sky_New_DTH_Connection_Commission: "",
    On_Videocon_New_DTH_Connection_Commission: "",
    On_Sun_Direct_New_DTH_Connection_Commission: "",
    On_Airtel_New_DTH_Connection_Commission: "",
    Online_Electricity_Bill_Pay_Commission_Type: "",
    Online_Electricity_Bill_Pay_Commission: "",
    Offline_Electricity_Bill_Pay_Commission_Type: "",
    Offline_Electricity_Bill_Pay_Commission: "",
    Online_Insurance_Pay_Commission_Type: "",
    Online_Insurance_Pay_Commission: "",
    Offline_Insurance_Pay_Commission_Type: "",
    Offline_Insurance_Pay_Commission: "",
    PAN_Card_Commission_Type: "",
    UTI_PAN_Card_Commission: "",
    NSDL_PAN_Card_Commission: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    // If multiple options are selected, store only the values in formData
    const selectedValues = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      package_for: selectedValues.toString(), // Update package_for with selected values
    });
  };

  console.log(formData);

  const handlesubmit = async () => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/http://localhost:7777/api/auth/superAdmin/addPackage",
        formData
      );
      console.log(response);
      alert("Data added successfully!");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const options = [
    { value: "WhiteLabel", label: "White Label" },
    { value: "SuperDistributor", label: "Super Distributor" },
    { value: "Distributor", label: "Distributor" },
    { value: "Retailer", label: "Retailer" },
  ];
  // const [selectedOption, setSelectedOption] = useState(null);

  // console.log(selectedOption)
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
                    <div className="row shadow-none ">
                      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        {/* <div className="text-start">
                        <h3>Raise Complaint</h3>
                      </div> */}
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <h4 className="px-lg-3">Create Packages </h4>
                          <p className="mx-lg-5">
                            {" "}
                            <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                            <span
                              className="text-body-secondary"
                              style={{ fontSize: "13px" }}
                            >
                              {" "}
                              Create Packages
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4  px-3 pb-5">
                      <div className="text-center my-5">
                        <h2>Enter Package Details</h2>
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
                            id="name"
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
                        {/* <label for="name" class="form-label">Select Package for</label>
<div class="input-group flex-nowrap">
  <span class="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
  <select
    class="form-select" aria-label="Default select example"
  >
    <option selected>Select...</option>
   
    <option value="Delhi">White Label</option>
    <option value="Puducherry">Super Distributor</option>
    <option value="Ladakh">Distributor</option>
    <option value="Jammu and Kashmir">Retailer</option>
  </select>
</div> */}

                        <label for="name" class="form-label">
                          Select Package for
                        </label>
                        <Select
                          // defaultValue={selectedOption}
                          // onChange={setSelectedOption}
                          defaultValue={formData.package_for}
                          onChange={handleSelectChange} // Use custom handler
                          options={options}
                          isMulti={true}
                          required={true}
                        />
                      </div>

                      {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                    </div>
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                      <div className="text-center  my-5">
                        <h2>Create Offline Services Price</h2>
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
                                                Enter Electricity Bill Pay  Commission
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
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div> */}

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
                            id="name"
                            class="form-control"
                            placeholder="Enter price"
                            name="Google_Play_Price"
                            value={formData.Google_Play_Price}
                            onChange={handleChange}
                            required
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
                            id="name"
                            class="form-control"
                            placeholder="Enter price"
                            name="IRCTC_Agent_ID_Price"
                            value={formData.IRCTC_Agent_ID_Price}
                            onChange={handleChange}
                            required
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
                            id="name"
                            class="form-control"
                            placeholder="Enter price"
                            name="Birth_Certificate_Price"
                            value={formData.Birth_Certificate_Price}
                            onChange={handleChange}
                            required
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
                            id="name"
                            class="form-control"
                            placeholder="Enter price"
                            name="Death_Certificate_Price"
                            value={formData.Death_Certificate_Price}
                            onChange={handleChange}
                            required
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Income Certificate Price
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
                            placeholder="Enter IFSC Code"
                            value={"1000"}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Domicile Certificate Price
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
                            placeholder="Enter IFSC Code"
                            value={"1000"}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Bank ID Price
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
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Offline Services Commission</h2>
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
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                                                    id="name"
                                                    class="form-control"
                                                    placeholder="Enter IFSC Code"
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div> */}

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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter IRCTC Agent ID Commission
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
                            placeholder="Enter IFSC Code"
                            value={"1000"}
                          />
                        </div>
                      </div>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Income Certificate Commission
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
                            placeholder="Enter IFSC Code"
                            value={"1000"}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Domicile Certificate Commission
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
                            placeholder="Enter IFSC Code"
                            value={"1000"}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label for="name" class="form-label">
                          Enter Bank ID Commission
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
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Offline Prepaid Recharge Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Offline Postpaid Recharge Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Online Prepaid Recharge Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Online Postpaid Recharge Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Online DTH Recharge Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Offline DTH Recharge Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Online New DTH Connection Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Offline New DTH Connection Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                                                    id="name"
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
                                                    id="name"
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
                                                    id="name"
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
                        <h2>Create Offline Electricity Bill Pay Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                                                    id="name"
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
                                                    id="name"
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
                        <h2>Create Online Insurance Pay Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                        <h2>Create Offline Insurance Pay Commission</h2>
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
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <LuTextSelect />
                          </span>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select...</option>

                            <option value="Delhi">Percentage (%)</option>
                            <option value="Puducherry">Rupees (&#8377;)</option>
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                            type="text"
                            id="name"
                            class="form-control"
                            placeholder="Enter IFSC Code"
                            value={"1000"}
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
                      <div className="text-center  m-5">
                        <button type="submit" className="btn p-2">
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
      </Wrapper>
    </>
  );
};

export default SACreatePackages;

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
`;
