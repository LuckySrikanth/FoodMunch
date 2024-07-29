const express = require("express");
const {
  placeOrder,
  verifyOrder,
  usersOrder,
} = require("../Controllers/orderController");
const authMiddleware = require("../Middleware/auth");

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorder", authMiddleware, usersOrder);

module.exports = orderRouter;
