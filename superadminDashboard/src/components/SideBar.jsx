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
import { Link } from "react-router-dom";
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
  background-color: black;
  box-shadow: 0 0 20px rgba(89, 102, 122, 0.1);
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
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

const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome color="#fe662b" />,
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
    title: "Aadhar Linking Status",
    path: "/aadhar-linking-status",
    // icon: <IoIcons.IoIosPaper color="black" />,
    icon: <IoIcons.IoIosPaper color="#fe662b" />,
    // iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
    // iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

    // subNav: [
    // 	{
    // 		title: "Service 1",
    // 		path: "/services/services1",
    // 		icon: <IoIcons.IoIosPaper />,
    // 		cName: "sub-nav",
    // 	},
    // 	{
    // 		title: "Service 2",
    // 		path: "/services/services2",
    // 		icon: <IoIcons.IoIosPaper />,
    // 		cName: "sub-nav",
    // 	},
    // 	{
    // 		title: "Service 3",
    // 		path: "/services/services3",
    // 		icon: <IoIcons.IoIosPaper />,
    // 	},
    // ],
  },
  {
    title: "Wallet",
    path: "#",
    icon: <FaIcons.FaPhone color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Add Money to Wallet",
        path: "/add-money",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        cName: "sub-nav",
      },
      {
        title: "Add Wallet Summary",
        path: "/add-money-transaction-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        cName: "sub-nav",
      },
      {
        title: "Add Wallet Offline",
        path: "/add-wallet-money-offline",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Wallet Offline Request",
        path: "/wallet-offline-request",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "Offline Services",
    path: "#",
    icon: <MdFilterListOff color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Download Forms",
        path: "/download-offline-forms",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        // cName: "sub-nav",
      },
      {
        title: "Apply Pan Card Offline",
        path: "/submit-pan-card-offline",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        // cName: "sub-nav",
      },
      {
        title: "View All History",
        path: "/view-all-offline-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        // cName: "sub-nav",
      },
    ],
  },
  {
    title: "Training Video",
    path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,

    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    // 	{
    // 		title: "Event 1",
    // 		path: "/events/events1",
    // 		icon: <IoIcons.IoIosPaper />,
    // 	},
    // 	{
    // 		title: "Event 2",
    // 		path: "/events/events2",
    // 		icon: <IoIcons.IoIosPaper />,
    // 	},
    // ],
  },
  {
    title: "Set PIN and 2 Step",
    path: "/2-step-verification",
    icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  },
  {
    title: "Important Links",
    path: "/important-links",
    icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  },
  {
    title: "UTI 2.0",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Apply PAN Card",
        path: "/uti-login",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "UTI Transaction History",
        path: "/uti-transaction-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "UTI New",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "User ID Activate",
        path: "/retailer-id-revamp-activate",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Password Reset",
        path: "/password-reset",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Buy Coupon",
        path: "/buy-uti-coupon",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "UTI Coupon History",
        path: "/uti-coupon-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "PAN Track",
    path: "https://www.trackpan.utiitsl.com/PANONLINE/#forward",
    icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  },
  {
    title: "NSDL PAN Application",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "NSDL New PAN Card",
        path: "/pan-apply-49",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "NSDL Correction PAN",
        path: "/pan-apply-cr",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "NSDL PAN Track Status",
        path: "https://tin.tin.nsdl.com/pantan/StatusTrack.html",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "PAN Status",
        path: "/pan-status",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "PAN Transaction History",
        path: "/pan-transaction-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "PAN Refund",
        path: "/pan-transaction-refund-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "PAN Re Apply",
        path: "/pan-transaction-resume-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "PAN Document",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Upload PAN Document",
        path: "/pan-document-upload",
        icon: <IoIcons.IoIosPaper color="black" />,
      },
      {
        title: "PAN Uploaded Docs",
        path: "/pan-document",
        icon: <IoIcons.IoIosPaper color="black" />,
      },
    ],
  },
  {
    title: "Recharge",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Prepaid Recharge",
        path: "/prepaid-recharge",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Postpaid Recharge",
        path: "/prepaid-recharge",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "DTH Recharge",
        path: "/dth-recharge",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Prepaid Recharge History",
        path: "/prepaid-recharge-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Postpaid Recharge History",
        path: "/postpaid-recharge-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "DTH Recharge History",
        path: "/dth-recharge-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Recharge Refund Request",
        path: "/recharge-refund-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "My Commission",
        path: "/my-commission",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "Complaint",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Complaint",
        path: "/raise-complaint",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "All Complaint List",
        path: "/complaint-raised-list",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "Other Settings",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Download Certificate",
        path: "/download-certificate",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change Password",
        path: "/change-password",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  // {
  //   title: "Logout",
  //   path: "/",
  //   icon: <IoIcons.IoMdHelpCircle color="black" />,
  // },
];

const Sider = () => {
  const [sidebar, setSidebar] = useState(true);
  const [closeButton, setCloseButton] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              <img src={profileLogo} width={50} height={75} className="p-2" />
              <div className="ms-2 p-2 lh-sm">
                <p className="m-0 fw-bold">Mohit Sahu </p>

                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Retailer"
                  menuVariant="dark"
                  className="text-muted"
                >
                  <NavDropdown.Item href="/update-profile">
                    <IoIosPerson size={20} color="#fe662b" />
                    &nbsp;Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/">
                    <FaPowerOff size={20} color="#fe662b" />
                    &nbsp; Log out
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item> */}
                </NavDropdown>
                <p className="m-0 text-muted">Mohit1234</p>
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
                      src={Logo}
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
                    src={Logo}
                    width={180}
                    height={60}
                  ></img>
                )}
              </div>

              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
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
    background-color: black;
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
