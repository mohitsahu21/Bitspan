// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { IoHome } from "react-icons/io5";
// import { ImSwitch } from "react-icons/im";
// import { BsFileEarmarkPerson } from "react-icons/bs";

// const Sider = () => {
//   const location = useLocation();
//   //   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const getSidebarClass = (path) => {
//     return location.pathname === path ? "active-nav" : "";
//   };

//   //   const handleLogout = () => {
//   //     const isConfirmed = window.confirm("Are you sure you want to Logout?");
//   //     if (!isConfirmed) {
//   //       return;
//   //     }
//   //     navigate("/");
//   //     dispatch(clearUser());
//   //   };

//   return (
//     <Wrapper>
//       <div className="px-0" id="sidebar">
//         <div className="d-flex flex-column align-items-start px-0 pt-2">
//           <ul
//             className="nav nav-pills flex-column mb-0 align-items-start px-3"
//             id="menu"
//           >
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <IoHome className="icon" />
//                 </div> */}
//                 <div>
//                   <h3 className=" d-none d-sm-inline icon-text" id="navleft1">
//                     Dashboard
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     Wallet
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     Traning Video
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     ImportantLinks
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     UTI 2.0
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     Pan Track
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     NSDL Pan Application
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     Pan Document
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     Recharge
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     Complaint
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
//                 {/* <div>
//                   <BsFileEarmarkPerson className="text-white" />
//                 </div> */}
//                 <div>
//                   <h3 className="d-none d-sm-inline icon-text" id="navleft1">
//                     Other Setting
//                   </h3>
//                 </div>
//               </Link>
//             </li>
//             <hr />
//             <li>
//               <div className="link-div">
//                 <h3 className="text-light icon-text" id="navleft1">
//                   Logout
//                 </h3>
//               </div>
//             </li>
//             <hr />
//           </ul>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Sider;
// const Wrapper = styled.div`
//   #navleft1 {
//     font-size: 20px;
//     /* margin-left: 0rem; */
//     color: white;
//     /* padding-left: 0.5rem; */
//     white-space: nowrap;
//     margin: 0 0 0;
//     @media (min-width: 768px) and (max-width: 1024px) {
//       font-size: 20px;
//     }
//   }
//   /* #navleft2 {
//     font-size: 12px;
//     margin-left: 0rem;
//     color: white;
//   }
//   #navleft {
//     font-size: 12px;
//     margin-left: -0.2rem;
//     color: white;
//   } */
//   #menu {
//     width: 100%;
//   }
//   #sidebar {
//     width: 100%;
//     height: 82rem;
//     background-color: #3eecac;
//     background-image: linear-gradient(10deg, #3eecac 0%, #ee74e1 200%);

//     @media screen and (max-width: 768px) {
//       width: 64%;
//       height: 212rem;
//     }
//     @media screen and (min-width: 768px) and (max-width: 1024px) {
//       width: 64%;
//       height: 110rem;
//     }
//   }
//   .bi {
//     color: white;
//   }

//   li:hover {
//     color: #8ae6ff;
//   }

//   .link-div {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     align-items: center;
//     transition: transform 0.3s ease, border 0.3s ease, border-radius 0.3s ease;
//     padding: 0.5rem;
//     border: 2px solid transparent;
//     border-radius: 10px;
//   }

//   .link-div:hover {
//     border: 2px solid rgba(255, 255, 255, 0.2);
//     transform: scale(1.05);
//   }

//   a {
//     text-decoration: none;
//   }

//   .active-nav {
//     padding: 1rem;
//   }
//   .icon {
//     color: white;
//     font-size: 2rem;
//     @media screen and (min-width: 768px) and (max-width: 1024px) {
//       font-size: 1rem;
//     }
//   }

//   /* .icon-text {
//     @media screen and (max-width: 1024px) {
//       font-size: 20px;
//     }
//   } */
// `;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import Logo from "./../assets/images/logo.png";
import profileLogo from "./../assets/images/Placeholder_Person.jpg";
import { FaUserAlt } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import { MdFilterListOff } from "react-icons/md";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { FaUserAlt } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { MdDisplaySettings } from "react-icons/md";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { PiBankFill } from "react-icons/pi";
import pancard from "../assets/Form_49A (1).pdf";
import { clearUser } from "../redux/user/userSlice";
import { RiBaseStationLine } from "react-icons/ri";
import axios from "axios";
import { FaWallet } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiFileHistoryFill } from "react-icons/ri";
import { PiHandWithdrawFill } from "react-icons/pi";
import { BsCurrencyExchange } from "react-icons/bs";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa";
import { FaIdCardAlt } from "react-icons/fa";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { PiUserCircleGearBold } from "react-icons/pi";
import { PiUserCircleMinusDuotone } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi";
import { MdPendingActions } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiDocumentReport } from "react-icons/hi";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { AiFillBank } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { FaSlideshare } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { GoLink } from "react-icons/go";
import { IoSettings } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

