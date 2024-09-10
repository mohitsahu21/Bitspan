import React from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { LuTextSelect } from "react-icons/lu";
import { MdNumbers } from "react-icons/md";

const SAViewPackageModel = () => {
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
                                                // value={""}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" class="form-label">Package for</label>
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    class="form-control"
                                                    placeholder=""
                                                    value={"WhiteLabel"}
                                                    

                                                />
                                            </div>

                                            {/* <label for="name" class="form-label">Select Package for</label>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                                options={options}
                                                isMulti={true}
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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                ITR Registration
                                                Price
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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Offline Services Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" class="form-label">Commission Type</label>
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
                                                    value={"1000"}

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
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Birth Certificate  Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Death Certificate  Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                E-Stamp  Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                ITR Registration
                                                Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                GST Registration  Commission
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
                                                    value={"1000"}

                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Income Certificate  Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Domicile Certificate  Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                Bank ID  Commission
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

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Offline Postpaid Recharge Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Online Prepaid Recharge Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Online Postpaid Recharge Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Online DTH Recharge Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Offline DTH Recharge Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Online New DTH Connection Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Offline New DTH Connection Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                                    value={"1000"}

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
                                            <h2>Online Electricity Bill Pay  Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

                                                </select>
                                            </div>


                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                M.P. Madhya Kshetra Vidyut Vitaran - URBAN Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                M.P. Madhya Kshetra Vidyut Vitaran - RURAL Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                M.P. Poorv Kshetra Vidyut Vitaran Company Ltd (RURAL) Commission
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
                                        </div>








                                        {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                                        <div className="text-center  my-5">
                                            <h2>Offline Electricity Bill Pay  Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

                                                </select>
                                            </div>


                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                M.P. Madhya Kshetra Vidyut Vitaran - URBAN Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                M.P. Madhya Kshetra Vidyut Vitaran - RURAL Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                M.P. Poorv Kshetra Vidyut Vitaran Company Ltd (RURAL) Commission
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
                                        </div>








                                        {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                                        <div className="text-center  my-5">
                                            <h2>Online Insurance Pay  Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                            <h2>Offline Insurance Pay  Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

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
                                            <h2>PAN Card Commission</h2>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">

                                            <label for="name" className="form-label">Commission Type</label>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping"> <LuTextSelect /></span>
                                                <select
                                                    className="form-select" aria-label="Default select example"
                                                >
                                                    <option selected>Select...</option>

                                                    <option value="Delhi">Percentage (%)</option>
                                                    <option value="Puducherry">Rupees (&#8377;)</option>

                                                </select>
                                            </div>


                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                UTI PAN Card Commission
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
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <label for="name" class="form-label">
                                                NSDL PAN Card Commission
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
                                        </div>








                                        {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="text-center  m-5">
                                            <button className="btn p-2">Submit</button>
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

export default SAViewPackageModel;

const Wrapper = styled.div`
  
`;
