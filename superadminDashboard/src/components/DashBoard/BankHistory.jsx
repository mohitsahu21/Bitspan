import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";

const BankHistory = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);

  const [getData, setGetData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchBankHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7777/api/auth/retailer/getAllBranchId`
        );
        setGetData(response.data);
        setFilterData(
          response.data.filter((item) => item.user_id === currentUser.userId)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchBankHistory();
  }, [currentUser.userId]);

  console.log(filterData);
  console.log(getData);

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Bank ID History</h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Bank ID History
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <div className="border border-danger rounded shadow-sm mb-3">
                      <h2 className="text-center m-0 px-5 py-3">
                        Bank ID History
                      </h2>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            <table class="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Sr.No</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Father Name</th>
                                  <th scope="col">Mother Name</th>
                                  <th scope="col">Mobile Number</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Service</th>
                                  <th scope="col">Aadhar No.</th>
                                  <th scope="col">Pan No.</th>
                                  <th scope="col">Business</th>
                                  <th scope="col">Photo</th>
                                  <th scope="col">KYC</th>
                                  <th scope="col">Passbook</th>
                                  <th scope="col">Shop Photo</th>
                                  <th scope="col">Eletricity Bill</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Note</th>
                                  {/* <th scope="col">Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {filterData.length > 0 ? (
                                  filterData.map((data, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{data.applicant_name}</td>
                                      <td>{data.applicant_father}</td>
                                      <td>{data.applicant_mother}</td>
                                      <td>{data.applicant_number}</td>
                                      <td>{data.email}</td>
                                      <td>{data.select_bank_service}</td>
                                      <td>{data.aadhar_card}</td>
                                      <td>{data.pan_card}</td>
                                      <td>{data.business_name}</td>
                                      <td>
                                        <a
                                          href={data.attached_photo}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View
                                        </a>
                                      </td>
                                      <td>
                                        {data?.attached_kyc
                                          ?.split(",")
                                          ?.map((kycurl, kycindx) => (
                                            <div key={kycindx}>
                                              <a
                                                href={kycurl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                View {kycindx + 1}
                                              </a>
                                            </div>
                                          ))}
                                      </td>
                                      <td>
                                        <a
                                          href={data.bank_passbook}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View
                                        </a>
                                      </td>
                                      <td>
                                        <a
                                          href={data.shop_photo}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View
                                        </a>
                                      </td>
                                      <td>
                                        <a
                                          href={data.electric_bill}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          View
                                        </a>
                                      </td>
                                      <td>{data.status}</td>
                                      <td>{data.note}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <p>No data available for this user.</p>
                                )}
                              </tbody>
                            </table>
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

export default BankHistory;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
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
  table {
    overflow-x: scroll;
  }
  th {
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
  }
  td {
    font-size: 14px;
    white-space: nowrap;
  }
  a {
    text-decoration: none;
  }
`;
