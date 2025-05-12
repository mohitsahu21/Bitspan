import React from "react";
import axios from "axios";

const RCFind = () => {
  const fetchPdf = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7777/api/auth/aadhar/fetchRcPdf",
        {
          api_key: "55190b0f78f4b83fd9781f3aab2193",
          rcno: "MP20CD6439",
          cardtype: "1", // optional, 1 = old background
          chiptype: "1", // optional, 1 = chip
        }
      );

      console.log("Response:", response);

      const base64Pdf = response.data.pdf;
      console.log("Base64 PDF:", base64Pdf);

      if (base64Pdf) {
        // Decode base64 string to binary
        const byteCharacters = atob(base64Pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Create blob and object URL
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(blob);

        // Open PDF in a new tab
        window.open(pdfUrl, "_blank");
      } else {
        alert("No PDF data found in response");
      }
    } catch (error) {
      console.error("Error fetching RC PDF:", error);
      alert("Failed to fetch RC PDF");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={fetchPdf}>View RC PDF</button>
    </div>
  );
};

export default RCFind;
