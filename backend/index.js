const express = require("express");
const userRoute = require("./Routes/userRoute");
const orderRouter = require("./Routes/orderRoute");
const { connectDb } = require("./config/db");
const cartRoute = require("./Routes/cartRoute");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());

connectDb();

app.use("/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);

app.listen(5000, () => {
  console.log("backend Server is running in 5000 port");
});
