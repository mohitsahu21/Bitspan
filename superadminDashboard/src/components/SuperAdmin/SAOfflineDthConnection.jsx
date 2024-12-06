
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt,FaRupeeSign  } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown,Modal, Spinner } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdGrid3X3 } from "react-icons/md";


//  approve model component start//
const SAApproveModel = ({ item, setShowApproveModel, setIsRefresh }) => {
    const [loading, setLoading] = useState(false);
  
    const [formData, setFormData] = useState({
      order_id: item.orderid,
      note : "",
      status : "Approve"
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
  
    const handlesubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.put(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/ApproveOfflineDTHConnection",
          // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
          formData
        );
        console.log(response);
        setLoading(false);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Approve Form Successfully",
          });
          setShowApproveModel(false);
          setIsRefresh((value) => !value);
        } else {
          Swal.fire({
            icon: "error",
            title: "An error occurred during the process. Please try again.",
          });
        }
      } catch (error) {
        console.error("There was an error submitting the form!", error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    };
    return (
      <>
        <div>
          
            <form onSubmit={handlesubmit}>
              <div className="">
                <label for="name" class="form-label">
                  Order Id
                </label>
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping">
                    {" "}
                    <MdGrid3X3 />
                  </span>
                  <input
                    type="text"
                    name="package_name"
                    class="form-control"
                    placeholder="Enter Package Name"
                    value={item.orderid}
                    onChange={handleChange}
                    disabled
                    required
                  />
                </div>
              </div>
            
              <div className="mt-3">
                <label for="name" class="form-label">
                  Enter Note
                </label>
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping">
                    {" "}
                    <MdGrid3X3 />
                  </span>
                  <input
                    type="text"
                    name="note"
                    class="form-control"
                    placeholder="Enter Note"
                    value={formData.note}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
             
  
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="text-center  m-5">
                  <button type="submit" className="btn p-2" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
        </div>
      </>
    );
  };


  //  approve model component end//


  //  reject model component start//
const SARejectModel = ({ item, setShowRejectModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    order_id: item.orderid,
    note : "",
    status : "Reject"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/rejectOfflineDTHConnection",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
        formData
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Reject Form Successfully",
        });
        setShowRejectModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "An error occurred during the process. Please try again.",
      });
    }
  };
  return (
    <>
      <div>
        
          <form onSubmit={handlesubmit}>
            <div className="">
              <label for="name" class="form-label">
                Order Id
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  name="package_name"
                  class="form-control"
                  placeholder="Enter Package Name"
                  value={item.orderid}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
            </div>
          
            <div className="mt-3">
              <label for="name" class="form-label">
                Enter Note
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  name="note"
                  class="form-control"
                  placeholder="Enter Note"
                  value={formData.note}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
           

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="text-center  m-5">
                <button type="submit" className="btn p-2" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
      </div>
    </>
  );
};


//  reject model component end//



