import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoHome } from "react-icons/io5";
import { ImSwitch } from "react-icons/im";
import { BsFileEarmarkPerson } from "react-icons/bs";

const Sider = () => {
  const location = useLocation();
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSidebarClass = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };

  //   const handleLogout = () => {
  //     const isConfirmed = window.confirm("Are you sure you want to Logout?");
  //     if (!isConfirmed) {
  //       return;
  //     }
  //     navigate("/");
  //     dispatch(clearUser());
  //   };

  return (
    <Wrapper>
      <div className="px-0" id="sidebar">
        <div className="d-flex flex-column align-items-start px-0 pt-2">
          <ul
            className="nav nav-pills flex-column mb-0 align-items-start px-3"
            id="menu"
          >
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <IoHome className="icon" />
                </div> */}
                <div>
                  <h3 className=" d-none d-sm-inline icon-text" id="navleft1">
                    Dashboard
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    Wallet
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    Traning Video
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    ImportantLinks
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    UTI 2.0
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    Pan Track
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    NSDL Pan Application
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    Pan Document
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    Recharge
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    Complaint
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link to="#" className={`link-div ${getSidebarClass("#")}`}>
                {/* <div>
                  <BsFileEarmarkPerson className="text-white" />
                </div> */}
                <div>
                  <h3 className="d-none d-sm-inline icon-text" id="navleft1">
                    Other Setting
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <div className="link-div">
                <h3 className="text-light icon-text" id="navleft1">
                  Logout
                </h3>
              </div>
            </li>
            <hr />
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sider;
const Wrapper = styled.div`
  #navleft1 {
    font-size: 20px;
    /* margin-left: 0rem; */
    color: white;
    /* padding-left: 0.5rem; */
    white-space: nowrap;
    margin: 0 0 0;
    @media (min-width: 768px) and (max-width: 1024px) {
      font-size: 20px;
    }
  }
  /* #navleft2 {
    font-size: 12px;
    margin-left: 0rem;
    color: white;
  }
  #navleft {
    font-size: 12px;
    margin-left: -0.2rem;
    color: white;
  } */
  #menu {
    width: 100%;
  }
  #sidebar {
    width: 100%;
    height: 82rem;
    background-color: #3eecac;
    background-image: linear-gradient(10deg, #3eecac 0%, #ee74e1 200%);

    @media screen and (max-width: 768px) {
      width: 64%;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 64%;
      height: 110rem;
    }
  }
  .bi {
    color: white;
  }

  li:hover {
    color: #8ae6ff;
  }

  .link-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease, border 0.3s ease, border-radius 0.3s ease;
    padding: 0.5rem;
    border: 2px solid transparent;
    border-radius: 10px;
  }

  .link-div:hover {
    border: 2px solid rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  a {
    text-decoration: none;
  }

  .active-nav {
    padding: 1rem;
  }
  .icon {
    color: white;
    font-size: 2rem;
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 1rem;
    }
  }

  /* .icon-text {
    @media screen and (max-width: 1024px) {
      font-size: 20px;
    }
  } */
`;
