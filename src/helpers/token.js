import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/env.config.js";

const {
  jwtAccessSecret,
  jwtRefreshSecret,
  jwtAccessTimeOut,
  jwtRefreshTimeOut,
} = ENV_CONFIG;

const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, jwtAccessSecret, {
    expiresIn: jwtAccessTimeOut, // 15 min
  });
  return token;
};

const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: jwtRefreshTimeOut, // 1 day
  });

  return token;
};

export { generateAccessToken, generateRefreshToken };
