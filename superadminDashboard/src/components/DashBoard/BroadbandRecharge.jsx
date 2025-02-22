import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Spinner } from "react-bootstrap";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const BroadbandRecharge = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("tab1");
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const [services,setServices] = useState([]);
  const fetchServices = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getAllServicesList",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

      );
      setServices(data.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
                  icon: "error",
                  title: "Your token is expired please login again",
                });
        dispatch(clearUser());
        navigate("/");
      }
      // setLoading(false);
    }
  };
  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };

       const handleTabClick = (tab) => {
            if(tab == "tab2"){
              if(services){
                       
                const purchaseBankIdService = services.find(
                  (item) => item.service_name === "Provider 2 recharge"
                );
              
                if (purchaseBankIdService?.status === "Deactive") {
                  Swal.fire({
                    title: "Provider 2 service is currently Not Available",
                    text: "Please try after some time",
                    icon: "error",
                  });
                  // navigate("/prepaid-recharge");
                }
                else{
                  setActiveTab(tab);
                }
              }
            }
            else{
              setActiveTab(tab);
            }
            
            
          };

  const [formData, setFormData] = useState({
    operatorName: "",
    number: "",
    amount: "",
    walletDeductAmt: "",
    recharge_Type: "Broadband",
    created_by_userid: currentUser.userId,
  });
  const [offlineForm, setOfflineForm] = useState({
    mobile_no: "",
    operator_name: "",
    amount: "",
    recharge_Type: "Broadband",
    userId: currentUser.userId,
  });
  const [response, setResponse] = useState(null);
  const [responseForm, setResponseForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showOnlinePinModal, setShowOnlinePinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [onlinePin, setOnlinePin] = useState(["", "", "", ""]); //Online pin
  const pinRefs = useRef([]);
   const [userRelation, setUserRelation] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const operatorOptions = [
    { name: "Airtel Broadband", value: "Airtel Broadband" },
    { name: "Hathway Broadband", value: "Hathway Broadband" },
    { name: "BSNL Broadband", value: "BSNL Broadband" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getAllRechargeApi`
        );
        if (response.data.status === "Success") {
          console.log(response.data.data);
          setApiData(response.data.data);
        }
      } catch (error) {
        console.log(`Error In API URLs accessing data ${error}`);
      }
    };

    fetchData();
    fetchServices();
  }, []);

  const handleChange = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
    const { name, value } = e.target;
    if(name === "number" || name === "amount"){
      
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
    else{
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChangeForm = (e) => {
    // setOfflineForm({
    //   ...offlineForm,
    //   [e.target.name]: e.target.value,
    // });
    const { name, value } = e.target;
    if(name === "mobile_no" || name === "amount"){
      
      if (/^\d*$/.test(value)) {
        setOfflineForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
    else{
      setOfflineForm({
        ...offlineForm,
        [name]: value,
      });
    }
  };

  const BroadbandRechargeComm = async (
    retailer,
    distributor,
    superDistributor,
    white_lable,
    packageDetails,
    item
  ) => {
    const Order_Id = `ORW${Date.now()}`;
    const Transaction_Id = `TXNW${Date.now()}`;
    const retailerFormData = {
      userId: currentUser.userId,
      amount: "",
      Transaction_details: `Commission Credit for Broadband`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for Broadband`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for Broadband`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for Broadband`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const retailerPackage = packageDetails?.retailer
      ? packageDetails?.retailer[0]
      : {};
    const distributorPackage = packageDetails?.distributor
      ? packageDetails?.distributor[0]
      : {};
    const superDistributorPackage = packageDetails?.superDistributor
      ? packageDetails?.superDistributor[0]
      : {};
    const whiteLablePackage = packageDetails?.whiteLable
      ? packageDetails?.whiteLable[0]
      : {};

    const operatorName = item.operatorName;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;

    try {
      if(retailerPackage.Online_Broadband_Bill_Pay_Commission_Type == "Percentage"){
               
        retailerCommAmount = (amount * parseFloat(retailerPackage.Online_Broadband_Bill_Pay_Commission))/100
        
    }
    else{
        retailerCommAmount = parseFloat(retailerPackage.Online_Broadband_Bill_Pay_Commission)
    }

    if(distributor && distributorPackage){
      if(distributorPackage.Online_Broadband_Bill_Pay_Commission_Type == "Percentage"){
        
          distributorCommAmount = (amount * parseFloat(distributorPackage.Online_Broadband_Bill_Pay_Commission))/100
       
      }
      else{
       
          distributorCommAmount = parseFloat(distributorPackage.Online_Broadband_Bill_Pay_Commission)
       
      }

    }
    if(superDistributor && superDistributorPackage){
      if(superDistributorPackage.Online_Broadband_Bill_Pay_Commission_Type == "Percentage"){
        
          superDistributorCommAmount = (amount * parseFloat(superDistributorPackage.Online_Broadband_Bill_Pay_Commission))/100
         
      }
      else{
       
          superDistributorCommAmount = parseFloat(superDistributorPackage.Online_Broadband_Bill_Pay_Commission)
        
      }

    }
    if(white_lable && whiteLablePackage){
      if(whiteLablePackage.Online_Broadband_Bill_Pay_Commission_Type == "Percentage"){
        
          whiteLableCommAmount = (amount * parseFloat(whiteLablePackage.Online_Broadband_Bill_Pay_Commission))/100
        
      }
      else{
        
          whiteLableCommAmount = parseFloat(whiteLablePackage.Online_Broadband_Bill_Pay_Commission)
        
      }

    }

      retailerFormData.amount = retailerCommAmount;
      distributorFormData.amount = distributorCommAmount;
      superDistributorFormData.amount = superDistributorCommAmount;
      whiteLableFormData.amount = whiteLableCommAmount;
      //  console.log(retailerCommAmount)
      //  console.log(distributorCommAmount)
      //  console.log(superDistributorCommAmount)
      //  console.log(whiteLableCommAmount)
    } catch (error) {
      console.log(error);
    }
    return {
      retailerFormData,
      distributorFormData,
      superDistributorFormData,
      whiteLableFormData,
      Order_Id,
      Transaction_Id,
    };
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result = {};
    let usersId = {
      distributorId: "NA",
      superDistributorId: "NA",
      whiteLabelId: "NA",
    };

       // Package Find code
       try {
        // setLoading(true);
  
        const { data } = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserRelations/${currentUser.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log(data.data);
        setUserRelation(data.data);
  
        if (data.data) {
          const { distributor, superDistributor, white_lable } = data.data;
          usersId.distributorId = distributor;
          usersId.superDistributorId = superDistributor;
          usersId.whiteLabelId = white_lable;
          const retailer = currentUser.userId;
          // Create an array to hold promises and a mapping object
          const promises = [];
          const resultsMap = {
            retailer: null,
            distributor: null,
            superDistributor: null,
            whiteLable: null,
          };
  
          const retailerPromise = axios
            .get(
              `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserPackageDetails/${retailer}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              resultsMap.retailer = response.data.data;
            });
          promises.push(retailerPromise);
  
          if (distributor) {
            const distributorPromise = axios
              .get(
                `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserPackageDetails/${distributor}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                resultsMap.distributor = response.data.data;
              });
            promises.push(distributorPromise);
          }
  
          if (superDistributor) {
            const superDistributorPromise = axios
              .get(
                `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserPackageDetails/${superDistributor}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                resultsMap.superDistributor = response.data.data;
              });
            promises.push(superDistributorPromise);
          }
  
          if (white_lable) {
            const whiteLablePromise = axios
              .get(
                `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserPackageDetails/${white_lable}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                resultsMap.whiteLable = response.data.data;
              });
            promises.push(whiteLablePromise);
          }
  
          // Wait for all promises to resolve
          await Promise.all(promises);
  
          // Log the results
          console.log("retailer Package:", resultsMap.retailer);
          console.log("Distributor Package:", resultsMap.distributor);
          console.log("Super Distributor Package:", resultsMap.superDistributor);
          console.log("White Label Package:", resultsMap.whiteLable);
  
          // let result = {};
          result = await BroadbandRechargeComm(
            retailer,
            distributor,
            superDistributor,
            white_lable,
            resultsMap,
            formData
          );
          console.log(result);
          console.log(result.retailerFormData.amount);
        }
      } catch (error) {
        console.error("There was an error submitting the form!", error);
        if (error?.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Your token is expired please login again",
          });
          dispatch(clearUser());
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "An error occurred during the process. Please try again.",
          });
        }
      }
      // Package Find code
      let success = false;
  
      if (
        result.retailerFormData.amount === null ||
        result.retailerFormData.amount === undefined ||
        isNaN(result.retailerFormData.amount)
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong Please try Again!",
        });
        return;
      }
  
      const commissionAmt = parseFloat(result.retailerFormData.amount).toFixed(2);
      const rechargeAmt = parseFloat(formData.amount).toFixed(2);
  
      const walletAmt = rechargeAmt - commissionAmt;
      console.log(walletAmt);
  
      // setFormData((prev) => {
      //   return { ...prev, walletDeductAmt: walletAmt };
      // });
  
      // Update formData directly
      const updatedFormData = {
        ...formData,
        walletDeductAmt: walletAmt,
      };
  
      // Log updated formData
      console.log(updatedFormData);
  
      // const data = {
      //   operatorName: "Vi",
      //   number: "9806324244",
      //   amount: "10",
      //   walletDeductAmt: "9.1",
      //   recharge_Type: "Prepaid",
      //   created_by_userid: currentUser.userId,
      //   // orderid: "4654747",
      // };
  
   

    for (const api of apiData) {
      setLoading(true);
      try {
        const rechargeResult = await axios.post(api.API_URL, updatedFormData);

        if (rechargeResult.data && rechargeResult.data.message === "Recharge successful") {
          Swal.fire({
            title: "Done!",
            text: "Recharge Successful",
            icon: "success",
          });
          setResponse(result.data);
          success = true;
          // Recharge Commission Credit WL SD D
          let allProcessesSuccessful = true;
          result.retailerFormData.Transaction_details = `Commission Credit for Broadband Order Id ${rechargeResult.data.orderId}`;
          result.distributorFormData.Transaction_details = `Commission Credit for Broadband Order Id ${rechargeResult.data.orderId}`;
          result.superDistributorFormData.Transaction_details = `Commission Credit for Broadband Order Id ${rechargeResult.data.orderId}`;
          result.whiteLableFormData.Transaction_details = `Commission Credit for Broadband Order Id ${rechargeResult.data.orderId}`;
          if (
            result &&
            result.distributorFormData &&
            result.distributorFormData.amount
          ) {
            const response = await axios
              .put(
                "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/CreditCommission",
                // "https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/AddWalletAddMoneyDirect",
                result.distributorFormData,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .catch(() => {
                allProcessesSuccessful = false;
              });
          }
          if (
            result &&
            result.superDistributorFormData &&
            result.superDistributorFormData.amount
          ) {
            const response = await axios
              .put(
                "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/CreditCommission",
                // "https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/AddWalletAddMoneyDirect",
                result.superDistributorFormData,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .catch(() => {
                allProcessesSuccessful = false;
              });
          }
          if (
            result &&
            result.whiteLableFormData &&
            result.whiteLableFormData.amount
          ) {
            const response = await axios
              .put(
                "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/CreditCommission",
                // "https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/AddWalletAddMoneyDirect",
                result.whiteLableFormData,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .catch(() => {
                allProcessesSuccessful = false;
              });
          }

          if (result) {
            let whiteLabel_Commission = 0;
            let super_Distributor_Commission = 0;
            let distributor_Commission = 0;
            let retailer_Commission = 0;
            if (result.whiteLableFormData && result.whiteLableFormData.amount) {
              whiteLabel_Commission = result.whiteLableFormData.amount;
            }
            if (
              result.superDistributorFormData &&
              result.superDistributorFormData.amount
            ) {
              super_Distributor_Commission =
                result.superDistributorFormData.amount;
            }
            if (
              result.distributorFormData &&
              result.distributorFormData.amount
            ) {
              distributor_Commission = result.distributorFormData.amount;
            }
            if (result.retailerFormData && result.retailerFormData.amount) {
              retailer_Commission = result.retailerFormData.amount;
            }
            console.log(userRelation);

            const commissionFormData = {
              order_id: result.Order_Id,
              transaction_id: result.Transaction_Id,
              amount: updatedFormData.amount,
              whiteLabel_id: usersId.whiteLabelId ? usersId.whiteLabelId : "NA",
              super_Distributor_id: usersId.superDistributorId
                ? usersId.superDistributorId
                : "NA",
              distributor_id: usersId.distributorId
                ? usersId.distributorId
                : "NA",
              retailer_id: currentUser.userId ? currentUser.userId : "NA",
              whiteLabel_Commission: whiteLabel_Commission,
              super_Distributor_Commission: super_Distributor_Commission,
              distributor_Commission: distributor_Commission,
              retailer_Commission: retailer_Commission,
              transaction_type: updatedFormData.recharge_Type,
              transaction_details: result.retailerFormData.Transaction_details,
              status: "Success",
            };
            console.log(commissionFormData);
            await axios
              .post(
                "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/addCommissionEntry",
                // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
                commissionFormData,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .catch(() => {
                allProcessesSuccessful = false;
              });
          }
          // Recharge Commission Credit WL SD D
          break;
        }
        else if (rechargeResult.data &&
          rechargeResult.data.message === "Recharge in process"){
            success = true;
            Swal.fire({
              icon: "info",
              title: "Recharge in process",
              text: "Recharge in process please wait it will take Sometime!",
            });
            let allProcessesSuccessful = true;
            result.retailerFormData.Transaction_details = `Commission Credit for Broadband Order Id ${rechargeResult.data.orderId}`;
            
            if (result) {
              let whiteLabel_Commission = 0;
              let super_Distributor_Commission = 0;
              let distributor_Commission = 0;
              let retailer_Commission = 0;
              if (result.retailerFormData && result.retailerFormData.amount) {
                retailer_Commission = result.retailerFormData.amount;
              }
              console.log(userRelation);
  
              const commissionFormData = {
                order_id: result.Order_Id,
                transaction_id: result.Transaction_Id,
                amount: updatedFormData.amount,
                whiteLabel_id: usersId.whiteLabelId ? usersId.whiteLabelId : "NA",
                super_Distributor_id: usersId.superDistributorId
                  ? usersId.superDistributorId
                  : "NA",
                distributor_id: usersId.distributorId
                  ? usersId.distributorId
                  : "NA",
                retailer_id: currentUser.userId ? currentUser.userId : "NA",
                whiteLabel_Commission: whiteLabel_Commission,
                super_Distributor_Commission: super_Distributor_Commission,
                distributor_Commission: distributor_Commission,
                retailer_Commission: retailer_Commission,
                transaction_type: updatedFormData.recharge_Type,
                transaction_details: result.retailerFormData.Transaction_details,
                status: "Success",
              };
              console.log(commissionFormData);
              await axios
                .post(
                  "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/addCommissionEntry",
                  // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
                  commissionFormData,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .catch(() => {
                  allProcessesSuccessful = false;
                });
            }
            // Recharge Commission Credit WL SD D
            break;
        } else if (
          rechargeResult.data.rechargeData &&
          rechargeResult.data.rechargeData.status === "Failure"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong with this API!",
          });
        }
      } catch (error) {
        console.error(
                                "Error in recharge:",
                                error.response ? error.response.data : error.message
                              );
                              if (error?.response?.status === 401) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Your token is expired. Please login again.",
                                });
                                dispatch(clearUser());
                                navigate("/");
                              }
      }
      finally {
        // Clear form data and stop loading
        setFormData({
          operatorName: "",
          number: "",
          amount: "",
          walletDeductAmt: "",
          recharge_Type: "Broadband",
          created_by_userid: currentUser.userId,
        });

        setLoading(false);
      }
    }

    if (!success) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All providers are currently unavailable. Please try again later.",
      });
    }

    setLoading(false);
  };

  const handlesubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make the API call
      const result = await axios.post(
        // "http://localhost:7777/api/auth/wallet/offlineRechargeAndUpdateWallet",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/wallet/offlineRechargeAndUpdateWallet",
        offlineForm
      );

      setResponseForm(result.data);
      console.log("API Response:", result.data);

      if (result.data.status === "Failure") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.data.error || result.data.message || "Recharge failed!",
        });
      } else if (result.data.status === "Success") {
        Swal.fire({
          title: "Done!",
          text: `Recharge Successful! Order ID: ${result.data.details.recharge.orderId}`,
          icon: "success",
        });
        setOfflineForm({
          mobile_no: "",
          operator_name: "",
          amount: "",
          recharge_Type: "Broadband",
          userId: currentUser.userId,
        });
      }
    } catch (error) {
      console.error(
        "Error in recharge:",
        error.response ? error.response.data : error.message
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
      setResponseForm(null);
    } finally {
      setLoading(false);
    }
  };

  // PIN Integration
  const handlePinChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to next input if current is filled, move to previous if deleted
      if (value !== "" && index < pin.length - 1) {
        pinRefs.current[index + 1].focus();
      } else if (value === "" && index > 0) {
        pinRefs.current[index - 1].focus();
      }
    }
  };

  // Onlined PIN Integration
  const handleOnlinePinChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...onlinePin];
      newPin[index] = value;
      setOnlinePin(newPin);

      // Move to next input if current is filled, move to previous if deleted
      if (value !== "" && index < onlinePin.length - 1) {
        pinRefs.current[index + 1].focus();
      } else if (value === "" && index > 0) {
        pinRefs.current[index - 1].focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (pin[index] === "" && index > 0) {
      pinRefs.current[index - 1].focus();
    }
  };

  const verifyPin = async () => {
    try {
      const response = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verify-pin`,
        { user_id: currentUser.userId || "", pin: pin.join("") }
      );

      if (response.data.success) {
        return true;
      } else {
        // alert(response.data.message);
        Swal.fire({
                         title: "Error verifying PIN",
                         text: response?.data?.message || "Something went wrong! Please Try again",
                         icon: "error",
                       });
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      // alert("Error verifying PIN");
      Swal.fire({
                   title: "Error verifying PIN",
                   text: error?.response?.data?.message || "Something went wrong! Please Try again",
                   icon: "error",
                 });
      return false;
    }
  };

      // Onlined PIN Integration
const verifyOnlinePin = async () => {
  try {
    const response = await axios.post(
      `https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/verify-pin`,
      { user_id: currentUser.userId || "", pin: onlinePin.join("") }
    );
    if (response.data.success) {
      return true;
    } else {
      // alert(response.data.message);
      Swal.fire({
                        title: "Error verifying PIN",
                        text: response?.data?.message || "Something went wrong! Please Try again",
                        icon: "error",
                      });
      return false;
    }
  } catch (error) {
    console.error("Error verifying PIN:", error);
    // alert("Error verifying PIN");
     Swal.fire({
                  title: "Error verifying PIN",
                  text: error?.response?.data?.message || "Something went wrong! Please Try again",
                  icon: "error",
                });
    return false;
  }
};

  const handleModalSubmit = async (e) => {
    setIsVerifying(true);
    const isPinValid = await verifyPin();
    setIsVerifying(false);
    if (isPinValid) {
      setShowPinModal(false);
      handlesubmitForm(e);
      setPin(["", "", "", ""]);
    } else {
      setPin(["", "", "", ""]);
    }
  };

    // Onlined PIN Integration
    const handleOnlineModalSubmit = async (e) => {
      setIsVerifying(true);
      const isPinValid = await verifyOnlinePin();
      setIsVerifying(false);
      if (isPinValid) {
        setShowOnlinePinModal(false);
        handleSubmit(e); // Online form submit
        setOnlinePin(["", "", "", ""]); // Reset the online PIN
      } else {
        setOnlinePin(["", "", "", ""]);
      }
    };

  const openPinModal = (e) => {
    e.preventDefault();
    setShowPinModal(true);
  };

  const openOnlinePinModal = (e) => {
    e.preventDefault();
    setShowOnlinePinModal(true);
    console.log("Online PIN");
  };

  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Loading />
          </div>
        ) : (
          <div className="main">
            <div className="container-fluid">
              <div className="row flex-wrap justify-content-center">
                <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none">
                  {/* <Sider /> */}
                </div>
                <div
                  className="col-xxl-12 col-xl-12 col-lg-12 col-md-12  col-sm-12  col-11
                             mt-5 formdata"
                >
                  <div className="main shadow-none">
                    <div className="row shadow-none mb-5">
                      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                            Broadband Recharge
                          </h4>
                          <h6 className="mx-lg-5">
                            {" "}
                            <BiHomeAlt /> &nbsp; / &nbsp; Broadband Recharge
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="circle-nav">
                      <button
                        className={`circle-btn ${
                          activeTab === "tab1" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("tab1")}
                      >
                        Provider 1
                      </button>
                      <button
                        className={`circle-btn ${
                          activeTab === "tab2" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("tab2")}
                      >
                        Provider 2
                      </button>
                    </div>
                    <div className="tab-content">
                      <div
                        className={`tab-pane ${
                          activeTab === "tab1" ? "active" : ""
                        }`}
                      >
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-6">
                              <div className="card bg-body-tertiary shadow">
                                <div className="p-4">
                                  <div className="text-center">
                                    <h3 className="mb-4">Broadband Recharge</h3>
                                    <div>
                                      {/* {loading ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          // height: "40vh",
                                        }}
                                      >
                                        <Loading />
                                      </div>
                                    ) : ( */}
                                      <form onSubmit={openOnlinePinModal}>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              placeholder="Username"
                                              value={formData.number}
                                              onChange={handleChange}
                                              name="number"
                                              autoComplete="off"
                                              required
                                              maxLength={11}
                                              minLength={11}
                                            />
                                            <label for="floatingInputGroup1">
                                             Number
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="floatingSelectOperator"
                                              value={formData.operatorName}
                                              onChange={handleChange}
                                              name="operatorName"
                                              aria-label="Select Operator"
                                            >
                                              <option value="">
                                                Select Operator
                                              </option>
                                              {operatorOptions.map((item) => (
                                                <>
                                                  <option value={item.value}>
                                                    {item.name}
                                                  </option>
                                                </>
                                              ))}
                                            </select>
                                            <label for="floatingSelectOperator">
                                              Select Operator
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              placeholder="Username"
                                              value={formData.amount}
                                              onChange={handleChange}
                                              name="amount"
                                              autoComplete="off"
                                            />
                                            <label for="floatingInputGroup1">
                                              Amount
                                            </label>
                                          </div>
                                        </div>
                                        <div className="text-start mt-2 mb-3">
                                          <button
                                            className="btn btn-none text-light"
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                            disabled={loading || !formData.amount || !formData.number || !formData.operatorName ||  formData.number.length < 10}
                                            type="submit"
                                          >
                                            Recharge Now
                                          </button>
                                        </div>
                                      </form>
                                      {/*  )} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`tab-pane ${
                          activeTab === "tab2" ? "active" : ""
                        }`}
                      >
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-6">
                              <div className="card bg-body-tertiary shadow">
                                <div className="p-4">
                                  <div className="text-center">
                                    <h3 className="mb-4">
                                      Broadband Recharge 2
                                    </h3>
                                    <div>
                                      <form onSubmit={openPinModal}>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              placeholder="Username"
                                              value={offlineForm.mobile_no}
                                              onChange={handleChangeForm}
                                              name="mobile_no"
                                              required
                                              maxLength={11}
                                              minLength={11}
                                            />
                                            <label for="floatingInputGroup1">
                                              Number
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="floatingSelectOperator"
                                              value={offlineForm.operator_name}
                                              onChange={handleChangeForm}
                                              name="operator_name"
                                              aria-label="Select Operator"
                                            >
                                              <option value="">
                                                Select Operator
                                              </option>
                                              {operatorOptions.map((item) => (
                                                <>
                                                  <option value={item.value}>
                                                    {item.name}
                                                  </option>
                                                </>
                                              ))}
                                            </select>
                                            <label for="floatingInputGroup1">
                                              Select Operator
                                            </label>
                                          </div>
                                        </div>
                                        {/* <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              placeholder="Username"
                                            />
                                            <label for="floatingInputGroup1">
                                              Select Circle
                                            </label>
                                          </div>
                                        </div>
                                        <div className="text-start mt-2 mb-3">
                                          <button
                                            className="btn btn-none text-light"
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                          >
                                            Check Plans
                                          </button>
                                        </div> */}
                                        <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              placeholder="Username"
                                              value={offlineForm.amount}
                                              onChange={handleChangeForm}
                                              name="amount"
                                            />
                                            <label for="floatingInputGroup1">
                                              Amount
                                            </label>
                                          </div>
                                        </div>
                                        <div className="text-start mt-2 mb-3">
                                          <button
                                            className="btn btn-none text-light"
                                            type="submit"
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                            disabled={loading || !offlineForm.amount || !offlineForm.mobile_no || !offlineForm.operator_name || offlineForm.mobile_no.length < 10}
                                          >
                                            Recharge Now
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Modal
          show={showPinModal}
          onHide={() => setShowPinModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter 4-Digit PIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="pin-inputs d-flex justify-content-center">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (pinRefs.current[index] = el)}
                  type="text"
                  value={digit ? "●" : ""} // Show a dot if digit is entered, otherwise empty
                  maxLength="1"
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Backspace" && handleBackspace(index)
                  }
                  className="pin-digit form-control mx-1"
                  style={{
                    width: "50px",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  }}
                />
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-100 d-flex justify-content-center">
              <Button
                variant="secondary"
                onClick={() => setShowPinModal(false)}
                className="mx-1"
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={handleModalSubmit}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify PIN"}
                {isVerifying && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showOnlinePinModal}
          onHide={() => setShowOnlinePinModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter 4-Digit PIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="pin-inputs d-flex justify-content-center">
              {onlinePin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (pinRefs.current[index] = el)}
                  type="text"
                  value={digit ? "●" : ""} // Show a dot if digit is entered, otherwise empty
                  maxLength="1"
                  onChange={(e) => handleOnlinePinChange(index, e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Backspace" && handleBackspace(index)
                  }
                  className="pin-digit form-control mx-1"
                  style={{
                    width: "50px",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    borderRadius: "8px",
                    border: "1px solid #ced4da",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  }}
                />
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-100 d-flex justify-content-center">
              <Button
                variant="secondary"
                onClick={() => setShowOnlinePinModal(false)}
                className="mx-1"
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={handleOnlineModalSubmit}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify PIN"}
                {isVerifying && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    </>
  );
};

export default BroadbandRecharge;
const Wrapper = styled.div`
  .circle-nav {
    width: 100%;
    display: flex;
    justify-content: center;
    @media (min-width: 360px) and (max-width: 540px) {
      flex-wrap: wrap;
      position: absolute;
      left: 0;
    }
  }

  .circle-btn {
    width: 150px;
    height: 50px;
    border-radius: 25px;
    border: 2px solid #007bff;
    background-color: #ffffff;
    color: #007bff;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .circle-btn:hover {
    background-color: #007bff;
    color: #ffffff;
  }

  .circle-btn.active {
    background-color: #007bff;
    color: #ffffff;
    border-color: #0056b3;
  }

  .tab-pane {
    display: none;
  }

  .tab-pane.active {
    display: block;
  }

  .card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.5rem;
    background-color: #ffffff;
    margin-top: 4rem;
    @media (min-width: 360px) and (max-width: 400px) {
      margin-top: 6rem;
      position: absolute;
      left: 35px;
    }
    @media (min-width: 401px) and (max-width: 500px) {
      margin-top: 6rem;
      position: absolute;
      left: 60px;
    }
    @media (min-width: 501px) and (max-width: 600px) {
      margin-top: 6rem;
      position: absolute;
      left: 110px;
    }
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  @media (min-width: 1025px) and (max-width: 1500px) {
    .formdata {
      padding-left: 15rem;
    }
  }
  @media (min-width: 1500px) {
    .formdata {
      padding-left: 15rem;
    }
  }
`;
