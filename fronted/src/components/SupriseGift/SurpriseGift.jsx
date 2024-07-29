import React, { useState } from "react";
import "./SupriseGift.css";

const SurpriseGift = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="suprise-gift" id="suprise-gift">
      <div className="suprise-gift-description">
        <h2>Thank you for being a valuable customer to us.</h2>
        <h4>We have a Surprise Gift for you.</h4>
        <button onClick={() => setShowPopup(true)}>Redeem Gift</button>
      </div>
      {showPopup && (
        <>
          <div className="dark-overlay"></div>
          <div className="surprise-gift-popup">
            <div className="surprise-gift-navbar">
              <div>
                <h3>Gift Vocher</h3>
              </div>
              <div onClick={() => setShowPopup(false)} className="x">
                X
              </div>
            </div>
            <div>
              <img
                src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/gift-voucher-img.png"
                className="suprise-gift-vocher-image"
              />
            </div>
            <div className="surprise-gift-close-btn">
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        </>
      )}
      <div className="suprise-gift-image-container">
        <img
          src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/thanking-customers-section-img.png"
          alt=""
          className="suprise-gift-image"
        />
      </div>
    </div>
  );
};

export default SurpriseGift;
