import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";

const DFundTransferStatus = () => {
  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata"
              >
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      {/* <div className="text-center">
                                                <h3>Wallet Transaction Report</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Fund Transfer
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Fund Transfer
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
                      <div className="row d-flex flex-column g-4">
                        {/* <div className="d-flex flex-column flex-md-row gap-3">
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="fromDate" className="form-label">From</label>
                                                        <input id="fromDate" className="form-control" type="date" />
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div>
                                                    <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div>

                                                </div> */}
                        <div className="text-center">
                          <h5>All Fund Transfer Request Status</h5>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            <table class="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Transaction ID</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Payout Charge</th>
                                  <th scope="col">Payment Mode</th>
                                  <th scope="col">Transaction No.</th>
                                  <th scope="col">My Comments</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Request Date</th>
                                </tr>
                              </thead>
                              {/* <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>23/05/2024 14:35:58</td>
                                  <td>MOHIT29605</td>
                                  <td>Mohit Sahu </td>
                                  <td>JABALPUR</td>
                                  <td>482002</td>
                                  <td>MADHYA PRADESH</td>
                                  <td>FTIPS3345K</td>
                                  <td>0.00</td>
                                  <td>0.00</td>
                                  <td>RETAILER</td>
                                  <td>ID : AASHISD29164 - Aashish Kumar</td>
                                  <td>www.bitspan.in</td>
                                  <td>COMPLETE</td>
                                  <td>ACTIVE</td>
                                </tr>
                              </tbody> */}
                            </table>
                          </div>
                          <div className="float-end">
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    Previous
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    1
                                  </a>
                                </li>

                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    Next
                                  </a>
                                </li>
                              </ul>
                            </nav>
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

export default DFundTransferStatus;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  .button {
    background: #6d70ff;
    border-color: #6d70ff;
  }
  .button:hover {
    background: #5356fa;
    border-color: #5356fa;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
  th {
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
  }
  td {
    font-size: 14px;
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
`;
