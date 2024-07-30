const orderModel = require("../Model/orderModel");
const userModel = require("../Model/userModel");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for fronted
exports.placeOrder = async (req, res) => {
  console.log(req.body);
  const fronted_url = "https://foodmunch-fronted.onrender.com";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivary Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${fronted_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${fronted_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(`Error at Stripe and Error is :${error.message}`);
    res.json({
      success: false,
      message: `Error at Stripe and Error is :${error.message}`,
    });
  }
};

exports.verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  console.log(orderId, success, "verifyOrder");
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(`Error at payment verify fn and Error is: ${error.message} `);
    res.json({
      success: false,
      message: `Error at payment verify fn and Error is: ${error.message} `,
    });
  }
};

//user order
exports.usersOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    console.log(req.body.userId, "userId in usrsorder");
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(`Error in the usrsOrder Id fn and erros is: ${error.message}`);
    res.json({
      success: false,
      message: `Error in the usrsOrder Id fn and erros is: ${error.message}`,
    });
  }
};
