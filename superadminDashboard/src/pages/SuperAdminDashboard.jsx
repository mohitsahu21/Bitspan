// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import HeadBar from "../components/HeadBar";
// import Sider from "../components/SideBar";
// import { TbRecharging } from "react-icons/tb";
// import { FaMobileAlt } from "react-icons/fa";
// import {
//   MdFileCopy,
//   MdPendingActions,
//   MdFileOpen,
//   MdBook,
//   MdCreditCard,
//   MdOutlineWidthFull,
// } from "react-icons/md";
// import { RiCoupon2Line } from "react-icons/ri";
// import { FaRegMessage } from "react-icons/fa6";
// import { MdManageSearch } from "react-icons/md";
// import { IoIosLogIn } from "react-icons/io";
// import { MdCrop } from "react-icons/md";
// import { MdAddCard } from "react-icons/md";
// import { LuIndianRupee } from "react-icons/lu";
// import { AiOutlineForm } from "react-icons/ai";
// import { MdAddShoppingCart } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { BiHomeAlt } from "react-icons/bi";
// import { LuUserPlus } from "react-icons/lu";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";
// import { BsBank, BsInfoSquare } from "react-icons/bs";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { clearUser } from "../redux/user/userSlice";
// import Loading from "../components/SuperAdmin/Loading";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  MdAddCard,
  MdAirplaneTicket,
  MdBakeryDining,
  MdBook,
  MdCalendarMonth,
  MdCardGiftcard,
  MdCommentBank,
  MdCreditCard,
  MdFileCopy,
  MdFileDownloadDone,
  MdFileOpen,
  MdFilePresent,
  MdFileUploadOff,
  MdFilterFrames,
  MdFoodBank,
  MdFormatAlignCenter,
  MdFormatClear,
  MdFormatItalic,
  MdFormatOverline,
  MdMoney,
  MdPages,
  MdPageview,
  MdPending,
  MdPendingActions,
  MdPriceChange,
  MdRequestPage,
  MdRequestQuote,
} from "react-icons/md";
import { LuFormInput, LuIndianRupee, LuRemoveFormatting } from "react-icons/lu";

