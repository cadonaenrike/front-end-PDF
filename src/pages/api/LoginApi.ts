import { LoginData } from "@/interfaces/LoginData";
import api from "./api";

export const login = async (loginData: LoginData) => {
  try {
    const response = await api.post("/login", loginData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
