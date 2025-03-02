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

// Function to update contact information across the site
function updateContactInfo(contactInfo) {
  try {
    console.log("Updating contact info with:", contactInfo);

    // Default values if the contactInfo is missing
    const phone = contactInfo?.phone || "+234-810-000-0000";
    const email = contactInfo?.email || "hello@ntaiblcda.com";
    const address1 = contactInfo?.addressLine1 || "Collins Street";
    const address2 = contactInfo?.addressLine2 || "Victoria, NewYork, USA";

    // Update the header phone and email (visible on both desktop and mobile)
    const headerPhoneLinks = document.querySelectorAll(
      '.top-address a[href^="tel:"]'
    );
    const headerEmailLinks = document.querySelectorAll(
      '.top-address a[href^="mailto:"]'
    );

    if (headerPhoneLinks.length > 0) {
      headerPhoneLinks.forEach((link) => {
        link.href = `tel:${phone.replace(/\s+/g, "")}`;
        link.innerHTML = `<i class="fa fa-phone"></i>${phone}`;
      });
    }

    if (headerEmailLinks.length > 0) {
      headerEmailLinks.forEach((link) => {
        link.href = `mailto:${email}`;
        link.innerHTML = `<i class="fa fa-envelope-o"></i>${email}`;
      });
    }

    // Update the contact section in the footer
    const contactSections = document.querySelectorAll(".contact_area");

    contactSections.forEach((section) => {
      // Update address
      const addressElements = section.querySelectorAll(
        ".plases_icon i.fa-map-marker"
      );
      addressElements.forEach((element) => {
        const textContainer = element
          .closest(".single_plases_inner")
          .querySelector(".plases_text");
        if (textContainer) {
          const paragraphs = textContainer.querySelectorAll("p");
          if (paragraphs.length >= 1) paragraphs[0].textContent = address1;
          if (paragraphs.length >= 2) paragraphs[1].textContent = address2;
        }
      });

      // Update phone numbers
      const phoneElements = section.querySelectorAll(".plases_icon i.fa-phone");
      phoneElements.forEach((element) => {
        const textContainer = element
          .closest(".single_plases_inner")
          .querySelector(".plases_text");
        if (textContainer) {
          const paragraphs = textContainer.querySelectorAll("p");
          // Use the same phone number for all phone displays
          paragraphs.forEach((paragraph) => {
            paragraph.textContent = phone;
          });
        }
      });

      // Update email addresses
      const emailElements = section.querySelectorAll(
        ".plases_icon i.fa-envelope-o"
      );
      emailElements.forEach((element) => {
        const textContainer = element
          .closest(".single_plases_inner")
          .querySelector(".plases_text");
        if (textContainer) {
          const paragraphs = textContainer.querySelectorAll("p");
          // Use the same email for all email displays
          paragraphs.forEach((paragraph) => {
            paragraph.textContent = email;
          });
        }
      });
    });
  } catch (error) {
    console.error("Error updating contact info:", error);
  }
}

// Function to update social media links across the site
function updateSocialLinks(socialLinks) {
  try {
    console.log("Updating social links with:", socialLinks);

    // Get all social icon containers
    const socialIconContainers = document.querySelectorAll(".social-icons");

    if (!socialIconContainers.length) {
      console.warn("No social icon containers found");
      return;
    }

    // Process each social media platform
    socialIconContainers.forEach((container) => {
      // Facebook
      const facebookLink = container.querySelector("a.facebook");
      if (facebookLink && socialLinks?.facebookUrl) {
        facebookLink.href = socialLinks.facebookUrl;
        facebookLink.parentElement.style.display = ""; // Show if hidden
      } else if (facebookLink && !socialLinks?.facebookUrl) {
        facebookLink.parentElement.style.display = "none"; // Hide if no URL provided
      }

      // Twitter/X
      const twitterLink = container.querySelector("a.twitter");
      if (twitterLink && socialLinks?.twitterUrl) {
        twitterLink.href = socialLinks.twitterUrl;
        twitterLink.parentElement.style.display = "";
      } else if (twitterLink && !socialLinks?.twitterUrl) {
        twitterLink.parentElement.style.display = "none";
      }

      // Instagram
      const instagramLink = container.querySelector("a.instagram");
      if (instagramLink && socialLinks?.instagramUrl) {
        instagramLink.href = socialLinks.instagramUrl;
        instagramLink.parentElement.style.display = "";
      } else if (instagramLink && !socialLinks?.instagramUrl) {
        instagramLink.parentElement.style.display = "none";
      }
    });
  } catch (error) {
    console.error("Error updating social links:", error);
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

      // Contact info
      if (data.contact) {
        updateContactInfo(data.contact);
      }

      // Social links
      if (data.social) {
        updateSocialLinks(data.social);
      }
      
    }

    document.getElementById("currentYear").textContent =
      new Date().getFullYear();
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);
