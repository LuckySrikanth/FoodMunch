import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const url = "https://foodmunch-backend.onrender.com";

  const AddToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCartHandler = async (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { id },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => (product.id = item));
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const contextValue = {
    cartItems,
    setCartItems,
    AddToCart,
    removeFromCartHandler,
    token,
    setToken,
    url,
    getTotalCartAmount,
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    };

    fetchData();
  }, [token]);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
