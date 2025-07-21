import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  return jwt.sign(payload, "secretkey");
};

export const verifyToken = (token) => {
  return jwt.verify(token, "secretkey");
};