const Nav = styled.div`
  background-color: #e4e4e1;
  background-image: radial-gradient(
      at top center,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(0, 0, 0, 0.03) 100%
    ),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(143, 152, 157, 0.6) 100%
    );
  background-blend-mode: normal, multiply;
  height: 80px;
  display: flex;
  justify-content: space-between; /* Add this line */
  align-items: center;
  /* box-shadow: 1px 1px 6px black; */
  box-shadow: 0 0 20px rgba(89, 102, 122, 0.1);
  padding: 0 2rem; /* Optional: Add padding to space out content from edges */
  @media print {
    display: none !important;
  }
`;

const NavIcon = styled(Link)`
  /* margin-left: 2rem; */
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  /* background-color: black; */
  background-color: #1e293b;
  box-shadow: 0 0 20px rgba(89, 102, 122, 0.1);
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  /* transition: 350ms; */
  transition: 1s;
  z-index: 10;
  @media print {
    display: none !important;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */

  &::-webkit-scrollbar {
    width: 8px; /* Adjust the width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Background of the scrollbar track */
  }

  &::-webkit-scrollbar-thumb {
    background: #d6d5d5; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #989797; /* Color of the scrollbar thumb on hover */
  }
`;

const RetailerSidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome color="white" size={18} />,
  },
  {
    title: "Wallet",
    path: "#",
    icon: <FaIcons.FaPhone color="white" size={15} />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
    // iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Add Money to Wallet",
        path: "/add-money",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        cName: "sub-nav",
      },
      {
        title: "Add Wallet Summary",
        path: "/add-money-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        cName: "sub-nav",
      },
      {
        title: "Add Wallet Offline",
        path: "/add-wallet-money-offline",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Wallet Offline Request",
        path: "/wallet-offline-request",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Find Services",
    path: "/find-services",
    icon: <FaIcons.FaSearch color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    // subNav: [
    //   {
    //     title: "Aadhar Details",
    //     path: "#",
    //     icon: <IoIcons.IoIosPaper color="#e74c3c" />,
    //   },
    //   {
    //     title: "Pan by Aadhaar No.",
    //     path: "/pan-find-by-aadhar",
    //     icon: <IoIcons.IoIosPaper color="#e74c3c" />,
    //   },
    //   {
    //     title: "Pan Details",
    //     path: "/pan-details",
    //     icon: <IoIcons.IoIosPaper color="#e74c3c" />,
    //   },
    //   {
    //     title: "RC Details",
    //     path: "/rc-find",
    //     icon: <IoIcons.IoIosPaper color="#e74c3c" />,
    //   },
    //   {
    //     title: "Ration Card Details",
    //     path: "#",
    //     icon: <IoIcons.IoIosPaper color="#e74c3c" />,
    //   },
    //   {
    //     title: "Driving Licence Details",
    //     path: "/dl-find",
    //     icon: <IoIcons.IoIosPaper color="#e74c3c" />,
    //   },
    // ],
  },
  {
    title: "Recharge",
    path: "#",
    icon: <FaIcons.FaMobileAlt color="white" size={17} />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Prepaid Recharge",
        path: "/prepaid-recharge",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Postpaid Recharge",
        path: "/postpaid-recharge",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "DTH Recharge",
        path: "/dth-recharge",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Bill",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Electricity",
        path: "/electricity-recharge",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Broadband",
        path: "/broadband-recharge",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Apply DTH Connection",
        path: "/dth-connection",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Recharge History",
    path: "#",
    icon: <MdHistory color="white" size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Prepaid Recharge History",
        path: "/prepaid-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Postpaid Recharge History",
        path: "/postpaid-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "DTH Recharge History",
        path: "/dth-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Bill History",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Apply DTH Connection History",
        path: "/apply-dth-connection-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Eletricity Recharge History",
        path: "/eletricity-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Broadband Recharge History",
        path: "/broadband-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Commission",
    path: "#",
    icon: <FaHandHoldingUsd color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "My Commission",
        path: "/my-commission",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        cName: "sub-nav",
      },
      {
        title: "View All Commission History",
        path: "/View-All-Commission-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Purchase Bank ID",
    path: "#",
    icon: <PiBankFill color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "New Bank ID",
        path: "/bank-id",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Bank ID History",
        path: "/bank-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },
  {
    title: "Other Services",
    path: "#",
    icon: <MdFilterListOff color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Download Forms",
        path: "/download-offline-forms",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Apply Other Services",
        path: "/apply-offline",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Sambal Form",
        path: "/SambalForm",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      // {
      //   title: "View All History",
      //   path: "/view-all-offline-history",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   // cName: "sub-nav",
      // },
      // {
      //   title: "Sambal History",
      //   path: "/Sambal-History",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   // cName: "sub-nav",
      // },
    ],
  },
  {
    title: "e-District",
    path: "#",
    icon: <MdDisplaySettings color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      // {
      //   title: "Income",
      //   path: "http://income.ezeeportal.in/",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      // {
      //   title: "Domicile",
      //   path: "http://domicile.ezeeportal.in/",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      // {
      //   title: "E-district",
      //   path: "https://www.ezeeportal.in/p/edistrict-form.html",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      {
        title: "E-District Form",
        path: "/E-District-Form",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Verify E-District",
        path: "/verify-Edistrict",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      // {
      //   title: "E-District History",
      //   path: "/E-District-history",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      // {
      //   title: "Verify E-District History",
      //   path: "/verify-Edistrict-History",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
    ],
  },
  {
    title: "Digital Signature",
    path: "#",
    icon: <MdDisplaySettings color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Apply DSC",
        path: "/Apply-DSC",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Buy Token DSC",
        path: "/DSC-Token",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "History",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Apply Other Services History",
        path: "/view-all-offline-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Sambal History",
        path: "/Sambal-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "E-District History",
        path: "/E-District-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Verify E-District History",
        path: "/verify-Edistrict-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "DSC History",
        path: "/DSC-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "DSC Token History",
        path: "/DSC-token-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Training Video",
    path: "/training-video",
    icon: <FaIcons.FaVideo color="white" size={16} />,
  },
  // {
  //   title: "Set PIN and 2 Step",
  //   path: "/2-step-verification",
  //   icon: <IoIcons.IoMdHelpCircle color="white" />,
  // },
  {
    title: "Important Links",
    path: "/important-links",
    icon: <GoLink color="white" size={17} />,
  },
  {
    title: "Pan Card Services",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Pan Card Form 4.0",
        path: "/pan-card-4.0",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "UTI PAN Card Login",
        path: "/uti-login-new",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "UTI User ID Activate",
        path: "/retailer-id-revamp-activate",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL New PAN Card",
        path: "/pan-apply-49",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL Correction PAN",
        path: "/pan-apply-cr",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL Incomplete PAN Request",
        path: "/incomplete-request",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL PAN Status",
        path: "/pan-status",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "PAN History",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "PAN 4.0 History",
        path: "/pan-4.0-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL PAN Transaction History",
        path: "/pan-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "UTI 2.4 Transaction History",
        path: "/uti-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },

  {
    title: "PAN Coupon",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "UTI PSA Login",
        path: "/uti-login",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Buy Coupon",
        path: "/buy-coupon",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Buy Coupon History",
        path: "/uti-coupon-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "PAN Document",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Upload PAN Document",
        path: "/pan-document-upload",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "PAN Uploaded Docs",
        path: "/pan-document",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },

  {
    title: "Complaint",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Complaint",
        path: "/raise-complaint",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "All Complaint List",
        path: "/complaint-raised-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Other Settings",
    path: "#",
    icon: <IoSettings color="white" size={17} />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Download Certificate",
        path: "/download-certificate",
        icon: <FaPlay color="#e74c3c" />,
      },
      {
        title: "Change Password",
        path: "/change-password",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Pin",
        path: "/generate-pin",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  // {
  //   title: "Logout",
  //   path: "/",
  //   icon: <IoIcons.IoMdHelpCircle color="black" />,
  // },
];

const SuperDisData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome color="white" />,
  },
  {
    title: "Wallet",
    path: "#",
    icon: <FaWallet color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Wallet To Wallet Money Transfer",
        path: "/wallet-to-wallet-transfer",
        icon: <BsCurrencyExchange color="#e74c3c" />,
      },
      {
        title: " Wallet TO Wallet Transfer History",
        // path: "/fund-transfer-status",
        path: "/Wallet-TO-Wallet-Transfer-History",
        icon: <RiFileHistoryFill color="#e74c3c" />,
      },
      {
        title: "Wallet Withdraw",
        path: "/wallet-withdraw",
        icon: <PiHandWithdrawFill color="#e74c3c" />,
      },
      {
        title: "Wallet Withdraw History",
        path: "/wallet-withdraw-History",
        icon: <RiFileHistoryFill color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Other Services",
    path: "#",
    icon: <MdFilterListOff color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Other Services History",
        path: "/view-all-offline-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Sambal History",
        path: "/Sambal-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "DSC History",
        path: "/dsc-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "DSC Token History",
        path: "/dsc-token-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Provider 2 Recharge",
        path: "/Offline-Recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Provider 2 DTH Connection",
        path: "/Offline-dth-connection",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },

  {
    title: "Commission",
    path: "#",
    icon: <FaHandHoldingUsd color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "My Commission",
        path: "/my-commission",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "View All Commission History",
        path: "/View-All-Commission-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },

  {
    title: "Online Services",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Provider 1 DTH Connection",
        path: "/online-dth-connection-history",
        icon: <FaRegListAlt color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Provider 1 Recharge",
        path: "/online-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },
  {
    title: "e-District",
    path: "#",
    icon: <MdDisplaySettings color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "E-District History",
        path: "/E-District-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Verify E-District History",
        path: "/verify-Edistrict-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },

  {
    title: "Pan Coupan  History",
    path: "/Pan-Coupan-History",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "Training Video",
    path: "/training-video",
    icon: <FaVideo color="white" />,
  },
  {
    title: "Pan Card Services",
    path: "#",
    icon: <FaAddressCard color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "PAN 4.0 History",
        path: "/pan-4.0-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL Pan History",
        path: "/pan-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL PAN Correction History",
        path: "/pan-correction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  // {
  //   title: "Set PIN and 2 Step",
  //   path: "/2-step-verification",
  //   icon: <IoIcons.IoMdHelpCircle color="white" />,
  // },
  {
    title: "Create A Partner",
    path: "#",
    icon: <FaHandsHelping color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Create Distributor",
        path: "/create-distributor",
        icon: <FaRegHandshake color="#e74c3c" />,
      },
      {
        title: "All Distributor List",
        path: "/All-Distributor-List",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Buy User ID Limit",
        path: "/buy-distributor-id",
        icon: <FaIdCardAlt color="#e74c3c" />,
      },
      {
        title: "UserId Bought summary",
        path: "/UserId-Bought-summary",
        icon: <FaUsersBetweenLines color="#e74c3c" />,
      },
    ],
  },
  {
    title: "User List",
    path: "#",
    icon: <BiSolidUserDetail color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Active Users",
        path: "/active-users",
        icon: <PiUserCircleGearBold color="#e74c3c" />,
      },
      {
        title: "Deactive Users",
        path: "/deactive-users",
        icon: <PiUserCircleMinusDuotone color="#e74c3c" />,
      },
      {
        title: "All Users Joined List",
        path: "/users-joining-list",
        icon: <HiUserGroup color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Complaint",
    path: "#",
    icon: <HiDocumentReport color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Complaint",
        path: "/raise-complaint",
        icon: <MdAssignmentAdd color="#e74c3c" />,
      },
      {
        title: "All Complaint List",
        path: "/complaint-raised-list",
        icon: <MdOutlinePlaylistAddCheckCircle color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Other Settings",
    path: "#",
    icon: <MdAdminPanelSettings color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Download Certificate",
        path: "/download-certificate",
        icon: <FaFileDownload color="#e74c3c" />,
      },
      {
        title: "Change Password",
        path: "/change-password",
        icon: <TbPasswordUser color="#e74c3c" />,
      },
      {
        title: "Bank Account Setup",
        path: "/bank-account-setup",
        icon: <AiFillBank color="#e74c3c" />,
      },
      {
        title: "Create Pin",
        path: "/generate-pin",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
];

const SuperAdminData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome color="white" />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    // 	{
    // 		title: "Our Aim",
    // 		path: "/about-us/aim",
    // 		icon: <IoIcons.IoIosPaper />,
    // 	},
    // 	{
    // 		title: "Our Vision",
    // 		path: "/about-us/vision",
    // 		icon: <IoIcons.IoIosPaper />,
    // 	},
    // ],
  },
  {
    title: "Wallet",
    path: "#",
    icon: <FaIcons.FaPhone color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      // {
      //   title: "Add Money to Wallet",
      //   path: "/add-money",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Summary",
      //   path: "/add-money-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Offline",
      //   path: "/add-wallet-money-offline",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      // {
      //   title: "Wallet Offline Request",
      //   path: "/wallet-offline-request",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Wallet Withdraw Requests",
        path: "/wallet-withdraw-requests",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Wallet Withdraw Summary",
        path: "/wallet-withdraw-summary",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Add wallet Money Requests",
        path: "/add-wallet-money-requests",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Add wallet Money Summary",
        path: "/add-wallet-money-summary",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Add wallet Money Direct",
        path: "/add-wallet-money-direct",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Withdraw wallet Money Direct",
        path: "/withdraw-wallet-money-direct",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "All Transaction",
    path: "#",
    // path: "/today-all-transaction",
    icon: <IoIcons.IoIosPaper color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
    subNav: [
      // {

      {
        title: "Today All Transaction",
        path: "/today-all-transaction",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "All Transaction",
        path: "/all-transaction",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Commision",
    path: "#",
    icon: <IoIcons.IoIosPaper color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      // {
      //   title: "Add Money to Wallet",
      //   path: "/add-money",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Summary",
      //   path: "/add-money-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Offline",
      //   path: "/add-wallet-money-offline",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      // {
      //   title: "Wallet Offline Request",
      //   path: "/wallet-offline-request",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      {
        title: "Commision Full Summary",
        path: "/commision-full-summary",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Package",
        path: "/create-package",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "View Packages",
        path: "/view-packages",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      //   {
      //   title: "Wallet Withdraw Requests",
      //   path: "/wallet-withdraw-requests",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
    ],
  },
  {
    title: "Offline Services",
    path: "#",
    icon: <MdFilterListOff color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "View Offline Recharge Request",
        path: "/Offline-Recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View Offline DTH Connection Request",
        path: "/Offline-dth-connection",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },

      {
        title: "View Offline Forms",
        path: "/view-all-offline-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View PAN Offline Forms",
        path: "/Pan-offline-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View Bank Id Forms",
        path: "/Bank-Id-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View E-district Forms",
        path: "/E-district-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      // {
      //   title: "View E-district Forms",
      //   path: "/E-district-history",
      //   icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      //   // cName: "sub-nav",
      // },
      {
        title: "View Verify E-district Forms Requests",
        path: "/verify-E-district-form-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View Sambal Forms",
        path: "/sambal-form-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View DSC",
        path: "/digital-signature-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },
  {
    title: "Online Services",
    path: "#",
    icon: <RiBaseStationLine color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "View Recharge History",
        path: "/online-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View DTH Connection History",
        path: "/online-dth-connection-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "NSDL PAN Transaction History",
        path: "/pan-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL PAN Correction History",
        path: "/pan-correction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "UTI PAN Transaction History",
        path: "/uti-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Web Settings",
    path: "/website-setting",
    icon: <IoIcons.IoMdHelpCircle color="white" />,
  },
  {
    title: "PAN Coupon Requests",
    path: "/pan-coupon-requests",
    icon: <IoIcons.IoIosPaper color="white" />,
  },
  {
    title: "DSC Token Requests",
    path: "/digital-signature-token-history",
    icon: <IoIcons.IoIosPaper color="white" />,
  },
  {
    title: "Create A Partner",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Create White Label Account",
        path: "/create-white-label",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Super Distributor",
        path: "/create-super-distributor",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Distributor",
        path: "/create-distributor",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Retailer",
        path: "/create-retailer",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Superadmin Employee",
        path: "/create-superadmin-employee",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      // {
      //   title: "Buy User ID Limit",
      //   path: "/buy-admin-id",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
    ],
  },
  {
    title: "User List",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Active Users",
        path: "/active-users",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Deactive Users",
        path: "/deactive-users",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Pending KYC Users",
        path: "/pending-kyc-user",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Pending Payment Users",
        path: "/pending-payment-users",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "All Users Joined List",
        path: "/users-joining-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "WhiteLabel Website Users Joined List",
        path: "/whiteLabel-users-joining-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Super Admin Website Users Joined List",
        path: "/superAdmin-users-joining-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Super Admin Employee List",
        path: "/super-admin-employee-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "User Relation",
        path: "/user-relation-data",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Buy User ID Summary",
        path: "/buy-user-id-summary",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Transfer User ID Summary",
        path: "/Transfer-User-Ids-Summery",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Complaint",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      // {
      //   title: "Complaint",
      //   path: "/raise-complaint",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      {
        title: "All Complaint List",
        path: "/complaint-raised-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Other Settings",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      // {
      //   title: "Download Certificate",
      //   path: "/download-certificate",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      {
        title: "Active/Deactive Api",
        path: "/active-deactive-api",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Active/Deactive Operator",
        path: "/active-deactive-operator",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Active/Deactive Services",
        path: "/active-deactive-services",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Digital Signature",
        path: "/digital-signature-plan",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      // {
      //   title: "Set Joining Price",
      //   path: "/change-coupon-price",
      //   icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      // },
      // {
      //   title: "User ID Set Rate",
      //   path: "/user-id-set-rate",
      //   icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      // },
      {
        title: "Set DTH Connection Plans",
        path: "/Set-DTH-Connection-Plans",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      // {
      //   title: "Change NSDL Price",
      //   path: "/change-nsdl-price",
      //   icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      // },
      // {
      //   title: "Change UTI 2.0 Price",
      //   path: "/change-uti-price",
      //   icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      // },
      // {
      //   title: "Change UTI New Price",
      //   path: "/change-uti-new-price",
      //   icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      // },
      {
        title: "Change Password",
        path: "/change-password",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      // {
      //   title: "Bank Account Setup",
      //   path: "/bank-account-setup",
      //   icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      // },
      // {
      //   title: "Wallet Withdraw",
      //   path: "/wallet-withdraw",
      //   icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      // },
      {
        title: "Fund Transfer Status",
        path: "/fund-transfer-status",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Uploaded Documents",
        path: "/uploaded-documents",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Choice User Notification",
        path: "/choice-user-notification",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Contact us users",
        path: "/contact-us-users",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
];

const WhiteLabelData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome color="white" />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    // 	{
    // 		title: "Our Aim",
    // 		path: "/about-us/aim",
    // 		icon: <IoIcons.IoIosPaper />,
    // 	},
    // 	{
    // 		title: "Our Vision",
    // 		path: "/about-us/vision",
    // 		icon: <IoIcons.IoIosPaper />,
    // 	},
    // ],
  },
  {
    title: "Wallet",
    path: "#",
    icon: <FaWallet color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Wallet To Wallet Money Transfer",
        path: "/wallet-to-wallet-transfer",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: " Wallet TO Wallet Transfer History",
        // path: "/fund-transfer-status",
        path: "/Wallet-TO-Wallet-Transfer-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Wallet Withdraw",
        path: "/wallet-withdraw",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Wallet Withdraw History",
        path: "/wallet-withdraw-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Other Services",
    path: "#",
    icon: <MdFilterListOff color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Other Services History",
        path: "/view-all-offline-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Sambal History",
        path: "/Sambal-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "DSC History",
        path: "/dsc-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "DSC Token History",
        path: "/dsc-token-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Provider 2 Recharge",
        path: "/Offline-Recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Provider 2 DTH Connection",
        path: "/Offline-dth-connection",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },
  {
    title: "Training Video",
    path: "/WL-training-video",
    icon: <FaVideo color="white" />,
  },
  // {
  //   title: "Set PIN and 2 Step",
  //   path: "/2-step-verification",
  //   icon: <IoIcons.IoMdHelpCircle color="white" />,
  // },
  {
    title: "Web Settings",
    path: "/website-setting",
    icon: <RiIcons.RiFileSettingsFill color="white" />,
  },
  {
    title: "Commission",
    path: "#",
    icon: <FaHandHoldingUsd color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      // {
      //   title: "View All History",
      //   path: "/view-all-offline-history",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   // cName: "sub-nav",
      // },
      {
        title: "My Commission",
        path: "/my-commission",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "View All Commission History",
        path: "/View-All-Commission-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },

  {
    title: "Online Services",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Provider 1 DTH Connection",
        path: "/online-dth-connection-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Provider 1 Recharge",
        path: "/online-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },

  {
    title: "e-District",
    path: "#",
    icon: <MdDisplaySettings color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "E-District History",
        path: "/E-District-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Verify E-District History",
        path: "/verify-Edistrict-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },

  {
    title: "Pan Coupan  History",
    path: "/Pan-Coupan-History",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "Pan Card Services",
    path: "#",
    icon: <FaAddressCard color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "PAN 4.0 History",
        path: "/pan-4.0-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL New Pan History",
        path: "/pan-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL PAN Correction History",
        path: "/pan-correction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Create A Partner",
    path: "#",
    icon: <FaHandsHelping color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Create White Label Account",
        path: "/create-white-label",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Super Distributor",
        path: "/create-super-distributor",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Distributor",
        path: "/create-distributor",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Retailer",
        path: "/create-retailer",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Created Users",
        path: "/Created-Users",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Buy User ID ",
        path: "/buy-id",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Buy User ID  summary",
        path: "/UserId-Bought-summary",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Transfer IDs",
        path: "/Transfer-IDs",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Transfer IDs Summary",
        path: "/Transfer-IDs-Summary",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "UTI 2.0",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      // {
      //   title: "Wallet Full Summary",
      //   path: "/wallet-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      {
        title: "UTI Transaction History",
        path: "/uti-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "User List",
    path: "#",
    icon: <BiSolidUserDetail color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Active Users",
        path: "/active-users",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Deactive Users",
        path: "/deactive-users",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "All Users Joined List",
        path: "/users-joining-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Website Users Joined List",
        path: "/website-users-joining-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      // {
      //   title: "White Label Joined List",
      //   path: "/white-label-joining-list",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
      {
        title: "Pending KYC Users",
        path: "/pending-kyc-user",
        icon: <MdPendingActions color="#e74c3c" />,
      },
      // {
      //   title: "Buy User ID Summary",
      //   path: "/buy-user-id-summary",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
    ],
  },
  {
    title: "Complaint",
    path: "#",
    icon: <HiDocumentReport color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Complaint",
        path: "/raise-complaint",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "All Complaint List",
        path: "/complaint-raised-list",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Other Settings",
    path: "#",
    icon: <MdAdminPanelSettings color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Download Certificate",
        path: "/download-certificate",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Change Password",
        path: "/change-password",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Bank Account Setup",
        path: "/bank-account-setup",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Create Pin",
        path: "/generate-pin",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Contact Us ",
        path: "/Contact-Us",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
];

const DistributorData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome color="white" />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [

    // ],
  },
  {
    title: "Wallet",
    path: "#",
    icon: <FaIcons.FaPhone color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },

      {
        title: "Wallet To Wallet Money Transfer",
        path: "/wallet-to-wallet-transfer",
        icon: <BsCurrencyExchange color="#e74c3c" />,
      },
      {
        title: " Wallet TO Wallet Transfer History",
        // path: "/fund-transfer-status",
        path: "/Wallet-TO-Wallet-Transfer-History",
        icon: <RiFileHistoryFill color="#e74c3c" />,
      },
      {
        title: "Wallet Withdraw",
        path: "/wallet-withdraw",
        icon: <PiHandWithdrawFill color="#e74c3c" />,
      },
      {
        title: "Wallet Withdraw History",
        path: "/wallet-withdraw-History",
        icon: <RiFileHistoryFill color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Offline Services",
    path: "#",
    icon: <MdFilterListOff color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "View All History",
        path: "/view-all-offline-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "Sambal History",
        path: "/Sambal-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "DSC History",
        path: "/dsc-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "DSC Token History",
        path: "/dsc-token-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View Offline DTH Connection Request",
        path: "/Offline-dth-connection",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View Offline Recharge Request",
        path: "/Offline-Recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },
  {
    title: "Training Video",
    path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
  },

  {
    title: "Commission",
    path: "#",
    icon: <FaHandHoldingUsd color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "My Commission",
        path: "/my-commission",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "View All Commission History",
        path: "/View-All-Commission-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },
  {
    title: "Online Services",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "View DTH Connection History",
        path: "/online-dth-connection-history",
        icon: <FaRegListAlt color="#e74c3c" />,
        // cName: "sub-nav",
      },
      {
        title: "View Recharge History",
        path: "/online-recharge-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
        // cName: "sub-nav",
      },
    ],
  },

  {
    title: "e-District",
    path: "#",
    icon: <MdDisplaySettings color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "E-District History",
        path: "/E-District-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Verify E-District History",
        path: "/verify-Edistrict-History",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },

  {
    title: "Pan Coupan  History",
    path: "/Pan-Coupan-History",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "Set PIN and 2 Step",
    path: "/2-step-verification",
    icon: <IoIcons.IoMdHelpCircle color="white" />,
  },
  {
    title: "Create A Partner",
    path: "#",
    icon: <FaHandsHelping color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Create Retailer",
        path: "/create-retailer",
        icon: <FaRegHandshake color="#e74c3c" />,
      },
      {
        title: "All Retailer List",
        path: "/All-Retailer-List",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "Buy User ID Limit",
        path: "/buy-retailer-id",
        icon: <FaIdCardAlt color="#e74c3c" />,
      },
      {
        title: "UserId Bought summary",
        path: "/UserId-Bought-summary",
        icon: <FaUsersBetweenLines color="#e74c3c" />,
      },
    ],
  },

  {
    title: "User List",
    path: "#",
    icon: <BiSolidUserDetail color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Active Users",
        path: "/active-users",
        icon: <PiUserCircleGearBold color="#e74c3c" />,
      },
      {
        title: "Deactive Users",
        path: "/deactive-users",
        icon: <PiUserCircleMinusDuotone color="#e74c3c" />,
      },
      {
        title: "All Users Joined List",
        path: "/users-joining-list",
        icon: <HiUserGroup color="#e74c3c" />,
      },
    ],
  },

  {
    title: "Pan Card Services",
    path: "#",
    icon: <FaAddressCard color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "PAN 4.0 History",
        path: "/pan-4.0-history",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL Pan History",
        path: "/pan-transaction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
      {
        title: "NSDL PAN Correction History",
        path: "/pan-correction-report",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },

  {
    title: "Complaint",
    path: "#",
    icon: <HiDocumentReport color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Complaint",
        path: "/raise-complaint",
        icon: <MdAssignmentAdd color="#e74c3c" />,
      },
      {
        title: "All Complaint List",
        path: "/complaint-raised-list",
        icon: <MdOutlinePlaylistAddCheckCircle color="#e74c3c" />,
      },
    ],
  },
  {
    title: "Other Settings",
    path: "#",
    icon: <MdAdminPanelSettings color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      {
        title: "Download Certificate",
        path: "/download-certificate",
        icon: <FaFileDownload color="#e74c3c" />,
      },
      {
        title: "Change Password",
        path: "/change-password",
        icon: <TbPasswordUser color="#e74c3c" />,
      },
      {
        title: "Bank Account Setup",
        path: "/bank-account-setup",
        icon: <AiFillBank color="#e74c3c" />,
      },
      {
        title: "Create Pin",
        path: "/generate-pin",
        icon: <IoIcons.IoIosPaper color="#e74c3c" />,
      },
    ],
  },
];

const SuperAdminEmployeeData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome color="white" />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "View Offline Recharge Request",
    path: "/Offline-Recharge-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "View Offline DTH Connection Request",
    path: "/Offline-dth-connection",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },

  {
    title: "View Offline Forms",
    path: "/view-all-offline-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "View Digital Signature",
    path: "/dsc-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "View DSC Token",
    path: "/dsc-token-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "View PAN Offline Forms",
    path: "/Pan-offline-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "Online PAN Services",
    path: "#",
    icon: <RiBaseStationLine color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,

    subNav: [
      // {
      //   title: "View Recharge History",
      //   path: "/online-recharge-history",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   // cName: "sub-nav",
      // },
      // {
      //   title: "View DTH Connection History",
      //   path: "/online-dth-connection-history",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      //   // cName: "sub-nav",
      // },
      {
        title: "NSDL PAN Transaction History",
        path: "/pan-transaction-report",
        icon: <IoIcons.IoIosPaper color="white" />,
      },
      {
        title: "NSDL PAN Correction History",
        path: "/pan-correction-report",
        icon: <IoIcons.IoIosPaper color="white" />,
      },
      // {
      //   title: "UTI PAN Transaction History",
      //   path: "/uti-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="white" />,
      // },
    ],
  },
  {
    title: "View Bank Id Forms",
    path: "/Bank-Id-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "View E-district Forms",
    path: "/E-district-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "View Verify E-district Forms Requests",
    path: "/verify-E-district-form-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "View Sambal Forms",
    path: "/sambal-form-history",
    icon: <IoIcons.IoIosPaper color="white" />,
    // cName: "sub-nav",
  },
  {
    title: "PAN Coupon Requests",
    path: "/pan-coupon-requests",
    icon: <IoIcons.IoIosPaper color="white" />,
  },
  {
    title: "Change Password",
    path: "/change-password",
    icon: <IoIcons.IoIosPaper color="white" />,
  },
  {
    title: "All Complaint List",
    path: "/complaint-raised-list",
    icon: <IoIcons.IoIosPaper color="white" />,
  },
];

