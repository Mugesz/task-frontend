import axios from "axios";
import { config } from "../confij";

export const login = async (value) => {
  try {
    const response = await axios.post(`${config.authApi}/login`, value);

    if (!response || !response.data) {
      throw new Error("Invalid response received");
    }
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
