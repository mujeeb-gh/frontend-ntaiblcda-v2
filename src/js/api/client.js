const STRAPI_API_URL = window.config.api.url;
const STRAPI_API_TOKEN = window.config.api.token;

console.log(`STRAPI_API_URL: ${STRAPI_API_URL}`);

// We'll use regular fetch instead of axios
async function getGlobalSettings() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/global?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching global settings:", error);
    throw error;
  }
}

// Export to global scope for vanilla JS usage
window.apiClient = {
  getGlobalSettings,
};
