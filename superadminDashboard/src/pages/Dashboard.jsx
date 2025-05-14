import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeadBar from "../components/HeadBar";
import Sider from "../components/SideBar";
import { TbRecharging } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";
import { MdCalendarMonth, MdOutlineWidthFull } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";
import { MdManageSearch } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { MdCrop } from "react-icons/md";
import { MdAddCard } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { BsInfoSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setUser, fetchWalletBalance } from "../redux/user/userSlice";
import axios from "axios";
import { LuIndianRupee } from "react-icons/lu";
import { FaIdCard } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { walletBalance } = useSelector((state) => state.user);
  console.log(walletBalance === null || undefined ? "0.00" : walletBalance);
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const [loading, setLoading] = useState(true);
  const [commissionData, setCommissionData] = useState(0); // Default commission to 0
  const [todayCommission, setTodayCommission] = useState(0);
  const [notificationData, setNotificationData] = useState("");
  const [monthlyRecharge, setMonthlyRecharge] = useState(0);
  const [monthlyRechargeAmt, setMonthlyRechargeAmt] = useState(0);
  const [TodayRecharge, setTodayRecharge] = useState(0);
  const [TodayRechargeAmt, setTodayRechargeAmt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser?.userId) {
        dispatch(fetchWalletBalance(currentUser.userId));
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const fetchUserNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getUserNotification/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        console.log("Fetched Notifications:", data.data);
        setNotificationData(data.data); // Save notifications in state
      } else {
        setNotificationData([]); // Set empty array if no data found
      }
    } catch (error) {
      console.error("Error fetching user notifications:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        setNotificationData([]); // Handle other errors
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthCommission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getAllMonthCommission/${userId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        const totalCommission = data.data.reduce((total, item) => {
          return total + parseFloat(item.retailer_Commission);
        }, 0);
        setCommissionData(totalCommission); // Convert from cents to the correct format (if needed)
      } else {
        setCommissionData(0); // If no data found, set commission to 0
      }
    } catch (error) {
      console.error("Error fetching commission data:", error);
      if (error?.response?.status === 401) {
        // Alert for expired token
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        setCommissionData(0); // If another error occurs, set commission to 0
      }
    } finally {
      setLoading(false);
    }
  };

  // Format commission to limit decimals to 2
  const formattedCommission = commissionData
    ? parseFloat(commissionData).toFixed(2) // Limit to 2 decimal places
    : "0.00"; // Default to "0.00" if commissionData is 0

  //fetch Todays commission

  const fetchTodaysCommission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getTodaysCommission/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        // Assuming `retailer_Commission` is the field you want to display
        const totalCommission = data.data.reduce((total, item) => {
          return total + parseFloat(item.retailer_Commission);
        }, 0);

        setTodayCommission(totalCommission); // Convert to decimal if needed
      } else {
        setTodayCommission(0); // If no data found, set commission to 0
      }
    } catch (error) {
      console.error("Error fetching commission data:", error);

      if (error?.response?.status === 401) {
        // Alert for expired token
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        setTodayCommission(0); // If another error occurs, set commission to 0
      }
    } finally {
      setLoading(false);
    }
  };

  const TodaysformattedCommission = todayCommission
    ? parseFloat(todayCommission).toFixed(2) // Limit to 2 decimal places
    : "0.00"; // Default to "0.00" if commissionData is 0

  useEffect(() => {
    fetchTodaysCommission();
    fetchMonthCommission();
    fetchUserNotifications();
    fetchMonthRecharge();
    fetchMonthRechargeOffline();
    fetchTodayRecharge();
    fetchTodayRechargeOffline();
  }, [userId]);

  const fetchMonthRecharge = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getAllMonthRecharge/${userId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        setMonthlyRecharge((pre) => pre + data.total);
        const totalAmt = data.data.reduce((total, item) => {
          return total + parseFloat(item.amount);
        }, 0);
        setMonthlyRechargeAmt((pre) => pre + totalAmt); // Convert from cents to the correct format (if needed)
      } else {
        // setMonthlyRechargeAmt(0);
        // setMonthlyRecharge(0)
      }
    } catch (error) {
      console.error("Error fetching commission data:", error);
      if (error?.response?.status === 401) {
        // Alert for expired token
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        // setMonthlyRechargeAmt(0);
        // setMonthlyRecharge(0)
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchMonthRechargeOffline = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getAllMonthRechargeOffline/${userId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        setMonthlyRecharge((pre) => pre + data.total);
        const totalAmt = data.data.reduce((total, item) => {
          return total + parseFloat(item.amount);
        }, 0);
        setMonthlyRechargeAmt((pre) => pre + totalAmt); // Convert from cents to the correct format (if needed)
      } else {
        // setMonthlyRechargeAmt(0);
        // setMonthlyRecharge(0)
      }
    } catch (error) {
      console.error("Error fetching commission data:", error);
      if (error?.response?.status === 401) {
        // Alert for expired token
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        // setMonthlyRechargeAmt(0);
        // setMonthlyRecharge(0)
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayRecharge = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getTodaysRecharge/${userId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        setTodayRecharge((pre) => pre + data.total);
        const totalAmt = data.data.reduce((total, item) => {
          return total + parseFloat(item.amount);
        }, 0);
        setTodayRechargeAmt((pre) => pre + totalAmt); // Convert from cents to the correct format (if needed)
      } else {
        // setMonthlyRechargeAmt(0);
        // setMonthlyRecharge(0)
      }
    } catch (error) {
      console.error("Error fetching commission data:", error);
      if (error?.response?.status === 401) {
        // Alert for expired token
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        // setMonthlyRechargeAmt(0);
        // setMonthlyRecharge(0)
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchTodayRechargeOffline = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://2kadam.co.in/api/auth/retailer/getTodaysRechargeOffline/${userId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        setTodayRecharge((pre) => pre + data.total);
        const totalAmt = data.data.reduce((total, item) => {
          return total + parseFloat(item.amount);
        }, 0);
        setTodayRechargeAmt((pre) => pre + totalAmt); // Convert from cents to the correct format (if needed)
      } else {
        // setMonthlyRechargeAmt(0);
        // setMonthlyRecharge(0)
      }
    } catch (error) {
      console.error("Error fetching commission data:", error);
      if (error?.response?.status === 401) {
        // Alert for expired token
        Swal.fire({
          icon: "error",
          title: "Your token is expired. Please login again.",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        // setMonthlyRechargeAmt(0);
        // setMonthlyRecharge(0)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                    <h6 className="mx-lg-5">
                      <BiHomeAlt /> &nbsp; / &nbsp; Dashboard{" "}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10 mt-4">
                <div className="container-fluid">
                  <div className="row d-flex formdata justify-content-center mb-3">
                    <div className="col-12 boarder bg-white p-2">
                      {/* <div className="news d-flex align-items-center">
                        <span className="p-3 bg-info news-icon">
                          <BsInfoSquare />
                        </span>
                        <p className="d-flex align-items-center mb-0 ms-2">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Odio asperiores, autem optio, obcaecati
                          consequatur deleniti soluta eius sequi assumenda,
                          accusantium maxime! Voluptatibus aut corrupti dolores
                          veniam? Eveniet, nemo quod? Inventore.
                        </p>
                      </div> */}

                      <div className="notifications-container">
                        <p className="text-center text-white" style={{backgroundColor:"cornflowerblue"}}>Notification <BsInfoSquare /></p>
                        {loading ? (
                          // <p>Loading notifications...</p>
                          <div className="news d-flex align-items-center">
                            <span className="p-3 news-icon ">
                             
                            </span>
                            <p className="d-flex align-items-center mb-0 ms-2"></p>
                          </div>
                        ) : notificationData.length > 0 ? (
                          notificationData.map((notification, index) => (
                            <div
                              className="news d-flex align-items-center"
                              key={index}
                              ref={(el) => {
                                if (el) {
                                  const textWidth =
                                    el.querySelector("p").offsetWidth; // Get notification width
                                  const containerWidth = el.offsetWidth; // Get container width
                                  const speed = Math.max(
                                    (textWidth / containerWidth) * 20,
                                    10
                                  ); // Dynamic speed calculation
                                  el.querySelector("p").style.setProperty(
                                    "--dynamic-duration",
                                    `${speed}s`
                                  );
                                }
                              }}
                            >
                              <span className="p-3 ">
                                {/* <BsInfoSquare /> */}
                              </span>
                              <p className="d-flex align-items-center mb-0 ms-2">
                                {notification.Retailer_Notification ||
                                  "No notification available."}
                              </p>
                            </div>
                          ))
                        ) : (
                          // <p>No notifications available</p>
                          <div className="news d-flex align-items-center">
                            <span className="p-3 text-white news-icon">
                              {/* <BsInfoSquare /> */}
                            </span>
                            <p className="d-flex align-items-center mb-0 ms-2"></p>
                          </div>
                        )}
                      </div>


                      
                    </div>
                  </div>
                  <div className="row  d-flex formdata justify-content-center">
                       <div className="col-xxl-8 col-lg-6 col-sm-12   d-flex justify-content-center mb-4 mt-1 p-0">
                      <div className=" card-4 " id="main1">
                        <div className="d-flex">
                         
                       
                          <div className="d-flex flex-column text-white cardtext py-3">
                            <p className="mb-0 px-2 my-0 fs-6 py-1">Wallet Amount</p>
                            {/* <h4 className="px-2 my-0">(Rs. 250/-)</h4>{" "} */}
                            <h4 className="px-2 my-0 fs-2">{`₹ ${
                              walletBalance === null || undefined
                                ? "0.00"
                                : walletBalance
                            }`}</h4>{" "}
                          </div>


                          
                        </div>
                              <div className="d-flex gap-1 smallcard" >
                   
                      
                          <div className="d-flex flex-column cardtext text-white p-1" style={{backgroundColor:"rgba(255, 255, 255, 0.15)" , borderRadius:"12px"}}>
                            <p className="mb-0 px-2 my-0 fs-6">
                              Today Commission
                            </p>
                            <h5 className="px-2 my-1">
                              {TodaysformattedCommission
                                ? `₹ ${TodaysformattedCommission}`
                                : "..."}
                            </h5>{" "}
                          </div>
                        
                        
                          <div className="d-flex flex-column cardtext text-white  " style={{backgroundColor:"rgba(255, 255, 255, 0.15)" , borderRadius:"12px"}}>
                            <p className="mb-0 px-2 my-0 fs-6">
                              Month Commission
                            </p>
                            <h5 className="px-2 my-1">
                              {formattedCommission
                                ? `₹ ${formattedCommission}`
                                : "..."}
                            </h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="col-xxl-4 col-lg-6 col-sm-12    mb-3 mt-1 p-0">
   <div className="col-xxl-12 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0" id="rescard">
                      <div className=" card-2 p-4 " id="card121">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:"#DD7536" , borderRadius:"15px"}}>
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Recharge Today
                            </p>
                            <h5 className="px-2 my-0">
                              {TodayRecharge} - (Rs. {TodayRechargeAmt})
                            </h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-12 col-lg-6 col-sm-12 d-flex justify-content-center mb-3 mt-1 p-0" id="rescard">
                      <div className=" card-3 p-4" id="card121">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:" #06d6a0" , borderRadius:"15px"}}>
                            <MdCalendarMonth/>
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Recharge Month
                            </p>
                            <h5 className="px-2 my-0">
                              {monthlyRecharge} - (Rs. {monthlyRechargeAmt})
                            </h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>

                     </div>

                    <h5 className="mt-3">Recharge Service</h5>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-1 p-3"
                        onClick={() => navigate("/prepaid-recharge")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" id="bgicon">
                            <FaMobileAlt />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Mobile</p>
                            <h5 className="px-2 my-0">Recharge</h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-2 p-3"
                        onClick={() => navigate("/dth-recharge")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon"style={{backgroundColor:"#e74c3c" , borderRadius:"15px"}} >
                            <MdOutlineWidthFull />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">DTH/D2H</p>
                            <h5 className="px-2 my-0">Recharge</h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                      <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0"></div>
                  
                      <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0"></div>
                  
                    {/* <div className="col-lg-4 col-8 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-3"
                        onClick={() => navigate("/dth-recharge")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" id="bgicon">
                            <RiCoupon2Line />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Coupon</p>
                            <h5 className="px-2 my-0">Purchase</h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div> */}
                      <h5 className="mt-3">Quick Service</h5>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-4 p-3"
                        onClick={() => navigate("/raise-complaint")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:"#2ecc71" , borderRadius:"15px"}}>
                            <FaRegMessage />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Complaints</p>
                            <h5 className="px-2 my-0">Raise Query</h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div className="card card-1 p-3">
                        <Link to="https://www.trackpan.utiitsl.com/PANONLINE/forms/TrackPan/trackApp#forward">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:"#29A0B1" , borderRadius:"15px"}}>
                              <MdManageSearch />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">Pan Card</p>
                              <h5 className="px-2 my-0">
                                Track Application
                              </h5>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-2 p-3"
                        onClick={() => navigate("/uti-login")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:"#923aac" , borderRadius:"15px"}}>
                            <IoIosLogIn />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">PSA Login</p>
                            <h5 className="px-2 my-0">UTIITSL</h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-3 p-3"
                        onClick={() => navigate("/aadhar-linking-status")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:"#f56f43" , borderRadius:"15px"}}>
                            <FaIdCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Status</p>
                            <h5 className="px-2 my-0">Aadhar Linking </h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-3 p-3"
                        onClick={() => navigate("/crop-tool")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:"#528269" , borderRadius:"15px"}}>
                            <MdCrop />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Photo & Signature
                            </p>
                            <h5 className="px-2 my-0">Cropping Tool</h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-4 p-3"
                        onClick={() => navigate("/add-money")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:"#6e6ace" , borderRadius:"15px"}}>
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Add Money to</p>
                            <h5 className="px-2 my-0">Wallet</h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div
                        className="card card-1 p-3"
                        onClick={() => navigate("/pan-apply-49")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" style={{backgroundColor:"#2fddf4" , borderRadius:"15px"}}>
                            <AiOutlineForm />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">NSDL PAN</p>
                            <h5 className="px-2 my-0">
                              E-KYC Application
                            </h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div   >
             
                   

                    {/* <div className="col-lg-4 col-8 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0">
                      <div className="card card-1">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon" id="bgicon">
                            <MdAddShoppingCart />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Today's Coupon Bought
                            </p>
                            <h5 className="px-2 my-0">12</h5>{" "}
                          </div>
                        </div>
                      </div>
                    </div> */}
 <div className="col-xxl-3 col-lg-6 col-sm-12   d-flex justify-content-center mb-3 mt-1 p-0"></div>

               
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

export default Dashboard;
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
  }
  .card:hover {
    /* transform: scale(1.1); */
    /* background-image: linear-gradient(
      85.2deg,
      rgba(33, 3, 40, 1) 7.5%,
      rgba(65, 5, 72, 1) 88.7%
    ); */
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
    /* color: #fe662b; */
    color: white;
  }
  #main1{
     width: 100%;
    padding: 10px;
    margin: 0 10px;
    border-radius: 10px;
  
    white-space: nowrap;

    transition: transform 0.3s ease-in-out, border 0.3s ease,
      border-radius 0.3s ease;
        background-color:  #3a7bd5;
    color: white;
    @media screen and (min-width: 768px) and (max-width:1400px) {
      margin: 0px 0px;
    }
 
  }
  #card121{
     width: 100%;
    padding: 10px;
    margin: 4 12px;
    
   
    border-radius: 10px;
    white-space: nowrap;
