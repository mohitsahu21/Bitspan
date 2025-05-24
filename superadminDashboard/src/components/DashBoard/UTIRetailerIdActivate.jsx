import axios from "axios";
import React, { useState, useEffect } from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
// import { clearUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const UTIRetailerIdActivate = () => {
  // const [formdata, setFormdata] = useState(
  //   {
  //     name: "John Promith",
  //     agent_id: "PAN01008",
  //     mobile: "9150003651",
  //     email_id: "abc@gamil.com",
  //     address: "New Town",
  //     state: "West Bengal",
  //     city: "24 Paraganas",
  //     pincode: "700012",
  //     pan_no: "ABCDE1234Q",
  //     aadhaar_no: "123412341235"
  //   }
  // )
  const { currentUser, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: currentUser?.username,
    agent_id: currentUser?.userId,
    mobile: currentUser?.ContactNo,
    email_id: currentUser?.email,
    address: currentUser?.City,
    state: currentUser?.State,
    city: currentUser?.City,
    pincode: currentUser?.PinCode,
    pan_no: currentUser?.PanCardNumber,
    aadhaar_no: currentUser?.AadharNumber,
  });
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        // 'https://2kadam.co.in/api/auth/nsdlpan/easySmartUtiAgentOnbording',
        "https://2kadam.co.in/api/auth/nsdlpan/easySmartUtiAgentOnbording",
        // 'https://2kadam.co.in/api/auth/zlink/zlinkUtiAgentOnbording',

        formdata
      );
      setLoading(false);
      console.log(data);
      if (data.status == "Success" && data.data.status == "Failed") {
        Swal.fire({
          icon: "info",
          title: "Details",
          text: data.data.message,
        });
      } else if (data.status == "Success" && data.data.status == "Success") {
        Swal.fire({
          icon: "success",
          title: "Details",
          text: data.data.message,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Details",
          text: data.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Wrapper>
        {/* <HeadBar /> */}
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-wrap justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div
                className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata"
              >
                <div className="main shadow-none">
                  <div className="row shadow-none">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">
                          UTI User ID Activate
                        </h4>
                        <h6 className="mx-lg-5">
                          <BiHomeAlt /> &nbsp;/ &nbsp;UTI User ID Activate{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12 shadow bg-body-tertiary  rounded  p-5 m-4">
                      <div className="text-start">
                        <button
                          className="btn p-2"
                          onClick={handleSubmit}
                          disabled={Loading}
                        >
                          {Loading
                            ? "Loading..."
                            : "UTI Revamp ID Activate Now"}{" "}
                        </button>
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

export default UTIRetailerIdActivate;
const Wrapper = styled.div`
  button {
    color: #fff;
    background: #6d70ff;
    &:hover {
      color: #fff;
      background: #000000;
    }
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
