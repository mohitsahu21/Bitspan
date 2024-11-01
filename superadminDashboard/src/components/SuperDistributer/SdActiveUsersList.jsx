import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const SdActiveUsersList = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(user);
  const [userData, setUserData] = useState([]);

  const getAllSuperDistUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7171/api/auth/superDistributor/getAllUserSuperDist/${user.userId}`
      );
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSuperDistUser();
  }, []);

  console.log(userData);

  const filterData = userData.filter((item) => item.Status === "Active");
  console.log(filterData);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filterData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  console.log(paginatedData);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

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
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          All Active Users
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; All Active Users
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mx-4">
                    <div className="">
                      <label className="mt-5">
                        Items per page:
                        <select
                          value={itemsPerPage}
                          onChange={handleItemsPerPageChange}
                          className="mx-2"
                        >
                          <option value={1}>1</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary rounded  p-5 m-4">
                      <div className="row d-flex flex-column g-4">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">User ID</th>
                                  <th scope="col">User Name</th>
                                  <th scope="col">Role</th>
                                  <th scope="col">Contact</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">PAN Number</th>
                                  <th scope="col">Aadhar Number</th>
                                  <th scope="col">Business Name</th>
                                  <th scope="col">City</th>
                                  <th scope="col">State</th>
                                  <th scope="col">Pin Code</th>
                                  <th scope="col">Adadhar Front</th>
                                  <th scope="col">Aadhar Back</th>
                                  <th scope="col">PAN Card</th>
                                  <th scope="col">Website</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Note</th>
                                </tr>
                              </thead>
                              <tbody>
                                {paginatedData?.map((data, index) => (
                                  <>
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{data.UserId}</td>
                                      <td>{data.UserName}</td>
                                      <td>{data.role}</td>
                                      <td>{data.ContactNo}</td>
                                      <td>{data.Email}</td>
                                      <td>{data.PanCardNumber}</td>
                                      <td>{data.AadharNumber}</td>
                                      <td>{data.BusinessName}</td>
                                      <td>{data.City}</td>
                                      <td>{data.State}</td>
                                      <td>{data.PinCode}</td>
                                      <td>
                                        <a
                                          href={data.AadharFront}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View Document
                                        </a>
                                      </td>
                                      <td>
                                        <a
                                          href={data.AadharBack}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View Document
                                        </a>
                                      </td>
                                      <td>
                                        <a
                                          href={data.PanCardFront}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View Document
                                        </a>
                                      </td>
                                      <td>{data.created_By_Website}</td>
                                      <td>{data.Status}</td>
                                      <td>{data.Note}</td>
                                    </tr>
                                  </>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="float-end mt-2">
                            <div>
                              <button
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="btn btn-warning"
                              >
                                Previous
                              </button>
                              <span> Page {currentPage} </span>
                              <button
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                disabled={
                                  startIndex + itemsPerPage >= filterData.length
                                }
                                className="btn btn-warning"
                              >
                                Next
                              </button>
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
        </div>
      </Wrapper>
    </>
  );
};

export default SdActiveUsersList;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
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
    white-space: nowrap;
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
  a {
    text-decoration: none;
  }
`;
