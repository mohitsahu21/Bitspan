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
import Logo from './../assets/images/logo.png'
 
const Nav = styled.div`
    background-color: white;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* box-shadow: 1px 1px 6px black; */
    box-shadow: 0 0 20px rgba(89, 102, 122, 0.1);
`;
 
const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
`;
 
const SidebarNav = styled.nav`
    background-color: white;
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
    scrollbar-width: thin;  /* Firefox */

&::-webkit-scrollbar {
    width: 8px;  /* Adjust the width of the scrollbar */
}

&::-webkit-scrollbar-track {
    background: #f1f1f1;  /* Background of the scrollbar track */
}

&::-webkit-scrollbar-thumb {
    background: #d6d5d5;  /* Color of the scrollbar thumb */
    border-radius: 10px;  /* Rounded corners for the scrollbar thumb */
}

&::-webkit-scrollbar-thumb:hover {
    background: #989797;  /* Color of the scrollbar thumb on hover */
}
`;

const SidebarData = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: <AiIcons.AiFillHome color="black"/>,
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
		icon: <IoIcons.IoIosPaper color="black"/>,
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
		path: "/wallet",
		icon: <FaIcons.FaPhone />,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
		iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

        subNav: [
			{
				title: "Add Money to Wallet",
				path: "/add-money",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
			{
				title: "Add Wallet Summary",
				path: "/add-money-transaction-report",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
			{
				title: "Add Wallet Offline",
				path: "/add-wallet-money-offline",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "Wallet Offline Request",
				path: "/wallet-offline-request",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "Wallet Full Summary",
				path: "/wallet-transaction-report",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: "Training Video",
		path: "/training-video",
		icon: <FaIcons.FaEnvelopeOpenText />,

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
		icon: <IoIcons.IoMdHelpCircle />,
	},
    {
		title: "Important Links",
		path: "/important-links",
		icon: <IoIcons.IoMdHelpCircle />,
	},
    {
		title: "UTI 2.0",
		// path: "/training-video",
		icon: <FaIcons.FaEnvelopeOpenText />,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
		iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

		subNav: [
			{
				title: "Apply PAN Card",
				path: "/utilogin",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "UTI Transaction History",
				path: "/uti-transaction-report",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
    {
		title: "UTI New",
		// path: "/training-video",
		icon: <FaIcons.FaEnvelopeOpenText />,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
		iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

		subNav: [
			{
				title: "User ID Activate",
				path: "/retailer-id-revamp-activate",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Password Reset",
				path: "/password-reset",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "Buy Coupon",
				path: "/buy-uti-coupon",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "UTI Coupon History",
				path: "/uti-coupon-history",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
    {
		title: "PAN Track",
		path: "https://www.trackpan.utiitsl.com/PANONLINE/#forward",
		icon: <IoIcons.IoMdHelpCircle />,
	},
    {
		title: "NSDL PAN Application",
		// path: "/training-video",
		icon: <FaIcons.FaEnvelopeOpenText />,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
		iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

		subNav: [
			{
				title: "NSDL New PAN Card",
				path: "/pan-apply-49",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "NSDL Correction PAN",
				path: "/pan-apply-cr",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "NSDL PAN Track Status",
				path: "https://tin.tin.nsdl.com/pantan/StatusTrack.html",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "PAN Status",
				path: "/pan-status",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "PAN Transaction History",
				path: "/pan-transaction-report",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "PAN Refund",
				path: "/pan-transaction-refund-report",
				icon: <IoIcons.IoIosPaper />,
			},
            {
				title: "PAN Re Apply",
				path: "/pan-transaction-resume-report",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
    {
		title: "PAN Document",
		// path: "/training-video",
		icon: <FaIcons.FaEnvelopeOpenText />,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
		iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

		subNav: [
			{
				title: "Upload PAN Document",
				path: "/pan-document-upload",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "PAN Uploaded Docs",
				path: "/pan-document",
				icon: <IoIcons.IoIosPaper />,
			}
 
		],
	},
    {
		title: "Recharge",
		// path: "/training-video",
		icon: <FaIcons.FaEnvelopeOpenText />,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
		iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

		subNav: [
			{
				title: "Prepaid Recharge",
				path: "/prepaid-recharge",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Postpaid Recharge",
				path: "/prepaid-recharge",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "DTH Recharge",
				path: "/dth-recharge",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Prepaid Recharge History",
				path: "/prepaid-recharge-history",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Postpaid Recharge History",
				path: "/postpaid-recharge-history",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "DTH Recharge History",
				path: "/dth-recharge-history",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Recharge Refund Request",
				path: "/recharge-refund-report",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "My Commission",
				path: "/my-commission",
				icon: <IoIcons.IoIosPaper />,
			},

 
		],
	},
    {
		title: "Complaint",
		// path: "/training-video",
		icon: <FaIcons.FaEnvelopeOpenText />,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
		iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

		subNav: [
			{
				title: "Complaint",
				path: "/raise-complaint",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "All Complaint List",
				path: "/complaint-raised-list",
				icon: <IoIcons.IoIosPaper />,
			}
		
		
 
		],
	},
    {
		title: "Other Settings",
		// path: "/training-video",
		icon: <FaIcons.FaEnvelopeOpenText />,
        iconClosed: <RiIcons.RiArrowDownSFill color="black"/>,
		iconOpened: <RiIcons.RiArrowUpSFill color="black"/>,

		subNav: [
			{
				title: "Download Certificate",
				path: "/download-certificate",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Change Password",
				path: "/change-password",
				icon: <IoIcons.IoIosPaper />,
			}
		
		
 
		],
	},
    {
		title: "Logout",
		// path: "https://www.trackpan.utiitsl.com/PANONLINE/#forward",
		icon: <IoIcons.IoMdHelpCircle />,
	},
];
 
const Sider = () => {
    const [sidebar, setSidebar] = useState(true);
    const [closeButton , setCloseButton] = useState(false);
 
    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
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
 
    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars
                            onClick={showSidebar}
                        />
                    </NavIcon>
                    {/* <h1
                        style={{
                            textAlign: "center",
                            marginLeft: "200px",
                            color: "green",
                        }}
                    >
                        Bitspan.in
                    </h1> */}
                </Nav>
                
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        {closeButton 
                        ?  
                        <div className="d-flex">
                           
                    <img className="img-fluid p-3" src={Logo} width={180} height={60}></img>
                    <NavIcon to="#">
                        <AiIcons.AiOutlineClose
                            onClick={showSidebar}
                        />
                    </NavIcon>
                        </div>
                       
                        :
                       <img className="img-fluid p-3" src={Logo} width={180} height={60}></img>
                        }
                       
                        {SidebarData.map((item, index) => {
                            return (
                                <SubMenu
                                    item={item}
                                    key={index}
                                />
                            );
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};
 
export default Sider;
