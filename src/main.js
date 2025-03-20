import { verifyToken } from "@js/api/users";
import { loadUserData } from "@js/auth/getUserData";
import { toastError } from "@js/ui/toast";

const main = document.getElementById("main-container");
const loader = document.getElementById("loader");

// Checking for token in localstorage
const token = localStorage.getItem("token");

const verify = async () => {
  const validToken = await verifyToken(token);

  if (!validToken) {
    window.location.href = "/tidytask/login";
  } else {
    if (!validToken.success) {
      toastError("You have been logged out.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/tidytask/login";
    } else {
      // Setting user data in local storage
      localStorage.setItem("user", JSON.stringify(validToken.data));
      // Loading user data;
      loadUserData();

      main.classList.remove("hidden");
      loader.classList.add("hidden");
    }
  }
};

if (!token) {
  window.location.href = "/tidytask/login";
} else {
  // Verifying token
  verify();
}

export const profileDropdownButton = document.getElementById(
  "profile-dropdown-btn",
);
export const profileDropdownContainer = document.querySelector(
  ".profile-dropdown-container",
);

export let isDropdownOpen = false;

export const openProfileDropdown = () => {
  profileDropdownContainer.classList.add("active");
  document.body.style.overflow = "hidden";
  isDropdownOpen = true;
};

export const closeProfileDropdown = () => {
  profileDropdownContainer.classList.add("closing");

  setTimeout(() => {
    profileDropdownContainer.classList.remove("active", "closing");
    isDropdownOpen = false;
  }, 300);

  document.body.style.overflow = "auto";
};

profileDropdownButton.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!isDropdownOpen) {
    openProfileDropdown();
  } else {
    closeProfileDropdown();
  }
});

document.addEventListener("click", () => {
  if (isDropdownOpen) {
    closeProfileDropdown();
  }
});
