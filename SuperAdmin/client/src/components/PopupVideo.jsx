import React from "react";

function PopupVideo({ videoSrc, handler }) {
  /* 
     //www.youtube.com/embed/EE7NqzhMDms?autoplay=1
    */
  return (
    <div>
      <div onClick={handler} className="mfp-bg mfp-ready"></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        tabIndex="-1"
        style={{ overflow: " hidden auto" }}
      >
        <div className="mfp-container mfp-s-ready mfp-iframe-holder">
          <div className="mfp-content">
            <div className="mfp-iframe-scaler">
              <button
                onClick={handler}
                title="Close (Esc)"
                type="button"
                className="mfp-close"
              >
                ×
              </button>
              <iframe
                width="560"
                height="315"
                src={videoSrc}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
      </div>
    </div>
  );
}

export default PopupVideo;
