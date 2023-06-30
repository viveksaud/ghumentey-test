const jwt = require("jsonwebtoken");
require("dotenv/config");
const UserModel = require("../models/User.js");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({
          status: "failed",
          message: "Authentication failed: Missing token",
        });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await UserModel.findById(decodedToken.id);

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token" });
  }
};

module.exports = { auth };
