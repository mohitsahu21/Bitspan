import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";



const DTHRechargeHistory = () => {
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid">
                        <div className="row flex-wrap justify-content-lg-center justify-content-center ">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata ">
                                <div className="main shadow-none ">
                                    <div className="row shadow-none ">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            {/* <div className="text-center">
                                                <h3>Prepaid Recharge History</h3>
                                            </div> */}
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">DTH Recharge History</h4>
                                                <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp;/ &nbsp; DTH Recharge History</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                                        <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                                            <div className="row d-flex flex-column g-4">

                                                <div className="d-flex flex-column flex-md-row gap-3">
                                                    <div className="col-12 col-md-4 col-lg-3">

                                                        <select className="form-select" aria-label="Default select example">
                                                            <option value='10' selected>10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="100">100</option>
                                                            <option value="500">500</option>
                                                            <option value="1000">1000</option>


                                                        </select>
                                                    </div>


                                                    <div className="d-flex">
                                                        <button type="button" className="btn btn-primary button px-4">Search</button>
                                                    </div>

                                                </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="table-responsive">
                                                        <table class="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>

                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Transaction ID</th>

                                                                    <th scope="col">Operator Order ID</th>
                                                                    <th scope="col">Details</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">Debit</th>
                                                                    <th scope="col">Earning</th>
                                                                    <th scope="col">Status</th>


                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>

                                                                    <td>23/05/2024 14:35:58</td>
                                                                    <td>465484654</td>
                                                                    <td>BR46444445165</td>
                                                                    <td>Jio 785154851 Provider 1</td>
                                                                    <td>25</td>
                                                                    <td>24.6025</td>
                                                                    <td>0.3975</td>

                                                                    <td>SUCCESS</td>

                                                                </tr>


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="float-end">
                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination">
                                                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">1</a></li>

                                                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
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
}

export default DTHRechargeHistory

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
  th{
    font-weight: 500;
    font-size: 14px;
   
  }
  td{
   font-size: 14px;
   
  }
  @media (min-width: 1025px) and (max-width : 1500px){
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
