import styled from "styled-components";
import { MdAddCard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { LuUserPlus } from "react-icons/lu";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BsInfoSquare } from "react-icons/bs";

const SuperAdminEmployeeDash = () => {
  const navigate = useNavigate();

  const CustomTooltip = styled(Tooltip)`
    .tooltip-inner {
      background-color: #fdded1;
      color: #fb510d;
      width: 190px;
    }
    .tooltip-arrow::before {
      border-top-color: white;
    }
  `;

  const User = ({ id, children, title }) => (
    <OverlayTrigger
      overlay={
        <CustomTooltip id={id}>
          {`Total WhiteLabel - ${10}`}
          <br /> {`Total Super Distributor - ${20}`} <br />{" "}
          {`Total Distributor - ${30}`} <br /> {`Total Retailer - ${50}`}
        </CustomTooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 d-none "></div>
              <div className="row shadow-none  formdata mt-4">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Dashboard</h4>
                    <p className="mx-lg-5">
                      {" "}
                      <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                      <span
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        {" "}
                        Dashboard
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10 mt-4">
                <div className="container-fluid">
                  <div className="row d-flex formdata justify-content-center mb-3">
                    <div className="col-12 boarder bg-white p-2">
                      <div className="news d-flex align-items-center">
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
                      </div>
                    </div>
                  </div>
                  <div className="row  d-flex formdata justify-content-center">
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
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
                              <h4 className="px-2 my-0">0</h4>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </User>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-2">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              INS PAY Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">0</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Ezytm Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">0</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              CGONE PAY Wallet Balance
                            </p>
                            <h4 className="px-2 my-0">0</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Total Complaints
                            </p>
                            <h4 className="px-2 my-0">0</h4>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-lg-6 col-sm-8   d-flex justify-content-center my-3 p-0">
                      <div className="card card-3">
                        <div className="d-flex">
                          <div className="d-flex justify-content-center flex-column align-items-center p-2 fs-3 icon">
                            <MdAddCard />
                          </div>
                          <div></div>
                          <div className="d-flex flex-column cardtext">
                            <p className="mb-0 px-2 my-0 fs-6">
                              Wallet Withdraw Requests
                            </p>
                            <h4 className="px-2 my-0">0</h4>{" "}
                          </div>
                        </div>
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

export default SuperAdminEmployeeDash;
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
    background: #6e6e6e;
  }

  .card-2 {
    background: #6e6e6e;
  }
  .card-3 {
    background: #6e6e6e;
  }
  .card-4 {
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
    animation: moveLeftToRight 30s linear infinite;
    position: absolute;
    right: 0;
  }
  .news-icon {
    z-index: 100;
    font-size: large;
  }
`;