import React from "react";
import HomeThreeSecondSingleService from "../../../components/HomeThreeSecondSingleService/HomeThreeSecondSingleService";
import { SiKnowledgebase } from "react-icons/si";
import { BsTools, BsHeart, BsBag } from "react-icons/bs";
import { MdComputer } from "react-icons/md";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import { IoLogoAppleAr } from "react-icons/io5";
import { BsPersonRaisedHand } from "react-icons/bs";
import NewHomeThreeSecondSingleService from "../../New Template/NewHomeThreeSecondSingleService";

const HomeThreeSecondServices = () => {
  return (
    <>
      <section className="services__area-3 pt-115 pb-160">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="section-title section__title-3 mb-70">
                <h2>What We Serve To You</h2>
                <p>
                  A Retailer can start a PAN center with minimum investment
                  only. Retailer can makes unlimited PAN cards through proper
                  channel. A Distributor can makes unlimited PAN cards.He/She
                  can create unlimited Retailers with low cost investment only.
                  T&C apply. Super Distributor can makes unlimited PAN
                  cards.He/She can create unlimited Distributors & Retailers
                  with low cost investment.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="services__nav wow fadeInUp" data-wow-delay=".4s">
                <ul className="nav nav-pills " id="services-tab" role="tablist">
                  <li className="nav-item mb-45">
                    <a
                      className="nav-link active"
                      id="share-tab"
                      data-bs-toggle="pill"
                      href="#share"
                      role="tab"
                      aria-controls="share"
                      aria-selected="true"
                    >
                      <i>
                        {" "}
                        <MdComputer size={23} />{" "}
                      </i>
                      <span style={{ color: "#00ccbe", fontSize: "22px" }}>
                        Own Brand Portal
                      </span>
                    </a>
                  </li>
                  <li className="nav-item mb-30">
                    <a
                      className="nav-link"
                      id="customer-tab"
                      data-bs-toggle="pill"
                      href="#customer"
                      role="tab"
                      aria-controls="customer"
                      aria-selected="true"
                    >
                      <i>
                        <LiaNetworkWiredSolid size={23} />
                      </i>{" "}
                      <span style={{ color: "#00ccbe", fontSize: "22px" }}>
                        Super Distributor
                      </span>
                    </a>
                  </li>
                  <li className="nav-item mb-30">
                    <a
                      className="nav-link"
                      id="social-tab"
                      data-bs-toggle="pill"
                      href="#social"
                      role="tab"
                      aria-controls="social"
                      aria-selected="true"
                    >
                      <i>
                        <IoLogoAppleAr size={23} />
                      </i>{" "}
                      <span style={{ color: "#00ccbe", fontSize: "22px" }}>
                        Distributor
                      </span>
                    </a>
                  </li>
                  <li className="nav-item mb-30">
                    <a
                      className="nav-link"
                      id="financial-tab"
                      data-bs-toggle="pill"
                      href="#financial"
                      role="tab"
                      aria-controls="financial"
                      aria-selected="true"
                    >
                      <i>
                        <BsPersonRaisedHand size={23} />
                      </i>{" "}
                      <span style={{ color: "#00ccbe", fontSize: "22px" }}>
                        Retailer
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="services__tab grey-bg-18">
                <div className="tab-content" id="services-content">
                  <div
                    className="tab-pane fade show active"
                    id="share"
                    role="tabpanel"
                    aria-labelledby="share-tab"
                  >
                    <NewHomeThreeSecondSingleService
                      title=" Own Brand Portal"
                      details="Start Own brand portal with own website.Here you can access your control panel & manage Retailers, Distributors, Super Distributors"
                      amount="5500"
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="customer"
                    role="tabpanel"
                    aria-labelledby="customer-tab"
                  >
                    <NewHomeThreeSecondSingleService
                      title="Super Distributor"
                      details="Super Distributor can makes unlimited PAN cards.He/She can create unlimited Distributors & Retailers with low cost investment.T&C apply."
                      amount="200"
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="social"
                    role="tabpanel"
                    aria-labelledby="social-tab"
                  >
                    <NewHomeThreeSecondSingleService
                      title="Distributor"
                      details="A Distributor can makes unlimited PAN cards.He/She can create unlimited Retailers with low cost investment only."
                      amount="100"
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="financial"
                    role="tabpanel"
                    aria-labelledby="financial-tab"
                  >
                    <NewHomeThreeSecondSingleService
                      title="Retailer"
                      details="A Retailer can start a PAN center with minimum investment only.Retailer can makes unlimited PAN cards through proper channel."
                      amount="10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeThreeSecondServices;
