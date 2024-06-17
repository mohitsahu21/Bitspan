import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";



const PanTransactionReport = () => {
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid ">
                        <div className="row flex-wrap justify-content-lg-end justify-content-center">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10  col-sm-10  col-12
                             mt-5">
                                <div className="main shadow-none ">
                                    <div className="row shadow-none ">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="text-center">
                                                <h3>PAN Transaction Report</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  justify-content-end pe-4 ">
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
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">P-Order Id</th>
                                                                    <th scope="col">Order Id</th>
                                                                    <th scope="col">Application <br /> Type</th>
                                                                    <th scope="col">Category</th>
                                                                    <th scope="col">Ack No.</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Date of <br/>Birth</th>
                                                                    <th scope="col">Gender</th>
                                                                    <th scope="col">Mobile No</th>
                                                                    <th scope="col">Email</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Message</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td>23/05/2024 14:35:58</td>
                                                                    <td>PAN465484654</td>
                                                                    <td>NSDL464444416785165</td>
                                                                    <td>EKYC 49A</td>
                                                                    <td>Individual</td>
                                                                    <td>984616846516846</td>
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
                                                                    <th scope="row">2</th>
                                                                    <td>23/05/2024 14:35:58</td>
                                                                    <td>PAN465484654</td>
                                                                    <td>NSDL464444416785165</td>
                                                                    <td>EKYC 49A</td>
                                                                    <td>Individual</td>
                                                                    <td>984616846516846</td>
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

export default PanTransactionReport

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
`;
