const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

// const UserModel = require("../models/userModel.js");
const UserModel = require("../models/User.js");

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exit !!!" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid password !!!" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    //response
    res.status(200).json({
      status: "success",
      message: "Helllo user!!! Welcome Back!!!",
      user: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong !!!" });
    console.log(error.message);
  }
};

const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName && !lastName)
    return res
      .status(400)
      .json({ message: "firstName and lastName is required" });
  if (!password)
    return res.status(400).json({ message: "Password must be provided" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be atleast 6 character long" });

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist !!!" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password didnot match !!!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    //response
    res.json({
      status: "success",
      message: "User created successfully!!!",
      newUser,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong !!!", error: `${error.message}` });
    console.log(error.message);
  }
};

const signOut = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: 0,
  });

  res.status(200).json({ status: "success", message: "Sign-out successful" });
};

module.exports = { signUp, signIn, signOut };
