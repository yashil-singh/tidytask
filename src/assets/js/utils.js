import { jwtVerify, SignJWT } from "jose";
import { secretKey } from "../../../server/utils/constants";

export const addClassName = (element, classname) => {
  element?.classList.add(classname);
};

export const removeClassName = (element, ...classname) => {
  element?.classList.remove(...classname);
};

export const createToken = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey);
};

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
};
