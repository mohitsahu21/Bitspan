import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown,Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const SACommisionSummary = () => {
     
    const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { token } = useSelector((state) => state.user);
    const [rechargeType,setRechargeType] = useState("");
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const complaintsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false);
    const [fromDate, setFromDate] = useState(""); // From date filter
    const [toDate, setToDate] = useState(""); // To date filter
  
  
    const fetchOfflineForm = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://2kadam.co.in/api/auth/superAdmin/getCommissionEntry",
          {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
        );
        setUsers(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error?.response?.status == 401) {
          // alert("Your token is expired please login again")
          Swal.fire({
                    icon: "error",
                    title: "Your token is expired please login again",
                  });
          dispatch(clearUser());
          navigate("/");
        }
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchOfflineForm();
    }, []);
  
    // useEffect(() => {
    //   fetchOfflineForm();
    // }, [isRefresh]);
  
    const filteredItems = users.filter(
      (row) =>{ 
        const matchesKeyword = 
        (row?.retailer_id && row.retailer_id.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.whiteLabel_id && row.whiteLabel_id.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.super_Distributor_id && row.super_Distributor_id.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.distributor_id && row.distributor_id.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.order_id &&
            row.order_id.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.transaction_id &&
                row.transaction_id.toLowerCase().includes(keyword.trim().toLowerCase()))
             
            const matchesType = !rechargeType || rechargeType === "---Select---" || row.transaction_type === rechargeType;
            // return matchesKeyword && matchesType ;
            const matchesDate =
        (!fromDate || new Date(row.created_at).toISOString().split("T")[0] >= new Date(fromDate).toISOString().split("T")[0] ) &&
        (!toDate || new Date(row.created_at).toISOString().split("T")[0]  <= new Date(toDate).toISOString().split("T")[0] );
        console.log(matchesKeyword)
            return matchesKeyword && matchesDate && matchesType;
            
          }
         
    );
  
    const totalPages = Math.ceil(filteredItems.length / complaintsPerPage);
  
    const filterPagination = () => {
      const startIndex = currentPage * complaintsPerPage;
      const endIndex = startIndex + complaintsPerPage;
      return filteredItems?.slice(startIndex, endIndex);
    };
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const showApiData = filterPagination();
  
  
    console.log(showApiData);
     
  
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
                                                  <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Commision Full Summary</h4>
                                                  <p className="mx-lg-5">
                                                      {" "}
                                                      <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                                                      <span
                                                          className="text-body-secondary"
                                                          style={{ fontSize: "13px" }}
                                                      >
                                                          {" "}
                                                          Commision Full Summary
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
                                                          <label for="fromDate" className="form-label">From</label>
                                                          <input id="fromDate" className="form-control" type="date"  value={fromDate}
                                onChange={(e) => {
                                  setFromDate(e.target.value)
                                  setCurrentPage(0);
                                }}/>
                                                      </div>
                                                      <div className="col-12 col-md-4 col-lg-3">
                                                          <label for="toDate" className="form-label">To</label>
                                                          <input id="toDate" className="form-control " type="date" value={toDate}
                                onChange={(e) => {setToDate(e.target.value)
                                  setCurrentPage(0);
                                }}/>
                                                      </div>
                                                      <div className="col-12 col-md-4 col-lg-3">
                                                          <label for="toDate" className="form-label">Select Type</label>
                                                          <select className="form-select" aria-label="Default select example"
                                                           value={rechargeType}
                                                           onChange={(e) => {
                                                            setRechargeType(e.target.value)
                                                            setCurrentPage(0);
                                                            }}>
                                                               <option selected>---Select---</option>
                                                              <option value="Prepaid">Prepaid</option>
                                                              <option value="Postpaid">Postpaid</option>
                                                              <option value="DTH">DTH</option>
                                                              <option value="Broadband">Broadband</option>
                                                              <option value="Electricity">Electricity</option>
                                                              <option value="Insurance">Insurance</option>
                                                              <option value="Landline">Landline</option>
                                                              <option value="PAN">PAN</option>
                                                              <option value="NSDL PAN">NSDL PAN</option>
                                                              <option value="PAN Coupon">PAN Coupon</option>
                                                              <option value="New DTH Connection">New DTH Connection</option>
                                                              <option value="Edistrict">Edistrict</option>
                                                              <option value="Verify Edistrict">Verify Edistrict</option>
                                                              <option value="Birth Certificate">Birth Certificate</option>
                                                              <option value="Death Certificate">Death Certificate</option>
                                                              <option value="Sambal">Sambal</option>
                                                              <option value="Pan Find">Pan Find</option>
                                                              <option value="GST Registration">GST Registration</option>
                                                              <option value="Udyog Aadhar">Udyog Aadhar</option>
  
  
                                                          </select>
                                                      </div>
                                                  </div>
  
                                                  <div className="d-flex flex-column flex-xl-row gap-3">
  
                                                  <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                                                          {/* <label for="fromDate" className="form-label">From</label> */}
                                                          <input id="fromDate" 
                                                          className="form-control"
                                                           type="search"
                                                           placeholder="Enter Order Id/Txn ID/User Id"
                                                           value={keyword}
                                // onChange={(e) => setKeyword(e.target.value)}
                                onChange={(e) => {
                                  setKeyword(e.target.value)
                                  setCurrentPage(0);
                                }}
                                                           />
                                                      </div>
                                                      
                                                     
                                                      {/* <div className="d-flex align-items-end">
                                                          <button type="button" className="btn btn-primary button">Search</button>
                                                      </div> */}
  
                                                  </div>
                                                
                                              
  
  
                                                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                      <div class="table-responsive">
                                                      {loading  ? ( 
                                                            <div className="d-flex justify-content-center">
                                                                 <Spinner animation="border" role="status">
                                                                 <span className="visually-hidden ">Loading...</span>
                                                               </Spinner>
                                                               </div>
                                                          )
                                                      :
                                                      (
                                                          <>
                                                          <table class="table table-striped">
                                                              <thead className="table-dark">
                                                                              <tr>
                                                                                  <th scope="col">#</th>
                                                                                  <th scope="col">Date</th>
                                                                                  <th scope="col">Order Id</th>
                                                                                  <th scope="col">Transaction Id</th>
                                                                                  <th scope="col">Amount</th>
                                                                                  <th scope="col">White Label<br />ID & Commision</th>
                                                                                  <th scope="col">Super Distributer  <br />ID & Commision</th>
                                                                                  <th scope="col">Distributer <br />ID & Commision</th>
                                                                                  <th scope="col">Retailer  <br />ID & Commision</th>
                                                                                  <th scope="col">Transaction Type</th>
                                                                                  <th scope="col">Transaction Details</th>
                                                                                  <th scope="col">Status</th>
                                                                              </tr>
                                                              </thead>
                                                              <tbody>
                                                              
                                                              {showApiData && showApiData.length > 0 ? (
                                          showApiData?.map((item, index) => (
                                            <tr key={index}>
                                            {/* <th scope="row">{index + 1}</th> */}
                                            <td>
                                                {currentPage *
                                                  complaintsPerPage +
                                                  index +
                                                  1}
                                              </td>
                                            <td>{item.created_at}</td>
                                            <td>{item.order_id}</td>
                                            <td>{item.transaction_id}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.whiteLabel_id} {" - Rs."} {item.whiteLabel_Commission}</td>
                                            <td>{item.super_Distributor_id}  {" - Rs."} {item.super_Distributor_Commission}</td>
                                            <td>{item.distributor_id} {" - Rs."}  {item.distributor_Commission}</td>
                                           
                                            <td>{item.retailer_id} {" - Rs."}  {item.retailer_Commission}</td>
                                            <td>{item.transaction_type}</td>
                                            <td>{item.transaction_details}</td>
                                            <td>{item.status}</td>
                                           
                                          </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td colSpan="13">No data available</td>{" "}
                                            {/* Updated colSpan to match table columns */}
                                          </tr>
                                        )}
                                                                  
                                                          
      
                                                              </tbody>
                                                          </table>
                                                          
                                                          </>
                                                      )}
                                                      </div>
                                                          <PaginationContainer>
                                                          <ReactPaginate
                                                            previousLabel={"Previous"}
                                                            nextLabel={"Next"}
                                                            breakLabel={"..."}
                                                            pageCount={totalPages}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={5}
                                                            onPageChange={handlePageChange}
                                                            containerClassName={"pagination"}
                                                            activeClassName={"active"}
                                                            forcePage={currentPage}
                                                          />
                                                        </PaginationContainer>
                                                    
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
  
  export default SACommisionSummary;
  
  const Wrapper = styled.div`
    .main {
      height: 100%;
      width: 100%;
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
     white-space: nowrap;
     
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
    .custom-dropdown-toggle::after {
    display: none !important;
  }
  `;
  
  
  const PaginationContainer = styled.div`
    .pagination {
      display: flex;
      justify-content: center;
      padding: 10px;
      list-style: none;
      border-radius: 5px;
    }
  
    .pagination li {
      margin: 0 5px;
    }
  
    .pagination li a {
      display: block;
      padding: 8px 16px;
      border: 1px solid #e6ecf1;
      color: #007bff;
      cursor: pointer;
      text-decoration: none;
      border-radius: 5px;
      box-shadow: 0px 0px 1px #000;
      font-size: 14px; /* Default font size */
    }
  
    .pagination li.active a {
      background-color: #004aad;
      color: white;
      border: 1px solid #004aad;
    }
  
    .pagination li.disabled a {
      color: white;
      cursor: not-allowed;
      background-color: #3a4e69;
      border: 1px solid #3a4e69;
    }
  
    .pagination li a:hover:not(.active) {
      background-color: #004aad;
      color: white;
    }
  
    /* Responsive adjustments for smaller screens */
    @media (max-width: 768px) {
      .pagination {
        padding: 5px;
        flex-wrap: wrap;
      }
  
      .pagination li {
        margin: 2px;
      }
  
      .pagination li a {
        padding: 6px 10px;
        font-size: 12px;
      }
    }
  
    @media (max-width: 480px) {
      .pagination {
        padding: 5px;
      }
  
      .pagination li {
        margin: 2px;
      }
  
      .pagination li a {
        padding: 4px 8px;
        font-size: 10px;
      }
  
      /* Hide the previous and next labels for extra-small screens */
      .pagination li:first-child a::before {
        content: "«";
        margin-right: 5px;
      }
  
      .pagination li:last-child a::after {
        content: "»";
        margin-left: 5px;
      }
    }
  `;

// const SACommisionSummary = () => {
//     return ( 
//         <>
//             <Wrapper>
//                 <div className="main">
//                     <div className="container-fluid">
//                         <div className="row flex-wrap justify-content-center ">
//                             <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
//                                 {/* <Sider /> */}
//                             </div>
//                             <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
//                              mt-5 formdata">
//                                 <div className="main shadow-none">
//                                     <div className="row shadow-none">
//                                         <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//                                             {/* <div className="text-center">
//                                                 <h3>Wallet Transaction Report</h3>
//                                             </div> */}
//                                               <div className="d-flex justify-content-between align-items-center flex-wrap">
//                                                 <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Commision Full Summary</h4>
//                                                 <p className="mx-lg-5">
//                                                     {" "}
//                                                     <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
//                                                     <span
//                                                         className="text-body-secondary"
//                                                         style={{ fontSize: "13px" }}
//                                                     >
//                                                         {" "}
//                                                         Commision Full Summary
//                                                     </span>{" "}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
//                                         <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
//                                             <div className="row d-flex flex-column g-4">

//                                                 <div className="d-flex flex-column flex-md-row gap-3">
//                                                     <div className="col-12 col-md-4 col-lg-3">
//                                                         <label for="fromDate" className="form-label">From</label>
//                                                         <input id="fromDate" className="form-control" type="date" />
//                                                     </div>
//                                                     <div className="col-12 col-md-4 col-lg-3">
//                                                         <label for="toDate" className="form-label">To</label>
//                                                         <input id="toDate" className="form-control " type="date" />
//                                                     </div>
//                                                     <div className="d-flex align-items-end">
//                                                         <button type="button" className="btn btn-primary button">Search</button>
//                                                     </div>

//                                                 </div>


//                                                 <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                                                     <div class="table-responsive">
//                                                         <table class="table table-striped">
//                                                             <thead className="table-dark">
//                                                                 <tr>
//                                                                     <th scope="col">#</th>
//                                                                     <th scope="col">Date</th>
//                                                                     <th scope="col">Order Id</th>
//                                                                     <th scope="col">Transaction Id</th>
//                                                                     <th scope="col">Amount</th>
//                                                                     <th scope="col">White Label<br />ID & Commision</th>
//                                                                     <th scope="col">Super Distributer  <br />ID & Commision</th>
//                                                                     <th scope="col">Distributer <br />ID & Commision</th>
//                                                                     <th scope="col">Retailer  <br />ID & Commision</th>
//                                                                     <th scope="col">Transaction Type</th>
//                                                                     <th scope="col">Transaction Details</th>
//                                                                     <th scope="col">Status</th>
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 <tr>
//                                                                     <th scope="row">1</th>
//                                                                     <td>23/05/2024 14:35:58</td>
//                                                                     <td>Wallet-Ashi465484654</td>
//                                                                     <td>4564564644444167851656541654</td>
//                                                                     <td>100.00</td>
//                                                                     <td>WA-Ashish123 - 6.00</td>
//                                                                     <td>SD-Mohit123 - 2.00</td>
//                                                                     <td>D-Mohit1234 - 2.00</td>
//                                                                     <td>RT-mohit123 - 2.00</td>
//                                                                     <td>PAN Card</td>
//                                                                     <td>PAN Card </td>
//                                                                     <td>SUCCESS</td>
//                                                                 </tr>
                                                           

//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                     <div className="float-end">
//                                                         <nav aria-label="Page navigation example">
//                                                             <ul className="pagination">
//                                                                 <li className="page-item"><a className="page-link" href="#">Previous</a></li>
//                                                                 <li className="page-item"><a className="page-link" href="#">1</a></li>

//                                                                 <li className="page-item"><a className="page-link" href="#">Next</a></li>
//                                                             </ul>
//                                                         </nav>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Wrapper>
//         </>
//     );
// }

// export default SACommisionSummary;

// const Wrapper = styled.div`
//   .main {
//     height: 100%;
//     width: 100%;
//   }
//   .button {
   
//     background: #6d70ff;
//     border-color: #6d70ff;
   
//   }
//   .button:hover{
//     background: #5356fa;
//     border-color: #5356fa;
    
//   }
//   .form-container {
//     width: 50%;
//     margin: auto;
//   }
//   th{
//     font-weight: 500;
//     font-size: 14px;
   
//   }
//   td{
//    font-size: 14px;
   
//   }
//   @media (min-width: 1025px) and (max-width : 1500px){
//     .formdata {
     
//       padding-left: 15rem;
//     }
//   }
//   @media (min-width: 1500px) {
//     .formdata {
     
//       padding-left: 13rem;
//     }
//   }
// `;