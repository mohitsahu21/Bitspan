import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PanReceipt = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiSource, setApiSource] = useState("");
  const [relationData, setRelationData] = useState(null);
  const [apiData, setApiData] = useState(null);

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

  const logoUrl = apiData?.data[0]?.Logo;
  const compantyName = apiData?.data[0]?.Company_Name;

  const apiUrls = [
    `https://2kadam.co.in/api/auth/retailer/getNsdlTransactionById/${id}`,
    `https://2kadam.co.in/api/auth/retailer/getNsdlCorrectionById/${id}`,
  ];

  const fetchReceipt = async () => {
    setLoading(true);
    for (let i = 0; i < apiUrls.length; i++) {
      try {
        const res = await axios.get(apiUrls[i], {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data && res.data.data) {
          setReceiptData(res.data.data);
          setApiSource(i === 0 ? "New Request" : "Correction");
          break;
        }
      } catch (err) {
        // continue to next
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchReceipt();
    }
  }, [id]);
  console.log(receiptData);

  //   const handlePrint = () => {
  //     window.print();
  //   };

  //   useEffect(() => {
  //     setTimeout(() => {
  //       window.print();
  //     }, 500);
  //   }, []);

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
          <h2>PAN CARD - RECEIPT</h2>
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
              <strong>Order ID:</strong>{" "}
              {receiptData?.orderid ? receiptData?.orderid : "N/A"}
            </p>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {receiptData?.txid ? receiptData?.txid : "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Date & Time:</strong>{" "}
              {receiptData?.created_at
                ? moment(receiptData?.created_at).format("DD/MM/YYYY HH:mm:ss")
                : "N/A"}
            </p>
          </div>
        </div>
        <hr />

        <div>
          <h5 style={{ marginTop: "30px", marginBottom: "10px" }}>
            APPLICANT DETAILS
          </h5>
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
              <strong>Name:</strong>{" "}
              {receiptData?.name ? receiptData?.name : "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {receiptData?.dob ? receiptData?.dob : "N/A"}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {receiptData?.gender ? receiptData?.gender : "N/A"}
            </p>
            <p>
              <strong>Physical PAN Card:</strong>{" "}
              {receiptData?.physicalPan ? receiptData?.physicalPan : "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Mobile Number:</strong>
              {receiptData?.mobile ? receiptData?.mobile : "N/A"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {receiptData?.email ? receiptData?.email : "N/A"}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {receiptData?.selectType ? receiptData?.selectType : "N/A"}
            </p>
          </div>
        </div>

        <hr />

        {/* Transaction Table */}
        <div>
          <h5 style={{ marginTop: "30px", marginBottom: "10px" }}>
            TRANSACTION DETAILS
          </h5>
        </div>

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
              <strong>Application Mode:</strong>{" "}
              {receiptData?.applicationMode
                ? receiptData?.applicationMode
                : "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Amount Paid:</strong>
              {receiptData?.amount ? receiptData?.amount : "N/A"}
            </p>
          </div>
        </div>

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
            <strong> {compantyName} © 2025 All Rights Reserved</strong>
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
            onClick={() => navigate("/pan-transaction-report")}
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

export default PanReceipt;
const Wrapper = styled.div`
  @media print {
    .no-print {
      display: none !important;
    }
  }
`;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// const PanReceipt = () => {
//   const { id } = useParams();
//   console.log(id);

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//       <div className="flex justify-center bg-white py-4">
//         <img
//           src="/api/placeholder/120/60"
//           alt="PAN Card Logo"
//           className="h-12"
//         />
//       </div>
//       <div className="bg-blue-600 text-white px-6 py-4">
//         <h1 className="text-xl font-bold text-center">
//           INSTANT PAN CARD - EKYC RECEIPT
//         </h1>
//       </div>
//       {/* <div className="bg-blue-600 text-white px-6 py-4">
//         <h1 className="text-xl font-bold text-center">
//           INSTANT PAN CARD - EKYC RECEIPT
//         </h1>
//       </div> */}

//       <div className="p-6">
//         <div className="mb-6">
//           <div className="flex justify-between mb-1">
//             <span className="font-medium">Receipt No:</span>
//             <span>ORPAN1746773650</span>
//           </div>
//           <div className="flex justify-between mb-1">
//             <span className="font-medium">Transaction ID:</span>
//             <span>31626430281746773650</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium">Date & Time:</span>
//             <span>May 9, 2025 12:24:10</span>
//           </div>
//         </div>

//         <hr className="my-4 border-gray-200" />

//         <div className="mb-6">
//           <h2 className="text-lg font-bold mb-3 text-blue-600">
//             APPLICANT DETAILS
//           </h2>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <p className="font-medium">Name:</p>
//               <p className="font-medium">Date of Birth:</p>
//               <p className="font-medium">Gender:</p>
//               <p className="font-medium">Mobile Number:</p>
//             </div>
//             <div>
//               <p>Deepak Verma</p>
//               <p>May 9, 2025</p>
//               <p>Male</p>
//               <p>5325353253</p>
//             </div>
//             <div>
//               <p className="font-medium">Email:</p>
//               <p className="font-medium">Category:</p>
//               <p className="font-medium">Physical PAN Card:</p>
//             </div>
//             <div>
//               <p>test@gmail.com</p>
//               <p>Individual</p>
//               <p>No</p>
//             </div>
//           </div>
//         </div>

//         <hr className="my-4 border-gray-200" />

//         <div className="mb-6">
//           <h2 className="text-lg font-bold mb-3 text-blue-600">
//             TRANSACTION DETAILS
//           </h2>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <p className="font-medium">Application Mode:</p>
//               <p className="font-medium">Amount Paid:</p>
//               <p className="font-medium">Payment Status:</p>
//               <p className="font-medium">Message:</p>
//             </div>
//             <div>
//               <p>Instant PAN Card - EKYC</p>
//               <p>₹100.00</p>
//               <p className="text-green-600 font-medium">Success</p>
//               <p>Data Return Success!</p>
//             </div>
//           </div>
//         </div>

//         <hr className="my-4 border-gray-200" />

//         <div className="text-center text-sm text-gray-500 italic mt-4">
//           <p>This is an electronically generated receipt.</p>
//           <p>
//             For any queries, please contact our customer support with your
//             Transaction ID.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PanReceipt;
