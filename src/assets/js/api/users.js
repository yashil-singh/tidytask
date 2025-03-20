import {
  loginUser,
  signupUser,
  verifyJwtToken,
} from "@controllers/authController";

export const signup = async (fullName, username, password) => {
  return await signupUser(fullName, username, password);
};

export const login = async (username, password) => {
  return await loginUser(username, password);
};

export const verifyToken = async (token) => {
  return await verifyJwtToken(token);
};
