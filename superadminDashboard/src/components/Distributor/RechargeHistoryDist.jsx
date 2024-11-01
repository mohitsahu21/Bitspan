import axios from "axios";
import { useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import styled from "styled-components";

const RechargeHistoryDist = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [offData, setOffData] = useState([]);
  console.log(user);

  const getOfflineData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7171/api/auth/superDistributor/getRechargeOfflineFormDetails/${user.userId}`
      );
      setOffData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOfflineData();
  }, []);

  console.log(offData);

  const filterByDate =
    fromDate && toDate
      ? offData?.filter((data) => {
          const transactionDate = new Date(data.created_at?.split(" ")[0]);
          const startDate = new Date(fromDate);
          const endDate = new Date(toDate);

          return transactionDate >= startDate && transactionDate <= endDate;
        })
      : offData;

  console.log(filterByDate);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filterByDate?.slice(
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
            <div className="row flex-wrap justify-content-lg-center justify-content-center ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10 col-sm-10 col-11 mt-5 formdata ">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          View Offline Recharge History
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp; View Offline Recharge
                          History{" "}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                      <div className="row d-flex flex-column g-4">
                        <div className="row">
                          <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-6 col-sm-12 col-12 d-flex flex-column flex-md-row gap-3">
                            <div className="col-12 col-md-4 col-lg-3">
                              <label className="form-label">From</label>
                              <input
                                className="form-control"
                                onChange={(e) => setFromDate(e.target.value)}
                                value={fromDate}
                                type="date"
                              />
                            </div>
                            <div className="col-12 col-md-4 col-lg-3">
                              <label className="form-label">To</label>
                              <input
                                className="form-control"
                                onChange={(e) => setToDate(e.target.value)}
                                value={toDate}
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
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
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

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th scope="col">ID</th>
                                  <th scope="col">Mobile Number</th>
                                  <th scope="col">Operator Name</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Order ID</th>
                                  <th scope="col">Recharge Type</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Note</th>
                                </tr>
                              </thead>
                              <tbody>
                                {paginatedData.map((data, index) => (
                                  <>
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{data.mobile_no}</td>
                                      <td>{data.operator_name}</td>
                                      <td>{data.amount}</td>
                                      <td>{data.orderid}</td>
                                      <td>{data.recharge_Type}</td>
                                      <td>{data.status}</td>
                                      <td>{data.note}</td>
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
                                  startIndex + itemsPerPage >=
                                  filterByDate.length
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

export default RechargeHistoryDist;

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