import { Link, useNavigate } from "react-router-dom";
import { BiHomeAlt, BiMoneyWithdraw, BiWallet } from "react-icons/bi";
import { LuUserPlus } from "react-icons/lu";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  BsBank,
  BsInfoSquare,
  BsTicket,
  BsTicketDetailed,
} from "react-icons/bs";
import { FaFile, FaFortAwesome, FaMobileAlt } from "react-icons/fa";
import {
  FaIndianRupeeSign,
  FaRegMessage,
  FaRupeeSign,
  FaTicketSimple,
} from "react-icons/fa6";
import { TbCoinRupee, TbCoinRupeeFilled, TbMoodDollar } from "react-icons/tb";
import {
  RiGitClosePullRequestFill,
  RiMoneyRupeeCircleFill,
} from "react-icons/ri";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [cgOnePayBalance, setCgOnePayBalance] = useState([]);
  const [instPayBalance, setInstPayBalance] = useState([]);
  const [ezytmBalance, setEzytmBalance] = useState([]);
  const [deeperWebBalance, setDeeperWebBalance] = useState([]);
  const [easySmartBalance, seteasySmartBalance] = useState([]);
  const [sizarpayBalance, setSizarpayBalance] = useState([]);
  const [zlinkBalance, setZlinkBalance] = useState([]);
  const [walletWithdrawalRequests, setWalletWithdrawalRequests] = useState([]);
  const [addWalletMoneyRequests, setAddWalletMoneyRequests] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [pendingOfflineRecharge, setPendingOfflineRecharge] = useState([]);
  const [pendingOfflineForm, setPendingOfflineForm] = useState([]);
  const [pendingPanOfflineForm, setPendingPanOfflineForm] = useState([]);
  const [pendingBankIdForm, setPendingBankIdForm] = useState([]);
  const [pendingEdistrictForm, setPendingEdistrictForm] = useState([]);
  const [pendingVerifyEdistrictForm, setPendingVerifyEdistrictForm] = useState(
    []
  );
  const [pendingSmabalForm, setPendingSambalForm] = useState([]);
  const [pendingPanCouponRequest, setPendingPanCouponRequest] = useState([]);
  const TotalUsers = {
    WhiteLabel: 0,
    SuperDistributor: 0,
    Distributor: 0,
    Retailer: 0,
  };

  if (users?.length > 0) {
    users.map((item) => {
      // if(item.role === "WhiteLabel"){
      //   TotalUsers.WhiteLabel += 1
      // }
      TotalUsers[item?.role] += 1;
    });
  }
  const fetchActiveUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getAllUsers",
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
      setLoading(false);
    }
  };

  const fetchCgOnePayBalance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/cgonepay/cgonePayBalance"
      );
      setCgOnePayBalance(data.MESSAGE);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchInstPayBalance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/instpay/get-balance"
      );
      setInstPayBalance(data.balance);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchEzytmBalance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/ezytm/get-balance-ezytm"
      );
      setEzytmBalance(data.BALANCE);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchDeeperWebBalance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/deeperweb/deeperwebBalance"
      );
      setDeeperWebBalance(data.totalBalance);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchEasySmartBalance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/nsdlpan/easysmartBalance"
      );
      seteasySmartBalance(data.user_balance);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchSizarpayBalance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/sizarpay/sizarpayBalance"
      );
      setSizarpayBalance(data.bal);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchZlinkBalance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/zlink/zlinkBalance"
      );
      setZlinkBalance(data.user_balance);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchWalletWithdrawalRequest = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingWalletWithdrawRequests",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWalletWithdrawalRequests(data.dataLength);
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

  const fetchAddWalletMoneyRequest = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingWalletAddMoneyRequests",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddWalletMoneyRequests(data.dataLength);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingComplaintData",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingComplaints(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPendingOfflineRecharge = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingOfflineRecharge",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingOfflineRecharge(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPendingOfflineForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingApplyOfflineForm",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingOfflineForm(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPendingPanOfflineForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingPANOfflineForm",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingPanOfflineForm(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPendingBankIdForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingBankIdForm",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingBankIdForm(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPendingEdistrictForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingEdistrictForms",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingEdistrictForm(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPendingVerifyEdistrictForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingVerifyEdistrictForms",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingVerifyEdistrictForm(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPendingSambalForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingSambalForms",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingSambalForm(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPendingPanCouponRequest = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getPendingPanCouponRequests",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingPanCouponRequest(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
    fetchWalletWithdrawalRequest();
    fetchAddWalletMoneyRequest();
    fetchComplaints();
    fetchPendingOfflineRecharge();
    fetchPendingOfflineForm();
    fetchPendingPanOfflineForm();
    fetchPendingBankIdForm();
    fetchPendingEdistrictForm();
    fetchPendingVerifyEdistrictForm();
    fetchPendingSambalForm();
    fetchPendingPanCouponRequest();
    fetchCgOnePayBalance();
    fetchInstPayBalance();
    fetchEzytmBalance();
    fetchDeeperWebBalance();
    fetchEasySmartBalance();
    fetchSizarpayBalance();
    fetchZlinkBalance();
  }, []);

  // Define the custom tooltip styled component
  // const CustomTooltip = styled(Tooltip)`
  //   .tooltip-inner {
  //     background-color: #fdded1;
  //     color: #fb510d;
  //     width: 190px;
  //   }
  //   .tooltip-arrow::before {
  //     border-top-color: white;
  //   }
  // `;
  const CustomTooltip = styled(Tooltip)`
    .tooltip-inner {
      background-color: #3498db;
      color: white;
      width: 190px;
    }
    .tooltip-arrow::before {
      border-top-color: white;
    }
  `;

  const User = ({ id, children, title }) => (
    <OverlayTrigger
      overlay={
        <CustomTooltip id={id}>
          {`Total WhiteLabel - ${TotalUsers.WhiteLabel}`}
          <br /> {`Total Super Distributor - ${TotalUsers.SuperDistributor}`}{" "}
          <br /> {`Total Distributor - ${TotalUsers.Distributor}`} <br />{" "}
          {`Total Retailer - ${TotalUsers.Retailer}`}
        </CustomTooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
  return (
    <>
      {/* <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 d-none ">
              </div>
              <div className="row shadow-none  formdata mt-4">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Dashboard</h4>
                    <p className="mx-lg-5">
                      {" "}
                      <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                      <span
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Dashboard
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10 mt-4">
                <div className="container-fluid">
                  <div className="row  d-flex formdata justify-content-center">
                    <User id="t-1">
                      <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                        <div className="card card-4">
                          <Link to="/users-joining-list">
                            <div className="d-flex">
                              <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                                <LuUserPlus />
                              </div>
                              <div></div>
                              <div className="d-flex flex-column cardtext">
                                <p className="mb-0 px-2 my-0 fs-6">
                                  Total Users
                                </p>
                                <h4 className="px-2 my-0">
                                  {users?.length ? users?.length : "..."}
                                </h4>{" "}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </User>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-2">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <LuIndianRupee />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              INS PAY Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">
                              {instPayBalance?.length ? instPayBalance : "..."}
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <LuIndianRupee />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Ezytm Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">
                              {ezytmBalance?.length ? ezytmBalance : "..."}
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <LuIndianRupee />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              CGONE PAY Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">
                              {cgOnePayBalance?.length
                                ? cgOnePayBalance
                                : "..."}
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <LuIndianRupee />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Deeper Web Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">
                              {deeperWebBalance?.length
                                ? deeperWebBalance
                                : "..."}
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <LuIndianRupee />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Easy Smart Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">
                              {easySmartBalance?.length
                                ? easySmartBalance
                                : "..."}
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <LuIndianRupee />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Sizar Pay Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">
                              {sizarpayBalance?.toString()?.length
                                ? sizarpayBalance
                                : "..."}
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <LuIndianRupee />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              ZLink Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">
                              {zlinkBalance?.length ? zlinkBalance : "..."}
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/Offline-Recharge-history">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Offline Recharge
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingOfflineRecharge?.toString()?.length
                                  ? pendingOfflineRecharge
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/view-all-offline-history">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Offline Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingOfflineForm.toString()?.length
                                  ? pendingOfflineForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/Pan-offline-history">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending PAN Offline Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingPanOfflineForm?.toString()?.length
                                  ? pendingPanOfflineForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/Bank-Id-history">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Bank Id Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingBankIdForm?.toString()?.length
                                  ? pendingBankIdForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/E-district-history">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending E-district Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingEdistrictForm?.toString()?.length
                                  ? pendingEdistrictForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/verify-E-district-form-history">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Verify E-district Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingVerifyEdistrictForm?.toString()?.length
                                  ? pendingVerifyEdistrictForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/sambal-form-history">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Sambal Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingSmabalForm?.toString()?.length
                                  ? pendingSmabalForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/pan-coupon-requests">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Pan Coupon Request
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingPanCouponRequest?.toString()?.length
                                  ? pendingPanCouponRequest
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/complaint-raised-list">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Total Pending Complaints
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingComplaints?.toString()?.length
                                  ? pendingComplaints
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/wallet-withdraw-requests">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Wallet Withdraw Requests
                              </p>
                              <h4 className="px-2 my-0">
                                {walletWithdrawalRequests?.toString()?.length
                                  ? walletWithdrawalRequests
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/add-wallet-money-requests">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Add Wallet Money Requests
                              </p>
                              <h4 className="px-2 my-0">
                                {addWalletMoneyRequests?.toString()?.length
                                  ? addWalletMoneyRequests
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0"></div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper> */}
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 d-none ">
                {/* <Sider /> */}
              </div>
              <div className="row shadow-none  formdata mt-4">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                  {/* <div className="text-center">
                        <h3>Change Password</h3>
                      </div> */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Dashboard</h4>
                    <p className="mx-lg-5">
                      {" "}
                      <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                      <span
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Dashboard
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10 mt-4">
                <div className="container-fluid">
                  <div className="row  d-flex formdata justify-content-center">
                    <div className="col-xxl-12   mb-4 mt-1">
                      <div className=" card-4  g1" id="main1">
                        <div className="d-flex ">
                          <Link to="/users-joining-list">
                            <User id="t-1">
                              <div className="d-flex flex-column text-white cardtext1 py-3">
                                <h5>Total Users</h5>
                                {/* <h4 className="px-2 my-0">(Rs. 250/-)</h4>{" "} */}
                                <h5>
                                  {" "}
                                  <LuUserPlus />{" "}
                                  {users?.length ? users?.length : "..."}
                                </h5>
                              </div>
                            </User>
                          </Link>
                        </div>

                        <div className="d-flex gap-4 smallcard">
                          {/* <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-6 icon">
                                            <LuIndianRupee />
                                          </div> */}

                          <div
                            className="d-flex flex-column cardtext1  p-1"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              borderRadius: "12px",
                            }}
                          >
                            <p className="mb-0 px-2 my-0 fs-6">
                              Easy Smart Wallet Balance
                            </p>
                            <h5 className="px-2 my-1">
                              ₹{" "}
                              {easySmartBalance?.length
                                ? easySmartBalance
                                : "..."}
                            </h5>
                          </div>

                          <div
                            className="d-flex flex-column cardtext1 p-1  "
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              borderRadius: "12px",
                            }}
                          >
                            <p className="mb-0 px-2 my-0 fs-6">
                              Sizar Pay Wallet Balance
                            </p>
                            <h5 className="px-2 my-1">
                              ₹{" "}
                              {sizarpayBalance?.toString()?.length
                                ? sizarpayBalance
                                : "..."}
                            </h5>{" "}
                          </div>
                        </div>

                        <div className="d-flex gap-4  smallcard mt-3">
                          {/* <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-6 icon">
                                            <LuIndianRupee />
                                          </div> */}

                          <div
                            className="d-flex flex-column cardtext1  p-1"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              borderRadius: "12px",
                            }}
                          >
                            <p className="mb-0 px-2   my-0 fs-6">
                              INS PAY Wallet Balance
                            </p>
                            <h5 className="px-2 my-1">
                              ₹{" "}
                              {instPayBalance?.length ? instPayBalance : "..."}
                            </h5>
                          </div>

                          <div
                            className="d-flex flex-column cardtext1 p-1  "
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              borderRadius: "12px",
                            }}
                          >
                            <p className="mb-0 px-2 my-0 fs-6">
                              Ezytm Wallet Balance
                            </p>
                            <h5 className="px-2 my-1">
                              ₹ {ezytmBalance?.length ? ezytmBalance : "..."}
                            </h5>{" "}
                          </div>
                          <div
                            className="d-flex flex-column cardtext1 p-1  "
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              borderRadius: "12px",
                            }}
                          >
                            <p className="mb-0 px-2 my-0 fs-6">
                              CGONE PAY Wallet Balance
                            </p>
                            <h5 className="px-2 my-1">
                              ₹{" "}
                              {cgOnePayBalance?.length
                                ? cgOnePayBalance
                                : "..."}
                            </h5>{" "}
                          </div>
                          <div
                            className="d-flex flex-column cardtext1 p-1  "
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              borderRadius: "12px",
                            }}
                          >
                            <p className="mb-0 px-2 my-0 fs-6">
                              Deeper Web Wallet Balance
                            </p>
                            <h5 className="px-2 my-1">
                              ₹{" "}
                              {deeperWebBalance?.length
                                ? deeperWebBalance
                                : "..."}
                            </h5>{" "}
                          </div>
                          <div
                            className="d-flex flex-column cardtext1  p-1 "
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              borderRadius: "12px",
                            }}
                          >
                            <p className="mb-0 px-2 my-0 fs-6">
                              ZLink Wallet Balance
                            </p>
                            <h5 className="px-2 my-1">
                              ₹ {zlinkBalance?.length ? zlinkBalance : "..."}
                            </h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5 className="mt-3">Quick Service</h5>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/Offline-Recharge-history">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#2ecc71",
                                borderRadius: "15px",
                              }}
                            >
                              <FaMobileAlt />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Offline Recharge
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingOfflineRecharge?.toString()?.length
                                  ? pendingOfflineRecharge
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/view-all-offline-history">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#29A0B1",
                                borderRadius: "15px",
                              }}
                            >
                              <MdPendingActions />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Offline Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingOfflineForm.toString()?.length
                                  ? pendingOfflineForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/Pan-offline-history">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#923aac",
                                borderRadius: "15px",
                              }}
                            >
                              <MdFileCopy />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending PAN Offline Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingPanOfflineForm?.toString()?.length
                                  ? pendingPanOfflineForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/Bank-Id-history">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#f56f43",
                                borderRadius: "15px",
                              }}
                            >
                              <BsBank />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Bank Id Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingBankIdForm?.toString()?.length
                                  ? pendingBankIdForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/E-district-history">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#528269",
                                borderRadius: "15px",
                              }}
                            >
                              <MdFileOpen />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending E-district Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingEdistrictForm?.toString()?.length
                                  ? pendingEdistrictForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/verify-E-district-form-history">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#6e6ace",
                                borderRadius: "15px",
                              }}
                            >
                              <MdBook />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Verify E-district Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingVerifyEdistrictForm?.toString()?.length
                                  ? pendingVerifyEdistrictForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/sambal-form-history">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#2fddf4",
                                borderRadius: "15px",
                              }}
                            >
                              <MdCreditCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Sambal Form
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingSmabalForm?.toString()?.length
                                  ? pendingSmabalForm
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/pan-coupon-requests">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#e74c3c",
                                borderRadius: "15px",
                              }}
                            >
                              <FaTicketSimple />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Pending Pan Coupon Request
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingPanCouponRequest?.toString()?.length
                                  ? pendingPanCouponRequest
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/complaint-raised-list">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#3498db",
                                borderRadius: "15px",
                              }}
                            >
                              <FaRegMessage />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Total Pending Complaints
                              </p>
                              <h4 className="px-2 my-0">
                                {pendingComplaints?.toString()?.length
                                  ? pendingComplaints
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/wallet-withdraw-requests">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: "#DD7536",
                                borderRadius: "15px",
                              }}
                            >
                              <TbCoinRupee />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Wallet Withdraw Requests
                              </p>
                              <h4 className="px-2 my-0">
                                {walletWithdrawalRequests?.toString()?.length
                                  ? walletWithdrawalRequests
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link to="/add-wallet-money-requests">
                          <div className="d-flex">
                            <div
                              className="d-flex justify-content-center flex-column align-items-center p-2 fs-2 icon"
                              style={{
                                backgroundColor: " #06d6a0",
                                borderRadius: "15px",
                              }}
                            >
                              <BiWallet />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Add Wallet Money Requests
                              </p>
                              <h4 className="px-2 my-0">
                                {addWalletMoneyRequests?.toString()?.length
                                  ? addWalletMoneyRequests
                                  : "..."}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0"></div>
                    <div className="col-xxl-4 col-xl-6  col-sm-12   d-flex justify-content-center my-3 p-0"></div>
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

export default SuperAdminDashboard;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  .card {
    width: 100%;
    padding: 10px;
    margin: 0 15px;
    border-radius: 10px;
    cursor: pointer;
    white-space: nowrap;

    transition: transform 0.3s ease-in-out, border 0.3s ease,
      border-radius 0.3s ease;
      @media screen and (max-width: 375px) {
      padding: 5px;
      margin: 0px;
    }
  }
  .card:hover {
    /* transform: scale(1.1); */

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px) scale(1.1);
    .icon {
      transform: scale(1.2);
    }
  }
  .cardtext {
    color: black;
  }
  .icon {
    color: white;
  }

  .card-1 {
    /* background-image: linear-gradient(
      91.3deg,
      rgba(240, 73, 207, 1) 15.7%,
      rgba(186, 90, 238, 1) 74.1%
    ); */
    background: white;
  }

  .card-2 {
    /* background-image: radial-gradient(
      circle farthest-corner at 10% 20%,
      rgba(87, 195, 155, 1) 0%,
      rgba(155, 218, 71, 0.66) 76.9%
    ); */
    background: white;

    border-radius: 15px;
  }
  .card-3 {
    /* background-image: radial-gradient(
      circle 897px at 9% 80.3%,
      rgba(55, 60, 245, 1) 0%,
      rgba(234, 161, 15, 0.9) 100.2%
    ); */
    background: white;

    border-radius: 10px;
  }
  .card-4 {
    /* background-image: linear-gradient(
      89.5deg,
      rgba(131, 204, 255, 1) 0.4%,
      rgba(66, 144, 251, 1) 100.3%
    ); */
    background: white;
  }
  a {
    text-decoration: none;
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
  .news {
    border: 1px solid black;
    position: relative;
    overflow: hidden;
  }

  @keyframes moveLeftToRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .news p {
    display: inline-block;
    white-space: nowrap;
    animation: moveLeftToRight 30s linear infinite;
    position: absolute;
    right: 0;
  }
  .news-icon {
    z-index: 1;
    font-size: large;
    background-color: #3498db;
  }
  #main1 {
    width: 100%;
    padding: 10px;

    border-radius: 10px;

    white-space: nowrap;

    transition: transform 0.3s ease-in-out, border 0.3s ease,
      border-radius 0.3s ease;
    background-color: #3a7bd5;
    color: white;
    @media screen and (min-width: 768px) and (max-width: 1400px) {
      margin: 0px 0px;
    }
  }
  #card121 {
    width: 100%;
    padding: 10px;
    margin: 4 12px;

    border-radius: 10px;
    white-space: nowrap;
    border: 1px solid transparent;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    color: white;
  }

  #bgicon {
    background-color: #3498db;
    border-radius: 15px;
  }
  .col-12 {
    border: 1px solid transparent;

    border-radius: 15px;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .smallcard {
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      flex-direction: column;
    }
    @media screen and (min-width: 1020px) and (max-width: 1300px) {
      flex-direction: column;
    }
  }
  #rescard {
    @media (min-width: 1024px) and (max-width: 1500px) {
      margin-left: 1rem;
    }
  }
    .g1{
  padding: 3rem;
    @media screen and (max-width: 768px) {
      
    padding: 1rem;
  }
}
  .res{
    @media screen and (max-width: 375px) {
      white-space: normal;
      padding: 5px 10px;
    }
  }
