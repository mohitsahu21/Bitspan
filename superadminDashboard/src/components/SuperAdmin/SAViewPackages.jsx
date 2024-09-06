import React, { useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal';
import SAViewPackageModel from "./SAViewPackageModel";
import SAEditPackageModel from "./SAEditPackageModel";
import { CiViewList } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Dropdown from 'react-bootstrap/Dropdown';

const SAViewPackages = () => {
    const [showPackgeDetail, setShowPackgeDetail] = useState(false);
    const [editPackgeDetail, setEditPackgeDetail] = useState(false);
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid">
                        <div className="row flex-wrap justify-content-center ">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata">
                                <div className="main shadow-none">
                                    <div className="row shadow-none">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            {/* <div className="text-center">
                                                <h3>Wallet Transaction Report</h3>
                                            </div> */}
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">View Commission Packages</h4>
                                                <p className="mx-lg-5">
                                                    {" "}
                                                    <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                                                    <span
                                                        className="text-body-secondary"
                                                        style={{ fontSize: "13px" }}
                                                    >
                                                        {" "}
                                                        View Commission Packages
                                                    </span>{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                                        <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
                                            <div className="row d-flex flex-column g-4">

                                                <div className="d-flex flex-column flex-md-row gap-3">
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        {/* <label for="fromDate" className="form-label"></label> */}
                                                        <input id="fromDate" className="form-control" type="search" placeholder="Search Packages" />
                                                    </div>
                                                    {/* <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div> */}
                                                    <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div>

                                                </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div className="table-responsive">
                                                        <table className="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">Package Id</th>
                                                                    <th scope="col">Created Date</th>
                                                                    <th scope="col">Package Name</th>
                                                                    <th scope="col">Package For</th>
                                                                    <th scope="col">Action</th>
                                                                    {/* <th scope="col">White Label<br />ID & Commision</th>
                                                                    <th scope="col">Super Distributer  <br />ID & Commision</th>
                                                                    <th scope="col">Distributer <br />ID & Commision</th>
                                                                    <th scope="col">Retailer  <br />ID & Commision</th>
                                                                    <th scope="col">Transaction Type</th>
                                                                    <th scope="col">Transaction Details</th>
                                                                    <th scope="col">Status</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">1</th>
                                                                    <td>456654</td>
                                                                    <td>23/05/2024 14:35:58</td>
                                                                    <td>Two percentage package</td>
                                                                    <td>WhiteLabel</td>
                                                                    {/* <td><button className="btn btn-success" onClick={() => setShowPackgeDetail(true)}>
                                                                  <span className=""> <CiViewList/></span>   View</button>
                                                                        <button className="btn btn-success mx-1" onClick={() => setEditPackgeDetail(true)}>
                                                                        <FaEdit /> Edit</button>
                                                                      <button className="btn btn-success" >
                                                                      <MdDelete />  Delete</button></td> */}

                                                                    <td> <Dropdown>
                                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                            Action Button
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item onClick={() => setShowPackgeDetail(true)}><span className=""> <CiViewList /></span> View</Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => setEditPackgeDetail(true)}>  <FaEdit /> Edit</Dropdown.Item>
                                                                            <Dropdown.Item ><MdDelete /> Delete</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown></td>
                                                                    {/* <td>WA-Ashish123 - 6.00</td>
                                                                    <td>SD-Mohit123 - 2.00</td>
                                                                    <td>D-Mohit1234 - 2.00</td>
                                                                    <td>RT-mohit123 - 2.00</td>
                                                                    <td>PAN Card</td>
                                                                    <td>PAN Card </td>
                                                                    <td>SUCCESS</td> */}
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



                {/* Package details Model  start*/}

                <Modal
                    size="lg"
                    show={showPackgeDetail}
                    onHide={() => setShowPackgeDetail(false)}
                    aria-labelledby="packageDetail-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="packageDetail-modal-sizes-title-lg">

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SAViewPackageModel />
                    </Modal.Body>
                </Modal>

                {/* Package details Model  end*/}

                {/*Edit Package details Model start*/}
                <Modal
                    size="lg"
                    show={editPackgeDetail}
                    onHide={() => setEditPackgeDetail(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SAEditPackageModel />
                    </Modal.Body>
                </Modal>

                {/*Edit Package details Model end*/}


            </Wrapper>
        </>
    );
}

export default SAViewPackages;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  .table-responsive{
    min-height: 200px;
  }
  .button {
   
    background: #6d70ff;
    border-color: #6d70ff;
   
  }
  .button:hover{
    background: #5356fa;
    border-color: #5356fa;
    
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