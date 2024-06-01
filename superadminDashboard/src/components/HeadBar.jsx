import React from "react";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeadBar = () => {
  return (
    <Wrapper>
      <div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link to="/">
              {/* <img
                src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                alt="Logo"
                width="75"
                height="60"
                // style={{ marginLeft: "-1.3rem" }}
              /> */}
            </Link>
            <li style={{ listStyle: "none" }}>
              <Link
                className="nav-link active text-white mt-2 mx-2 fs-5"
                to="/"
              >
                Bitspan.com
              </Link>
            </li>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown mx-3">
                  <p className="text-white fw-bold">User Name</p>
                </li>
                <br />
                <li className="nav-item dropdown mx-3">
                  <p className="text-white fw-bold">XXXXXX0761</p>
                </li>
                {/* <li className="nav-item dropdown mx-3" id="userid">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserAlt className="icon" />
                  </a>

                  <ul className="dropdown-menu second-dropdown">
                    <li className="text-center">
                      <Link to="/profileDashboard">View Profile</Link>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </Wrapper>
  );
};

export default HeadBar;
const Wrapper = styled.div`
  nav {
    width: 100%;
    @media (min-width: 820px) and (max-width: 1024px) {
      width: 100%;
    }
  }
  #userid {
    /* margin-left: -10rem; */
    list-style-type: none;
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
  #bell {
    //margin-left: 5rem;
    list-style-type: none;
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }

  .nav-link {
    display: inline;
    list-style-type: none;
  }

  .second-dropdown {
    margin-left: -5rem;
    width: fit-content;
    @media screen and (max-width: 1000px) {
      margin-left: 0rem;
    }
  }

  .icon {
    color: white;
    font-size: 1.5rem;
  }
  .navbar {
    background-color: #3eecac;
    background-image: linear-gradient(260deg, #3eecac 0%, #ee74e1 200%);
    box-shadow: 1px 1px 6px black;
  }

  ul {
    li {
      list-style: none !important;
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
`;
