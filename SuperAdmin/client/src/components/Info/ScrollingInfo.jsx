import React, { useEffect, useState } from "react";

const ScrollingInfo = () => {
  const [heroData, setHeroData] = useState("");
  const [animationDuration, setAnimationDuration] = useState("30s"); // Default speed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
        );
        const result = await response.json();

        if (result.success && result.data) {
          console.log("✅ API fetched successfully:", result.data);
          setHeroData(result.data);

          // ✅ Dynamic Animation Speed Calculation
          const textLength = result.data.Notice.length; // Get notice text length
          const duration = Math.max(15, textLength / 5) + "s"; // Minimum 15s, longer for big text
          setAnimationDuration(duration);
        } else {
          console.error("❌ Invalid API response", result);
        }
      } catch (error) {
        console.error("❌ Error fetching hero data:", error);
      }
    };

    fetchData();
  }, []);

  if (!heroData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Scrolling Text Box */}
      <div className="info-box">
        <div className="scroll-text" style={{ animationDuration }}>
          📢 {heroData.Notice} 🚀 |
        </div>
      </div>

      {/* CSS Inside JSX */}
      <style>
        {`
          .info-box {
            width: 100%;
            overflow: hidden;
            background-color:rgb(208, 40, 6);
            color: white;
            padding: 5px;
            // border-radius: 5px;
            white-space: nowrap;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 9999; /* Ensure it stays on top of other content */
          }

          .scroll-text {
             display: inline-block;
            animation: scrollText  linear infinite; 
          }

          @keyframes scrollText {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ScrollingInfo;
