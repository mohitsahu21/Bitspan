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


// Active component start//
const SAActiveApi = ({ complaint, setShowActiveModel, setIsRefresh }) => {
    const [loading, setLoading] = useState(false);
  
    const [formData, setFormData] = useState({
      id: complaint.id,
      status : "Active"
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
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/ActiveServices",
          // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
          formData
        );
        console.log(response);
        setLoading(false);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Active Service Successfully",
          });
          setShowActiveModel(false);
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
                  Id
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
                    value={complaint.id}
                    onChange={handleChange}
                    disabled
                    required
                  />
                </div>
              </div>
            
              <div className="mt-3">
                <label for="name" class="form-label">
                  Service Name
                </label>
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping">
                    {" "}
                    <MdGrid3X3 />
                  </span>
                  <input
                    type="text"
                    name="response"
                    class="form-control"
                    placeholder="Enter Note"
                    value={complaint.service_name}
                    required
                  />
                </div>
              </div>
              <div className="mt-3">
                <label for="name" class="form-label">
                 Service For
                </label>
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping">
                    {" "}
                    <MdGrid3X3 />
                  </span>
                  <input
                    type="text"
                    name="response"
                    class="form-control"
                    placeholder="Enter Note"
                    value={complaint.service_for}
                    
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


  // Active component end//

  // Deactive component start//
const SADeactiveApi = ({ complaint, setShowDeactiveModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: complaint.id,
      status : "Deactive"
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
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/DeactiveServices",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
        formData
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deactive Service Successfully",
        });
        setShowDeactiveModel(false);
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
                  Id
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
                    value={complaint.id}
                    onChange={handleChange}
                    disabled
                    required
                  />
                </div>
              </div>
            
              <div className="mt-3">
                <label for="name" class="form-label">
                Services Name
                </label>
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping">
                    {" "}
                    <MdGrid3X3 />
                  </span>
                  <input
                    type="text"
                    name="response"
                    class="form-control"
                    placeholder="Enter Note"
                    value={complaint.service_name}
                    required
                  />
                </div>
              </div>
              <div className="mt-3">
                <label for="name" class="form-label">
                 Services For
                </label>
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping">
                    {" "}
                    <MdGrid3X3 />
                  </span>
                  <input
                    type="text"
                    name="response"
                    class="form-control"
                    placeholder="Enter Note"
                    value={complaint.service_for}
                    
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


// Deactive component end//





const SAActiveDeactiveServices = () => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const complaintsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [Status, setStatus] = useState(""); // For user type filter
    const [ShowDeactiveModel, setShowDeactiveModel] = useState(false);
    const [showActiveModel,setShowActiveModel] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false);
    const [selectedComplaint,setSelectedComplaint] = useState("")


    const fetchComplaints = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getAllServicesList"
          );
          setUsers(data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchComplaints();
      }, []);

      useEffect(() => {
        fetchComplaints();
      }, [isRefresh]);

      const filteredItems = users.filter(
        (row) =>{ 
          const matchesKeyword =  (row?.service_name &&
            row.service_name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
          (row?.service_for && row.service_for.toLowerCase().includes(keyword.trim().toLowerCase())) 

              const matchesType = !Status || Status === "---Select Status---" || row.status	 === Status;
              return matchesKeyword && matchesType;
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
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Activate/Deactivate Services</h4>
                                                <p className="mx-lg-5">
                                                    {" "}
                                                    <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                                                    <span
                                                        className="text-body-secondary"
                                                        style={{ fontSize: "13px" }}
                                                    >
                                                        {" "}
                                                        Activate/Deactivate Services
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
                                                         placeholder="Enter Service Name/Service For"
                                                         value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                                                         />
                                                    </div>
                                                    <div className="col-12 col-md-12 col-lg-12 col-xl-3">
                                                        
                                                  
                                                        {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                                                        <select
                                                          className="form-select"
                                                          aria-label="Default select example"
                                                          value={Status}
                                                          onChange={(e) => setStatus(e.target.value)}
                                                          
                                                        >
                                                          <option selected>---Select Status---</option>
                                                          <option value="Active">Active</option>
                                                          <option value="Deactive">Deactive</option>
                                                      
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

                                                                    <th scope="col">Service Id</th>
                                                                    <th scope="col">Service Name</th>

                                                                    <th scope="col">Service For</th>
                                                                    <th scope="col">Service Type</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Action</th>


                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            
                                                            {showApiData && showApiData.length > 0 ? (
                                        showApiData?.map((user, index) => (
                                          <tr key={user.id}>
                                            {/* <th scope="row">{index + 1}</th> */}
                                            <th scope="row">{user.id}</th>
                                           
                                            <td>{user.service_name}</td>
                                            <td>{user.service_for}</td>
                                            <td>{user.service_type}</td>
                                            <td>{user.status}</td>
                                            
    
                                       
                                            <td>
                                            { user.status	 === "Active" && 
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
                                                      setShowDeactiveModel(true)
                                                      setSelectedComplaint(user)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                 Deactive
                                                  </Dropdown.Item>
                                                  
                                                
                                             
                                                </Dropdown.Menu>
                                              </Dropdown>
}

{ user.status	 === "Deactive" && 
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
                                                      setShowActiveModel(true)
                                                      setSelectedComplaint(user)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                 Active
                                                  </Dropdown.Item>
                                                  
                                                
                                             
                                                </Dropdown.Menu>
                                              </Dropdown>
}
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
                                                        </>
                                                    )}
                                                       
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

                      {/* Active Model  start*/}

        <Modal
          // size="lg"
          show={showActiveModel}
          //   fullscreen={true}
          onHide={() => setShowActiveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Active Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedComplaint && <SAActiveApi complaint={selectedComplaint} setShowActiveModel={setShowActiveModel}  setIsRefresh={setIsRefresh}/>}
          </Modal.Body>
        </Modal>

        {/*  Active Model  end*/}

                      {/* Deactive Model  start*/}

        <Modal
          // size="lg"
          show={ShowDeactiveModel}
          //   fullscreen={true}
          onHide={() => setShowDeactiveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Deactive Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedComplaint && <SADeactiveApi complaint={selectedComplaint} setShowDeactiveModel={setShowDeactiveModel}  setIsRefresh={setIsRefresh}/>}
          </Modal.Body>
        </Modal>

        {/*  Deactive  Model  end*/}
            </Wrapper>
        </>
    );
}

export default SAActiveDeactiveServices

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
