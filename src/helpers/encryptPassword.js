import { genSalt, hash } from "bcryptjs";
import ENV_CONFIG from "../config/env.config.js";

const encryptPassword = async (password) => {
  const { saltRounds } = ENV_CONFIG;
  const salt = await genSalt(saltRounds);
  const encPassword = await hash(password, salt);
  return encPassword;
};

export default encryptPassword;
