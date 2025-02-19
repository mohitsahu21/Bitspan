import React, { useState } from "react";
import styled from "styled-components";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";



const NSDLPanStatusEasysmart = () => {

  const [formData, setFormData] = useState({
    order_id: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        // `https://bitspan.vimubds5.a2hosted.com/api/auth/instpay/nsdl-pan-incomplete`,
        `https://bitspan.vimubds5.a2hosted.com/api/auth/nsdlpan/easySmartNewPanTransactionStatus`,

        formData
      );
      // setFormData(data);
      console.log(data);
      setLoading(false);
      if (data.status === "Success" && data.data) {
        const { order_id, ack, message, status } = data.data.data;
        if (status == "Success") {
          Swal.fire({

            icon: "success",
            title: "Details",
            // text : `Order Id : ${data.data.data.order_id}
            //         Acknowledgement No. : ${data.data.data.ack}
            //         Message : ${data.data.data.message} `,
           html: `
        <pre style="text-align: left; font-family:"Poppins", sans-serif;">
 <h5> <strong>Order ID:</strong> ${order_id}</h5>
 <h5> <strong>Acknowledgement No.:</strong> ${ack}</h5>
  <h5><strong>Message:</strong> ${message}</h5>
        </pre>
        <button onclick="copyAck()" class="btn btn-primary mt-2">Copy Ack. No.</button>
      `,
            didOpen: () => {
              // Function to copy the Acknowledgement No. when the button is clicked
              window.copyAck = function () {
                navigator.clipboard.writeText(ack).then(() => {
                  Swal.fire({
                    icon: "info",
                    title: "Copied!",
                    text: "Acknowledgement No. has been copied to clipboard.",
                    timer: 1500,
                    showConfirmButton: false
                  });
                });
              };
            }
          })
        }

        else {
          Swal.fire({

            icon: "success",
            title: "Details",
            // text : `Order Id : ${data.data.data.order_id}
            //         Acknowledgement No. : ${data.data.data.ack}
            //         Message : ${data.data.data.message} `,
            html: `
      <pre style="text-align: left; font-family: "Poppins", sans-serif;">
<h5><strong>Order ID:</strong> ${order_id}</h5>
<h5><strong>Acknowledgement No.:</strong> ${ack}</h5>
<h5><strong>Message:</strong> ${message}</h5>
      </pre>
     
    `

          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong"
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="main">
          <div className="container-fluid ">
            <div className="row flex-wrap justify-content-lg-center justify-content-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                {/* <Sider /> */}
              </div>
              <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata">
                <div className="main shadow-none ">
                  <div className="row shadow-none ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      {/* <div className="text-center">
                                                <h3>NSDL PAN Track Status</h3>
                                            </div> */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h4 className="mx-lg-5 px-lg-3 px-xxl-5">NSDL PAN Status</h4>
                        <h6 className="mx-lg-5"><BiHomeAlt /> &nbsp;/ &nbsp; NSDL PAN Status</h6>
                      </div>
                    </div>
                  </div>

                  <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                    <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow bg-body-tertiary rounded  py-5 m-4">


                      <form onSubmit={handleSubmit}>
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mx-auto">
                          <div class="input-group">
                            <span class="input-group-text">
                              <MdFormatListNumberedRtl />
                            </span>
                            <div class="form-floating">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInputGroup2"
                                placeholder="Mobile Number"
                                value={formData.order_id}
                                name="order_id"
                                onChange={handleChange}
                                required
                              />
                              <label for="floatingInputGroup2">
                                ORDER ID
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                          <div className="text-center">
                            <button type="submit" className="btn p-2" disabled={loading}> {loading ? "Loading..." : "Submit"}</button>
                          </div>
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
}

export default NSDLPanStatusEasysmart

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
  .guidline{
  
  }
  .list{
    list-style: none;
    padding-left: 0;
    font-size: 14px;
  }
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
`;