`;
// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;

//   .card {
//     width: 100%;
//     padding: 10px;
//     margin: 0 15px;
//     border-radius: 10px;
//     cursor: pointer;
//     white-space: nowrap;

//     transition: transform 0.3s ease-in-out, border 0.3s ease,
//       border-radius 0.3s ease;
//   }
//   .card:hover {
//     /* transform: scale(1.1); */
//     background-image: linear-gradient(
//       85.2deg,
//       rgba(33, 3, 40, 1) 7.5%,
//       rgba(65, 5, 72, 1) 88.7%
//     );
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//     transform: translateY(-10px) scale(1.1);
//     .icon {
//       transform: scale(1.2);
//     }
//   }
//   .cardtext {
//     color: white;
//   }
//   .icon {
//     color: #fe662b;
//   }

//   .card-1 {
//     /* background-image: linear-gradient(
//       91.3deg,
//       rgba(240, 73, 207, 1) 15.7%,
//       rgba(186, 90, 238, 1) 74.1%
//     ); */
//     background: #6e6e6e;
//   }

//   .card-2 {
//     /* background-image: radial-gradient(
//       circle farthest-corner at 10% 20%,
//       rgba(87, 195, 155, 1) 0%,
//       rgba(155, 218, 71, 0.66) 76.9%
//     ); */
//     background: #6e6e6e;
//   }
//   .card-3 {
//     /* background-image: radial-gradient(
//       circle 897px at 9% 80.3%,
//       rgba(55, 60, 245, 1) 0%,
//       rgba(234, 161, 15, 0.9) 100.2%
//     ); */
//     background: #6e6e6e;
//   }
//   .card-4 {
//     /* background-image: linear-gradient(
//       89.5deg,
//       rgba(131, 204, 255, 1) 0.4%,
//       rgba(66, 144, 251, 1) 100.3%
//     ); */
//     background: #6e6e6e;
//   }
//   a {
//     text-decoration: none;
//   }
//   @media (min-width: 1025px) and (max-width: 1500px) {
//     .formdata {
//       padding-left: 15rem;
//     }
//   }
//   @media (min-width: 1500px) {
//     .formdata {
//       padding-left: 13rem;
//     }
//   }
//   .news {
//     border: 1px solid black;
//     position: relative;
//     overflow: hidden;
//   }

//   @keyframes moveLeftToRight {
//     0% {
//       transform: translateX(100%);
//     }
//     100% {
//       transform: translateX(-100%);
//     }
//   }

//   .news p {
//     display: inline-block;
//     white-space: nowrap;
//     animation: moveLeftToRight 30s linear infinite;
//     position: absolute;
//     right: 0;
//   }
//   .news-icon {
//     z-index: 100;
//     font-size: large;
//   }
// `;
