function updateLogoInCSS(logoUrl) {
  // Escape any special characters in the URL and wrap in url()
  const cssUrl = `url('${logoUrl.replace(/'/g, "\\'")}')`;
  document.documentElement.style.setProperty("--mobile-logo-url", cssUrl);
}

function updateLogos(logoUrl) {
  try {
    console.log("Updating logos with:", logoUrl);

    const logoImages = document.querySelectorAll(".logo img");
    console.log(logoImages);
    logoImages.forEach((img) => {
      const originalLogo = img.src;
      const newImage = new Image();
      newImage.onload = () => (img.src = logoUrl);
      newImage.onerror = () => console.warn("Could not load CMS logo");
      newImage.src = logoUrl;
    });

    updateLogoInCSS(logoUrl);
  } catch (error) {
    console.error("Error updating logos:", error);
  }
}

const initializeApp = async () => {
  try {
    const defaultPrimaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim();
    const defaultSecondaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--secondary-color")
      .trim();

    const response = await window.apiClient.getGlobalSettings();

    console.log("Global settings:", response);

    const data = response && response.data.data ? response.data.data : null;

    if (data) {
      const primaryColor = data.primaryColor || defaultPrimaryColor;
      const secondaryColor = data.secondaryColor || defaultSecondaryColor;

      if (primaryColor) {
        document.documentElement.style.setProperty(
          "--primary-color",
          primaryColor
        );
      }

      if (secondaryColor) {
        document.documentElement.style.setProperty(
          "--secondary-color",
          secondaryColor
        );
      }

      // Title
      if (data.siteName) {
        document.title = data.siteName;
      }

      // Logo
      if (data.logo && data.logo.url) {
        let logoURL = data.logo.url;

        if (logoURL.startsWith("/")) {
          logoURL = window.config.api.url + logoURL;
        }
        console.log(logoURL);
        updateLogos(logoURL);
      }
    }
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);
