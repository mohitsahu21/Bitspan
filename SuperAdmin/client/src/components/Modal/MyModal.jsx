import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const MyModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [heroData, setHeroData] = useState("");
  const [showOfferBanner, setShowOfferBanner] = useState(false); // State to control modal visibility based on API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/getSuperAdminSettings"
        );
        const result = await response.json();

        // API response structure validation
        if (result.success && result.data) {
          console.log("✅ API fetched successfully:", result.data);
          setHeroData(result.data);

          // Check if Show_Offer_Banner is 'Yes'
          if (result.data.Show_Offer_Banner === "Yes") {
            setShowOfferBanner(true); // Set true to show modal
          } else {
            setShowOfferBanner(false); // Set false if no modal should show
          }
        } else {
          console.error("❌ Invalid API response", result);
        }
      } catch (error) {
        console.error("❌ Error fetching hero data:", error);
      }
    };

    fetchData();
  }, []);

  // Open modal after 5 seconds if showOfferBanner is true
  useEffect(() => {
    if (showOfferBanner) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000); // 3000ms = 3 seconds

      // Clear the timer if the component is unmounted before the time is over
      return () => clearTimeout(timer);
    }
  }, [showOfferBanner]); // Re-run when showOfferBanner changes

  // Close modal
  const closeModal = () => setShowModal(false);

  return (
    <div>
      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Offer
              </h5>
              <button
                type="button"
                className="close"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <img
              src={heroData.Offer_Banner}
              alt="Offer Image"
              style={{ width: "500px", height: "250px" }} // Custom width and height
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