const Sider = () => {
  const [sidebar, setSidebar] = useState(true);
  const [closeButton, setCloseButton] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const user = currentUser?.role;
  const navigate = useNavigate();
  const handleDropdownClick = (path) => {
    setActiveDropdown((prev) => (prev === path ? null : path));

    
  };
const closeSidebar = () => setSidebar(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.user.currentUser?.userId);

  const fetchData = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/superAdmin/getSuperAdminSettings"
      );
      setData(data.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    // Call the API to get the profile image
    fetchData();
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `https://2kadam.co.in/api/auth/superDistributor/getProfileImage/${userId}`
        );
        if (response.data.success) {
          setProfileImage(response.data.data.profileImage); // Update the state with the profile image URL
        } else {
          setError(response.data.message); // Set error if userId is not found
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setError("An error occurred while fetching the profile image.");
      }
    };

    if (userId) {
      fetchProfileImage(); // Fetch the profile image if userId is available
    }
  }, [userId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebar(true);
        setCloseButton(false);
      } else {
        setSidebar(false);
        setCloseButton(true);
      }
    };

    // Run once on mount
    
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        dispatch(clearUser());
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // comment by mohit
  return (
    <>
      <Wrapper>
        <IconContext.Provider value={{ color: "#fff" }}>
          <Nav>
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} color="black" />
            </NavIcon>
            <div className="d-flex">
              {/* <img src={profileLogo} width={50} height={75} className="p-2" /> */}
              <img
                src={profileImage ? profileImage : profileLogo}
                width={50}
                height={75}
                className="p-2"
                alt="Profile"
              />
              <div className="ms-2 p-2 lh-sm">
                <p className="m-0 fw-bold">{currentUser?.username} </p>
                <p className="m-0 fw-bold">{currentUser?.userId} </p>

                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={user}
                  menuVariant="dark"
                  className="text-muted"
                >
                  <NavDropdown.Item as={Link} to="/update-profile">
                    <IoIosPerson size={20} color="white" />
                    &nbsp;Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaPowerOff size={20} color="white" />
                    &nbsp; Log out
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item> */}
                </NavDropdown>
                <p className="m-0 text-muted">{currentUser?.userName}</p>
              </div>
            </div>
          </Nav>

          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <div className="sticky-top">
                {closeButton ? (
                  <div className="d-flex">
                    <img
                      className="img-fluid p-3 logo"
                      // src={Logo}
                      src={data?.Logo}
                      width={180}
                      height={60}
                    ></img>
                    <NavIcon to="#">
                      <AiIcons.AiOutlineClose
                        onClick={showSidebar}
                        // color="black"
                      />
                    </NavIcon>
                  </div>
                ) : (
                  <img
                    className="img-fluid p-3 logo"
                    // src={Logo}
                    src={data?.Logo}
                    width={180}
                    height={60}
                  ></img>
                )}
              </div>
              {user ? (
                <>
                  {user == "Retailer" &&
                    RetailerSidebarData.map((item, index) => {
                      return (
                        <SubMenu
                          item={item}
                          key={index}
                          activeDropdown={activeDropdown}
                          handleDropdownClick={handleDropdownClick}
                                      closeSidebar={closeSidebar}
                        />
                      );
                    })}
                  {user == "SuperDistributor" &&
                    SuperDisData.map((item, index) => {
                      return (
                        <SubMenu
                          item={item}
                          key={index}
                          activeDropdown={activeDropdown}
                          handleDropdownClick={handleDropdownClick}
                           closeSidebar={closeSidebar}
                        />
                      );
                    })}
                  {user == "Distributor" &&
                    DistributorData.map((item, index) => {
                      return (
                        <SubMenu
                          item={item}
                          key={index}
                          activeDropdown={activeDropdown}
                          handleDropdownClick={handleDropdownClick}
                           closeSidebar={closeSidebar}

                        />
                      );
                    })}
                  {user == "WhiteLabel" &&
                    WhiteLabelData.map((item, index) => {
                      return (
                        <SubMenu
                          item={item}
                          key={index}
                          activeDropdown={activeDropdown}
                          handleDropdownClick={handleDropdownClick}
                           closeSidebar={closeSidebar}

                        />
                      );
                    })}
                  {user == "SuperAdmin" &&
                    SuperAdminData.map((item, index) => {
                      return (
                        <SubMenu
                          item={item}
                          key={index}
                          activeDropdown={activeDropdown}
                          handleDropdownClick={handleDropdownClick}
                           closeSidebar={closeSidebar}

                        />
                      );
                    })}

                  {user == "SuperAdmin_Employee" &&
                    SuperAdminEmployeeData.map((item, index) => {
                      return (
                        <SubMenu
                          item={item}
                          key={index}
                          activeDropdown={activeDropdown}
                          handleDropdownClick={handleDropdownClick}
                           closeSidebar={closeSidebar}

                        />
                      );
                    })}
                </>
              ) : (
                <>
                  <p>Loading...</p>
                </>
              )}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      </Wrapper>
    </>
  );
};

export default Sider;

const Wrapper = styled.div`
  .sticky-top {
    /* background-color: black; */
    background-color: #1e293b;
  }
  .logo {
  }
  #userid {
    margin-left: -5rem;
    list-style-type: none;
    margin-top: 1rem;
    margin-right: 50px;
    @media screen and (max-width: 1000px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
  .dropdown-menu {
    margin-left: -8rem;
    @media screen and (max-width: 1000px) {
      margin-left: 0rem;
    }
  }
`;
