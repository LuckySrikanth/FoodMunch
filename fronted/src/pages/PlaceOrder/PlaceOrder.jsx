import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { food_list } from "../../assets/assets";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const OnChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(item);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    // console.log(token);

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token: token },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      console.log(response);
      alert(response.data);
    }
  };
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivary Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={OnChangeHandler}
            value={data.firstName}
            placeholder="First name"
            required
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={OnChangeHandler}
            value={data.lastName}
            placeholder="Last name"
            required
          />
        </div>
        <input
          required
          type="email"
          name="email"
          id="email"
          onChange={OnChangeHandler}
          value={data.email}
          placeholder="Email Address"
        />
        <input
          required
          type="text"
          name="street"
          id="street"
          onChange={OnChangeHandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            name="city"
            id="city"
            onChange={OnChangeHandler}
            value={data.city}
            placeholder="city"
          />
          <input
            required
            type="text"
            name="state"
            id="state"
            onChange={OnChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="zipcode"
            id="zipcode"
            onChange={OnChangeHandler}
            value={data.zipcode}
            placeholder="Zip Code"
          />
          <input
            required
            type="text"
            name="country"
            id="country"
            onChange={OnChangeHandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          id="phone"
          onChange={OnChangeHandler}
          value={data.phone}
          placeholder="phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
