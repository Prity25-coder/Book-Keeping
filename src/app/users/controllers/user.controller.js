import jwt from "jsonwebtoken";

import translate from "../../../common/services/translation.service.js";

import User from "../models/user.schema.js";
import { asyncHandler } from "async-handler-express";



const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const lang = req.headers["accept-language"] || "en";

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("userExists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: translate("userRegistered", lang),
    });
  } else {
    res.status(400);
    throw new Error("invalidUserData");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const lang = req.headers["accept-language"] || "en";

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: translate("loginSuccess", lang),
    });
  } else {
    res.status(401);
    throw new Error("invalidCredentials");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser };
