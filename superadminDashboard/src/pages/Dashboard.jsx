import React from "react";
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

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 p-0">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9 mt-5">
                <div className="container-fluid">
                  <div className="row  d-flex justify-content-around">
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div
                        className="card card-1"
                        onClick={() => navigate("/prepaid-recharge")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <FaMobileAlt />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Mobile</p>
                            <h4 className="px-2 my-0">Recharge</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div
                        className="card card-2"
                        onClick={() => navigate("/dth-recharge")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdOutlineWidthFull />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">DTH/D2H</p>
                            <h4 className="px-2 my-0">Recharge</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div
                        className="card card-3"
                        onClick={() => navigate("/dth-recharge")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <RiCoupon2Line />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Coupon</p>
                            <h4 className="px-2 my-0">Purchase</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div
                        className="card card-4"
                        onClick={() => navigate("/raise-complaint")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <FaRegMessage />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Complaints</p>
                            <h4 className="px-2 my-0">Raise Query</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-1">
                        <Link to="https://www.trackpan.utiitsl.com/PANONLINE/forms/TrackPan/trackApp#forward">
                          <div className="d-flex">
                            <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                              <MdManageSearch />
                            </div>
                            <div></div>
                            <div className="d-flex flex-column cardtext">
                              <p className="mb-0 px-2 my-0 fs-6">Pan Card</p>
                              <h4 className="px-2 my-0">
                                Track Application
                              </h4>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div
                        className="card card-2"
                        onClick={() => navigate("/uti-login")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <IoIosLogIn />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">PSA Login</p>
                            <h4 className="px-2 my-0">UTIITSL</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
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
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div
                        className="card card-4"
                        onClick={() => navigate("/add-money")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Add Monet to</p>
                            <h4 className="px-2 my-0">Wallet</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div
                        className="card card-1"
                        onClick={() => navigate("/pan-apply-49")}
                      >
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <AiOutlineForm />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">NSDL PAN</p>
                            <h4 className="px-2 my-0">
                              E-KYC Application
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-2">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Recharge Today
                            </p>
                            <h4 className="px-2 my-0">0 - (Rs. 0)</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Recharge Month
                            </p>
                            <h4 className="px-2 my-0">0 - (Rs. 0)</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-4">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">Wallet Amount</p>
                            <h4 className="px-2 my-0">(Rs. 250/-)</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
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
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-2">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Today Commission
                            </p>
                            <h4 className="px-2 my-0">0</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-8 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Month Commission
                            </p>
                            <h4 className="px-2 my-0">0</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
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
    width: 80%;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;

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
`;
