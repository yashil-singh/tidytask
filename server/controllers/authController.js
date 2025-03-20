import bcrypt from "bcryptjs";
import response from "../utils/response";
import { BASE_URL } from "../utils/constants";
import { createToken, verifyToken } from "@js/utils";

export const signupUser = async (fullName, username, password) => {
  try {
    if (!fullName || !username || !password)
      throw new Error("All fields are required.");

    if (fullName.trim().length < 1) throw new Error("Full name is required.");
    if (username?.trim().length < 1) throw new Error("Invalid username?.");
    if (password.trim().length < 5)
      throw new Error("Password not strong enough.");

    const usersResponse = await fetch(`${BASE_URL}/users`);
    const users = await usersResponse.json();

    if (users.length > 0) {
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) throw new Error("Username is already taken.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const maxId =
      Number(users.reduce((max, user) => (user.id > max ? user.id : max), 0)) +
      1;

    const joined = new Date();

    const body = {
      id: maxId.toString(),
      name: fullName,
      username,
      password: hashedPassword,
      createdAt: joined,
    };

    const createResponse = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!createResponse.ok)
      throw new Error("Something went wrong. Please try again.");

    const tokenPayload = {
      id: maxId,
      username,
      name: fullName,
      joined,
    };

    const token = await createToken(tokenPayload);

    return response(true, "Account created.", {
      token,
      user: { ...tokenPayload },
    });
  } catch (error) {
    return response(false, error.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    if (!username || !password) throw new Error("All fields are required.");

    const usersResponse = await fetch(`${BASE_URL}/users`);
    const users = await usersResponse.json();

    const existingUser = users.find((user) => user.username === username);
    if (!existingUser) throw new Error("Account not found.");

    const isValidPassword = bcrypt.compareSync(password, existingUser.password);

    if (!isValidPassword) throw new Error("Invalid credentials.");

    const tokenPayload = {
      id: existingUser.id,
      username: existingUser.username,
      name: existingUser.name,
      joined: existingUser.createdAt,
    };

    const token = await createToken(tokenPayload);

    return response(true, "Logged in.", { token, user: { ...tokenPayload } });
  } catch (error) {
    return response(false, error.message);
  }
};

export const verifyJwtToken = async (token) => {
  const userData = await verifyToken(token);
  if (!userData) return response(false, "Invalid token.");

  return response(true, "Authenticated", userData);
};
