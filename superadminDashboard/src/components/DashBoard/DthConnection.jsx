import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BiSolidCreditCardAlt } from "react-icons/bi";
import { BiGroup } from "react-icons/bi";
import { ImAddressBook } from "react-icons/im";
import { LuSquareCode } from "react-icons/lu";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button , Spinner  } from "react-bootstrap";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const DthConnection = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("tab1");
    const [isVerifying, setIsVerifying] = useState(false);
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

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    number: "",
    opcode : "TPC",
    operatorName : "Tata Sky",
    amount: "",
    walletDeductAmt : "",
    plan_id: "",
    first_name: "",
    last_name: "",
    full_address: "",
    postal_code: "",
    user_id: currentUser.userId
  });

  const [plans, setPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [submitForm, setSubmitForm] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = useRef([]);
  const [userRelation, setUserRelation] = useState([]);

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    const { name, value } = e.target;
    if(name === "number" || name === "postal_code"){
      
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

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      ...formData,
      amount: plan.amount,
      plan_id: plan.plan_id,
    });
  };

  const DthConnectionComm = async (
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
      Transaction_details: `Commission Credit for DTH Connection`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for DTH Connection`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for DTH Connection`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for DTH Connection`,
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
      if (retailerPackage.Online_New_DTH_Connection_Commission_Type == "Percentage") {
        if (operatorName == "Dish TV") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.On_Dish_TV_New_DTH_Connection_Commission)) /
            100;
        } else if (operatorName == "Tata Sky") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.On_Tata_Sky_New_DTH_Connection_Commission)) /
            100;
        } else if (operatorName == "Videocon") {
          retailerCommAmount =
            (amount * parseFloat(retailerPackage.On_Videocon_New_DTH_Connection_Commission)) /
            100;
        } else if (operatorName == "Sun Direct") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.On_Sun_Direct_New_DTH_Connection_Commission)) /
            100;
        }
        else if (operatorName == "Airtel DTH") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.On_Airtel_New_DTH_Connection_Commission)) /
            100;
        }
      } else {
        if (operatorName == "Dish TV") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Dish_TV_New_DTH_Connection_Commission
          );
        } else if (operatorName == "Tata Sky") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Tata_Sky_New_DTH_Connection_Commission
          );
        } else if (operatorName == "Videocon") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Videocon_New_DTH_Connection_Commission
          );
        } else if (operatorName == "Sun Direct") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Sun_Direct_New_DTH_Connection_Commission
          );
        }
        else if (operatorName == "Airtel DTH") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Airtel_New_DTH_Connection_Commission
          );
        }
        
      }

      if (distributor && distributorPackage) {
        if (distributorPackage.Online_New_DTH_Connection_Commission_Type == "Percentage") {
          if (operatorName == "Dish TV") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.On_Dish_TV_New_DTH_Connection_Commission)) /
              100;
          } else if (operatorName == "Tata Sky") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.On_Tata_Sky_New_DTH_Connection_Commission
                )) /
              100;
          } else if (operatorName == "Videocon") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.On_Videocon_New_DTH_Connection_Commission)) /
              100;
          } else if (operatorName == "Sun Direct") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.On_Sun_Direct_New_DTH_Connection_Commission)) /
              100;
          }
          else if (operatorName == "Airtel DTH") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.On_Airtel_New_DTH_Connection_Commission)) /
              100;
          }
        } else {
          if (operatorName == "Dish TV") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Dish_TV_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Tata Sky") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Tata_Sky_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Videocon") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Videocon_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Sun Direct") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Sun_Direct_New_DTH_Connection_Commission
            );
          }
          else if (operatorName == "Airtel DTH") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Airtel_New_DTH_Connection_Commission
            );
          }
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.Online_New_DTH_Connection_Commission_Type == "Percentage"
        ) {
          if (operatorName == "Dish TV") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Dish_TV_New_DTH_Connection_Commission
                )) /
              100;
          } else if (operatorName == "Tata Sky") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Tata_Sky_New_DTH_Connection_Commission
                )) /
              100;
          } else if (operatorName == "Videocon") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Videocon_New_DTH_Connection_Commission
                )) /
              100;
          } else if (operatorName == "Sun Direct") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Sun_Direct_New_DTH_Connection_Commission
                )) /
              100;
          }
          else if (operatorName == "Airtel DTH") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Airtel_New_DTH_Connection_Commission
                )) /
              100;
          }
        } else {
          if (operatorName == "Dish TV") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Dish_TV_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Tata Sky") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Tata_Sky_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Videocon") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Videocon_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Sun Direct") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Sun_Direct_New_DTH_Connection_Commission
            );
          }
          else if (operatorName == "Airtel DTH") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Airtel_New_DTH_Connection_Commission
            );
          }
        }
      }
      if (white_lable && whiteLablePackage) {
        if (whiteLablePackage.Online_New_DTH_Connection_Commission_Type == "Percentage") {
          if (operatorName == "Dish TV") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Dish_TV_New_DTH_Connection_Commission)) /
              100;
          } else if (operatorName == "Tata Sky") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Tata_Sky_New_DTH_Connection_Commission)) /
              100;
          } else if (operatorName == "Videocon") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Videocon_New_DTH_Connection_Commission)) /
              100;
          } else if (operatorName == "Sun Direct") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Sun_Direct_New_DTH_Connection_Commission)) /
              100;
          }
          else if (operatorName == "Airtel DTH") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Airtel_New_DTH_Connection_Commission)) /
              100;
          }
        } else {
          if (operatorName == "Dish TV") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Dish_TV_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Tata Sky") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Tata_Sky_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Videocon") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Videocon_New_DTH_Connection_Commission
            );
          } else if (operatorName == "Sun Direct") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Sun_Direct_New_DTH_Connection_Commission
            );
          }
          else if (operatorName == "Airtel DTH") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Airtel_New_DTH_Connection_Commission
            );
          }
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
    setLoading(true)
    // const operatorName = "Tata Play";
    // const opcode = "TPC";

    // const requestData = {
    //   ...formData,
    //   operatorName,
    //   opcode,
    // };
    
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
        result = await DthConnectionComm(
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



    try {
      const rechargeResult = await axios.post(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/api-dth-recharge`,
        updatedFormData
      );
      setLoading(false)
      console.log(response.data);
      if (rechargeResult.data && rechargeResult.data.message === "Recharge successful") {
        Swal.fire({
          title: "Done!",
          text: "Recharge Successful",
          icon: "success",
        });
        setResponse(rechargeResult.data);
        success = true;
        console.log(rechargeResult.data);
        console.log(rechargeResult.data.orderId);
       
        // Recharge Commission Credit WL SD D
        let allProcessesSuccessful = true;
        result.retailerFormData.Transaction_details = `Commission Credit for DTH Connection Order Id ${rechargeResult.data.orderId}`;
        result.distributorFormData.Transaction_details = `Commission Credit for DTH Connection Order Id ${rechargeResult.data.orderId}`;
        result.superDistributorFormData.Transaction_details = `Commission Credit for DTH Connection Order Id ${rechargeResult.data.orderId}`;
        result.whiteLableFormData.Transaction_details = `Commission Credit for DTH Connection Order Id ${rechargeResult.data.orderId}`;
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
        setFormData({
          number: "",
          opcode : "TPC",
          operatorName : "Tata Sky",
          amount: "",
          walletDeductAmt : "",
          plan_id: "",
          first_name: "",
          last_name: "",
          full_address: "",
          postal_code: "",
          user_id: currentUser.userId
        })
      
      }
      else if (rechargeResult.data &&
        rechargeResult.data.message === "Recharge in process"){
          success = true;
          Swal.fire({
            icon: "info",
            title: "Recharge in process",
            text:  `Recharge Pending! Please wait for Sometime, Order ID: ${rechargeResult?.data?.orderId}`,
          });
          let allProcessesSuccessful = true;
          result.retailerFormData.Transaction_details = `Commission Credit for DTH Recharge Order Id ${rechargeResult?.data?.orderId}`;
          
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
          setFormData({
            number: "",
            opcode : "TPC",
            operatorName : "Tata Sky",
            amount: "",
            walletDeductAmt : "",
            plan_id: "",
            first_name: "",
            last_name: "",
            full_address: "",
            postal_code: "",
            user_id: currentUser.userId
          })
        }
  
      else if( rechargeResult.data.message == "Recharge failed" || rechargeResult.data.message == "Recharge failed but no money was deducted"){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong! Please try again later.Order ID: ${rechargeResult.data.orderId}`,
        });
        // setFormData({
        //   number: "",
        //   amount: "",
        //   plan_id: "",
        //   first_name: "",
        //   last_name: "",
        //   full_address: "",
        //   postal_code: "",
        //   user_id: currentUser.userId
        // })
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
                     else{
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${error.response.data.error}` || "Something went wrong! Please try again later.",
                      });
                     }
    }
    finally {
      // Clear form data and stop loading
      // setFormData({
      //   number: "",
      //   opcode : "TPC",
      //   operatorName : "Tata Sky",
      //   amount: "",
      //   walletDeductAmt : "",
      //   plan_id: "",
      //   first_name: "",
      //   last_name: "",
      //   full_address: "",
      //   postal_code: "",
      //   user_id: currentUser.userId
      // })

      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true)
  //   // const operatorName = "Tata Play";
  //   // const opcode = "TPC";

  //   // const requestData = {
  //   //   ...formData,
  //   //   operatorName,
  //   //   opcode,
  //   // };
    

  //   try {
  //     const response = await axios.post(
  //       `https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/api-dth-recharge`,
  //       formData
  //     );
  //     setLoading(false)
  //     console.log(response.data);
  //     if(response.data.message == "Recharge successful"){
  //       Swal.fire({
  //         title: "Done!",
  //         text: `Recharge Successful! Order ID: ${response.data.orderId}`,
  //         icon: "success",
  //       });
  //       setFormData({
  //         number: "",
  //         amount: "",
  //         walletDeductAmt : "",
  //         plan_id: "",
  //         first_name: "",
  //         last_name: "",
  //         full_address: "",
  //         postal_code: "",
  //         user_id: currentUser.userId
  //       })
  //     }
  //     else if(response.data.message == "Recharge pending"){
  //       Swal.fire({
  //         title: "Done!",
  //         text: `Recharge Pending! Please wait for Sometime, Order ID: ${response.data.orderId}`,
  //         icon: "info",
  //       });
  //       setFormData({
  //         number: "",
  //         amount: "",
  //         walletDeductAmt : "",
  //         plan_id: "",
  //         first_name: "",
  //         last_name: "",
  //         full_address: "",
  //         postal_code: "",
  //         user_id: currentUser.userId
  //       })
  //     }
  //     else if(response.data.message == "Recharge failed" || response.data.message == "Recharge failed but no money was deducted"){
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: `Something went wrong! Please try again later.Order ID: ${response.data.orderId}`,
  //       });
  //       // setFormData({
  //       //   number: "",
  //       //   amount: "",
  //       //   plan_id: "",
  //       //   first_name: "",
  //       //   last_name: "",
  //       //   full_address: "",
  //       //   postal_code: "",
  //       //   user_id: currentUser.userId
  //       // })
  //     }
  //   } catch (error) {
  //     setLoading(false)
  //     console.log(`Error in Apply Connection ${error}`);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong! Please try again later.",
  //     });
  //   }
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/dth-plan`
        );
        setPlan(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchServices();
  }, []);

  const [offlineForm, setOfflineForm] = useState({
    operatorName: "",
    first_name: "",
    last_name: "",
    full_address: "",
    postal_code: "",
    number: "",
    amount: "",
    validity: "",
    message: "",
    userId: currentUser.userId,
  });

  const [offlineDTHPlan, setOfflineDTHPlan] = useState();
  // const [selectedOfflinePlan, setSelectedOfflinePlan] = useState(null);
  const [filteredValidities, setFilteredValidities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getDthConnectionPlan`
        );
        if (data.data) {
          console.log("Fetched plans:", data.data);
          setOfflineDTHPlan(data.data);
        } else {
          console.error("No plans available in response.");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(offlineForm);

  // const handleOfflinePlanChange = (plan) => {
  //   if (!plan) {
  //     console.error("Selected plan not found.");
  //     return;
  //   }
  //   setSelectedOfflinePlan(plan);
  //   setOfflineForm({
  //     ...offlineForm,
  //     operatorName: plan.operator,
  //     amount: plan.amount,
  //     validity: plan.validity,
  //   });
  // };
  console.log(formData);
  

  const handleOperatorChange = (e) => {
    const selectedOperator = e.target.value;
    const validities = offlineDTHPlan
      .filter((item) => item.operator === selectedOperator)
      .map((item) => item.validity);

    setFilteredValidities([...new Set(validities)]); // Remove duplicates
    setOfflineForm({
      ...offlineForm,
      operatorName: selectedOperator,
      validity: "",
      amount: "",
    });
  };

  const handleValidityChange = (e) => {
    const selectedValidity = e.target.value;
    const selectedPlan = offlineDTHPlan.find(
      (item) =>
        item.operator === offlineForm.operatorName &&
        item.validity === selectedValidity
    );

    setOfflineForm({
      ...offlineForm,
      validity: selectedValidity,
      amount: selectedPlan ? selectedPlan.amount : "",
    });
  };

  const handleOfflineChange = (e) => {
    // const { name, value } = e.target;
    // setOfflineForm({ ...offlineForm, [name]: value });
    const { name, value } = e.target;
    if(name === "postal_code" || name === "number"){
      
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

  // const handleOfflineSubmit = async (e) => {
  //   e.preventDefault();

  //   const requestData = {
  //     ...offlineForm,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/offline-dth-connection`,
  //       requestData
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(`Error in Apply Connection ${error}`);
  //   }
  // };

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make the API call
      const result = await axios.post(
        // "http://localhost:7777/api/auth/wallet/dthConnectionAndUpdateWallet",
        "https://bitspan.vimubds5.a2hosted.com/api/auth/wallet/dthConnectionAndUpdateWallet",
        offlineForm
      );

      // setResponseForm(result.data);
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
          text: `Recharge Successful! Order ID: ${result.data.details.dthConnection.orderId}`,
          icon: "success",
        });
        setOfflineForm({
          operatorName: "",
          first_name: "",
          last_name: "",
          full_address: "",
          postal_code: "",
          number: "",
          amount: "",
          validity: "",
          message: "",
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
    } finally {
      setLoading(false);
    }
  };

  console.log("Submitting form data:", offlineForm);

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
          icon: "error",
          title: "Oops...",
          text: `${response.data.message}` || "Something went wrong! Please try again later.",
        });
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      // alert("Error verifying PIN");
      if(!error.response.data.success){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}` || "Error verifying PIN",
        });
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error verifying PIN",
        });
      }
    
      return false;
    }
  };

  const handleModalSubmit = async (e) => {
    setIsVerifying(true);
    const isPinValid = await verifyPin();
    setIsVerifying(false);
    if (isPinValid) {
      setShowPinModal(false);
      if(submitForm == "online"){
        handleSubmit(e)
      }
      else if (submitForm == "offline"){
        handleOfflineSubmit(e);
      }
      
      setPin(["", "", "", ""]);
    } else {
      setPin(["", "", "", ""]);
    }
  };

  const openPinModal = (e,item) => {
    console.log(item);
    
    e.preventDefault();
    setSubmitForm(item);
    setShowPinModal(true);
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
                            DTH Connection
                          </h4>
                          <h6 className="mx-lg-5">
                            {" "}
                            <BiHomeAlt /> &nbsp; / &nbsp; DTH Connection
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
                                    <h3 className="mb-4">DTH Connection</h3>
                                    <div>
                                      <form onSubmit={(e)=> openPinModal(e,"online")}>
                                        <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="plans"
                                              required
                                              value={
                                                selectedPlan?.plan_id || ""
                                              }
                                              onChange={(e) =>
                                                handlePlanChange(
                                                  plans.find(
                                                    (plan) =>
                                                      plan.plan_id ===
                                                      e.target.value
                                                  )
                                                )
                                              }
                                            >
                                              <option value="" disabled>
                                                Select Operator
                                              </option>
                                              {plans.map((plan) => (
                                                <option
                                                  key={plan.plan_id}
                                                  value={plan.plan_id}
                                                >
                                                  {plan.details}
                                                </option>
                                              ))}
                                            </select>
                                            <label for="floatingSelectOperator">
                                              Select Operator
                                            </label>
                                          </div>
                                        </div>
                                        {/* <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="plans"
                                              // value={}
                                            >
                                              <option value="" disabled>
                                                Select Operator
                                              </option>
                                              <option value="Sun Direct">
                                                Sun Direct
                                              </option>
                                              <option value="Videocon">
                                                Videocon
                                              </option>
                                              <option value="Tata Sky">
                                                Tata Sky
                                              </option>
                                              <option value="Dish TV">
                                                Dish TV
                                              </option>
                                            </select>
                                            <label for="floatingSelectOperator">
                                              Select Operator
                                            </label>
                                          </div>
                                        </div> */}

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="number"
                                              placeholder="Number"
                                              value={formData.number}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            
                                              maxLength={10}
                                              minLength={10}
                                            />
                                            <label for="floatingInputGroup1">
                                              Mobile Number
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMoneyBillAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="amount"
                                              placeholder="Amount"
                                              value={formData.amount}
                                              onChange={handleChange}
                                              required
                                              readOnly
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Amount
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiSolidCreditCardAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="plan_id"
                                              placeholder="Plan ID"
                                              value={formData.plan_id}
                                              onChange={handleChange}
                                              required
                                              readOnly
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Plan ID
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiGroup />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="first_name"
                                              placeholder="First Name"
                                              value={formData.first_name}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              First Name
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiGroup />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="last_name"
                                              placeholder="Last Name"
                                              value={formData.last_name}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Last Name
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <ImAddressBook />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="full_address"
                                              placeholder="Full Address"
                                              value={formData.full_address}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Full Address
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <LuSquareCode />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="postal_code"
                                              placeholder="Postal Code"
                                              value={formData.postal_code}
                                              onChange={handleChange}
                                              required
                                              autoComplete="new-password"
                                              
                                              maxLength={6}
                                              minLength={6}
                                            />
                                            <label for="floatingInputGroup1">
                                              Postal Code
                                            </label>
                                          </div>
                                        </div>

                                        <div className="text-start mt-2 mb-3">
                                          <button
                                            className="btn btn-none text-light"
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                            type="submit"
                                            disabled={loading}
                                          >
                                            {loading ? "Submit Now..." : "Submit Now" }
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
                                    <h3 className="mb-4">DTH Connection 2</h3>
                                    <div>
                                      <form onSubmit={(e)=> openPinModal(e,"offline")}>
                                        {/* <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="plans"
                                              value={
                                                selectedOfflinePlan?.id || ""
                                              }
                                              onChange={(e) => {
                                                const selectedPlan =
                                                  offlineDTHPlan?.find(
                                                    (plan) =>
                                                      plan.id ===
                                                      parseInt(e.target.value)
                                                  );
                                                handleOfflinePlanChange(
                                                  selectedPlan
                                                );
                                              }}
                                            >
                                              <option value="">
                                                Select Operator
                                              </option>
                                              {offlineDTHPlan?.map((plan) => (
                                                <option
                                                  key={plan.id}
                                                  value={plan.id}
                                                >
                                                  {plan.operator}
                                                </option>
                                              ))}
                                            </select>
                                            <label for="floatingSelectOperator">
                                              Select Operator
                                            </label>
                                          </div>
                                        </div> */}
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="operatorSelect"
                                              name="operator"
                                              value={offlineForm.operator}
                                              onChange={handleOperatorChange}
                                              required
                                            >
                                              <option value="">
                                                Select Operator
                                              </option>
                                              {Array.from(
                                                new Set(
                                                  offlineDTHPlan?.map(
                                                    (item) => item.operator
                                                  )
                                                )
                                              ).map((operator, index) => (
                                                <option
                                                  key={index}
                                                  value={operator}
                                                >
                                                  {operator}
                                                </option>
                                              ))}
                                            </select>
                                            <label for="operatorSelect">
                                              Operator
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiGroup />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="first_name"
                                              placeholder="First Name"
                                              value={offlineForm.first_name}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              First Name
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <BiGroup />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="last_name"
                                              placeholder="Last Name"
                                              value={offlineForm.last_name}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Last Name
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <ImAddressBook />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="full_address"
                                              placeholder="Full Address"
                                              value={offlineForm.full_address}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              Full Address
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <LuSquareCode />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="postal_code"
                                              placeholder="Postal Code"
                                              value={offlineForm.postal_code}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                              
                                              maxLength={6}
                                              minLength={6}
                                            />
                                            <label for="floatingInputGroup1">
                                              Postal Code
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="number"
                                              placeholder="Phone Number"
                                              value={offlineForm.number}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                              maxLength={10}
                                              minLength={10}
                                            />
                                            <label for="floatingInputGroup1">
                                              Phone Number
                                            </label>
                                          </div>
                                        </div>
                                        {/* <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="number"
                                              placeholder=""
                                              value={offlineForm.validity}
                                              onChange={handleOfflineChange}
                                              required
                                            />
                                            <label for="floatingInputGroup1">
                                              Validity
                                            </label>
                                          </div>
                                        </div> */}
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="validitySelect"
                                              name="validity"
                                              value={offlineForm.validity}
                                              onChange={handleValidityChange}
                                              required
                                              disabled={
                                                !filteredValidities.length
                                              }
                                            >
                                              <option value="">
                                                Select Validity
                                              </option>
                                              {filteredValidities.map(
                                                (validity, index) => (
                                                  <option
                                                    key={index}
                                                    value={validity}
                                                  >
                                                    {validity}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                            <label for="validitySelect">
                                              Validity
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMoneyBillAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="amount"
                                              placeholder="Amount"
                                              value={offlineForm.amount}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                              readOnly
                                            />
                                            <label for="floatingInputGroup1">
                                              Amount
                                            </label>
                                          </div>
                                        </div>
                                        <div class="input-group mb-3">
                                          <span class="input-group-text">
                                            <FaMobileAlt />
                                          </span>
                                          <div class="form-floating">
                                            <input
                                              type="text"
                                              class="form-control"
                                              id="floatingInputGroup1"
                                              name="message"
                                              placeholder="Message"
                                              value={offlineForm.message}
                                              onChange={handleOfflineChange}
                                              required
                                              autoComplete="new-password"
                                            />
                                            <label for="floatingInputGroup1">
                                              DTH Description
                                            </label>
                                          </div>
                                        </div>
                                        <div className="text-start mt-2 mb-3">
                                          <button
                                            className="btn btn-none text-light"
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                            type="submit"
                                          >
                                            Submit Now
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
                  value={digit ? "●" : ""}
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

              <Button variant="primary" onClick={handleModalSubmit}
              disabled={isVerifying}>
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

export default DthConnection;
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
      left: 0px;
    }
    @media (min-width: 401px) and (max-width: 500px) {
      margin-top: 6rem;
      position: absolute;
      left: 1px;
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
