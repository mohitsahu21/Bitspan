import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";

import { LuTextSelect } from "react-icons/lu";
import { MdNumbers } from "react-icons/md";

import { MdOutlineFormatListNumbered } from "react-icons/md";

const WLMyCommission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [packageData, setPackageData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector((state) => state.user);
  // const package_Id = useSelector((state) => state.user.currentUser?.package_Id);

  // const fullUrl = window.location.href;
  const [status, setStatus] = useState(null);
  // const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState("");
  // const dispatch = useDispatch();
  const [user, setUser] = useState("");
  // const userStatus = currentUser?.Status;

  // Logging the current user and token for debugging
  console.log("Current User:", currentUser);
  console.log("Token:", token);
  console.log(status);
  // UseEffect hook to call the API once when the component mounts
  useEffect(() => {
    if (currentUser?.userId && token) {
      fetchUserData();
    } else {
      console.log("Missing userId or token, cannot fetch data.");
    }
  }, [currentUser?.userId, token]); // Removed unnecessary `fullUrl` dependency

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/superDistributor/getUserDetails/${currentUser?.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Details:", response.data?.data);
      const userData = response.data?.data;
      setUser(userData); // Setting user state

      const userStatus = userData?.Status;
      const paymentStatus = userData?.payment_status;
      const packageId = userData?.package_Id;

      console.log(packageId); // Logging packageId properly

      if (userStatus === "Deactive") {
        Swal.fire({
          icon: "error",
          title: "User Deactive",
          text: "Please contact Admin!",
        });
        dispatch(clearUser());
        navigate("/");
      } else if (paymentStatus === "Pending") {
        Swal.fire({
          icon: "error",
          title: "User Payment is Pending",
          text: "Please Make Payment First Or Contact Admin if Payment Done",
        });
        navigate("/payment");
      } else if (userStatus === "Pending") {
        Swal.fire({
          icon: "error",
          title: "User KYC is Pending",
          text: "Please Update KYC details First Or Contact Admin if Already Submitted Kyc details",
        });
        navigate("/update-profile");
      }

      setStatus(userStatus); // Setting status state
    } catch (error) {
      console.error("Error fetching user details:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Package Data
  const fetchPackageData = async () => {
    if (!user?.package_Id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/whiteLabel/getPackageData/${user?.package_Id}`,
        // `https://2kadam.co.in/api/auth/superDistributor/getPackageData/${package_Id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Authorization ke liye token use kar rahe hain
          },
        }
      );
      setPackageData(response.data.data[0]); // Response data ko set karte hain
      console.log("Package Data:", response.data.data); // Console pe data dekh sakte hain
    } catch (error) {
      console.error("Error fetching package data", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
        dispatch(clearUser()); // User session clear kar rahe hain
        navigate("/"); // Login page pe redirect kar rahe hain
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while fetching package data.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  console.log(packageData);
  // useEffect(() => {
  //   fetchPackageData(); // Component mount hone par fetch karein
  // }, [package_Id]);

  useEffect(() => {
    if (user?.package_Id) {
      fetchPackageData();
    }
  }, [user?.package_Id]);

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
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                        My Commission
                      </h4>
                      <h6 className="mx-lg-5">
                        <BiHomeAlt /> &nbsp;/ &nbsp; MyCommission
                      </h6>
                    </div>
                  </div>

                  {/* <div className="row g-4 shadow bg-body-tertiary rounded m-4  px-3 pb-5">
                    <div className="text-center my-5">
                      <h2>My Commission Details</h2>
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
                          value={packageData?.package_name}
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
                          value={packageData?.package_for}
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Offline Services Price</h2>
                    </div>

                
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
                          value={packageData?.offline_E_PAN_Card_Price}
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
                          value={packageData?.offline_P_PAN_Card_Price}
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
                          value={packageData?.Pan_Find_Price}
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
                          value={packageData?.Google_Play_Price}
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
                          value={packageData?.Birth_Certificate_Price}
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
                          value={packageData?.Death_Certificate_Price}
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
                          value={packageData?.E_Stamp_Price}
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
                          value={packageData?.ITR_Registration_Price}
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
                          value={packageData?.GST_Registration_Price}
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
                          value={packageData?.Sambal_Price}
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
                          value={packageData?.Udyog_Aadhar_Price}
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
                          value={packageData?.offline_kyc_eDistrict}
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
                          value={packageData?.eKYC_Income_Certificate_Price}
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
                          value={packageData?.eKYC_Domicile_Certificate_Price}
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
                          value={
                            packageData?.offlineKYC_Income_Certificate_Price
                          }
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
                          value={
                            packageData?.offlineKYC_Domicile_Certificate_Price
                          }
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
                          value={
                            packageData?.non_samagra_income_Certificate_Price
                          }
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
                            packageData?.non_samagra_Domicile_Certificate_Price
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
                          value={
                            packageData?.verify_edistrict_Certificate_Price
                          }
                          required
                        />
                      </div>
                    </div>

                   
                  </div> */}

                  {/* <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
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
                          value={packageData?.Ayushman_Id_Price}
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
                          value={packageData?.IRCTC_Agent_ID_Price}
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
                          value={packageData?.PayNearBy_BankId_Price}
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
                          value={packageData?.Fino_BankId_Price}
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
                          value={packageData?.SpiceMoney_BankId_Price}
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
                          value={packageData?.Nsdl_BankId_Price}
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
                          value={packageData?.Ezeepay_BankId_Price}
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
                          value={packageData?.ReligareDigipay_BankId_Price}
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
                          value={packageData?.Airtel_BankId_Price}
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
                          value={packageData?.payworld_BankId_Price}
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
                          value={packageData?.Anypay_BankId_Price}
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
                          value={packageData?.Roinet_BankId_Price}
                          required
                        />
                      </div>
                    </div>

                  </div> */}

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
                          value={packageData?.Offline_Services_Commission_Type}
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
                          // placeholder="Enter Commission"
                          name="offline_E_PAN_Card_Commission"
                          value={packageData?.offline_E_PAN_Card_Commission}
                          disabled
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
                          // placeholder="Enter Commission"
                          name="offline_P_PAN_Card_Commission"
                          value={packageData?.offline_P_PAN_Card_Commission}
                          disabled
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
                          // placeholder="Enter Commission"
                          name="Pan_Find_Commission"
                          value={packageData?.Pan_Find_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Google_Play_Commission}
                          disabled
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
                          value={packageData?.IRCTC_Agent_ID_Commission}
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
                          // placeholder="IFSC Code"
                          value={packageData?.Birth_Certificate_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Death_Certificate_Commission}
                          disabled
                        />
                      </div>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
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
                          value={packageData?.E_Stamp_Commission}
                        />
                      </div>
                    </div> */}
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
                          // placeholder="IFSC Code"
                          value={packageData?.ITR_Registration_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.GST_Registration_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Sambal_Commission}
                          disabled
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
                          // placeholder="Enter Commission"
                          name="Udyog_Aadhar_Commission"
                          value={packageData?.Udyog_Aadhar_Commission}
                          required
                          disabled
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
                          // placeholder="Enter Commission"
                          name="eKYC_Income_Certificate_Commission"
                          value={
                            packageData?.eKYC_Income_Certificate_Commission
                          }
                          disabled
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
                          // placeholder="Enter Commission"
                          name="eKYC_Domicile_Certificate_Commission"
                          value={
                            packageData?.eKYC_Domicile_Certificate_Commission
                          }
                          disabled
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
                            value={packageData?.offlineKYC_Income_Certificate_Commission}
                           
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
                            value={packageData?.offlineKYC_Domicile_Certificate_Commission}
                           
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
                            value={packageData?.non_samagra_income_Certificate_Commission}
                           
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
                            value={packageData?.non_samagra_Domicile_Certificate_Commission}
                           
                            required
                          />
                        </div>
                      </div> */}
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
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
                            packageData?.verify_edistrict_Certificate_Commission
                          }
                        />
                      </div>
                    </div> */}
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
                          value={packageData?.Bank_ID_Commission}
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
                      <h2>Provider 1 Prepaid Recharge Commission</h2>
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
                          value={packageData?.On_Prepaid_Recharge_Comm_Type}
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Airtel_Prepaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Jio_Prepaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Vi_Prepaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Bsnl_Prepaid_Recharge_Comm}
                          disabled
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
                      <h2>Provider 2 Prepaid Recharge Commission</h2>
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
                          value={packageData?.Off_Prepaid_Recharge_Comm_Type}
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Airtel_Prepaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Jio_Prepaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Vi_Prepaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Bsnl_Prepaid_Recharge_Comm}
                          disabled
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
                      <h2>Provider 1 Postpaid Recharge Commission</h2>
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
                          value={packageData?.On_Postpaid_Recharge_Comm_Type}
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Airtel_Postpaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Jio_Postpaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Vi_Postpaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Bsnl_Postpaid_Recharge_Comm}
                          disabled
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
                      <h2>Provider 2 Postpaid Recharge Commission</h2>
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
                          value={packageData?.Off_Postpaid_Recharge_Comm_Type}
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Airtel_Postpaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Jio_Postpaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Vi_Postpaid_Recharge_Comm}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Bsnl_Postpaid_Recharge_Comm}
                          disabled
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
                      <h2>Provider 1 DTH Recharge Commission</h2>
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
                            packageData?.Online_DTH_Recharge_Commission_Type
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
                          // placeholder="IFSC Code"
                          disabled
                          value={packageData?.On_Dish_TV_Recharge_Commission}
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Tata_Sky_Recharge_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Videocon_Recharge_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Sun_Direct_Recharge_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.On_Airtel_Dth_Recharge_Commission}
                          disabled
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
                      <h2>Provider 2 DTH Recharge Commission</h2>
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
                            packageData?.Offline_DTH_Recharge_Commission_Type
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Dish_TV_Recharge_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Tata_Sky_Recharge_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={packageData?.Off_Videocon_Recharge_Commission}
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.Off_Sun_Direct_Recharge_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.Off_Airtel_Dth_Recharge_Commission
                          }
                          disabled
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
                      <h2>Provider 1 New DTH Connection Commission</h2>
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
                            packageData?.Online_New_DTH_Connection_Commission_Type
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.On_Dish_TV_New_DTH_Connection_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.On_Tata_Sky_New_DTH_Connection_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.On_Videocon_New_DTH_Connection_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.On_Sun_Direct_New_DTH_Connection_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.On_Airtel_New_DTH_Connection_Commission
                          }
                          disabled
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
                      <h2>Provider 2 New DTH Connection Commission</h2>
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
                            packageData?.Offline_New_DTH_Connection_Commission_Type
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.Off_Dish_TV_New_DTH_Connection_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.Off_Tata_Sky_New_DTH_Connection_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.Off_Videocon_New_DTH_Connection_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.Off_Sun_Direct_New_DTH_Connection_Commission
                          }
                          disabled
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
                          // placeholder="IFSC Code"
                          value={
                            packageData?.Off_Airtel_New_DTH_Connection_Commission
                          }
                          disabled
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
                      <h2>Provider 1 Broadband Bill Pay Commission</h2>
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
                            packageData?.Online_Broadband_Bill_Pay_Commission_Type
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
                          // placeholder="Enter Commission"
                          name="Online_Broadband_Bill_Pay_Commission"
                          value={
                            packageData?.Online_Broadband_Bill_Pay_Commission
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Provider 2 Broadband Bill Pay Commission</h2>
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
                            packageData?.Offline_Broadband_Bill_Pay_Commission_Type
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
                          // placeholder="Enter Commission"
                          name="Offline_Broadband_Bill_Pay_Commission"
                          value={
                            packageData?.Offline_Broadband_Bill_Pay_Commission
                          }
                          disabled
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Provider 1 Electricity Bill Pay Commission</h2>
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
                            packageData?.Online_Electricity_Bill_Pay_Commission_Type
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
                          // placeholder="Enter Commission"
                          name="Online_Electricity_Bill_Pay_Commission"
                          value={
                            packageData?.Online_Electricity_Bill_Pay_Commission
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Provider 2 Electricity Bill Pay Commission</h2>
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
                            packageData?.Offline_Electricity_Bill_Pay_Commission_Type
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
                          // placeholder="Enter Commission"
                          name="Offline_Electricity_Bill_Pay_Commission"
                          value={
                            packageData?.Offline_Electricity_Bill_Pay_Commission
                          }
                          disabled
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>Provider 1 Insurance Pay Commission</h2>
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
                            packageData?.Online_Insurance_Pay_Commission_Type
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
                          // placeholder="IFSC Code"
                          value={packageData?.Online_Insurance_Pay_Commission}
                          disabled
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
                      <h2>Provider 2 Insurance Pay Commission</h2>
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
                            packageData?.Offline_Insurance_Pay_Commission_Type
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
                          // placeholder="IFSC Code"
                          value={packageData?.Offline_Insurance_Pay_Commission}
                          disabled
                        />
                      </div>
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center  mb-5 mt-3">
                                                <button className="btn p-2">Change</button>
                                            </div>
                                        </div> */}
                  </div>

                  {/* <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>PAN Card Price</h2>
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
                          value={packageData?.E_PAN_Card_Price}
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
                          value={packageData?.P_PAN_Card_Price}
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
                          value={packageData?.UTI_PAN_Coupon_Price}
                        />
                      </div>
                    </div>

                   
                  </div> */}
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 mt-5 px-3 pb-5">
                    <div className="text-center  my-5">
                      <h2>PAN Card Commission</h2>
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
                          value={packageData?.PAN_Card_Commission_Type}
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
                          // placeholder="Enter Commission"
                          name="E_PAN_Card_Commission"
                          value={packageData?.E_PAN_Card_Commission}
                          disabled
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
                          // placeholder="Enter Commission"
                          name="UTI_PAN_Coupon_Commission"
                          value={packageData?.UTI_PAN_Coupon_Commission}
                          disabled
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
                          // placeholder="Enter Commission"
                          name="P_PAN_Card_Commission"
                          value={packageData?.P_PAN_Card_Commission}
                          disabled
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
                          value={packageData?.whitelabel_joining_price}
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
                          value={packageData?.superDistributor_joining_price}
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
                          value={packageData?.distributor_joining_price}
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
                          value={packageData?.retailer_joining_price}
                          required
                          min={0}
                        />
                      </div>
                    </div>
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
                          value={packageData?.whiteLabel_id_price}
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
                          value={packageData?.whiteLabel_min_id_limit}
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
                          value={packageData?.whiteLabel_max_id_limit}
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
                          value={packageData?.superDistributor_id_price}
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
                          value={packageData?.superDistributor_min_id_limit}
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
                          value={packageData?.superDistributor_max_id_limit}
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
                          value={packageData?.distributor_id_price}
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
                          value={packageData?.distributor_min_id_limit}
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
                          value={packageData?.distributor_max_id_limit}
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
                          value={packageData?.retailer_id_price}
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
                          value={packageData?.retailer_min_id_limit}
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
                          value={packageData?.retailer_max_id_limit}
                          required
                          min={0}
                        />
                      </div>
                    </div>
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

export default WLMyCommission;

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
  th {
    font-weight: 500;
    font-size: 14px;
  }
  td {
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