border: 1px solid transparent;

   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      

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
    /* background: #6e6e6e; */
      background: white;
  }
  .card-3 {
    /* background-image: radial-gradient(
      circle 897px at 9% 80.3%,
      rgba(55, 60, 245, 1) 0%,
      rgba(234, 161, 15, 0.9) 100.2%
    ); */
    /* background: #6e6e6e; */
      background: white;
  }
  .card-4 {
    /* background-image: linear-gradient(
      89.5deg,
      rgba(131, 204, 255, 1) 0.4%,
      rgba(66, 144, 251, 1) 100.3%
    ); */
    /* background: #6e6e6e; */
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
    border: 1px solid transparent;
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
    /* animation: moveLeftToRight 30s linear infinite; */
    animation: moveLeftToRight var(--dynamic-duration, 10s) linear infinite;
    position: absolute;
    right: 0;
  }
  .news-icon {
    z-index: 1;
    font-size: large;
    background-color: #3498db;

  }
  #bgicon{
    background-color: #3498db;
    border-radius: 15px;
  }
  .col-12{
    border: 1px solid transparent;

    border-radius: 15px;

   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .smallcard{
    @media screen and (max-width: 768px) {
       flex-direction: column;
    }
  }
  #rescard{
    @media (min-width: 1024px) and (max-width: 1500px) {
    margin-left: 1rem;

  }
  }
`;
