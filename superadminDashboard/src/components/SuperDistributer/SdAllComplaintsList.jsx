import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";

const SdAllComplaintsList = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [complaintList, setComplaintList] = useState([]);

  const getComplaintList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7171/api/auth/superDistributor/getAllComplaintsById/${user.userId}`
      );
      setComplaintList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComplaintList();
  }, []);

  console.log(complaintList);

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-lg-center justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>Complaint Raised List</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Complaint Raised List
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Complaint Raised List{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <label htmlFor="fromDate" className="form-label">
                              From
                            </label>
                            <input
                              id="fromDate"
                              className="form-control"
                              type="date"
                            />
                          </div>
                          <div className="col-12 col-md-4 col-lg-3">
                            <label htmlFor="toDate" className="form-label">
                              To
                            </label>
                            <input
                              id="toDate"
                              className="form-control "
                              type="date"
                            />
                          </div>
                          <div className="d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-primary button"
                            >
                              Search
                            </button>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Complaint ID</th>
                                  <th scope="col">Ticket Raised Date</th>
                                  <th scope="col">Complaint Type</th>
                                  <th scope="col">Remark</th>
                                  <th scope="col">Transaction No.</th>
                                  <th scope="col">Complain File</th>
                                  <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {complaintList?.map((data, index) => (
                                  <>
                                    <tr>
                                      <th scope="row">{data.id}</th>
                                      <td>{data.createdAt}</td>
                                      <td>{data.complainType}</td>
                                      <td>{data.remark}</td>
                                      <td>{data.transactionNo}</td>
                                      <td>
                                        <a
                                          href={data.complainFile}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View Document
                                        </a>
                                      </td>
                                      <td>{data.status}</td>
                                    </tr>
                                  </>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="float-end">
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

export default SdAllComplaintsList;

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
