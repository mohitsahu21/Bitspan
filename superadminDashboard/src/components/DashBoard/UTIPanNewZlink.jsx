import React, { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

const UTIPanNewZlink = () => {
  const { currentUser, token } = useSelector((state) => state.user);
    const [Loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        agent_id : currentUser?.userId
      });
    
    //   const handleChange = (e) => {
    //     setFormData({
    //       ...formData,
    //       [e.target.name]: e.target.value,
    //     });
    //   };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const {data} = await axios.post(
            // `http://localhost:7777/api/auth/nsdlpan/easySmartUtiLogin`,
            // `https://bitspan.vimubds5.a2hosted.com/api/auth/nsdlpan/easySmartUtiLogin`,
            'https://bitspan.vimubds5.a2hosted.com/api/auth/zlink/ZlinkUtiLogin',
            formData
          );
        //   setFormData(apiResponse.data);
          console.log(data);
          setLoading(false);
          if (data.status == "Success" && data.data.status === "Success") {
            // window.location = apiResponse.data.nsdlData.url;
            window.open(data.data.url, "_blank");
          } else if (data.status == "Success" && data.data.status === "Failed") {
            Swal.fire({
              icon: "error",
              title: data.data.message,
            });
          }
          else{
            Swal.fire({
                icon: "error",
                title: "An error occurred during the process. Please try again.",
              });
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "An error occurred during the process. Please try again.",
          });
        }finally {
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
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 col-sm-2  d-none">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata ">
                <div className="main">
                  <div className="row">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">UTI PAN Card Login</h4>
                        <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp; / &nbsp; UTI PAN Card Login</h6>
                      </div>
                    </div>
                  </div>
                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11  shadow  rounded m-4 px-3 py-5 bg-body-tertiary">
                      <div className="text-start m-3">
                        <button className="btn p-2" onClick={handleSubmit} disabled={Loading}>{Loading ? "Loading..." : "Login to UTI Portal"}</button>
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

export default UTIPanNewZlink;
const Wrapper = styled.div`

@media (min-width: 1025px) and (max-width : 1500px){
    .formdata {
     
      padding-left: 15rem;
    }
  }
  @media (min-width: 1500px) {
    .formdata {
     
      padding-left: 13rem;
    }
  }
 

  button {
    color: #fff;
    background: #6d70ff;
    &:hover {
      color: #fff;
      background: #000000;
    }
  }
`;
