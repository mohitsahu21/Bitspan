import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown, Modal, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { MdGrid3X3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const NewDSC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    year: "",
    amount: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { year, amount, link } = formData;
    if (!year || !amount || !link) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:7777/api/auth/retailer/digitalSignaturePlan",
        "https://2kadam.co.in/api/auth/retailer/digitalSignaturePlan",
        {
          year,
          amount,
          link,
        }
      );

      if (response.data.status === "Success") {
        Swal.fire("Success", "Plan added successfully!", "success").then(() => {
          navigate("/digital-signature-plan");
        });

        setFormData({ year: "", amount: "", link: "" }); // Reset form
      } else {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Server Error",
        "Unable to add plan. Try again later.",
        "error"
      );
    }
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
                className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata "
              >
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          New DSC Plan
                        </h4>
                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            New DSC Plan
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="container ">
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                      <form
                        className="shadow p-4 bg-light rounded "
                        onSubmit={handleSubmit}
                      >
                        <h4 className="mb-4">Add Digital Signature Plan</h4>

                        <div className="mb-3">
                          <label className="form-label">Year</label>
                          <input
                            type="text"
                            className="form-control"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="Enter Year"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Link</label>
                          <input
                            type="text"
                            className="form-control"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="Enter Link"
                          />
                        </div>

                        <div className="d-flex justify-content-between">
                          <button type="submit" className="btn btn-primary">
                            Add Plan
                          </button>
                        </div>
                      </form>
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

export default NewDSC;

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
    white-space: nowrap;
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
