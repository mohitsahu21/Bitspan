import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import { FaAddressCard, FaUser } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const SdBankAccountSetup = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [bankData, setBankData] = useState([]);
  const [formData, setFormData] = useState({
    bankholder_name: "",
    bankaccount_number: "",
    IFSC_code: "",
    bank_name: "",
    status: "Pending",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formData);

  const getBankDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7171/api/auth/superDistributor/getBankDetails/${user.userId}`
      );
      setBankData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBankDetails();
  }, []);

  console.log(bankData);

  const addBankDetails = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:7171/api/auth/superDistributor/addBankDetails/${user.userId}`,
        formData
      );
      alert("Bank details added successfully");
      setFormData({
        bankholder_name: "",
        bankaccount_number: "",
        IFSC_code: "",
        bank_name: "",
      });
      getBankDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = bankData?.slice(startIndex, startIndex + itemsPerPage);

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
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center ">
              <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5 me-md-5 p-0 pe-md-5 d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 mt-5 formdata">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Bank Details</h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Bank Details
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={addBankDetails}>
                    <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                      <div className="text-center">
                        <h5>Add New Bank Account</h5>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="name" className="form-label">
                          Bank Holder Name
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            name="bankholder_name"
                            value={formData.bankholder_name}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="name" className="form-label">
                          Bank Account Number/ UPI ID
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <FaAddressCard />
                          </span>
                          <input
                            type="text"
                            name="bankaccount_number"
                            value={formData.bankaccount_number}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter Bank Account Number/ UPI ID"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="name" className="form-label">
                          IFSC Code
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            {" "}
                            <MdEmail />
                          </span>
                          <input
                            type="text"
                            name="IFSC_code"
                            value={formData.IFSC_code}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter IFSC Code"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="name" className="form-label">
                          Bank Name
                        </label>
                        <div className="input-group flex-nowrap">
                          <span
                            className="input-group-text"
                            id="addon-wrapping"
                          >
                            <FaAddressCard />
                          </span>
                          <input
                            type="text"
                            name="bank_name"
                            value={formData.bank_name}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Enter Bank Name"
                          />
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="text-start mb-3">
                          <button className="btn p-2" type="submit">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="text-center">
                      <h5>All Your Listed Bank Account</h5>
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead className="table-dark">
                            <tr>
                              <th scope="col">Sr. No.</th>
                              <th scope="col">A/c Holder Name</th>
                              <th scope="col">Bank Account Number</th>

                              <th scope="col">IFSC Code</th>
                              <th scope="col">Bank Name</th>
                              <th scope="col">Status</th>
                              {/* <th scope="col"></th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedData?.map((item, index) => (
                              <>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.bankholder_name}</td>
                                  <td>{item.bankaccount_number}</td>
                                  <td>{item.IFSC_code}</td>
                                  <td>{item.bank_name}</td>
                                  <td>{item.status}</td>
                                  {/* <td>
                                <Link to={"/bank-account-setup/1/2"}>
                                  <button className="btn btn-primary btn-sm">
                                    Verify
                                  </button>
                                </Link>
                              </td> */}
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="float-end mt-2 mb-4">
                        <div>
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-warning"
                          >
                            Previous
                          </button>
                          <span> Page {currentPage} </span>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={
                              startIndex + itemsPerPage >= bankData.length
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
      </Wrapper>
    </>
  );
};

export default SdBankAccountSetup;

const Wrapper = styled.div`
  .main {
    height: 100%;
    width: 100%;
  }
  button {
    color: #fff;
    background: #6d70ff;
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
  @media (max-width: 576px) {
    .responsive-label {
      font-size: 0.5rem; /* Adjust as needed */
    }
  }
  @media (max-width: 768px) {
    .responsive-label {
      font-size: 1rem; /* Adjust as needed */
    }
  }
`;
