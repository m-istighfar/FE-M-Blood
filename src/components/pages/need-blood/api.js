import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const emergencyRequest = async (emergencyData, authToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/emergency/request`,
      emergencyData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during emergency request:", error);
    throw error;
  }
};

export const fetchBloodInventory = async (
  page,
  limit,
  bloodTypeID,
  provinceID
) => {
  try {
    const response = await axios.get(`${BASE_URL}/blood-inventory`, {
      params: {
        page: page,
        limit: limit,
        bloodTypeID: bloodTypeID,
        provinceID: provinceID,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blood inventory:", error);
    throw error;
  }
};
