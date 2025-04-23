// import React, { useEffect } from "react";

// const RechargeReceipt = () => {
//   const receiptData = JSON.parse(localStorage.getItem("receiptData"));

//   useEffect(() => {
//     setTimeout(() => {
//       window.print();
//     }, 500);
//   }, []);

//   if (!receiptData) return <p>No receipt data available.</p>;

//   const today = new Date().toLocaleDateString("en-IN");

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#f9f9f9",
//         minHeight: "100vh",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           width: "650px",
//           background: "#fff",
//           padding: "40px",
//           borderRadius: "12px",
//           boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//         }}
//       >
//         {/* Title */}
//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: "30px",
//             fontSize: "28px",
//             color: "#222",
//           }}
//         >
//           Recharge Receipt
//         </h2>

//         {/* Date & Receipt Number */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "30px",
//           }}
//         >
//           <div>
//             <p style={labelStyle}>Date</p>
//             <p style={valueStyle}>{today}</p>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <p style={labelStyle}>Receipt No.</p>
//             <p style={valueStyle}>{receiptData.receiptNumber}</p>
//           </div>
//         </div>

//         {/* Details: Mobile, Operator, Circle, Amount */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: "30px",
//           }}
//         >
//           <div>
//             <p style={labelStyle}>Mobile No.</p>
//             <p style={valueStyle}>{receiptData.mobile_no}</p>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <p style={labelStyle}>Operator</p>
//             <p style={valueStyle}>{receiptData.operator}</p>
//           </div>
//           <div>
//             <p style={labelStyle}>Circle</p>
//             <p style={valueStyle}>{receiptData.circle}</p>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <p style={labelStyle}>Amount</p>
//             <p style={valueStyle}>₹ {receiptData.amount}</p>
//           </div>
//         </div>

//         {/* Thank You */}
//         <div style={{ marginTop: "50px", textAlign: "center" }}>
//           <p style={{ fontSize: "18px", color: "#444" }}>
//             Thank you for using our service! 🙏
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const labelStyle = {
//   margin: 0,
//   fontSize: "14px",
//   color: "#999",
//   fontWeight: "bold",
// };

// const valueStyle = {
//   margin: 0,
//   fontSize: "18px",
//   color: "#333",
//   fontWeight: "600",
//   marginTop: "4px",
// };

// const ReceiptRow = ({ label, value }) => (
//   <tr>
//     <td style={{ fontWeight: "600", paddingRight: "15px", color: "#555" }}>
//       {label}
//     </td>
//     <td style={{ color: "#111" }}>{value}</td>
//   </tr>
// );

// export default RechargeReceipt;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

const RechargeReceipt = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [relationData, setRelationData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const receiptData = JSON.parse(localStorage.getItem("receiptData"));

  //   useEffect(() => {
  //     setTimeout(() => {
  //       window.print();
  //     }, 500);
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://2kadam.co.in/api/auth/superAdmin/getUserRelations/${currentUser.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRelationData(res.data.data);

        const { white_lable, superAdmin } = res.data.data;
        if (white_lable) {
          const wlRes = await axios.get(
            `https://2kadam.co.in/api/auth/retailer/getWhiteLableData/${white_lable}`
          );
          setApiData(wlRes.data);
        } else if (superAdmin) {
          const saRes = await axios.get(
            `https://2kadam.co.in/api/auth/retailer/getSuperAdminData`
          );
          setApiData(saRes.data);
        }
      } catch (err) {
        console.error("Error fetching relation or API data", err);
      }
    };

    fetchData();

    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  if (!receiptData) return <p>No receipt data available.</p>;

  //   const today = new Date().toLocaleDateString("en-IN");
  const today = moment().format("DD/MM/YYYY");
  console.log(receiptData?.rechargeType);

  const logoUrl = apiData?.data[0]?.Logo;
  const compantyName = apiData?.data[0]?.Company_Name;
  const mailID = apiData?.data[0]?.Email_Id;
  const phone = apiData?.data[0]?.Calling_No;

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        background: "#fff",
        maxWidth: "800px",
        margin: "auto",
        border: "1px solid #ccc",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <img
          src={logoUrl}
          alt="Company Logo"
          style={{ height: "60px", marginBottom: "10px" }}
        />
        <h2>Payment Confirmation for - {receiptData.rechargeType} Recharge</h2>
      </div>

      {/* Company and Customer Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          fontSize: "14px",
        }}
      >
        <div>
          <p>
            <strong>Company Name:</strong> {compantyName}
          </p>
          <p>
            <strong>Email ID:</strong> {mailID}
          </p>
          {/* <p>
            <strong>Mobile No:</strong> {phone}
          </p> */}
          {/* <p>
            <strong>Website:</strong> www.bitspan.in
          </p> */}
        </div>
        <div>
          {/* <p>
            <strong>Customer Name:</strong> {receiptData.name}
          </p> */}
          <p>
            <strong>Date & Time:</strong> {today}
          </p>
          <p>
            <strong>Mobile No:</strong> {phone}
          </p>
        </div>
      </div>

      {/* User Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          fontSize: "14px",
        }}
      >
        <div>
          <p>
            <strong>User ID:</strong> {currentUser.userId}
          </p>
          <p>
            <strong>Email ID:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Order ID:</strong> {receiptData.receiptNumber}
          </p>
        </div>
      </div>

      {/* Transaction Table */}
      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>
        Transaction Details
      </h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Mobile No.</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{receiptData.mobile_no}</td>
            <td style={tdStyle}>{receiptData.amount}</td>
            <td style={tdStyle}>Success</td>
          </tr>
          <tr>
            <td style={tdStyle}>
              <strong>UTR Number:</strong> {receiptData.utr_number}
            </td>
            <td style={tdStyle} colSpan="2">
              <strong>Total Amount Paid:</strong> ₹{receiptData.amount}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          fontSize: "13px",
          color: "#666",
        }}
      >
        <p>
          <strong>{compantyName} © 2025 All Rights Reserved</strong>
        </p>
        <p>This is a system generated Receipt.</p>
      </div>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#f2f2f2",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};

export default RechargeReceipt;
