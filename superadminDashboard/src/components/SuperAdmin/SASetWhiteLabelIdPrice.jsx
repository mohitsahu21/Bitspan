import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt, FaRupeeSign } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";

const SASetWhiteLabelIdPrice = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id : "",
    whiteLabel_id_price: "",
    whiteLabel_min_id_limit: "",
    whiteLabel_max_id_limit: "",
    superDistributor_id_price: "",
    superDistributor_min_id_limit: "",
    superDistributor_max_id_limit: "",
    distributor_id_price: "",
    distributor_min_id_limit: "",
    distributor_max_id_limit: "",
    retailer_id_price: "",
    retailer_min_id_limit: "",
    retailer_max_id_limit: "",
  });

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserIdPriceList"
      );
      setData(data.data);
      setFormData({
        id : data.data.id,
        whiteLabel_id_price: data.data.whiteLabel_id_price,
        whiteLabel_min_id_limit: data.data.whiteLabel_min_id_limit,
        whiteLabel_max_id_limit: data.data.whiteLabel_max_id_limit,
        superDistributor_id_price: data.data.superDistributor_id_price,
        superDistributor_min_id_limit: data.data.superDistributor_min_id_limit,
        superDistributor_max_id_limit: data.data.superDistributor_max_id_limit,
        distributor_id_price: data.data.distributor_id_price,
        distributor_min_id_limit: data.data.distributor_min_id_limit,
        distributor_max_id_limit: data.data.distributor_max_id_limit,
        retailer_id_price: data.data.retailer_id_price,
        retailer_min_id_limit: data.data.retailer_min_id_limit,
        retailer_max_id_limit: data.data.retailer_max_id_limit,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    const {data} =  await axios.put(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/updateUserIdPrice",
        formData
      );
      console.log(data)
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Data updated successfully!",
        });
        setLoading(false);
      }
      else{
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
        setLoading(false);
      }
      
      
      
    } catch (error) {
      console.error(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "An error occurred during the process. Please try again.",
      });
    }
    };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);
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
                    <form onSubmit={handleSubmit}>
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-start">
                        <h3>Raise Complaint</h3>
                      </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="px-lg-3">Set User ID Price</h4>

                        <p className="mx-lg-5">
                          {" "}
                          <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                          <span
                            className="text-body-secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            Set User ID Price
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 shadow bg-body-tertiary rounded m-4 px-3">
                    <div className="text-center my-5">
                      <h2>Set User ID Price</h2>
                    </div>

                    <div>
                      <h4>Set White Label Price</h4>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" className="form-label">
                        Enter White Label Id Price
                      </label>
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="whiteLabel_id_price"
                          value={formData.whiteLabel_id_price || ""}
                          className="form-control"
                          onChange={handleChange}
                          required
                          pattern="^[0-9]*$"
                          title="Price should be digits Only"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter White Label Minimum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="whiteLabel_min_id_limit"
                          value={formData.whiteLabel_min_id_limit || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="should be digits Only"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter White Label Maximum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text" 
                          name="whiteLabel_max_id_limit"
                          value={formData.whiteLabel_max_id_limit || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="should be digits Only"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4>Set Super Distributor Price</h4>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Super Distributor Id Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="superDistributor_id_price"
                          value={formData.superDistributor_id_price || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="Price should be digits Only"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Super Distributor Minimum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="superDistributor_min_id_limit"
                          value={formData.superDistributor_min_id_limit || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="should be digits Only"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Super Distributor Maximum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="superDistributor_max_id_limit"
                          value={formData.superDistributor_max_id_limit || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="should be digits Only"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4>Set Distributor Price</h4>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Distributor Id Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="distributor_id_price"
                          value={formData.distributor_id_price || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="Price should be digits Only"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Distributor Minimum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="distributor_min_id_limit"
                          value={formData.distributor_min_id_limit || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="should be digits Only"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Distributor Maximum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="distributor_max_id_limit"
                          value={formData.distributor_max_id_limit || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="should be digits Only"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4>Set Retailer Price</h4>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Retailer Id Price
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="retailer_id_price"
                          value={formData.retailer_id_price || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="Price should be digits Only"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Retailer Minimum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="retailer_min_id_limit"
                          value={formData.retailer_min_id_limit || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="should be digits Only"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <label for="name" class="form-label">
                        Enter Retailer Maximum Id limit
                      </label>
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">
                          {" "}
                          <FaRupeeSign />
                        </span>
                        <input
                          type="text"
                          name="retailer_max_id_limit"
                          value={formData.retailer_max_id_limit || ""}
                          className="form-control"
                          onChange={handleChange}
                          pattern="^[0-9]*$"
                          title="should be digits Only"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="text-center mb-5 mt-3">
                        <button type="submit" className="btn p-2" disabled={loading}>{loading ? "Loading..." : "Submit" }</button>
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SASetWhiteLabelIdPrice;

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
`;
