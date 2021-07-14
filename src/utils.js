import axios from "axios";

export const fetchLastNav = async (schemaCode) => {
  const response = await axios.get(`https://api.mfapi.in/mf/${schemaCode}`);
  return response?.data?.data.splice(0, 2);
};
