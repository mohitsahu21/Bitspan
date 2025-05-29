import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NsdlNewPanCard from "./NsdlNewPanCard";
import NsdlNewPanCardZlink from "./NsdlNewPanCardZlink";
import NsdlNewPanCardEasySmart from "./NsdlNewPanCardEasySmart";
import PanStatus from "./PanStatus";
import NSDLPanStatusEasysmart from "./NSDLPanStatusEasysmart";
import UTIPanNewZlink from "./UTIPanNewZlink";
import UtiPanNew from "./UtiPanNew";

// const NSDLPanComponent = () => {
//     const [loading, setLoading] = useState(false);
//     const [serviceLoading, setServiceLoading] = useState(false);
//      const { currentUser, token } = useSelector((state) => state.user);
//     const [data, setData] = useState([]);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [services,setServices] = useState([]);
//     const [show, setShow] = useState("None");
//     const fetchServices = async () => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get(
//           "https://2kadam.co.in/api/auth/retailer/getAllServicesList",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }

//         );
//         setServices(data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         if (error?.response?.status == 401) {
//           // alert("Your token is expired please login again")
//           Swal.fire({
//                     icon: "error",
//                     title: "Your token is expired please login again",
//                   });
//           dispatch(clearUser());
//           navigate("/");
//         }
//         setLoading(false);
//       }
//     };

//     useEffect(()=>{
//         fetchServices();
//     },[])
//     useEffect(()=>{
//         const handleTabClick = (tab) => {
//             setServiceLoading(true)
//             if(services){

//             const purchaseBankIdService = services.find((item) => {
//                 if (
//                   (item.service_name === "NSDL PAN Instapay" ||
//                     item.service_name === "NSDL PAN ZLink" ||
//                     item.service_name === "NSDL PAN Easysmart") &&
//                   item.status === "Active"
//                 ) {
//                   setShow(item.service_name);
//                   return true; // Correctly returning a boolean for `find`
//                 }
//                 return false;
//               });
//               setServiceLoading(false)
//               if (!purchaseBankIdService) {
//                 setShow("None");
//               }

//               console.log(purchaseBankIdService);

//             }
//           }

//       handleTabClick()
//     },[services])

//     console.log(show);
//   return (
//     <div>NSDLPanComponent</div>
//   )
// }

const UTIPanLoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const [services, setServices] = useState([]);
  const [show, setShow] = useState("Loading");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch Services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://2kadam.co.in/api/auth/retailer/getAllServicesList",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const findActiveService = () => {
      setServiceLoading(true);
      if (services.length > 0) {
        const activeService = services.find(
          (item) =>
            ["UTI PAN Zlink", "UTI PAN Easysmart"].includes(
              item.service_name
            ) && item.status === "Active"
        );
        setShow(activeService ? activeService.service_name : "None");
      }
      setServiceLoading(false);
    };

    findActiveService();
  }, [services]);

  // Function to render the correct component
  const renderComponent = () => {
    if (show === "UTI PAN Zlink") {
      return <UTIPanNewZlink />;
    } else if (show === "UTI PAN Easysmart") {
      return <UtiPanNew />;
    } else if (show === "Loading") {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden ">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center p-4">
          <h4>
            UTI PAN service is currently Not Available <br></br>Please try after
            some time
          </h4>
        </div>
      );
    }
  };

  return (
    <>
      <Wrapper>
        <div className="resp">
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden ">Loading...</span>
              </Spinner>
            </div>
          ) : (
            renderComponent()
          )}
        </div>
        <div className="repsmobile">
          <h6 className="mt-4 text-center">
            You Can Access This Page of Only In Desktop and Tablet !!
          </h6>
        </div>
      </Wrapper>
    </>
  );
};

export default UTIPanLoginComponent;
const Wrapper = styled.div`
  .resp {
    display: block;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .repsmobile {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
`;
