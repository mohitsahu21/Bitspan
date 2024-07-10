import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";



const PanTransactionRefundReport = () => {
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid ">
                        <div className="row flex-wrap justify-content-lg-center justify-content-center">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata">
                                <div className="main shadow-none ">
                                    <div className="row shadow-none ">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            {/* <div className="text-center">
                                                <h3>NSDL PAN Refund Request</h3>
                                            </div> */}
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">NSDL PAN Refund Request</h4>
                                                <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp;/ &nbsp; NSDL PAN Refund Request</h6>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4 ">
                                        <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow bg-body-tertiary rounded  p-5 m-4">
                                            <div className="row d-flex flex-column g-4">

                                                <div className="d-flex flex-column flex-md-row gap-3">
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

                                                </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="table-responsive">
                                                        <table class="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>
                                                                    <th scope="col">Action</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">P-Order Id</th>
                                                                    <th scope="col">Order Id</th>
                                                                    <th scope="col">Application <br /> Type</th>
                                                                    <th scope="col">Category</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Date of <br />Birth</th>
                                                                    <th scope="col">Gender</th>
                                                                    <th scope="col">Mobile No</th>
                                                                    <th scope="col">Email</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Message</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">Refund</th>
                                                                    <td>23/05/2024 14:35:58</td>
                                                                    <td>PAN465484654</td>
                                                                    <td>NSDL464444416785165</td>
                                                                    <td>EKYC 49A</td>
                                                                    <td>Individual</td>
                                                                    <td>107.00</td>
                                                                    <td>Mohit Sahu</td>
                                                                    <td>30/05/2000</td>
                                                                    <td>M</td>
                                                                    <td>9856325698</td>
                                                                    <td>mohitsahu@gmail.com</td>
                                                                    <td>SUCCESS</td>
                                                                    <td>Transaction Successfull</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Refund</th>
                                                                    <td>23/05/2024 14:35:58</td>
                                                                    <td>PAN465484654</td>
                                                                    <td>NSDL464444416785165</td>
                                                                    <td>EKYC 49A</td>
                                                                    <td>Individual</td>
                                                                    <td>107.00</td>
                                                                    <td>Mohit Sahu</td>
                                                                    <td>30/05/2000</td>
                                                                    <td>M</td>
                                                                    <td>9856325698</td>
                                                                    <td>mohitsahu@gmail.com</td>
                                                                    <td>SUCCESS</td>
                                                                    <td>Transaction Successfull</td>
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

export default PanTransactionRefundReport

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
