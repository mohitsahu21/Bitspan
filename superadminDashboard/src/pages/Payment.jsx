import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Payment = ({user}) => {
     const [isLoading, setIsLoading] = useState(false);
    console.log(user)
    // const fullUrl = window.location.href;
    const fullUrl = window.location.origin;
  console.log(fullUrl)
    const [formData, setFormData] = useState({
        userId: user.UserId,
        total_amount: user.amount,
        userPhone: user.ContactNo,
      payment_method: user.paymentMode,
      website: fullUrl,
    });

    const handleSubmit = async (e) => {
        // e.preventDefault();
       
        setIsLoading(true);
        try {
          const data = new FormData();
          // Append form fields
          for (const key in formData) {
            data.append(key, formData[key]);
          }
          // Append file
        //   if (receiptAttachment) {
        //     data.append("Receiept_Attechment", receiptAttachment);
        //   }
    
          // const response = await axios.post(
          //   "https://bitspan.vimubds5.a2hosted.com/api/auth/retailer/add-money-wallet",
          //   data,
          //   {
          //     headers: { "Content-Type": "multipart/form-data" },
          //   }
          // );
          const response = await axios.post(
            "https://bitspan.vimubds5.a2hosted.com/api/auth/upiwf/MakePaymentINPortal",
            // "http://localhost:7777/api/auth/superAdmin/createOrderToAddWalletMoney",
            formData
          );
        console.log(response)
          // alert(response.data.message);
         
          if(response.data.status){
            Swal.fire({
              title: "Payment Link Created Successfully",
              text: `Your Order Id is ${response.data.data.result.orderId}`,
              icon: "success",
            }).then(() => {
              // Navigate to the payment URL after closing the alert
              // window.location.href = response.data.data.result.payment_url; 
              window.open(response.data.data.result.payment_url, "_blank");
            });
            // navigate(`/${response.data.data.result.payment_url}`)
            // setFormData({
            //   user_id: currentUser.userId,
            //   amount: "",
            //   userName: currentUser.username,
            //   userPhone: currentUser.ContactNo,
            //   userEmail: currentUser.email,
            //   userRole: currentUser.role,
            //   Payment_Mode: "",
            //   website: fullUrl,
            // });
    
          }
    
          // Swal.fire({
          //   title: "Form Submitted Successfully",
          //   text: response.data.message,
          //   icon: "success",
          // });
          
        } catch (error) {
          console.error("Error submitting form:", error.response.data);
          alert("Failed to submit form. Please try again.");
          Swal.fire({
            title: "Error",
            text:
              error.response?.data || "Failed to submit form. Please try again.",
            icon: "error",
          });
        } finally {
          setIsLoading(false);
        }
      };
useEffect(()=>{
handleSubmit()
},[])
  return (
    <div>Payment</div>
  )
}

export default Payment