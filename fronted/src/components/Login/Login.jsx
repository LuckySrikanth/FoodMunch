import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./Login.css";

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const { url, setToken } = useContext(StoreContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/user/loginUser";
    } else {
      newUrl += "/user/postUser";
    }

    const response = await axios.post(newUrl, userDetails);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      console.log(response.data.message);
      alert(response.data.message);
    }
  };

  return (
    <div className="blur-background">
      <div className="login">
        <form className="login-form" onSubmit={submitHandler}>
          <h2>{currentState === "Login" ? "Login" : "Sign Up"}</h2>
          <div className="login-inputs-fields">
            {currentState === "Sign Up" && (
              <input
                onChange={inputHandler}
                type="text"
                name="name"
                value={userDetails.name}
                id="name"
                placeholder="Username"
                className="login-form-input"
                required
              />
            )}
            <input
              onChange={inputHandler}
              type="email"
              name="email"
              value={userDetails.email}
              id="email"
              placeholder="Email"
              required
            />
            <input
              onChange={inputHandler}
              type="password"
              name="password"
              value={userDetails.password}
              id="password"
              placeholder="Password"
              required
            />
            {currentState === "Sign Up" && (
              <input
                onChange={inputHandler}
                type="password"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                id="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            )}
          </div>
          <div className="login-checkbox">
            <input type="checkbox" name="checkbox" id="checkbox" required />
            <span>I agree to the Terms and Conditions</span>
          </div>
          <div>
            <button type="submit" className="login-submit">
              {currentState === "Login" ? "Login" : "Sign Up"}
            </button>
            {currentState === "Login" ? (
              <span>
                Create an Account?
                <button
                  onClick={() => setCurrentState("Sign Up")}
                  className="login-buttons"
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?
                <button
                  className="login-buttons"
                  onClick={() => setCurrentState("Login")}
                >
                  Login
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
