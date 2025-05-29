import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WalletReceipt = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [relationData, setRelationData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();
  const receiptData = JSON.parse(localStorage.getItem("receiptData"));

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
  console.log(receiptData?.Type);

  const logoUrl = apiData?.data[0]?.Logo;
  console.log(logoUrl);

  const compantyName = apiData?.data[0]?.Company_Name;
  const mailID = apiData?.data[0]?.Email_Id;
  const phone = apiData?.data[0]?.Calling_No;

  return (
    <>
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
          <h2>Payment Confirmation for - {receiptData.Type}</h2>
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
              <strong>Role:</strong> {receiptData.userRole}
            </p>
          </div>
        </div>

        {/* Transaction Table */}
        <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>
          Transaction Details
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
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
              <td style={tdStyle}>{receiptData.userPhone}</td>
              <td style={tdStyle}>{receiptData.amount}</td>
              <td style={tdStyle}>Success</td>
            </tr>
            <tr>
              {/* <td style={tdStyle}>
              <strong>UTR Number:</strong> {receiptData.utr_number}
            </td> */}
              <td style={tdStyle} colSpan="3">
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
      <Wrapper>
        <div
          className="no-print"
          style={{ marginTop: "30px", textAlign: "center" }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "10px 20px",
              marginRight: "15px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Home
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      </Wrapper>
    </>
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

export default WalletReceipt;
const Wrapper = styled.div`
  @media print {
    .no-print {
      display: none !important;
    }
  }
`;
