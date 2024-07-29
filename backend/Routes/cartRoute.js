const express = require("express");
const {
  addToCart,
  RemoveFromCart,
  getCart,
} = require("../Controllers/cartController");
const authMiddleware = require("../Middleware/auth");

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, RemoveFromCart);
cartRouter.get("/get", authMiddleware, getCart);

module.exports = cartRouter;
