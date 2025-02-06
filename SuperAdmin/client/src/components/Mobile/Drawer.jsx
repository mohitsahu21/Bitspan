import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Drawer({ drawer, action, lang, homePage }) {
  console.log(homePage);
  const [itemSize, setSize] = useState("0px");
  const [item, setItem] = useState("home");
  const handler = (e, value) => {
    // e.preventDefault();
    const getItems = document.querySelectorAll(`#${value} li`).length;
    if (getItems > 0) {
      setSize(`${43 * getItems}px`);
      setItem(value);
    }
  };

  // const [heroData, setHeroData] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
  //       );
  //       const result = await response.json();

  //       // API response structure validate karna
  //       if (result.success && result.data) {
  //         console.log("✅ API fetched successfully:", result.data);
  //         setHeroData(result.data);
  //       } else {
  //         console.error("❌ Invalid API response", result);
  //       }
  //     } catch (error) {
  //       console.error("❌ Error fetching hero data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div
        onClick={(e) => action(e)}
        className={`off_canvars_overlay ${drawer ? "active" : ""}`}
      ></div>
      <div className="offcanvas_menu">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className={`offcanvas_menu_wrapper ${drawer ? "active" : ""}`}
              >
                <div className="canvas_close">
                  <a href="#" onClick={(e) => action(e)}>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
                <div className="offcanvas-brand text-center mb-40">
                  <img src={homePage?.Logo} alt="" />
                </div>
                <div id="menu" className="text-left ">
                  <ul className="offcanvas_main_menu">
                    <li
                      onClick={(e) => handler(e, "home")}
                      id="home"
                      className="menu-item-has-children active"
                    >
                      {/* <span className="menu-expand">
                        <i className="fa fa-angle-down"></i>
                      </span> */}
                      <Link to="/">Home</Link>
                      {/* <ul
                        className="sub-menu"
                        style={{
                          height: item === "home" ? itemSize : "0px",
                        }}
                      >
                        <li>
                          <Link to="/">Home 1</Link>
                        </li>
                        <li>
                          <Link to="/home-two">Home 2</Link>
                        </li>
                        <li>
                          <Link to="/home-three">Home 3</Link>
                        </li>
                        <li>
                          <Link to="/home-four">Home 4</Link>
                        </li>
                        <li>
                          <Link to="/home-five">Home 5</Link>
                        </li>
                        <li>
                          <Link to="/home-six">Home 6</Link>
                        </li>
                        <li>
                          <Link to="/home-seven">Home 7</Link>
                        </li>
                        <li>
                          <Link to="/home-eight">Home 8</Link>
                        </li>
                        <li>
                          <Link to="/home-dark">Home Dark</Link>
                        </li>
                        <li>
                          <Link to="/home-rtl">Home Rtl</Link>
                        </li>
                      </ul> */}
                    </li>

                    <li
                      onClick={(e) => handler(e, "contact")}
                      id="FindId"
                      className="menu-item-has-children active"
                    >
                      <Link to="/contact">Contact</Link>
                    </li>

                    <li
                      onClick={(e) => handler(e, "contact")}
                      id="FindId"
                      className="menu-item-has-children active"
                    >
                      <Link to="/FindId">Find UserId</Link>
                    </li>
                    <li
                      onClick={(e) => handler(e, "contact")}
                      id="Login"
                      className="menu-item-has-children active"
                    >
                      <Link to="#">
                        {" "}
                        <i className="fal fa-user pe-5" /> Login
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="offcanvas-social">
                  <ul className="text-center">
                    <li>
                      <a href={homePage?.Facebook_Link}>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href={homePage?.Instagram_Link}>
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href={homePage?.Instagram_Link}>
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href={homePage?.LinkedIn_Link}>
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer-widget-info">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fal fa-envelope" /> {homePage?.Email_Id}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fal fa-phone" /> {homePage?.Calling_No}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fal fa-map-marker-alt" />
                        {homePage?.Address}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Drawer;
