import { compare } from "bcryptjs";

const decryptPassword = async (password, encPassword) => {
  return await compare(password, encPassword);
};

export default decryptPassword;
