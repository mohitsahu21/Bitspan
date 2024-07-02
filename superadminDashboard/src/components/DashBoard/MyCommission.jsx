import React from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";



const MyCommission = () => {
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
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">My Commission</h4>
                                                <h6 className="mx-lg-5">/ &nbsp; MyCommission</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                                        <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-white">
                                            <div className="row d-flex justify-content-center border-bottom mb-4 pb-5">
                                                <div className="col-12 d-flex justify-content-center">
                                                       <h2>Today's Commission Structure</h2>
                                                </div>
                                                

                                            </div>
                                            
                                            <div className="row d-flex flex-column g-4">

                                                <div className="">
                                                     
                                                {/* <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="fromDate" className="form-label">From</label>
                                                        <input id="fromDate" className="form-control" type="date" />
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div>
                                                    <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div> */}
                                                  <h4>Prepaid Recharge</h4>

                                                </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="table-responsive">
                                                        <table class="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>

                                                                    <th scope="col"></th>
                                                                    <th scope="col">Operator Nmae</th>
                                                                    <th scope="col">Provider</th>
                                                                    <th scope="col">Type</th>
                                                                    <th scope="col">My Commission</th>
                                                                   

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                  
                                                </div>
                                            </div>

                                            <div className="row d-flex flex-column g-4 mt-1">

                                                <div className="">
                                                     
                                                {/* <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="fromDate" className="form-label">From</label>
                                                        <input id="fromDate" className="form-control" type="date" />
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div>
                                                    <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div> */}
                                                  <h4>Postpaid Recharge</h4>

                                                </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="table-responsive">
                                                        <table class="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>

                                                                <th scope="col"></th>
                                                                    <th scope="col">Operator Nmae</th>
                                                                    <th scope="col">Provider</th>
                                                                    <th scope="col">Type</th>
                                                                    <th scope="col">My Commission</th>


                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                   
                                                </div>
                                            </div>

                                            <div className="row d-flex flex-column g-4 mt-1">

                                                <div className="">
                                                    
                                                  <h4>DTH Recharge</h4>

                                                </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="table-responsive">
                                                        <table class="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>

                                                                <th scope="col"></th>
                                                                    <th scope="col">Operator Nmae</th>
                                                                    <th scope="col">Provider</th>
                                                                    <th scope="col">Type</th>
                                                                    <th scope="col">My Commission</th>


                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Jio</td>
                                                                    <td>2</td>
                                                                    <td>% Commission</td>
                                                                    <td>3.5</td>
                                                                   

                                                                </tr>


                                                            </tbody>
                                                        </table>
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

export default MyCommission

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
