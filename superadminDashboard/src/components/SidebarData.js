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
  /* transition: 350ms; */
  transition: 1s;
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

const RetailerSidebarData = [
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
    title: "Purchase Bank ID",
    path: "#",
    icon: <PiBankFill color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "New Bank ID",
        path: "/bank-id",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        // cName: "sub-nav",
      },
      {
        title: "Bank ID History",
        path: "#",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        // cName: "sub-nav",
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
        title: "Apply Offline",
        path: "/apply-offline",
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
    title: "e-District",
    path: "#",
    icon: <MdDisplaySettings color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Income",
        path: "http://income.ezeeportal.in/",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Domicile",
        path: "http://domicile.ezeeportal.in/",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "E-district",
        path: "https://www.ezeeportal.in/p/edistrict-form.html",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
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
  // {
  //   title: "UTI 2.0",
  //   // path: "/training-video",
  //   icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
  //   iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
  //   iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

  //   subNav: [
  //     {
  //       title: "Apply PAN Card",
  //       path: "/uti-login",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //     {
  //       title: "UTI Transaction History",
  //       path: "/uti-transaction-report",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //   ],
  // },
  {
    title: "Pan Card Services",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Pan Card Form 4.0",
        path: "/pan-card-4.0",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "UTI 2.4 PAN Card",
        path: "/uti-login",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "UTI PAN Card Login",
        path: "/uti-login-new",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "UTI 2.4 Transaction History",
        path: "/uti-transaction-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "UTI 2.4 PAN Track",
        path: "https://www.trackpan.utiitsl.com/PANONLINE/#forward",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
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
        title: "NSDL Incomplete PAN Request",
        path: "/incomplete-request",
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
        icon: <IoIcons.IoIosPaper color="#fe672b75" />,
      },
      {
        title: "PAN 4.0 History",
        path: "/pan-4.0-history",
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
  // {
  //   title: "PAN Track",
  //   path: "https://www.trackpan.utiitsl.com/PANONLINE/#forward",
  //   icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  // },
  // {
  //   title: "NSDL PAN Application",
  //   // path: "/training-video",
  //   icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
  //   iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
  //   iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

  //   subNav: [
  //     {
  //       title: "NSDL New PAN Card",
  //       path: "/pan-apply-49",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //     {
  //       title: "NSDL Correction PAN",
  //       path: "/pan-apply-cr",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //     {
  //       title: "NSDL PAN Track Status",
  //       path: "https://tin.tin.nsdl.com/pantan/StatusTrack.html",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //     {
  //       title: "PAN Status",
  //       path: "/pan-status",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //     {
  //       title: "PAN Transaction History",
  //       path: "/pan-transaction-report",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //     {
  //       title: "PAN Refund",
  //       path: "/pan-transaction-refund-report",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //     {
  //       title: "PAN Re Apply",
  //       path: "/pan-transaction-resume-report",
  //       icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //     },
  //   ],
  // },
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
        path: "/postpaid-recharge",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "DTH Recharge",
        path: "/dth-recharge",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Electricity Recharge",
        path: "/electricity-recharge",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Broadband Recharge",
        path: "/broadband-recharge",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Apply DTH Connection",
        path: "/dth-connection",
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
        title: "Eletricity Recharge History",
        path: "/eletricity-recharge-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Broadband Recharge History",
        path: "/broadband-recharge-history",
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

const SuperDisData = [
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
      // {
      //   title: "Add Money to Wallet",
      //   path: "/add-money",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Summary",
      //   path: "/add-money-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Offline",
      //   path: "/add-wallet-money-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      // {
      //   title: "Wallet Offline Request",
      //   path: "/wallet-offline-request",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
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
      // {
      //   title: "Download Forms",
      //   path: "/download-offline-forms",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   // cName: "sub-nav",
      // },
      // {
      //   title: "Apply Pan Card Offline",
      //   path: "/submit-pan-card-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   // cName: "sub-nav",
      // },
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
    title: "Create A Parter",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Create Distributor",
        path: "/create-distributor",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "UTI 2.0",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
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
        title: "Buy Coupon",
        path: "/buy-uti-coupon",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Distribute UTI Coupon",
        path: "/distribute-uti-coupon",
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
    title: "PAN Transaction History",
    path: "pan-transaction-report",
    icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  },
  {
    title: "User List",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Active Users",
        path: "/active-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Deactive Users",
        path: "/deactive-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "All Users Joined List",
        path: "/users-joining-list",
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
      {
        title: "Bank Account Setup",
        path: "/bank-account-setup",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Wallet Withdraw",
        path: "/wallet-withdraw",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Fund Transfer Status",
        path: "/fund-transfer-status",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
];

const SuperAdminData = [
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
  // {
  //   title: "Aadhar Linking Status",
  //   path: "/aadhar-linking-status",
  //   // icon: <IoIcons.IoIosPaper color="black" />,
  //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
  //   // iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
  //   // iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

  //   // subNav: [
  //   // 	{
  //   // 		title: "Service 1",
  //   // 		path: "/services/services1",
  //   // 		icon: <IoIcons.IoIosPaper />,
  //   // 		cName: "sub-nav",
  //   // 	},
  //   // 	{
  //   // 		title: "Service 2",
  //   // 		path: "/services/services2",
  //   // 		icon: <IoIcons.IoIosPaper />,
  //   // 		cName: "sub-nav",
  //   // 	},
  //   // 	{
  //   // 		title: "Service 3",
  //   // 		path: "/services/services3",
  //   // 		icon: <IoIcons.IoIosPaper />,
  //   // 	},
  //   // ],
  // },
  {
    title: "Wallet",
    path: "#",
    icon: <FaIcons.FaPhone color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      // {
      //   title: "Add Money to Wallet",
      //   path: "/add-money",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Summary",
      //   path: "/add-money-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Offline",
      //   path: "/add-wallet-money-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      // {
      //   title: "Wallet Offline Request",
      //   path: "/wallet-offline-request",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Wallet Withdraw Requests",
        path: "/wallet-withdraw-requests",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Wallet Withdraw Summary",
        path: "/wallet-withdraw-summary",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "All Transaction",
    path: "#",
    // path: "/today-all-transaction",
    icon: <IoIcons.IoIosPaper color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,
    subNav: [
      // {

      {
        title: "Today All Transaction",
        path: "/today-all-transaction",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "All Transaction",
        path: "/all-transaction",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "Commision",
    path: "#",
    icon: <IoIcons.IoIosPaper color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      // {
      //   title: "Add Money to Wallet",
      //   path: "/add-money",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Summary",
      //   path: "/add-money-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Offline",
      //   path: "/add-wallet-money-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      // {
      //   title: "Wallet Offline Request",
      //   path: "/wallet-offline-request",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      {
        title: "Commision Full Summary",
        path: "/commision-full-summary",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Create Package",
        path: "/create-package",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "View Packages",
        path: "/view-packages",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      //   {
      //   title: "Wallet Withdraw Requests",
      //   path: "/wallet-withdraw-requests",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
    ],
  },
  {
    title: "Offline Services",
    path: "#",
    icon: <MdFilterListOff color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      // {
      //   title: "Download Forms",
      //   path: "/download-offline-forms",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   // cName: "sub-nav",
      // },
      // {
      //   title: "Apply Pan Card Offline",
      //   path: "/submit-pan-card-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   // cName: "sub-nav",
      // },
      {
        title: "View All History",
        path: "/view-all-offline-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        // cName: "sub-nav",
      },
    ],
  },
  // {
  //   title: "Training Video",
  //   path: "/training-video",
  //   icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,

  //   // iconClosed: <RiIcons.RiArrowDownSFill />,
  //   // iconOpened: <RiIcons.RiArrowUpSFill />,

  //   // subNav: [
  //   // 	{
  //   // 		title: "Event 1",
  //   // 		path: "/events/events1",
  //   // 		icon: <IoIcons.IoIosPaper />,
  //   // 	},
  //   // 	{
  //   // 		title: "Event 2",
  //   // 		path: "/events/events2",
  //   // 		icon: <IoIcons.IoIosPaper />,
  //   // 	},
  //   // ],
  // },
  {
    title: "Set PIN and 2 Step",
    path: "/2-step-verification",
    icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  },
  {
    title: "Web Settings",
    path: "/website-setting",
    icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  },
  {
    title: "Create A Partner",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Create White Label Account",
        path: "/create-white-label",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Create Super Distributor",
        path: "/create-super-distributor",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Create Distributor",
        path: "/create-distributor",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Create Retailer",
        path: "/create-retailer",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Create Super Admin Employee",
        path: "/create-superadmin-employee",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      // {
      //   title: "Buy User ID Limit",
      //   path: "/buy-admin-id",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
    ],
  },
  {
    title: "UTI 2.0",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
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
        title: "Buy Coupon",
        path: "/buy-uti-coupon",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Distribute UTI Coupon",
        path: "/distribute-uti-coupon",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "UTI Coupon History",
        path: "/uti-coupon-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  // {
  //   title: "PAN Transaction History",
  //   path: "pan-transaction-report",
  //   icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  // },
  {
    title: "User List",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Active Users",
        path: "/active-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Deactive Users",
        path: "/deactive-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Pending Payment Users",
        path: "/pending-payment-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "All Users Joined List",
        path: "/users-joining-list",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "White Label Joined List",
        path: "/white-label-joining-list",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Buy User ID Summary",
        path: "/buy-user-id-summary",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "PAN Transaction History",
        path: "/pan-transaction-report",
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
      // {
      //   title: "Complaint",
      //   path: "/raise-complaint",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
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
      // {
      //   title: "Download Certificate",
      //   path: "/download-certificate",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      {
        title: "Active/Deactive Api",
        path: "/active-deactive-api",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Set Joining Price",
        path: "/change-coupon-price",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "White Label ID Set Rate",
        path: "/whitelabel-id-set-rate",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change NSDL Price",
        path: "/change-nsdl-price",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change UTI 2.0 Price",
        path: "/change-uti-price",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change UTI New Price",
        path: "/change-uti-new-price",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change Password",
        path: "/change-password",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      // {
      //   title: "Bank Account Setup",
      //   path: "/bank-account-setup",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      // {
      //   title: "Wallet Withdraw",
      //   path: "/wallet-withdraw",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      {
        title: "Fund Transfer Status",
        path: "/fund-transfer-status",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Choice User Notification",
        path: "/choice-user-notification",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
];
const WhiteLabelData = [
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
      // {
      //   title: "Add Money to Wallet",
      //   path: "/add-money",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Summary",
      //   path: "/add-money-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Offline",
      //   path: "/add-wallet-money-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      // {
      //   title: "Wallet Offline Request",
      //   path: "/wallet-offline-request",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
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
      // {
      //   title: "Download Forms",
      //   path: "/download-offline-forms",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   // cName: "sub-nav",
      // },
      // {
      //   title: "Apply Pan Card Offline",
      //   path: "/submit-pan-card-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   // cName: "sub-nav",
      // },
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
    title: "Web Settings",
    path: "/website-setting",
    icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  },
  {
    title: "Create A Parter",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Create White Label Account",
        path: "/create-white-label",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Create Super Distributor",
        path: "/create-super-distributor",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Create Distributor",
        path: "/create-distributor",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Create Retailer",
        path: "/create-retailer",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Buy User ID Limit",
        path: "/buy-admin-id",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "UTI 2.0",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
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
        title: "Buy Coupon",
        path: "/buy-uti-coupon",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Distribute UTI Coupon",
        path: "/distribute-uti-coupon",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "UTI Coupon History",
        path: "/uti-coupon-history",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  // {
  //   title: "PAN Transaction History",
  //   path: "pan-transaction-report",
  //   icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  // },
  {
    title: "User List",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Active Users",
        path: "/active-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Deactive Users",
        path: "/deactive-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Pending Payment Users",
        path: "/pending-payment-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "All Users Joined List",
        path: "/users-joining-list",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "White Label Joined List",
        path: "/white-label-joining-list",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Buy User ID Summary",
        path: "/buy-user-id-summary",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "PAN Transaction History",
        path: "/pan-transaction-report",
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
        title: "ID Set Rate",
        path: "/change-coupon-price",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change NSDL Price",
        path: "/change-nsdl-price",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change UTI 2.0 Price",
        path: "/change-uti-price",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change UTI New Price",
        path: "/change-uti-new-price",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Change Password",
        path: "/change-password",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Bank Account Setup",
        path: "/bank-account-setup",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Wallet Withdraw",
        path: "/wallet-withdraw",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Fund Transfer Status",
        path: "/fund-transfer-status",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
];

const DistributorData = [
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
      // {
      //   title: "Add Money to Wallet",
      //   path: "/add-money",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Summary",
      //   path: "/add-money-transaction-report",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Add Wallet Offline",
      //   path: "/add-wallet-money-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
      // {
      //   title: "Wallet Offline Request",
      //   path: "/wallet-offline-request",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      // },
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
      // {
      //   title: "Download Forms",
      //   path: "/download-offline-forms",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   // cName: "sub-nav",
      // },
      // {
      //   title: "Apply Pan Card Offline",
      //   path: "/submit-pan-card-offline",
      //   icon: <IoIcons.IoIosPaper color="#fe662b" />,
      //   // cName: "sub-nav",
      // },
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
    title: "Create A Partner",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Create Distributor",
        path: "/create-retailer",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
  {
    title: "UTI 2.0",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Wallet Full Summary",
        path: "/wallet-transaction-report",
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
        title: "Buy Coupon",
        path: "/buy-uti-coupon",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Distribute UTI Coupon",
        path: "/distribute-uti-coupon",
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
    title: "PAN Transaction History",
    path: "pan-transaction-report",
    icon: <IoIcons.IoMdHelpCircle color="#fe662b" />,
  },
  {
    title: "User List",
    // path: "/training-video",
    icon: <FaIcons.FaEnvelopeOpenText color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Active Users",
        path: "/active-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Deactive Users",
        path: "/deactive-users",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "All Users Joined List",
        path: "/users-joining-list",
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
      {
        title: "Bank Account Setup",
        path: "/bank-account-setup",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Wallet Withdraw",
        path: "/wallet-withdraw",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Fund Transfer Status",
        path: "/fund-transfer-status",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
];

const SuperAdminEmployeeData = [
  {
    title: "Dashboard",
    path: "/employee-dashboard",
    icon: <AiIcons.AiFillHome color="#fe662b" />,
  },
  {
    title: "Offline Services",
    path: "#",
    icon: <FaIcons.FaCog color="#fe662b" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="#fe662b" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="#fe662b" />,

    subNav: [
      {
        title: "Google Play",
        path: "/google-play",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        cName: "sub-nav",
      },
      {
        title: "IRCTC Agent ID",
        path: "/irctc-agent-id",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
        cName: "sub-nav",
      },
      {
        title: "Birth Certificate",
        path: "/birth-certificate",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Death Certificate",
        path: "/death-certificate",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "E-stamp",
        path: "/e-stamp",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "ITR Registration",
        path: "/ITR-registration",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "GST Registration",
        path: "/GST-registration",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Sambal Card",
        path: "/sambal-card",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Income Certificate",
        path: "/income-certificate",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Domicile Certificate",
        path: "/domicile-certificate",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
      {
        title: "Bank ID",
        path: "/bank-id",
        icon: <IoIcons.IoIosPaper color="#fe662b" />,
      },
    ],
  },
];

const Sider = () => {
  const [sidebar, setSidebar] = useState(true);
  const [closeButton, setCloseButton] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const user = currentUser?.role;
  const navigate = useNavigate();
  const handleDropdownClick = (path) => {
    setActiveDropdown((prev) => (prev === path ? null : path));
  };

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
              <img src={profileLogo} width={50} height={75} className="p-2" />
              <div className="ms-2 p-2 lh-sm">
                <p className="m-0 fw-bold">{currentUser?.name} </p>

                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={user}
                  menuVariant="dark"
                  className="text-muted"
                >
                  <NavDropdown.Item href="/update-profile">
                    <IoIosPerson size={20} color="#fe662b" />
                    &nbsp;Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaPowerOff size={20} color="#fe662b" />
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
                        />
                      );
                    })}
                  {user === "SuperAdmin_Employee" &&
                    SuperAdminEmployeeData.map((item, index) => {
                      return (
                        <SubMenu
                          item={item}
                          key={index}
                          activeDropdown={activeDropdown}
                          handleDropdownClick={handleDropdownClick}
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