const SAOfflineDthConnection = () => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const complaintsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [formStatus, setFormStatus] = useState(""); // For user type filter
    const [ShowApproveModel, setShowApproveModel] = useState(false);
    const [ShowRejectModel, setShowRejectModel] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [selectedItem,setSelectedItem] = useState("")


    const fetchOfflineForm = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getOfflineDTHConnection"
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
          const matchesKeyword =  (row?.first_name &&
            row.first_name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
          (row?.number && row.number.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.UserName &&
              row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
            (row?.orderid &&
              row.orderid.toLowerCase().includes(keyword.trim().toLowerCase()))

              const matchesType = !formStatus || formStatus === "---Select Form Status---" || row.status === formStatus;
              return matchesKeyword && matchesType ;
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
      

    //   const deactivateUser = async (id) => {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //       customClass: {
    //         confirmButton: "btn btn-success",
    //         cancelButton: "btn btn-danger"
    //       },
    //       buttonsStyling: false
    //     });
      
    //     swalWithBootstrapButtons.fire({
    //       title: "Are you sure?",
    //       // text: "You won't be able to revert this!",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonText: "Yes, deactive it!",
    //       cancelButtonText: "No, cancel!",
    //       reverseButtons: true
    //     }).then(async (result) => {
    //       if (result.isConfirmed) {
    //         setLoading(true);
    //         try {
    //           const { data } = await axios.put(
    //             "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/deactivateUser", 
    //             {
    //                userId: id 
    //             }
    //           );
    //           if (data.success) {
    //             swalWithBootstrapButtons.fire({
    //               title: "Deactivated!",
    //               text: data.message,
    //               icon: "success"
    //             });
    //            fetchActiveUsers();
    //           } else {
    //             swalWithBootstrapButtons.fire({
    //               title: "Error!",
    //               text: data.message || "An error occurred during the process. Please try again.",
    //               icon: "error"
    //             });
    //           }
    //         } catch (error) {
    //           console.error("Error deactivate user:", error);
    //           swalWithBootstrapButtons.fire({
    //             title: "Error!",
    //             text: "An error occurred during the process. Please try again.",
    //             icon: "error"
    //           });
    //         } finally {
    //           setLoading(false);
    //         }
    //       } else if (result.dismiss === Swal.DismissReason.cancel) {
    //         swalWithBootstrapButtons.fire({
    //           title: "Cancelled",
    //           text: "Your user is safe :)",
    //           icon: "error"
    //         });
    //       }
    //     });
    //   };
  console.log(users)
    
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
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Offline DTH Connection history</h4>
                                                <p className="mx-lg-5">
                                                    {" "}
                                                    <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                                                    <span
                                                        className="text-body-secondary"
                                                        style={{ fontSize: "13px" }}
                                                    >
                                                        {" "}
                                                        Offline DTH Connection history
                                                    </span>{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                                        <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                                            <div className="row d-flex flex-column g-4">

                                                <div className="d-flex flex-column flex-xl-row gap-3">
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

                                                    <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                                                        {/* <label for="fromDate" className="form-label">From</label> */}
                                                        <input id="fromDate" 
                                                        className="form-control"
                                                         type="search"
                                                         placeholder="Enter Applicant Name/Mobile/Order Id/User Name"
                                                         value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                                                         />
                                                    </div>
                                                    <div className="col-12 col-md-12 col-lg-12 col-xl-3">
                                                        
                                                  
                                                        {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                                                        <select
                                                          className="form-select"
                                                          aria-label="Default select example"
                                                          value={formStatus}
                                                          onChange={(e) => setFormStatus(e.target.value)}
                                                          
                                                        >
                                                          <option selected>---Select Form Status---</option>
                                                          <option value="Pending">Pending</option>
                                                          <option value="Approve">Approve</option>
                                                          <option value="Reject">Reject</option>
                                                      
                                                        </select>
                                                     
                                                                                </div>

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
                                                             <th scope="col">Sr.No</th>
                                                             <th scope="col">Created Date</th>
                                <th scope="col">Order Id</th>
                                <th scope="col">first_name</th>
                                <th scope="col">last_name</th>
                                  <th scope="col">full_address</th>
                                  <th scope="col">postal_code</th>
                                  <th scope="col">number</th>
                                  <th scope="col">amount</th>
                                  <th scope="col">Description</th>
                                  <th scope="col">User Id</th>
                                  <th scope="col">User Name</th>
                                  <th scope="col">User Mobile</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Note</th>
                                  <th scope="col">Action</th>
                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                            
                                                            {showApiData && showApiData.length > 0 ? (
                                        showApiData?.map((item, index) => (
                                          <tr key={index}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{item.created_at}</td>
                                          <td>{item.orderid}</td>
                                          <td>{item.first_name}</td>
                                          <td>{item.last_name}</td>
                                          <td>{item.full_address}</td>
                                          <td>{item.postal_code}</td>
                                          <td>{item.number}</td>
                                          <td>{item.amount}</td>
                                          <td>{item.message}</td>
                                         
                                          {/* <td>
                                            <a
                                              href={item.attached_photo}
                                              target="_blank"
                                            >
                                              View Photo
                                            </a>
                                          </td> */}
                                          {/* <td>
                                            <a
                                              href={item.attached_sign}
                                              target="_blank"
                                            >
                                              View Sign
                                            </a>
                                          </td> */}
                                          {/* <td>
                                            {item.documentUpload	
                                              ?.split(",")
                                              ?.map((kycurl, kycindx) => (
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
                                          {/* <td>
                                            <a
                                              href={item.bank_passbook}
                                              target="_blank"
                                            >
                                              View Passbook
                                            </a>
                                          </td>
                                          <td>
                                            <a
                                              href={item.shop_photo}
                                              target="_blank"
                                            >
                                              View Shop Photo
                                            </a>
                                          </td>
                                          <td>
                                            <a
                                              href={item.electric_bill}
                                              target="_blank"
                                            >
                                              View Electricity Bill
                                            </a>
                                          </td> */}
                                          <td>{item.user_id}</td>
                                          <td>{item.UserName}</td>
                                          <td>{item.ContactNo}</td>
                                          <td>{item.status}</td>
                                          <td>{item.note}</td>
                                          <td>
                                            { (item.status === "Pending") && 
                                              <Dropdown>
                                                <Dropdown.Toggle
                                                  variant="success"
                                                  // id={`dropdown-${user.id}`}
                                                  as="span" style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                                                  className="custom-dropdown-toggle"
                                                >
                                                 <PiDotsThreeOutlineVerticalBold />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                 
                                                    <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowApproveModel(true)
                                                      setSelectedItem(item)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Approve
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowRejectModel(true)
                                                      setSelectedItem(item)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Reject
                                                  </Dropdown.Item>
                                                
                                             
                                                </Dropdown.Menu>
                                              </Dropdown>
}

                                            </td>
                                        </tr>


//                                           <tr key={user.id}>
//                                             {/* <th scope="row">{index + 1}</th> */}
//                                             <th scope="row">{user.id}</th>
//                                             <td>{user.createdAt}</td>
//                                             <td>{user.complainType}</td>
//                                             <td>{user.mobileNo}</td>
//                                             <td>{user.remark}</td>
//                                             <td>{user.transactionNo}</td>
    
//                                             <td>{user.userID}</td>
    
//                                             <td>{user.UserName}</td>
//                                             <td>{user.role}</td>
//                                             <td>{user.Email}</td>
//                                             <td>{user.ContactNo}</td>
                                        
    
//                                             {/* <td>
//                                             {item.attached_kyc
//                                                 .split(",")
//                                                 .map((kycurl, kycindx) => (
//                                                   <div key={kycindx}>
//                                                     <a
//                                                       href={kycurl}
//                                                       target="_blank"
//                                                       rel="noopener noreferrer"
//                                                     >
//                                                       View KYC {kycindx + 1}
//                                                     </a>
//                                                   </div>
//                                                 ))}
//                                           </td> */}
//                                             <td>
//                                               <a
//                                                 href={user.complainFile}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                               >
//                                                 View
//                                               </a>
//                                             </td>
//                                             {/* <td>
//                                               <a
//                                                 href={user.AadharBack}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                               >
//                                                 View
//                                               </a>
//                                             </td>
//                                             <td>
//                                               <a
//                                                 href={user.PanCardFront}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                               >
//                                                 View
//                                               </a>
//                                             </td> */}
                                           
//                                             {/* <td> <Link to={'/change-price'}>Change Price </Link></td> */}
//                                             {/* <td>{user?.Note}</td> */}
//                                             <td>{user.response}</td>
//                                             <td>{user.status}</td>
//                                             <td>
//                                             { user.status === "Pending" && 
//                                               <Dropdown>
//                                                 <Dropdown.Toggle
//                                                   variant="success"
//                                                   // id={`dropdown-${user.id}`}
//                                                   as="span" style={{ border: 'none', background: 'none', cursor: 'pointer' }}
//                                                   className="custom-dropdown-toggle"
//                                                 >
//                                                  <PiDotsThreeOutlineVerticalBold />
//                                                 </Dropdown.Toggle>
//                                                 <Dropdown.Menu>
                                                 
//                                                     <Dropdown.Item
//                                                     onClick={() => {
//                                                       // setSelectedUser(user);
//                                                       setShowResolveModel(true)
//                                                       setSelectedComplaint(user)
//                                                     //   deactivateUser(user.UserId)
//                                                     }}
//                                                   >
//                                                     <span className="">
//                                                       {" "}
//                                                       <CiViewList />
//                                                     </span>{" "}
//                                                     Mark Resolve
//                                                   </Dropdown.Item>
                                                  
                                                
                                             
//                                                 </Dropdown.Menu>
//                                               </Dropdown>
// }
//                                             </td>
                                            
//                                           </tr>
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

                      {/* Approve  Model  start*/}

        <Modal
          // size="lg"
          show={ShowApproveModel}
          //   fullscreen={true}
          onHide={() => setShowApproveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Approve Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && <SAApproveModel item={selectedItem} setShowApproveModel={setShowApproveModel}  setIsRefresh={setIsRefresh}/>}
          </Modal.Body>
        </Modal>

        {/*  Approve Model  end*/}

             {/* Reject Model  start*/}

             <Modal
          // size="lg"
          show={ShowRejectModel}
          //   fullscreen={true}
          onHide={() => setShowRejectModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Reject Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && <SARejectModel item={selectedItem} setShowRejectModel={setShowRejectModel}  setIsRefresh={setIsRefresh}/>}
          </Modal.Body>
        </Modal>

        {/*  Reject Model  end*/}
            </Wrapper>
        </>
    );
}

export default SAOfflineDthConnection

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
