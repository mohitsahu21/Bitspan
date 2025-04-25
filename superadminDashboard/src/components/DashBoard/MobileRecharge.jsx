import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FaMobileAlt } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { toggleRefresh } from "../../redux/user/userSlice";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Spinner } from "react-bootstrap";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const MobileRecharge = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("tab1");
  const [apiData, setApiData] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  // console.log(currentUser.userId);
  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/retailer/getAllServicesList",
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
    if (tab == "tab2") {
      if (services) {
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
        } else {
          setActiveTab(tab);
        }
      }
    } else {
      setActiveTab(tab);
    }
  };

  const [formData, setFormData] = useState({
    // opcode: "",
    operatorName: "",
    number: "",
    amount: "",
    walletDeductAmt: "",
    recharge_Type: "Prepaid",
    created_by_userid: currentUser.userId,
    // orderid: "4654747",
  });

  // console.log(formData);

  const [offlineForm, setOfflineForm] = useState({
    mobile_no: "",
    operator_name: "",
    amount: "",
    recharge_Type: "Prepaid",
    userId: currentUser.userId,
  });

  console.log(offlineForm);
  const [response, setResponse] = useState(null);
  const [responseForm, setResponseForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showOnlinePinModal, setShowOnlinePinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [onlinePin, setOnlinePin] = useState(["", "", "", ""]); //Online pin
  const pinRefs = useRef([]);
  const [selectedOperator, setSelectedOperator] = useState(""); // This State use for Fetch Plan
  const [selectedCircle, setSelectedCircle] = useState(""); // This State use for Fetch Plan
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecharge, setIsRecharge] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [retailerPackage, setRetailerPackage] = useState([]);
  const [userRelation, setUserRelation] = useState([]);

  const operatorOptions = [
    { name: "Airtel", value: "Airtel" },
    { name: "BSNL STV", value: "BSNL STV" },
    { name: "BSNL TOPUP", value: "BSNL TOPUP" },
    // { name: "Airtel Postpaid", value: "Airtel Postpaid" },
    // { name: "BSNL Postpaid", value: "BSNL Postpaid" },
    { name: "Jio", value: "Jio" },
    // { name: "Jio Postpaid", value: "Jio Postpaid" },
    { name: "Vi", value: "Vi" },
    // { name: "Vi Postpaid", value: "Vi Postpaid" },
  ];

  const operatorCircle = [
    { ID: 1, Name: "DELHI", CircleCode: "10" },
    { ID: 2, Name: "UP(West)", CircleCode: "97" },
    { ID: 3, Name: "PUNJAB", CircleCode: "02" },
    { ID: 4, Name: "HP", CircleCode: "03" },
    { ID: 5, Name: "HARYANA", CircleCode: "96" },
    { ID: 6, Name: "J&K", CircleCode: "55" },
    { ID: 7, Name: "UP(East)", CircleCode: "54" },
    { ID: 8, Name: "MUMBAI", CircleCode: "92" },
    { ID: 9, Name: "MAHARASHTRA", CircleCode: "90" },
    { ID: 10, Name: "GUJARAT", CircleCode: "98" },
    { ID: 11, Name: "MP", CircleCode: "93" },
    { ID: 12, Name: "RAJASTHAN", CircleCode: "70" },
    { ID: 13, Name: "KOLKATTA", CircleCode: "31" },
    { ID: 14, Name: "West Bengal", CircleCode: "51" },
    { ID: 15, Name: "ORISSA", CircleCode: "53" },
    { ID: 16, Name: "ASSAM", CircleCode: "56" },
    { ID: 17, Name: "NESA", CircleCode: "16" },
    { ID: 18, Name: "BIHAR", CircleCode: "52" },
    { ID: 19, Name: "KARNATAKA", CircleCode: "06" },
    { ID: 20, Name: "CHENNAI", CircleCode: "40" },
    { ID: 21, Name: "TAMIL NADU", CircleCode: "94" },
    { ID: 22, Name: "KERALA", CircleCode: "95" },
    { ID: 23, Name: "AP", CircleCode: "49" },
    { ID: 24, Name: "SIKKIM", CircleCode: "99" },
    { ID: 25, Name: "TRIPURA", CircleCode: "100" },
    { ID: 26, Name: "CHHATISGARH", CircleCode: "101" },
    { ID: 27, Name: "GOA", CircleCode: "102" },
    { ID: 28, Name: "MEGHALAY", CircleCode: "103" },
    { ID: 29, Name: "MIZZORAM", CircleCode: "104" },
    { ID: 30, Name: "JHARKHAND", CircleCode: "105" },
  ];

  const unifiedOperatorList = [
    { name: "Airtel", value: "Airtel", OpCode: "2" },
    { name: "BSNL STV", value: "BSNL STV", OpCode: "4" },
    { name: "BSNL TOPUP", value: "BSNL TOPUP", OpCode: "5" },
    { name: "Jio", value: "Jio", OpCode: "11" },
    { name: "Vi", value: "Vi", OpCode: "6" },
  ];

  const operatorCode = [
    { ID: 1, Name: "Airtel", OpCode: "2", Type: "PREPAID" },
    { ID: 2, Name: "BSNL TOPUP", OpCode: "4", Type: "PREPAID" },
    { ID: 3, Name: "BSNL SPECIAL", OpCode: "5", Type: "PREPAID" },
    { ID: 4, Name: "IDEA", OpCode: "6", Type: "PREPAID" },
    { ID: 5, Name: "RELIANCE JIO", OpCode: "11", Type: "PREPAID" },
  ];

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `https://2kadam.co.in/api/auth/retailer/getPackageData/${currentUser?.package_Id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const priceData = response.data.data[0];
        // console.log("Price Data:", priceData);
        setRetailerPackage(priceData);
      } catch (error) {
        console.error("Fetching package data failed:", error);
      }
    };

    fetchPackage();
    fetchServices();
  }, []);

  // const fetchPlanData = async () => {
  //   setIsRecharge(false);
  //   setLoadingPlans(true);
  //   if (!selectedOperator || !selectedCircle) {
  //     alert("Please select both operator and circle!");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `https://2kadam.co.in/api/auth/fetch/plan/getMobilePlans?operatorCode=${selectedOperator}&circleCode=${selectedCircle}`
  //     );
  //     const data = response.data;

  //     if (data.ERROR === "0" && data.STATUS === "0") {
  //       // Define plan type based on selected operator
  //       let planCategory = "";
  //       switch (data.Operator) {
  //         case "RELIANCE JIO":
  //           planCategory = "Polular Plans ";
  //           break;
  //         case "Airtel":
  //           planCategory = "Data";
  //           break;
  //         case "IDEA":
  //           planCategory = "Unlimited ";
  //           break;
  //         case "BSNL TOPUP":
  //         case "BSNL SPECIAL":
  //           planCategory = "Unlimited Plans";
  //           break;
  //         default:
  //           alert("Unsupported operator!");
  //           return;
  //       }

  //       // Extract plans
  //       const plans = data.RDATA[planCategory] || [];
  //       if (plans.length > 0) {
  //         setPlans(plans);
  //         setIsModalOpen(true); // Open modal to display plans
  //       } else {
  //         alert("No plans available for the selected operator and circle.");
  //         setPlans([]);
  //       }
  //     } else {
  //       alert("No plans available or an error occurred!");
  //       setPlans([]);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while fetching plans:", error);
  //     alert("Failed to fetch plans. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchPlanData = async () => {
    setIsRecharge(false);
    setLoadingPlans(true);
    if (!selectedOperator || !selectedCircle) {
      Swal.fire({
        icon: "info",
        title: "Select Circle",
        text: "Please select both operator and circle!",
      });
      // alert("Please select both operator and circle!");
      // setLoadingPlans(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://2kadam.co.in/api/auth/fetch/plan/getMobilePlans?operatorCode=${selectedOperator}&circleCode=${selectedCircle}`
      );
      const data = response.data;

      if (data.ERROR === "0" && data.STATUS === "0") {
        // Extract available categories from the response
        const availableCategories = Object.keys(data.RDATA || {});

        // Collect plans from all categories dynamically
        const allPlans = availableCategories.reduce((acc, category) => {
          const plans = data.RDATA[category] || [];
          return [...acc, { category, plans }];
        }, []);

        if (allPlans.length > 0) {
          setPlans(allPlans); // Store all plans with their categories
          setIsModalOpen(true); // Open modal to display plans
        } else {
          Swal.fire({
            icon: "info",
            title: "No plans",
            text: "No plans available for the selected operator and circle.",
          });
          // alert("No plans available for the selected operator and circle.");
          setPlans([]);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No plans available or an error occurred!",
        });
        // alert("No plans available or an error occurred!");
        setPlans([]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch plans. Please try again.",
      });
      console.error("An error occurred while fetching plans:", error);
      // alert("Failed to fetch plans. Please try again.");
    } finally {
      setLoadingPlans(false);
    }
  };

  // const fetchPlanData = async () => {
  //   setIsRecharge(false);
  //   setLoadingPlans(true);
  //   if (!selectedOperator || !selectedCircle) {
  //     alert("Please select both operator and circle!");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `https://2kadam.co.in/api/auth/fetch/plan/getMobilePlans?operatorCode=${selectedOperator}&circleCode=${selectedCircle}`
  //     );
  //     const data = response.data;

  //     if (data.ERROR === "0" && data.STATUS === "0") {
  //       // Extract available categories from the response
  //       const availableCategories = Object.keys(data.RDATA || {});

  //       // Collect plans from all categories dynamically
  //       const allPlans = availableCategories.reduce((acc, category) => {
  //         const plans = data.RDATA[category] || [];
  //         return [...acc, ...plans];
  //       }, []);

  //       if (allPlans.length > 0) {
  //         setPlans(allPlans);
  //         setIsModalOpen(true); // Open modal to display plans
  //       } else {
  //         alert("No plans available for the selected operator and circle.");
  //         setPlans([]);
  //       }
  //     } else {
  //       alert("No plans available or an error occurred!");
  //       setPlans([]);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while fetching plans:", error);
  //     alert("Failed to fetch plans. Please try again.");
  //   } finally {
  //     setLoadingPlans(false);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:7777/api/auth/retailer/getAllRechargeApi`
          `https://2kadam.co.in/api/auth/retailer/getAllRechargeApi`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
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
  }, []);

  // console.log(apiData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "number" || name === "amount") {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    if (name === "mobile_no" || name === "amount") {
      if (/^\d*$/.test(value)) {
        setOfflineForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setOfflineForm({
        ...offlineForm,
        [name]: value,
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!isRecharge) {
  //     return;
  //   }

  //   setLoading(true);
  //   let success = false;

  //   for (const api of apiData) {
  //     try {
  //       const result = await axios.post(api.API_URL, formData);

  //       if (result.data && result.data.message === "Recharge successful") {
  //         Swal.fire({
  //           title: "Done!",
  //           text: "Recharge Successful",
  //           icon: "success",
  //         });
  //         setResponse(result.data);
  //         success = true;
  //         break;
  //       } else if (
  //         result.data.rechargeData &&
  //         result.data.rechargeData.status === "Failure"
  //       ) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Something went wrong with this API!",
  //         });
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Error in recharge:",
  //         error.response ? error.response.data : error.message
  //       );
  //     }
  //   }

  //   if (!success) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "All providers are currently unavailable. Please try again later.",
  //     });
  //   }

  //   setLoading(false);
  // }; Original Handle submit for online recharge

  // const handlesubmitForm = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const result = await axios.post(
  //       // "https://2kadam.co.in/api/auth/retailer/offline-recharge",
  //       "http://localhost:7777/api/auth/wallet/offlineRechargeAndUpdateWallet",
  //       offlineForm
  //     );
  //     setResponseForm(result.data); // Update the response state with the received data
  //     console.log(result.data);
  //     if (result.data.status === "Failure") {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: result.data.error || result.data.message,
  //         // footer: '<a href="#">Why do I have this issue?</a>',
  //       });
  //     } else if (result.data.status === "Success") {
  //       Swal.fire({
  //         title: "Done!",
  //         text: "Recharge Successfull",
  //         icon: "success",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error in recharge:",
  //       error.response ? error.response.data : error.message
  //     );
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong!",
  //       footer: '<a href="#">Why do I have this issue?</a>',
  //     });
  //     setResponseForm(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const prepaidRechargeComm = async (
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
      Transaction_details: `Commission Credit for Prepaid recharge`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for Prepaid recharge`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for Prepaid recharge`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for Prepaid recharge`,
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
      if (retailerPackage.On_Prepaid_Recharge_Comm_Type == "Percentage") {
        if (operatorName == "Jio") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.On_Jio_Prepaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "Airtel") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.On_Airtel_Prepaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "Vi") {
          retailerCommAmount =
            (amount * parseFloat(retailerPackage.On_Vi_Prepaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "BSNL STV") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.On_Bsnl_Prepaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "BSNL TOPUP") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.On_Bsnl_Prepaid_Recharge_Comm)) /
            100;
        }
      } else {
        if (operatorName == "Jio") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Jio_Prepaid_Recharge_Comm
          );
        } else if (operatorName == "Airtel") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Airtel_Prepaid_Recharge_Comm
          );
        } else if (operatorName == "Vi") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Vi_Prepaid_Recharge_Comm
          );
        } else if (operatorName == "BSNL STV") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Bsnl_Prepaid_Recharge_Comm
          );
        } else if (operatorName == "BSNL TOPUP") {
          retailerCommAmount = parseFloat(
            retailerPackage.On_Bsnl_Prepaid_Recharge_Comm
          );
        }
      }

      if (distributor && distributorPackage) {
        if (distributorPackage.On_Prepaid_Recharge_Comm_Type == "Percentage") {
          if (operatorName == "Jio") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.On_Jio_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "Airtel") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.On_Airtel_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Vi") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.On_Vi_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL STV") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.On_Bsnl_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL TOPUP") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.On_Bsnl_Prepaid_Recharge_Comm)) /
              100;
          }
        } else {
          if (operatorName == "Jio") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Jio_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Airtel_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Vi") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Vi_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL STV") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Bsnl_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL TOPUP") {
            distributorCommAmount = parseFloat(
              distributorPackage.On_Bsnl_Prepaid_Recharge_Comm
            );
          }
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.On_Prepaid_Recharge_Comm_Type == "Percentage"
        ) {
          if (operatorName == "Jio") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Jio_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Airtel") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Airtel_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Vi") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Vi_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "BSNL STV") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Bsnl_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "BSNL TOPUP") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.On_Bsnl_Prepaid_Recharge_Comm
                )) /
              100;
          }
        } else {
          if (operatorName == "Jio") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Jio_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Airtel_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Vi") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Vi_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL STV") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Bsnl_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL TOPUP") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.On_Bsnl_Prepaid_Recharge_Comm
            );
          }
        }
      }
      if (white_lable && whiteLablePackage) {
        if (whiteLablePackage.On_Prepaid_Recharge_Comm_Type == "Percentage") {
          if (operatorName == "Jio") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Jio_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "Airtel") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Airtel_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "Vi") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Vi_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL STV") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Bsnl_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL TOPUP") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.On_Bsnl_Prepaid_Recharge_Comm)) /
              100;
          }
        } else {
          if (operatorName == "Jio") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Jio_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Airtel_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Vi") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Vi_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL STV") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Bsnl_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL TOPUP") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.On_Bsnl_Prepaid_Recharge_Comm
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
    let result = {};
    let usersId = {
      distributorId: "NA",
      superDistributorId: "NA",
      whiteLabelId: "NA",
    };
    e.preventDefault();

    if (!isRecharge) {
      return;
    }

    setLoading(true);

    // Package Find code
    try {
      // setLoading(true);

      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/superAdmin/getUserRelations/${currentUser.userId}`,
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
            `https://2kadam.co.in/api/auth/superAdmin/getUserPackageDetails/${retailer}`,
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
              `https://2kadam.co.in/api/auth/superAdmin/getUserPackageDetails/${distributor}`,
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
              `https://2kadam.co.in/api/auth/superAdmin/getUserPackageDetails/${superDistributor}`,
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
              `https://2kadam.co.in/api/auth/superAdmin/getUserPackageDetails/${white_lable}`,
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
        result = await prepaidRechargeComm(
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
        navigate("/");
        dispatch(clearUser());
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

        if (
          rechargeResult.data &&
          rechargeResult.data.message === "Recharge successful"
        ) {
          Swal.fire({
            title: "Done!",
            text: "Recharge Successful",
            icon: "success",
          }).then(() => {
            // Prepare receipt data
            const receiptData = {
              rechargeType: "Prepaid",
              receiptNumber: rechargeResult.data.orderId,
              mobile_no: formData.number,
              // operator: formData.operator_name,
              amount: formData.amount,
            };

            // Save to localStorage
            localStorage.setItem("receiptData", JSON.stringify(receiptData));

            // Navigate to receipt
            navigate("/recharge-receipt");
          });
          success = true;
          setResponse(rechargeResult.data);
          console.log(rechargeResult.data);
          console.log(rechargeResult.data.orderId);
          console.log(result);

          // Recharge Commission Credit WL SD D
          let allProcessesSuccessful = true;
          result.retailerFormData.Transaction_details = `Commission Credit for Prepaid Recharge Coupon Order Id ${rechargeResult.data.orderId}`;
          result.distributorFormData.Transaction_details = `Commission Credit for Prepaid Recharge Coupon Order Id ${rechargeResult.data.orderId}`;
          result.superDistributorFormData.Transaction_details = `Commission Credit for Prepaid Recharge Coupon Order Id ${rechargeResult.data.orderId}`;
          result.whiteLableFormData.Transaction_details = `Commission Credit for Prepaid Recharge Coupon Order Id ${rechargeResult.data.orderId}`;
          if (
            result &&
            result.distributorFormData &&
            result.distributorFormData.amount
          ) {
            const response = await axios
              .put(
                "https://2kadam.co.in/api/auth/superAdmin/CreditCommission",
                // "https://2kadam.co.in/api/auth/log-reg/AddWalletAddMoneyDirect",
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
                "https://2kadam.co.in/api/auth/superAdmin/CreditCommission",
                // "https://2kadam.co.in/api/auth/log-reg/AddWalletAddMoneyDirect",
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
                "https://2kadam.co.in/api/auth/superAdmin/CreditCommission",
                // "https://2kadam.co.in/api/auth/log-reg/AddWalletAddMoneyDirect",
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
                "https://2kadam.co.in/api/auth/superAdmin/addCommissionEntry",
                // "https://2kadam.co.in/api/auth/superAdmin/resolveComplaint",
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
          rechargeResult.data &&
          rechargeResult.data.message === "Recharge in process"
        ) {
          success = true;
          Swal.fire({
            icon: "info",
            title: "Recharge in process",
            text: "Recharge in process please wait it will take Sometime!",
          });
          let allProcessesSuccessful = true;
          result.retailerFormData.Transaction_details = `Commission Credit for Postpaid Recharge Order Id ${rechargeResult.data.orderId}`;

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
                "https://2kadam.co.in/api/auth/superAdmin/addCommissionEntry",
                // "https://2kadam.co.in/api/auth/superAdmin/resolveComplaint",
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
          result.data.rechargeData &&
          result.data.rechargeData.status === "Failure"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong with this API!",
          });
        }

        // console.log(result.data);
        // console.log(result.data.orderId);
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
      } finally {
        // Clear form data and stop loading
        setFormData({
          operatorName: "",
          number: "",
          amount: "",
          walletDeductAmt: "",
          recharge_Type: "Prepaid",
          created_by_userid: currentUser.userId,
        });

        setSelectedCircle("");
        setSelectedOperator("");

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
        "https://2kadam.co.in/api/auth/wallet/offlineRechargeAndUpdateWallet",
        offlineForm,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
        }).then(() => {
          // Prepare receipt data
          const receiptData = {
            rechargeType: "Prepaid",
            receiptNumber: result.data.details.recharge.orderId,
            mobile_no: offlineForm.mobile_no,
            operator: offlineForm.operator_name,
            // circle: selectedCircle,
            amount: offlineForm.amount,
          };

          // Save to localStorage
          localStorage.setItem("receiptData", JSON.stringify(receiptData));

          // Open blank tab and navigate to receipt route
          navigate("/recharge-receipt");
          // window.open("/recharge-receipt", "_blank");
        });

        setOfflineForm({
          mobile_no: "",
          operator_name: "",
          amount: "",
          recharge_Type: "Prepaid",
          userId: currentUser.userId,
        });
        setSelectedCircle("");
        setSelectedOperator("");
      }
    } catch (error) {
      console.error(
        "Error in recharge:",
        error.response ? error.response.data : error.message
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response
          ? error?.response?.data?.message
          : "Something went wrong! Please try again later.",
      });
      // setResponseForm(null);
    } finally {
      setLoading(false);
    }
  };

  console.log(responseForm);

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
        `https://2kadam.co.in/api/auth/log-reg/verify-pin`,
        { user_id: currentUser.userId || "", pin: pin.join("") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        return true;
      } else {
        // alert(response.data.message);
        // return false;
        Swal.fire({
          title: "Error verifying PIN",
          text:
            response?.data?.message || "Something went wrong! Please Try again",
          icon: "error",
        });
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      // alert("Error verifying PIN");
      Swal.fire({
        title: "Error verifying PIN",
        text:
          error?.response?.data?.message ||
          "Something went wrong! Please Try again",
        icon: "error",
      });

      return false;
    }
  };

  // Onlined PIN Integration
  const verifyOnlinePin = async () => {
    try {
      const response = await axios.post(
        `https://2kadam.co.in/api/auth/log-reg/verify-pin`,
        { user_id: currentUser.userId || "", pin: onlinePin.join("") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        return true;
      } else {
        // alert(response.data.message);
        Swal.fire({
          title: "Error verifying PIN",
          text:
            response?.data?.message || "Something went wrong! Please Try again",
          icon: "error",
        });
        return false;
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      // alert("Error verifying PIN");
      Swal.fire({
        title: "Error verifying PIN",
        text:
          error?.response?.data?.message ||
          "Something went wrong! Please Try again",
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
    console.log("Offlined PIN Integration");
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
                            Prepaid Recharge
                          </h4>
                          <h6 className="mx-lg-5">
                            {" "}
                            <BiHomeAlt /> &nbsp; / &nbsp; Prepaid Recharge
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
                                    <h3 className="mb-4">Prepaid Recharge</h3>
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
                                              maxLength={10}
                                              minLength={10}
                                            />
                                            <label for="floatingInputGroup1">
                                              Mobile Number
                                            </label>
                                          </div>
                                        </div>

                                        {/* ---------Fetch Plan Inputs------ */}

                                        <div className="input-group mb-3">
                                          <div className="form-floating">
                                            <select
                                              className="form-select"
                                              id="floatingSelectPlanOperator"
                                              required
                                              aria-label="Select Operator"
                                              value={selectedOperator}
                                              onChange={(e) => {
                                                const selectedOp =
                                                  unifiedOperatorList.find(
                                                    (op) =>
                                                      op.OpCode ===
                                                      e.target.value
                                                  );
                                                setSelectedOperator(
                                                  e.target.value
                                                );
                                                setFormData((prevFormData) => ({
                                                  ...prevFormData,
                                                  operatorName: selectedOp
                                                    ? selectedOp.name
                                                    : "",
                                                }));
                                              }}
                                            >
                                              <option value="">
                                                Select Operator
                                              </option>
                                              {unifiedOperatorList.map((op) => (
                                                <option
                                                  key={op.value}
                                                  value={op.OpCode}
                                                >
                                                  {op.name}
                                                </option>
                                              ))}
                                            </select>
                                            <label htmlFor="floatingSelectPlanOperator">
                                              Select Plan Operator
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="floatingSelectOperator"
                                              aria-label="Select Operator"
                                              value={selectedCircle}
                                              onChange={(e) =>
                                                setSelectedCircle(
                                                  e.target.value
                                                )
                                              }
                                            >
                                              <option value="">
                                                Select Operator
                                              </option>
                                              {operatorCircle.map((opitem) => (
                                                <>
                                                  <option
                                                    key={opitem.ID}
                                                    value={opitem.CircleCode}
                                                  >
                                                    {opitem.Name}
                                                  </option>
                                                </>
                                              ))}
                                            </select>
                                            <label for="floatingSelectOperator">
                                              Select Operator Circle
                                            </label>
                                          </div>
                                        </div>

                                        <div className="text-start mt-2 mb-3">
                                          <button
                                            className="btn btn-none text-light"
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                            onClick={fetchPlanData}
                                            disabled={
                                              loadingPlans ||
                                              !selectedCircle ||
                                              !selectedOperator ||
                                              !formData.number ||
                                              formData.number.length != 10
                                            }
                                          >
                                            {loadingPlans
                                              ? "Checking Plans..."
                                              : "Check Plans"}
                                          </button>
                                        </div>

                                        {/* {isModalOpen && (
                                          <div
                                            className="modal fade show"
                                            style={{
                                              display: "block",
                                              backgroundColor:
                                                "rgba(0,0,0,0.5)",
                                            }}
                                            tabIndex="-1"
                                          >
                                            <div className="modal-dialog">
                                              <div className="modal-content">
                                                <div className="modal-header">
                                                  <h5 className="modal-title">
                                                    Available Plans
                                                  </h5>
                                                  <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => {
                                                      setIsModalOpen(false);
                                                      setLoadingPlans(false);
                                                    }}
                                                  ></button>
                                                </div>
                                                <div className="modal-body">
                                                  {plans.length > 0 ? (
                                                    <ul className="list-group">
                                                      {plans.map(
                                                        (plan, index) => (
                                                          <li
                                                            key={index}
                                                            className="list-group-item"
                                                            onClick={() => {
                                                              setFormData(
                                                                (
                                                                  prevFormData
                                                                ) => ({
                                                                  ...prevFormData,
                                                                  amount:
                                                                    plan.rs,
                                                                })
                                                              );
                                                              setIsModalOpen(
                                                                false
                                                              );
                                                              setLoadingPlans(
                                                                false
                                                              );
                                                            }}
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            <p>
                                                              <strong>
                                                                Price:
                                                              </strong>{" "}
                                                              ₹{plan.rs}
                                                            </p>
                                                            <p>
                                                              <strong>
                                                                Validity:
                                                              </strong>{" "}
                                                              {plan.validity}
                                                            </p>
                                                            <p>
                                                              <strong>
                                                                Description:
                                                              </strong>{" "}
                                                              {plan.desc}
                                                            </p>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  ) : (
                                                    <p>No plans available.</p>
                                                  )}
                                                </div>
                                                <div className="modal-footer">
                                                  <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                      setIsModalOpen(false);
                                                      setLoadingPlans(false);
                                                    }}
                                                  >
                                                    Close
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )} */}

                                        {isModalOpen && (
                                          <div
                                            className="modal fade show"
                                            style={{
                                              display: "block",
                                              backgroundColor:
                                                "rgba(0,0,0,0.5)",
                                            }}
                                            tabIndex="-1"
                                          >
                                            <div className="modal-dialog">
                                              <div className="modal-content">
                                                <div className="modal-header">
                                                  <h5 className="modal-title">
                                                    Available Plans
                                                  </h5>
                                                  <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => {
                                                      setIsModalOpen(false);
                                                      setLoadingPlans(false);
                                                    }}
                                                  ></button>
                                                </div>
                                                <div className="modal-body">
                                                  {plans.length > 0 ? (
                                                    <div>
                                                      {plans.map(
                                                        (
                                                          categoryData,
                                                          categoryIndex
                                                        ) => (
                                                          <div
                                                            key={categoryIndex}
                                                          >
                                                            <h6>
                                                              {
                                                                categoryData.category
                                                              }
                                                            </h6>{" "}
                                                            {/* Display category name */}
                                                            <ul className="list-group">
                                                              {categoryData.plans.map(
                                                                (
                                                                  plan,
                                                                  planIndex
                                                                ) => (
                                                                  <li
                                                                    key={
                                                                      planIndex
                                                                    }
                                                                    className="list-group-item"
                                                                    onClick={() => {
                                                                      setFormData(
                                                                        (
                                                                          prevFormData
                                                                        ) => ({
                                                                          ...prevFormData,
                                                                          amount:
                                                                            plan.rs,
                                                                        })
                                                                      );
                                                                      setIsModalOpen(
                                                                        false
                                                                      );
                                                                      setLoadingPlans(
                                                                        false
                                                                      );
                                                                    }}
                                                                    style={{
                                                                      cursor:
                                                                        "pointer",
                                                                    }}
                                                                  >
                                                                    <p>
                                                                      <strong>
                                                                        Price:
                                                                      </strong>{" "}
                                                                      ₹{plan.rs}
                                                                    </p>
                                                                    <p>
                                                                      <strong>
                                                                        Validity:
                                                                      </strong>{" "}
                                                                      {
                                                                        plan.validity
                                                                      }
                                                                    </p>
                                                                    <p>
                                                                      <strong>
                                                                        Description:
                                                                      </strong>{" "}
                                                                      {
                                                                        plan.desc
                                                                      }
                                                                    </p>
                                                                  </li>
                                                                )
                                                              )}
                                                            </ul>
                                                          </div>
                                                        )
                                                      )}
                                                    </div>
                                                  ) : (
                                                    <p>No plans available.</p>
                                                  )}
                                                </div>
                                                <div className="modal-footer">
                                                  <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                      setIsModalOpen(false);
                                                      setLoadingPlans(false);
                                                    }}
                                                  >
                                                    Close
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {/* ------Fetch Plan Inputs--------- */}

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
                                            type="submit"
                                            onClick={() => setIsRecharge(true)}
                                            disabled={
                                              loading ||
                                              !formData.amount ||
                                              !formData.number ||
                                              !selectedCircle ||
                                              !selectedOperator ||
                                              formData.number.length != 10
                                            }
                                          >
                                            {loading
                                              ? "Recharge Now..."
                                              : "Recharge Now"}
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
                                    <h3 className="mb-4">Prepaid Recharge 2</h3>
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
                                              autoComplete="off"
                                              required
                                              minLength={10}
                                              maxLength={10}
                                            />
                                            <label for="floatingInputGroup1">
                                              Mobile Number
                                            </label>
                                          </div>
                                        </div>

                                        {/* ---------Fetch Plan Inputs------ */}

                                        <div className="input-group mb-3">
                                          <div className="form-floating">
                                            <select
                                              className="form-select"
                                              id="floatingSelectPlanOperator"
                                              required
                                              aria-label="Select Operator"
                                              value={selectedOperator}
                                              onChange={(e) => {
                                                const selectedOp =
                                                  unifiedOperatorList.find(
                                                    (op) =>
                                                      op.OpCode ===
                                                      e.target.value
                                                  );
                                                setSelectedOperator(
                                                  e.target.value
                                                );
                                                setOfflineForm(
                                                  (prevFormData) => ({
                                                    ...prevFormData,
                                                    operator_name: selectedOp
                                                      ? selectedOp.name
                                                      : "",
                                                  })
                                                );
                                              }}
                                            >
                                              <option value="">
                                                Select Operator
                                              </option>
                                              {unifiedOperatorList.map((op) => (
                                                <option
                                                  key={op.value}
                                                  value={op.OpCode}
                                                >
                                                  {op.name}
                                                </option>
                                              ))}
                                            </select>
                                            <label htmlFor="floatingSelectPlanOperator">
                                              Select Plan Operator
                                            </label>
                                          </div>
                                        </div>

                                        <div class="input-group mb-3">
                                          <div class="form-floating">
                                            <select
                                              class="form-select"
                                              id="floatingSelectOperator"
                                              required
                                              aria-label="Select Operator"
                                              value={selectedCircle}
                                              onChange={(e) =>
                                                setSelectedCircle(
                                                  e.target.value
                                                )
                                              }
                                            >
                                              <option value="">
                                                Select Operator
                                              </option>
                                              {operatorCircle.map((opitem) => (
                                                <>
                                                  <option
                                                    key={opitem.ID}
                                                    value={opitem.CircleCode}
                                                  >
                                                    {opitem.Name}
                                                  </option>
                                                </>
                                              ))}
                                            </select>
                                            <label for="floatingSelectOperator">
                                              Select Operator Circle
                                            </label>
                                          </div>
                                        </div>

                                        <div className="text-start mt-2 mb-3">
                                          <button
                                            className="btn btn-none text-light"
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                            onClick={fetchPlanData}
                                            // disabled={loadingPlans}
                                            disabled={
                                              loadingPlans ||
                                              !selectedCircle ||
                                              !selectedOperator ||
                                              !offlineForm.mobile_no ||
                                              offlineForm.mobile_no.length != 10
                                            }
                                          >
                                            {loadingPlans
                                              ? "Checking Plans..."
                                              : "Check Plans"}
                                          </button>
                                        </div>

                                        {/* {isModalOpen && (
                                          <div
                                            className="modal fade show"
                                            style={{
                                              display: "block",
                                              backgroundColor:
                                                "rgba(0,0,0,0.5)",
                                            }}
                                            tabIndex="-1"
                                          >
                                            <div className="modal-dialog">
                                              <div className="modal-content">
                                                <div className="modal-header">
                                                  <h5 className="modal-title">
                                                    Available Plans
                                                  </h5>
                                                  <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => {
                                                      setIsModalOpen(false);
                                                      setLoadingPlans(false);
                                                    }}
                                                  ></button>
                                                </div>
                                                <div className="modal-body">
                                                  {plans.length > 0 ? (
                                                    <ul className="list-group">
                                                      {plans.map(
                                                        (plan, index) => (
                                                          <li
                                                            key={index}
                                                            className="list-group-item"
                                                            onClick={() => {
                                                              setOfflineForm(
                                                                (
                                                                  prevFormData
                                                                ) => ({
                                                                  ...prevFormData,
                                                                  amount:
                                                                    plan.rs,
                                                                })
                                                              );
                                                              setIsModalOpen(
                                                                false
                                                              );
                                                              setLoadingPlans(
                                                                false
                                                              );
                                                            }}
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            <p>
                                                              <strong>
                                                                Price:
                                                              </strong>{" "}
                                                              ₹{plan.rs}
                                                            </p>
                                                            <p>
                                                              <strong>
                                                                Validity:
                                                              </strong>{" "}
                                                              {plan.validity}
                                                            </p>
                                                            <p>
                                                              <strong>
                                                                Description:
                                                              </strong>{" "}
                                                              {plan.desc}
                                                            </p>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  ) : (
                                                    <p>No plans available.</p>
                                                  )}
                                                </div>
                                                <div className="modal-footer">
                                                  <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                      setIsModalOpen(false);
                                                      setLoadingPlans(false);
                                                    }}
                                                  >
                                                    Close
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )} */}

                                        {isModalOpen && (
                                          <div
                                            className="modal fade show"
                                            style={{
                                              display: "block",
                                              backgroundColor:
                                                "rgba(0,0,0,0.5)",
                                            }}
                                            tabIndex="-1"
                                          >
                                            <div className="modal-dialog">
                                              <div className="modal-content">
                                                <div className="modal-header">
                                                  <h5 className="modal-title">
                                                    Available Plans
                                                  </h5>
                                                  <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => {
                                                      setIsModalOpen(false);
                                                      setLoadingPlans(false);
                                                    }}
                                                  ></button>
                                                </div>
                                                <div className="modal-body">
                                                  {plans.length > 0 ? (
                                                    <div>
                                                      {plans.map(
                                                        (
                                                          categoryData,
                                                          categoryIndex
                                                        ) => (
                                                          <div
                                                            key={categoryIndex}
                                                          >
                                                            <h6>
                                                              {
                                                                categoryData.category
                                                              }
                                                            </h6>{" "}
                                                            {/* Display category name */}
                                                            <ul className="list-group">
                                                              {categoryData.plans.map(
                                                                (
                                                                  plan,
                                                                  planIndex
                                                                ) => (
                                                                  <li
                                                                    key={
                                                                      planIndex
                                                                    }
                                                                    className="list-group-item"
                                                                    onClick={() => {
                                                                      setOfflineForm(
                                                                        (
                                                                          prevFormData
                                                                        ) => ({
                                                                          ...prevFormData,
                                                                          amount:
                                                                            plan.rs,
                                                                        })
                                                                      );
                                                                      setIsModalOpen(
                                                                        false
                                                                      );
                                                                      setLoadingPlans(
                                                                        false
                                                                      );
                                                                    }}
                                                                    style={{
                                                                      cursor:
                                                                        "pointer",
                                                                    }}
                                                                  >
                                                                    <p>
                                                                      <strong>
                                                                        Price:
                                                                      </strong>{" "}
                                                                      ₹{plan.rs}
                                                                    </p>
                                                                    <p>
                                                                      <strong>
                                                                        Validity:
                                                                      </strong>{" "}
                                                                      {
                                                                        plan.validity
                                                                      }
                                                                    </p>
                                                                    <p>
                                                                      <strong>
                                                                        Description:
                                                                      </strong>{" "}
                                                                      {
                                                                        plan.desc
                                                                      }
                                                                    </p>
                                                                  </li>
                                                                )
                                                              )}
                                                            </ul>
                                                          </div>
                                                        )
                                                      )}
                                                    </div>
                                                  ) : (
                                                    <p>No plans available.</p>
                                                  )}
                                                </div>
                                                <div className="modal-footer">
                                                  <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                      setIsModalOpen(false);
                                                      setLoadingPlans(false);
                                                    }}
                                                  >
                                                    Close
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {/* ------Fetch Plan Inputs--------- */}

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
                                              required
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
                                            disabled={
                                              loading ||
                                              !offlineForm.amount ||
                                              !offlineForm.mobile_no ||
                                              !selectedCircle ||
                                              !selectedOperator ||
                                              offlineForm.mobile_no.length != 10
                                            }
                                            style={{
                                              backgroundColor: "#6d70ff",
                                            }}
                                          >
                                            {loading
                                              ? "Recharge Now..."
                                              : "Recharge Now"}
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

export default MobileRecharge;
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

  .modal-content {
    border-radius: 8px;
  }
  .modal-header {
    background-color: #6d70ff;
    color: white;
  }
`;

{
  /* <div class="input-group mb-3">
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
                                          style={{ backgroundColor: "#6d70ff" }}
                                        >
                                          Check Plans
                                        </button>
                                      </div> */
}

{
  /* <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="floatingInputGroup1"
                                            placeholder="Username"
                                            value={formData.opcode}
                                            onChange={handleChange}
                                            name="opcode"
                                          />
                                          <label for="floatingInputGroup1">
                                            Select Operator
                                          </label>
                                        </div>
                                      </div> */
}

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     const result = await axios.post(
//       // "https://2kadam.co.in/api/auth/instpay/recharge-instpy",
//       "https://2kadam.co.in/api/auth/instpay/api-recharge",
//       formData
//     );
//     setResponse(result.data); // Update the response state with the received data
//     // console.log(result.data.rechargeData.status);
//     console.log(result.data);
//     if (result.data.rechargeData.status === "Failure") {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong!",
//         // footer: '<a href="#">Why do I have this issue?</a>',
//       });
//     } else if (result.data.rechargeData.status === "Success") {
//       Swal.fire({
//         title: "Done!",
//         text: "Recharge Successfull",
//         icon: "success",
//       });
//     }
//   } catch (error) {
//     console.error(
//       "Error in recharge:",
//       error.response ? error.response.data : error.message
//     );
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Something went wrong!",
//       footer: '<a href="#">Why do I have this issue?</a>',
//     });
//     setResponse(null);
//   } finally {
//     setLoading(false); // Stop loading
//   }
// };

{
  /* <div className="plans-container">
                                      {plans.length > 0 ? (
                                        <ul className="list-group">
                                          {plans.map((plan, index) => (
                                            <li
                                              key={index}
                                              className="list-group-item"
                                            >
                                              <p>
                                                <strong>Price:</strong> ₹
                                                {plan.rs}
                                              </p>
                                              <p>
                                                <strong>Validity:</strong>{" "}
                                                {plan.validity}
                                              </p>
                                              <p>
                                                <strong>Description:</strong>{" "}
                                                {plan.desc}
                                              </p>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p>
                                          No plans available. Please select
                                          operator and circle.
                                        </p>
                                      )}
                                    </div> */
}
{
  /* <div class="input-group mb-3">
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
                                      </div> */
}

{
  /* <div class="input-group mb-3">
                                        <div class="form-floating">
                                          <select
                                            class="form-select"
                                            id="floatingSelectOperator"
                                            aria-label="Select Operator"
                                            value={selectedOperator}
                                            onChange={(e) =>
                                              setSelectedOperator(
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">
                                              Select Operator
                                            </option>
                                            {operatorCode.map((opitem) => (
                                              <>
                                                <option
                                                  key={opitem.ID}
                                                  value={opitem.OpCode}
                                                >
                                                  {opitem.Name}
                                                </option>
                                              </>
                                            ))}
                                          </select>
                                          <label for="floatingSelectOperator">
                                            Select Plan Operator
                                          </label>
                                        </div>
                                      </div> */
}

{
  /* <div class="input-group mb-3">
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
                                      </div> */
}
