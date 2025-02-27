
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { FaMobileAlt,FaRupeeSign  } from "react-icons/fa";
import { RiMarkPenLine } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown,Modal, Spinner, Tab, Tabs } from "react-bootstrap";
import { CiViewList } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdGrid3X3 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


//  approve model component start//
const SAApproveModel = ({ item, setShowApproveModel, setIsRefresh }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
 const dispatch = useDispatch();
 const { currentUser } = useSelector((state) => state.user);
 const { token } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
      order_id: item.orderid,
      note : "",
      status : "Under Process",
      process_by_userId	: currentUser.userId
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
  
    const handlesubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.put(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/ApproveOfflineDTHConnection",
          // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setLoading(false);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Approve Form Successfully",
          });
          setShowApproveModel(false);
          setIsRefresh((value) => !value);
        } else {
          Swal.fire({
            icon: "error",
            title: "An error occurred during the process. Please try again.",
          });
        }
      } catch (error) {
        console.error("There was an error submitting the form!", error);
        setLoading(false);
        if (error?.response?.status == 401) {
          // alert("Your token is expired please login again")
          Swal.fire({
                    icon: "error",
                    title: "Your token is expired please login again",
                  });
          dispatch(clearUser());
          navigate("/");
        }
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    };
    return (
      <>
        <div>
          
            <form onSubmit={handlesubmit}>
              <div className="">
                <label for="name" class="form-label">
                  Order Id
                </label>
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping">
                    {" "}
                    <MdGrid3X3 />
                  </span>
                  <input
                    type="text"
                    name="package_name"
                    class="form-control"
                    placeholder="Enter Package Name"
                    value={item.orderid}
                    onChange={handleChange}
                    disabled
                    required
                  />
                </div>
              </div>
            
              <div className="mt-3">
                <label for="name" class="form-label">
                  Enter Note
                </label>
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping">
                    {" "}
                    <MdGrid3X3 />
                  </span>
                  <input
                    type="text"
                    name="note"
                    class="form-control"
                    placeholder="Enter Note"
                    value={formData.note}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
             
  
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="text-center  m-5">
                  <button type="submit" className="btn p-2" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
        </div>
      </>
    );
  };


  //  approve model component end//

  //  approve model component end//

// Mark for edit Model start // 
const SAMarkEditModel = ({ item, setShowMarkEditModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
 const dispatch = useDispatch();
 const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    order_id: item.orderid,
    note: "",
    status: "Mark Edit",
    process_by_userId	: currentUser.userId
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/markForEditOfflineDTHConnection",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Mark For Edit Form Successfully",
        });
        setShowMarkEditModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setLoading(false);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
                  icon: "error",
                  title: "Your token is expired please login again",
                });
        dispatch(clearUser());
        navigate("/");
      }
      Swal.fire({
        icon: "error",
        title: "An error occurred during the process. Please try again.",
      });
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handlesubmit}>
          <div className="">
            <label for="name" class="form-label">
              Order Id
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Enter order Id"
                value={item.orderid}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label for="name" class="form-label">
              Enter Note
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="note"
                class="form-control"
                placeholder="Enter Note"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="text-center  m-5">
              <button type="submit" className="btn p-2" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
// Mark for edit Model end // 


