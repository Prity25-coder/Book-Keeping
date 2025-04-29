import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/env.config.js";

const { jwtAccessSecret, jwtRefreshSecret } = ENV_CONFIG;

const jwtAccessDecode = (token) => {
  try {
    const payload = jwt.verify(token, jwtAccessSecret);
    return payload;
  } catch (error) {
    throw error;
  }
};

const jwtRefreshDecode = (token) => {
  try {
    const payload = jwt.verify(token, jwtRefreshSecret);
    return payload;
  } catch (error) {
    throw error;
  }
};

export { jwtAccessDecode, jwtRefreshDecode };
