import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-text">
        <h1 className="title">
          Dive into Delights of Delectable
          <span>Food</span>
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className="header-button-container">
          <a href="#explore-menu">
            <button className="header-view-button">View Menu</button>
          </a>
          <a href="#food-display">
            <button className="header-view-button">Order Now</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
