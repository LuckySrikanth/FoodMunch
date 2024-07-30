import React, { useState, useContext } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const { token, setToken, cartItems } = useContext(StoreContext);

  const navigate = useNavigate();
  const itemCount = Object.keys(cartItems).length;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfilePopup = () => {
    setProfilePopupOpen(!profilePopupOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="food-munch-image">
          <img
            src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-img.png"
            alt="logo"
            className="food-munch-logo"
          />
        </div>
      </Link>
      <div
        className={`nav-categories ${menuOpen ? "nav-categories-open" : ""}`}
      >
        <Link to="/">
          <a href="#Home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
        </Link>
        <a href="#explore-menu" onClick={() => setMenuOpen(false)}>
          Menu
        </a>
        <a href="#Home" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="#suprise-gift" onClick={() => setMenuOpen(false)}>
          Offers
        </a>
      </div>
      <div className="nav-buttons">
        <Link to="/cart">
          <button className="icons">
            <IoBagOutline />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="signIn">
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <button className="profile-button" onClick={toggleProfilePopup}>
              <FaRegUserCircle />
            </button>
            <div className={`profile-popup ${profilePopupOpen ? "open" : ""}`}>
              <ul>
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>LogOut</p>
                </li>
              </ul>
            </div>
          </div>
        )}
        <button className="contact-us">
          <FiPhoneCall />
          <a href="#footer">
            <span>Contact us</span>
          </a>
        </button>
        <button className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
