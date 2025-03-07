import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdGrid3X3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

//  approve model component start//
const SAApproveModel = ({ item, setShowApproveModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRelation, setUserRelation] = useState([]);
  const { token } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const [formData, setFormData] = useState({
    order_id: item.orderid,
    note: "",
    status: "Approve",
    process_by_userId: userId,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      process_by_userId: userId, // Update process_by_userId when userId changes
    }));
  }, [userId]); // Dependency: runs whenever userId changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      userId: retailer,
      amount: "",
      Transaction_details: `Commission Credit for Prepaid recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for Prepaid recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for Prepaid recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for Prepaid recharge Order Id ${item.orderid}`,
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

    const operatorName = item.operator_name;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;

    try {
      if (retailerPackage.Off_Prepaid_Recharge_Comm_Type == "Percentage") {
        if (operatorName == "Jio") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Jio_Prepaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "Airtel") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Airtel_Prepaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "Vi") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Vi_Prepaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "BSNL STV") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Bsnl_Prepaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "BSNL TOPUP") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Bsnl_Prepaid_Recharge_Comm)) /
            100;
        }
      } else {
        if (operatorName == "Jio") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Jio_Prepaid_Recharge_Comm
          );
        } else if (operatorName == "Airtel") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Airtel_Prepaid_Recharge_Comm
          );
        } else if (operatorName == "Vi") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Vi_Prepaid_Recharge_Comm
          );
        } else if (operatorName == "BSNL STV") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Bsnl_Prepaid_Recharge_Comm
          );
        } else if (operatorName == "BSNL TOPUP") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Bsnl_Prepaid_Recharge_Comm
          );
        }
      }

      if (distributor && distributorPackage) {
        if (distributorPackage.Off_Prepaid_Recharge_Comm_Type == "Percentage") {
          if (operatorName == "Jio") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.Off_Jio_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "Airtel") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.Off_Airtel_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Vi") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.Off_Vi_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL STV") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.Off_Bsnl_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL TOPUP") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.Off_Bsnl_Prepaid_Recharge_Comm)) /
              100;
          }
        } else {
          if (operatorName == "Jio") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Jio_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Airtel_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Vi") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Vi_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL STV") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Bsnl_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL TOPUP") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Bsnl_Prepaid_Recharge_Comm
            );
          }
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.Off_Prepaid_Recharge_Comm_Type == "Percentage"
        ) {
          if (operatorName == "Jio") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Jio_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Airtel") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Airtel_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Vi") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Vi_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "BSNL STV") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Bsnl_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "BSNL TOPUP") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Bsnl_Prepaid_Recharge_Comm
                )) /
              100;
          }
        } else {
          if (operatorName == "Jio") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Jio_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Airtel_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Vi") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Vi_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL STV") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Bsnl_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL TOPUP") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Bsnl_Prepaid_Recharge_Comm
            );
          }
        }
      }
      if (white_lable && whiteLablePackage) {
        if (whiteLablePackage.Off_Prepaid_Recharge_Comm_Type == "Percentage") {
          if (operatorName == "Jio") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.Off_Jio_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "Airtel") {
            whiteLableCommAmount =
              (amount *
                parseFloat(
                  whiteLablePackage.Off_Airtel_Prepaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Vi") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.Off_Vi_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL STV") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.Off_Bsnl_Prepaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL TOPUP") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.Off_Bsnl_Prepaid_Recharge_Comm)) /
              100;
          }
        } else {
          if (operatorName == "Jio") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Jio_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Airtel_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "Vi") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Vi_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL STV") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Bsnl_Prepaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL TOPUP") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Bsnl_Prepaid_Recharge_Comm
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
  const postpaidRechargeComm = async (
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
      userId: retailer,
      amount: "",
      Transaction_details: `Commission Credit for Postpaid recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for Postpaid recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for Postpaid recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for Postpaid recharge Order Id ${item.orderid}`,
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

    const operatorName = item.operator_name;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;

    try {
      if (retailerPackage.Off_Postpaid_Recharge_Comm_Type == "Percentage") {
        if (operatorName == "Jio Postpaid") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Jio_Postpaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "Airtel Postpaid") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Airtel_Postpaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "Vi Postpaid") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Vi_Postpaid_Recharge_Comm)) /
            100;
        } else if (operatorName == "BSNL Postpaid") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Bsnl_Postpaid_Recharge_Comm)) /
            100;
        }
      } else {
        if (operatorName == "Jio Postpaid") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Jio_Postpaid_Recharge_Comm
          );
        } else if (operatorName == "Airtel Postpaid") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Airtel_Postpaid_Recharge_Comm
          );
        } else if (operatorName == "Vi Postpaid") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Vi_Postpaid_Recharge_Comm
          );
        } else if (operatorName == "BSNL Postpaid") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Bsnl_Postpaid_Recharge_Comm
          );
        }
      }

      if (distributor && distributorPackage) {
        if (
          distributorPackage.Off_Postpaid_Recharge_Comm_Type == "Percentage"
        ) {
          if (operatorName == "Jio Postpaid") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.Off_Jio_Postpaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "Airtel Postpaid") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.Off_Airtel_Postpaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Vi Postpaid") {
            distributorCommAmount =
              (amount *
                parseFloat(distributorPackage.Off_Vi_Postpaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL Postpaid") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.Off_Bsnl_Postpaid_Recharge_Comm
                )) /
              100;
          }
        } else {
          if (operatorName == "Jio Postpaid") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Jio_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel Postpaid") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Airtel_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "Vi Postpaid") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Vi_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL Postpaid") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Bsnl_Postpaid_Recharge_Comm
            );
          }
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.Off_Postpaid_Recharge_Comm_Type ==
          "Percentage"
        ) {
          if (operatorName == "Jio Postpaid") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Jio_Postpaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Airtel Postpaid") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Airtel_Postpaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Vi Postpaid") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Vi_Postpaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "BSNL Postpaid") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Bsnl_Postpaid_Recharge_Comm
                )) /
              100;
          }
        } else {
          if (operatorName == "Jio Postpaid") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Jio_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel Postpaid") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Airtel_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "Vi Postpaid") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Vi_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL Postpaid") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Bsnl_Postpaid_Recharge_Comm
            );
          }
        }
      }
      if (white_lable && whiteLablePackage) {
        if (whiteLablePackage.Off_Postpaid_Recharge_Comm_Type == "Percentage") {
          if (operatorName == "Jio Postpaid") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.Off_Jio_Postpaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "Airtel Postpaid") {
            whiteLableCommAmount =
              (amount *
                parseFloat(
                  whiteLablePackage.Off_Airtel_Postpaid_Recharge_Comm
                )) /
              100;
          } else if (operatorName == "Vi Postpaid") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.Off_Vi_Postpaid_Recharge_Comm)) /
              100;
          } else if (operatorName == "BSNL Postpaid") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.Off_Bsnl_Postpaid_Recharge_Comm)) /
              100;
          }
        } else {
          if (operatorName == "Jio Postpaid") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Jio_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "Airtel Postpaid") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Airtel_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "Vi Postpaid") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Vi_Postpaid_Recharge_Comm
            );
          } else if (operatorName == "BSNL Postpaid") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Bsnl_Postpaid_Recharge_Comm
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
  const DTHRechargeComm = async (
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
      userId: retailer,
      amount: "",
      Transaction_details: `Commission Credit for DTH recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for DTH recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for DTH recharge Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for DTH recharge Order Id ${item.orderid}`,
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

    const operatorName = item.operator_name;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;

    try {
      if (
        retailerPackage.Offline_DTH_Recharge_Commission_Type == "Percentage"
      ) {
        if (operatorName == "Dish TV") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Dish_TV_Recharge_Commission)) /
            100;
        } else if (operatorName == "Tata Sky") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Tata_Sky_Recharge_Commission)) /
            100;
        } else if (operatorName == "Videocon") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Videocon_Recharge_Commission)) /
            100;
        } else if (operatorName == "Sun Direct") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Sun_Direct_Recharge_Commission)) /
            100;
        } else if (operatorName == "Airtel DTH") {
          retailerCommAmount =
            (amount *
              parseFloat(retailerPackage.Off_Airtel_Dth_Recharge_Commission)) /
            100;
        }
      } else {
        if (operatorName == "Dish TV") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Dish_TV_Recharge_Commission
          );
        } else if (operatorName == "Tata Sky") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Tata_Sky_Recharge_Commission
          );
        } else if (operatorName == "Videocon") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Videocon_Recharge_Commission
          );
        } else if (operatorName == "Sun Direct") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Sun_Direct_Recharge_Commission
          );
        } else if (operatorName == "Airtel DTH") {
          retailerCommAmount = parseFloat(
            retailerPackage.Off_Airtel_Dth_Recharge_Commission
          );
        }
      }

      if (distributor && distributorPackage) {
        if (
          distributorPackage.Offline_DTH_Recharge_Commission_Type ==
          "Percentage"
        ) {
          if (operatorName == "Dish TV") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.Off_Dish_TV_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Tata Sky") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.Off_Tata_Sky_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Videocon") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.Off_Videocon_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Sun Direct") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.Off_Sun_Direct_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Airtel DTH") {
            distributorCommAmount =
              (amount *
                parseFloat(
                  distributorPackage.Off_Airtel_Dth_Recharge_Commission
                )) /
              100;
          }
        } else {
          if (operatorName == "Dish TV") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Dish_TV_Recharge_Commission
            );
          } else if (operatorName == "Tata Sky") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Tata_Sky_Recharge_Commission
            );
          } else if (operatorName == "Videocon") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Videocon_Recharge_Commission
            );
          } else if (operatorName == "Sun Direct") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Sun_Direct_Recharge_Commission
            );
          } else if (operatorName == "Airtel DTH") {
            distributorCommAmount = parseFloat(
              distributorPackage.Off_Airtel_Dth_Recharge_Commission
            );
          }
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.Offline_DTH_Recharge_Commission_Type ==
          "Percentage"
        ) {
          if (operatorName == "Dish TV") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Dish_TV_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Tata Sky") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Tata_Sky_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Videocon") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Videocon_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Sun Direct") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Sun_Direct_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Airtel DTH") {
            superDistributorCommAmount =
              (amount *
                parseFloat(
                  superDistributorPackage.Off_Airtel_Dth_Recharge_Commission
                )) /
              100;
          }
        } else {
          if (operatorName == "Dish TV") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Dish_TV_Recharge_Commission
            );
          } else if (operatorName == "Tata Sky") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Tata_Sky_Recharge_Commission
            );
          } else if (operatorName == "Videocon") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Videocon_Recharge_Commission
            );
          } else if (operatorName == "Sun Direct") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Sun_Direct_Recharge_Commission
            );
          } else if (operatorName == "Airtel DTH") {
            superDistributorCommAmount = parseFloat(
              superDistributorPackage.Off_Airtel_Dth_Recharge_Commission
            );
          }
        }
      }
      if (white_lable && whiteLablePackage) {
        if (
          whiteLablePackage.Offline_DTH_Recharge_Commission_Type == "Percentage"
        ) {
          if (operatorName == "Dish TV") {
            whiteLableCommAmount =
              (amount *
                parseFloat(whiteLablePackage.Off_Dish_TV_Recharge_Commission)) /
              100;
          } else if (operatorName == "Tata Sky") {
            whiteLableCommAmount =
              (amount *
                parseFloat(
                  whiteLablePackage.Off_Tata_Sky_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Videocon") {
            whiteLableCommAmount =
              (amount *
                parseFloat(
                  whiteLablePackage.Off_Videocon_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Sun Direct") {
            whiteLableCommAmount =
              (amount *
                parseFloat(
                  whiteLablePackage.Off_Sun_Direct_Recharge_Commission
                )) /
              100;
          } else if (operatorName == "Airtel DTH") {
            whiteLableCommAmount =
              (amount *
                parseFloat(
                  whiteLablePackage.Off_Airtel_Dth_Recharge_Commission
                )) /
              100;
          }
        } else {
          if (operatorName == "Dish TV") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Dish_TV_Recharge_Commission
            );
          } else if (operatorName == "Tata Sky") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Tata_Sky_Recharge_Commission
            );
          } else if (operatorName == "Videocon") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Videocon_Recharge_Commission
            );
          } else if (operatorName == "Sun Direct") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Sun_Direct_Recharge_Commission
            );
          } else if (operatorName == "Airtel DTH") {
            whiteLableCommAmount = parseFloat(
              whiteLablePackage.Off_Airtel_Dth_Recharge_Commission
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
  const ElectricityRechargeComm = async (
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
      userId: retailer,
      amount: "",
      Transaction_details: `Commission Credit for Electricity Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for Electricity Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for Electricity Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for Electricity Order Id ${item.orderid}`,
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

    //  const operatorName = item.operator_name;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;

    try {
      if (
        retailerPackage.Offline_Electricity_Bill_Pay_Commission_Type ==
        "Percentage"
      ) {
        retailerCommAmount =
          (amount *
            parseFloat(
              retailerPackage.Offline_Electricity_Bill_Pay_Commission
            )) /
          100;
      } else {
        retailerCommAmount = parseFloat(
          retailerPackage.Offline_Electricity_Bill_Pay_Commission
        );
      }

      if (distributor && distributorPackage) {
        if (
          distributorPackage.Offline_Electricity_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          distributorCommAmount =
            (amount *
              parseFloat(
                distributorPackage.Offline_Electricity_Bill_Pay_Commission
              )) /
            100;
        } else {
          distributorCommAmount = parseFloat(
            distributorPackage.Offline_Electricity_Bill_Pay_Commission
          );
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.Offline_Electricity_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          superDistributorCommAmount =
            (amount *
              parseFloat(
                superDistributorPackage.Offline_Electricity_Bill_Pay_Commission
              )) /
            100;
        } else {
          superDistributorCommAmount = parseFloat(
            superDistributorPackage.Offline_Electricity_Bill_Pay_Commission
          );
        }
      }
      if (white_lable && whiteLablePackage) {
        if (
          whiteLablePackage.Offline_Electricity_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          whiteLableCommAmount =
            (amount *
              parseFloat(
                whiteLablePackage.Offline_Electricity_Bill_Pay_Commission
              )) /
            100;
        } else {
          whiteLableCommAmount = parseFloat(
            whiteLablePackage.Offline_Electricity_Bill_Pay_Commission
          );
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
      userId: retailer,
      amount: "",
      Transaction_details: `Commission Credit for Broadband Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for Broadband Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for Broadband Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for Broadband Order Id ${item.orderid}`,
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

    //  const operatorName = item.operator_name;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;

    try {
      if (
        retailerPackage.Offline_Broadband_Bill_Pay_Commission_Type ==
        "Percentage"
      ) {
        retailerCommAmount =
          (amount *
            parseFloat(retailerPackage.Offline_Broadband_Bill_Pay_Commission)) /
          100;
      } else {
        retailerCommAmount = parseFloat(
          retailerPackage.Offline_Broadband_Bill_Pay_Commission
        );
      }

      if (distributor && distributorPackage) {
        if (
          distributorPackage.Offline_Broadband_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          distributorCommAmount =
            (amount *
              parseFloat(
                distributorPackage.Offline_Broadband_Bill_Pay_Commission
              )) /
            100;
        } else {
          distributorCommAmount = parseFloat(
            distributorPackage.Offline_Broadband_Bill_Pay_Commission
          );
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.Offline_Broadband_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          superDistributorCommAmount =
            (amount *
              parseFloat(
                superDistributorPackage.Offline_Broadband_Bill_Pay_Commission
              )) /
            100;
        } else {
          superDistributorCommAmount = parseFloat(
            superDistributorPackage.Offline_Broadband_Bill_Pay_Commission
          );
        }
      }
      if (white_lable && whiteLablePackage) {
        if (
          whiteLablePackage.Offline_Broadband_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          whiteLableCommAmount =
            (amount *
              parseFloat(
                whiteLablePackage.Offline_Broadband_Bill_Pay_Commission
              )) /
            100;
        } else {
          whiteLableCommAmount = parseFloat(
            whiteLablePackage.Offline_Broadband_Bill_Pay_Commission
          );
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
  const LandlineRechargeComm = async (
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
      userId: retailer,
      amount: "",
      Transaction_details: `Commission Credit for Landline Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for Landline Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for Landline Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for Landline Order Id ${item.orderid}`,
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

    //  const operatorName = item.operator_name;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;

    try {
      if (
        retailerPackage.Offline_Broadband_Bill_Pay_Commission_Type ==
        "Percentage"
      ) {
        retailerCommAmount =
          (amount *
            parseFloat(retailerPackage.Offline_Broadband_Bill_Pay_Commission)) /
          100;
      } else {
        retailerCommAmount = parseFloat(
          retailerPackage.Offline_Broadband_Bill_Pay_Commission
        );
      }

      if (distributor && distributorPackage) {
        if (
          distributorPackage.Offline_Broadband_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          distributorCommAmount =
            (amount *
              parseFloat(
                distributorPackage.Offline_Broadband_Bill_Pay_Commission
              )) /
            100;
        } else {
          distributorCommAmount = parseFloat(
            distributorPackage.Offline_Broadband_Bill_Pay_Commission
          );
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.Offline_Broadband_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          superDistributorCommAmount =
            (amount *
              parseFloat(
                superDistributorPackage.Offline_Broadband_Bill_Pay_Commission
              )) /
            100;
        } else {
          superDistributorCommAmount = parseFloat(
            superDistributorPackage.Offline_Broadband_Bill_Pay_Commission
          );
        }
      }
      if (white_lable && whiteLablePackage) {
        if (
          whiteLablePackage.Offline_Broadband_Bill_Pay_Commission_Type ==
          "Percentage"
        ) {
          whiteLableCommAmount =
            (amount *
              parseFloat(
                whiteLablePackage.Offline_Broadband_Bill_Pay_Commission
              )) /
            100;
        } else {
          whiteLableCommAmount = parseFloat(
            whiteLablePackage.Offline_Broadband_Bill_Pay_Commission
          );
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
  const InsuranceRechargeComm = async (
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
      userId: retailer,
      amount: "",
      Transaction_details: `Commission Credit for Insurance Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const distributorFormData = {
      userId: distributor,
      amount: "",
      Transaction_details: `Commission Credit for Insurance Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const superDistributorFormData = {
      userId: superDistributor,
      amount: "",
      Transaction_details: `Commission Credit for Insurance Order Id ${item.orderid}`,
      status: "Success",
      Order_Id,
      Transaction_Id,
    };
    const whiteLableFormData = {
      userId: white_lable,
      amount: "",
      Transaction_details: `Commission Credit for Insurance Order Id ${item.orderid}`,
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

    //  const operatorName = item.operator_name;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;

    try {
      if (
        retailerPackage.Offline_Insurance_Pay_Commission_Type == "Percentage"
      ) {
        retailerCommAmount =
          (amount *
            parseFloat(retailerPackage.Offline_Insurance_Pay_Commission)) /
          100;
      } else {
        retailerCommAmount = parseFloat(
          retailerPackage.Offline_Insurance_Pay_Commission
        );
      }

      if (distributor && distributorPackage) {
        if (
          distributorPackage.Offline_Insurance_Pay_Commission_Type ==
          "Percentage"
        ) {
          distributorCommAmount =
            (amount *
              parseFloat(distributorPackage.Offline_Insurance_Pay_Commission)) /
            100;
        } else {
          distributorCommAmount = parseFloat(
            distributorPackage.Offline_Insurance_Pay_Commission
          );
        }
      }
      if (superDistributor && superDistributorPackage) {
        if (
          superDistributorPackage.Offline_Insurance_Pay_Commission_Type ==
          "Percentage"
        ) {
          superDistributorCommAmount =
            (amount *
              parseFloat(
                superDistributorPackage.Offline_Insurance_Pay_Commission
              )) /
            100;
        } else {
          superDistributorCommAmount = parseFloat(
            superDistributorPackage.Offline_Insurance_Pay_Commission
          );
        }
      }
      if (white_lable && whiteLablePackage) {
        if (
          whiteLablePackage.Offline_Insurance_Pay_Commission_Type ==
          "Percentage"
        ) {
          whiteLableCommAmount =
            (amount *
              parseFloat(whiteLablePackage.Offline_Insurance_Pay_Commission)) /
            100;
        } else {
          whiteLableCommAmount = parseFloat(
            whiteLablePackage.Offline_Insurance_Pay_Commission
          );
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
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/superAdmin/getUserRelations/${item.created_by_userid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(item.created_By_User_Id);
      console.log(data);
      setUserRelation(data.data);

      if (data.data) {
        const { distributor, superDistributor, white_lable } = data.data;
        const retailer = item.created_by_userid;
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

        let result = {};
        // Use the results as needed
        if (item.recharge_Type == "Prepaid") {
          result = await prepaidRechargeComm(
            retailer,
            distributor,
            superDistributor,
            white_lable,
            resultsMap,
            item
          );
          console.log(result);
        } else if (item.recharge_Type == "Postpaid") {
          result = await postpaidRechargeComm(
            retailer,
            distributor,
            superDistributor,
            white_lable,
            resultsMap,
            item
          );
        } else if (item.recharge_Type == "DTH") {
          result = await DTHRechargeComm(
            retailer,
            distributor,
            superDistributor,
            white_lable,
            resultsMap,
            item
          );
        } else if (item.recharge_Type == "Electricity") {
          result = await ElectricityRechargeComm(
            retailer,
            distributor,
            superDistributor,
            white_lable,
            resultsMap,
            item
          );
        } else if (item.recharge_Type == "Broadband") {
          result = await BroadbandRechargeComm(
            retailer,
            distributor,
            superDistributor,
            white_lable,
            resultsMap,
            item
          );
        } else if (item.recharge_Type == "Landline") {
          result = await LandlineRechargeComm(
            retailer,
            distributor,
            superDistributor,
            white_lable,
            resultsMap,
            item
          );
        } else if (item.recharge_Type == "Insurance") {
          result = await InsuranceRechargeComm(
            retailer,
            distributor,
            superDistributor,
            white_lable,
            resultsMap,
            item
          );
        }

        // Track whether all commissions were processed successfully
        let allProcessesSuccessful = true;

        if (
          result &&
          result.retailerFormData &&
          result.retailerFormData.amount
        ) {
          const response = await axios
            .put(
              "https://2kadam.co.in/api/auth/superAdmin/CreditCommission",
              // "https://2kadam.co.in/api/auth/log-reg/AddWalletAddMoneyDirect",
              result.retailerFormData,
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
          console.log(response);
        }
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
          if (result.distributorFormData && result.distributorFormData.amount) {
            distributor_Commission = result.distributorFormData.amount;
          }
          if (result.retailerFormData && result.retailerFormData.amount) {
            retailer_Commission = result.retailerFormData.amount;
          }

          const commissionFormData = {
            order_id: result.Order_Id,
            transaction_id: result.Transaction_Id,
            amount: item.amount,
            whiteLabel_id: white_lable ? white_lable : "NA",
            super_Distributor_id: superDistributor ? superDistributor : "NA",
            distributor_id: distributor ? distributor : "NA",
            retailer_id: retailer ? retailer : "NA",
            whiteLabel_Commission: whiteLabel_Commission,
            super_Distributor_Commission: super_Distributor_Commission,
            distributor_Commission: distributor_Commission,
            retailer_Commission: retailer_Commission,
            transaction_type: item.recharge_Type,
            transaction_details: result.retailerFormData.Transaction_details,
            status: "Success",
          };
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

        await axios
          .put(
            "https://2kadam.co.in/api/auth/superAdmin/ApproveOfflineRecharge",
            // "https://2kadam.co.in/api/auth/superAdmin/resolveComplaint",
            formData,
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

        // Show success message if all processes succeeded
        if (allProcessesSuccessful) {
          setShowApproveModel(false);
          setIsRefresh((value) => !value);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "All commissions have been processed successfully!",
          });
        } else {
          setShowApproveModel(false);
          setIsRefresh((value) => !value);
          Swal.fire({
            icon: "warning",
            title: "Partial Success",
            text: "Some commissions were not processed. Please check the logs.",
          });
        }
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handlesubmit}>
          <div className="">
            <label for="name" class="form-label">
              Order Id
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Enter Package Name"
                value={item.orderid}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label for="name" class="form-label">
              Enter Note
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="note"
                class="form-control"
                placeholder="Enter Note"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="text-center  m-5">
              <button type="submit" className="btn p-2" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

//  approve model component end//

//  reject model component start//
const SARejectModel = ({ item, setShowRejectModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const [formData, setFormData] = useState({
    order_id: item.orderid,
    note: "",
    status: "Reject",
    user_id: item.created_by_userid,
    Transaction_details: `Refund Credit for ${item.recharge_Type} Recharge Order Id ${item.orderid}`,
    refundAmount: item.amount,
    process_by_userId: userId,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      process_by_userId: userId, // Update process_by_userId when userId changes
    }));
  }, [userId]); // Dependency: runs whenever userId changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "https://2kadam.co.in/api/auth/superAdmin/rejectOfflineRecharge",
        // "https://2kadam.co.in/api/auth/superAdmin/resolveComplaint",
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
          title: "Reject Form Successfully",
        });
        setShowRejectModel(false);
        setIsRefresh((value) => !value);
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
      <div>
        <form onSubmit={handlesubmit}>
          <div className="">
            <label for="name" class="form-label">
              Order Id
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Enter Package Name"
                value={item.orderid}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label for="name" class="form-label">
              User Name
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Enter UserName"
                value={item.UserName}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
              Refund Amount
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Enter Amount"
                value={item.amount}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label for="name" class="form-label">
              Enter Note
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="note"
                class="form-control"
                placeholder="Enter Note"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="text-center  m-5">
              <button type="submit" className="btn p-2" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

//  reject model component end//

const SAEOfflineRechargeHistory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [formStatus, setFormStatus] = useState(""); // For user type filter
  const [ShowApproveModel, setShowApproveModel] = useState(false);
  const [ShowRejectModel, setShowRejectModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const fetchOfflineForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getOfflineRecharge",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(data.data);
      setLoading(false);
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
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchOfflineForm();
  // }, []);

  useEffect(() => {
    fetchOfflineForm();
  }, [isRefresh]);

  const filteredItems = users.filter((row) => {
    const matchesKeyword =
      (row?.mobile_no &&
        row.mobile_no.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.UserName &&
        row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.orderid &&
        row.orderid.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.created_by_userid &&
        row.created_by_userid
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()));

    const matchesType =
      !formStatus ||
      formStatus === "---Select Form Status---" ||
      row.status === formStatus;
    return matchesKeyword && matchesType;
  });

  const totalPages = Math.ceil(filteredItems.length / complaintsPerPage);

  const filterPagination = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredItems?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showApiData = filterPagination();

  console.log(showApiData);
  //   const deactivateUser = async (id) => {
  //     const swalWithBootstrapButtons = Swal.mixin({
  //       customClass: {
  //         confirmButton: "btn btn-success",
  //         cancelButton: "btn btn-danger"
  //       },
  //       buttonsStyling: false
  //     });

  //     swalWithBootstrapButtons.fire({
  //       title: "Are you sure?",
  //       // text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, deactive it!",
  //       cancelButtonText: "No, cancel!",
  //       reverseButtons: true
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         setLoading(true);
  //         try {
  //           const { data } = await axios.put(
  //             "https://2kadam.co.in/api/auth/superAdmin/deactivateUser",
  //             {
  //                userId: id
  //             }
  //           );
  //           if (data.success) {
  //             swalWithBootstrapButtons.fire({
  //               title: "Deactivated!",
  //               text: data.message,
  //               icon: "success"
  //             });
  //            fetchActiveUsers();
  //           } else {
  //             swalWithBootstrapButtons.fire({
  //               title: "Error!",
  //               text: data.message || "An error occurred during the process. Please try again.",
  //               icon: "error"
  //             });
  //           }
  //         } catch (error) {
  //           console.error("Error deactivate user:", error);
  //           swalWithBootstrapButtons.fire({
  //             title: "Error!",
  //             text: "An error occurred during the process. Please try again.",
  //             icon: "error"
  //           });
  //         } finally {
  //           setLoading(false);
  //         }
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         swalWithBootstrapButtons.fire({
  //           title: "Cancelled",
  //           text: "Your user is safe :)",
  //           icon: "error"
  //         });
  //       }
  //     });
  //   };
  console.log(users);

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-lg-center justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>Complaint Raised List</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Offline Recharge Requests
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Offline Recharge Requests
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-xl-row gap-3">
                          {/* <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="fromDate" className="form-label">From</label>
                                                        <input id="fromDate" className="form-control" type="date" />
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div>
                                                    <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div> */}

                          <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                            {/* <label for="fromDate" className="form-label">From</label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              placeholder="Enter Number/Order Id/User Name/User Id"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-3">
                            {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={formStatus}
                              onChange={(e) => setFormStatus(e.target.value)}
                            >
                              <option selected>---Select Form Status---</option>
                              <option value="Pending">Pending</option>
                              <option value="Approve">Approve</option>
                              <option value="Reject">Reject</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            {loading ? (
                              <div className="d-flex justify-content-center">
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden ">
                                    Loading...
                                  </span>
                                </Spinner>
                              </div>
                            ) : (
                              <>
                                <table class="table table-striped">
                                  <thead className="table-dark">
                                    <tr>
                                      <th scope="col">Sr.No</th>
                                      <th scope="col">Created Date</th>
                                      <th scope="col">Order Id</th>
                                      <th scope="col">Number</th>
                                      <th scope="col">Operator Name</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Recharge Type</th>
                                      <th scope="col">User Id</th>
                                      <th scope="col">User Name</th>
                                      <th scope="col">User Mobile</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">process By</th>
                                      <th scope="col">process Date</th>
                                      <th scope="col">Note</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {showApiData && showApiData.length > 0 ? (
                                      showApiData?.map((item, index) => (
                                        <tr key={index}>
                                          <td>
                                            {currentPage * complaintsPerPage +
                                              index +
                                              1}
                                          </td>
                                          <td>{item.created_at}</td>
                                          <td>{item.orderid}</td>
                                          <td>{item.mobile_no}</td>
                                          <td>{item.operator_name}</td>
                                          <td>{item.amount}</td>
                                          <td>{item.recharge_Type}</td>

                                          {/* <td>
                                            <a
                                              href={item.attached_photo}
                                              target="_blank"
                                            >
                                              View Photo
                                            </a>
                                          </td> */}
                                          {/* <td>
                                            <a
                                              href={item.attached_sign}
                                              target="_blank"
                                            >
                                              View Sign
                                            </a>
                                          </td> */}
                                          {/* <td>
                                            {item.documentUpload	
                                              ?.split(",")
                                              ?.map((kycurl, kycindx) => (
                                                <div key={kycindx}>
                                                  <a
                                                    href={kycurl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    View KYC {kycindx + 1}
                                                  </a>
                                                </div>
                                              ))}
                                          </td> */}
                                          {/* <td>
                                            <a
                                              href={item.bank_passbook}
                                              target="_blank"
                                            >
                                              View Passbook
                                            </a>
                                          </td>
                                          <td>
                                            <a
                                              href={item.shop_photo}
                                              target="_blank"
                                            >
                                              View Shop Photo
                                            </a>
                                          </td>
                                          <td>
                                            <a
                                              href={item.electric_bill}
                                              target="_blank"
                                            >
                                              View Electricity Bill
                                            </a>
                                          </td> */}
                                          <td>{item.created_by_userid}</td>
                                          <td>{item.UserName}</td>
                                          <td>{item.ContactNo}</td>
                                          <td>{item.status}</td>
                                          <td>{item.process_by_userId}</td>
                                          <td>{item.updated_at}</td>
                                          <td>{item.note}</td>
                                          <td>
                                            {item.status === "Pending" && (
                                              <Dropdown>
                                                <Dropdown.Toggle
                                                  variant="success"
                                                  // id={`dropdown-${user.id}`}
                                                  as="span"
                                                  style={{
                                                    border: "none",
                                                    background: "none",
                                                    cursor: "pointer",
                                                  }}
                                                  className="custom-dropdown-toggle"
                                                >
                                                  <PiDotsThreeOutlineVerticalBold />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowApproveModel(true);
                                                      setSelectedItem(item);
                                                      //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Approve
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowRejectModel(true);
                                                      setSelectedItem(item);
                                                      //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Reject
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            )}
                                          </td>
                                        </tr>

                                        //                                           <tr key={user.id}>
                                        //                                             {/* <th scope="row">{index + 1}</th> */}
                                        //                                             <th scope="row">{user.id}</th>
                                        //                                             <td>{user.createdAt}</td>
                                        //                                             <td>{user.complainType}</td>
                                        //                                             <td>{user.mobileNo}</td>
                                        //                                             <td>{user.remark}</td>
                                        //                                             <td>{user.transactionNo}</td>

                                        //                                             <td>{user.userID}</td>

                                        //                                             <td>{user.UserName}</td>
                                        //                                             <td>{user.role}</td>
                                        //                                             <td>{user.Email}</td>
                                        //                                             <td>{user.ContactNo}</td>

                                        //                                             {/* <td>
                                        //                                             {item.attached_kyc
                                        //                                                 .split(",")
                                        //                                                 .map((kycurl, kycindx) => (
                                        //                                                   <div key={kycindx}>
                                        //                                                     <a
                                        //                                                       href={kycurl}
                                        //                                                       target="_blank"
                                        //                                                       rel="noopener noreferrer"
                                        //                                                     >
                                        //                                                       View KYC {kycindx + 1}
                                        //                                                     </a>
                                        //                                                   </div>
                                        //                                                 ))}
                                        //                                           </td> */}
                                        //                                             <td>
                                        //                                               <a
                                        //                                                 href={user.complainFile}
                                        //                                                 target="_blank"
                                        //                                                 rel="noopener noreferrer"
                                        //                                               >
                                        //                                                 View
                                        //                                               </a>
                                        //                                             </td>
                                        //                                             {/* <td>
                                        //                                               <a
                                        //                                                 href={user.AadharBack}
                                        //                                                 target="_blank"
                                        //                                                 rel="noopener noreferrer"
                                        //                                               >
                                        //                                                 View
                                        //                                               </a>
                                        //                                             </td>
                                        //                                             <td>
                                        //                                               <a
                                        //                                                 href={user.PanCardFront}
                                        //                                                 target="_blank"
                                        //                                                 rel="noopener noreferrer"
                                        //                                               >
                                        //                                                 View
                                        //                                               </a>
                                        //                                             </td> */}

                                        //                                             {/* <td> <Link to={'/change-price'}>Change Price </Link></td> */}
                                        //                                             {/* <td>{user?.Note}</td> */}
                                        //                                             <td>{user.response}</td>
                                        //                                             <td>{user.status}</td>
                                        //                                             <td>
                                        //                                             { user.status === "Pending" &&
                                        //                                               <Dropdown>
                                        //                                                 <Dropdown.Toggle
                                        //                                                   variant="success"
                                        //                                                   // id={`dropdown-${user.id}`}
                                        //                                                   as="span" style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                                        //                                                   className="custom-dropdown-toggle"
                                        //                                                 >
                                        //                                                  <PiDotsThreeOutlineVerticalBold />
                                        //                                                 </Dropdown.Toggle>
                                        //                                                 <Dropdown.Menu>

                                        //                                                     <Dropdown.Item
                                        //                                                     onClick={() => {
                                        //                                                       // setSelectedUser(user);
                                        //                                                       setShowResolveModel(true)
                                        //                                                       setSelectedComplaint(user)
                                        //                                                     //   deactivateUser(user.UserId)
                                        //                                                     }}
                                        //                                                   >
                                        //                                                     <span className="">
                                        //                                                       {" "}
                                        //                                                       <CiViewList />
                                        //                                                     </span>{" "}
                                        //                                                     Mark Resolve
                                        //                                                   </Dropdown.Item>

                                        //                                                 </Dropdown.Menu>
                                        //                                               </Dropdown>
                                        // }
                                        //                                             </td>

                                        //                                           </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="13">No data available</td>{" "}
                                        {/* Updated colSpan to match table columns */}
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </>
                            )}
                          </div>
                          <PaginationContainer>
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              breakLabel={"..."}
                              pageCount={totalPages}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                              forcePage={currentPage}
                            />
                          </PaginationContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approve  Model  start*/}

        <Modal
          // size="lg"
          show={ShowApproveModel}
          //   fullscreen={true}
          onHide={() => setShowApproveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Approve
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SAApproveModel
                item={selectedItem}
                setShowApproveModel={setShowApproveModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Approve Model  end*/}

        {/* Reject Model  start*/}

        <Modal
          // size="lg"
          show={ShowRejectModel}
          //   fullscreen={true}
          onHide={() => setShowRejectModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Reject
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SARejectModel
                item={selectedItem}
                setShowRejectModel={setShowRejectModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Reject Model  end*/}
      </Wrapper>
    </>
  );
};

export default SAEOfflineRechargeHistory;

const Wrapper = styled.div`
  .main {
    height: 100vh;
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
    white-space: nowrap;
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
  .custom-dropdown-toggle::after {
    display: none !important;
  }
`;

const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px;
    list-style: none;
    border-radius: 5px;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    display: block;
    padding: 8px 16px;
    border: 1px solid #e6ecf1;
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0px 0px 1px #000;
    font-size: 14px; /* Default font size */
  }

  .pagination li.active a {
    background-color: #004aad;
    color: white;
    border: 1px solid #004aad;
  }

  .pagination li.disabled a {
    color: white;
    cursor: not-allowed;
    background-color: #3a4e69;
    border: 1px solid #3a4e69;
  }

  .pagination li a:hover:not(.active) {
    background-color: #004aad;
    color: white;
  }

  /* Responsive adjustments for smaller screens */
  @media (max-width: 768px) {
    .pagination {
      padding: 5px;
      flex-wrap: wrap;
    }

    .pagination li {
      margin: 2px;
    }

    .pagination li a {
      padding: 6px 10px;
      font-size: 12px;
    }
  }

  @media (max-width: 480px) {
    .pagination {
      padding: 5px;
    }

    .pagination li {
      margin: 2px;
    }

    .pagination li a {
      padding: 4px 8px;
      font-size: 10px;
    }

    /* Hide the previous and next labels for extra-small screens */
    .pagination li:first-child a::before {
      content: "«";
      margin-right: 5px;
    }

    .pagination li:last-child a::after {
      content: "»";
      margin-left: 5px;
    }
  }
`;
