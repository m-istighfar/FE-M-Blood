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

export const requestPasswordReset = async (emailData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/request-password-reset",
      emailData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

export const resetPassword = async (resetToken, newPasswordData) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/auth/reset-password/${resetToken}`,
      newPasswordData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
