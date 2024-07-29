const userModel = require("../Model/userModel");

exports.addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });

    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      console.log(req.body.itemId, "reqBody");
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Food Item added Successfully" });
  } catch (error) {
    console.log(
      `Error addtoCart fn In controller and error is  : ${error.message}`
    );
    res.json({
      success: false,
      message: `Error addtoCart fn In controller and error is  : ${error.message}`,
    });
  }
};

exports.RemoveFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item removed Successfully" });
  } catch (error) {
    console.log();
    res.json({
      success: false,
      message: `Error at removeFromCart and error is : ${error.message}`,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let CartData = userData.cartData;
    res.json({ success: true, CartData });
  } catch (error) {
    console.log();
    res.json({
      success: false,
      message: `Error at getCart and error is : ${error.message}`,
    });
  }
};
