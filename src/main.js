const initializeApp = async () => {
  try {
    // Use the globally exposed API client instead of importing
    const { data } = await window.apiClient.getGlobalSettings();
    console.log("Global settings:", data);

    // Set CSS variables
    if (data) {
      document.documentElement.style.setProperty(
        "--primary-color",
        data.data.primaryColor
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        data.data.secondaryColor
      );

      // Update other elements if needed
      if (data.siteName) {
        document.title = data.siteName || "NTAIBLCDA";
      }
    }
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);
