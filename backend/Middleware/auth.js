const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized, Please Login Again",
    });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = verify.id;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: `Error at middleware and Error is : ${error.message}`,
    });
  }
};

module.exports = authMiddleware;
