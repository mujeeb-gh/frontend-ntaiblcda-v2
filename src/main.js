import "./css/style.css"; // Import your main CSS file
import { getGlobalSettings } from "./js/api/client";

const initializeApp = async () => {
  try {
    const { data } = await getGlobalSettings();
    console.log("Global settings:", data);

    // Set CSS variables
    document.documentElement.style.setProperty(
      "--primary-color",
      data.primaryColor
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      data.secondaryColor
    );

    // Update other elements if needed
    document.title = data.siteName || "NTAIBLCDA";
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);
