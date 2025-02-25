const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;
console.log(`STRAPI_API_URL: ${STRAPI_API_URL}`);

import axios from "axios";
console.log(import.meta.env.VITE_STRAPI_API_URL);
// const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;
console.log(`STRAPI_API_URL: ${STRAPI_API_URL}`);

const apiClient = axios.create({
  baseURL: STRAPI_API_URL, // Note: Using import.meta.env for Vite
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  },
});

export const getGlobalSettings = async () => {
  try {
    const response = await apiClient.get("/api/global");
    return response.data;
  } catch (error) {
    console.error("Error fetching global settings:", error);
    throw error;
  }
};
