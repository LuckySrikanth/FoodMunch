const express = require("express");
const userRoute = require("./Routes/userRoute");
const orderRouter = require("./Routes/orderRoute");
const { connectDb } = require("./config/db");
const cartRoute = require("./Routes/cartRoute");
const dotenv = require("dotenv");

const cors = require("cors");

const app = express();


dotenv.config();
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "https://foodmunch-backend.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

// Connect to the database
connectDb();

// Routes
app.use("/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);

app.listen(5000, () => {
  console.log("Backend server is running on port 5000");
});
