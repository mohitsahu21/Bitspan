import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeadBar from "../components/HeadBar";
import Sider from "../components/SideBar";
import { TbRecharging } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineWidthFull } from "react-icons/md";
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
import { LuUserPlus } from "react-icons/lu";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BsInfoSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setUser, fetchWalletBalance } from "../redux/user/userSlice";
import axios from "axios";
import { clearUser } from "../redux/user/userSlice";
import Swal from "sweetalert2";

const SuperDistributerDashboard = () => {
  const navigate = useNavigate();
  // Define the custom tooltip styled component
  const CustomTooltip = styled(Tooltip)`
    .tooltip-inner {
      background-color: #fdded1; /* Change the background color */
      color: #fb510d; /* Change the text color */
      width: 150px;
      /* border: 1px solid black; */
    }
    .tooltip-arrow::before {
      border-top-color: white; /* Change the arrow color */
    }
  `;

  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);
  const { walletBalance } = useSelector((state) => state.user);
  console.log(walletBalance);
  const [users, setUsers] = useState([]); // State to hold users data
  const userId = useSelector((state) => state.user.currentUser?.userId);
  const [loading, setLoading] = useState(true);
  const [commissionData, setCommissionData] = useState(0); // Default commission to 0
  const [todayCommission, setTodayCommission] = useState(0);
  const [notificationData, setNotificationData] = useState("");

  const User = ({ id, children, title }) => (
    <OverlayTrigger
      overlay={
        <CustomTooltip id={id}>
          {" "}
          {`Total Distributor - ${TotalUsers.Distributor}`} <br />{" "}
          {`Total Retailer - ${TotalUsers.Retailer}`}
        </CustomTooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );

  const TotalUsers = {
    // WhiteLabel : 0,
    // SuperDistributor : 0,
    Distributor: 0,
    Retailer: 0,
  };

  if (users.length > 0) {
    users.map((item) => {
      // if(item.role === "WhiteLabel"){
      //   TotalUsers.WhiteLabel += 1
      // }
      TotalUsers[item?.role] += 1;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser?.userId) {
        dispatch(fetchWalletBalance(currentUser.userId));
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  //fetch All user
  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getAllUsers",
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getSuperDistributorUsersData/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(data.data);
      console.log(data);
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
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  //fetch Notification
  const fetchUserNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getUserNotification/${userId}`,
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

  useEffect(() => {
    fetchUserNotifications();
  }, []);

  // fetch All commission
  const fetchMonthCommission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getAllMonthCommission/${userId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        const totalCommission = data.data.reduce((total, item) => {
          return total + parseFloat(item.super_Distributor_Commission);
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

  useEffect(() => {
    fetchMonthCommission();
  }, []);

  // Format commission to limit decimals to 2
  const formattedCommission = commissionData
    ? parseFloat(commissionData).toFixed(2) // Limit to 2 decimal places
    : "0.00"; // Default to "0.00" if commissionData is 0

  //fetch Todays commission

  const fetchTodaysCommission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superDistributor/getTodaysCommission/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.data.length > 0) {
        // Assuming `super_Distributor_Commission` is the field you want to display
        const totalCommission = data.data.reduce((total, item) => {
          return total + parseFloat(item.super_Distributor_Commission);
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

  useEffect(() => {
    fetchTodaysCommission(); // Fetch the commission when the component mounts
  }, [userId]);

  const TodaysformattedCommission = todayCommission
    ? parseFloat(todayCommission).toFixed(2) // Limit to 2 decimal places
    : "0.00"; // Default to "0.00" if commissionData is 0

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
                      <div className="notifications-container">
                        {loading ? (
                          <p>Loading notifications...</p>
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
                              <span className="p-3 bg-info news-icon">
                                <BsInfoSquare />
                              </span>
                              <p className="d-flex align-items-center mb-0 ms-2">
                                {notification.Super_Distributor_Notification ||
                                  "No notification available for Super Distributor."}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No notifications available</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row  d-flex formdata justify-content-center">
                    {/* <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div
                        className="card card-3"
                        onClick={() => navigate("/crop-tool")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdCrop />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Photo & Signature
                            </p>
                            <h4 className="px-2 my-0">Cropping Tool</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-4">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Wallet Amount</p>
                            <h4 className="px-2 my-0">{`₹${walletBalance}`}</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <User id="t-1">
                      <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                        <div className="card card-4">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <LuUserPlus />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">Total Users</p>
                              <h4 className="px-2 my-0">{users.length}</h4>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </User>
                    {/* <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-1">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddShoppingCart />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Today's Coupon Bought
                            </p>
                            <h4 className="px-2 my-0">12</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-2">
                        <Link
                          to="/View-All-Commission-History"
                          className="text-decoration-none"
                        >
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Today Commission
                              </p>
                              <h4 className="px-2 my-0">
                                {" "}
                                {loading
                                  ? "Loading..."
                                  : `₹${TodaysformattedCommission}`}
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <Link
                          to="/View-All-Commission-History"
                          className="text-decoration-none"
                        >
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdAddCard />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">
                                Month Commission
                              </p>
                              <h4 className="px-2 my-0">
                                {" "}
                                {loading
                                  ? "Loading..."
                                  : `₹${formattedCommission}`}
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
      </Wrapper>
    </>
  );
};

export default SuperDistributerDashboard;
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
    background-image: linear-gradient(
      85.2deg,
      rgba(33, 3, 40, 1) 7.5%,
      rgba(65, 5, 72, 1) 88.7%
    );
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px) scale(1.1);
    .icon {
      transform: scale(1.2);
    }
  }
  .cardtext {
    color: white;
  }
  .icon {
    color: #fe662b;
  }

  .card-1 {
    /* background-image: linear-gradient(
      91.3deg,
      rgba(240, 73, 207, 1) 15.7%,
      rgba(186, 90, 238, 1) 74.1%
    ); */
    background: #6e6e6e;
  }

  .card-2 {
    /* background-image: radial-gradient(
      circle farthest-corner at 10% 20%,
      rgba(87, 195, 155, 1) 0%,
      rgba(155, 218, 71, 0.66) 76.9%
    ); */
    background: #6e6e6e;
  }
  .card-3 {
    /* background-image: radial-gradient(
      circle 897px at 9% 80.3%,
      rgba(55, 60, 245, 1) 0%,
      rgba(234, 161, 15, 0.9) 100.2%
    ); */
    background: #6e6e6e;
  }
  .card-4 {
    /* background-image: linear-gradient(
      89.5deg,
      rgba(131, 204, 255, 1) 0.4%,
      rgba(66, 144, 251, 1) 100.3%
    ); */
    background: #6e6e6e;
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
    // animation: moveLeftToRight 30s linear infinite;
    animation: moveLeftToRight var(--dynamic-duration, 10s) linear infinite;
    position: absolute;
    right: 0;
  }
  .news-icon {
    z-index: 100;
    font-size: large;
  }
`;
