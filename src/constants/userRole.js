const USER_ROLE = {
  AUTHOR: "AUTHOR",
  BORROWER: "BORROWER",
  ADMIN: "ADMIN",
};

Object.freeze(USER_ROLE);

const userRoles = Object.keys(USER_ROLE);

export { userRoles };

export default USER_ROLE;

