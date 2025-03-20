import { toastSuccess } from "@js/ui/toast";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toastSuccess("Logged out.");

  setTimeout(() => {
    window.location.href = "/tidytask";
  }, 1000);
};

document.querySelectorAll("#logout-button").forEach((button) => {
  button.addEventListener("click", () => logout());
});
