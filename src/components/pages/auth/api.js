import axios from "axios";

export const fetchProvinces = async () => {
  try {
    const response = await axios.get("http://localhost:3000/province");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      credentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
