import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";

const ElectricityHistory = () => {
  const [allData, setAllData] = useState([]); // Store all data
  const [currentData, setCurrentData] = useState([]); // Data for current page
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages based on data length
  const [search, setSearch] = useState("");

  const fetchRechargeData = async () => {
    try {
      const response = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/getApiRechargeData`,
        {
          params: {
            mobile_no: search,
          },
        }
      );
      const data = response.data.data;
      const newdata = data.filter(
        (item) => item.recharge_Type === "Electricity"
      );
      setAllData(newdata); // Only setting filtered data
      setTotalPages(Math.ceil(newdata.length / limit));
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRechargeData();
  }, [search]);

  // Update currentData based on page
  useEffect(() => {
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    setCurrentData(allData.slice(startIdx, endIdx)); // Slice data for the current page
  }, [page, allData]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
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
                className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>Prepaid Recharge History</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          Electricity History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; Electricity History
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="d-flex flex-column flex-md-row gap-3">
                          <div className="col-12 col-md-4 col-lg-3">
                            <input
                              className="form-control"
                              id="floatingInputGroup1"
                              placeholder="Search by name"
                              value={search}
                              onChange={handleSearch}
                            />
                          </div>

                          <div className="d-flex">
                            <button
                              type="button"
                              className="btn btn-primary button px-4"
                              onClick={() => fetchRechargeData()}
                            >
                              Search
                            </button>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="table-responsive">
                            <table class="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Transaction ID</th>
                                  <th scope="col">Operator Order ID</th>
                                  <th scope="col">Operator Name</th>
                                  <th scope="col">Phone Number</th>
                                  <th scope="col">Details</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Debit</th>
                                  <th scope="col">Earning</th>
                                  <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentData.length > 0 ? (
                                  currentData.map((item) => (
                                    <tr key={item.id}>
                                      <td>{item.created_at}</td>
                                      <td>{item.transaction_id}</td>
                                      <td>{item.orderid}</td>
                                      <td>{item.operator_name}</td>
                                      <td>{item.mobile_no}</td>
                                      <td>{item.message}</td>
                                      <td>{item.amount}</td>
                                      <td></td>
                                      <td>{item.dr_amount}</td>
                                      <td>{item.status}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="10" className="text-center">
                                      No results found
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          {currentData.length > 0 && (
                            <div className="float-end">
                              <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                  <li
                                    className={`page-item ${
                                      page === 1 ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        setPage((prev) => Math.max(prev - 1, 1))
                                      }
                                      disabled={page === 1}
                                    >
                                      Previous
                                    </button>
                                  </li>
                                  <li className="page-item">
                                    <span className="page-link">{page}</span>
                                  </li>
                                  <li
                                    className={`page-item ${
                                      page === totalPages ? "disabled" : ""
                                    }`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() =>
                                        setPage((prev) => prev + 1)
                                      }
                                      disabled={page === totalPages}
                                    >
                                      Next
                                    </button>
                                  </li>
                                </ul>
                              </nav>
                            </div>
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
      </Wrapper>
    </>
  );
};

export default ElectricityHistory;

const Wrapper = styled.div`
  .main {
    height: 100%;
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
