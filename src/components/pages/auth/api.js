import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/province`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
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
      `${BASE_URL}/auth/login`,
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
      `${BASE_URL}/auth/request-password-reset`,
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

export const resetPassword = async (
  resetToken,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/reset-password/${resetToken}`,
      {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      },
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

export const fetchBloodInventoryByProvince = async (provinceName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/blood-inventory/total?provinceName=${provinceName}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching blood inventory:", error);
    throw error;
  }
};
