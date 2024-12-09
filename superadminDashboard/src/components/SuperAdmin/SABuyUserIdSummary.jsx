import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { MdFormatListNumberedRtl } from "react-icons/md";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown,Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";



const SABuyUserIdSummary = () => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const complaintsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false);
    const [fromDate, setFromDate] = useState(""); // From date filter
    const [toDate, setToDate] = useState(""); // To date filter
    const [PaymentMode, setPaymentMode] = useState("")
  
  
    const fetchOfflineForm = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getBuyUserIdSummary"
        );
        setUsers(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    // useEffect(() => {
    //   fetchOfflineForm();
    // }, []);
  
    useEffect(() => {
      fetchOfflineForm();
    }, [isRefresh]);
  
    const filteredItems = users.filter(
      (row) =>{ 
        const matchesKeyword =  (row?.userId &&
          row.userId.toLowerCase().includes(keyword.trim().toLowerCase())) ||
        (row?.UserName && row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.orderId &&
            row.orderId.toLowerCase().includes(keyword.trim().toLowerCase())) 
             
            const matchesType = !PaymentMode || PaymentMode === "---Select---" || row.payment_method === PaymentMode;
            // return matchesKeyword && matchesType ;
            const matchesDate =
        (!fromDate || new Date(row.bought_date).toISOString().split("T")[0] >= new Date(fromDate).toISOString().split("T")[0] ) &&
        (!toDate || new Date(row.bought_date).toISOString().split("T")[0]  <= new Date(toDate).toISOString().split("T")[0] );
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
                        <div className="row flex-wrap justify-content-lg-center justify-content-center ">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata ">
                                <div className="main shadow-none ">
                                    <div className="row shadow-none ">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            {/* <div className="text-center">
                                                <h3>Complaint Raised List</h3>
                                            </div> */}
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Buy User Id Summary</h4>
                                                <p className="mx-lg-5">
                                                    {" "}
                                                    <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                                                    <span
                                                        className="text-body-secondary"
                                                        style={{ fontSize: "13px" }}
                                                    >
                                                        {" "}
                                                        Buy User Id Summary
                                                    </span>{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                                        <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                                            <div className="row d-flex flex-column g-4">

                                                <div className="d-flex flex-column flex-md-row gap-3">
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="fromDate" className="form-label">From</label>
                                                        <input id="fromDate" className="form-control" type="date" value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}/>
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" value={toDate}
                              onChange={(e) => setToDate(e.target.value)}/>
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">Select Payment Method</label>
                                                        <select className="form-select" aria-label="Default select example"
                                                         value={PaymentMode}
                                                         onChange={(e) => setPaymentMode(e.target.value)}>
                                                             <option selected>---Select---</option>
                                                            <option value="Online">Online</option>
                                                            <option value="Wallet">Wallet</option>


                                                        </select>
                                                    </div>
                                                    
                                                    {/* <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div> */}

                                                </div>
                                                <div className="d-flex flex-column flex-xl-row gap-3">

<div className="col-12 col-md-12 col-lg-12 col-xl-8">
        {/* <label for="fromDate" className="form-label">From</label> */}
        <input id="fromDate" 
        className="form-control"
         type="search"
         placeholder="Enter User Name/User Id/Order Id"
         value={keyword}
onChange={(e) => setKeyword(e.target.value)}
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
                                                        <table className="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>

                                                                <th scope="col">#</th>
                                                                    <th scope="col">Date</th>

                                                                    <th scope="col">Order Id</th>
                                                                    <th scope="col">Transaction Id</th>
                                                                    <th scope="col">User Id</th>
                                                                    <th scope="col">User Name</th>
                                                                    <th scope="col">User Role</th>
                                                                    <th scope="col">No Of User Id</th>
                                                                    <th scope="col">User Id Type</th>
                                                                    <th scope="col">Total Amount</th>
                                                                    <th scope="col">Payment Method</th>
                                                                    {/* <th scope="col">Status</th> */}


                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {showApiData && showApiData.length > 0 ? (
                                        showApiData?.map((item, index) => (
                                          <tr key={index}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{item.bought_date}</td>
                                          <td>{item.orderId}</td>
                                          <td>{item.transactionId}</td>
                                          <td>{item.userId}</td>
                                          <td>{item.UserName}</td>
                                          <td>{item.role}</td>
                                          {/* <td>{item.userPhone}</td>
                                          <td>{item.userEmail}</td> */}
                                          <td>{item.number_of_userId}</td>
                                          <td>{item.userId_type}</td>
                                          <td>{item.total_amount}</td>
                                      
                                          <td>{item.payment_method}</td>
                                         
                                        
                                         
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

export default SABuyUserIdSummary

const Wrapper = styled.div`
  .main {
    height: 100vh;
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
.form-label{
    white-space: nowrap;
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
