import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import SAViewPackageModel from "./SAViewPackageModel";
import SAEditPackageModel from "./SAEditPackageModel";
import { CiViewList } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const SAViewPackages = () => {
  const [showPackgeDetail, setShowPackgeDetail] = useState(false);
  const [editPackgeDetail, setEditPackgeDetail] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);

  
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getPackage"
      );
      setPackages(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching package data:", error);
      setLoading(false);
    }
  };
  console.log(selectedPackage?.id)

  
  const deletePackages = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const { data } = await axios.delete(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/deletePackage", 
            {
              data: { package_id: id }
            }
          );
          if (data.success) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: data.message,
              icon: "success"
            });
            fetchPackages();
          } else {
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: data.message || "An error occurred during the process. Please try again.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error deleting package:", error);
          swalWithBootstrapButtons.fire({
            title: "Error!",
            text: "An error occurred during the process. Please try again.",
            icon: "error"
          });
        } finally {
          setLoading(false);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your package is safe :)",
          icon: "error"
        });
      }
    });
  };
  

  // const deletePackages = async (id) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.delete(
  //       "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/deletePackage", {
  //           data: { package_id: id }
  //         }
  //     );
  //     if(data.success ){
  //       Swal.fire({
  //           icon: "success",
  //           title: data.message,
  //         });
  //         fetchPackages();

  //     }
  //     else if(!data.success){
  //       Swal.fire({
  //           icon: "error",
  //           title: data.message,
  //         });
  //     }
      
  //     setLoading(false);
  //     console.log(data)
  //   } catch (error) {
  //     console.error("Error fetching package data:", error);
  //     setLoading(false);
  //     Swal.fire({
  //       icon: "error",
  //       title: "An error occurred during the process. Please try again.",
  //     });
  //   }
  // };

  
  // useEffect(() => {
  
  //   fetchPackages();
  // }, []);

  useEffect(()=>{
    fetchPackages();
  },[isRefresh])

  const filteredItems = packages.filter(
    (row) =>
      (row?.package_name &&
        row.package_name
          .toLowerCase()
          .includes(keyword.trim().toLowerCase())) ||
      (row?.id && row.id.toString().includes(keyword.trim())) || (row?.package_for &&
        row.package_for
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()))
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
              <div
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata"
              >
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      {/* <div className="text-center">
                                                <h3>Wallet Transaction Report</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          View Commission Packages
                        </h4>
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
                          <div className="col-12 col-md-6 col-lg-6">
                            {/* <label for="fromDate" className="form-label"></label> */}
                            <input
                              id="fromDate"
                              className="form-control"
                              type="search"
                              placeholder="Search Packages"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                          </div>
                          {/* <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div> */}
                          {/* <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                            >
                              Search
                            </button>
                          </div> */}
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="table-responsive">
                            {loading ? (
                                <p>Loading...</p>
                            )
                            : (
                                <table className="table table-striped">
                                <thead className="table-dark">
                                  <tr>
                                    {/* <th scope="col">#</th> */}
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
                                  {showApiData && showApiData.length > 0 ? (
                                      showApiData?.map((pkg, index) => (
                                        <tr key={pkg.id}>
                                          {/* <th scope="row">{index + 1}</th> */}
                                          <td>{pkg.id}</td>
                                          <td>{pkg.created_at}</td>
                                          <td>{pkg.package_name}</td>
                                          <td>{pkg.package_for}</td>
                                          <td>
                                            <Dropdown>
                                              <Dropdown.Toggle
                                                variant="success"
                                                id={`dropdown-${pkg.id}`}
                                              >
                                                Action Button
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu>
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    setSelectedPackage(pkg);
                                                    setShowPackgeDetail(true);
                                                  }}
                                                >
                                                  <span className="">
                                                    {" "}
                                                    <CiViewList />
                                                  </span>{" "}
                                                  View
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    setSelectedPackage(pkg);
                                                    setEditPackgeDetail(true);
                                                  }}
                                                >
                                                  <FaEdit /> Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    setSelectedPackage(pkg);
                                                    deletePackages(pkg.id)
                                                    
                                                  }}
                                                >
                                                  <MdDelete /> Delete
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </td>
                                        </tr>
                                      ))
                                  ) : (
                                    <tr>
                                    <td colSpan="13">No data available</td>{" "}
                                    {/* Updated colSpan to match table columns */}
                                  </tr>
                                  )
                                   }
                                </tbody>
                              </table>
                            )
                        }
                          
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
                          {/* <div className="float-end">
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    Previous
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    1
                                  </a>
                                </li>

                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    Next
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </div> */}
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
          // size="lg"
          show={showPackgeDetail}
          fullscreen={true}
          onHide={() => setShowPackgeDetail(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPackage && (
              <SAViewPackageModel packages={selectedPackage} />
            )}
          </Modal.Body>
        </Modal>

        {/* Package details Model  end*/}

        {/*Edit Package details Model start*/}
        <Modal
          // size="lg"
          fullscreen={true}
          show={editPackgeDetail}
          onHide={() => setEditPackgeDetail(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPackage && (
              <SAEditPackageModel packages={selectedPackage} setEditPackgeDetail={setEditPackgeDetail} setIsRefresh={setIsRefresh}/>
            )}
          </Modal.Body>
        </Modal>

        {/*Edit Package details Model end*/}
      </Wrapper>
    </>
  );
};

export default SAViewPackages;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  .table-responsive {
    min-height: 200px;
  }
  .button {
    background: #6d70ff;
    border-color: #6d70ff;
  }
  .button:hover {
    background: #5356fa;
    border-color: #5356fa;
  }
  .form-container {
    width: 50%;
    margin: auto;
  }
  th {
    font-weight: 500;
    font-size: 14px;
  }
  td {
    font-size: 14px;
  }
  @media (min-width: 1025px) and (max-width: 1500px) {
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
