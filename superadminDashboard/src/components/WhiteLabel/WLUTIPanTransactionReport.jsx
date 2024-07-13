import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";



const WLUTIPanTransactionReport = () => {
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid ">
                        <div className="row flex-wrap justify-content-lg-center justify-content-center">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata">
                                <div className="main shadow-none">
                                    <div className="row shadow-none ">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            {/* <div className="text-center">
                                                <h3>UTI PAN Transaction Report</h3>
                                            </div> */}
                                             <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">UTI PAN Transaction Report</h4>
                                                <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp;/ &nbsp; UTI PAN Transaction Report</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4 ">
                                        <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
                                            <div className="form-container d-flex flex-column gap-3">

                                                <div className="d-flex flex-wrap gap-3">
                                                    <div className="field-group col-11 col-md-4 col-lg-2">
                                                        <label for="fromDate" className="form-label fw-bold">From</label>
                                                        <input id="fromDate" className="form-control" type="date" />
                                                    </div>
                                                    <div className="field-group col-11 col-md-4 col-lg-2">
                                                        <label for="toDate" className="form-label fw-bold">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div>
                                                    <div className="field-group col-11 col-md-4 col-lg-2">
                                                        <label for="toDate" className="form-label fw-bold">PAN Mode</label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option selected>---All---</option>
                                                            <option value="1">Physical</option>
                                                            <option value="2">Digital</option>
                                                            
                                                        </select>
                                                    </div>
                                                    <div className="field-group col-11 col-md-4 col-lg-2">
                                                        <label for="toDate" className="form-label fw-bold">PAN Type</label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option selected>---All---</option>
                                                            <option value="1">Both</option>
                                                            <option value="2">e-PAN Only</option>
                                                         
                                                            </select>
                                                    </div>
                                                    <div className="field-group col-11 col-md-4 col-lg-2">
                                                        <label for="toDate" className="form-label fw-bold">Status</label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option selected>---All---</option>
                                                            <option value="1">PENDING</option>
                                                            <option value="2">PROCESSED</option>
                                                            <option value="3">FAILED</option>
                                                            <option value="3">SUCCESS</option>
                                                            </select>
                                                    </div>
                                                    

                                                </div>
                                                <div className="col-11 col-md-4 col-lg-2">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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

export default WLUTIPanTransactionReport

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
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .field-group {
    display: flex;
    flex-direction: column;
  }
  th{
    font-weight: 500;
    font-size: 14px;
   
  }
  td{
   font-size: 14px;
   
  }
  @media (max-width: 768px) {
    .field-group {
      flex: 1 1 100%;
    }
  }
  @media (min-width: 769px) and (max-width: 1200px) {
    .field-group {
      flex: 1 1 45%;
    }
  }

  @media (min-width: 1201px) {
    .field-group {
      flex: 1 1 15%;
    }
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
