import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";

const SAActiveUsersList = () => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const complaintsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);


    const fetchActiveUsers = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getActiveUsers"
          );
          setUsers(data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchActiveUsers();
      }, []);

      const filteredItems = users.filter(
        (row) =>
          (row?.UserName &&
            row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
          (row?.UserId && row.UserId.includes(keyword.trim()))
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
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Active Users</h4>
                                                <p className="mx-lg-5">
                                                    {" "}
                                                    <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                                                    <span
                                                        className="text-body-secondary"
                                                        style={{ fontSize: "13px" }}
                                                    >
                                                        {" "}
                                                        Active Users
                                                    </span>{" "}
                                                </p>
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


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="table-responsive">
                                                        {loading  ? ( 
                                                            <p>Loading...</p>
                                                        )
                                                    :
                                                    (
                                                        <table class="table table-striped">
                                                        <thead className="table-dark">
                                                        <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>

                                    <th scope="col">User Id</th>
                                    <th scope="col">
                                      User <br /> Name
                                    </th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    {/* <th scope="col">Address</th> */}
                                    <th scope="col">PAN No</th>
                                    <th scope="col">AAdhaar No</th>
                                    <th scope="col">Business Name</th>
                                    <th scope="col">City</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Pincode</th>

                                    {/* <th scope="col">P-Coupon <br/>Price</th>
                                                                      <th scope="col">E-Coupon <br/>Price</th> */}

                                    <th scope="col">Created By</th>
                                    <th scope="col">Website Name</th>

                                    <th scope="col">Payment Status</th>
                                    <th scope="col">Aadhar Front</th>
                                    <th scope="col">Aadhar Back</th>
                                    <th scope="col">Pan Card Front</th>
                                    {/* <th scope="col">View KYC</th> */}
                                    <th scope="col">Status</th>
                                    {/* <th scope="col">Note</th> */}
                                    <th scope="col">Action</th>
                                    
                                  </tr>
                                                        </thead>
                                                        <tbody>
                                                            
                                                        {showApiData && showApiData.length > 0 ? (
                                    showApiData?.map((user, index) => (
                                      <tr key={user.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.CreateAt}</td>

                                        <td>{user.UserId}</td>

                                        <td>{user.UserName}</td>
                                        <td>{user.role}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.ContactNo}</td>
                                        <td>{user.PanCardNumber}</td>
                                        <td>{user.AadharNumber}</td>
                                        <td>{user.BusinessName}</td>
                                        <td>{user.City}</td>

                                        <td>{user.State}</td>
                                        <td>{user.PinCode}</td>
                                        <td>{user?.CreatedBy}</td>
                                        <td>{user?.WebsiteName}</td>
                                        <td>{user?.PaymentStatus}</td>

                                        {/* <td>
                                        {item.attached_kyc
                                            .split(",")
                                            .map((kycurl, kycindx) => (
                                              <div key={kycindx}>
                                                <a
                                                  href={kycurl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  View KYC {kycindx + 1}
                                                </a>
                                              </div>
                                            ))}
                                      </td> */}
                                        <td>
                                          <a
                                            href={user.AadharFront}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>
                                          <a
                                            href={user.AadharBack}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>
                                          <a
                                            href={user.PanCardFront}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View
                                          </a>
                                        </td>
                                        <td>{user.Status}</td>
                                        {/* <td> <Link to={'/change-price'}>Change Price </Link></td> */}
                                        {/* <td>{user?.Note}</td> */}
                                        <td>
                                          {/* <Dropdown>
                                            <Dropdown.Toggle
                                              variant="success"
                                              // id={`dropdown-${pkg.id}`}
                                            >
                                              Action Button
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <Dropdown.Item
                                                onClick={() => {
                                                  setSelectedUser(user);
                                                  setShowApproveModel(true);
                                                }}
                                              >
                                                <span className="">
                                                  {" "}
                                                  <CiViewList />
                                                </span>{" "}
                                                Approve User
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                onClick={() => {
                                                  setSelectedUser(user);
                                                  setShowRejectModel(true);
                                                }}
                                              >
                                                <CiViewList /> Reject User
                                              </Dropdown.Item>
                                            </Dropdown.Menu>
                                          </Dropdown> */}
                                        </td>
                                        
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
                                                    )}
                                                     
                                                    </div>
                                                    <PaginationContainer>
                            <ReactPaginate
                              previousLabel={"previous"}
                              nextLabel={"next"}
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

export default SAActiveUsersList;

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
    white-space: nowrap;
   
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
    /* background-color: #004aad0a; */
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0px 0px 1px #000;
  }

  .pagination li.active a {
    background-color: #004aad;
    color: white;
    border: 1px solid #004aad;
    border-radius: 5px;
  }

  .pagination li.disabled a {
    color: white;
    cursor: not-allowed;
    border-radius: 5px;
    background-color: #3a4e69;
    border: 1px solid #3a4e69;
  }

  .pagination li a:hover:not(.active) {
    background-color: #004aad;
    color: white;
    border-radius: 5px;
    border: 1px solid #004aad;
  }
`;