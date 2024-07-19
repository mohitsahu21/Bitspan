import React, { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";

const AllPanForm = () => {
  const [formData, setFormData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/auth/retailer/getApplyOfflineForm`
      );
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
                          View All Offline History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; View All Offline History{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="fromDate" className="form-label">
                              From
                            </label>
                            <input
                              id="fromDate"
                              className="form-control"
                              type="date"
                            />
                          </div>
                          <div className="col-12 col-md-4 col-lg-3">
                            <label for="toDate" className="form-label">
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
                          <div className="col-12 col-md-4 col-lg-3 d-flex align-items-end">
                            <DropdownButton
                              id="dropdown-basic-button"
                              title="Status"
                            >
                              <Dropdown.Item href="#">Approve</Dropdown.Item>
                              <Dropdown.Item href="#">Reject</Dropdown.Item>
                              <Dropdown.Item href="#">Pending</Dropdown.Item>
                            </DropdownButton>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            <table class="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Sr.No</th>
                                  <th scope="col">Applicant Name</th>
                                  <th scope="col">Applicant Father Name</th>
                                  <th scope="col">Applicant Number</th>
                                  <th scope="col">Service</th>
                                  <th scope="col">other</th>
                                  <th scope="col">View Form</th>
                                  <th scope="col">View Photo</th>
                                  <th scope="col">View Signature</th>
                                  <th scope="col">View KYC</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Note</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formData.map((item, index) => (
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.applicant_name}</td>
                                    <td>{item.applicant_father}</td>
                                    <td>{item.applicant_number}</td>
                                    <td>{item.applicant_select_service}</td>
                                    <td>{item.other}</td>
                                    <td>
                                      <a
                                        href={item.attached_form}
                                        target="_blank"
                                      >
                                        View Form
                                      </a>
                                    </td>
                                    <td>
                                      <a href={item.attached_photo}>
                                        View Photo
                                      </a>
                                    </td>
                                    <td>
                                      <a href={item.attached_sign}>View Sign</a>
                                    </td>
                                    <td>
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
                                    </td>
                                    <td>{item.status}</td>
                                    <td>{item.note}</td>
                                  </tr>
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

export default AllPanForm;

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
  table {
    overflow-x: scroll;
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
