const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("Your Email is Not Found");
      res
        .status(500)
        .json({ success: false, message: `Your Email is Not Found` });
    }
    const matchPassco = await bcrypt.compare(password, user.password);

    if (matchPassco) {
      const token = createToken(user._id);
      res.status(201).json({
        success: true,
        message: `Your successfully Logined`,
        token,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credintials" });
    }
  } catch (error) {
    console.log(`Error at login passco: ${error.message}`);
  }
};

exports.postUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isEmail = await userModel.findOne({ email });

    if (isEmail) {
      res
        .status(400)
        .json({ success: false, message: `You Have an Account, Please Login` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res
      .status(201)
      .json({ success: true, message: "User Created successfully", token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error PostUser and Error is: ${error.message}`,
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({ success: true, allUsers });
  } catch (error) {
    console.log();
    res.status(400).json({
      success: false,
      message: `Error getAllUsers And Error is: ${error.message}`,
    });
  }
};