// Success Model start // 
const SASuccessModel = ({ item, setShowSuccessModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
   const [userRelation,setUserRelation] = useState([]);
  const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    order_id: item.orderid,
    note: "",
    status: "Success",
    user_id : item.user_id,
    process_by_userId	: currentUser.userId
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handlesubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     const response = await axios.put(
  //       "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/SuccessOfflineDTHConnection",
  //       // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //     setLoading(false);
  //     if (response.data.success) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Mark Success Form Successfully",
  //       });
  //       setShowSuccessModel(false);
  //       setIsRefresh((value) => !value);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "An error occurred during the process. Please try again.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("There was an error submitting the form!", error);
  //     setLoading(false);
  //     if (error?.response?.status == 401) {
  //       // alert("Your token is expired please login again")
  //       Swal.fire({
  //                 icon: "error",
  //                 title: "Your token is expired please login again",
  //               });
  //       dispatch(clearUser());
  //       navigate("/");
  //     }
  //     Swal.fire({
  //       icon: "error",
  //       title: "An error occurred during the process. Please try again.",
  //     });
  //   }
  // };

  const DthConnectionComm = async (retailer, distributor, superDistributor, white_lable ,packageDetails,item)=>{
    const Order_Id = `ORW${Date.now()}`;
    const Transaction_Id = `TXNW${Date.now()}`;
   const  retailerFormData = {
      userId: retailer,
  amount : "",
  Transaction_details : `Commission Credit for DTH Connection Order Id ${item.orderid}`,
  status : "Success",
  Order_Id,
  Transaction_Id
    }
    const  distributorFormData = {
      userId: distributor,
  amount : "",
  Transaction_details : `Commission Credit for  DTH Connection Order Id ${item.orderid}`,
  status : "Success",
  Order_Id,
  Transaction_Id
    }
    const  superDistributorFormData = {
      userId: superDistributor,
  amount : "",
  Transaction_details : `Commission Credit for  DTH Connection Order Id ${item.orderid}`,
  status : "Success",
  Order_Id,
  Transaction_Id
    }
    const  whiteLableFormData = {
      userId: white_lable,
  amount : "",
  Transaction_details : `Commission Credit for  DTH Connection Order Id ${item.orderid}`,
  status : "Success",
  Order_Id,
  Transaction_Id
    }
    const retailerPackage = packageDetails?.retailer ? packageDetails?.retailer[0]:  {};
    const distributorPackage = packageDetails?.distributor ? packageDetails?.distributor[0] : {};
    const superDistributorPackage = packageDetails?.superDistributor ? packageDetails?.superDistributor[0] : {} ;
    const whiteLablePackage = packageDetails?.whiteLable ? packageDetails?.whiteLable[0] : {} ;

    const operatorName = item.operatorName;
    const amount = parseFloat(item.amount);

    let retailerCommAmount = 0;
    let distributorCommAmount = 0;
    let superDistributorCommAmount = 0;
    let whiteLableCommAmount = 0;


    try {
          
          if(retailerPackage.Offline_New_DTH_Connection_Commission_Type == "Percentage"){
            if(operatorName == "Dish TV"){
              retailerCommAmount = (amount * parseFloat(retailerPackage.Off_Dish_TV_New_DTH_Connection_Commission))/100
              
            }
            else if(operatorName == "Tata Sky"){
              retailerCommAmount = (amount * parseFloat(retailerPackage.Off_Tata_Sky_New_DTH_Connection_Commission))/100
            }
            else if(operatorName == "Videocon"){
              retailerCommAmount = (amount * parseFloat(retailerPackage.Off_Videocon_New_DTH_Connection_Commission	))/100
            }
            else if(operatorName == "Sun Direct"){
              retailerCommAmount = (amount * parseFloat(retailerPackage.Off_Sun_Direct_New_DTH_Connection_Commission	))/100
            }
            else if(operatorName == "Airtel DTH"){
              retailerCommAmount = (amount * parseFloat(retailerPackage.Off_Airtel_New_DTH_Connection_Commission))/100
            }

          }
          else{
            if(operatorName == "Dish TV"){
              retailerCommAmount = parseFloat(retailerPackage.Off_Dish_TV_New_DTH_Connection_Commission)
              
            }
            else if(operatorName == "Tata Sky"){
              retailerCommAmount = parseFloat(retailerPackage.Off_Tata_Sky_New_DTH_Connection_Commission)
            }
            else if(operatorName == "Videocon"){
              retailerCommAmount = parseFloat(retailerPackage.Off_Videocon_New_DTH_Connection_Commission)
            }
            else if(operatorName == "Sun Direct"){
              retailerCommAmount = parseFloat(retailerPackage.Off_Sun_Direct_New_DTH_Connection_Commission)
            }
            else if(operatorName == "Airtel DTH"){
              retailerCommAmount = parseFloat(retailerPackage.Off_Airtel_New_DTH_Connection_Commission)
            }

            
          }

          if(distributor && distributorPackage){
            if(distributorPackage.Offline_New_DTH_Connection_Commission_Type == "Percentage"){
              if(operatorName == "Dish TV"){
                distributorCommAmount = (amount * parseFloat(distributorPackage.Off_Dish_TV_New_DTH_Connection_Commission))/100
                
              }
              else if(operatorName == "Tata Sky"){
                distributorCommAmount = (amount * parseFloat(distributorPackage.Off_Tata_Sky_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Videocon"){
                distributorCommAmount = (amount * parseFloat(distributorPackage.Off_Videocon_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Sun Direct"){
                distributorCommAmount = (amount * parseFloat(distributorPackage.Off_Sun_Direct_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Airtel DTH"){
                distributorCommAmount = (amount * parseFloat(distributorPackage.Off_Airtel_New_DTH_Connection_Commission))/100
              }

            }
            else{
              if(operatorName == "Dish TV"){
                distributorCommAmount = parseFloat(distributorPackage.Off_Dish_TV_New_DTH_Connection_Commission)
                
              }
              else if(operatorName == "Tata Sky"){
                distributorCommAmount = parseFloat(distributorPackage.Off_Tata_Sky_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Videocon"){
                distributorCommAmount = parseFloat(distributorPackage.Off_Videocon_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Sun Direct"){
                distributorCommAmount = parseFloat(distributorPackage.Off_Sun_Direct_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Airtel DTH"){
                distributorCommAmount = parseFloat(distributorPackage.Off_Airtel_New_DTH_Connection_Commission)
              }

              
            }

          }
          if(superDistributor && superDistributorPackage){
            if(superDistributorPackage.Offline_New_DTH_Connection_Commission_Type == "Percentage"){
              if(operatorName == "Dish TV"){
                superDistributorCommAmount = (amount * parseFloat(superDistributorPackage.Off_Dish_TV_New_DTH_Connection_Commission))/100
                
              }
              else if(operatorName == "Tata Sky"){
                superDistributorCommAmount = (amount * parseFloat(superDistributorPackage.Off_Tata_Sky_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Videocon"){
                superDistributorCommAmount = (amount * parseFloat(superDistributorPackage.Off_Videocon_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Sun Direct"){
                superDistributorCommAmount = (amount * parseFloat(superDistributorPackage.Off_Sun_Direct_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Airtel DTH"){
                superDistributorCommAmount = (amount * parseFloat(superDistributorPackage.Off_Airtel_New_DTH_Connection_Commission))/100
              }

            }
            else{
              if(operatorName == "Dish TV"){
                superDistributorCommAmount = parseFloat(superDistributorPackage.Off_Dish_TV_New_DTH_Connection_Commission)
                
              }
              else if(operatorName == "Tata Sky"){
                superDistributorCommAmount = parseFloat(superDistributorPackage.Off_Tata_Sky_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Videocon"){
                superDistributorCommAmount = parseFloat(superDistributorPackage.Off_Videocon_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Sun Direct"){
                superDistributorCommAmount = parseFloat(superDistributorPackage.Off_Sun_Direct_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Airtel DTH"){
                superDistributorCommAmount = parseFloat(superDistributorPackage.Off_Airtel_New_DTH_Connection_Commission)
              }

              
            }

          }
          if(white_lable && whiteLablePackage){
            if(whiteLablePackage.Offline_New_DTH_Connection_Commission_Type == "Percentage"){
              if(operatorName == "Dish TV"){
                whiteLableCommAmount = (amount * parseFloat(whiteLablePackage.Off_Dish_TV_New_DTH_Connection_Commission))/100
                
              }
              else if(operatorName == "Tata Sky"){
                whiteLableCommAmount = (amount * parseFloat(whiteLablePackage.Off_Tata_Sky_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Videocon"){
                whiteLableCommAmount = (amount * parseFloat(whiteLablePackage.Off_Videocon_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Sun Direct"){
                whiteLableCommAmount = (amount * parseFloat(whiteLablePackage.Off_Sun_Direct_New_DTH_Connection_Commission))/100
              }
              else if(operatorName == "Airtel DTH"){
                whiteLableCommAmount = (amount * parseFloat(whiteLablePackage.Off_Airtel_New_DTH_Connection_Commission))/100
              }

            }
            else{
              if(operatorName == "Dish TV"){
                whiteLableCommAmount = parseFloat(whiteLablePackage.Off_Dish_TV_New_DTH_Connection_Commission)
                
              }
              else if(operatorName == "Tata Sky"){
                whiteLableCommAmount = parseFloat(whiteLablePackage.Off_Tata_Sky_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Videocon"){
                whiteLableCommAmount = parseFloat(whiteLablePackage.Off_Videocon_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Sun Direct"){
                whiteLableCommAmount = parseFloat(whiteLablePackage.Off_Sun_Direct_New_DTH_Connection_Commission)
              }
              else if(operatorName == "Airtel DTH"){
                whiteLableCommAmount = parseFloat(whiteLablePackage.Off_Airtel_New_DTH_Connection_Commission)
              }

              
            }

          }


         retailerFormData.amount = retailerCommAmount;
         distributorFormData.amount = distributorCommAmount;
         superDistributorFormData.amount = superDistributorCommAmount;
         whiteLableFormData.amount = whiteLableCommAmount;
        //  console.log(retailerCommAmount)
        //  console.log(distributorCommAmount)
        //  console.log(superDistributorCommAmount)
        //  console.log(whiteLableCommAmount)
          
    } catch (error) {
      console.log(error)
    }
    return { retailerFormData, distributorFormData, superDistributorFormData, whiteLableFormData,Order_Id,Transaction_Id };
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      const { data } = await axios.get(
        `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserRelations/${item.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(data);
      setUserRelation(data.data);
  
      if (data.data) {
        const { distributor, superDistributor, white_lable } = data.data;
        const retailer = item.user_id
        // Create an array to hold promises and a mapping object
        const promises = [];
        const resultsMap = {
          retailer : null,
          distributor: null,
          superDistributor: null,
          whiteLable: null,
        };

      const retailerPromise = axios
        .get(
          `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserPackageDetails/${retailer}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          resultsMap.retailer = response.data.data;
        });
        promises.push(retailerPromise);
  
        if (distributor) {
          const distributorPromise = axios
            .get(
              `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserPackageDetails/${distributor}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              resultsMap.distributor = response.data.data;
            });
          promises.push(distributorPromise);
        }
  
        if (superDistributor) {
          const superDistributorPromise = axios
            .get(
              `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserPackageDetails/${superDistributor}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              resultsMap.superDistributor = response.data.data;
            });
          promises.push(superDistributorPromise);
        }
  
        if (white_lable) {
          const whiteLablePromise = axios
            .get(
              `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getUserPackageDetails/${white_lable}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              resultsMap.whiteLable = response.data.data;
            });
          promises.push(whiteLablePromise);
        }
  
        // Wait for all promises to resolve
        await Promise.all(promises);
  
        // Log the results
        console.log("retailer Package:", resultsMap.retailer);
        console.log("Distributor Package:", resultsMap.distributor);
        console.log("Super Distributor Package:", resultsMap.superDistributor);
        console.log("White Label Package:", resultsMap.whiteLable);
       
        let result = {};
        // Use the results as needed
          result = await DthConnectionComm(retailer, distributor, superDistributor, white_lable ,resultsMap,item)
         console.log(result)
        
       

         // Track whether all commissions were processed successfully
    let allProcessesSuccessful = true;
        
        if(result && result.retailerFormData && result.retailerFormData.amount){
          const response = await axios.put(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/CreditCommission",
            // "https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/AddWalletAddMoneyDirect",
            result.retailerFormData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ).catch(() => {
            allProcessesSuccessful = false;
          });
        }
        if( result && result.distributorFormData && result.distributorFormData.amount){
          const response = await axios.put(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/CreditCommission",
            // "https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/AddWalletAddMoneyDirect",
            result.distributorFormData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ).catch(() => {
            allProcessesSuccessful = false;
          });
        }
        if( result && result.superDistributorFormData && result.superDistributorFormData.amount){
          const response = await axios.put(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/CreditCommission",
            // "https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/AddWalletAddMoneyDirect",
            result.superDistributorFormData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ).catch(() => {
            allProcessesSuccessful = false;
          });
        }
        if( result && result.whiteLableFormData && result.whiteLableFormData.amount){
          const response = await axios.put(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/CreditCommission",
            // "https://bitspan.vimubds5.a2hosted.com/api/auth/log-reg/AddWalletAddMoneyDirect",
            result.whiteLableFormData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ).catch(() => {
            allProcessesSuccessful = false;
          });
        }
        if(result){
          let whiteLabel_Commission = 0 ;
          let super_Distributor_Commission = 0 ;
          let distributor_Commission = 0 ;
          let retailer_Commission = 0;
          if(result.whiteLableFormData && result.whiteLableFormData.amount){
            whiteLabel_Commission = result.whiteLableFormData.amount
          }
          if(result.superDistributorFormData && result.superDistributorFormData.amount){
            super_Distributor_Commission = result.superDistributorFormData.amount
          }
          if(result.distributorFormData && result.distributorFormData.amount){
            distributor_Commission = result.distributorFormData.amount
          }
          if(result.retailerFormData && result.retailerFormData.amount){
            retailer_Commission = result.retailerFormData.amount
          }
          


        

          const commissionFormData = {

            order_id: result.Order_Id,
            transaction_id : result.Transaction_Id,
            amount :  item.amount,
            whiteLabel_id : white_lable ? white_lable : "NA",
            super_Distributor_id : superDistributor ? superDistributor : "NA",
            distributor_id : distributor ? distributor : "NA",
            retailer_id : retailer ? retailer : "NA",
            whiteLabel_Commission : whiteLabel_Commission ,
            super_Distributor_Commission : super_Distributor_Commission,
            distributor_Commission : distributor_Commission,
            retailer_Commission : retailer_Commission,
            transaction_type : "New DTH Connection",
            transaction_details : result.retailerFormData.Transaction_details,
            status : "Success",
          }
          await axios.post(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/addCommissionEntry",
            // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
            commissionFormData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ).catch(() => {
            allProcessesSuccessful = false;
          });
        }

          await axios.put(
                "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/SuccessOfflineDTHConnection",
                // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
                formData,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              ).catch(() => {
                allProcessesSuccessful = false;
              });
        
         // Show success message if all processes succeeded
    if (allProcessesSuccessful) {
      setShowSuccessModel(false);
      setIsRefresh((value) => !value);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "All commissions have been processed successfully!",
      });
    } else {
      setShowSuccessModel(false);
      setIsRefresh((value) => !value);
      Swal.fire({
        icon: "warning",
        title: "Partial Success",
        text: "Some commissions were not processed. Please check the logs.",
      });
    }



      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      if (error?.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Your token is expired please login again",
        });
        dispatch(clearUser());
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handlesubmit}>
          <div className="">
            <label for="name" class="form-label">
              Order Id
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Enter Package Name"
                value={item.orderid}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label for="name" class="form-label">
              Enter Note
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="note"
                class="form-control"
                placeholder="Enter Note"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="text-center  m-5">
              <button type="submit" className="btn p-2" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
// Success Model end // 


  //  reject model component start//
const SARejectModel = ({ item, setShowRejectModel, setIsRefresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
 const dispatch = useDispatch();
 const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    order_id: item.orderid,
    note : "",
    status : "Reject",
    amount : item.amount,
    chargeAmount : "",
    refundAmount : "",
    Transaction_details : `Refund Credit for DTH Connection Order Id ${item.orderid}`,
    user_id : item.user_id,
    process_by_userId	: currentUser.userId
  });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData and calculate refund amount if chargeAmount changes
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      if (name === "chargeAmount") {
        // Calculate refundAmount dynamically
        const chargeAmount = parseFloat(value) || 0; // Handle non-numeric input
        const refundAmount = Math.max(0, parseFloat(item.amount) - chargeAmount);
        updatedFormData.refundAmount = refundAmount.toFixed(2); // Format to 2 decimal places
      }

      return updatedFormData;
    });
  };
  

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/rejectOfflineDTHConnection",
        // "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/resolveComplaint",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Reject Form Successfully",
        });
        setShowRejectModel(false);
        setIsRefresh((value) => !value);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during the process. Please try again.",
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setLoading(false);
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again")
        Swal.fire({
                  icon: "error",
                  title: "Your token is expired please login again",
                });
        dispatch(clearUser());
        navigate("/");
      }
      Swal.fire({
        icon: "error",
        title: "An error occurred during the process. Please try again.",
      });
    }
  };
  return (
    <>
      <div>
        
          <form onSubmit={handlesubmit}>
            <div className="">
              <label for="name" class="form-label">
                Order Id
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  name="package_name"
                  class="form-control"
                  placeholder="Enter Package Name"
                  value={item.orderid}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-3">
            <label for="name" class="form-label">
              Amount
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Enter Package Name"
                value={item.amount}
                onChange={handleChange}
                disabled
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
             Charge Amount
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="chargeAmount"
                class="form-control"
                placeholder="Enter Charge Amount"
                value={formData.chargeAmount}
                onChange={handleChange}
                pattern="^\d+(\.\d+)?$"
                title="Price should be digits Only"
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label for="name" class="form-label">
             Refund Amount
            </label>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                {" "}
                <MdGrid3X3 />
              </span>
              <input
                type="text"
                name="package_name"
                class="form-control"
                placeholder="Refund amount"
                value={formData.refundAmount  || formData.amount}
                // onChange={handleChange}
                disabled
                
              />
            </div>
          </div>
          
            <div className="mt-3">
              <label for="name" class="form-label">
                Enter Note
              </label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  {" "}
                  <MdGrid3X3 />
                </span>
                <input
                  type="text"
                  name="note"
                  class="form-control"
                  placeholder="Enter Note"
                  value={formData.note}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
           

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="text-center  m-5">
                <button type="submit" className="btn p-2" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
      </div>
    </>
  );
};


//  reject model component end//



const SAOfflineDthConnection = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [underProcessForms, setUnderProcessForms] = useState([]);
    const [keyword, setKeyword] = useState("");
    const complaintsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [formStatus, setFormStatus] = useState(""); // For user type filter
    const [ShowApproveModel, setShowApproveModel] = useState(false);
    const [showMarkEditModel, setShowMarkEditModel] = useState(false);
  const [showSuccessModel, setShowSuccessModel] = useState(false);
    const [ShowRejectModel, setShowRejectModel] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [selectedItem,setSelectedItem] = useState("")
    const [OperatorName, setOperatorName] = useState("");


    const fetchOfflineForm = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getOfflineDTHConnection",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const applicationData = data?.data?.filter((item) => item.status !== "Under Process")
      setUsers(applicationData);
     
     const filterData = data?.data?.filter((item) => item.status === "Under Process")
     setUnderProcessForms(filterData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          if (error?.response?.status == 401) {
            // alert("Your token is expired please login again")
            Swal.fire({
                      icon: "error",
                      title: "Your token is expired please login again",
                    });
            dispatch(clearUser());
            navigate("/");
          }
          setLoading(false);
        }
      };

      // useEffect(() => {
      //   fetchOfflineForm();
      // }, []);

      useEffect(() => {
        fetchOfflineForm();
      }, [isRefresh]);

      const filteredItems = users.filter(
        (row) =>{ 
          const matchesKeyword =  (row?.first_name &&
            row.first_name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
          (row?.number && row.number.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.UserName &&
              row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
            (row?.orderid &&
              row.orderid.toLowerCase().includes(keyword.trim().toLowerCase()))

              const matchesOperator = !OperatorName || OperatorName === "---Select Operator---" || row.operatorName === OperatorName;
          // return matchesKeyword && matchesType ;

              const matchesType = !formStatus || formStatus === "---Select Form Status---" || row.status === formStatus;
              return matchesKeyword && matchesType && matchesOperator ;
            }
      );
    
      const totalPages = Math.ceil(filteredItems.length / complaintsPerPage);
    
      const filterPagination = () => {
        const startIndex = currentPage * complaintsPerPage;
        const endIndex = startIndex + complaintsPerPage;
        return filteredItems?.slice(startIndex, endIndex);
      };
    
      const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };
    
      const showApiData = filterPagination();

      console.log(showApiData);
      

    
  console.log(users)

  const filteredUnderProcessItems = underProcessForms.filter((row) => {
    const matchesKeyword =  (row?.first_name &&
      row.first_name.toLowerCase().includes(keyword.trim().toLowerCase())) ||
    (row?.number && row.number.toLowerCase().includes(keyword.trim().toLowerCase())) || (row?.UserName &&
        row.UserName.toLowerCase().includes(keyword.trim().toLowerCase())) ||
      (row?.orderid &&
        row.orderid.toLowerCase().includes(keyword.trim().toLowerCase()))

    
    return matchesKeyword;
  });

  const totalUnderProcessPages = Math.ceil(filteredUnderProcessItems.length / complaintsPerPage);

  const filterUnderProcessPagination = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filteredUnderProcessItems?.slice(startIndex, endIndex);
  };

  const handleUnderProcessPageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showUnderProcessData = filterUnderProcessPagination();

  console.log(showUnderProcessData);
    
    return (
        <>
            <Wrapper>
                <div className="main">
                    <div className="container-fluid">
                        <div className="row flex-wrap justify-content-lg-center justify-content-center ">
                            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2  d-none ">
                                {/* <Sider /> */}
                            </div>
                            <div className="col-xxl-12 col-xl-11 col-lg-12 col-md-10  col-sm-10  col-11
                             mt-5 formdata ">
                                <div className="main shadow-none ">
                                    <div className="row shadow-none ">
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            {/* <div className="text-center">
                                                <h3>Complaint Raised List</h3>
                                            </div> */}
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h4 className="mx-lg-5 px-lg-3 px-xxl-5">Offline DTH Connection history</h4>
                                                <p className="mx-lg-5">
                                                    {" "}
                                                    <BiHomeAlt /> &nbsp;/ &nbsp;{" "}
                                                    <span
                                                        className="text-body-secondary"
                                                        style={{ fontSize: "13px" }}
                                                    >
                                                        {" "}
                                                        Offline DTH Connection history
                                                    </span>{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row  justify-content-xl-end justify-content-center pe-lg-4">
                                        <div className="col-xxl-11 col-xl-11 col-lg-10 col-md-12 col-sm-12 col-11 shadow rounded  p-5 m-4 bg-body-tertiary">
                                        <Tabs
                                                    defaultActiveKey="Application"
                                                    id="uncontrolled-tab-example"
                                                    className="mb-3"
                                                    variant="tabs"
                                                >
                                                    <Tab eventKey="Application" title="Application">
                                            <div className="row d-flex flex-column g-4">

                                                <div className="d-flex flex-column flex-lg-row gap-3">
                                                    {/* <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="fromDate" className="form-label">From</label>
                                                        <input id="fromDate" className="form-control" type="date" />
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <label for="toDate" className="form-label">To</label>
                                                        <input id="toDate" className="form-control " type="date" />
                                                    </div>
                                                    <div className="d-flex align-items-end">
                                                        <button type="button" className="btn btn-primary button">Search</button>
                                                    </div> */}
                                                    <div className="col-12 col-md-12 col-lg-6">
                                                        {/* <label for="toDate" className="form-label">Select Operator</label> */}
                                                        <select className="form-select" aria-label="Default select example"
                                                         value={OperatorName}
                                                         onChange={(e) => setOperatorName(e.target.value)}>
                                                             <option selected>---Select Operator---</option>
                                                            <option value="Dish TV">Dish TV</option>
                                                            <option value="Tata Sky">Tata Sky</option>
                                                            <option value="Videocon">Videocon</option>
                                                            <option value="Sun Direct">Sun Direct</option>
                                                            <option value="Airtel DTH">Airtel DTH</option>


                                                        </select>
                                                    </div>

                                                   
                                                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                                                        
                                                  
                                                        {/* <label for="toDate" className="form-label fw-bold">PAN Mode</label> */}
                                                        <select
                                                          className="form-select"
                                                          aria-label="Default select example"
                                                          value={formStatus}
                                                          onChange={(e) => setFormStatus(e.target.value)}
                                                          
                                                        >
                                                          <option selected>---Select Form Status---</option>
                                                          <option value="Pending">Pending</option>
                              <option value="Success">Success</option>
                              {/* <option value="Mark Edit">Mark Edit</option> */}
                              <option value="Reject">Reject</option>
                                                      
                                                        </select>
                                                     
                                                                                </div>
                                                                              

                                                </div>
                                                

                                                    <div className="col-12 col-md-12 col-lg-12 col-xl-8">
                                                        {/* <label for="fromDate" className="form-label">From</label> */}
                                                        <input id="fromDate" 
                                                        className="form-control"
                                                         type="search"
                                                         placeholder="Enter Applicant Name/Mobile/Order Id/User Name"
                                                         value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                                                         />
                                                    </div>


                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                    <div class="table-responsive">
                                                    {loading  ? ( 
                                                          <div className="d-flex justify-content-center">
                                                               <Spinner animation="border" role="status">
                                                               <span className="visually-hidden ">Loading...</span>
                                                             </Spinner>
                                                             </div>
                                                        )
                                                    :
                                                    (
                                                        <>
                                                         <table class="table table-striped">
                                                            <thead className="table-dark">
                                                              <tr>
                                                             <th scope="col">Sr.No</th>
                                                             <th scope="col">Created Date</th>
                                <th scope="col">Order Id</th>
                                <th scope="col">first_name</th>
                                <th scope="col">last_name</th>
                                  <th scope="col">full_address</th>
                                  <th scope="col">postal_code</th>
                                  <th scope="col">number</th>
                                  <th scope="col">Operator Name</th>
                                  <th scope="col">Validity</th>
                                  <th scope="col">amount</th>
                                  <th scope="col">Description</th>
                                  <th scope="col">User Id</th>
                                  <th scope="col">User Name</th>
                                  <th scope="col">User Mobile</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Process By</th>
                                  <th scope="col">Process Date</th>
                                  <th scope="col">Note</th>
                                  <th scope="col">Action</th>
                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                            
                                                            {showApiData && showApiData.length > 0 ? (
                                        showApiData?.map((item, index) => (
                                          <tr key={index}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{item.created_at}</td>
                                          <td>{item.orderid}</td>
                                          <td>{item.first_name}</td>
                                          <td>{item.last_name}</td>
                                          <td>{item.full_address}</td>
                                          <td>{item.postal_code}</td>
                                          <td>{item.number}</td>
                                          <td>{item.operatorName}</td>
                                          <td>{item.validity}</td>
                                          <td>{item.amount}</td>
                                          <td>{item.message}</td>
                                         
                                          <td>{item.user_id}</td>
                                          <td>{item.UserName}</td>
                                          <td>{item.ContactNo}</td>
                                          <td>{item.status}</td>
                                          <td>{item.process_by_userId}</td>
                                          <td>{item.updated_at}</td>
                                          <td>{item.note}</td>
                                          <td>
                                            { (item.status === "Pending" || item.status === "Mark Edit") && 
                                              <Dropdown>
                                                <Dropdown.Toggle
                                                  variant="success"
                                                  // id={`dropdown-${user.id}`}
                                                  as="span" style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                                                  className="custom-dropdown-toggle"
                                                >
                                                 <PiDotsThreeOutlineVerticalBold />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                 
                                                    <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowApproveModel(true)
                                                      setSelectedItem(item)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Approve
                                                  </Dropdown.Item>
                                                  {/* <Dropdown.Item
                                                    onClick={() => {
                                                      // setSelectedUser(user);
                                                      setShowMarkEditModel(true);
                                                      setSelectedItem(item)
                                                    //   deactivateUser(user.UserId)
                                                    }}
                                                  >
                                                    <span className="">
                                                      {" "}
                                                      <CiViewList />
                                                    </span>{" "}
                                                    Mark for Edit
                                                  </Dropdown.Item> */}
                                                   <Dropdown.Item
    onClick={() => {
      // setSelectedUser(user);
      setShowRejectModel(true)
      setSelectedItem(item)
    //   deactivateUser(user.UserId)
    }}
  >
    <span className="">
      {" "}
      <CiViewList />
    </span>{" "}
    Reject
  </Dropdown.Item>
                                                
                                             
                                                </Dropdown.Menu>
                                              </Dropdown>
}

                                            </td>
                                        </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td colSpan="13">No data available</td>{" "}
                                          {/* Updated colSpan to match table columns */}
                                        </tr>
                                      )}
                                                                
                                                        
    
                                                            </tbody>
                                                           
                                                        </table>

                                                        </>
                                                    )}
                                                       
                                                    </div>
                                                        <PaginationContainer>
                                                        <ReactPaginate
                                                          previousLabel={"Previous"}
                                                          nextLabel={"Next"}
                                                          breakLabel={"..."}
                                                          pageCount={totalPages}
                                                          marginPagesDisplayed={2}
                                                          pageRangeDisplayed={5}
                                                          onPageChange={handlePageChange}
                                                          containerClassName={"pagination"}
                                                          activeClassName={"active"}
                                                        />
                                                      </PaginationContainer>
                                                 
                                                </div>
                                            </div>
                                            </Tab>
                                            <Tab eventKey="Under Process" title="Under Process">
                                            <div className="row d-flex flex-column g-4">

<div className="d-flex flex-column flex-xl-row gap-3">
    {/* <div className="col-12 col-md-4 col-lg-3">
        <label for="fromDate" className="form-label">From</label>
        <input id="fromDate" className="form-control" type="date" />
    </div>
    <div className="col-12 col-md-4 col-lg-3">
        <label for="toDate" className="form-label">To</label>
        <input id="toDate" className="form-control " type="date" />
    </div>
    <div className="d-flex align-items-end">
        <button type="button" className="btn btn-primary button">Search</button>
    </div> */}

    <div className="col-12 col-md-12 col-lg-12 col-xl-8">
        {/* <label for="fromDate" className="form-label">From</label> */}
        <input id="fromDate" 
        className="form-control"
         type="search"
         placeholder="Enter Applicant Name/Mobile/Order Id/User Name"
         value={keyword}
onChange={(e) => setKeyword(e.target.value)}
         />
    </div>
    {/* <div className="col-12 col-md-12 col-lg-12 col-xl-3">
        
  
        <label for="toDate" className="form-label fw-bold">PAN Mode</label>
        <select
          className="form-select"
          aria-label="Default select example"
          value={formStatus}
          onChange={(e) => setFormStatus(e.target.value)}
          
        >
          <option selected>---Select Form Status---</option>
          <option value="Pending">Pending</option>
          <option value="Approve">Approve</option>
          <option value="Reject">Reject</option>
      
        </select>
     
                                </div> */}

</div>


<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
    <div class="table-responsive">
    {loading  ? ( 
          <div className="d-flex justify-content-center">
               <Spinner animation="border" role="status">
               <span className="visually-hidden ">Loading...</span>
             </Spinner>
             </div>
        )
    :
    (
        <>
         <table class="table table-striped">
            <thead className="table-dark">
              <tr>
             <th scope="col">Sr.No</th>
             <th scope="col">Created Date</th>
<th scope="col">Order Id</th>
<th scope="col">first_name</th>
<th scope="col">last_name</th>
<th scope="col">full_address</th>
<th scope="col">postal_code</th>
<th scope="col">number</th>
<th scope="col">Operator Name</th>
<th scope="col">Validity</th>
<th scope="col">amount</th>
<th scope="col">Description</th>
<th scope="col">User Id</th>
<th scope="col">User Name</th>
<th scope="col">User Mobile</th>
<th scope="col">Status</th>
<th scope="col">Process By</th>
<th scope="col">Process Date</th>
<th scope="col">Note</th>
<th scope="col">Action</th>
</tr>
            </thead>
            <tbody>
            
            {showUnderProcessData && showUnderProcessData.length > 0 ? (
showUnderProcessData?.map((item, index) => (
<tr key={index}>
<th scope="row">{index + 1}</th>
<td>{item.created_at}</td>
<td>{item.orderid}</td>
<td>{item.first_name}</td>
<td>{item.last_name}</td>
<td>{item.full_address}</td>
<td>{item.postal_code}</td>
<td>{item.number}</td>
<td>{item.operatorName}</td>
<td>{item.validity}</td>
<td>{item.amount}</td>
<td>{item.message}</td>

<td>{item.user_id}</td>
<td>{item.UserName}</td>
<td>{item.ContactNo}</td>
<td>{item.status}</td>
<td>{item.process_by_userId}</td>
<td>{item.updated_at}</td>
<td>{item.note}</td>
<td>
{ (item.status === "Under Process") && 
<Dropdown>
<Dropdown.Toggle
  variant="success"
  // id={`dropdown-${user.id}`}
  as="span" style={{ border: 'none', background: 'none', cursor: 'pointer' }}
  className="custom-dropdown-toggle"
>
 <PiDotsThreeOutlineVerticalBold />
</Dropdown.Toggle>
<Dropdown.Menu>
 
    <Dropdown.Item
    onClick={() => {
      // setSelectedUser(user);
      setShowSuccessModel(true);
      setSelectedItem(item)
    //   deactivateUser(user.UserId)
    }}
  >
    <span className="">
      {" "}
      <CiViewList />
    </span>{" "}
    Success
  </Dropdown.Item>
  <Dropdown.Item
    onClick={() => {
      // setSelectedUser(user);
      setShowRejectModel(true)
      setSelectedItem(item)
    //   deactivateUser(user.UserId)
    }}
  >
    <span className="">
      {" "}
      <CiViewList />
    </span>{" "}
    Reject
  </Dropdown.Item>


</Dropdown.Menu>
</Dropdown>
}

</td>
</tr>
))
) : (
<tr>
<td colSpan="13">No data available</td>{" "}
{/* Updated colSpan to match table columns */}
</tr>
)}
                
        

            </tbody>
           
        </table>

        </>
    )}
       
    </div>
        <PaginationContainer>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={totalUnderProcessPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handleUnderProcessPageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </PaginationContainer>
 
</div>
</div>
</Tab>
</Tabs>



                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                      {/* Approve  Model  start*/}

        <Modal
          // size="lg"
          show={ShowApproveModel}
          //   fullscreen={true}
          onHide={() => setShowApproveModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Approve Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && <SAApproveModel item={selectedItem} setShowApproveModel={setShowApproveModel}  setIsRefresh={setIsRefresh}/>}
          </Modal.Body>
        </Modal>

        {/*  Approve Model  end*/}

                   {/* Mark Edit Model  start*/}

                   <Modal
          // size="lg"
          show={showMarkEditModel}
          //   fullscreen={true}
          onHide={() => setShowMarkEditModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Mark For Edit Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SAMarkEditModel
                item={selectedItem}
                setShowMarkEditModel={setShowMarkEditModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Mark Edit Model  end*/}

        
           {/* Success Model  start*/}

           <Modal
          // size="lg"
          show={showSuccessModel}
          //   fullscreen={true}
          onHide={() => setShowSuccessModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">
              Success Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <SASuccessModel
                item={selectedItem}
                setShowSuccessModel={setShowSuccessModel}
                setIsRefresh={setIsRefresh}
              />
            )}
          </Modal.Body>
        </Modal>

        {/*  Success Model  end*/}

             {/* Reject Model  start*/}

             <Modal
          // size="lg"
          show={ShowRejectModel}
          //   fullscreen={true}
          onHide={() => setShowRejectModel(false)}
          aria-labelledby="packageDetail-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="packageDetail-modal-sizes-title-lg">Reject Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && <SARejectModel item={selectedItem} setShowRejectModel={setShowRejectModel}  setIsRefresh={setIsRefresh}/>}
          </Modal.Body>
        </Modal>

        {/*  Reject Model  end*/}
            </Wrapper>
        </>
    );
}

export default SAOfflineDthConnection

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
  th{
    font-weight: 500;
    font-size: 14px;
   
  }
  td{
   font-size: 14px;
   white-space: nowrap;
   
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
